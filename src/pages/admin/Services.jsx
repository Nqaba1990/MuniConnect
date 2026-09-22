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
  Zap,
  Droplets,
  Waves,
  Trash2,
  Flame,
  Building2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import "../../styles/admin-services.css";

const initialServices = [
  {
    id: 1,
    name: "Water",
    code: "WATER",
    department: "Water Services",
    icon: "water",
    status: "ACTIVE",
    sla: "8 hours",
    assignment: "Automatic",
    faultTypes: [
      "Burst pipe",
      "No water",
      "Low water pressure",
      "Water leak",
    ],
    escalation: true,
    notifications: true,
  },
  {
    id: 2,
    name: "Sewerage",
    code: "SEWERAGE",
    department: "Water & Sanitation",
    icon: "sewerage",
    status: "ACTIVE",
    sla: "12 hours",
    assignment: "Automatic",
    faultTypes: [
      "Blocked sewer",
      "Sewer overflow",
      "Damaged manhole",
      "Sewer leak",
    ],
    escalation: true,
    notifications: true,
  },
  {
    id: 3,
    name: "Electricity",
    code: "ELECTRICITY",
    department: "Electrical Services",
    icon: "electricity",
    status: "ACTIVE",
    sla: "6 hours",
    assignment: "Automatic",
    faultTypes: [
      "Power outage",
      "Streetlight",
      "Damaged pole",
      "Electrical fault",
    ],
    escalation: true,
    notifications: true,
  },
  {
    id: 4,
    name: "Refuse",
    code: "REFUSE",
    department: "Waste Management",
    icon: "refuse",
    status: "ACTIVE",
    sla: "24 hours",
    assignment: "Manual",
    faultTypes: [
      "Missed collection",
      "Illegal dumping",
      "Damaged bin",
      "Overflowing waste",
    ],
    escalation: false,
    notifications: true,
  },
  {
    id: 5,
    name: "Fire Department",
    code: "FIRE",
    department: "Fire & Emergency Services",
    icon: "fire",
    status: "ACTIVE",
    sla: "Immediate",
    assignment: "Automatic",
    faultTypes: [
      "Fire emergency",
      "Fire hydrant",
      "Fire equipment",
      "Emergency response",
    ],
    escalation: true,
    notifications: true,
  },
  {
    id: 6,
    name: "Eskom",
    code: "ESKOM",
    department: "External Provider",
    icon: "eskom",
    status: "ACTIVE",
    sla: "External",
    assignment: "External Provider",
    faultTypes: [
      "Power outage",
      "Network fault",
      "Damaged infrastructure",
      "Transformer fault",
    ],
    escalation: true,
    notifications: true,
  },
];

const emptyService = {
  id: null,
  name: "",
  code: "",
  department: "",
  icon: "water",
  status: "ACTIVE",
  sla: "",
  assignment: "Automatic",
  faultTypes: [],
  escalation: true,
  notifications: true,
};

function getIcon(icon) {
  const icons = {
    water: <Droplets size={24} />,
    sewerage: <Waves size={24} />,
    electricity: <Zap size={24} />,
    refuse: <Trash2 size={24} />,
    fire: <Flame size={24} />,
    eskom: <Zap size={24} />,
  };

  return icons[icon] || <Building2 size={24} />;
}

