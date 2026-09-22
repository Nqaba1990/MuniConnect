import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Building2,
  Plus,
  Search,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  Users,
  Ticket,
  Settings,
  X,
} from "lucide-react";
import "../../styles/service-areas.css";

function ServiceAreas() {
  const navigate = useNavigate();
  const { municipalityId } = useParams();

  const municipality = {
    name: "Raymond Mhlaba Local Municipality",
    code: "RMLM",
  };

  const [areas, setAreas] = useState([
    {
      id: 1,
      name: "Fort Beaufort",
      code: "FB",
      wardCount: 8,
      residents: 8421,
      activeTickets: 37,
      technicians: 8,
      services: 6,
      status: "ACTIVE",
    },
    {
      id: 2,
      name: "Alice",
      code: "AL",
      wardCount: 7,
      residents: 7138,
      activeTickets: 29,
      technicians: 6,
      services: 6,
      status: "ACTIVE",
    },
    {
      id: 3,
      name: "Hogsback",
      code: "HB",
      wardCount: 3,
      residents: 2154,
      activeTickets: 11,
      technicians: 3,
      services: 5,
      status: "ACTIVE",
    },
    {
      id: 4,
      name: "Adelaide",
      code: "AD",
      wardCount: 4,
      residents: 3290,
      activeTickets: 18,
      technicians: 4,
      services: 6,
      status: "ACTIVE",
    },
    {
      id: 5,
      name: "Bedford",
      code: "BD",
      wardCount: 5,
      residents: 4012,
      activeTickets: 15,
      technicians: 4,
      services: 6,
      status: "ACTIVE",
    },
    {
      id: 6,
      name: "Macleantown",
      code: "MT",
      wardCount: 2,
      residents: 1288,
      activeTickets: 5,
      technicians: 2,
      services: 4,
      status: "DISABLED",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [showModal, setShowModal] = useState(false);
  const [editingArea, setEditingArea] =
    useState(null);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    wardCount: "",
    services: "6",
    status: "ACTIVE",
  });

  const filteredAreas = areas.filter((area) => {
    const matchesSearch =
      area.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      area.code
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ||
      area.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const activeAreas = areas.filter(
    (area) => area.status === "ACTIVE"
  ).length;

  const totalResidents = areas.reduce(
    (total, area) => total + area.residents,
    0
  );

  const totalTickets = areas.reduce(
    (total, area) => total + area.activeTickets,
    0
  );

  const totalTechnicians = areas.reduce(
    (total, area) => total + area.technicians,
    0
  );

  const openAddModal = () => {
    setEditingArea(null);

    setFormData({
      name: "",
      code: "",
      wardCount: "",
      services: "6",
      status: "ACTIVE",
    });

    setShowModal(true);
  };

  const openEditModal = (area) => {
    setEditingArea(area);

    setFormData({
      name: area.name,
      code: area.code,
      wardCount: area.wardCount,
      services: area.services,
      status: area.status,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingArea(null);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSaveArea = (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      return;
    }

    if (editingArea) {
      setAreas((currentAreas) =>
        currentAreas.map((area) =>
          area.id === editingArea.id
            ? {
                ...area,
                name: formData.name.trim(),
                code:
                  formData.code
                    .trim()
                    .toUpperCase() ||
                  area.code,
                wardCount:
                  Number(formData.wardCount) || 0,
                services:
                  Number(formData.services) || 0,
                status: formData.status,
              }
            : area
        )
      );
    } else {
      const newArea = {
        id: Date.now(),
        name: formData.name.trim(),
        code:
          formData.code.trim().toUpperCase() ||
          "NEW",
        wardCount:
          Number(formData.wardCount) || 0,
        residents: 0,
        activeTickets: 0,
        technicians: 0,
        services:
          Number(formData.services) || 0,
        status: formData.status,
      };

      setAreas((currentAreas) => [
        ...currentAreas,
        newArea,
      ]);
    }

    closeModal();
  };

  const toggleAreaStatus = (areaId) => {
    setAreas((currentAreas) =>
      currentAreas.map((area) =>
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

    if (!area) {
      return;
    }

    const confirmed = window.confirm(
      `Delete the ${area.name} service area?`
    );

    if (!confirmed) {
      return;
    }

    setAreas((currentAreas) =>
      currentAreas.filter(
        (item) => item.id !== areaId
      )
    );
  };

  return (
    <div className="service-areas-page">
      {/* =====================================
          HEADER
      ====================================== */}

      <header className="service-areas-header">
        <div className="service-areas-header-left">
          <button
            className="service-areas-back"
            onClick={() =>
              navigate(
                `/developer/municipalities/${municipalityId}`
              )
            }
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <p className="service-areas-eyebrow">
              MUNICIPALITY MANAGEMENT
            </p>

            <h1>Service Areas</h1>

            <p>
              Manage towns, wards and service coverage
              areas for this municipality.
            </p>
          </div>
        </div>

        <button
          className="add-service-area-button"
          onClick={openAddModal}
        >
          <Plus size={18} />
          Add Service Area
        </button>
      </header>

      {/* =====================================
          MUNICIPALITY BANNER
      ====================================== */}

      <section className="service-area-municipality-banner">
        <div className="service-area-banner-icon">
          <Building2 size={27} />
        </div>

        <div>
          <span>{municipality.code}</span>

          <h2>{municipality.name}</h2>

          <p>
            Service coverage configured for this
            municipality.
          </p>
        </div>
      </section>

      {/* =====================================
          STATISTICS
      ====================================== */}

      <section className="service-area-statistics">
        <div className="service-area-stat-card">
          <div className="service-area-stat-icon">
            <MapPin size={20} />
          </div>

          <div>
            <span>Total Areas</span>
            <strong>{areas.length}</strong>
          </div>
        </div>

        <div className="service-area-stat-card">
          <div className="service-area-stat-icon">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>Active Areas</span>
            <strong>{activeAreas}</strong>
          </div>
        </div>

        <div className="service-area-stat-card">
          <div className="service-area-stat-icon">
            <Users size={20} />
          </div>

          <div>
            <span>Residents</span>
            <strong>
              {totalResidents.toLocaleString()}
            </strong>
          </div>
        </div>

        <div className="service-area-stat-card">
          <div className="service-area-stat-icon">
            <Ticket size={20} />
          </div>

          <div>
            <span>Active Tickets</span>
            <strong>{totalTickets}</strong>
          </div>
        </div>

        <div className="service-area-stat-card">
          <div className="service-area-stat-icon">
            <Settings size={20} />
          </div>

          <div>
            <span>Technicians</span>
            <strong>{totalTechnicians}</strong>
          </div>
        </div>
      </section>

      {/* =====================================
          FILTERS
      ====================================== */}

      <section className="service-area-toolbar">
        <div className="service-area-search">
          <Search size={17} />

          <input
            type="text"
            placeholder="Search service areas..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />
        </div>

        <div className="service-area-filter">
          <label>Status</label>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="ALL">All Areas</option>
            <option value="ACTIVE">
              Active
            </option>
            <option value="DISABLED">
              Disabled
            </option>
          </select>
        </div>
      </section>

      {/* =====================================
          AREA CARDS
      ====================================== */}

      <section className="service-area-content">
        <div className="service-area-content-heading">
          <div>
            <p className="service-areas-eyebrow">
              SERVICE COVERAGE
            </p>

            <h2>Municipality Areas</h2>

            <p>
              Each area can have its own wards, services
              and technician coverage.
            </p>
          </div>

          <span className="service-area-result-count">
            {filteredAreas.length} areas
          </span>
        </div>

        {filteredAreas.length === 0 ? (
          <div className="service-area-empty">
            <MapPin size={34} />

            <h3>No service areas found</h3>

            <p>
              Try changing your search or status filter.
            </p>
          </div>
        ) : (
          <div className="service-area-grid">
            {filteredAreas.map((area) => (
              <article
                className={`service-area-card ${
                  area.status === "DISABLED"
                    ? "service-area-disabled"
                    : ""
                }`}
                key={area.id}
              >
                {/* Card top */}

                <div className="service-area-card-top">
                  <div className="service-area-icon">
                    <MapPin size={23} />
                  </div>

                  <div className="service-area-code">
                    {area.code}
                  </div>

                  {area.status === "ACTIVE" ? (
                    <span className="service-area-active">
                      <CheckCircle2 size={13} />
                      ACTIVE
                    </span>
                  ) : (
                    <span className="service-area-inactive">
                      <XCircle size={13} />
                      DISABLED
                    </span>
                  )}
                </div>

                {/* Area information */}

                <div className="service-area-card-title">
                  <h3>{area.name}</h3>

                  <p>
                    {area.wardCount} wards configured
                  </p>
                </div>

                {/* Statistics */}

                <div className="service-area-card-stats">
                  <div>
                    <Users size={15} />

                    <span>
                      <strong>
                        {area.residents.toLocaleString()}
                      </strong>
                      Residents
                    </span>
                  </div>

                  <div>
                    <Ticket size={15} />

                    <span>
                      <strong>
                        {area.activeTickets}
                      </strong>
                      Active Tickets
                    </span>
                  </div>

                  <div>
                    <Settings size={15} />

                    <span>
                      <strong>
                        {area.technicians}
                      </strong>
                      Technicians
                    </span>
                  </div>
                </div>

                {/* Services */}

                <div className="service-area-services">
                  <span>Services</span>

                  <strong>
                    {area.services} enabled
                  </strong>
                </div>

                {/* Actions */}

                <div className="service-area-actions">
                  <button
                    onClick={() =>
                      openEditModal(area)
                    }
                  >
                    <Pencil size={15} />
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      toggleAreaStatus(area.id)
                    }
                  >
                    {area.status === "ACTIVE" ? (
                      <>
                        <XCircle size={15} />
                        Disable
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={15} />
                        Enable
                      </>
                    )}
                  </button>

                  <button
                    className="delete-area-button"
                    onClick={() =>
                      deleteArea(area.id)
                    }
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* =====================================
          INFORMATION NOTICE
      ====================================== */}

      <section className="service-area-notice">
        <div className="service-area-notice-icon">
          <MapPin size={22} />
        </div>

        <div>
          <h3>
            Service areas will control future
            assignments
          </h3>

          <p>
            When the backend is connected, residents
            will be associated with their municipality
            and service area. Tickets can then be routed
            to technicians responsible for that area.
          </p>
        </div>
      </section>

      {/* =====================================
          ADD / EDIT MODAL
      ====================================== */}

      {showModal && (
        <div
          className="service-area-modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeModal();
            }
          }}
        >
          <div className="service-area-modal">
            <div className="service-area-modal-header">
              <div>
                <p className="service-areas-eyebrow">
                  SERVICE AREA
                </p>

                <h2>
                  {editingArea
                    ? "Edit Service Area"
                    : "Add Service Area"}
                </h2>

                <p>
                  Configure the municipality service
                  coverage area.
                </p>
              </div>

              <button
                className="close-modal-button"
                onClick={closeModal}
              >
                <X size={19} />
              </button>
            </div>

            <form
              onSubmit={handleSaveArea}
              className="service-area-form"
            >
              <div className="service-area-form-grid">
                <div className="service-area-form-field">
                  <label>
                    Area / Town Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="e.g. Fort Beaufort"
                    required
                  />
                </div>

                <div className="service-area-form-field">
                  <label>Area Code</label>

                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleFormChange}
                    placeholder="e.g. FB"
                    maxLength={10}
                  />
                </div>

                <div className="service-area-form-field">
                  <label>Number of Wards</label>

                  <input
                    type="number"
                    name="wardCount"
                    min="0"
                    value={formData.wardCount}
                    onChange={handleFormChange}
                    placeholder="e.g. 8"
                  />
                </div>

                <div className="service-area-form-field">
                  <label>
                    Enabled Services
                  </label>

                  <select
                    name="services"
                    value={formData.services}
                    onChange={handleFormChange}
                  >
                    <option value="1">
                      1 Service
                    </option>

                    <option value="2">
                      2 Services
                    </option>

                    <option value="3">
                      3 Services
                    </option>

                    <option value="4">
                      4 Services
                    </option>

                    <option value="5">
                      5 Services
                    </option>

                    <option value="6">
                      6 Services
                    </option>
                  </select>
                </div>

                <div className="service-area-form-field full-width">
                  <label>Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleFormChange}
                  >
                    <option value="ACTIVE">
                      Active
                    </option>

                    <option value="DISABLED">
                      Disabled
                    </option>
                  </select>
                </div>
              </div>

              <div className="service-area-form-actions">
                <button
                  type="button"
                  className="cancel-area-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-area-button"
                >
                  <CheckCircle2 size={16} />

                  {editingArea
                    ? "Save Changes"
                    : "Create Service Area"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServiceAreas;