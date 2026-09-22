import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Plus,
  Search,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  Bell,
  CalendarDays,
  AlertTriangle,
  Megaphone,
  Clock3,
  Eye,
  X,
} from "lucide-react";

import "../../styles/municipal-alerts.css";

const municipality = {
  name: "Raymond Mhlaba Local Municipality",
  code: "RMLM",
};

const initialAlerts = [
  {
    id: 1,
    title: "Water Supply Interruption",
    message:
      "Residents in Fort Beaufort may experience reduced water pressure due to maintenance on the main supply line.",
    type: "WATER",
    priority: "HIGH",
    status: "PUBLISHED",
    targetArea: "Fort Beaufort",
    startDate: "16 Sep 2026 08:00",
    endDate: "16 Sep 2026 17:00",
    createdBy: "Nomsa Mbeki",
  },
  {
    id: 2,
    title: "Scheduled Electricity Maintenance",
    message:
      "Scheduled maintenance will affect electricity supply in selected areas. Residents are advised to plan accordingly.",
    type: "ELECTRICITY",
    priority: "MEDIUM",
    status: "PUBLISHED",
    targetArea: "Alice",
    startDate: "17 Sep 2026 09:00",
    endDate: "17 Sep 2026 15:00",
    createdBy: "Thabo Williams",
  },
  {
    id: 3,
    title: "Refuse Collection Delay",
    message:
      "Refuse collection may be delayed due to operational constraints. Normal collection will resume as soon as possible.",
    type: "REFUSE",
    priority: "LOW",
    status: "SCHEDULED",
    targetArea: "Hogsback",
    startDate: "18 Sep 2026 07:00",
    endDate: "18 Sep 2026 18:00",
    createdBy: "Ayanda Peterson",
  },
  {
    id: 4,
    title: "Community Safety Notice",
    message:
      "Residents are reminded to report emergencies to the appropriate emergency services.",
    type: "GENERAL",
    priority: "HIGH",
    status: "EXPIRED",
    targetArea: "All Areas",
    startDate: "10 Sep 2026 08:00",
    endDate: "12 Sep 2026 18:00",
    createdBy: "Nomsa Mbeki",
  },
];

const emptyForm = {
  title: "",
  message: "",
  type: "GENERAL",
  priority: "MEDIUM",
  status: "DRAFT",
  targetArea: "All Areas",
  startDate: "",
  endDate: "",
};

const alertTypes = [
  "GENERAL",
  "WATER",
  "SEWERAGE",
  "ELECTRICITY",
  "REFUSE",
  "FIRE",
  "ESKOM",
  "TRAFFIC",
];

const priorities = ["LOW", "MEDIUM", "HIGH", "URGENT"];

const areas = [
  "All Areas",
  "Fort Beaufort",
  "Alice",
  "Hogsback",
  "Adelaide",
  "Bedford",
  "Macleantown",
];

