import type React from "react";
import type { SlideViewDefinition } from "../model/json-definitions/Layout";

export type SlideViewProps = {
    view: SlideViewDefinition;
};

export type SlideViewComponent = React.ComponentType<SlideViewProps>;

const viewComponents = new Map<string, SlideViewComponent>();

export function registerViewComponent(type: string, component: SlideViewComponent) {
    viewComponents.set(type, component);
}

export function resolveViewComponent(type: string) {
    return viewComponents.get(type);
}
