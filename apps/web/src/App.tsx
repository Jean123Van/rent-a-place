import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignupVendor } from './pages/SignupVendor';
import { SigninVendor } from './pages/SigninVendor';
import { VendorHeader } from './components/Header/VendorHeader';
import { CreateProduct } from './pages/CreateProduct';
import { VendorProducts } from './pages/VendorProducts';
import { VendorTransactions } from './pages/VendorTransactions';
import { VendorProtectedGuard } from './components/guard/VendorProtectedGuard';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { UserHeader } from './components/Header/UserHeader';
import { CustomerProducts } from './pages/CustomerProducts';
import { CustomerTransactions } from './pages/CustomerTransactions';
import { CustomerProtectedGuard } from './components/guard/CustomerProtectedGuard';
import { VendorProductList } from './pages/VendorProductList';
import { ToastProvider } from './components/Toast/toastProvider';
function App() {
    return (
        <ToastProvider>
            <Router>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/" element={<Signin />} />

                    <Route
                        element={
                            <CustomerProtectedGuard>
                                <UserHeader />
                            </CustomerProtectedGuard>
                        }
                    >
                        <Route
                            path="/customer/vendor-list"
                            element={<CustomerProducts />}
                        />
                        <Route
                            path="customer/vendor-list/:vendorId"
                            element={<VendorProductList />}
                        />
                        <Route
                            path="/customer/transactions"
                            element={<CustomerTransactions />}
                        />
                    </Route>

                    <Route path="/signup/vendor" element={<SignupVendor />} />
                    <Route path="/signin/vendor" element={<SigninVendor />} />

                    <Route
                        element={
                            <VendorProtectedGuard>
                                <VendorHeader />
                            </VendorProtectedGuard>
                        }
                    >
                        <Route
                            path="/create-product"
                            element={<CreateProduct />}
                        ></Route>
                        <Route
                            path="/vendor/products"
                            element={<VendorProducts />}
                        ></Route>
                        <Route
                            path="/vendor/transactions"
                            element={<VendorTransactions />}
                        ></Route>
                    </Route>
                </Routes>
            </Router>
        </ToastProvider>
    );
}

export default App;
