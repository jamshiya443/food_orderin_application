
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import AdminPanel from './components/AdminPanel';
import UserPanel from './components/UserPanel';
import Cart from './components/cart';
import MyOrders from './components/MyOrders';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Contact from './components/contact';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Route */}
        <Route
          path="/admin-panel"
          element={
            <ProtectedRoute allowedRole="admin">
              <Layout>
                <AdminPanel />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Customer Route */}
        <Route
          path="/user-panel"
          element={
            <ProtectedRoute allowedRole="user">
              <Layout>
                <UserPanel />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Cart Route */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute allowedRole="user">
              <Layout>
                <Cart />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* My Orders Route */}
        <Route
          path="/my-orders"
          element={
            <ProtectedRoute allowedRole="user">
              <Layout>
                <MyOrders />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Contact Route */}
        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />

        {/* Unknown Routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
