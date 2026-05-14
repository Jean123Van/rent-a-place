import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { COLORS } from '../../styles/colors';
import { NavbarBtn } from '../button/NavbarBtn';
import { UserTypes } from '../../utils/types';
import { useQueryClient } from '@tanstack/react-query';

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
    const queryClient = useQueryClient();

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
                    border: '2px solid white',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '40px',
                    borderRadius: '10px',
                    width: 'fit-content',
                    margin: 'auto',
                    marginTop: '10px',
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
                            isActive={location.pathname.includes(route.route)}
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

                        queryClient.clear();
                    }}
                />
            </header>
            <main
                style={{
                    flex: '1',
                    position: 'relative',
                }}
            >
                <Outlet />
            </main>
        </div>
    );
};