function MunicipalAlerts() {
  const navigate = useNavigate();
  const { municipalityId } = useParams();

  const [alerts, setAlerts] = useState(initialAlerts);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

  const [showModal, setShowModal] = useState(false);
  const [editingAlert, setEditingAlert] = useState(null);
  const [previewAlert, setPreviewAlert] = useState(null);

  const [form, setForm] = useState(emptyForm);

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        alert.title.toLowerCase().includes(searchValue) ||
        alert.message.toLowerCase().includes(searchValue) ||
        alert.targetArea.toLowerCase().includes(searchValue) ||
        alert.type.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "ALL" ||
        alert.status === statusFilter;

      const matchesPriority =
        priorityFilter === "ALL" ||
        alert.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [alerts, search, statusFilter, priorityFilter]);

  const totalAlerts = alerts.length;

  const publishedAlerts = alerts.filter(
    (alert) => alert.status === "PUBLISHED"
  ).length;

  const scheduledAlerts = alerts.filter(
    (alert) => alert.status === "SCHEDULED"
  ).length;

  const expiredAlerts = alerts.filter(
    (alert) => alert.status === "EXPIRED"
  ).length;

  const urgentAlerts = alerts.filter(
    (alert) => alert.priority === "URGENT"
  ).length;

  const openAddModal = () => {
    setEditingAlert(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (alert) => {
    setEditingAlert(alert);

    setForm({
      title: alert.title,
      message: alert.message,
      type: alert.type,
      priority: alert.priority,
      status: alert.status,
      targetArea: alert.targetArea,
      startDate: alert.startDate,
      endDate: alert.endDate,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingAlert(null);
    setForm(emptyForm);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title || !form.message) {
      window.alert(
        "Please enter an alert title and message."
      );
      return;
    }

    if (editingAlert) {
      setAlerts((previous) =>
        previous.map((alert) =>
          alert.id === editingAlert.id
            ? {
                ...alert,
                ...form,
              }
            : alert
        )
      );
    } else {
      const newAlert = {
        id: Date.now(),
        ...form,
        createdBy: "Developer",
        startDate:
          form.startDate || "Not scheduled",
        endDate:
          form.endDate || "Not specified",
      };

      setAlerts((previous) => [
        newAlert,
        ...previous,
      ]);
    }

    closeModal();
  };

  const togglePublished = (alertId) => {
    setAlerts((previous) =>
      previous.map((alert) =>
        alert.id === alertId
          ? {
              ...alert,
              status:
                alert.status === "PUBLISHED"
                  ? "DRAFT"
                  : "PUBLISHED",
            }
          : alert
      )
    );
  };

  const deleteAlert = (alertId) => {
    const alert = alerts.find(
      (item) => item.id === alertId
    );

    if (!alert) return;

    const confirmed = window.confirm(
      `Delete alert "${alert.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setAlerts((previous) =>
      previous.filter(
        (item) => item.id !== alertId
      )
    );
  };

  const getPriorityClass = (priority) => {
    return priority.toLowerCase();
  };

  const getStatusClass = (status) => {
    return status.toLowerCase();
  };

  return (
    <div className="municipal-alerts-page">
      <header className="municipal-alerts-header">
        <div className="municipal-alerts-header-left">
          <button
            className="municipal-alerts-back-button"
            onClick={() =>
              navigate(
                `/developer/municipalities/${municipalityId}`
              )
            }
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="municipal-alerts-breadcrumb">
              Developer / Municipalities / Municipal Alerts
            </div>

            <h1>Municipal Alerts</h1>

            <p>
              Create and manage alerts for the community of{" "}
              <strong>{municipality.name}</strong>.
            </p>
          </div>
        </div>

        <button
          className="municipal-alerts-primary-button"
          onClick={openAddModal}
        >
          <Plus size={18} />
          Create Alert
        </button>
      </header>

      <section className="municipal-alerts-municipality-card">
        <div className="municipal-alerts-municipality-icon">
          <Building2 size={24} />
        </div>

        <div>
          <span>Municipality</span>
          <strong>{municipality.name}</strong>
        </div>

        <div className="municipal-alerts-code">
          <span>Code</span>
          <strong>{municipality.code}</strong>
        </div>
      </section>

      <section className="municipal-alerts-stats">
        <div className="municipal-alert-stat-card">
          <div className="municipal-alert-stat-icon total">
            <Bell size={20} />
          </div>

          <div>
            <span>Total Alerts</span>
            <strong>{totalAlerts}</strong>
          </div>
        </div>

        <div className="municipal-alert-stat-card">
          <div className="municipal-alert-stat-icon published">
            <Megaphone size={20} />
          </div>

          <div>
            <span>Published</span>
            <strong>{publishedAlerts}</strong>
          </div>
        </div>

        <div className="municipal-alert-stat-card">
          <div className="municipal-alert-stat-icon scheduled">
            <CalendarDays size={20} />
          </div>

          <div>
            <span>Scheduled</span>
            <strong>{scheduledAlerts}</strong>
          </div>
        </div>

        <div className="municipal-alert-stat-card">
          <div className="municipal-alert-stat-icon expired">
            <Clock3 size={20} />
          </div>

          <div>
            <span>Expired</span>
            <strong>{expiredAlerts}</strong>
          </div>
        </div>

        <div className="municipal-alert-stat-card">
          <div className="municipal-alert-stat-icon urgent">
            <AlertTriangle size={20} />
          </div>

          <div>
            <span>Urgent</span>
            <strong>{urgentAlerts}</strong>
          </div>
        </div>
      </section>

      <section className="municipal-alerts-panel">
        <div className="municipal-alerts-panel-header">
          <div>
            <h2>Community Alerts</h2>
            <p>
              Alerts published by the municipality to
              residents.
            </p>
          </div>

          <span className="municipal-alert-result-count">
            {filteredAlerts.length} alerts
          </span>
        </div>

        <div className="municipal-alerts-filters">
          <div className="municipal-alerts-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search alerts..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="ALL">All Statuses</option>
            <option value="PUBLISHED">Published</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="DRAFT">Draft</option>
            <option value="EXPIRED">Expired</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(event) =>
              setPriorityFilter(event.target.value)
            }
          >
            <option value="ALL">All Priorities</option>
            <option value="URGENT">Urgent</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>

        <div className="municipal-alerts-list">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <div
                className="municipal-alert-card"
                key={alert.id}
              >
                <div className="municipal-alert-main">
                  <div className="municipal-alert-icon">
                    <Bell size={20} />
                  </div>

                  <div className="municipal-alert-content">
                    <div className="municipal-alert-title-row">
                      <h3>{alert.title}</h3>

                      <span
                        className={`municipal-alert-priority priority-${getPriorityClass(
                          alert.priority
                        )}`}
                      >
                        {alert.priority}
                      </span>
                    </div>

                    <p>{alert.message}</p>

                    <div className="municipal-alert-meta">
                      <span>
                        <Building2 size={13} />
                        {alert.targetArea}
                      </span>

                      <span>
                        <CalendarDays size={13} />
                        {alert.startDate}
                      </span>

                      <span>
                        Type: {alert.type}
                      </span>

                      <span>
                        By: {alert.createdBy}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="municipal-alert-right">
                  <span
                    className={`municipal-alert-status status-${getStatusClass(
                      alert.status
                    )}`}
                  >
                    {alert.status === "PUBLISHED" ? (
                      <CheckCircle2 size={14} />
                    ) : alert.status === "EXPIRED" ? (
                      <XCircle size={14} />
                    ) : (
                      <Clock3 size={14} />
                    )}

                    {alert.status}
                  </span>

                  <div className="municipal-alert-actions">
                    <button
                      className="municipal-alert-action"
                      title="Preview alert"
                      onClick={() =>
                        setPreviewAlert(alert)
                      }
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      className="municipal-alert-action"
                      title="Edit alert"
                      onClick={() =>
                        openEditModal(alert)
                      }
                    >
                      <Pencil size={16} />
                    </button>

                    {alert.status !== "EXPIRED" && (
                      <button
                        className="municipal-alert-action"
                        title={
                          alert.status === "PUBLISHED"
                            ? "Unpublish alert"
                            : "Publish alert"
                        }
                        onClick={() =>
                          togglePublished(alert.id)
                        }
                      >
                        {alert.status === "PUBLISHED" ? (
                          <XCircle size={16} />
                        ) : (
                          <CheckCircle2 size={16} />
                        )}
                      </button>
                    )}

                    <button
                      className="municipal-alert-action danger"
                      title="Delete alert"
                      onClick={() =>
                        deleteAlert(alert.id)
                      }
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="municipal-alerts-empty">
              <Bell size={32} />
              <strong>No alerts found</strong>
              <span>
                No alerts match your current search or
                filters.
              </span>
            </div>
          )}
        </div>
      </section>

      <section className="municipal-alerts-notice">
        <div>
          <AlertTriangle size={20} />
        </div>

        <div>
          <strong>Emergency alerts</strong>

          <p>
            Fire, disaster and other emergency notices
            should be clearly identified and handled
            according to the municipality's emergency
            procedures. The production system should also
            support push notifications for urgent alerts.
          </p>
        </div>
      </section>

      {showModal && (
        <div className="municipal-alerts-modal-overlay">
          <div className="municipal-alerts-modal">
            <div className="municipal-alerts-modal-header">
              <div>
                <h2>
                  {editingAlert
                    ? "Edit Municipal Alert"
                    : "Create Municipal Alert"}
                </h2>

                <p>
                  Configure the message that will be shown
                  to residents.
                </p>
              </div>

              <button
                className="municipal-alerts-close"
                onClick={closeModal}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="municipal-alerts-form">
                <div className="municipal-alert-form-field full">
                  <label>
                    Alert Title <span>*</span>
                  </label>

                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter alert title"
                  />
                </div>

                <div className="municipal-alert-form-field full">
                  <label>
                    Message <span>*</span>
                  </label>

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Enter the alert message for residents..."
                  />
                </div>

                <div className="municipal-alert-form-field">
                  <label>Alert Type</label>

                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                  >
                    {alertTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="municipal-alert-form-field">
                  <label>Priority</label>

                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                  >
                    {priorities.map((priority) => (
                      <option
                        key={priority}
                        value={priority}
                      >
                        {priority}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="municipal-alert-form-field">
                  <label>Target Area</label>

                  <select
                    name="targetArea"
                    value={form.targetArea}
                    onChange={handleChange}
                  >
                    {areas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="municipal-alert-form-field">
                  <label>Status</label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">
                      Published
                    </option>
                    <option value="SCHEDULED">
                      Scheduled
                    </option>
                  </select>
                </div>

                <div className="municipal-alert-form-field">
                  <label>Start Date / Time</label>

                  <input
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    placeholder="16 Sep 2026 08:00"
                  />
                </div>

                <div className="municipal-alert-form-field">
                  <label>End Date / Time</label>

                  <input
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    placeholder="16 Sep 2026 17:00"
                  />
                </div>
              </div>

              <div className="municipal-alerts-modal-footer">
                <button
                  type="button"
                  className="municipal-alerts-secondary-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="municipal-alerts-primary-button"
                >
                  {editingAlert
                    ? "Save Changes"
                    : "Create Alert"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {previewAlert && (
        <div className="municipal-alerts-modal-overlay">
          <div className="municipal-alert-preview">
            <div className="municipal-alert-preview-header">
              <div className="municipal-alert-preview-icon">
                <Bell size={22} />
              </div>

              <button
                className="municipal-alerts-close"
                onClick={() =>
                  setPreviewAlert(null)
                }
              >
                <X size={20} />
              </button>
            </div>

            <div className="municipal-alert-preview-body">
              <span
                className={`municipal-alert-priority priority-${getPriorityClass(
                  previewAlert.priority
                )}`}
              >
                {previewAlert.priority} PRIORITY
              </span>

              <h2>{previewAlert.title}</h2>

              <p>{previewAlert.message}</p>

              <div className="preview-details">
                <div>
                  <span>Area</span>
                  <strong>
                    {previewAlert.targetArea}
                  </strong>
                </div>

                <div>
                  <span>Start</span>
                  <strong>
                    {previewAlert.startDate}
                  </strong>
                </div>

                <div>
                  <span>End</span>
                  <strong>
                    {previewAlert.endDate}
                  </strong>
                </div>
              </div>
            </div>

            <div className="municipal-alert-preview-footer">
              <button
                className="municipal-alerts-secondary-button"
                onClick={() =>
                  setPreviewAlert(null)
                }
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MunicipalAlerts;