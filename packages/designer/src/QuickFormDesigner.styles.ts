import { makeStyles, shorthands, tokens } from "@fluentui/react-components";


export const useQuickFormDesignerStyles = makeStyles({
    root: {
        ...shorthands.border("2px", "solid", "#ccc"),
        ...shorthands.overflow("hidden"),

        display: "flex",
        minHeight: "480px",
        backgroundColor: tokens.colorNeutralBackground2,
        position: "relative"
    },

    content: {
        ...shorthands.flex(1),
        display: "flex",
        zIndex: 10
    },

    contentView: {
        ...shorthands.flex(1),
        display: "flex",
        flexDirection: "column"

    },


    field: {
        display: "grid",
        gridRowGap: tokens.spacingVerticalS,
    },
});