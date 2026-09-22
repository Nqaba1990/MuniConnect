import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Plus,
  Settings,
  Power,
  X,
  Save,
  MapPin,
  CheckCircle2,
  XCircle,
  Building2,
  Trash2,
} from "lucide-react";

import "../../styles/admin-service-areas.css";

const availableServices = [
  "Water",
  "Sewerage",
  "Electricity",
  "Refuse",
  "Fire Department",
  "Eskom",
];

const initialAreas = [
  {
    id: 1,
    name: "Fort Beaufort",
    code: "FB",
    description: "Fort Beaufort municipal service area.",
    status: "ACTIVE",
    services: ["Water", "Sewerage", "Electricity", "Refuse"],
  },
  {
    id: 2,
    name: "Alice",
    code: "AL",
    description: "Alice municipal service area.",
    status: "ACTIVE",
    services: ["Water", "Sewerage", "Electricity", "Refuse"],
  },
  {
    id: 3,
    name: "Hogsback",
    code: "HB",
    description: "Hogsback municipal service area.",
    status: "ACTIVE",
    services: ["Water", "Electricity", "Refuse"],
  },
  {
    id: 4,
    name: "Adelaide",
    code: "AD",
    description: "Adelaide municipal service area.",
    status: "ACTIVE",
    services: ["Water", "Sewerage", "Electricity", "Refuse"],
  },
  {
    id: 5,
    name: "Bedford",
    code: "BD",
    description: "Bedford municipal service area.",
    status: "ACTIVE",
    services: ["Water", "Electricity", "Refuse"],
  },
];

const emptyArea = {
  id: null,
  name: "",
  code: "",
  description: "",
  status: "ACTIVE",
  services: [],
};

