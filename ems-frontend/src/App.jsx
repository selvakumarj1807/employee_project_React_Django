import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import FormBuilder from "./pages/FormBuilder";
import EmployeeCreate from "./pages/EmployeeCreate";
import EmployeeList from "./pages/EmployeeList";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/form-builder" element={<FormBuilder />} />
          <Route path="/employee-create" element={<EmployeeCreate />} />
          <Route path="/employee-create/:id" element={<EmployeeCreate />} />
          <Route path="/employees" element={<EmployeeList />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
