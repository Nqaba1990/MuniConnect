import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Ticket,
  Clock3,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  UserRound,
  MapPin,
  Building2,
  Wrench,
  X,
} from "lucide-react";

import "../../styles/developer-tickets.css";

function DeveloperTickets() {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([
    {
      id: 1,
      ticket: "MC-WATE-104821",
      service: "Water",
      title: "Burst water pipe",
      resident: "Demo Resident",
      municipality: "Raymond Mhlaba Local Municipality",
      municipalityCode: "RMLM",
      location: "Fort Beaufort",
      priority: "HIGH",
      status: "OPEN",
      technician: "Unassigned",
      created: "Today 09:12",
      sla: "2h 18m remaining",
    },
    {
      id: 2,
      ticket: "MC-ELEC-104819",
      service: "Electricity",
      title: "Streetlight not working",
      resident: "Thando Mokoena",
      municipality: "Makhanda Municipality",
      municipalityCode: "MAK",
      location: "Makhanda",
      priority: "MEDIUM",
      status: "ASSIGNED",
      technician: "Sipho Dlamini",
      created: "Today 08:42",
      sla: "5h 20m remaining",
    },
    {
      id: 3,
      ticket: "MC-ESKO-104815",
      service: "Eskom",
      title: "Area power outage",
      resident: "Lerato Ndlovu",
      municipality: "Makhanda Municipality",
      municipalityCode: "MAK",
      location: "Joza",
      priority: "URGENT",
      status: "IN_PROGRESS",
      technician: "Eskom Response Team",
      created: "Today 07:51",
      sla: "38m remaining",
    },
    {
      id: 4,
      ticket: "MC-REFU-104808",
      service: "Refuse",
      title: "Missed refuse collection",
      resident: "Ayanda Peterson",
      municipality: "Raymond Mhlaba Local Municipality",
      municipalityCode: "RMLM",
      location: "Alice",
      priority: "LOW",
      status: "RESOLVED",
      technician: "Sibusiso Jacobs",
      created: "Yesterday 15:22",
      sla: "Completed",
    },
    {
      id: 5,
      ticket: "MC-SEWE-104802",
      service: "Sewerage",
      title: "Blocked sewer line",
      resident: "Sipho Dlamini",
      municipality: "Raymond Mhlaba Local Municipality",
      municipalityCode: "RMLM",
      location: "Fort Beaufort",
      priority: "HIGH",
      status: "IN_PROGRESS",
      technician: "Municipal Maintenance",
      created: "Yesterday 13:44",
      sla: "1h 10m remaining",
    },
    {
      id: 6,
      ticket: "MC-FIRE-104799",
      service: "Fire Department",
      title: "Fire hydrant damaged",
      resident: "Nomsa Mbeki",
      municipality: "Raymond Mhlaba Local Municipality",
      municipalityCode: "RMLM",
      location: "Fort Beaufort",
      priority: "URGENT",
      status: "ASSIGNED",
      technician: "Fire Response Unit",
      created: "Yesterday 11:06",
      sla: "45m remaining",
    },
    {
      id: 7,
      ticket: "MC-ELEC-104790",
      service: "Electricity",
      title: "Power pole damaged",
      resident: "Zanele Mokoena",
      municipality: "Makhanda Municipality",
      municipalityCode: "MAK",
      location: "Grahamstown",
      priority: "HIGH",
      status: "OPEN",
      technician: "Unassigned",
      created: "20 Sep 2026 16:32",
      sla: "3h 42m remaining",
    },
    {
      id: 8,
      ticket: "MC-WATE-104781",
      service: "Water",
      title: "Low water pressure",
      resident: "Fort Beaufort Resident",
      municipality: "Raymond Mhlaba Local Municipality",
      municipalityCode: "RMLM",
      location: "Bedford",
      priority: "MEDIUM",
      status: "CLOSED",
      technician: "Municipal Water Team",
      created: "20 Sep 2026 12:11",
      sla: "Completed",
    },
  ]);

  const [search, setSearch] = useState("");
  const [municipalityFilter, setMunicipalityFilter] =
    useState("ALL");
  const [serviceFilter, setServiceFilter] =
    useState("ALL");
  const [statusFilter, setStatusFilter] =
    useState("ALL");
  const [priorityFilter, setPriorityFilter] =
    useState("ALL");

  const [selectedTicket, setSelectedTicket] =
    useState(null);

  const municipalities = [
    "Raymond Mhlaba Local Municipality",
    "Makhanda Municipality",
  ];

  const services = [
    "Water",
    "Sewerage",
    "Electricity",
    "Refuse",
    "Fire Department",
    "Eskom",
  ];

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

      const municipalityMatch =
        municipalityFilter === "ALL" ||
        ticket.municipality === municipalityFilter;

      const serviceMatch =
        serviceFilter === "ALL" ||
        ticket.service === serviceFilter;

      const statusMatch =
        statusFilter === "ALL" ||
        ticket.status === statusFilter;

      const priorityMatch =
        priorityFilter === "ALL" ||
        ticket.priority === priorityFilter;

      return (
        searchMatch &&
        municipalityMatch &&
        serviceMatch &&
        statusMatch &&
        priorityMatch
      );
    });
  }, [
    tickets,
    search,
    municipalityFilter,
    serviceFilter,
    statusFilter,
    priorityFilter,
  ]);

  const stats = {
    total: tickets.length,
    open: tickets.filter(
      (ticket) => ticket.status === "OPEN"
    ).length,
    progress: tickets.filter(
      (ticket) => ticket.status === "IN_PROGRESS"
    ).length,
    urgent: tickets.filter(
      (ticket) => ticket.priority === "URGENT"
    ).length,
    resolved: tickets.filter(
      (ticket) =>
        ticket.status === "RESOLVED" ||
        ticket.status === "CLOSED"
    ).length,
  };

  const updateStatus = (ticketId, status) => {
    setTickets((previous) =>
      previous.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              status,
              sla:
                status === "RESOLVED" ||
                status === "CLOSED"
                  ? "Completed"
                  : ticket.sla,
            }
          : ticket
      )
    );

    setSelectedTicket((previous) =>
      previous?.id === ticketId
        ? {
            ...previous,
            status,
            sla:
              status === "RESOLVED" ||
              status === "CLOSED"
                ? "Completed"
                : previous.sla,
          }
        : previous
    );
  };

  const getPriorityClass = (priority) => {
    return priority.toLowerCase();
  };

  const getStatusClass = (status) => {
    return status.toLowerCase().replace("_", "-");
  };

  return (
    <div className="developer-tickets-page">

      <header className="developer-tickets-header">

        <div className="developer-tickets-header-left">

          <button
            className="developer-tickets-back"
            onClick={() =>
              navigate("/developer/dashboard")
            }
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="developer-tickets-breadcrumb">
              Developer / Ticket Management
            </div>

            <h1>All Tickets</h1>

            <p>
              Manage fault reports across all
              municipalities.
            </p>
          </div>

        </div>

      </header>

      <section className="developer-ticket-stats">

        <div className="developer-ticket-stat">
          <div className="developer-ticket-stat-icon">
            <Ticket size={20} />
          </div>

          <div>
            <span>Total Tickets</span>
            <strong>{stats.total}</strong>
          </div>
        </div>

        <div className="developer-ticket-stat">
          <div className="developer-ticket-stat-icon open">
            <AlertTriangle size={20} />
          </div>

          <div>
            <span>Open</span>
            <strong>{stats.open}</strong>
          </div>
        </div>

        <div className="developer-ticket-stat">
          <div className="developer-ticket-stat-icon progress">
            <Clock3 size={20} />
          </div>

          <div>
            <span>In Progress</span>
            <strong>{stats.progress}</strong>
          </div>
        </div>

        <div className="developer-ticket-stat">
          <div className="developer-ticket-stat-icon urgent">
            <AlertTriangle size={20} />
          </div>

          <div>
            <span>Urgent</span>
            <strong>{stats.urgent}</strong>
          </div>
        </div>

        <div className="developer-ticket-stat">
          <div className="developer-ticket-stat-icon resolved">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>Resolved / Closed</span>
            <strong>{stats.resolved}</strong>
          </div>
        </div>

      </section>

      <section className="developer-tickets-card">

        <div className="developer-ticket-filters">

          <div className="developer-ticket-search">

            <Search size={17} />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search ticket, resident or location..."
            />

          </div>

          <select
            value={municipalityFilter}
            onChange={(event) =>
              setMunicipalityFilter(
                event.target.value
              )
            }
          >
            <option value="ALL">
              All Municipalities
            </option>

            {municipalities.map((municipality) => (
              <option
                key={municipality}
                value={municipality}
              >
                {municipality}
              </option>
            ))}
          </select>

          <select
            value={serviceFilter}
            onChange={(event) =>
              setServiceFilter(event.target.value)
            }
          >
            <option value="ALL">
              All Services
            </option>

            {services.map((service) => (
              <option
                key={service}
                value={service}
              >
                {service}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="ALL">All Statuses</option>
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
            <option value="CLOSED">Closed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(event) =>
              setPriorityFilter(
                event.target.value
              )
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

        </div>

        <div className="developer-ticket-results">
          Showing {filteredTickets.length} of{" "}
          {tickets.length} tickets
        </div>

        <div className="developer-ticket-table-wrapper">

          <table className="developer-ticket-table">

            <thead>
              <tr>
                <th>Ticket</th>
                <th>Service</th>
                <th>Resident</th>
                <th>Municipality</th>
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
                    <div className="developer-ticket-number">
                      <strong>
                        {ticket.ticket}
                      </strong>

                      <span>
                        {ticket.title}
                      </span>
                    </div>
                  </td>

                  <td>
                    <span className="service-badge">
                      {ticket.service}
                    </span>
                  </td>

                  <td>
                    <div className="ticket-resident">
                      <UserRound size={13} />
                      {ticket.resident}
                    </div>
                  </td>

                  <td>
                    <div className="ticket-municipality">
                      <strong>
                        {ticket.municipality}
                      </strong>

                      <span>
                        {ticket.municipalityCode}
                      </span>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`ticket-priority ${getPriorityClass(
                        ticket.priority
                      )}`}
                    >
                      {ticket.priority}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`ticket-status ${getStatusClass(
                        ticket.status
                      )}`}
                    >
                      {ticket.status.replace(
                        "_",
                        " "
                      )}
                    </span>
                  </td>

                  <td>
                    <div className="ticket-technician">
                      <Wrench size={13} />
                      {ticket.technician}
                    </div>
                  </td>

                  <td>
                    <span
                      className={`ticket-sla ${
                        ticket.sla === "Completed"
                          ? "completed"
                          : ""
                      }`}
                    >
                      {ticket.sla}
                    </span>
                  </td>

                  <td>
                    <button
                      className="ticket-view-button"
                      onClick={() =>
                        setSelectedTicket(ticket)
                      }
                    >
                      <Eye size={15} />
                      View
                    </button>
                  </td>

                </tr>
              ))}

              {filteredTickets.length === 0 && (
                <tr>
                  <td
                    colSpan="9"
                    className="developer-ticket-empty"
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

      {selectedTicket && (
        <div
          className="developer-ticket-modal-overlay"
          onClick={() =>
            setSelectedTicket(null)
          }
        >

          <div
            className="developer-ticket-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="developer-ticket-modal-header">

              <div>
                <span>Ticket Details</span>

                <h2>
                  {selectedTicket.ticket}
                </h2>

                <p>
                  {selectedTicket.title}
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedTicket(null)
                }
              >
                <X size={19} />
              </button>

            </div>

            <div className="developer-ticket-detail-grid">

              <div>
                <span>Service</span>
                <strong>
                  {selectedTicket.service}
                </strong>
              </div>

              <div>
                <span>Priority</span>

                <strong
                  className={`modal-priority ${getPriorityClass(
                    selectedTicket.priority
                  )}`}
                >
                  {selectedTicket.priority}
                </strong>
              </div>

              <div>
                <span>Status</span>

                <strong>
                  {selectedTicket.status.replace(
                    "_",
                    " "
                  )}
                </strong>
              </div>

              <div>
                <span>Created</span>

                <strong>
                  {selectedTicket.created}
                </strong>
              </div>

              <div>
                <span>Resident</span>

                <strong>
                  {selectedTicket.resident}
                </strong>
              </div>

              <div>
                <span>Technician</span>

                <strong>
                  {selectedTicket.technician}
                </strong>
              </div>

              <div className="detail-full">
                <span>Municipality</span>

                <strong>
                  <Building2 size={14} />
                  {selectedTicket.municipality}
                </strong>
              </div>

              <div className="detail-full">
                <span>Location</span>

                <strong>
                  <MapPin size={14} />
                  {selectedTicket.location}
                </strong>
              </div>

              <div className="detail-full">
                <span>SLA</span>

                <strong>
                  <Clock3 size={14} />
                  {selectedTicket.sla}
                </strong>
              </div>

            </div>

            <div className="developer-ticket-modal-actions">

              <button
                onClick={() =>
                  updateStatus(
                    selectedTicket.id,
                    "OPEN"
                  )
                }
              >
                <AlertTriangle size={15} />
                Open
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    selectedTicket.id,
                    "IN_PROGRESS"
                  )
                }
              >
                <Clock3 size={15} />
                In Progress
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    selectedTicket.id,
                    "RESOLVED"
                  )
                }
              >
                <CheckCircle2 size={15} />
                Resolve
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    selectedTicket.id,
                    "CLOSED"
                  )
                }
              >
                <XCircle size={15} />
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default DeveloperTickets;