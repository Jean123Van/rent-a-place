import { COLORS } from '../../styles/colors';
import { LoadingSpinner } from '../Animation/LoadingSpinner/LoadingSpinner';
import './primarybutton.css';

interface PrimaryButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    isLoading?: boolean;
    isDisabled?: boolean;
}

export const PrimaryButton = ({
    children,
    onClick,
    isLoading,
    isDisabled,
}: PrimaryButtonProps) => {
    return isLoading ? (
        <LoadingSpinner />
    ) : (
        <button
            className="main-button"
            style={{
                border: isDisabled
                    ? '1px solid gray'
                    : `1px solid ${COLORS.skintone}`,
            }}
            onClick={onClick}
            disabled={isDisabled}
        >
            {children}
        </button>
    );
};
