import { useNavigate } from "react-router-dom";
import {
  Building2,
  Users,
  Wrench,
  Ticket,
  Bell,
  Settings,
  ShieldCheck,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "../../styles/developer-dashboard.css";

function DeveloperDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const managementCards = [
    {
      title: "Municipalities",
      description: "Add and manage municipalities using MuniConnect.",
      icon: Building2,
      count: "4",
      action: () => navigate("/developer/municipalities"),
    },
    {
      title: "Users",
      description: "Manage administrators, agents, technicians and residents.",
      icon: Users,
      count: "128",
      action: () => navigate("/developer/users"),
    },
    {
      title: "Services",
      description: "Configure municipal departments and community services.",
      icon: Wrench,
      count: "7",
      action: () => navigate("/developer/services"),
    },
    {
      title: "Tickets",
      description: "View system-wide fault reports and service requests.",
      icon: Ticket,
      count: "342",
      action: () => navigate("/developer/tickets"),
    },
    {
      title: "Municipal Alerts",
      description: "Manage alerts published to communities.",
      icon: Bell,
      count: "12",
      action: () => navigate("/developer/alerts"),
    },
    {
      title: "System Settings",
      description: "Configure global MuniConnect platform settings.",
      icon: Settings,
      count: null,
      action: () => navigate("/developer/settings"),
    },
  ];

  return (
    <div className="developer-page">
      {/* Sidebar */}
      <aside className="developer-sidebar">
        <div className="developer-brand">
          <div className="developer-logo">M</div>

          <div>
            <h2>MuniConnect</h2>
            <span>Developer Portal</span>
          </div>
        </div>

        <nav className="developer-nav">
          <button
            className="developer-nav-item active"
            onClick={() => navigate("/developer/dashboard")}
          >
            <ShieldCheck size={20} />
            <span>Dashboard</span>
          </button>

          <button
            className="developer-nav-item"
            onClick={() => navigate("/developer/municipalities")}
          >
            <Building2 size={20} />
            <span>Municipalities</span>
          </button>

          <button
            className="developer-nav-item"
            onClick={() => navigate("/developer/users")}
          >
            <Users size={20} />
            <span>Users</span>
          </button>

          <button
            className="developer-nav-item"
            onClick={() => navigate("/developer/services")}
          >
            <Wrench size={20} />
            <span>Services</span>
          </button>

          <button
            className="developer-nav-item"
            onClick={() => navigate("/developer/tickets")}
          >
            <Ticket size={20} />
            <span>Tickets</span>
          </button>

          <button
            className="developer-nav-item"
            onClick={() => navigate("/developer/alerts")}
          >
            <Bell size={20} />
            <span>Alerts</span>
          </button>

          <button
            className="developer-nav-item"
            onClick={() => navigate("/developer/settings")}
          >
            <Settings size={20} />
            <span>System Settings</span>
          </button>
        </nav>

        <div className="developer-sidebar-bottom">
          <div className="developer-role">
            <ShieldCheck size={18} />
            <div>
              <strong>Super Admin</strong>
              <span>Full system access</span>
            </div>
          </div>

          <button className="developer-logout" onClick={handleLogout}>
            <LogOut size={19} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="developer-main">
        <header className="developer-header">
          <div>
            <p className="developer-eyebrow">SYSTEM ADMINISTRATION</p>
            <h1>Developer Dashboard</h1>
            <p>
              Manage the MuniConnect platform, municipalities, users and
              services.
            </p>
          </div>

          <div className="developer-header-badge">
            <ShieldCheck size={18} />
            Super Admin
          </div>
        </header>

        {/* Overview */}
        <section className="developer-overview">
          <div className="overview-card">
            <div className="overview-icon">
              <Building2 size={22} />
            </div>

            <div>
              <span>Active Municipalities</span>
              <strong>4</strong>
            </div>
          </div>

          <div className="overview-card">
            <div className="overview-icon">
              <Users size={22} />
            </div>

            <div>
              <span>Total Users</span>
              <strong>128</strong>
            </div>
          </div>

          <div className="overview-card">
            <div className="overview-icon">
              <Ticket size={22} />
            </div>

            <div>
              <span>Open Tickets</span>
              <strong>86</strong>
            </div>
          </div>

          <div className="overview-card">
            <div className="overview-icon">
              <Bell size={22} />
            </div>

            <div>
              <span>Active Alerts</span>
              <strong>12</strong>
            </div>
          </div>
        </section>

        {/* Management */}
        <section className="developer-section">
          <div className="section-heading">
            <div>
              <h2>Platform Management</h2>
              <p>Manage the different areas of MuniConnect.</p>
            </div>
          </div>

          <div className="developer-card-grid">
            {managementCards.map((card) => {
              const Icon = card.icon;

              return (
                <button
                  key={card.title}
                  className="developer-management-card"
                  onClick={card.action}
                >
                  <div className="management-card-top">
                    <div className="management-icon">
                      <Icon size={24} />
                    </div>

                    {card.count && (
                      <span className="management-count">
                        {card.count}
                      </span>
                    )}
                  </div>

                  <div className="management-card-content">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>

                  <div className="management-card-footer">
                    <span>Manage</span>
                    <ChevronRight size={18} />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Important information */}
        <section className="developer-info">
          <div className="developer-info-icon">
            <ShieldCheck size={24} />
          </div>

          <div>
            <h3>Multi-Municipality Administration</h3>
            <p>
              Municipalities are isolated from one another. Residents,
              agents, technicians, tickets, services and alerts will belong
              to their assigned municipality.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DeveloperDashboard;