function Services() {
  const navigate = useNavigate();

  const [services, setServices] = useState(initialServices);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(emptyService);
  const [faultTypeInput, setFaultTypeInput] = useState("");

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const searchMatch =
        service.name.toLowerCase().includes(search.toLowerCase()) ||
        service.code.toLowerCase().includes(search.toLowerCase()) ||
        service.department.toLowerCase().includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "ALL" || service.status === statusFilter;

      return searchMatch && statusMatch;
    });
  }, [services, search, statusFilter]);

  const activeCount = services.filter(
    (service) => service.status === "ACTIVE"
  ).length;

  const disabledCount = services.filter(
    (service) => service.status === "DISABLED"
  ).length;

  const openAddModal = () => {
    setEditingService({
      ...emptyService,
      faultTypes: [],
    });
    setFaultTypeInput("");
    setModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingService({
      ...service,
      faultTypes: [...service.faultTypes],
    });
    setFaultTypeInput("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingService(emptyService);
    setFaultTypeInput("");
  };

  const handleChange = (field, value) => {
    setEditingService((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const addFaultType = () => {
    const value = faultTypeInput.trim();

    if (!value) return;

    if (
      editingService.faultTypes.some(
        (fault) => fault.toLowerCase() === value.toLowerCase()
      )
    ) {
      return;
    }

    setEditingService((current) => ({
      ...current,
      faultTypes: [...current.faultTypes, value],
    }));

    setFaultTypeInput("");
  };

  const removeFaultType = (faultType) => {
    setEditingService((current) => ({
      ...current,
      faultTypes: current.faultTypes.filter(
        (fault) => fault !== faultType
      ),
    }));
  };

  const saveService = () => {
    if (
      !editingService.name.trim() ||
      !editingService.code.trim() ||
      !editingService.department.trim()
    ) {
      alert("Please complete the service name, code and department.");
      return;
    }

    if (editingService.id) {
      setServices((current) =>
        current.map((service) =>
          service.id === editingService.id
            ? {
                ...editingService,
                name: editingService.name.trim(),
                code: editingService.code.trim().toUpperCase(),
                department: editingService.department.trim(),
              }
            : service
        )
      );
    } else {
      const newService = {
        ...editingService,
        id: Date.now(),
        name: editingService.name.trim(),
        code: editingService.code.trim().toUpperCase(),
        department: editingService.department.trim(),
      };

      setServices((current) => [...current, newService]);
    }

    alert(
      editingService.id
        ? "Service updated successfully."
        : "Service added successfully."
    );

    closeModal();
  };

  const toggleService = (serviceId) => {
    setServices((current) =>
      current.map((service) =>
        service.id === serviceId
          ? {
              ...service,
              status:
                service.status === "ACTIVE"
                  ? "DISABLED"
                  : "ACTIVE",
            }
          : service
      )
    );
  };

  return (
    <div className="admin-services-page">
      <header className="admin-services-header">
        <div className="admin-services-header-left">
          <button
            className="admin-services-back"
            onClick={() => navigate("/admin/dashboard")}
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="admin-services-breadcrumb">
              Admin / Services
            </div>

            <h1>Services</h1>

            <p>
              Manage municipal services available to residents.
            </p>
          </div>
        </div>

        <button
          className="admin-services-add-button"
          onClick={openAddModal}
        >
          <Plus size={18} />
          Add Service
        </button>
      </header>

      <div className="admin-services-municipality">
        <div className="admin-services-municipality-icon">
          <Building2 size={20} />
        </div>

        <div>
          <strong>Raymond Mhlaba Local Municipality</strong>
          <span>RMLM · Eastern Cape</span>
        </div>

        <div className="admin-services-isolation">
          Municipality Scoped
        </div>
      </div>

      <section className="admin-services-stats">
        <div className="admin-services-stat-card">
          <div className="admin-services-stat-icon">
            <Settings size={20} />
          </div>
          <div>
            <span>Total Services</span>
            <strong>{services.length}</strong>
          </div>
        </div>

        <div className="admin-services-stat-card">
          <div className="admin-services-stat-icon active">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <span>Active Services</span>
            <strong>{activeCount}</strong>
          </div>
        </div>

        <div className="admin-services-stat-card">
          <div className="admin-services-stat-icon disabled">
            <XCircle size={20} />
          </div>
          <div>
            <span>Disabled</span>
            <strong>{disabledCount}</strong>
          </div>
        </div>
      </section>

      <section className="admin-services-toolbar">
        <div className="admin-services-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="ALL">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="DISABLED">Disabled</option>
        </select>
      </section>

      <section className="admin-services-grid">
        {filteredServices.map((service) => (
          <article
            className={`admin-service-card ${
              service.status === "DISABLED"
                ? "service-disabled"
                : ""
            }`}
            key={service.id}
          >
            <div className="admin-service-card-top">
              <div
                className={`admin-service-icon ${service.icon}`}
              >
                {getIcon(service.icon)}
              </div>

              <span
                className={`admin-service-status ${
                  service.status === "ACTIVE"
                    ? "active"
                    : "disabled"
                }`}
              >
                {service.status === "ACTIVE" ? (
                  <CheckCircle2 size={14} />
                ) : (
                  <XCircle size={14} />
                )}
                {service.status}
              </span>
            </div>

            <div className="admin-service-card-content">
              <div className="admin-service-title-row">
                <div>
                  <h2>{service.name}</h2>
                  <span>{service.code}</span>
                </div>
              </div>

              <div className="admin-service-detail">
                <span>Department</span>
                <strong>{service.department}</strong>
              </div>

              <div className="admin-service-detail">
                <span>SLA</span>
                <strong>{service.sla}</strong>
              </div>

              <div className="admin-service-detail">
                <span>Assignment</span>
                <strong>{service.assignment}</strong>
              </div>

              <div className="admin-service-faults">
                <span>Fault Types</span>

                <div className="admin-service-tags">
                  {service.faultTypes.slice(0, 3).map((fault) => (
                    <span key={fault}>{fault}</span>
                  ))}

                  {service.faultTypes.length > 3 && (
                    <span>
                      +{service.faultTypes.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="admin-service-card-footer">
              <button
                className="admin-service-configure"
                onClick={() => openEditModal(service)}
              >
                <Settings size={16} />
                Configure
              </button>

              <button
                className={`admin-service-toggle ${
                  service.status === "ACTIVE"
                    ? "disable"
                    : "enable"
                }`}
                onClick={() => toggleService(service.id)}
                title={
                  service.status === "ACTIVE"
                    ? "Disable service"
                    : "Enable service"
                }
              >
                <Power size={16} />
              </button>
            </div>
          </article>
        ))}
      </section>

      {filteredServices.length === 0 && (
        <div className="admin-services-empty">
          <Settings size={34} />
          <h3>No services found</h3>
          <p>
            Try changing your search or status filter.
          </p>
        </div>
      )}

      {modalOpen && (
        <div
          className="admin-services-modal-overlay"
          onMouseDown={closeModal}
        >
          <div
            className="admin-services-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="admin-services-modal-header">
              <div>
                <span>Municipality Service</span>
                <h2>
                  {editingService.id
                    ? "Configure Service"
                    : "Add Service"}
                </h2>
              </div>

              <button
                className="admin-services-modal-close"
                onClick={closeModal}
              >
                <X size={20} />
              </button>
            </div>

            <div className="admin-services-modal-body">
              <div className="admin-services-form-grid">
                <label>
                  Service Name
                  <input
                    value={editingService.name}
                    onChange={(event) =>
                      handleChange("name", event.target.value)
                    }
                    placeholder="e.g. Water"
                  />
                </label>

                <label>
                  Service Code
                  <input
                    value={editingService.code}
                    onChange={(event) =>
                      handleChange("code", event.target.value)
                    }
                    placeholder="e.g. WATER"
                  />
                </label>

                <label>
                  Department
                  <input
                    value={editingService.department}
                    onChange={(event) =>
                      handleChange(
                        "department",
                        event.target.value
                      )
                    }
                    placeholder="e.g. Water Services"
                  />
                </label>

                <label>
                  Service Icon
                  <select
                    value={editingService.icon}
                    onChange={(event) =>
                      handleChange("icon", event.target.value)
                    }
                  >
                    <option value="water">Water</option>
                    <option value="sewerage">Sewerage</option>
                    <option value="electricity">
                      Electricity
                    </option>
                    <option value="refuse">Refuse</option>
                    <option value="fire">Fire</option>
                    <option value="eskom">Eskom</option>
                  </select>
                </label>

                <label>
                  Status
                  <select
                    value={editingService.status}
                    onChange={(event) =>
                      handleChange(
                        "status",
                        event.target.value
                      )
                    }
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="DISABLED">Disabled</option>
                  </select>
                </label>

                <label>
                  SLA
                  <input
                    value={editingService.sla}
                    onChange={(event) =>
                      handleChange("sla", event.target.value)
                    }
                    placeholder="e.g. 8 hours"
                  />
                </label>

                <label>
                  Assignment Mode
                  <select
                    value={editingService.assignment}
                    onChange={(event) =>
                      handleChange(
                        "assignment",
                        event.target.value
                      )
                    }
                  >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                    <option value="External Provider">
                      External Provider
                    </option>
                  </select>
                </label>
              </div>

              <div className="admin-services-form-section">
                <div className="admin-services-section-heading">
                  <div>
                    <h3>Fault Types</h3>
                    <p>
                      Fault categories residents can select when
                      reporting an issue.
                    </p>
                  </div>
                </div>

                <div className="admin-services-fault-input">
                  <input
                    value={faultTypeInput}
                    onChange={(event) =>
                      setFaultTypeInput(event.target.value)
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        addFaultType();
                      }
                    }}
                    placeholder="Enter fault type..."
                  />

                  <button onClick={addFaultType}>
                    <Plus size={17} />
                    Add
                  </button>
                </div>

                <div className="admin-services-edit-tags">
                  {editingService.faultTypes.map((fault) => (
                    <span key={fault}>
                      {fault}
                      <button
                        onClick={() => removeFaultType(fault)}
                      >
                        <X size={13} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="admin-services-form-section">
                <div className="admin-services-section-heading">
                  <div>
                    <h3>Service Behaviour</h3>
                    <p>
                      Configure how tickets for this service are
                      handled.
                    </p>
                  </div>
                </div>

                <label className="admin-services-checkbox">
                  <input
                    type="checkbox"
                    checked={editingService.escalation}
                    onChange={(event) =>
                      handleChange(
                        "escalation",
                        event.target.checked
                      )
                    }
                  />
                  <span>
                    <strong>Enable SLA escalation</strong>
                    <small>
                      Escalate tickets when the SLA is approaching
                      or exceeded.
                    </small>
                  </span>
                </label>

                <label className="admin-services-checkbox">
                  <input
                    type="checkbox"
                    checked={editingService.notifications}
                    onChange={(event) =>
                      handleChange(
                        "notifications",
                        event.target.checked
                      )
                    }
                  />
                  <span>
                    <strong>Resident notifications</strong>
                    <small>
                      Notify residents when ticket status changes.
                    </small>
                  </span>
                </label>
              </div>

              {editingService.code === "ESKOM" && (
                <div className="admin-services-provider-notice">
                  <strong>Eskom external provider</strong>
                  <p>
                    Eskom faults are treated as external-provider
                    tickets. Future backend integration can forward
                    or synchronise these reports with the relevant
                    external system.
                  </p>
                </div>
              )}

              {editingService.code === "FIRE" && (
                <div className="admin-services-provider-notice emergency">
                  <strong>Emergency service</strong>
                  <p>
                    Fire reports may require immediate escalation
                    and emergency-response handling. Emergency
                    calling/112 integration will be implemented in
                    the backend phase.
                  </p>
                </div>
              )}
            </div>

            <div className="admin-services-modal-footer">
              <button
                className="admin-services-cancel"
                onClick={closeModal}
              >
                Cancel
              </button>

              <button
                className="admin-services-save"
                onClick={saveService}
              >
                <Save size={17} />
                Save Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Services;