import { Outlet } from 'react-router-dom';
import { COLORS } from '../../styles/colors';
import { NavbarBtn } from '../button/NavbarBtn';

export const VendorHeader = () => {
    const routes = [
        { title: 'Create product', route: '' },
        { title: 'Products', route: '' },
        { title: 'Transactions', route: '' },
    ];

    return (
        <div>
            <header
                style={{
                    borderBottom: `3px solid ${COLORS.skintone}`,
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '5px',
                }}
            >
                {routes.map((route) => (
                    <NavbarBtn title={route.title} />
                ))}
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
};
