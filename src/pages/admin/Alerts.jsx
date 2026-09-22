import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Plus,
  Bell,
  AlertTriangle,
  Info,
  Siren,
  X,
  Save,
  Eye,
  Power,
  Trash2,
  CalendarDays,
  MapPin,
  Users,
  CheckCircle2,
} from "lucide-react";

import "../../styles/admin-alerts.css";

const serviceAreas = [
  "All Areas",
  "Fort Beaufort",
  "Alice",
  "Hogsback",
  "Adelaide",
  "Bedford",
];

const initialAlerts = [
  {
    id: 1,
    title: "Scheduled Water Maintenance",
    message:
      "Residents in Fort Beaufort may experience reduced water pressure during scheduled maintenance.",
    type: "WARNING",
    status: "PUBLISHED",
    target: "Fort Beaufort",
    startDate: "2026-09-22",
    endDate: "2026-09-23",
    createdBy: "Nomsa Mbeki",
    notifications: true,
  },
  {
    id: 2,
    title: "Community Safety Notice",
    message:
      "Residents are reminded to report suspicious activity to the appropriate authorities.",
    type: "INFO",
    status: "PUBLISHED",
    target: "All Areas",
    startDate: "2026-09-20",
    endDate: "2026-09-30",
    createdBy: "Thabo Williams",
    notifications: true,
  },
  {
    id: 3,
    title: "Emergency Road Closure",
    message:
      "A temporary road closure is currently in effect in the Alice service area.",
    type: "EMERGENCY",
    status: "PUBLISHED",
    target: "Alice",
    startDate: "2026-09-22",
    endDate: "2026-09-22",
    createdBy: "Ayanda Peterson",
    notifications: true,
  },
  {
    id: 4,
    title: "Refuse Collection Update",
    message:
      "Refuse collection schedules have been adjusted for the Bedford area.",
    type: "INFO",
    status: "DRAFT",
    target: "Bedford",
    startDate: "2026-09-25",
    endDate: "2026-09-27",
    createdBy: "Sibusiso Jacobs",
    notifications: false,
  },
];

const emptyAlert = {
  id: null,
  title: "",
  message: "",
  type: "INFO",
  status: "DRAFT",
  target: "All Areas",
  startDate: "",
  endDate: "",
  createdBy: "Current Administrator",
  notifications: true,
};

function getTypeIcon(type) {
  if (type === "EMERGENCY") {
    return <Siren size={19} />;
  }

  if (type === "WARNING") {
    return <AlertTriangle size={19} />;
  }

  return <Info size={19} />;
}

