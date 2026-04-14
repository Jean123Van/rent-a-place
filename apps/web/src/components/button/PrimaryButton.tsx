import { LoadingSpinner } from '../Animation/LoadingSpinner/LoadingSpinner';
import './primarybutton.css';

interface PrimaryButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    isLoading?: boolean;
}

export const PrimaryButton = ({
    children,
    onClick,
    isLoading,
}: PrimaryButtonProps) => {
    return isLoading ? (
        <LoadingSpinner />
    ) : (
        <button className="main-button" onClick={onClick}>
            {children}
        </button>
    );
};
