import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Tracker from "../pages/tracker";
import Layout from "./layout";
import { Resume } from "../pages/tracker/resume";
import { Home } from "../pages/tracker/home";
import Projects from "../pages/tracker/projects";
import Login from "../pages/login";
import Register from "../pages/register";
import ProtectedRoute from "../compenents/ProtectedRoute";
import { useSelector } from "react-redux";
import Dashboard from "../pages/dashboard";

const RootRouter = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/login" />} />
          {/* Protected Route for /tracker */}
          <Route element={<ProtectedRoute />}>
            <Route path="tracker" element={<Tracker />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
          </Route>
          <Route path="resume" element={<Resume />} />
          <Route
            path="login"
            element={
              auth.isAuthenticated ? <Navigate to="/tracker" /> : <Login />
            }
          />
          <Route path="register" element={<Register />} />
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RootRouter;
