import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserRound,
  Wrench,
  Ticket,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Building2,
  Settings,
  Bell,
  BarChart3,
  ArrowRight,
  LogOut,
} from "lucide-react";

import "../../styles/admin-dashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const municipality = {
    name: "Raymond Mhlaba Local Municipality",
    code: "RMLM",
    province: "Eastern Cape",
  };

  const stats = [
    {
      title: "Total Residents",
      value: "1,248",
      change: "+24 this month",
      icon: <UserRound size={21} />,
      className: "residents",
    },
    {
      title: "Agents",
      value: "18",
      change: "16 active",
      icon: <Users size={21} />,
      className: "agents",
    },
    {
      title: "Technicians",
      value: "32",
      change: "29 active",
      icon: <Wrench size={21} />,
      className: "technicians",
    },
    {
      title: "Open Tickets",
      value: "86",
      change: "14 urgent",
      icon: <Ticket size={21} />,
      className: "tickets",
    },
  ];

  const serviceStats = [
    {
      service: "Water",
      open: 24,
      progress: 11,
      resolved: 48,
    },
    {
      service: "Electricity",
      open: 18,
      progress: 9,
      resolved: 36,
    },
    {
      service: "Sewerage",
      open: 12,
      progress: 7,
      resolved: 29,
    },
    {
      service: "Refuse",
      open: 9,
      progress: 5,
      resolved: 22,
    },
    {
      service: "Fire Department",
      open: 5,
      progress: 3,
      resolved: 14,
    },
    {
      service: "Eskom",
      open: 18,
      progress: 8,
      resolved: 31,
    },
  ];

  const recentTickets = [
    {
      ticket: "MC-WATE-104821",
      title: "Burst water pipe",
      resident: "Demo Resident",
      service: "Water",
      priority: "HIGH",
      status: "OPEN",
      time: "12 min ago",
    },
    {
      ticket: "MC-FIRE-104799",
      title: "Fire hydrant damaged",
      resident: "Nomsa Mbeki",
      service: "Fire Department",
      priority: "URGENT",
      status: "ASSIGNED",
      time: "1 hour ago",
    },
    {
      ticket: "MC-SEWE-104802",
      title: "Blocked sewer line",
      resident: "Sipho Dlamini",
      service: "Sewerage",
      priority: "HIGH",
      status: "IN_PROGRESS",
      time: "2 hours ago",
    },
    {
      ticket: "MC-REFU-104808",
      title: "Missed refuse collection",
      resident: "Ayanda Peterson",
      service: "Refuse",
      priority: "LOW",
      status: "RESOLVED",
      time: "Yesterday",
    },
  ];

  const quickActions = [
    {
      title: "Manage Users",
      description:
        "Manage residents, agents and technicians.",
      icon: <Users size={19} />,
      path: "/admin/users",
    },
    {
      title: "Manage Tickets",
      description:
        "Review and assign municipal fault reports.",
      icon: <Ticket size={19} />,
      path: "/admin/tickets",
    },
    {
      title: "Services",
      description:
        "Configure enabled municipal services.",
      icon: <Settings size={19} />,
      path: "/admin/services",
    },
    {
      title: "Reports",
      description:
        "View municipal performance reports.",
      icon: <BarChart3 size={19} />,
      path: "/admin/reports",
    },
  ];

  const logout = () => {
    navigate("/login");
  };

  return (
    <div className="admin-dashboard-page">

      {/* HEADER */}
      <header className="admin-dashboard-header">

        <div className="admin-header-brand">

          <div className="admin-header-icon">
            <Building2 size={22} />
          </div>

          <div>
            <div className="admin-breadcrumb">
              Municipality Admin
            </div>

            <h1>{municipality.name}</h1>

            <p>
              {municipality.code} ·{" "}
              {municipality.province}
            </p>
          </div>

        </div>

        <div className="admin-header-actions">

          <button
            className="admin-header-button"
            onClick={() =>
              navigate("/admin/notifications")
            }
          >
            <Bell size={18} />
            <span>Notifications</span>
          </button>

          <button
            className="admin-header-profile"
            onClick={() =>
              navigate("/admin/profile")
            }
          >
            <div className="admin-avatar">
              NA
            </div>

            <div>
              <strong>Nomsa Admin</strong>
              <span>Municipality Admin</span>
            </div>
          </button>

        </div>

      </header>

      {/* NAVIGATION */}
      <nav className="admin-dashboard-nav">

        <button className="active">
          <LayoutDashboard size={16} />
          Dashboard
        </button>

        <button
          onClick={() =>
            navigate("/admin/users")
          }
        >
          <Users size={16} />
          Users
        </button>

        <button
          onClick={() =>
            navigate("/admin/tickets")
          }
        >
          <Ticket size={16} />
          Tickets
        </button>

        <button
          onClick={() =>
            navigate("/admin/services")
          }
        >
          <Settings size={16} />
          Services
        </button>

        <button
          onClick={() =>
            navigate("/admin/reports")
          }
        >
          <BarChart3 size={16} />
          Reports
        </button>

        <button
          onClick={() =>
            navigate("/admin/settings")
          }
        >
          <Settings size={16} />
          Settings
        </button>

        <button
          className="admin-nav-logout"
          onClick={logout}
        >
          <LogOut size={16} />
          Logout
        </button>

      </nav>

      <main className="admin-dashboard-content">

        {/* WELCOME */}
        <section className="admin-welcome">

          <div>
            <span>Municipality Administration</span>

            <h2>
              Good day, Nomsa
            </h2>

            <p>
              Here's what's happening across{" "}
              {municipality.name}.
            </p>
          </div>

          <div className="admin-welcome-status">
            <CheckCircle2 size={16} />
            Municipality operational
          </div>

        </section>

        {/* STATS */}
        <section className="admin-stat-grid">

          {stats.map((stat) => (
            <div
              className="admin-stat-card"
              key={stat.title}
            >

              <div
                className={`admin-stat-icon ${stat.className}`}
              >
                {stat.icon}
              </div>

              <div>
                <span>{stat.title}</span>
                <strong>{stat.value}</strong>
                <small>{stat.change}</small>
              </div>

            </div>
          ))}

        </section>

        {/* MAIN GRID */}
        <section className="admin-dashboard-grid">

          {/* RECENT TICKETS */}
          <div className="admin-panel tickets-panel">

            <div className="admin-panel-header">

              <div>
                <h3>Recent Tickets</h3>
                <p>
                  Latest municipal fault reports.
                </p>
              </div>

              <button
                onClick={() =>
                  navigate("/admin/tickets")
                }
              >
                View All
                <ArrowRight size={14} />
              </button>

            </div>

            <div className="admin-ticket-list">

              {recentTickets.map((ticket) => (
                <div
                  className="admin-ticket-row"
                  key={ticket.ticket}
                >

                  <div className="admin-ticket-service">
                    <Ticket size={16} />
                  </div>

                  <div className="admin-ticket-info">

                    <strong>
                      {ticket.ticket}
                    </strong>

                    <span>
                      {ticket.title}
                    </span>

                    <small>
                      {ticket.resident} ·{" "}
                      {ticket.service}
                    </small>

                  </div>

                  <div className="admin-ticket-meta">

                    <span
                      className={`admin-priority ${ticket.priority.toLowerCase()}`}
                    >
                      {ticket.priority}
                    </span>

                    <span
                      className={`admin-status ${ticket.status
                        .toLowerCase()
                        .replace("_", "-")}`}
                    >
                      {ticket.status.replace(
                        "_",
                        " "
                      )}
                    </span>

                    <small>
                      {ticket.time}
                    </small>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* QUICK ACTIONS */}
          <div className="admin-panel">

            <div className="admin-panel-header">

              <div>
                <h3>Quick Actions</h3>
                <p>
                  Common administration tasks.
                </p>
              </div>

            </div>

            <div className="admin-quick-actions">

              {quickActions.map((action) => (
                <button
                  key={action.title}
                  onClick={() =>
                    navigate(action.path)
                  }
                >

                  <div className="admin-quick-icon">
                    {action.icon}
                  </div>

                  <div>
                    <strong>
                      {action.title}
                    </strong>

                    <span>
                      {action.description}
                    </span>
                  </div>

                  <ArrowRight size={15} />

                </button>
              ))}

            </div>

          </div>

        </section>

        {/* SERVICE PERFORMANCE */}
        <section className="admin-panel">

          <div className="admin-panel-header">

            <div>
              <h3>Service Performance</h3>

              <p>
                Ticket activity by municipal
                service.
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/admin/reports")
              }
            >
              View Reports
              <ArrowRight size={14} />
            </button>

          </div>

          <div className="admin-service-table-wrapper">

            <table className="admin-service-table">

              <thead>
                <tr>
                  <th>Service</th>
                  <th>Open</th>
                  <th>In Progress</th>
                  <th>Resolved</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>

                {serviceStats.map((service) => {

                  const total =
                    service.open +
                    service.progress +
                    service.resolved;

                  return (
                    <tr key={service.service}>

                      <td>
                        <strong>
                          {service.service}
                        </strong>
                      </td>

                      <td>
                        <span className="service-number open">
                          {service.open}
                        </span>
                      </td>

                      <td>
                        <span className="service-number progress">
                          {service.progress}
                        </span>
                      </td>

                      <td>
                        <span className="service-number resolved">
                          {service.resolved}
                        </span>
                      </td>

                      <td>
                        <strong>
                          {total}
                        </strong>
                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

        </section>

        {/* ALERTS */}
        <section className="admin-alert-grid">

          <div className="admin-alert-card warning">

            <div className="admin-alert-icon">
              <AlertTriangle size={19} />
            </div>

            <div>
              <strong>
                14 Urgent Tickets
              </strong>

              <p>
                Tickets currently require urgent
                attention.
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/admin/tickets")
              }
            >
              Review
              <ArrowRight size={14} />
            </button>

          </div>

          <div className="admin-alert-card sla">

            <div className="admin-alert-icon">
              <Clock3 size={19} />
            </div>

            <div>
              <strong>
                8 SLA Deadlines
              </strong>

              <p>
                Tickets approaching their SLA
                deadline.
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/admin/tickets")
              }
            >
              Review
              <ArrowRight size={14} />
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;