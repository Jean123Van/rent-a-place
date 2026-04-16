import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignupVendor } from './pages/SignupVendor';
import { SigninVendor } from './pages/SigninVendor';
import { VendorHeader } from './components/Header/VendorHeader';
import { CreateProduct } from './pages/CreateProduct';
import { VendorProducts } from './pages/VendorProducts';
import { VendorTransactions } from './pages/VendorTransactions';
import { VendorProtectedGuard } from './components/guard/VendorProtectedGuard';
import { Signup } from './pages/Signup';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<Signup />} />

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
    );
}

export default App;
