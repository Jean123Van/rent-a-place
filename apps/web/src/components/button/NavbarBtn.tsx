import { COLORS } from '../../styles/colors';

interface NavbarBtnProps {
    children?: React.ReactNode;
    isActive?: boolean;
}

export const NavbarBtn = ({ children, isActive }: NavbarBtnProps) => {
    return (
        <button
            style={{
                border: 'none',
                background: COLORS.white,
                height: '100%',
                width: '90px',
                color: COLORS.skintone,
                fontSize: '14px',
                textDecoration: isActive ? 'underline' : undefined,
                cursor: 'pointer',
            }}
        >
            {children}
        </button>
    );
};
