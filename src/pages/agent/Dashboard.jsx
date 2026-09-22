import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Ticket,
  Clock3,
  CheckCircle2,
  UserRound,
  Search,
  Filter,
  LogOut,
  MapPin,
  ArrowRight,
} from "lucide-react";

import "../../styles/agent-dashboard.css";

const mockTickets = [
  {
    id: "MC-WATE-123456",
    resident: "Demo Resident",
    service: "Water",
    title: "Water Leak",
    location: "15 Main Street, Fort Beaufort",
    date: "15 Sep 2026, 09:42",
    status: "NEW",
    priority: "HIGH",
  },
  {
    id: "MC-ESKO-583921",
    resident: "Thabo Mokoena",
    service: "Eskom",
    title: "Power Outage",
    location: "12 Station Road, Fort Beaufort",
    date: "14 Sep 2026, 14:15",
    status: "IN PROGRESS",
    priority: "URGENT",
  },
  {
    id: "MC-ELEC-472811",
    resident: "Nomsa Dlamini",
    service: "Electricity",
    title: "Streetlight Fault",
    location: "Market Street, Fort Beaufort",
    date: "10 Sep 2026, 18:30",
    status: "RESOLVED",
    priority: "MEDIUM",
  },
  {
    id: "MC-SEWE-334521",
    resident: "Sibusiso Ndlovu",
    service: "Sewerage",
    title: "Blocked Drain",
    location: "Church Street, Fort Beaufort",
    date: "15 Sep 2026, 10:05",
    status: "NEW",
    priority: "HIGH",
  },
  {
    id: "MC-REFU-781234",
    resident: "Lerato Jacobs",
    service: "Refuse",
    title: "Missed Collection",
    location: "Victoria Road, Fort Beaufort",
    date: "15 Sep 2026, 08:20",
    status: "ASSIGNED",
    priority: "MEDIUM",
  },
  {
    id: "MC-FIRE-219876",
    resident: "Peter Williams",
    service: "Fire Department",
    title: "Fire Hydrant Problem",
    location: "High Street, Fort Beaufort",
    date: "13 Sep 2026, 12:45",
    status: "IN PROGRESS",
    priority: "HIGH",
  },
];

