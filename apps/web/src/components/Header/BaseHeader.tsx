import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { COLORS } from '../../styles/colors';
import { NavbarBtn } from '../button/NavbarBtn';
import { UserTypes } from '../../utils/types';

interface RouteType {
    title: string;
    route: string;
}

interface BaseHeaderProps {
    routes: RouteType[];
    type: UserTypes;
}

export const BaseHeader = ({ routes, type }: BaseHeaderProps) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <header
                style={{
                    borderBottom: `3px solid ${COLORS.skintone}`,
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '5px',
                    }}
                >
                    {routes.map((route) => (
                        <NavbarBtn
                            key={route.title}
                            title={route.title}
                            isActive={location.pathname === route.route}
                            onClick={() => {
                                navigate(route.route);
                            }}
                        />
                    ))}
                </div>
                <NavbarBtn
                    title="Logout"
                    onClick={() => {
                        if (type === UserTypes.USER) {
                            localStorage.removeItem('customer-token');
                            navigate('/signin');
                        }

                        if (type === UserTypes.VENDOR) {
                            localStorage.removeItem('vendor-token');
                            navigate('/signin/vendor');
                        }
                    }}
                />
            </header>
            <main style={{ flex: '1' }}>
                <Outlet />
            </main>
        </div>
    );
};
