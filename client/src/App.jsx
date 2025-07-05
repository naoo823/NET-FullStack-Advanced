// App rootimport { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import { Header } from './components/layout/Header.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx'; // We'll create this

import Home from './pages/Home.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';

import './App.css'; // For our Aurora background

// A placeholder for other pages
const Services = () => <h1 className="text-4xl text-center">Our Services</h1>;

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <>
      <div className="aurora-background"></div>
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          style: {
            background: '#1e1e1e',
            color: '#e2e8f0',
            border: '1px solid #333'
          },
        }}
      />
      <div className="flex flex-col min-h-screen bg-dark/70 backdrop-blur-3xl relative z-10">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;