import './primarybutton.css';

interface PrimaryButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
}

export const PrimaryButton = ({ children, onClick }: PrimaryButtonProps) => {
    return (
        <button className="main-button" onClick={onClick}>
            {children}
        </button>
    );
};
