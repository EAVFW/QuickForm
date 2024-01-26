type ErrorIconProps = {
    classNames?: string;
}

export const ErrorIcon: React.FC<ErrorIconProps> = ({ classNames }) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <svg
                width="100"
                height="100"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    className={`${classNames}`}
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="red"
                    strokeWidth="2"
                />
                <line
                    className={`${classNames}`}
                    x1="6"
                    y1="6"
                    x2="18"
                    y2="18"
                    stroke="red"
                    strokeWidth="2"
                />
                <line
                    className={`${classNames}`}
                    x1="18"
                    y1="6"
                    x2="6"
                    y2="18"
                    stroke="red"
                    strokeWidth="2"
                />
            </svg>
        </div>
    );
}
