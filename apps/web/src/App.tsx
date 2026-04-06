import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { BookUnit } from './pages/BookUnit';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} />
                <Route path="/book/:id" element={<BookUnit />} />
            </Routes>
        </Router>
    );
}

export default App;
