import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  ShieldCheck,
  Activity,
  UserPlus,
  UserX,
  Settings,
  Ticket,
  Building2,
  Server,
  Eye,
  X,
  Clock3,
  MapPin,
  CheckCircle2,
} from "lucide-react";

import "../../styles/audit-log.css";

function AuditLog() {
  const navigate = useNavigate();

  const [logs] = useState([
    {
      id: 1,
      date: "22 Sep 2026",
      time: "18:21",
      actor: "System Developer",
      actorEmail: "developer@municonnect.co.za",
      action: "UPDATED_SYSTEM_SETTINGS",
      resource: "System Settings",
      municipality: "SYSTEM",
      details:
        "Updated platform notification and security settings.",
      ip: "192.168.1.10",
      type: "SETTINGS",
    },
    {
      id: 2,
      date: "22 Sep 2026",
      time: "18:05",
      actor: "System Developer",
      actorEmail: "developer@municonnect.co.za",
      action: "DISABLED_USER",
      resource: "User #4",
      municipality: "RMLM",
      details:
        "Disabled the account for Sibusiso Jacobs.",
      ip: "192.168.1.10",
      type: "USER",
    },
    {
      id: 3,
      date: "22 Sep 2026",
      time: "17:52",
      actor: "System Developer",
      actorEmail: "developer@municonnect.co.za",
      action: "UPDATED_TICKET_STATUS",
      resource: "MC-WATE-104821",
      municipality: "RMLM",
      details:
        "Ticket status changed from OPEN to IN_PROGRESS.",
      ip: "192.168.1.10",
      type: "TICKET",
    },
    {
      id: 4,
      date: "22 Sep 2026",
      time: "17:35",
      actor: "System Developer",
      actorEmail: "developer@municonnect.co.za",
      action: "UPDATED_MUNICIPALITY_SETTINGS",
      resource: "Municipality #1",
      municipality: "RMLM",
      details:
        "Updated municipality registration and security settings.",
      ip: "192.168.1.10",
      type: "MUNICIPALITY",
    },
    {
      id: 5,
      date: "22 Sep 2026",
      time: "17:12",
      actor: "System Developer",
      actorEmail: "developer@municonnect.co.za",
      action: "CREATED_USER",
      resource: "User #11",
      municipality: "MAK",
      details:
        "Created a new resident account.",
      ip: "192.168.1.10",
      type: "USER",
    },
    {
      id: 6,
      date: "22 Sep 2026",
      time: "16:44",
      actor: "System Developer",
      actorEmail: "developer@municonnect.co.za",
      action: "UPDATED_SERVICE",
      resource: "Electricity",
      municipality: "MAK",
      details:
        "Changed Electricity service configuration.",
      ip: "192.168.1.10",
      type: "SERVICE",
    },
    {
      id: 7,
      date: "22 Sep 2026",
      time: "16:20",
      actor: "System Developer",
      actorEmail: "developer@municonnect.co.za",
      action: "CREATED_SERVICE_AREA",
      resource: "Fort Beaufort",
      municipality: "RMLM",
      details:
        "Created a new municipal service area.",
      ip: "192.168.1.10",
      type: "SERVICE",
    },
    {
      id: 8,
      date: "22 Sep 2026",
      time: "15:58",
      actor: "System Developer",
      actorEmail: "developer@municonnect.co.za",
      action: "CREATED_ADMIN",
      resource: "User #12",
      municipality: "RMLM",
      details:
        "Created a municipality administrator account.",
      ip: "192.168.1.10",
      type: "USER",
    },
    {
      id: 9,
      date: "21 Sep 2026",
      time: "14:33",
      actor: "System Developer",
      actorEmail: "developer@municonnect.co.za",
      action: "CREATED_MUNICIPALITY",
      resource: "Makhanda Municipality",
      municipality: "MAK",
      details:
        "Created a new municipality on the platform.",
      ip: "192.168.1.10",
      type: "MUNICIPALITY",
    },
    {
      id: 10,
      date: "21 Sep 2026",
      time: "13:47",
      actor: "System Developer",
      actorEmail: "developer@municonnect.co.za",
      action: "RESOLVED_TICKET",
      resource: "MC-REFU-104808",
      municipality: "RMLM",
      details:
        "Marked the ticket as resolved.",
      ip: "192.168.1.10",
      type: "TICKET",
    },
  ]);

  const [search, setSearch] = useState("");
  const [municipalityFilter, setMunicipalityFilter] =
    useState("ALL");
  const [actionFilter, setActionFilter] =
    useState("ALL");
  const [typeFilter, setTypeFilter] =
    useState("ALL");

  const [selectedLog, setSelectedLog] =
    useState(null);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const searchMatch =
        log.actor
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        log.actorEmail
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        log.resource
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        log.details
          .toLowerCase()
          .includes(search.toLowerCase());

      const municipalityMatch =
        municipalityFilter === "ALL" ||
        log.municipality === municipalityFilter;

      const actionMatch =
        actionFilter === "ALL" ||
        log.action === actionFilter;

      const typeMatch =
        typeFilter === "ALL" ||
        log.type === typeFilter;

      return (
        searchMatch &&
        municipalityMatch &&
        actionMatch &&
        typeMatch
      );
    });
  }, [
    logs,
    search,
    municipalityFilter,
    actionFilter,
    typeFilter,
  ]);

  const stats = {
    total: logs.length,
    users: logs.filter(
      (log) => log.type === "USER"
    ).length,
    tickets: logs.filter(
      (log) => log.type === "TICKET"
    ).length,
    settings: logs.filter(
      (log) => log.type === "SETTINGS"
    ).length,
  };

  const actionLabels = {
    UPDATED_SYSTEM_SETTINGS:
      "Updated System Settings",
    DISABLED_USER: "Disabled User",
    UPDATED_TICKET_STATUS:
      "Updated Ticket Status",
    UPDATED_MUNICIPALITY_SETTINGS:
      "Updated Municipality Settings",
    CREATED_USER: "Created User",
    UPDATED_SERVICE: "Updated Service",
    CREATED_SERVICE_AREA:
      "Created Service Area",
    CREATED_ADMIN: "Created Administrator",
    CREATED_MUNICIPALITY:
      "Created Municipality",
    RESOLVED_TICKET: "Resolved Ticket",
  };

  const getActionIcon = (type) => {
    if (type === "USER") {
      return <UserPlus size={15} />;
    }

    if (type === "TICKET") {
      return <Ticket size={15} />;
    }

    if (type === "MUNICIPALITY") {
      return <Building2 size={15} />;
    }

    if (type === "SERVICE") {
      return <Settings size={15} />;
    }

    if (type === "SETTINGS") {
      return <ShieldCheck size={15} />;
    }

    return <Activity size={15} />;
  };

  return (
    <div className="audit-log-page">

      <header className="audit-log-header">

        <div className="audit-log-header-left">

          <button
            className="audit-log-back"
            onClick={() =>
              navigate("/developer/dashboard")
            }
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="audit-log-breadcrumb">
              Developer / Audit Log
            </div>

            <h1>Audit Log</h1>

            <p>
              Review important administrative and
              system activity.
            </p>
          </div>

        </div>

      </header>

      <section className="audit-log-stats">

        <div className="audit-stat-card">

          <div className="audit-stat-icon">
            <Activity size={20} />
          </div>

          <div>
            <span>Total Events</span>
            <strong>{stats.total}</strong>
          </div>

        </div>

        <div className="audit-stat-card">

          <div className="audit-stat-icon users">
            <UserPlus size={20} />
          </div>

          <div>
            <span>User Events</span>
            <strong>{stats.users}</strong>
          </div>

        </div>

        <div className="audit-stat-card">

          <div className="audit-stat-icon tickets">
            <Ticket size={20} />
          </div>

          <div>
            <span>Ticket Events</span>
            <strong>{stats.tickets}</strong>
          </div>

        </div>

        <div className="audit-stat-card">

          <div className="audit-stat-icon settings">
            <Settings size={20} />
          </div>

          <div>
            <span>Settings Events</span>
            <strong>{stats.settings}</strong>
          </div>

        </div>

      </section>

      <section className="audit-log-card">

        <div className="audit-log-filters">

          <div className="audit-search">

            <Search size={17} />

            <input
              placeholder="Search actor, resource or details..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
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

            <option value="RMLM">
              Raymond Mhlaba
            </option>

            <option value="MAK">
              Makhanda
            </option>

            <option value="SYSTEM">
              System
            </option>
          </select>

          <select
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(event.target.value)
            }
          >
            <option value="ALL">
              All Event Types
            </option>

            <option value="USER">
              User
            </option>

            <option value="TICKET">
              Ticket
            </option>

            <option value="MUNICIPALITY">
              Municipality
            </option>

            <option value="SERVICE">
              Service
            </option>

            <option value="SETTINGS">
              Settings
            </option>
          </select>

          <select
            value={actionFilter}
            onChange={(event) =>
              setActionFilter(event.target.value)
            }
          >
            <option value="ALL">
              All Actions
            </option>

            {Object.keys(actionLabels).map(
              (action) => (
                <option
                  key={action}
                  value={action}
                >
                  {actionLabels[action]}
                </option>
              )
            )}
          </select>

        </div>

        <div className="audit-results">
          Showing {filteredLogs.length} of{" "}
          {logs.length} audit events
        </div>

        <div className="audit-table-wrapper">

          <table className="audit-table">

            <thead>
              <tr>
                <th>Date / Time</th>
                <th>Actor</th>
                <th>Action</th>
                <th>Resource</th>
                <th>Municipality</th>
                <th>IP Address</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredLogs.map((log) => (
                <tr key={log.id}>

                  <td>
                    <div className="audit-time">

                      <strong>{log.date}</strong>

                      <span>
                        <Clock3 size={11} />
                        {log.time}
                      </span>

                    </div>
                  </td>

                  <td>
                    <div className="audit-actor">

                      <div className="audit-avatar">
                        SD
                      </div>

                      <div>
                        <strong>
                          {log.actor}
                        </strong>

                        <span>
                          {log.actorEmail}
                        </span>
                      </div>

                    </div>
                  </td>

                  <td>
                    <span
                      className={`audit-action-badge ${log.type.toLowerCase()}`}
                    >
                      {getActionIcon(log.type)}

                      {actionLabels[log.action]}
                    </span>
                  </td>

                  <td>
                    <div className="audit-resource">
                      {log.resource}
                    </div>
                  </td>

                  <td>
                    <span
                      className={`audit-municipality ${
                        log.municipality ===
                        "SYSTEM"
                          ? "system"
                          : ""
                      }`}
                    >
                      {log.municipality}
                    </span>
                  </td>

                  <td>
                    <span className="audit-ip">
                      {log.ip}
                    </span>
                  </td>

                  <td>

                    <button
                      className="audit-view-button"
                      onClick={() =>
                        setSelectedLog(log)
                      }
                    >
                      <Eye size={14} />
                      View
                    </button>

                  </td>

                </tr>
              ))}

              {filteredLogs.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="audit-empty"
                  >
                    No audit events match the
                    selected filters.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </section>

      {selectedLog && (
        <div
          className="audit-modal-overlay"
          onClick={() =>
            setSelectedLog(null)
          }
        >

          <div
            className="audit-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="audit-modal-header">

              <div>
                <span>Audit Event</span>

                <h2>
                  {actionLabels[
                    selectedLog.action
                  ]}
                </h2>

                <p>
                  {selectedLog.resource}
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedLog(null)
                }
              >
                <X size={19} />
              </button>

            </div>

            <div className="audit-detail-grid">

              <div>
                <span>Actor</span>

                <strong>
                  {selectedLog.actor}
                </strong>
              </div>

              <div>
                <span>Actor Email</span>

                <strong>
                  {selectedLog.actorEmail}
                </strong>
              </div>

              <div>
                <span>Date</span>

                <strong>
                  {selectedLog.date}
                </strong>
              </div>

              <div>
                <span>Time</span>

                <strong>
                  {selectedLog.time}
                </strong>
              </div>

              <div>
                <span>Municipality</span>

                <strong>
                  <Building2 size={14} />
                  {selectedLog.municipality}
                </strong>
              </div>

              <div>
                <span>IP Address</span>

                <strong>
                  <MapPin size={14} />
                  {selectedLog.ip}
                </strong>
              </div>

              <div className="audit-detail-full">

                <span>Event Details</span>

                <strong>
                  {selectedLog.details}
                </strong>

              </div>

            </div>

            <div className="audit-modal-footer">

              <div className="audit-integrity">

                <CheckCircle2 size={15} />

                Audit event recorded

              </div>

              <button
                onClick={() =>
                  setSelectedLog(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default AuditLog;