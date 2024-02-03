import { useDelayedClickListener } from "../../hooks";
import styles from "./ErrorMessage.module.css";
import { useQuickForm } from "../../state/QuickFormContext";

type ErrorProps = {
  readonly message: string;
};

export const ErrorMessage: React.FC<ErrorProps> = ({ message }: ErrorProps) => {

  if (message === "") {
    return <></>
  }
  // This is used to remove the error message when user clicks anywhere with the mouse.
  const { dispatch } = useQuickForm();
  useDelayedClickListener(() => dispatch({ type: "SET_ERROR_MSG", msg: "" }));

  return (
    <div className={styles["error"]}>
      {message}
    </div>
  );
}
