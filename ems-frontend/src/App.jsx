import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import FormBuilder from "./pages/FormBuilder";
import EmployeeCreate from "./pages/EmployeeCreate";
import EmployeeList from "./pages/EmployeeList";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />


        {/* PROTECTED ROUTES */}

        <Route element={<ProtectedRoute />}>

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/change-password" element={<ChangePassword />} />

          <Route path="/form-builder" element={<FormBuilder />} />

          <Route path="/employee-create" element={<EmployeeCreate />} />

          <Route path="/employee-create/:id" element={<EmployeeCreate />} />

          <Route path="/employees" element={<EmployeeList />} />

        </Route>


        {/* FALLBACK ROUTE */}

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;