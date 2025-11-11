// App.jsx
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./Dashboard";
import Organisation from "./Organisation";
import LoginPage from "./LoginPage";
import PurchaseTabs from "./PurchaseModule/PurchaseTabs";
import PurchaseDashboard from "./PurchaseModule/PurchaseDashboard";
import SaleTabs from "./SaleModule/SaleTabs";
import MasterTables from "./MasterTable/MasterTables";
import ReportsAnalytics from "./ReportsAnalytics";
import ProfileSetings from "./ProfileSetings";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        {isAuthenticated ? (
          <Route path="/admin" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
             <Route path="organisation" element={<Organisation />} />
            <Route path="purchase/*" element={<PurchaseTabs />} />
            <Route path="dashboard/*"element={<PurchaseDashboard/>}/>
            <Route path="sales/*" element={<SaleTabs />} />
            <Route path="master/*" element={<MasterTables />} />
            <Route path="reports/*" element={<ReportsAnalytics/>}/>
            <Route path="settings/*" element={<ProfileSetings/>}/>
          </Route>

        ) : (
          <Route path="/admin/*" element={<Navigate to="/login" replace />} />
        )}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
