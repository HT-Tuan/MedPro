import { useLocation, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Home from './components/Home';
import Login from './components/user/Login';
import Register from './components/user/Register';
import ForgotPassword from './components/user/ForgotPassword';
import UpdatePassword from './components/user/UpdatePassword';
import ProtectedRoute from './route/ProtectedRoute';
import List from './components/records/List';
import Page404 from './utils/Page404';
import Page500 from './utils/Page500';
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
  const isHome = location.pathname === '/' || location.pathname.startsWith('/search');
  const isRecord = location.pathname.startsWith('/me/records');

  return (
    <Fragment>
      <Header isHome={isHome} isRecord={isRecord} />
      <div className="container container-fluid">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
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
          <Route path="/update-password" element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          } />
          <Route path="/me/records" element={
            <ProtectedRoute>
              <List />
            </ProtectedRoute>
          } />
          <Route path="/me/records/:keyword" element={
            <ProtectedRoute>
              <List />
            </ProtectedRoute>
          } />
          <Route path='/error' element={<Page500 />} />
          <Route path='/*' element={<Page404 />} />
        </Routes>
      </div>
      <Footer />
    </Fragment>
  );
}

export default App;
