import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Landing from './pages/Landing/Landing';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Signup from './components/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';

const pageVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.5 }}
            >
              <Landing />
            </motion.div>
          }
        />
        <Route
          path="/Navbar"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.5 }}
            >
              <Navbar />
            </motion.div>
          }
        />
        <Route
          path="/Login"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.5 }}
            >
              <Login />
            </motion.div>
          }
        />
        <Route
          path="/SignUp"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.5 }}
            >
              <Signup />
            </motion.div>
          }
        />
        <Route
          path="/Dashboard"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ duration: 0.5 }}
            >
              <Dashboard />
            </motion.div>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <AnimatedRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;
