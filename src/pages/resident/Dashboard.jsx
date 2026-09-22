import {
  Droplets,
  Waves,
  Zap,
  Flame,
  Trash2,
  Building2,
  Ticket,
  Bell,
  CalendarDays,
  User,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import "../../styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const services = [
    {
      title: "Water",
      description: "Report water leaks, outages and other water problems.",
      icon: Droplets,
      className: "water",
      path: "/water",
    },
    {
      title: "Sewerage",
      description: "Report blocked drains, sewage leaks and related faults.",
      icon: Waves,
      className: "sewerage",
      path: "/sewerage",
    },
    {
      title: "Electricity",
      description: "Report municipal electricity faults and outages.",
      icon: Zap,
      className: "electricity",
      path: "/electricity",
    },
    {
      title: "Fire Department",
      description: "Access fire department and emergency services.",
      icon: Flame,
      className: "fire",
      path: "/fire",
    },
    {
      title: "Refuse",
      description: "Report missed collections and refuse-related issues.",
      icon: Trash2,
      className: "refuse",
      path: "/refuse",
    },
    {
      title: "Eskom",
      description: "Report Eskom electricity faults and outages.",
      icon: Zap,
      className: "eskom",
      path: "/eskom",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard-page">

      {/* Header */}
      <header className="dashboard-header">

        <div className="header-left">
          <div className="header-logo">
            <span className="logo-m">M</span>
          </div>

          <div>
            <h1>MuniConnect</h1>
            <p>Community Services</p>
          </div>
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>

      </header>

      <main className="dashboard-content">

        {/* Welcome */}
        <section className="welcome-section">
          <div>
            <p className="welcome-small">
              Welcome back
            </p>

            <h2>
              {user?.name || "Resident"}
            </h2>

            <p className="municipality-name">
              Your Municipality
            </p>
          </div>
        </section>

        {/* Emergency banner */}
        <section className="emergency-banner">
          <div className="emergency-icon">
            <Bell size={24} />
          </div>

          <div>
            <strong>Municipal Alerts</strong>
            <p>
              Stay informed about outages, emergencies and
              important community announcements.
            </p>
          </div>

          <button onClick={() => navigate("/alerts")}>
            View Alerts
          </button>
        </section>

        {/* Services */}
        <section className="services-section">

          <div className="section-heading">
            <div>
              <h3>Report a Fault</h3>
              <p>Select a service to report a problem.</p>
            </div>
          </div>

          <div className="services-grid">

            {services.map((service) => {
              const Icon = service.icon;

              return (
                <button
                  key={service.title}
                  className={`service-card ${service.className}`}
                  onClick={() => navigate(service.path)}
                >
                  <div className="service-icon">
                    <Icon size={30} />
                  </div>

                  <div className="service-info">
                    <h4>{service.title}</h4>
                    <p>{service.description}</p>
                  </div>

                  <span className="service-arrow">
                    →
                  </span>
                </button>
              );
            })}

          </div>

        </section>

        {/* Quick actions */}
        <section className="quick-section">

          <h3>Quick Access</h3>

          <div className="quick-grid">

            <button onClick={() => navigate("/tickets")}>
              <Ticket size={22} />
              <span>
                <strong>My Tickets</strong>
                <small>Track your reports</small>
              </span>
            </button>

            <button onClick={() => navigate("/alerts")}>
              <Bell size={22} />
              <span>
                <strong>Notifications</strong>
                <small>View updates</small>
              </span>
            </button>

            <button onClick={() => navigate("/calendar")}>
              <CalendarDays size={22} />
              <span>
                <strong>Calendar</strong>
                <small>Community events</small>
              </span>
            </button>

            <button onClick={() => navigate("/profile")}>
              <User size={22} />
              <span>
                <strong>My Profile</strong>
                <small>Manage your account</small>
              </span>
            </button>

          </div>

        </section>

      </main>

      {/* Bottom navigation */}
      <nav className="bottom-navigation">

        <button
          className="active"
          onClick={() => navigate("/dashboard")}
        >
          <Building2 size={21} />
          <span>Home</span>
        </button>

        <button onClick={() => navigate("/tickets")}>
          <Ticket size={21} />
          <span>Tickets</span>
        </button>

        <button onClick={() => navigate("/alerts")}>
          <Bell size={21} />
          <span>Alerts</span>
        </button>

        <button onClick={() => navigate("/profile")}>
          <User size={21} />
          <span>Profile</span>
        </button>

      </nav>

    </div>
  );
}

export default Dashboard;