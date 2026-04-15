import { Outlet } from 'react-router-dom';

export const VendorHeader = () => {
    return (
        <div>
            <header>Vendor header</header>
            <main>
                <Outlet />
            </main>
        </div>
    );
};
