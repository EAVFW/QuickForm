type CheckmarkProps = {
    classNames?: string;
}

export const Checkmark: React.FC<CheckmarkProps> = ({ classNames }) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <svg
                width="100"
                height="100"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    className={`${classNames}`}
                    d="M20 6L9 17L4 12"
                    stroke="green"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
}

