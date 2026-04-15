import { Outlet } from 'react-router-dom';
import { COLORS } from '../../styles/colors';
import { NavbarBtn } from '../button/NavbarBtn';
import { useLocation, useNavigate } from 'react-router-dom';

export const VendorHeader = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const routes = [
        { title: 'Create product', route: '/create-product' },
        { title: 'Products', route: '/vendor/products' },
        { title: 'Transactions', route: '/vendor/transactions' },
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
                    <NavbarBtn
                        title={route.title}
                        isActive={location.pathname === route.route}
                        onClick={() => {
                            navigate(route.route);
                        }}
                    />
                ))}
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
};
