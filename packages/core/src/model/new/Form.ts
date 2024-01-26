import { Ending, Intro, Layout, Question, Slide, Submit } from "./index";

export type Form = {
    intro: Intro;
    slides: Slide[];
    questions: Question[];
    submit: Submit;
    ending: Ending;
    layout: Layout;
}