function ServiceAreas() {
  const navigate = useNavigate();

  const [areas, setAreas] = useState(initialAreas);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingArea, setEditingArea] = useState(emptyArea);

  const filteredAreas = useMemo(() => {
    return areas.filter((area) => {
      const searchMatch =
        area.name.toLowerCase().includes(search.toLowerCase()) ||
        area.code.toLowerCase().includes(search.toLowerCase()) ||
        area.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "ALL" ||
        area.status === statusFilter;

      return searchMatch && statusMatch;
    });
  }, [areas, search, statusFilter]);

  const activeCount = areas.filter(
    (area) => area.status === "ACTIVE"
  ).length;

  const disabledCount = areas.filter(
    (area) => area.status === "DISABLED"
  ).length;

  const totalCoverage = areas.reduce(
    (total, area) => total + area.services.length,
    0
  );

  const openAddModal = () => {
    setEditingArea({
      ...emptyArea,
      services: [],
    });
    setModalOpen(true);
  };

  const openEditModal = (area) => {
    setEditingArea({
      ...area,
      services: [...area.services],
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingArea(emptyArea);
  };

  const handleChange = (field, value) => {
    setEditingArea((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const toggleService = (service) => {
    setEditingArea((current) => {
      const exists = current.services.includes(service);

      return {
        ...current,
        services: exists
          ? current.services.filter(
              (item) => item !== service
            )
          : [...current.services, service],
      };
    });
  };

  const saveArea = () => {
    if (
      !editingArea.name.trim() ||
      !editingArea.code.trim()
    ) {
      alert("Please enter an area name and area code.");
      return;
    }

    if (editingArea.services.length === 0) {
      alert("Please select at least one service.");
      return;
    }

    const normalizedArea = {
      ...editingArea,
      name: editingArea.name.trim(),
      code: editingArea.code.trim().toUpperCase(),
      description: editingArea.description.trim(),
    };

    if (editingArea.id) {
      setAreas((current) =>
        current.map((area) =>
          area.id === editingArea.id
            ? normalizedArea
            : area
        )
      );

      alert("Service area updated successfully.");
    } else {
      setAreas((current) => [
        ...current,
        {
          ...normalizedArea,
          id: Date.now(),
        },
      ]);

      alert("Service area added successfully.");
    }

    closeModal();
  };

  const toggleArea = (areaId) => {
    setAreas((current) =>
      current.map((area) =>
        area.id === areaId
          ? {
              ...area,
              status:
                area.status === "ACTIVE"
                  ? "DISABLED"
                  : "ACTIVE",
            }
          : area
      )
    );
  };

  const deleteArea = (areaId) => {
    const area = areas.find(
      (item) => item.id === areaId
    );

    if (!area) return;

    const confirmed = window.confirm(
      `Delete the ${area.name} service area?`
    );

    if (!confirmed) return;

    setAreas((current) =>
      current.filter((item) => item.id !== areaId)
    );
  };

  return (
    <div className="admin-service-areas-page">
      <header className="admin-service-areas-header">
        <div className="admin-service-areas-header-left">
          <button
            className="admin-service-areas-back"
            onClick={() =>
              navigate("/admin/dashboard")
            }
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="admin-service-areas-breadcrumb">
              Admin / Service Areas
            </div>

            <h1>Service Areas</h1>

            <p>
              Manage municipal service coverage areas.
            </p>
          </div>
        </div>

        <button
          className="admin-service-areas-add-button"
          onClick={openAddModal}
        >
          <Plus size={18} />
          Add Service Area
        </button>
      </header>

      <div className="admin-service-areas-municipality">
        <div className="admin-service-areas-municipality-icon">
          <Building2 size={20} />
        </div>

        <div>
          <strong>
            Raymond Mhlaba Local Municipality
          </strong>
          <span>RMLM · Eastern Cape</span>
        </div>

        <div className="admin-service-areas-isolation">
          Municipality Scoped
        </div>
      </div>

      <section className="admin-service-areas-stats">
        <div className="admin-service-area-stat">
          <div className="admin-service-area-stat-icon">
            <MapPin size={20} />
          </div>

          <div>
            <span>Total Areas</span>
            <strong>{areas.length}</strong>
          </div>
        </div>

        <div className="admin-service-area-stat">
          <div className="admin-service-area-stat-icon active">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>Active Areas</span>
            <strong>{activeCount}</strong>
          </div>
        </div>

        <div className="admin-service-area-stat">
          <div className="admin-service-area-stat-icon disabled">
            <XCircle size={20} />
          </div>

          <div>
            <span>Disabled Areas</span>
            <strong>{disabledCount}</strong>
          </div>
        </div>

        <div className="admin-service-area-stat">
          <div className="admin-service-area-stat-icon coverage">
            <Settings size={20} />
          </div>

          <div>
            <span>Service Coverage</span>
            <strong>{totalCoverage}</strong>
          </div>
        </div>
      </section>

      <section className="admin-service-areas-toolbar">
        <div className="admin-service-areas-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search areas..."
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
          <option value="ACTIVE">Active</option>
          <option value="DISABLED">Disabled</option>
        </select>
      </section>

      <section className="admin-service-areas-grid">
        {filteredAreas.map((area) => (
          <article
            key={area.id}
            className={`admin-service-area-card ${
              area.status === "DISABLED"
                ? "service-area-disabled"
                : ""
            }`}
          >
            <div className="admin-service-area-card-top">
              <div className="admin-service-area-location">
                <div className="admin-service-area-icon">
                  <MapPin size={22} />
                </div>

                <div>
                  <h2>{area.name}</h2>
                  <span>{area.code}</span>
                </div>
              </div>

              <span
                className={`admin-service-area-status ${
                  area.status === "ACTIVE"
                    ? "active"
                    : "disabled"
                }`}
              >
                {area.status === "ACTIVE" ? (
                  <CheckCircle2 size={13} />
                ) : (
                  <XCircle size={13} />
                )}

                {area.status}
              </span>
            </div>

            <p className="admin-service-area-description">
              {area.description ||
                "No area description provided."}
            </p>

            <div className="admin-service-area-section">
              <span>Available Services</span>

              <div className="admin-service-area-tags">
                {area.services.map((service) => (
                  <span key={service}>{service}</span>
                ))}
              </div>
            </div>

            <div className="admin-service-area-coverage">
              <div>
                <span>Service Coverage</span>
                <strong>
                  {area.services.length} services
                </strong>
              </div>

              <div className="admin-service-area-progress">
                <div
                  style={{
                    width: `${Math.min(
                      (area.services.length /
                        availableServices.length) *
                        100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>

            <div className="admin-service-area-footer">
              <button
                className="admin-service-area-configure"
                onClick={() => openEditModal(area)}
              >
                <Settings size={16} />
                Configure
              </button>

              <button
                className={`admin-service-area-toggle ${
                  area.status === "ACTIVE"
                    ? "disable"
                    : "enable"
                }`}
                onClick={() => toggleArea(area.id)}
                title={
                  area.status === "ACTIVE"
                    ? "Disable area"
                    : "Enable area"
                }
              >
                <Power size={16} />
              </button>

              <button
                className="admin-service-area-delete"
                onClick={() => deleteArea(area.id)}
                title="Delete area"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </article>
        ))}
      </section>

      {filteredAreas.length === 0 && (
        <div className="admin-service-areas-empty">
          <MapPin size={35} />

          <h3>No service areas found</h3>

          <p>
            Try changing your search or status filter.
          </p>
        </div>
      )}

      {modalOpen && (
        <div
          className="admin-service-areas-modal-overlay"
          onMouseDown={closeModal}
        >
          <div
            className="admin-service-areas-modal"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            <div className="admin-service-areas-modal-header">
              <div>
                <span>Municipality Coverage</span>

                <h2>
                  {editingArea.id
                    ? "Configure Service Area"
                    : "Add Service Area"}
                </h2>
              </div>

              <button
                className="admin-service-areas-modal-close"
                onClick={closeModal}
              >
                <X size={20} />
              </button>
            </div>

            <div className="admin-service-areas-modal-body">
              <div className="admin-service-areas-form-grid">
                <label>
                  Area Name
                  <input
                    value={editingArea.name}
                    onChange={(event) =>
                      handleChange(
                        "name",
                        event.target.value
                      )
                    }
                    placeholder="e.g. Fort Beaufort"
                  />
                </label>

                <label>
                  Area Code
                  <input
                    value={editingArea.code}
                    onChange={(event) =>
                      handleChange(
                        "code",
                        event.target.value
                      )
                    }
                    placeholder="e.g. FB"
                  />
                </label>

                <label>
                  Status
                  <select
                    value={editingArea.status}
                    onChange={(event) =>
                      handleChange(
                        "status",
                        event.target.value
                      )
                    }
                  >
                    <option value="ACTIVE">
                      Active
                    </option>

                    <option value="DISABLED">
                      Disabled
                    </option>
                  </select>
                </label>

                <label>
                  Municipality
                  <input
                    value="Raymond Mhlaba Local Municipality"
                    disabled
                  />
                </label>
              </div>

              <label className="admin-service-areas-description-field">
                Description

                <textarea
                  value={editingArea.description}
                  onChange={(event) =>
                    handleChange(
                      "description",
                      event.target.value
                    )
                  }
                  placeholder="Describe this service area..."
                  rows="3"
                />
              </label>

              <div className="admin-service-areas-form-section">
                <div className="admin-service-areas-section-heading">
                  <div>
                    <h3>Available Services</h3>

                    <p>
                      Select the services residents can
                      report in this area.
                    </p>
                  </div>
                </div>

                <div className="admin-service-areas-service-list">
                  {availableServices.map((service) => {
                    const selected =
                      editingArea.services.includes(
                        service
                      );

                    return (
                      <label
                        key={service}
                        className={`admin-service-option ${
                          selected ? "selected" : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() =>
                            toggleService(service)
                          }
                        />

                        <span>
                          {service}
                        </span>

                        {selected && (
                          <CheckCircle2 size={17} />
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="admin-service-areas-coverage-notice">
                <MapPin size={18} />

                <div>
                  <strong>
                    Coverage configuration
                  </strong>

                  <p>
                    These settings determine which
                    municipal services are available to
                    residents registered in this service
                    area. Backend enforcement will be added
                    when the municipality API is implemented.
                  </p>
                </div>
              </div>
            </div>

            <div className="admin-service-areas-modal-footer">
              <button
                className="admin-service-areas-cancel"
                onClick={closeModal}
              >
                Cancel
              </button>

              <button
                className="admin-service-areas-save"
                onClick={saveArea}
              >
                <Save size={17} />
                Save Service Area
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServiceAreas;