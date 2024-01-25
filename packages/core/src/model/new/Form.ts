import { Ending } from "./Ending";
import { Intro } from "./Intro";
import { Layout } from "./Layout";
import { Question } from "./Question"
import { Submit } from "./Submit";

export type Form = {
    intro: Intro;
    questions: Question[];
    submit: Submit;
    ending: Ending;
    layout: Layout;
}