import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Users,
  UserRound,
  Wrench,
  ShieldCheck,
  UserPlus,
  Edit3,
  KeyRound,
  CheckCircle2,
  XCircle,
  Trash2,
  X,
  Building2,
} from "lucide-react";

import "../../styles/admin-users.css";

function AdminUsers() {
  const navigate = useNavigate();

  const municipality = {
    name: "Raymond Mhlaba Local Municipality",
    code: "RMLM",
  };

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Nomsa Mbeki",
      email: "nomsa.mbeki@rmlm.gov.za",
      phone: "043 123 4501",
      role: "ADMIN",
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
      department: "Resident",
      status: "ACTIVE",
      lastLogin: "Today 09:14",
    },
    {
      id: 6,
      name: "Fort Beaufort Resident",
      email: "resident.fb@municonnect.co.za",
      phone: "078 222 1001",
      role: "RESIDENT",
      department: "Resident",
      status: "ACTIVE",
      lastLogin: "Yesterday 15:42",
    },
    {
      id: 7,
      name: "Lwazi Nqoma",
      email: "lwazi.nqoma@rmlm.gov.za",
      phone: "043 123 4510",
      role: "TECHNICIAN",
      department: "Water",
      status: "ACTIVE",
      lastLogin: "Today 07:31",
    },
    {
      id: 8,
      name: "Noluthando Radebe",
      email: "noluthando.radebe@rmlm.gov.za",
      phone: "043 123 4511",
      role: "TECHNICIAN",
      department: "Electricity",
      status: "ACTIVE",
      lastLogin: "Yesterday 18:02",
    },
  ]);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] =
    useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "RESIDENT",
    department: "Resident",
    status: "ACTIVE",
  });

  const roleLabels = {
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
        user.department
          .toLowerCase()
          .includes(search.toLowerCase());

      const roleMatch =
        roleFilter === "ALL" ||
        user.role === roleFilter;

      const statusMatch =
        statusFilter === "ALL" ||
        user.status === statusFilter;

      return (
        searchMatch &&
        roleMatch &&
        statusMatch
      );
    });
  }, [
    users,
    search,
    roleFilter,
    statusFilter,
  ]);

  const stats = {
    total: users.length,
    residents: users.filter(
      (user) => user.role === "RESIDENT"
    ).length,
    staff: users.filter((user) =>
      ["ADMIN", "AGENT", "TECHNICIAN"].includes(
        user.role
      )
    ).length,
    active: users.filter(
      (user) => user.status === "ACTIVE"
    ).length,
  };

  const getRoleIcon = (role) => {
    if (role === "ADMIN") {
      return <ShieldCheck size={15} />;
    }

    if (role === "TECHNICIAN") {
      return <Wrench size={15} />;
    }

    if (role === "AGENT") {
      return <Users size={15} />;
    }

    return <UserRound size={15} />;
  };

  const openAdd = () => {
    setEditingUser(null);

    setForm({
      name: "",
      email: "",
      phone: "",
      role: "RESIDENT",
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
      department: user.department,
      status: user.status,
    });

    setShowModal(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const saveUser = () => {
    if (!form.name || !form.email) {
      alert(
        "Please enter the user's name and email."
      );
      return;
    }

    if (editingUser) {
      setUsers((previous) =>
        previous.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                ...form,
              }
            : user
        )
      );
    } else {
      setUsers((previous) => [
        {
          id: Date.now(),
          ...form,
          lastLogin: "Never",
        },
        ...previous,
      ]);
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

  const resetAccess = (user) => {
    alert(
      `Mock action: access reset initiated for ${user.name}.`
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
        previous.filter(
          (item) => item.id !== id
        )
      );
    }
  };

  return (
    <div className="admin-users-page">

      <header className="admin-users-header">

        <div className="admin-users-header-left">

          <button
            className="admin-users-back"
            onClick={() =>
              navigate("/admin/dashboard")
            }
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="admin-users-breadcrumb">
              Municipality Admin / Users
            </div>

            <h1>User Management</h1>

            <p>
              Manage users for{" "}
              {municipality.name}.
            </p>
          </div>

        </div>

        <button
          className="admin-users-add"
          onClick={openAdd}
        >
          <UserPlus size={17} />
          Add User
        </button>

      </header>

      <section className="admin-users-municipality">

        <div className="admin-users-municipality-icon">
          <Building2 size={21} />
        </div>

        <div>
          <span>Municipality</span>

          <strong>
            {municipality.name}
          </strong>

          <small>
            {municipality.code}
          </small>
        </div>

        <div className="admin-users-isolation">
          <CheckCircle2 size={15} />
          Municipality users only
        </div>

      </section>

      <section className="admin-users-stats">

        <div className="admin-user-stat">
          <div className="admin-user-stat-icon">
            <Users size={20} />
          </div>

          <div>
            <span>Total Users</span>
            <strong>{stats.total}</strong>
          </div>
        </div>

        <div className="admin-user-stat">
          <div className="admin-user-stat-icon residents">
            <UserRound size={20} />
          </div>

          <div>
            <span>Residents</span>
            <strong>{stats.residents}</strong>
          </div>
        </div>

        <div className="admin-user-stat">
          <div className="admin-user-stat-icon staff">
            <Wrench size={20} />
          </div>

          <div>
            <span>Municipal Staff</span>
            <strong>{stats.staff}</strong>
          </div>
        </div>

        <div className="admin-user-stat">
          <div className="admin-user-stat-icon active">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>Active Accounts</span>
            <strong>{stats.active}</strong>
          </div>
        </div>

      </section>

      <section className="admin-users-card">

        <div className="admin-users-filters">

          <div className="admin-users-search">

            <Search size={17} />

            <input
              placeholder="Search name, email, phone..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

          </div>

          <select
            value={roleFilter}
            onChange={(event) =>
              setRoleFilter(event.target.value)
            }
          >
            <option value="ALL">
              All Roles
            </option>

            <option value="ADMIN">
              Administrators
            </option>

            <option value="AGENT">
              Agents
            </option>

            <option value="TECHNICIAN">
              Technicians
            </option>

            <option value="RESIDENT">
              Residents
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

            <option value="ACTIVE">
              Active
            </option>

            <option value="DISABLED">
              Disabled
            </option>
          </select>

        </div>

        <div className="admin-users-results">
          Showing {filteredUsers.length} of{" "}
          {users.length} municipality users
        </div>

        <div className="admin-users-table-wrapper">

          <table className="admin-users-table">

            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
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
                    <div className="admin-user-name">

                      <div className="admin-user-avatar">
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
                        <strong>
                          {user.name}
                        </strong>

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
                      className={`admin-role-badge ${user.role.toLowerCase()}`}
                    >
                      {getRoleIcon(user.role)}
                      {roleLabels[user.role]}
                    </span>
                  </td>

                  <td>
                    <span className="admin-department">
                      {user.department}
                    </span>
                  </td>

                  <td>

                    <span
                      className={`admin-user-status ${
                        user.status === "ACTIVE"
                          ? "active"
                          : "disabled"
                      }`}
                    >

                      {user.status ===
                      "ACTIVE" ? (
                        <CheckCircle2 size={13} />
                      ) : (
                        <XCircle size={13} />
                      )}

                      {user.status}

                    </span>

                  </td>

                  <td>
                    <span className="admin-last-login">
                      {user.lastLogin}
                    </span>
                  </td>

                  <td>

                    <div className="admin-user-actions">

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
                            ? "Disable"
                            : "Enable"
                        }
                        onClick={() =>
                          toggleStatus(user.id)
                        }
                      >
                        {user.status ===
                        "ACTIVE" ? (
                          <XCircle size={15} />
                        ) : (
                          <CheckCircle2 size={15} />
                        )}
                      </button>

                      <button
                        className="delete"
                        title="Delete"
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
                    colSpan="6"
                    className="admin-users-empty"
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
          className="admin-user-modal-overlay"
          onClick={() =>
            setShowModal(false)
          }
        >

          <div
            className="admin-user-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="admin-user-modal-header">

              <div>
                <h2>
                  {editingUser
                    ? "Edit User"
                    : "Add User"}
                </h2>

                <p>
                  This account will belong to{" "}
                  {municipality.name}.
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

            <div className="admin-user-form">

              <div className="admin-user-field">
                <label>Full Name</label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
              </div>

              <div className="admin-user-field">
                <label>Email Address</label>

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="user@example.com"
                />
              </div>

              <div className="admin-user-field">
                <label>Phone Number</label>

                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                />
              </div>

              <div className="admin-user-field">
                <label>Role</label>

                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
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
                </select>
              </div>

              <div className="admin-user-field">
                <label>Department</label>

                <input
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  placeholder="Department"
                />
              </div>

              <div className="admin-user-field">
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

            <div className="admin-user-modal-footer">

              <button
                className="admin-user-cancel"
                onClick={() =>
                  setShowModal(false)
                }
              >
                Cancel
              </button>

              <button
                className="admin-user-save"
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

export default AdminUsers;