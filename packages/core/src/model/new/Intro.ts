export type Intro = {
    text: string;
    readonly logicalName?: string;
    readonly paragraph?: string;
    readonly buttonText?: string
    readonly placeholder?: string;
    readonly lang?: string;
    // This should be removed when it is no longer used on a current customer project.
    // It does not do anything and is just there to avoid type mismatch in the compiler.
    inputType?: string;
};