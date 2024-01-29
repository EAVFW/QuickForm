
interface RightArrowProps {
    className?: string;
    size?: string;
}

export const RightArrow: React.FC<RightArrowProps> = ({ className, size = '16px' }) => {
    return (
        <div className={className}>
            <svg viewBox="0 0 448 512" height={size} width={size}>
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
        </div>
    );
};

