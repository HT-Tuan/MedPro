import { useLocation, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Home from './components/Home';
import Login from './components/user/Login';
import Register from './components/user/Register';
import ProtectedRoute from './route/ProtectedRoute';
import { Fragment } from 'react';

function App() {
  return (
    <Router>
      <div className="App">
        <AppContent />
      </div>
    </Router>
  );
}
function AppContent() {
  const location = useLocation();
  const isAuth = location.pathname === '/login' || location.pathname === '/register';

  return (
    <Fragment>
      <Header isAuth={isAuth} />
      <div className="container container-fluid">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/search/:keyword" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
      <Footer />
    </Fragment>
  );
}

export default App;
