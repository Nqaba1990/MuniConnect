import { Routes, Route } from "react-router-dom";

// Authentication
import Login from "../pages/auth/Login";
import MFA from "../pages/auth/MFA";

// Resident
import Dashboard from "../pages/resident/Dashboard";
import Water from "../pages/resident/Water";
import Sewerage from "../pages/resident/Sewerage";
import Electricity from "../pages/resident/Electricity";
import Fire from "../pages/resident/Fire";
import Refuse from "../pages/resident/Refuse";
import Eskom from "../pages/resident/Eskom";
import Tickets from "../pages/resident/Tickets";
import TicketDetails from "../pages/resident/TicketDetails";
import Profile from "../pages/resident/Profile";
import Notifications from "../pages/resident/Notifications";
import Calendar from "../pages/resident/Calendar";

// Agent
import AgentDashboard from "../pages/agent/Dashboard";
import AgentTicketDetails from "../pages/agent/TicketDetails";

// Technician
import TechnicianDashboard from "../pages/technician/Dashboard";
import TechnicianJobDetails from "../pages/technician/JobDetails";
import TechnicianJobHistory from "../pages/technician/JobHistory";

// Developer / Super Admin
import DeveloperDashboard from "../pages/developer/Dashboard";
import Municipalities from "../pages/developer/Municipalities";
import MunicipalityDetails from "../pages/developer/MunicipalityDetails";
import ServiceConfiguration from "../pages/developer/ServiceConfiguration";
import ServiceDetails from "../pages/developer/ServiceDetails";
import ServiceAreas from "../pages/developer/ServiceAreas";
import Administrators from "../pages/developer/Administrators";
import Agents from "../pages/developer/Agents";
import Technicians from "../pages/developer/Technicians";
import MunicipalAlerts from "../pages/developer/MunicipalAlerts";
import MunicipalitySettings from "../pages/developer/MunicipalitySettings";
import UserManagement from "../pages/developer/UserManagement";
import DeveloperTickets from "../pages/developer/DeveloperTickets";
import SystemSettings from "../pages/developer/SystemSettings";
import AuditLog from "../pages/developer/AuditLog";
import AdminDashboard from "../pages/admin/Dashboard";
import AdminUsers from "../pages/admin/Users";
import AdminTickets from "../pages/admin/Tickets";
import AdminServices from "../pages/admin/Services";
import AdminServiceAreas from "../pages/admin/ServiceAreas";
import AdminAlerts from "../pages/admin/Alerts";
import AdminReports from "../pages/admin/Reports";
import AdminSettings from "../pages/admin/Settings";

function AppRoutes() {
  return (
    <Routes>
      {/* =========================
          AUTHENTICATION
      ========================== */}

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/mfa"
        element={<MFA />}
      />

      {/* =========================
          RESIDENT
      ========================== */}

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/water"
        element={<Water />}
      />

      <Route
  path="/profile"
  element={<Profile />}
/>

<Route
  path="/calendar"
  element={<Calendar />}
/>

<Route
  path="/alerts"
  element={<Notifications />}
/>

      <Route
        path="/sewerage"
        element={<Sewerage />}
      />

      <Route
        path="/electricity"
        element={<Electricity />}
      />

      <Route
        path="/fire"
        element={<Fire />}
      />

      <Route
        path="/refuse"
        element={<Refuse />}
      />

      <Route
        path="/eskom"
        element={<Eskom />}
      />

      <Route
        path="/tickets"
        element={<Tickets />}
      />

      <Route
        path="/tickets/:ticketId"
        element={<TicketDetails />}
      />

      {/* =========================
          AGENT
      ========================== */}

      <Route
        path="/agent/dashboard"
        element={<AgentDashboard />}
      />

      <Route
        path="/agent/tickets/:ticketId"
        element={<AgentTicketDetails />}
      />

      {/* =========================
          TECHNICIAN
      ========================== */}

      <Route
        path="/technician/dashboard"
        element={<TechnicianDashboard />}
      />

      <Route
  path="/technician/jobs/:jobId"
  element={<TechnicianJobDetails />}
/>

<Route
  path="/technician/job-history"
  element={<TechnicianJobHistory />}
/>

      {/* =========================
          DEVELOPER / SUPER ADMIN
      ========================== */}

      <Route
        path="/developer/dashboard"
        element={<DeveloperDashboard />}
      />

      <Route
        path="/developer/municipalities"
        element={<Municipalities />}
      />

      <Route
  path="/developer/municipalities/:municipalityId/settings"
  element={<MunicipalitySettings />}
/>

<Route
  path="/developer/audit-log"
  element={<AuditLog />}
/>

<Route
  path="/admin/settings"
  element={<AdminSettings />}
/>

<Route
  path="/developer/settings"
  element={<SystemSettings />}
/>

<Route
  path="/developer/users"
  element={<UserManagement />}
/>

<Route
  path="/developer/tickets"
  element={<DeveloperTickets />}
/>

      <Route
        path="/developer/municipalities/:municipalityId"
        element={<MunicipalityDetails />}
      />

      <Route
  path="/admin/reports"
  element={<AdminReports />}
/>

      <Route
  path="/admin/alerts"
  element={<AdminAlerts />}
/>

      <Route
  path="/admin/service-areas"
  element={<AdminServiceAreas />}
/>

      <Route
  path="/admin/tickets"
  element={<AdminTickets />}
/>

<Route
  path="/admin/services"
  element={<AdminServices />}
/>

      <Route
  path="/developer/municipalities/:municipalityId/services"
  element={<ServiceConfiguration />}
/>

<Route
  path="/admin/dashboard"
  element={<AdminDashboard />}
/>

<Route
  path="/developer/municipalities/:municipalityId/services/:serviceId"
  element={<ServiceDetails />}
/>

<Route
  path="/developer/municipalities/:municipalityId/service-areas"
  element={<ServiceAreas />}
/>

<Route
  path="/developer/municipalities/:municipalityId/administrators"
  element={<Administrators />}
/>

<Route
  path="/admin/users"
  element={<AdminUsers />}
/>

<Route
  path="/developer/municipalities/:municipalityId/agents"
  element={<Agents />}
/>

<Route
  path="/developer/municipalities/:municipalityId/technicians"
  element={<Technicians />}
/>

<Route
  path="/developer/municipalities/:municipalityId/alerts"
  element={<MunicipalAlerts />}
/>
    </Routes>
  );
}

export default AppRoutes;