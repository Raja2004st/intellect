import logo from "./logo.svg";
import "./App.css";
import MainPage from "./pages/main";
import HomePage from "./pages/homePage";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    // <div className="App">
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="user/reports" element={<MainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    // </div>
  );
}

export default App;
