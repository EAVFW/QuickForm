import styles from "./ErrorMessage.module.css";

type ErrorProps = {
  readonly message: string;
};

export const ErrorMessage: React.FC<ErrorProps> = ({ message }: ErrorProps) => {

  return (
    <div className={styles["error"]}>
      {message}
    </div>
  );
}