function AgentDashboard() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [serviceFilter, setServiceFilter] = useState("ALL");

  const filteredTickets = useMemo(() => {
    return mockTickets.filter((ticket) => {
      const matchesSearch =
        ticket.id.toLowerCase().includes(search.toLowerCase()) ||
        ticket.resident.toLowerCase().includes(search.toLowerCase()) ||
        ticket.title.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" || ticket.status === statusFilter;

      const matchesService =
        serviceFilter === "ALL" || ticket.service === serviceFilter;

      return matchesSearch && matchesStatus && matchesService;
    });
  }, [search, statusFilter, serviceFilter]);

  const newTickets = mockTickets.filter(
    (ticket) => ticket.status === "NEW"
  ).length;

  const assignedTickets = mockTickets.filter(
    (ticket) => ticket.status === "ASSIGNED"
  ).length;

  const inProgressTickets = mockTickets.filter(
    (ticket) => ticket.status === "IN PROGRESS"
  ).length;

  const resolvedTickets = mockTickets.filter(
    (ticket) => ticket.status === "RESOLVED"
  ).length;

  const logout = () => {
    navigate("/");
  };

  return (
    <div className="agent-dashboard">
      <aside className="agent-sidebar">
        <div className="agent-brand">
          <div className="agent-logo">M</div>

          <div>
            <strong>MuniConnect</strong>
            <span>Municipal Portal</span>
          </div>
        </div>

        <nav className="agent-navigation">
          <button className="active">
            <LayoutDashboard size={19} />
            Dashboard
          </button>

          <button>
            <Ticket size={19} />
            Tickets
          </button>

          <button>
            <UserRound size={19} />
            Residents
          </button>
        </nav>

        <div className="agent-sidebar-bottom">
          <button onClick={logout}>
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>

      <main className="agent-main">
        <header className="agent-topbar">
          <div>
            <span className="agent-page-label">AGENT PORTAL</span>
            <h1>Dashboard</h1>
            <p>Manage and process community service reports.</p>
          </div>

          <div className="agent-user">
            <div className="agent-avatar">A</div>

            <div>
              <strong>Municipal Agent</strong>
              <span>Fort Beaufort Municipality</span>
            </div>
          </div>
        </header>

        <section className="agent-stats">
          <div className="agent-stat-card">
            <div className="agent-stat-icon new">
              <Ticket size={22} />
            </div>

            <div>
              <span>New Tickets</span>
              <strong>{newTickets}</strong>
              <small>Awaiting review</small>
            </div>
          </div>

          <div className="agent-stat-card">
            <div className="agent-stat-icon assigned">
              <UserRound size={22} />
            </div>

            <div>
              <span>Awaiting Assignment</span>
              <strong>{assignedTickets}</strong>
              <small>Need technician</small>
            </div>
          </div>

          <div className="agent-stat-card">
            <div className="agent-stat-icon progress">
              <Clock3 size={22} />
            </div>

            <div>
              <span>In Progress</span>
              <strong>{inProgressTickets}</strong>
              <small>Being worked on</small>
            </div>
          </div>

          <div className="agent-stat-card">
            <div className="agent-stat-icon resolved">
              <CheckCircle2 size={22} />
            </div>

            <div>
              <span>Resolved</span>
              <strong>{resolvedTickets}</strong>
              <small>Completed reports</small>
            </div>
          </div>
        </section>

        <section className="agent-ticket-section">
          <div className="agent-section-header">
            <div>
              <span className="agent-page-label">WORK QUEUE</span>
              <h2>Community Tickets</h2>
            </div>

            <span className="ticket-count">
              {filteredTickets.length} tickets
            </span>
          </div>

          <div className="agent-filters">
            <div className="agent-search">
              <Search size={18} />

              <input
                type="text"
                placeholder="Search ticket, resident or fault..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="agent-filter-control">
              <Filter size={17} />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="ALL">All Statuses</option>
                <option value="NEW">New</option>
                <option value="ASSIGNED">Assigned</option>
                <option value="IN PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </div>

            <div className="agent-filter-control">
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
              >
                <option value="ALL">All Services</option>
                <option value="Water">Water</option>
                <option value="Sewerage">Sewerage</option>
                <option value="Electricity">Electricity</option>
                <option value="Eskom">Eskom</option>
                <option value="Refuse">Refuse</option>
                <option value="Fire Department">
                  Fire Department
                </option>
              </select>
            </div>
          </div>

          <div className="agent-ticket-table">
            <div className="agent-table-header">
              <span>Ticket</span>
              <span>Resident</span>
              <span>Service</span>
              <span>Location</span>
              <span>Priority</span>
              <span>Status</span>
              <span></span>
            </div>

            {filteredTickets.length === 0 ? (
              <div className="agent-no-results">
                <Ticket size={38} />
                <h3>No tickets found</h3>
                <p>Try changing your search or filters.</p>
              </div>
            ) : (
              filteredTickets.map((ticket) => (
                <div className="agent-table-row" key={ticket.id}>
                  <div className="agent-ticket-id">
                    <strong>{ticket.id}</strong>
                    <small>{ticket.title}</small>
                  </div>

                  <div className="agent-resident">
                    <div className="small-avatar">
                      {ticket.resident.charAt(0)}
                    </div>

                    <span>{ticket.resident}</span>
                  </div>

                  <div>
                    <span className="service-badge">
                      {ticket.service}
                    </span>
                  </div>

                  <div className="agent-location">
                    <MapPin size={15} />
                    <span>{ticket.location}</span>
                  </div>

                  <div>
                    <span
                      className={`priority-badge ${ticket.priority.toLowerCase()}`}
                    >
                      {ticket.priority}
                    </span>
                  </div>

                  <div>
                    <span
                      className={`agent-status ${ticket.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {ticket.status}
                    </span>
                  </div>

                  <button
                    className="open-ticket-button"
                    onClick={() =>
                      navigate(`/agent/tickets/${ticket.id}`)
                    }
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default AgentDashboard;