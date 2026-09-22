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
  UserRoundCog,
  Mail,
  Phone,
  Clock3,
  KeyRound,
  X,
  Wrench,
} from "lucide-react";

import "../../styles/technicians.css";

const municipality = {
  name: "Raymond Mhlaba Local Municipality",
  code: "RMLM",
};

const initialTechnicians = [
  {
    id: 1,
    name: "Bongani Maseko",
    email: "bongani.maseko@rmlm.gov.za",
    phone: "043 123 4701",
    department: "Electricity",
    specialisation: "Electrical Technician",
    assignedArea: "Fort Beaufort",
    availability: "AVAILABLE",
    status: "ACTIVE",
    lastLogin: "Today 08:21",
  },
  {
    id: 2,
    name: "Nomvula Dlamini",
    email: "nomvula.dlamini@rmlm.gov.za",
    phone: "043 123 4702",
    department: "Water",
    specialisation: "Water & Plumbing Technician",
    assignedArea: "Alice",
    availability: "ON JOB",
    status: "ACTIVE",
    lastLogin: "Today 07:48",
  },
  {
    id: 3,
    name: "Sanele Peterson",
    email: "sanele.peterson@rmlm.gov.za",
    phone: "043 123 4703",
    department: "Refuse",
    specialisation: "Waste Management Technician",
    assignedArea: "Hogsback",
    availability: "AVAILABLE",
    status: "ACTIVE",
    lastLogin: "15 Sep 2026 16:32",
  },
  {
    id: 4,
    name: "Andile Jacobs",
    email: "andile.jacobs@rmlm.gov.za",
    phone: "043 123 4704",
    department: "Infrastructure",
    specialisation: "General Maintenance",
    assignedArea: "Adelaide",
    availability: "OFFLINE",
    status: "DISABLED",
    lastLogin: "02 Sep 2026 09:12",
  },
];

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  department: "Electricity",
  specialisation: "Electrical Technician",
  assignedArea: "Fort Beaufort",
  availability: "AVAILABLE",
  status: "ACTIVE",
};

