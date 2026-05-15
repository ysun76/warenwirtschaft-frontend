import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ProduktListe from './pages/ProduktListe';
import ProtectedRoute from './components/ProtectedRoute';

// 确保只保留这一个 export default function App
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProduktListe />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/products" replace />} />
      </Routes>
    </BrowserRouter>
  );
}