import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Users,
  UserPlus,
  ShieldCheck,
  Wrench,
  UserRound,
  Building2,
  CheckCircle2,
  XCircle,
  Edit3,
  Trash2,
  KeyRound,
  X,
} from "lucide-react";

import "../../styles/user-management.css";

function UserManagement() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Nomsa Mbeki",
      email: "nomsa.mbeki@rmlm.gov.za",
      phone: "043 123 4501",
      role: "ADMIN",
      municipality: "Raymond Mhlaba Local Municipality",
      municipalityCode: "RMLM",
      department: "Administration",
      status: "ACTIVE",
      lastLogin: "Today 08:42",
    },
    {
      id: 2,
      name: "Thabo Williams",
      email: "thabo.williams@rmlm.gov.za",
      phone: "043 123 4502",
      role: "AGENT",
      municipality: "Raymond Mhlaba Local Municipality",
      municipalityCode: "RMLM",
      department: "Operations",
      status: "ACTIVE",
      lastLogin: "Today 07:55",
    },
    {
      id: 3,
      name: "Ayanda Peterson",
      email: "ayanda.peterson@rmlm.gov.za",
      phone: "043 123 4503",
      role: "AGENT",
      municipality: "Raymond Mhlaba Local Municipality",
      municipalityCode: "RMLM",
      department: "Community Services",
      status: "ACTIVE",
      lastLogin: "Yesterday 16:21",
    },
    {
      id: 4,
      name: "Sibusiso Jacobs",
      email: "sibusiso.jacobs@rmlm.gov.za",
      phone: "043 123 4504",
      role: "TECHNICIAN",
      municipality: "Raymond Mhlaba Local Municipality",
      municipalityCode: "RMLM",
      department: "Infrastructure",
      status: "DISABLED",
      lastLogin: "02 Sep 2026 10:14",
    },
    {
      id: 5,
      name: "Demo Resident",
      email: "resident@municonnect.co.za",
      phone: "072 123 4567",
      role: "RESIDENT",
      municipality: "Raymond Mhlaba Local Municipality",
      municipalityCode: "RMLM",
      department: "Resident",
      status: "ACTIVE",
      lastLogin: "Today 09:14",
    },
    {
      id: 6,
      name: "Lerato Ndlovu",
      email: "lerato.ndlovu@makhanda.gov.za",
      phone: "046 123 2201",
      role: "ADMIN",
      municipality: "Makhanda Municipality",
      municipalityCode: "MAK",
      department: "Administration",
      status: "ACTIVE",
      lastLogin: "Today 08:02",
    },
    {
      id: 7,
      name: "Sipho Dlamini",
      email: "sipho.dlamini@makhanda.gov.za",
      phone: "046 123 2202",
      role: "TECHNICIAN",
      municipality: "Makhanda Municipality",
      municipalityCode: "MAK",
      department: "Electricity",
      status: "ACTIVE",
      lastLogin: "Today 07:31",
    },
    {
      id: 8,
      name: "Zanele Mokoena",
      email: "zanele.mokoena@makhanda.gov.za",
      phone: "046 123 2203",
      role: "RESIDENT",
      municipality: "Makhanda Municipality",
      municipalityCode: "MAK",
      department: "Resident",
      status: "ACTIVE",
      lastLogin: "Yesterday 18:10",
    },
    {
      id: 9,
      name: "Fort Beaufort Resident",
      email: "resident.fb@municonnect.co.za",
      phone: "078 222 1001",
      role: "RESIDENT",
      municipality: "Raymond Mhlaba Local Municipality",
      municipalityCode: "RMLM",
      department: "Resident",
      status: "ACTIVE",
      lastLogin: "Yesterday 15:42",
    },
    {
      id: 10,
      name: "System Developer",
      email: "developer@municonnect.co.za",
      phone: "010 000 0000",
      role: "DEVELOPER",
      municipality: "All Municipalities",
      municipalityCode: "SYSTEM",
      department: "Platform",
      status: "ACTIVE",
      lastLogin: "Today 09:30",
    },
  ]);

  const [search, setSearch] = useState("");
  const [municipalityFilter, setMunicipalityFilter] =
    useState("ALL");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "RESIDENT",
    municipality: "Raymond Mhlaba Local Municipality",
    department: "Resident",
    status: "ACTIVE",
  });

  const municipalities = [
    "Raymond Mhlaba Local Municipality",
    "Makhanda Municipality",
    "All Municipalities",
  ];

  const roleLabels = {
    DEVELOPER: "Developer",
    ADMIN: "Administrator",
    AGENT: "Agent",
    TECHNICIAN: "Technician",
    RESIDENT: "Resident",
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchMatch =
        user.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.email
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.phone.includes(search) ||
        user.municipality
          .toLowerCase()
          .includes(search.toLowerCase());

      const municipalityMatch =
        municipalityFilter === "ALL" ||
        user.municipality === municipalityFilter;

      const roleMatch =
        roleFilter === "ALL" ||
        user.role === roleFilter;

      const statusMatch =
        statusFilter === "ALL" ||
        user.status === statusFilter;

      return (
        searchMatch &&
        municipalityMatch &&
        roleMatch &&
        statusMatch
      );
    });
  }, [
    users,
    search,
    municipalityFilter,
    roleFilter,
    statusFilter,
  ]);

  const stats = {
    total: users.length,
    residents: users.filter(
      (user) => user.role === "RESIDENT"
    ).length,
    staff: users.filter(
      (user) =>
        ["ADMIN", "AGENT", "TECHNICIAN"].includes(user.role)
    ).length,
    active: users.filter(
      (user) => user.status === "ACTIVE"
    ).length,
  };

  const openAdd = () => {
    setEditingUser(null);

    setForm({
      name: "",
      email: "",
      phone: "",
      role: "RESIDENT",
      municipality: "Raymond Mhlaba Local Municipality",
      department: "Resident",
      status: "ACTIVE",
    });

    setShowModal(true);
  };

  const openEdit = (user) => {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      municipality: user.municipality,
      department: user.department,
      status: user.status,
    });

    setShowModal(true);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const saveUser = () => {
    if (!form.name || !form.email) {
      alert("Please enter the user's name and email.");
      return;
    }

    if (editingUser) {
      setUsers((previous) =>
        previous.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                ...form,
                municipalityCode:
                  form.municipality ===
                  "Makhanda Municipality"
                    ? "MAK"
                    : form.municipality ===
                      "All Municipalities"
                    ? "SYSTEM"
                    : "RMLM",
              }
            : user
        )
      );
    } else {
      const newUser = {
        id: Date.now(),
        ...form,
        municipalityCode:
          form.municipality === "Makhanda Municipality"
            ? "MAK"
            : form.municipality === "All Municipalities"
            ? "SYSTEM"
            : "RMLM",
        lastLogin: "Never",
      };

      setUsers((previous) => [newUser, ...previous]);
    }

    setShowModal(false);
  };

  const toggleStatus = (id) => {
    setUsers((previous) =>
      previous.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === "ACTIVE"
                  ? "DISABLED"
                  : "ACTIVE",
            }
          : user
      )
    );
  };

  const deleteUser = (id) => {
    const user = users.find(
      (item) => item.id === id
    );

    if (
      window.confirm(
        `Delete ${user?.name || "this user"}?`
      )
    ) {
      setUsers((previous) =>
        previous.filter((item) => item.id !== id)
      );
    }
  };

  const resetAccess = (user) => {
    alert(
      `Mock action: access reset initiated for ${user.name}.`
    );
  };

  const getRoleIcon = (role) => {
    if (role === "DEVELOPER")
      return <ShieldCheck size={15} />;

    if (role === "ADMIN")
      return <Building2 size={15} />;

    if (role === "TECHNICIAN")
      return <Wrench size={15} />;

    return <UserRound size={15} />;
  };

  return (
    <div className="user-management-page">

      <header className="user-management-header">
        <div className="user-management-header-left">
          <button
            className="user-management-back"
            onClick={() =>
              navigate("/developer/dashboard")
            }
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="user-management-breadcrumb">
              Developer / User Management
            </div>

            <h1>All Users</h1>

            <p>
              Manage users across all MuniConnect
              municipalities.
            </p>
          </div>
        </div>

        <button
          className="user-management-add"
          onClick={openAdd}
        >
          <UserPlus size={17} />
          Add User
        </button>
      </header>

      <section className="user-management-stats">

        <div className="user-stat-card">
          <div className="user-stat-icon">
            <Users size={20} />
          </div>

          <div>
            <span>Total Users</span>
            <strong>{stats.total}</strong>
          </div>
        </div>

        <div className="user-stat-card">
          <div className="user-stat-icon resident">
            <UserRound size={20} />
          </div>

          <div>
            <span>Residents</span>
            <strong>{stats.residents}</strong>
          </div>
        </div>

        <div className="user-stat-card">
          <div className="user-stat-icon staff">
            <Wrench size={20} />
          </div>

          <div>
            <span>Municipal Staff</span>
            <strong>{stats.staff}</strong>
          </div>
        </div>

        <div className="user-stat-card">
          <div className="user-stat-icon active">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>Active Accounts</span>
            <strong>{stats.active}</strong>
          </div>
        </div>

      </section>

      <section className="user-management-card">

        <div className="user-management-filters">

          <div className="user-search">
            <Search size={17} />

            <input
              placeholder="Search users, email or municipality..."
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
            value={roleFilter}
            onChange={(event) =>
              setRoleFilter(event.target.value)
            }
          >
            <option value="ALL">All Roles</option>
            <option value="DEVELOPER">Developer</option>
            <option value="ADMIN">Administrator</option>
            <option value="AGENT">Agent</option>
            <option value="TECHNICIAN">
              Technician
            </option>
            <option value="RESIDENT">Resident</option>
          </select>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="DISABLED">
              Disabled
            </option>
          </select>

        </div>

        <div className="user-results-count">
          Showing {filteredUsers.length} of{" "}
          {users.length} users
        </div>

        <div className="user-table-wrapper">

          <table className="user-table">

            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Municipality</th>
                <th>Department</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredUsers.map((user) => (
                <tr key={user.id}>

                  <td>
                    <div className="user-name-cell">

                      <div className="user-avatar">
                        {user.name
                          .split(" ")
                          .map((part) =>
                            part.charAt(0)
                          )
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </div>

                      <div>
                        <strong>{user.name}</strong>

                        <span>
                          {user.email}
                        </span>

                        <small>
                          {user.phone}
                        </small>
                      </div>

                    </div>
                  </td>

                  <td>
                    <span
                      className={`user-role-badge ${user.role.toLowerCase()}`}
                    >
                      {getRoleIcon(user.role)}
                      {roleLabels[user.role]}
                    </span>
                  </td>

                  <td>
                    <div className="municipality-cell">
                      <strong>
                        {user.municipality}
                      </strong>

                      <span>
                        {user.municipalityCode}
                      </span>
                    </div>
                  </td>

                  <td>{user.department}</td>

                  <td>
                    <span
                      className={`user-status-badge ${
                        user.status === "ACTIVE"
                          ? "active"
                          : "disabled"
                      }`}
                    >
                      {user.status === "ACTIVE" ? (
                        <CheckCircle2 size={13} />
                      ) : (
                        <XCircle size={13} />
                      )}

                      {user.status}
                    </span>
                  </td>

                  <td>
                    <span className="last-login">
                      {user.lastLogin}
                    </span>
                  </td>

                  <td>
                    <div className="user-actions">

                      <button
                        title="Edit user"
                        onClick={() =>
                          openEdit(user)
                        }
                      >
                        <Edit3 size={15} />
                      </button>

                      <button
                        title="Reset access"
                        onClick={() =>
                          resetAccess(user)
                        }
                      >
                        <KeyRound size={15} />
                      </button>

                      <button
                        title={
                          user.status === "ACTIVE"
                            ? "Disable user"
                            : "Enable user"
                        }
                        onClick={() =>
                          toggleStatus(user.id)
                        }
                      >
                        {user.status === "ACTIVE" ? (
                          <XCircle size={15} />
                        ) : (
                          <CheckCircle2 size={15} />
                        )}
                      </button>

                      <button
                        className="delete"
                        title="Delete user"
                        onClick={() =>
                          deleteUser(user.id)
                        }
                      >
                        <Trash2 size={15} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="user-empty"
                  >
                    No users match the selected
                    filters.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </section>

      {showModal && (
        <div
          className="user-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="user-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="user-modal-header">

              <div>
                <h2>
                  {editingUser
                    ? "Edit User"
                    : "Add User"}
                </h2>

                <p>
                  Configure the user's MuniConnect
                  account.
                </p>
              </div>

              <button
                onClick={() =>
                  setShowModal(false)
                }
              >
                <X size={19} />
              </button>

            </div>

            <div className="user-form">

              <div className="user-form-field">
                <label>Full Name</label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder="Enter full name"
                />
              </div>

              <div className="user-form-field">
                <label>Email Address</label>

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleFormChange}
                  placeholder="user@example.com"
                />
              </div>

              <div className="user-form-field">
                <label>Phone Number</label>

                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleFormChange}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="user-form-field">
                <label>Role</label>

                <select
                  name="role"
                  value={form.role}
                  onChange={handleFormChange}
                >
                  <option value="RESIDENT">
                    Resident
                  </option>

                  <option value="AGENT">
                    Agent
                  </option>

                  <option value="TECHNICIAN">
                    Technician
                  </option>

                  <option value="ADMIN">
                    Administrator
                  </option>

                  <option value="DEVELOPER">
                    Developer
                  </option>
                </select>
              </div>

              <div className="user-form-field">
                <label>Municipality</label>

                <select
                  name="municipality"
                  value={form.municipality}
                  onChange={handleFormChange}
                >
                  <option>
                    Raymond Mhlaba Local Municipality
                  </option>

                  <option>
                    Makhanda Municipality
                  </option>

                  <option>
                    All Municipalities
                  </option>
                </select>
              </div>

              <div className="user-form-field">
                <label>Department</label>

                <input
                  name="department"
                  value={form.department}
                  onChange={handleFormChange}
                  placeholder="Department"
                />
              </div>

              <div className="user-form-field">
                <label>Status</label>

                <select
                  name="status"
                  value={form.status}
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

            <div className="user-modal-footer">

              <button
                className="user-modal-cancel"
                onClick={() =>
                  setShowModal(false)
                }
              >
                Cancel
              </button>

              <button
                className="user-modal-save"
                onClick={saveUser}
              >
                <CheckCircle2 size={16} />
                {editingUser
                  ? "Save User"
                  : "Create User"}
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default UserManagement;