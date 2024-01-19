// import { makeStyles, mergeClasses, shorthands } from "@griffel/react";
// import { withTheme } from "@rjsf/core";
// import { RJSFSchema, StrictRJSFSchema, FormContextType, BaseInputTemplateProps, getInputProps } from "@rjsf/utils";
// import { ChangeEvent, FocusEvent } from "react";

// const useTextInputStyles = makeStyles({
//     inputText: {
//         backgroundColor: "transparent",
//         ...shorthands.border("none"),
//         ...shorthands.borderBottom("1px", "solid", "var(--on-surface)"),
//         color: "var(--on-surface)",
//         fontSize: "2rem",
//         marginTop: "6px",
//         paddingBottom: "9px",
//         width: "100%",
//         "::placeholder": {
//           /* Chrome, Firefox, Opera, Safari 10.1+ */
//           color: "var(--on-surface)",
//           opacity: "var(--medium-emphasis-opacity)",
//         },
//         ":focus-visible": {
//             ...shorthands.borderBottom("2px", "solid", "var(--on-surface)"),
//             ...shorthands.outline(0,"none"),
//             paddingBottom:"8px"
//         },
//         '@media screen and (max-width: 600px)': {
//             fontSize: "1.9rem",
//             marginTop: "4px"
//         }
//       //  ...shorthands.border("1px", "solid","#f0f0f0"),
//       //  ...shorthands.borderRadius("8px")
//     }

//     //.input__text:focus-visible {
//     //  border-bottom: 2px solid var(--on-surface);
//     //  outline: none;
//     //}

//     //.input__text::placeholder {
//     //  /* Chrome, Firefox, Opera, Safari 10.1+ */
//     //  color: var(--on-surface);
//     //  opacity: var(--medium-emphasis-opacity);
//     //}

//     //.input__text::-ms-input-placeholder {
//     //  /* Microsoft Edge */
//     //  color: var(--on-surface);
//     //  opacity: var(--medium-emphasis-opacity);
//     //}

//     //@media screen and (max-width: 599px) {
//     //  .input__text {
//     //    font-size: 2.9rem;
//     //    margin-top: 32px;
//     //  }
//     //}

// });

// export function BaseInputTemplate<
//     T = any,
//     S extends StrictRJSFSchema = RJSFSchema,
//     F extends FormContextType = any
// >({
//     id,
//     placeholder,
//     required,
//     readonly,
//     disabled,
//     label,
//     hideLabel,
//     value,
//     onChange,
//     onChangeOverride,
//     onBlur,
//     onFocus,
//     autofocus,
//     options,
//     schema,
//     type,
//     rawErrors,
//     multiline, uiSchema
// }: BaseInputTemplateProps<T, S, F>) {

//     const styles = useTextInputStyles();
//     console.log("UIPROPS", [uiSchema, options, value]);
//     const inputProps = getInputProps<T, S, F>(schema, type, options);
//     const _onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
//         onChange(value === '' ? options.emptyValue : value);
//     const _onBlur = ({ target: { value } }: FocusEvent<HTMLInputElement>) => onBlur(id, value);
//     const _onFocus = ({ target: { value } }: FocusEvent<HTMLInputElement>) => onFocus(id, value);

//     const uiProps = options ?? {};
//     console.log("UIPROPS", [uiProps, inputProps]);
//     return (
//         <>
//             <input
                 
//                 className={mergeClasses(
//                     styles.inputText,
//                     options.classNames
//                 )}
//                 type={type ?? "text"}
//                 placeholder={placeholder ?? ""}
//                 defaultValue={value}
//                 onChange={_onChange}
//             />
//         </>
//     );
// }


// export const QuickSchemaForm = withTheme({
//     templates: {
//         BaseInputTemplate
//     }
// });