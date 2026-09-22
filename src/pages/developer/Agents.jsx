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
  UserRound,
  Mail,
  Phone,
  Clock3,
  KeyRound,
  X,
} from "lucide-react";

import "../../styles/agents.css";

const municipality = {
  name: "Raymond Mhlaba Local Municipality",
  code: "RMLM",
};

const initialAgents = [
  {
    id: 1,
    name: "Lerato Ndlovu",
    email: "lerato.ndlovu@rmlm.gov.za",
    phone: "043 123 4601",
    department: "Community Services",
    assignedArea: "Fort Beaufort",
    status: "ACTIVE",
    lastLogin: "Today 08:35",
  },
  {
    id: 2,
    name: "Mandla Peterson",
    email: "mandla.peterson@rmlm.gov.za",
    phone: "043 123 4602",
    department: "Infrastructure",
    assignedArea: "Alice",
    status: "ACTIVE",
    lastLogin: "Today 08:11",
  },
  {
    id: 3,
    name: "Zanele Jacobs",
    email: "zanele.jacobs@rmlm.gov.za",
    phone: "043 123 4603",
    department: "Customer Care",
    assignedArea: "Hogsback",
    status: "ACTIVE",
    lastLogin: "15 Sep 2026 16:42",
  },
  {
    id: 4,
    name: "Siyabonga Williams",
    email: "siyabonga.williams@rmlm.gov.za",
    phone: "043 123 4604",
    department: "Technical Services",
    assignedArea: "Adelaide",
    status: "DISABLED",
    lastLogin: "02 Sep 2026 09:25",
  },
];

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  department: "Community Services",
  assignedArea: "Fort Beaufort",
  status: "ACTIVE",
};

