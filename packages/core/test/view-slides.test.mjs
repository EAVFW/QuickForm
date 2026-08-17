import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
    Slide,
    defaultState,
    quickformReducer,
    registerDefaultServices,
    registerViewComponent,
    resolveQuickFormService,
} from "../dist/index.js";

function registerFreshDefaults() {
    globalThis.__quickFormFeatures = undefined;
    registerDefaultServices();
}

test("the model transformer preserves view slides and ignores their rows", () => {
    registerFreshDefaults();
    const transform = resolveQuickFormService("modeltransformer");
    const model = transform({
        questions: {
            finalist: {
                text: "Who reaches the final?",
                inputType: "text",
            },
        },
        layout: {
            slides: {
                bracket: {
                    rows: {
                        finalist: { type: "question", ref: "finalist" },
                    },
                    view: {
                        type: "custom:knockout-tree",
                        sources: ["finalist"],
                    },
                },
            },
        },
        submit: {
            text: "Submit",
            paragraph: "",
            buttonText: "Submit",
            submitFields: { schema: { properties: {} }, uiSchema: {} },
            submitUrl: "/submissions",
            submitMethod: "POST",
        },
        ending: { text: "Thanks" },
    }, {});

    assert.equal(model.slides.length, 1);
    assert.equal(model.slides[0].key, "bracket");
    assert.equal(model.slides[0].view.type, "custom:knockout-tree");
    assert.deepEqual(model.slides[0].view.sources, ["finalist"]);
    assert.deepEqual(model.slides[0].questions, []);
    assert.deepEqual(model.slides[0].rows, []);
});

test("continuing from a view-only slide marks it visited and completes progress", () => {
    registerFreshDefaults();
    const slide = {
        key: "bracket",
        questions: [],
        rows: [],
        visited: false,
        view: { type: "custom:knockout-tree" },
    };
    const state = defaultState({
        ending: { text: "Thanks" },
        slides: [slide],
        submit: {
            text: "Submit",
            buttonText: "Submit",
            submitFields: [],
            submitUrl: "/submissions",
            submitMethod: "POST",
        },
    });

    const next = quickformReducer(state, { type: "NEXT_SLIDE" });

    assert.equal(next.slides[0].visited, true);
    assert.equal(next.progress, 100);
    assert.equal(next.progressText, "1/1");
    assert.equal(next.isSubmitSlide, true);
});

test("an unregistered view renders a visible diagnostic fallback", () => {
    const slide = {
        questions: [],
        rows: [],
        visited: false,
        view: { type: "custom:not-installed" },
    };
    const html = renderToStaticMarkup(React.createElement(Slide, { model: slide }));

    assert.match(html, /role="status"/);
    assert.match(html, /data-quickform-missing-view="custom:not-installed"/);
    assert.match(html, /This view is unavailable\./);
});

test("a registered view still owns the slide body", () => {
    registerViewComponent("custom:test-bracket", ({ view }) =>
        React.createElement("strong", null, `Sources: ${view.sources.length}`),
    );
    const slide = {
        questions: [],
        rows: [],
        visited: false,
        view: { type: "custom:test-bracket", sources: ["qf1", "qf2"] },
    };
    const html = renderToStaticMarkup(React.createElement(Slide, { model: slide }));

    assert.match(html, /<strong>Sources: 2<\/strong>/);
    assert.doesNotMatch(html, /data-quickform-missing-view/);
});
