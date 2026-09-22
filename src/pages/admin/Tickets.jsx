import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Ticket,
  Clock3,
  AlertTriangle,
  CheckCircle2,
  UserRound,
  Wrench,
  X,
  Save,
  MessageSquare,
  MapPin,
  Camera,
  UserCheck,
} from "lucide-react";

import "../../styles/admin-tickets.css";

function AdminTickets() {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([
    {
      id: 1,
      ticket: "MC-WATE-104821",
      title: "Burst water pipe",
      service: "Water",
      resident: "Demo Resident",
      phone: "072 123 4567",
      priority: "HIGH",
      status: "OPEN",
      technician: "Unassigned",
      created: "22 Sep 2026 18:09",
      sla: "6 hours remaining",
      location: "Fort Beaufort",
      description:
        "Major water leak reported near the residential area.",
      photo: true,
    },
    {
      id: 2,
      ticket: "MC-FIRE-104799",
      title: "Fire hydrant damaged",
      service: "Fire Department",
      resident: "Nomsa Mbeki",
      phone: "072 555 2101",
      priority: "URGENT",
      status: "ASSIGNED",
      technician: "Lwazi Nqoma",
      created: "22 Sep 2026 17:12",
      sla: "1 hour remaining",
      location: "Alice",
      description:
        "Damaged hydrant reported near a busy road.",
      photo: true,
    },
    {
      id: 3,
      ticket: "MC-SEWE-104802",
      title: "Blocked sewer line",
      service: "Sewerage",
      resident: "Sipho Dlamini",
      phone: "072 555 2102",
      priority: "HIGH",
      status: "IN_PROGRESS",
      technician: "Noluthando Radebe",
      created: "22 Sep 2026 16:21",
      sla: "5 hours remaining",
      location: "Fort Beaufort",
      description:
        "Sewer overflow affecting several households.",
      photo: true,
    },
    {
      id: 4,
      ticket: "MC-REFU-104808",
      title: "Missed refuse collection",
      service: "Refuse",
      resident: "Ayanda Peterson",
      phone: "072 555 2103",
      priority: "LOW",
      status: "RESOLVED",
      technician: "Thabo Williams",
      created: "21 Sep 2026 14:30",
      sla: "Completed",
      location: "Adelaide",
      description:
        "Refuse collection was missed on the scheduled day.",
      photo: false,
    },
    {
      id: 5,
      ticket: "MC-ELEC-104815",
      title: "Streetlight not working",
      service: "Electricity",
      resident: "Lwazi Mbeki",
      phone: "072 555 2104",
      priority: "MEDIUM",
      status: "OPEN",
      technician: "Unassigned",
      created: "22 Sep 2026 15:44",
      sla: "18 hours remaining",
      location: "Bedford",
      description:
        "Streetlight remains off during the evening.",
      photo: false,
    },
    {
      id: 6,
      ticket: "MC-ESKO-104817",
      title: "Power outage",
      service: "Eskom",
      resident: "Noluthando Radebe",
      phone: "072 555 2105",
      priority: "URGENT",
      status: "IN_PROGRESS",
      technician: "Lwazi Nqoma",
      created: "22 Sep 2026 15:12",
      sla: "45 minutes remaining",
      location: "Fort Beaufort",
      description:
        "Area power outage affecting multiple properties.",
      photo: false,
    },
  ]);

  const technicians = [
    "Unassigned",
    "Lwazi Nqoma",
    "Noluthando Radebe",
    "Thabo Williams",
    "Sibusiso Jacobs",
  ];

  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] =
    useState("ALL");
  const [priorityFilter, setPriorityFilter] =
    useState("ALL");
  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [selectedTicket, setSelectedTicket] =
    useState(null);

  const [editForm, setEditForm] = useState(null);

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const searchMatch =
        ticket.ticket
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        ticket.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        ticket.resident
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        ticket.location
          .toLowerCase()
          .includes(search.toLowerCase());

      const serviceMatch =
        serviceFilter === "ALL" ||
        ticket.service === serviceFilter;

      const priorityMatch =
        priorityFilter === "ALL" ||
        ticket.priority === priorityFilter;

      const statusMatch =
        statusFilter === "ALL" ||
        ticket.status === statusFilter;

      return (
        searchMatch &&
        serviceMatch &&
        priorityMatch &&
        statusMatch
      );
    });
  }, [
    tickets,
    search,
    serviceFilter,
    priorityFilter,
    statusFilter,
  ]);

  const stats = {
    total: tickets.length,
    open: tickets.filter(
      (ticket) => ticket.status === "OPEN"
    ).length,
    urgent: tickets.filter(
      (ticket) => ticket.priority === "URGENT"
    ).length,
    inProgress: tickets.filter(
      (ticket) => ticket.status === "IN_PROGRESS"
    ).length,
    resolved: tickets.filter(
      (ticket) => ticket.status === "RESOLVED"
    ).length,
  };

  const openTicket = (ticket) => {
    setSelectedTicket(ticket);

    setEditForm({
      priority: ticket.priority,
      status: ticket.status,
      technician: ticket.technician,
      note: "",
    });
  };

  const closeTicket = () => {
    setSelectedTicket(null);
    setEditForm(null);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const saveTicket = () => {
    setTickets((previous) =>
      previous.map((ticket) =>
        ticket.id === selectedTicket.id
          ? {
              ...ticket,
              priority: editForm.priority,
              status: editForm.status,
              technician: editForm.technician,
            }
          : ticket
      )
    );

    setSelectedTicket((previous) => ({
      ...previous,
      priority: editForm.priority,
      status: editForm.status,
      technician: editForm.technician,
    }));

    setEditForm((previous) => ({
      ...previous,
      note: "",
    }));

    alert(
      "Mock ticket update saved successfully."
    );
  };

  return (
    <div className="admin-tickets-page">

      <header className="admin-tickets-header">

        <div className="admin-tickets-header-left">

          <button
            className="admin-tickets-back"
            onClick={() =>
              navigate("/admin/dashboard")
            }
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="admin-tickets-breadcrumb">
              Municipality Admin / Tickets
            </div>

            <h1>Ticket Management</h1>

            <p>
              Manage municipal fault reports for
              Raymond Mhlaba Local Municipality.
            </p>
          </div>

        </div>

      </header>

      <section className="admin-ticket-stats">

        <div className="admin-ticket-stat">
          <div className="admin-ticket-stat-icon">
            <Ticket size={20} />
          </div>

          <div>
            <span>Total Tickets</span>
            <strong>{stats.total}</strong>
          </div>
        </div>

        <div className="admin-ticket-stat">
          <div className="admin-ticket-stat-icon open">
            <Clock3 size={20} />
          </div>

          <div>
            <span>Open</span>
            <strong>{stats.open}</strong>
          </div>
        </div>

        <div className="admin-ticket-stat">
          <div className="admin-ticket-stat-icon urgent">
            <AlertTriangle size={20} />
          </div>

          <div>
            <span>Urgent</span>
            <strong>{stats.urgent}</strong>
          </div>
        </div>

        <div className="admin-ticket-stat">
          <div className="admin-ticket-stat-icon progress">
            <Wrench size={20} />
          </div>

          <div>
            <span>In Progress</span>
            <strong>{stats.inProgress}</strong>
          </div>
        </div>

        <div className="admin-ticket-stat">
          <div className="admin-ticket-stat-icon resolved">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>Resolved</span>
            <strong>{stats.resolved}</strong>
          </div>
        </div>

      </section>

      <section className="admin-tickets-card">

        <div className="admin-tickets-filters">

          <div className="admin-ticket-search">

            <Search size={17} />

            <input
              placeholder="Search ticket, resident or location..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

          </div>

          <select
            value={serviceFilter}
            onChange={(event) =>
              setServiceFilter(event.target.value)
            }
          >
            <option value="ALL">
              All Services
            </option>
            <option value="Water">Water</option>
            <option value="Sewerage">
              Sewerage
            </option>
            <option value="Electricity">
              Electricity
            </option>
            <option value="Refuse">Refuse</option>
            <option value="Fire Department">
              Fire Department
            </option>
            <option value="Eskom">Eskom</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(event) =>
              setPriorityFilter(event.target.value)
            }
          >
            <option value="ALL">
              All Priorities
            </option>
            <option value="URGENT">Urgent</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="ALL">
              All Statuses
            </option>
            <option value="OPEN">Open</option>
            <option value="ASSIGNED">
              Assigned
            </option>
            <option value="IN_PROGRESS">
              In Progress
            </option>
            <option value="RESOLVED">
              Resolved
            </option>
          </select>

        </div>

        <div className="admin-ticket-results">
          Showing {filteredTickets.length} of{" "}
          {tickets.length} tickets
        </div>

        <div className="admin-tickets-table-wrapper">

          <table className="admin-tickets-table">

            <thead>
              <tr>
                <th>Ticket</th>
                <th>Service</th>
                <th>Resident</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Technician</th>
                <th>SLA</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredTickets.map((ticket) => (
                <tr key={ticket.id}>

                  <td>
                    <div className="admin-ticket-number">
                      <strong>
                        {ticket.ticket}
                      </strong>

                      <span>
                        {ticket.title}
                      </span>

                      <small>
                        {ticket.created}
                      </small>
                    </div>
                  </td>

                  <td>
                    <span className="admin-service-badge">
                      {ticket.service}
                    </span>
                  </td>

                  <td>
                    <div className="admin-ticket-resident">

                      <UserRound size={14} />

                      <div>
                        <strong>
                          {ticket.resident}
                        </strong>

                        <span>
                          {ticket.location}
                        </span>
                      </div>

                    </div>
                  </td>

                  <td>
                    <span
                      className={`admin-ticket-priority ${ticket.priority.toLowerCase()}`}
                    >
                      {ticket.priority}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`admin-ticket-status ${ticket.status
                        .toLowerCase()
                        .replace("_", "-")}`}
                    >
                      {ticket.status.replace(
                        "_",
                        " "
                      )}
                    </span>
                  </td>

                  <td>
                    <span className="admin-ticket-technician">
                      <Wrench size={12} />
                      {ticket.technician}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`admin-ticket-sla ${
                        ticket.priority === "URGENT"
                          ? "danger"
                          : ""
                      }`}
                    >
                      {ticket.sla}
                    </span>
                  </td>

                  <td>

                    <button
                      className="admin-ticket-view"
                      onClick={() =>
                        openTicket(ticket)
                      }
                    >
                      View
                    </button>

                  </td>

                </tr>
              ))}

              {filteredTickets.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="admin-ticket-empty"
                  >
                    No tickets match the selected
                    filters.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </section>

      {selectedTicket && editForm && (
        <div
          className="admin-ticket-modal-overlay"
          onClick={closeTicket}
        >

          <div
            className="admin-ticket-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="admin-ticket-modal-header">

              <div>
                <span>Ticket Details</span>

                <h2>
                  {selectedTicket.ticket}
                </h2>

                <p>
                  {selectedTicket.title}
                </p>
              </div>

              <button onClick={closeTicket}>
                <X size={19} />
              </button>

            </div>

            <div className="admin-ticket-modal-body">

              <div className="admin-ticket-detail-summary">

                <div>
                  <span>Service</span>
                  <strong>
                    {selectedTicket.service}
                  </strong>
                </div>

                <div>
                  <span>Resident</span>
                  <strong>
                    {selectedTicket.resident}
                  </strong>
                </div>

                <div>
                  <span>Phone</span>
                  <strong>
                    {selectedTicket.phone}
                  </strong>
                </div>

                <div>
                  <span>Location</span>
                  <strong>
                    <MapPin size={13} />
                    {selectedTicket.location}
                  </strong>
                </div>

              </div>

              <div className="admin-ticket-description">

                <span>Description</span>

                <p>
                  {selectedTicket.description}
                </p>

              </div>

              <div className="admin-ticket-evidence">

                <div className="admin-evidence-header">
                  <strong>
                    Evidence
                  </strong>

                  {selectedTicket.photo && (
                    <span>
                      <Camera size={13} />
                      Photo attached
                    </span>
                  )}
                </div>

                {selectedTicket.photo ? (
                  <div className="admin-photo-placeholder">
                    <Camera size={22} />
                    <span>
                      Ticket photo preview
                    </span>
                    <small>
                      Mock attachment
                    </small>
                  </div>
                ) : (
                  <div className="admin-no-evidence">
                    No photo attached.
                  </div>
                )}

              </div>

              <div className="admin-ticket-edit-grid">

                <div>
                  <label>Priority</label>

                  <select
                    name="priority"
                    value={editForm.priority}
                    onChange={handleEditChange}
                  >
                    <option value="URGENT">
                      Urgent
                    </option>
                    <option value="HIGH">
                      High
                    </option>
                    <option value="MEDIUM">
                      Medium
                    </option>
                    <option value="LOW">
                      Low
                    </option>
                  </select>
                </div>

                <div>
                  <label>Status</label>

                  <select
                    name="status"
                    value={editForm.status}
                    onChange={handleEditChange}
                  >
                    <option value="OPEN">
                      Open
                    </option>
                    <option value="ASSIGNED">
                      Assigned
                    </option>
                    <option value="IN_PROGRESS">
                      In Progress
                    </option>
                    <option value="RESOLVED">
                      Resolved
                    </option>
                  </select>
                </div>

                <div className="admin-ticket-technician-field">

                  <label>
                    Assign Technician
                  </label>

                  <select
                    name="technician"
                    value={editForm.technician}
                    onChange={handleEditChange}
                  >
                    {technicians.map(
                      (technician) => (
                        <option
                          key={technician}
                          value={technician}
                        >
                          {technician}
                        </option>
                      )
                    )}
                  </select>

                </div>

              </div>

              <div className="admin-ticket-note">

                <label>
                  Internal Note
                </label>

                <textarea
                  name="note"
                  value={editForm.note}
                  onChange={handleEditChange}
                  placeholder="Add an internal administration note..."
                  rows="3"
                />

              </div>

            </div>

            <div className="admin-ticket-modal-footer">

              <div className="admin-ticket-footer-info">

                <MessageSquare size={14} />

                Internal administrative workflow

              </div>

              <div>

                <button
                  className="admin-ticket-cancel"
                  onClick={closeTicket}
                >
                  Close
                </button>

                <button
                  className="admin-ticket-save"
                  onClick={saveTicket}
                >
                  <Save size={15} />
                  Save Changes
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default AdminTickets;