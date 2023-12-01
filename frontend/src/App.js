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
import Booking from './components/book/Booking';
import Ticket from './components/tickets/Ticket';
import Dashboard from './components/admin/Dashboard';
import TicketAdmin from './components/admin/TicketAdmin';
import DoctorAdmin from './components/admin/DoctorAdmin';
import UserAdmin from './components/admin/UserAdmin';
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
  const isHome = location.pathname === '/' || location.pathname.startsWith('/search') || location.pathname.startsWith('/admin/doctors') || location.pathname.startsWith('/admin/users');
  const isRecord = location.pathname.startsWith('/me/records') || location.pathname.startsWith('/admin/tickets');
  

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
          <Route path="/book/:doctor" element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          } />
          <Route path="/me/records/:keyword" element={
            <ProtectedRoute>
              <List />
            </ProtectedRoute>
          } />
          <Route path="/me/tickets" element={
            <ProtectedRoute>
              <Ticket />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
      <Routes>
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/tickets" element={
          <ProtectedRoute>
            <TicketAdmin />
          </ProtectedRoute>
        } />
        <Route path="/admin/tickets/:keyword" element={
          <ProtectedRoute>
            <TicketAdmin />
          </ProtectedRoute>
        } />
        <Route path="/admin/doctors" element={
          <ProtectedRoute>
            <DoctorAdmin />
          </ProtectedRoute>
        } />
        <Route path="/admin/doctors/:keyword" element={
          <ProtectedRoute>
            <DoctorAdmin />
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute>
            <UserAdmin />
          </ProtectedRoute>
        } />
        <Route path="/admin/users/:keyword" element={
          <ProtectedRoute>
            <UserAdmin />
          </ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </Fragment>
  );
}

export default App;
