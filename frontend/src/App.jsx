import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import CustomerJourney from "./pages/CustomerJourney";
import Overview from "./components/overview/Overview";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route 
                index 
                element={
                  <ProtectedRoute>
                    <Overview/>
                  </ProtectedRoute>
                }
              />
              <Route 
                path="customer-journey" 
                element={
                  <ProtectedRoute>
                    <CustomerJourney />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
