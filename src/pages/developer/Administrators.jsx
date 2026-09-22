import { useState } from "react";
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
  ShieldCheck,
  Mail,
  Phone,
  Clock3,
  KeyRound,
  X,
} from "lucide-react";
import "../../styles/administrators.css";

function Administrators() {
  const navigate = useNavigate();
  const { municipalityId } = useParams();

  const municipality = {
    name: "Raymond Mhlaba Local Municipality",
    code: "RMLM",
  };

  const [administrators, setAdministrators] =
    useState([
      {
        id: 1,
        name: "Nomsa Mbeki",
        email: "nomsa.mbeki@rmlm.gov.za",
        phone: "043 123 4501",
        type: "Municipality Admin",
        department: "Administration",
        lastLogin: "Today, 08:42",
        status: "ACTIVE",
      },
      {
        id: 2,
        name: "Thabo Williams",
        email: "thabo.williams@rmlm.gov.za",
        phone: "043 123 4502",
        type: "Operations Admin",
        department: "Operations",
        lastLogin: "Today, 07:55",
        status: "ACTIVE",
      },
      {
        id: 3,
        name: "Ayanda Peterson",
        email: "ayanda.peterson@rmlm.gov.za",
        phone: "043 123 4503",
        type: "Service Admin",
        department: "Community Services",
        lastLogin: "15 Sep 2026, 16:21",
        status: "ACTIVE",
      },
      {
        id: 4,
        name: "Sibusiso Jacobs",
        email: "sibusiso.jacobs@rmlm.gov.za",
        phone: "043 123 4504",
        type: "Operations Admin",
        department: "Infrastructure",
        lastLogin: "02 Sep 2026, 10:14",
        status: "DISABLED",
      },
    ]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [typeFilter, setTypeFilter] =
    useState("ALL");

  const [showModal, setShowModal] =
    useState(false);

  const [editingAdmin, setEditingAdmin] =
    useState(null);

  const [showResetModal, setShowResetModal] =
    useState(false);

  const [resetAdmin, setResetAdmin] =
    useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "Municipality Admin",
    department: "Administration",
    status: "ACTIVE",
  });

  const filteredAdministrators =
    administrators.filter((admin) => {
      const search =
        searchTerm.toLowerCase();

      const matchesSearch =
        admin.name
          .toLowerCase()
          .includes(search) ||
        admin.email
          .toLowerCase()
          .includes(search) ||
        admin.department
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter === "ALL" ||
        admin.status === statusFilter;

      const matchesType =
        typeFilter === "ALL" ||
        admin.type === typeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType
      );
    });

  const activeAdministrators =
    administrators.filter(
      (admin) => admin.status === "ACTIVE"
    ).length;

  const disabledAdministrators =
    administrators.filter(
      (admin) => admin.status === "DISABLED"
    ).length;

  const openAddModal = () => {
    setEditingAdmin(null);

    setFormData({
      name: "",
      email: "",
      phone: "",
      type: "Municipality Admin",
      department: "Administration",
      status: "ACTIVE",
    });

    setShowModal(true);
  };

  const openEditModal = (admin) => {
    setEditingAdmin(admin);

    setFormData({
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      type: admin.type,
      department: admin.department,
      status: admin.status,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingAdmin(null);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSaveAdministrator = (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim()
    ) {
      return;
    }

    if (editingAdmin) {
      setAdministrators(
        (currentAdministrators) =>
          currentAdministrators.map((admin) =>
            admin.id === editingAdmin.id
              ? {
                  ...admin,
                  name: formData.name.trim(),
                  email:
                    formData.email.trim(),
                  phone:
                    formData.phone.trim(),
                  type: formData.type,
                  department:
                    formData.department,
                  status:
                    formData.status,
                }
              : admin
          )
      );
    } else {
      const newAdministrator = {
        id: Date.now(),
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        type: formData.type,
        department: formData.department,
        lastLogin: "Never",
        status: formData.status,
      };

      setAdministrators(
        (currentAdministrators) => [
          ...currentAdministrators,
          newAdministrator,
        ]
      );
    }

    closeModal();
  };

  const toggleAdministratorStatus = (
    adminId
  ) => {
    setAdministrators(
      (currentAdministrators) =>
        currentAdministrators.map((admin) =>
          admin.id === adminId
            ? {
                ...admin,
                status:
                  admin.status === "ACTIVE"
                    ? "DISABLED"
                    : "ACTIVE",
              }
            : admin
        )
    );
  };

  const deleteAdministrator = (adminId) => {
    const admin = administrators.find(
      (item) => item.id === adminId
    );

    if (!admin) {
      return;
    }

    const confirmed = window.confirm(
      `Delete ${admin.name} as a municipality administrator?`
    );

    if (!confirmed) {
      return;
    }

    setAdministrators(
      (currentAdministrators) =>
        currentAdministrators.filter(
          (item) => item.id !== adminId
        )
    );
  };

  const openResetModal = (admin) => {
    setResetAdmin(admin);
    setShowResetModal(true);
  };

  const closeResetModal = () => {
    setShowResetModal(false);
    setResetAdmin(null);
  };

  const handleResetAccess = () => {
    closeResetModal();

    window.alert(
      "A password reset link would be sent here when the backend is connected."
    );
  };

  return (
    <div className="administrators-page">
      {/* =====================================
          HEADER
      ====================================== */}

      <header className="administrators-header">
        <div className="administrators-header-left">
          <button
            className="administrators-back"
            onClick={() =>
              navigate(
                `/developer/municipalities/${municipalityId}`
              )
            }
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <p className="administrators-eyebrow">
              MUNICIPALITY MANAGEMENT
            </p>

            <h1>Administrators</h1>

            <p>
              Manage administrator accounts for{" "}
              <strong>
                {municipality.name}
              </strong>
              .
            </p>
          </div>
        </div>

        <button
          className="add-administrator-button"
          onClick={openAddModal}
        >
          <Plus size={18} />
          Add Administrator
        </button>
      </header>

      {/* =====================================
          MUNICIPALITY BANNER
      ====================================== */}

      <section className="administrator-municipality-banner">
        <div className="administrator-banner-icon">
          <Building2 size={27} />
        </div>

        <div>
          <span>{municipality.code}</span>

          <h2>{municipality.name}</h2>

          <p>
            Municipality administrators have access
            only to this municipality.
          </p>
        </div>
      </section>

      {/* =====================================
          STATISTICS
      ====================================== */}

      <section className="administrator-statistics">
        <div className="administrator-stat-card">
          <div className="administrator-stat-icon">
            <ShieldCheck size={20} />
          </div>

          <div>
            <span>Total Administrators</span>
            <strong>
              {administrators.length}
            </strong>
          </div>
        </div>

        <div className="administrator-stat-card">
          <div className="administrator-stat-icon">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>Active</span>
            <strong>
              {activeAdministrators}
            </strong>
          </div>
        </div>

        <div className="administrator-stat-card">
          <div className="administrator-stat-icon">
            <XCircle size={20} />
          </div>

          <div>
            <span>Disabled</span>
            <strong>
              {disabledAdministrators}
            </strong>
          </div>
        </div>
      </section>

      {/* =====================================
          FILTERS
      ====================================== */}

      <section className="administrator-toolbar">
        <div className="administrator-search">
          <Search size={17} />

          <input
            type="text"
            placeholder="Search administrators..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(
                event.target.value
              )
            }
          />
        </div>

        <div className="administrator-filter">
          <label>Status</label>

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

            <option value="ACTIVE">
              Active
            </option>

            <option value="DISABLED">
              Disabled
            </option>
          </select>
        </div>

        <div className="administrator-filter">
          <label>Type</label>

          <select
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(
                event.target.value
              )
            }
          >
            <option value="ALL">
              All Types
            </option>

            <option value="Municipality Admin">
              Municipality Admin
            </option>

            <option value="Operations Admin">
              Operations Admin
            </option>

            <option value="Service Admin">
              Service Admin
            </option>
          </select>
        </div>
      </section>

      {/* =====================================
          ADMINISTRATORS TABLE
      ====================================== */}

      <section className="administrators-content">
        <div className="administrators-content-heading">
          <div>
            <p className="administrators-eyebrow">
              ADMINISTRATOR ACCOUNTS
            </p>

            <h2>Municipality Administrators</h2>

            <p>
              Administrators who manage this
              municipality.
            </p>
          </div>

          <span>
            {filteredAdministrators.length} accounts
          </span>
        </div>

        <div className="administrators-table-wrapper">
          <table className="administrators-table">
            <thead>
              <tr>
                <th>Administrator</th>
                <th>Type</th>
                <th>Department</th>
                <th>Last Login</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredAdministrators.map(
                (admin) => (
                  <tr key={admin.id}>
                    <td>
                      <div className="administrator-person">
                        <div className="administrator-avatar">
                          {admin.name
                            .split(" ")
                            .map(
                              (name) =>
                                name[0]
                            )
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <strong>
                            {admin.name}
                          </strong>

                          <span>
                            <Mail size={12} />
                            {admin.email}
                          </span>

                          <small>
                            <Phone size={11} />
                            {admin.phone}
                          </small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="administrator-type">
                        {admin.type}
                      </span>
                    </td>

                    <td>
                      <span className="administrator-department">
                        {admin.department}
                      </span>
                    </td>

                    <td>
                      <div className="administrator-last-login">
                        <Clock3 size={14} />

                        {admin.lastLogin}
                      </div>
                    </td>

                    <td>
                      {admin.status ===
                      "ACTIVE" ? (
                        <span className="administrator-active">
                          <CheckCircle2 size={13} />
                          ACTIVE
                        </span>
                      ) : (
                        <span className="administrator-disabled">
                          <XCircle size={13} />
                          DISABLED
                        </span>
                      )}
                    </td>

                    <td>
                      <div className="administrator-actions">
                        <button
                          title="Edit"
                          onClick={() =>
                            openEditModal(
                              admin
                            )
                          }
                        >
                          <Pencil size={15} />
                        </button>

                        <button
                          title="Reset Access"
                          onClick={() =>
                            openResetModal(
                              admin
                            )
                          }
                        >
                          <KeyRound
                            size={15}
                          />
                        </button>

                        <button
                          title={
                            admin.status ===
                            "ACTIVE"
                              ? "Disable"
                              : "Enable"
                          }
                          onClick={() =>
                            toggleAdministratorStatus(
                              admin.id
                            )
                          }
                        >
                          {admin.status ===
                          "ACTIVE" ? (
                            <XCircle
                              size={15}
                            />
                          ) : (
                            <CheckCircle2
                              size={15}
                            />
                          )}
                        </button>

                        <button
                          className="administrator-delete"
                          title="Delete"
                          onClick={() =>
                            deleteAdministrator(
                              admin.id
                            )
                          }
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          {filteredAdministrators.length ===
            0 && (
            <div className="administrator-empty">
              <ShieldCheck size={34} />

              <h3>
                No administrators found
              </h3>

              <p>
                Try changing your search or
                filters.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =====================================
          SECURITY NOTICE
      ====================================== */}

      <section className="administrator-security-notice">
        <div className="administrator-security-icon">
          <ShieldCheck size={22} />
        </div>

        <div>
          <h3>
            Municipality access is isolated
          </h3>

          <p>
            These administrator accounts belong to{" "}
            <strong>
              {municipality.name}
            </strong>
            . In the production backend, every
            administrator will be linked to a
            municipality and their permissions will
            be enforced by Spring Security.
          </p>
        </div>
      </section>

      {/* =====================================
          ADD / EDIT MODAL
      ====================================== */}

      {showModal && (
        <div
          className="administrator-modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeModal();
            }
          }}
        >
          <div className="administrator-modal">
            <div className="administrator-modal-header">
              <div>
                <p className="administrators-eyebrow">
                  ADMINISTRATOR ACCOUNT
                </p>

                <h2>
                  {editingAdmin
                    ? "Edit Administrator"
                    : "Add Administrator"}
                </h2>

                <p>
                  Manage the administrator's
                  municipality access.
                </p>
              </div>

              <button
                className="close-administrator-modal"
                onClick={closeModal}
              >
                <X size={19} />
              </button>
            </div>

            <form
              className="administrator-form"
              onSubmit={
                handleSaveAdministrator
              }
            >
              <div className="administrator-form-grid">
                <div className="administrator-form-field">
                  <label>Full Name</label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={
                      handleFormChange
                    }
                    placeholder="e.g. John Smith"
                    required
                  />
                </div>

                <div className="administrator-form-field">
                  <label>Email Address</label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={
                      handleFormChange
                    }
                    placeholder="admin@municipality.gov.za"
                    required
                  />
                </div>

                <div className="administrator-form-field">
                  <label>Phone Number</label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={
                      handleFormChange
                    }
                    placeholder="043 123 4567"
                  />
                </div>

                <div className="administrator-form-field">
                  <label>Administrator Type</label>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={
                      handleFormChange
                    }
                  >
                    <option>
                      Municipality Admin
                    </option>

                    <option>
                      Operations Admin
                    </option>

                    <option>
                      Service Admin
                    </option>
                  </select>
                </div>

                <div className="administrator-form-field">
                  <label>Department</label>

                  <select
                    name="department"
                    value={
                      formData.department
                    }
                    onChange={
                      handleFormChange
                    }
                  >
                    <option>
                      Administration
                    </option>

                    <option>
                      Operations
                    </option>

                    <option>
                      Community Services
                    </option>

                    <option>
                      Infrastructure
                    </option>

                    <option>
                      Finance
                    </option>

                    <option>
                      Human Resources
                    </option>
                  </select>
                </div>

                <div className="administrator-form-field">
                  <label>Account Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={
                      handleFormChange
                    }
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

              {!editingAdmin && (
                <div className="administrator-password-notice">
                  <KeyRound size={17} />

                  <p>
                    When the backend is connected,
                    the administrator will receive
                    an invitation to create their
                    password and configure MFA.
                  </p>
                </div>
              )}

              <div className="administrator-form-actions">
                <button
                  type="button"
                  className="cancel-administrator-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-administrator-button"
                >
                  <CheckCircle2 size={16} />

                  {editingAdmin
                    ? "Save Changes"
                    : "Create Administrator"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================
          RESET ACCESS MODAL
      ====================================== */}

      {showResetModal && resetAdmin && (
        <div className="administrator-modal-overlay">
          <div className="reset-access-modal">
            <div className="reset-access-icon">
              <KeyRound size={25} />
            </div>

            <h2>Reset Account Access</h2>

            <p>
              Send an account reset request to:
            </p>

            <strong>
              {resetAdmin.email}
            </strong>

            <div className="reset-access-actions">
              <button
                className="cancel-administrator-button"
                onClick={closeResetModal}
              >
                Cancel
              </button>

              <button
                className="save-administrator-button"
                onClick={
                  handleResetAccess
                }
              >
                Send Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Administrators;