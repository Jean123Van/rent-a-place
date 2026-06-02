import { LoadingSpinner } from '../Animation/LoadingSpinner/LoadingSpinner';
import './primarybutton.css';

interface PrimaryButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    isLoading?: boolean;
    isDisabled?: boolean;
    style?: React.CSSProperties;
}

export const PrimaryButton = ({
    children,
    onClick,
    isLoading,
    isDisabled,
    style,
}: PrimaryButtonProps) => {
    return isLoading ? (
        <LoadingSpinner />
    ) : (
        <button
            className="main-button"
            style={{
                ...style,
                border: isDisabled ? '1px solid gray' : `1px solid white`,
            }}
            onClick={onClick}
            disabled={isDisabled}
        >
            {children}
        </button>
    );
};
