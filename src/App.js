import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AdminPanel from './components/AdminPanel';
import UserPanel from './components/UserPanel';
import Cart from './components/cart';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Contact from './components/contact';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
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
        <Route
  path="/contact"
  element={
    <Layout>
      <Contact />
    </Layout>
  }
/>


        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