function Technicians() {
  const navigate = useNavigate();
  const { municipalityId } = useParams();

  const [technicians, setTechnicians] = useState(initialTechnicians);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [departmentFilter, setDepartmentFilter] = useState("ALL");

  const [showModal, setShowModal] = useState(false);
  const [editingTechnician, setEditingTechnician] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const departments = [
    "Electricity",
    "Water",
    "Sewerage",
    "Refuse",
    "Fire Department",
    "Infrastructure",
    "Technical Services",
  ];

  const specialisations = [
    "Electrical Technician",
    "Water & Plumbing Technician",
    "Sewerage Technician",
    "Waste Management Technician",
    "Fire & Emergency Technician",
    "General Maintenance",
    "Network Technician",
  ];

  const areas = [
    "Fort Beaufort",
    "Alice",
    "Hogsback",
    "Adelaide",
    "Bedford",
    "Macleantown",
  ];

  const filteredTechnicians = useMemo(() => {
    return technicians.filter((technician) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        technician.name.toLowerCase().includes(searchValue) ||
        technician.email.toLowerCase().includes(searchValue) ||
        technician.phone.toLowerCase().includes(searchValue) ||
        technician.specialisation
          .toLowerCase()
          .includes(searchValue) ||
        technician.assignedArea.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "ALL" ||
        technician.status === statusFilter;

      const matchesDepartment =
        departmentFilter === "ALL" ||
        technician.department === departmentFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDepartment
      );
    });
  }, [
    technicians,
    search,
    statusFilter,
    departmentFilter,
  ]);

  const totalTechnicians = technicians.length;

  const activeTechnicians = technicians.filter(
    (technician) => technician.status === "ACTIVE"
  ).length;

  const disabledTechnicians = technicians.filter(
    (technician) => technician.status === "DISABLED"
  ).length;

  const availableTechnicians = technicians.filter(
    (technician) =>
      technician.status === "ACTIVE" &&
      technician.availability === "AVAILABLE"
  ).length;

  const openAddModal = () => {
    setEditingTechnician(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (technician) => {
    setEditingTechnician(technician);

    setForm({
      name: technician.name,
      email: technician.email,
      phone: technician.phone,
      department: technician.department,
      specialisation: technician.specialisation,
      assignedArea: technician.assignedArea,
      availability: technician.availability,
      status: technician.status,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTechnician(null);
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

    if (!form.name || !form.email || !form.phone) {
      window.alert("Please complete all required fields.");
      return;
    }

    if (editingTechnician) {
      setTechnicians((previous) =>
        previous.map((technician) =>
          technician.id === editingTechnician.id
            ? {
                ...technician,
                ...form,
              }
            : technician
        )
      );
    } else {
      const newTechnician = {
        id: Date.now(),
        ...form,
        lastLogin: "Never",
      };

      setTechnicians((previous) => [
        newTechnician,
        ...previous,
      ]);
    }

    closeModal();
  };

  const toggleStatus = (technicianId) => {
    setTechnicians((previous) =>
      previous.map((technician) =>
        technician.id === technicianId
          ? {
              ...technician,
              status:
                technician.status === "ACTIVE"
                  ? "DISABLED"
                  : "ACTIVE",
            }
          : technician
      )
    );
  };

  const deleteTechnician = (technicianId) => {
    const technician = technicians.find(
      (item) => item.id === technicianId
    );

    if (!technician) return;

    const confirmed = window.confirm(
      `Delete technician "${technician.name}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setTechnicians((previous) =>
      previous.filter(
        (item) => item.id !== technicianId
      )
    );
  };

  const resetAccess = (technician) => {
    window.alert(
      `A password reset link would be sent to ${technician.email} when the backend is connected.`
    );
  };

  return (
    <div className="technicians-page">
      <header className="technicians-header">
        <div className="technicians-header-left">
          <button
            className="technicians-back-button"
            onClick={() =>
              navigate(
                `/developer/municipalities/${municipalityId}`
              )
            }
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="technicians-breadcrumb">
              Developer / Municipalities / Technicians
            </div>

            <h1>Municipality Technicians</h1>

            <p>
              Manage technicians responsible for resolving
              municipality service tickets for{" "}
              <strong>{municipality.name}</strong>.
            </p>
          </div>
        </div>

        <button
          className="technicians-primary-button"
          onClick={openAddModal}
        >
          <Plus size={18} />
          Add Technician
        </button>
      </header>

      <section className="technicians-municipality-card">
        <div className="technicians-municipality-icon">
          <Building2 size={24} />
        </div>

        <div>
          <span>Municipality</span>
          <strong>{municipality.name}</strong>
        </div>

        <div className="technicians-code">
          <span>Code</span>
          <strong>{municipality.code}</strong>
        </div>
      </section>

      <section className="technicians-stats">
        <div className="technician-stat-card">
          <div className="technician-stat-icon total">
            <UserRoundCog size={20} />
          </div>

          <div>
            <span>Total Technicians</span>
            <strong>{totalTechnicians}</strong>
          </div>
        </div>

        <div className="technician-stat-card">
          <div className="technician-stat-icon active">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>Active</span>
            <strong>{activeTechnicians}</strong>
          </div>
        </div>

        <div className="technician-stat-card">
          <div className="technician-stat-icon available">
            <Wrench size={20} />
          </div>

          <div>
            <span>Available</span>
            <strong>{availableTechnicians}</strong>
          </div>
        </div>

        <div className="technician-stat-card">
          <div className="technician-stat-icon disabled">
            <XCircle size={20} />
          </div>

          <div>
            <span>Disabled</span>
            <strong>{disabledTechnicians}</strong>
          </div>
        </div>
      </section>

      <section className="technicians-panel">
        <div className="technicians-panel-header">
          <div>
            <h2>Technicians</h2>
            <p>
              Manage technical staff assigned to municipal
              service requests.
            </p>
          </div>
        </div>

        <div className="technicians-filters">
          <div className="technicians-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search by name, email, speciality or area..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <select
            value={departmentFilter}
            onChange={(event) =>
              setDepartmentFilter(event.target.value)
            }
          >
            <option value="ALL">All Departments</option>

            {departments.map((department) => (
              <option
                key={department}
                value={department}
              >
                {department}
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
            <option value="ACTIVE">Active</option>
            <option value="DISABLED">Disabled</option>
          </select>
        </div>

        <div className="technicians-table-wrapper">
          <table className="technicians-table">
            <thead>
              <tr>
                <th>Technician</th>
                <th>Contact</th>
                <th>Department</th>
                <th>Specialisation</th>
                <th>Service Area</th>
                <th>Availability</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTechnicians.length > 0 ? (
                filteredTechnicians.map((technician) => (
                  <tr key={technician.id}>
                    <td>
                      <div className="technician-person">
                        <div className="technician-avatar">
                          {technician.name
                            .split(" ")
                            .map((name) => name[0])
                            .join("")
                            .substring(0, 2)}
                        </div>

                        <div>
                          <strong>
                            {technician.name}
                          </strong>

                          <span>Technician</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="technician-contact">
                        <span>
                          <Mail size={14} />
                          {technician.email}
                        </span>

                        <span>
                          <Phone size={14} />
                          {technician.phone}
                        </span>
                      </div>
                    </td>

                    <td>
                      <span className="technician-department-badge">
                        {technician.department}
                      </span>
                    </td>

                    <td>
                      {technician.specialisation}
                    </td>

                    <td>{technician.assignedArea}</td>

                    <td>
                      <span
                        className={`technician-availability availability-${technician.availability
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {technician.availability ===
                        "AVAILABLE" ? (
                          <CheckCircle2 size={14} />
                        ) : technician.availability ===
                          "ON JOB" ? (
                          <Wrench size={14} />
                        ) : (
                          <XCircle size={14} />
                        )}

                        {technician.availability}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`technician-status ${
                          technician.status === "ACTIVE"
                            ? "status-active"
                            : "status-disabled"
                        }`}
                      >
                        {technician.status ===
                        "ACTIVE" ? (
                          <CheckCircle2 size={14} />
                        ) : (
                          <XCircle size={14} />
                        )}

                        {technician.status}
                      </span>
                    </td>

                    <td>
                      <div className="technician-actions">
                        <button
                          className="technician-icon-action"
                          title="Edit technician"
                          onClick={() =>
                            openEditModal(technician)
                          }
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          className="technician-icon-action"
                          title="Reset access"
                          onClick={() =>
                            resetAccess(technician)
                          }
                        >
                          <KeyRound size={16} />
                        </button>

                        <button
                          className="technician-icon-action"
                          title={
                            technician.status === "ACTIVE"
                              ? "Disable technician"
                              : "Enable technician"
                          }
                          onClick={() =>
                            toggleStatus(technician.id)
                          }
                        >
                          {technician.status ===
                          "ACTIVE" ? (
                            <XCircle size={16} />
                          ) : (
                            <CheckCircle2 size={16} />
                          )}
                        </button>

                        <button
                          className="technician-icon-action danger"
                          title="Delete technician"
                          onClick={() =>
                            deleteTechnician(
                              technician.id
                            )
                          }
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="technicians-empty"
                  >
                    No technicians match your search or
                    filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="technicians-security-notice">
        <div>
          <KeyRound size={20} />
        </div>

        <div>
          <strong>
            Municipality technician access control
          </strong>

          <p>
            Technicians created here belong only to{" "}
            <strong>{municipality.name}</strong>. When the
            backend is connected, municipality isolation will
            be enforced server-side so technicians cannot
            access tickets or resident information belonging
            to another municipality.
          </p>
        </div>
      </section>

      {showModal && (
        <div className="technicians-modal-overlay">
          <div className="technicians-modal">
            <div className="technicians-modal-header">
              <div>
                <h2>
                  {editingTechnician
                    ? "Edit Technician"
                    : "Add Technician"}
                </h2>

                <p>
                  {editingTechnician
                    ? "Update technician details and assignments."
                    : "Create a new technician for this municipality."}
                </p>
              </div>

              <button
                className="technicians-close-button"
                onClick={closeModal}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="technicians-form-grid">
                <div className="technician-form-field">
                  <label>
                    Full Name <span>*</span>
                  </label>

                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                  />
                </div>

                <div className="technician-form-field">
                  <label>
                    Email Address <span>*</span>
                  </label>

                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="technician@municipality.gov.za"
                  />
                </div>

                <div className="technician-form-field">
                  <label>
                    Phone Number <span>*</span>
                  </label>

                  <input
                    name="phone"
                    type="text"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="043 123 4567"
                  />
                </div>

                <div className="technician-form-field">
                  <label>Department</label>

                  <select
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                  >
                    {departments.map((department) => (
                      <option
                        key={department}
                        value={department}
                      >
                        {department}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="technician-form-field">
                  <label>Specialisation</label>

                  <select
                    name="specialisation"
                    value={form.specialisation}
                    onChange={handleChange}
                  >
                    {specialisations.map(
                      (specialisation) => (
                        <option
                          key={specialisation}
                          value={specialisation}
                        >
                          {specialisation}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div className="technician-form-field">
                  <label>Assigned Service Area</label>

                  <select
                    name="assignedArea"
                    value={form.assignedArea}
                    onChange={handleChange}
                  >
                    {areas.map((area) => (
                      <option
                        key={area}
                        value={area}
                      >
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="technician-form-field">
                  <label>Availability</label>

                  <select
                    name="availability"
                    value={form.availability}
                    onChange={handleChange}
                  >
                    <option value="AVAILABLE">
                      Available
                    </option>
                    <option value="ON JOB">
                      On Job
                    </option>
                    <option value="OFFLINE">
                      Offline
                    </option>
                  </select>
                </div>

                <div className="technician-form-field">
                  <label>Status</label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
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

              <div className="technicians-modal-footer">
                <button
                  type="button"
                  className="technicians-secondary-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="technicians-primary-button"
                >
                  {editingTechnician
                    ? "Save Changes"
                    : "Create Technician"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Technicians;