function Agents() {
  const navigate = useNavigate();
  const { municipalityId } = useParams();

  const [agents, setAgents] = useState(initialAgents);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [departmentFilter, setDepartmentFilter] = useState("ALL");

  const [showModal, setShowModal] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const departments = [
    "Community Services",
    "Infrastructure",
    "Customer Care",
    "Technical Services",
    "Electricity",
    "Water",
    "Emergency Services",
  ];

  const areas = [
    "Fort Beaufort",
    "Alice",
    "Hogsback",
    "Adelaide",
    "Bedford",
    "Macleantown",
  ];

  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        agent.name.toLowerCase().includes(searchValue) ||
        agent.email.toLowerCase().includes(searchValue) ||
        agent.phone.toLowerCase().includes(searchValue) ||
        agent.assignedArea.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "ALL" || agent.status === statusFilter;

      const matchesDepartment =
        departmentFilter === "ALL" ||
        agent.department === departmentFilter;

      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [agents, search, statusFilter, departmentFilter]);

  const totalAgents = agents.length;
  const activeAgents = agents.filter(
    (agent) => agent.status === "ACTIVE"
  ).length;
  const disabledAgents = agents.filter(
    (agent) => agent.status === "DISABLED"
  ).length;

  const openAddModal = () => {
    setEditingAgent(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (agent) => {
    setEditingAgent(agent);
    setForm({
      name: agent.name,
      email: agent.email,
      phone: agent.phone,
      department: agent.department,
      assignedArea: agent.assignedArea,
      status: agent.status,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingAgent(null);
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
      window.alert("Please complete the required fields.");
      return;
    }

    if (editingAgent) {
      setAgents((previous) =>
        previous.map((agent) =>
          agent.id === editingAgent.id
            ? {
                ...agent,
                ...form,
              }
            : agent
        )
      );
    } else {
      const newAgent = {
        id: Date.now(),
        ...form,
        lastLogin: "Never",
      };

      setAgents((previous) => [newAgent, ...previous]);
    }

    closeModal();
  };

  const toggleStatus = (agentId) => {
    setAgents((previous) =>
      previous.map((agent) =>
        agent.id === agentId
          ? {
              ...agent,
              status:
                agent.status === "ACTIVE" ? "DISABLED" : "ACTIVE",
            }
          : agent
      )
    );
  };

  const deleteAgent = (agentId) => {
    const agent = agents.find((item) => item.id === agentId);

    if (!agent) return;

    const confirmed = window.confirm(
      `Delete agent "${agent.name}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setAgents((previous) =>
      previous.filter((item) => item.id !== agentId)
    );
  };

  const resetAccess = (agent) => {
    window.alert(
      `A password reset link would be sent to ${agent.email} when the backend is connected.`
    );
  };

  return (
    <div className="agents-page">
      <header className="agents-header">
        <div className="agents-header-left">
          <button
            className="agents-back-button"
            onClick={() =>
              navigate(
                `/developer/municipalities/${municipalityId}`
              )
            }
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="agents-breadcrumb">
              Developer / Municipalities / Agents
            </div>

            <h1>Municipality Agents</h1>

            <p>
              Manage customer service and operational agents for{" "}
              <strong>{municipality.name}</strong>.
            </p>
          </div>
        </div>

        <button className="agents-primary-button" onClick={openAddModal}>
          <Plus size={18} />
          Add Agent
        </button>
      </header>

      <section className="agents-municipality-card">
        <div className="agents-municipality-icon">
          <Building2 size={24} />
        </div>

        <div>
          <span>Municipality</span>
          <strong>{municipality.name}</strong>
        </div>

        <div className="agents-code">
          <span>Code</span>
          <strong>{municipality.code}</strong>
        </div>
      </section>

      <section className="agents-stats">
        <div className="agent-stat-card">
          <div className="agent-stat-icon total">
            <UserRound size={20} />
          </div>

          <div>
            <span>Total Agents</span>
            <strong>{totalAgents}</strong>
          </div>
        </div>

        <div className="agent-stat-card">
          <div className="agent-stat-icon active">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>Active</span>
            <strong>{activeAgents}</strong>
          </div>
        </div>

        <div className="agent-stat-card">
          <div className="agent-stat-icon disabled">
            <XCircle size={20} />
          </div>

          <div>
            <span>Disabled</span>
            <strong>{disabledAgents}</strong>
          </div>
        </div>
      </section>

      <section className="agents-panel">
        <div className="agents-panel-header">
          <div>
            <h2>Agents</h2>
            <p>Users authorised to handle municipality tickets.</p>
          </div>
        </div>

        <div className="agents-filters">
          <div className="agents-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search by name, email, phone or area..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
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
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="DISABLED">Disabled</option>
          </select>
        </div>

        <div className="agents-table-wrapper">
          <table className="agents-table">
            <thead>
              <tr>
                <th>Agent</th>
                <th>Contact</th>
                <th>Department</th>
                <th>Assigned Area</th>
                <th>Last Login</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredAgents.length > 0 ? (
                filteredAgents.map((agent) => (
                  <tr key={agent.id}>
                    <td>
                      <div className="agent-person">
                        <div className="agent-avatar">
                          {agent.name
                            .split(" ")
                            .map((name) => name[0])
                            .join("")
                            .substring(0, 2)}
                        </div>

                        <div>
                          <strong>{agent.name}</strong>
                          <span>Agent</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="agent-contact">
                        <span>
                          <Mail size={14} />
                          {agent.email}
                        </span>

                        <span>
                          <Phone size={14} />
                          {agent.phone}
                        </span>
                      </div>
                    </td>

                    <td>
                      <span className="department-badge">
                        {agent.department}
                      </span>
                    </td>

                    <td>{agent.assignedArea}</td>

                    <td>
                      <span className="last-login">
                        <Clock3 size={14} />
                        {agent.lastLogin}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`agent-status ${
                          agent.status === "ACTIVE"
                            ? "status-active"
                            : "status-disabled"
                        }`}
                      >
                        {agent.status === "ACTIVE" ? (
                          <CheckCircle2 size={14} />
                        ) : (
                          <XCircle size={14} />
                        )}

                        {agent.status}
                      </span>
                    </td>

                    <td>
                      <div className="agent-actions">
                        <button
                          className="icon-action"
                          title="Edit agent"
                          onClick={() => openEditModal(agent)}
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          className="icon-action"
                          title="Reset access"
                          onClick={() => resetAccess(agent)}
                        >
                          <KeyRound size={16} />
                        </button>

                        <button
                          className="icon-action"
                          title={
                            agent.status === "ACTIVE"
                              ? "Disable agent"
                              : "Enable agent"
                          }
                          onClick={() => toggleStatus(agent.id)}
                        >
                          {agent.status === "ACTIVE" ? (
                            <XCircle size={16} />
                          ) : (
                            <CheckCircle2 size={16} />
                          )}
                        </button>

                        <button
                          className="icon-action danger"
                          title="Delete agent"
                          onClick={() => deleteAgent(agent.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="agents-empty">
                    No agents match your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="agents-security-notice">
        <div>
          <KeyRound size={20} />
        </div>

        <div>
          <strong>Municipality access control</strong>

          <p>
            Agents created here belong only to{" "}
            <strong>{municipality.name}</strong>. In the production
            backend, municipality access will be enforced server-side
            so an agent cannot access another municipality's tickets or
            resident information.
          </p>
        </div>
      </section>

      {showModal && (
        <div className="agents-modal-overlay">
          <div className="agents-modal">
            <div className="agents-modal-header">
              <div>
                <h2>{editingAgent ? "Edit Agent" : "Add Agent"}</h2>
                <p>
                  {editingAgent
                    ? "Update the agent's municipality access and details."
                    : "Create a new agent for this municipality."}
                </p>
              </div>

              <button
                className="agents-close-button"
                onClick={closeModal}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="agents-form-grid">
                <div className="form-field">
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

                <div className="form-field">
                  <label>
                    Email Address <span>*</span>
                  </label>

                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="agent@municipality.gov.za"
                  />
                </div>

                <div className="form-field">
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

                <div className="form-field">
                  <label>Department</label>

                  <select
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                  >
                    {departments.map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label>Assigned Service Area</label>

                  <select
                    name="assignedArea"
                    value={form.assignedArea}
                    onChange={handleChange}
                  >
                    {areas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label>Status</label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="DISABLED">Disabled</option>
                  </select>
                </div>
              </div>

              <div className="agents-modal-footer">
                <button
                  type="button"
                  className="agents-secondary-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="agents-primary-button"
                >
                  {editingAgent ? "Save Changes" : "Create Agent"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Agents;