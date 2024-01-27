import { Ending, Intro, Layout, Question, Slide, Submit } from "./index";

/* This class holds all the models required for QuickForm to function */
export class Form {
    intro: Intro;
    slides: Slide[];
    questions: Question[];
    submit: Submit;
    ending: Ending;
    layout?: Layout;
}