import './navbarBtn.css';

interface NavbarBtnProps {
    title?: string;
    isActive?: boolean;
    onClick?: () => void;
}

export const NavbarBtn = ({
    title = '',
    isActive,
    onClick,
}: NavbarBtnProps) => {
    return (
        <button
            className={`navbar-btn ${isActive ? 'navbar-btn-active' : 'navbar-btn-inactive'}`}
            onClick={onClick}
        >
            {title}
        </button>
    );
};
