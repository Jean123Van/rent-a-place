import './navbarBtn.css';

interface NavbarBtnProps {
    title?: string;
}

export const NavbarBtn = ({ title = '' }: NavbarBtnProps) => {
    return <button className="navbar-btn">{title}</button>;
};