function Alerts() {
  const navigate = useNavigate();

  const [alerts, setAlerts] = useState(initialAlerts);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [modalOpen, setModalOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const [editingAlert, setEditingAlert] = useState({
    ...emptyAlert,
  });

  const [previewAlert, setPreviewAlert] = useState(null);

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alertItem) => {
      const searchValue = search.toLowerCase().trim();

      const searchMatch =
        alertItem.title
          .toLowerCase()
          .includes(searchValue) ||
        alertItem.message
          .toLowerCase()
          .includes(searchValue) ||
        alertItem.target
          .toLowerCase()
          .includes(searchValue);

      const typeMatch =
        typeFilter === "ALL" ||
        alertItem.type === typeFilter;

      const statusMatch =
        statusFilter === "ALL" ||
        alertItem.status === statusFilter;

      return (
        searchMatch &&
        typeMatch &&
        statusMatch
      );
    });
  }, [
    alerts,
    search,
    typeFilter,
    statusFilter,
  ]);

  const publishedCount = alerts.filter(
    (alertItem) =>
      alertItem.status === "PUBLISHED"
  ).length;

  const draftCount = alerts.filter(
    (alertItem) =>
      alertItem.status === "DRAFT"
  ).length;

  const emergencyCount = alerts.filter(
    (alertItem) =>
      alertItem.type === "EMERGENCY"
  ).length;

  const openAddModal = () => {
    const today = new Date()
      .toISOString()
      .slice(0, 10);

    setEditingAlert({
      ...emptyAlert,
      startDate: today,
      endDate: today,
    });

    setModalOpen(true);
  };

  const openEditModal = (alertItem) => {
    setEditingAlert({
      ...alertItem,
    });

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);

    setEditingAlert({
      ...emptyAlert,
    });
  };

  const handleChange = (field, value) => {
    setEditingAlert((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const saveAlert = () => {
    if (!editingAlert.title.trim()) {
      alert("Please enter an alert title.");
      return;
    }

    if (!editingAlert.message.trim()) {
      alert("Please enter an alert message.");
      return;
    }

    if (
      !editingAlert.startDate ||
      !editingAlert.endDate
    ) {
      alert(
        "Please select a start and end date."
      );
      return;
    }

    if (
      editingAlert.endDate <
      editingAlert.startDate
    ) {
      alert(
        "The end date cannot be before the start date."
      );
      return;
    }

    const normalizedAlert = {
      ...editingAlert,
      title: editingAlert.title.trim(),
      message: editingAlert.message.trim(),
    };

    if (editingAlert.id) {
      setAlerts((current) =>
        current.map((alertItem) =>
          alertItem.id === editingAlert.id
            ? normalizedAlert
            : alertItem
        )
      );

      alert("Alert updated successfully.");
    } else {
      setAlerts((current) => [
        ...current,
        {
          ...normalizedAlert,
          id: Date.now(),
        },
      ]);

      alert("Alert created successfully.");
    }

    closeModal();
  };

  const togglePublished = (alertId) => {
    setAlerts((current) =>
      current.map((alertItem) =>
        alertItem.id === alertId
          ? {
              ...alertItem,
              status:
                alertItem.status ===
                "PUBLISHED"
                  ? "DRAFT"
                  : "PUBLISHED",
            }
          : alertItem
      )
    );
  };

  const deleteAlert = (alertId) => {
    const alertItem = alerts.find(
      (item) => item.id === alertId
    );

    if (!alertItem) {
      return;
    }

    const confirmed = window.confirm(
      `Delete "${alertItem.title}"?`
    );

    if (!confirmed) {
      return;
    }

    setAlerts((current) =>
      current.filter(
        (item) => item.id !== alertId
      )
    );
  };

  const openPreview = (alertItem) => {
    setPreviewAlert(alertItem);
    setPreviewOpen(true);
  };

  const closePreview = () => {
    setPreviewOpen(false);
    setPreviewAlert(null);
  };

  return (
    <div className="admin-alerts-page">
      {/* HEADER */}
      <header className="admin-alerts-header">
        <div className="admin-alerts-header-left">
          <button
            className="admin-alerts-back"
            onClick={() =>
              navigate("/admin/dashboard")
            }
            title="Back to Admin Dashboard"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="admin-alerts-breadcrumb">
              Admin / Alerts & Notifications
            </div>

            <h1>
              Alerts & Notifications
            </h1>

            <p>
              Publish important municipal
              information to residents.
            </p>
          </div>
        </div>

        <button
          className="admin-alerts-add-button"
          onClick={openAddModal}
        >
          <Plus size={18} />
          Create Alert
        </button>
      </header>

      {/* MUNICIPALITY */}
      <div className="admin-alerts-municipality">
        <div className="admin-alerts-municipality-icon">
          <Bell size={20} />
        </div>

        <div>
          <strong>
            Raymond Mhlaba Local Municipality
          </strong>

          <span>
            RMLM · Eastern Cape
          </span>
        </div>

        <div className="admin-alerts-isolation">
          Municipality Scoped
        </div>
      </div>

      {/* STATS */}
      <section className="admin-alerts-stats">
        <div className="admin-alert-stat">
          <div className="admin-alert-stat-icon">
            <Bell size={20} />
          </div>

          <div>
            <span>Total Alerts</span>
            <strong>
              {alerts.length}
            </strong>
          </div>
        </div>

        <div className="admin-alert-stat">
          <div className="admin-alert-stat-icon published">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>Published</span>
            <strong>
              {publishedCount}
            </strong>
          </div>
        </div>

        <div className="admin-alert-stat">
          <div className="admin-alert-stat-icon draft">
            <CalendarDays size={20} />
          </div>

          <div>
            <span>Drafts</span>
            <strong>
              {draftCount}
            </strong>
          </div>
        </div>

        <div className="admin-alert-stat">
          <div className="admin-alert-stat-icon emergency">
            <Siren size={20} />
          </div>

          <div>
            <span>Emergency Alerts</span>
            <strong>
              {emergencyCount}
            </strong>
          </div>
        </div>
      </section>

      {/* SEARCH AND FILTERS */}
      <section className="admin-alerts-toolbar">
        <div className="admin-alerts-search">
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
          value={typeFilter}
          onChange={(event) =>
            setTypeFilter(event.target.value)
          }
        >
          <option value="ALL">
            All Types
          </option>

          <option value="INFO">
            Information
          </option>

          <option value="WARNING">
            Warning
          </option>

          <option value="EMERGENCY">
            Emergency
          </option>
        </select>

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(
              event.target.value
            )
          }
        >
          <option value="ALL">
            All Statuses
          </option>

          <option value="PUBLISHED">
            Published
          </option>

          <option value="DRAFT">
            Draft
          </option>
        </select>
      </section>

      {/* ALERT LIST */}
      <section className="admin-alerts-list">
        {filteredAlerts.map((alertItem) => (
          <article
            key={alertItem.id}
            className={`admin-alert-card ${alertItem.type.toLowerCase()}`}
          >
            <div className="admin-alert-card-icon">
              {getTypeIcon(
                alertItem.type
              )}
            </div>

            <div className="admin-alert-card-content">
              <div className="admin-alert-card-title-row">
                <div>
                  <div className="admin-alert-badges">
                    <span
                      className={`admin-alert-type-badge ${alertItem.type.toLowerCase()}`}
                    >
                      {alertItem.type}
                    </span>

                    <span
                      className={`admin-alert-status-badge ${alertItem.status.toLowerCase()}`}
                    >
                      {alertItem.status}
                    </span>
                  </div>

                  <h2>
                    {alertItem.title}
                  </h2>
                </div>
              </div>

              <p>
                {alertItem.message}
              </p>

              <div className="admin-alert-meta">
                <span>
                  <MapPin size={14} />
                  {alertItem.target}
                </span>

                <span>
                  <CalendarDays size={14} />
                  {alertItem.startDate} →{" "}
                  {alertItem.endDate}
                </span>

                <span>
                  <Users size={14} />

                  {alertItem.notifications
                    ? "Resident notifications ON"
                    : "Notifications OFF"}
                </span>
              </div>

              <div className="admin-alert-created">
                Created by{" "}
                {alertItem.createdBy}
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="admin-alert-actions">
              {/* PREVIEW */}
              <button
                className="admin-alert-action preview"
                onClick={() =>
                  openPreview(alertItem)
                }
                title="Preview"
              >
                <Eye size={16} />
              </button>

              {/* EDIT */}
              <button
                className="admin-alert-action edit"
                onClick={() =>
                  openEditModal(alertItem)
                }
                title="Edit"
              >
                <Bell size={16} />
              </button>

              {/* PUBLISH / UNPUBLISH */}
              <button
                className={`admin-alert-action power ${
                  alertItem.status ===
                  "PUBLISHED"
                    ? "published"
                    : "draft"
                }`}
                onClick={() =>
                  togglePublished(
                    alertItem.id
                  )
                }
                title={
                  alertItem.status ===
                  "PUBLISHED"
                    ? "Unpublish"
                    : "Publish"
                }
              >
                <Power size={16} />
              </button>

              {/* DELETE */}
              <button
                className="admin-alert-action delete"
                onClick={() =>
                  deleteAlert(
                    alertItem.id
                  )
                }
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* EMPTY STATE */}
      {filteredAlerts.length === 0 && (
        <div className="admin-alerts-empty">
          <Bell size={35} />

          <h3>
            No alerts found
          </h3>

          <p>
            Try changing your search or
            filters.
          </p>
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div
          className="admin-alerts-modal-overlay"
          onMouseDown={closeModal}
        >
          <div
            className="admin-alerts-modal"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            <div className="admin-alerts-modal-header">
              <div>
                <span>
                  Municipal Communication
                </span>

                <h2>
                  {editingAlert.id
                    ? "Edit Alert"
                    : "Create Alert"}
                </h2>
              </div>

              <button
                className="admin-alerts-modal-close"
                onClick={closeModal}
                title="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="admin-alerts-modal-body">
              <div className="admin-alerts-form-grid">
                {/* TITLE */}
                <label className="full">
                  Alert Title

                  <input
                    type="text"
                    value={
                      editingAlert.title
                    }
                    onChange={(event) =>
                      handleChange(
                        "title",
                        event.target.value
                      )
                    }
                    placeholder="Enter alert title..."
                  />
                </label>

                {/* TYPE */}
                <label>
                  Alert Type

                  <select
                    value={
                      editingAlert.type
                    }
                    onChange={(event) =>
                      handleChange(
                        "type",
                        event.target.value
                      )
                    }
                  >
                    <option value="INFO">
                      Information
                    </option>

                    <option value="WARNING">
                      Warning
                    </option>

                    <option value="EMERGENCY">
                      Emergency
                    </option>
                  </select>
                </label>

                {/* STATUS */}
                <label>
                  Status

                  <select
                    value={
                      editingAlert.status
                    }
                    onChange={(event) =>
                      handleChange(
                        "status",
                        event.target.value
                      )
                    }
                  >
                    <option value="DRAFT">
                      Draft
                    </option>

                    <option value="PUBLISHED">
                      Published
                    </option>
                  </select>
                </label>

                {/* TARGET */}
                <label>
                  Target Area

                  <select
                    value={
                      editingAlert.target
                    }
                    onChange={(event) =>
                      handleChange(
                        "target",
                        event.target.value
                      )
                    }
                  >
                    {serviceAreas.map(
                      (area) => (
                        <option
                          key={area}
                          value={area}
                        >
                          {area}
                        </option>
                      )
                    )}
                  </select>
                </label>

                {/* START DATE */}
                <label>
                  Start Date

                  <input
                    type="date"
                    value={
                      editingAlert.startDate
                    }
                    onChange={(event) =>
                      handleChange(
                        "startDate",
                        event.target.value
                      )
                    }
                  />
                </label>

                {/* END DATE */}
                <label>
                  End Date

                  <input
                    type="date"
                    value={
                      editingAlert.endDate
                    }
                    onChange={(event) =>
                      handleChange(
                        "endDate",
                        event.target.value
                      )
                    }
                  />
                </label>

                {/* MESSAGE */}
                <label className="full">
                  Message

                  <textarea
                    rows="5"
                    value={
                      editingAlert.message
                    }
                    onChange={(event) =>
                      handleChange(
                        "message",
                        event.target.value
                      )
                    }
                    placeholder="Enter the message residents will receive..."
                  />
                </label>
              </div>

              {/* NOTIFICATIONS */}
              <div className="admin-alerts-notification-setting">
                <label>
                  <input
                    type="checkbox"
                    checked={
                      editingAlert.notifications
                    }
                    onChange={(event) =>
                      handleChange(
                        "notifications",
                        event.target.checked
                      )
                    }
                  />

                  <span>
                    <strong>
                      Send resident notification
                    </strong>

                    <small>
                      Residents in the selected
                      area will receive a
                      notification when this alert
                      is published.
                    </small>
                  </span>
                </label>
              </div>

              {/* EMERGENCY NOTICE */}
              {editingAlert.type ===
                "EMERGENCY" && (
                <div className="admin-alert-emergency-notice">
                  <Siren size={19} />

                  <div>
                    <strong>
                      Emergency alert
                    </strong>

                    <p>
                      Emergency alerts should be
                      used for urgent public-safety
                      information. The backend will
                      later support priority
                      delivery and push
                      notifications.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* MODAL FOOTER */}
            <div className="admin-alerts-modal-footer">
              <button
                className="admin-alerts-cancel"
                onClick={closeModal}
              >
                Cancel
              </button>

              <button
                className="admin-alerts-save"
                onClick={saveAlert}
              >
                <Save size={17} />
                Save Alert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESIDENT PREVIEW */}
      {previewOpen &&
        previewAlert && (
          <div
            className="admin-alerts-modal-overlay"
            onMouseDown={closePreview}
          >
            <div
              className="admin-alert-preview-modal"
              onMouseDown={(event) =>
                event.stopPropagation()
              }
            >
              <div className="admin-alert-preview-header">
                <span>
                  Resident Preview
                </span>

                <button
                  onClick={closePreview}
                  title="Close preview"
                >
                  <X size={20} />
                </button>
              </div>

              <div
                className={`admin-alert-preview-banner ${previewAlert.type.toLowerCase()}`}
              >
                {getTypeIcon(
                  previewAlert.type
                )}

                <div>
                  <span>
                    {previewAlert.type}
                  </span>

                  <h2>
                    {previewAlert.title}
                  </h2>
                </div>
              </div>

              <div className="admin-alert-preview-body">
                <p>
                  {previewAlert.message}
                </p>

                <div className="admin-alert-preview-info">
                  <span>
                    <MapPin size={15} />
                    {previewAlert.target}
                  </span>

                  <span>
                    <CalendarDays size={15} />
                    {previewAlert.startDate} →{" "}
                    {previewAlert.endDate}
                  </span>
                </div>
              </div>

              <div className="admin-alert-preview-footer">
                This is how the municipal alert
                may appear to residents.
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default Alerts;