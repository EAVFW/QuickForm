import { SlideModel } from "../model";

export const isSlideAnswered = (slide: SlideModel): boolean => (slide.questions.length > 0 && slide.questions.filter(q => q.isActive).every(q => q.answered));