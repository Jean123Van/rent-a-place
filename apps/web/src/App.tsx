import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { BookUnit } from './pages/BookUnit';
import { SignupVendor } from './pages/SignupVendor';
import { SigninVendor } from './pages/SigninVendor';
import { VendorHeader } from './components/Header/VendorHeader';
function App() {
    return (
        <Router>
            <Routes>
                {/* <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} />
                <Route path="/book/:id" element={<BookUnit />} /> */}

                <Route path="/signup/vendor" element={<SignupVendor />} />
                <Route path="/signin/vendor" element={<SigninVendor />} />

                <Route element={<VendorHeader />}>
                    <Route path="/home/vendor" element={<Home />}></Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
