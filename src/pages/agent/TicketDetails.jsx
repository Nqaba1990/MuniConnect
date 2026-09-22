import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  CalendarDays,
  UserRound,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  UserPlus,
  MessageSquare,
  AlertTriangle,
  Camera,
  Wrench,
} from "lucide-react";

import "../../styles/agent-ticket-details.css";

const ticketData = {
  "MC-WATE-123456": {
    id: "MC-WATE-123456",
    resident: "Demo Resident",
    service: "Water",
    title: "Water Leak",
    description: "Water leaking near residential property.",
    location: "15 Main Street, Fort Beaufort",
    submitted: "15 September 2026, 09:42",
    status: "NEW",
    priority: "HIGH",
    department: "Water Services",
    technician: "",
    agentNotes: "Report received and waiting for verification.",
  },

  "MC-ESKO-583921": {
    id: "MC-ESKO-583921",
    resident: "Thabo Mokoena",
    service: "Eskom",
    title: "Power Outage",
    description: "No electricity in the surrounding area.",
    location: "12 Station Road, Fort Beaufort",
    submitted: "14 September 2026, 14:15",
    status: "IN PROGRESS",
    priority: "URGENT",
    department: "Eskom",
    technician: "Sipho Nkosi",
    agentNotes:
      "Fault verified and escalated for technical investigation.",
  },

  "MC-ELEC-472811": {
    id: "MC-ELEC-472811",
    resident: "Nomsa Dlamini",
    service: "Electricity",
    title: "Streetlight Fault",
    description: "Streetlight not working.",
    location: "Market Street, Fort Beaufort",
    submitted: "10 September 2026, 18:30",
    status: "RESOLVED",
    priority: "MEDIUM",
    department: "Municipal Electricity",
    technician: "Mandla Peterson",
    agentNotes: "Streetlight fault verified and repaired.",
  },

  "MC-SEWE-334521": {
    id: "MC-SEWE-334521",
    resident: "Sibusiso Ndlovu",
    service: "Sewerage",
    title: "Blocked Drain",
    description: "Drain is blocked and wastewater is backing up.",
    location: "Church Street, Fort Beaufort",
    submitted: "15 September 2026, 10:05",
    status: "NEW",
    priority: "HIGH",
    department: "Sewerage Services",
    technician: "",
    agentNotes: "New report awaiting verification.",
  },

  "MC-REFU-781234": {
    id: "MC-REFU-781234",
    resident: "Lerato Jacobs",
    service: "Refuse",
    title: "Missed Collection",
    description: "Household refuse was not collected.",
    location: "Victoria Road, Fort Beaufort",
    submitted: "15 September 2026, 08:20",
    status: "ASSIGNED",
    priority: "MEDIUM",
    department: "Refuse Services",
    technician: "David Mbeki",
    agentNotes: "Collection issue verified and assigned.",
  },

  "MC-FIRE-219876": {
    id: "MC-FIRE-219876",
    resident: "Peter Williams",
    service: "Fire Department",
    title: "Fire Hydrant Problem",
    description: "Fire hydrant appears damaged.",
    location: "High Street, Fort Beaufort",
    submitted: "13 September 2026, 12:45",
    status: "IN PROGRESS",
    priority: "HIGH",
    department: "Fire Department",
    technician: "Andile Jacobs",
    agentNotes: "Hydrant inspection requested.",
  },
};

const technicians = [
  "Sipho Nkosi",
  "Mandla Peterson",
  "David Mbeki",
  "Andile Jacobs",
  "Thando Williams",
];

function AgentTicketDetails() {
  const navigate = useNavigate();
  const { ticketId } = useParams();

  const originalTicket = ticketData[ticketId];

  const [ticket, setTicket] = useState(originalTicket);
  const [priority, setPriority] = useState(
    originalTicket?.priority || "MEDIUM"
  );
  const [technician, setTechnician] = useState(
    originalTicket?.technician || ""
  );
  const [notes, setNotes] = useState(
    originalTicket?.agentNotes || ""
  );
  const [message, setMessage] = useState("");

  if (!originalTicket) {
    return (
      <div className="agent-ticket-empty">
        <AlertTriangle size={45} />

        <h2>Ticket Not Found</h2>

        <p>
          No ticket could be found for reference{" "}
          <strong>{ticketId}</strong>.
        </p>

        <button onClick={() => navigate("/agent/dashboard")}>
          Back to Agent Dashboard
        </button>
      </div>
    );
  }

  const updateTicket = (changes, successMessage) => {
    setTicket((current) => ({
      ...current,
      ...changes,
    }));

    if (successMessage) {
      setMessage(successMessage);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  const verifyTicket = () => {
    updateTicket(
      {
        status: "VERIFIED",
      },
      "Ticket has been verified successfully."
    );
  };

  const assignTechnician = () => {
    if (!technician) {
      setMessage("Please select a technician first.");
      return;
    }

    updateTicket(
      {
        technician,
        status: "ASSIGNED",
      },
      `Ticket assigned to ${technician}.`
    );
  };

  const startWork = () => {
    if (!ticket.technician) {
      setMessage("Assign a technician before starting work.");
      return;
    }

    updateTicket(
      {
        status: "IN PROGRESS",
      },
      "Ticket marked as In Progress."
    );
  };

  const resolveTicket = () => {
    updateTicket(
      {
        status: "RESOLVED",
      },
      "Ticket has been marked as resolved."
    );
  };

  const saveNotes = () => {
    updateTicket(
      {
        agentNotes: notes,
      },
      "Agent notes saved."
    );
  };

  return (
    <div className="agent-ticket-page">
      <header className="agent-ticket-header">
        <button
          className="agent-ticket-back"
          onClick={() => navigate("/agent/dashboard")}
        >
          <ArrowLeft size={19} />
          Agent Dashboard
        </button>

        <div className="agent-ticket-title">
          <div>
            <span className="agent-ticket-reference">
              {ticket.id}
            </span>

            <h1>{ticket.title}</h1>

            <p>
              {ticket.service} · {ticket.department}
            </p>
          </div>

          <span
            className={`agent-ticket-status ${ticket.status
              .toLowerCase()
              .replaceAll(" ", "-")}`}
          >
            {ticket.status}
          </span>
        </div>
      </header>

      <main className="agent-ticket-content">
        {message && (
          <div className="agent-action-message">
            <CheckCircle2 size={19} />
            {message}
          </div>
        )}

        <section className="agent-ticket-grid">
          <div className="agent-ticket-left">
            <section className="agent-detail-card">
              <div className="agent-card-heading">
                <div>
                  <span>RESIDENT REPORT</span>
                  <h2>Fault Information</h2>
                </div>

                <ShieldCheck size={22} />
              </div>

              <div className="agent-information-grid">
                <div>
                  <span>Resident</span>
                  <strong>
                    <UserRound size={15} />
                    {ticket.resident}
                  </strong>
                </div>

                <div>
                  <span>Service</span>
                  <strong>{ticket.service}</strong>
                </div>

                <div>
                  <span>Submitted</span>
                  <strong>
                    <CalendarDays size={15} />
                    {ticket.submitted}
                  </strong>
                </div>

                <div>
                  <span>Location</span>
                  <strong>
                    <MapPin size={15} />
                    {ticket.location}
                  </strong>
                </div>
              </div>

              <div className="agent-description">
                <span>Description</span>
                <p>{ticket.description}</p>
              </div>
            </section>

            <section className="agent-detail-card">
              <div className="agent-card-heading">
                <div>
                  <span>ATTACHMENTS</span>
                  <h2>Photos</h2>
                </div>

                <Camera size={22} />
              </div>

              <div className="agent-photo-placeholder">
                <Camera size={35} />
                <strong>No photos attached</strong>
                <p>
                  Resident photos will appear here when uploaded.
                </p>
              </div>
            </section>

            <section className="agent-detail-card">
              <div className="agent-card-heading">
                <div>
                  <span>INTERNAL COMMUNICATION</span>
                  <h2>Agent Notes</h2>
                </div>

                <MessageSquare size={22} />
              </div>

              <textarea
                className="agent-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter internal notes about this ticket..."
              />

              <button
                className="save-notes-button"
                onClick={saveNotes}
              >
                Save Notes
              </button>
            </section>
          </div>

          <aside className="agent-ticket-right">
            <section className="agent-detail-card workflow-card">
              <div className="agent-card-heading">
                <div>
                  <span>WORKFLOW</span>
                  <h2>Process Ticket</h2>
                </div>

                <Clock3 size={22} />
              </div>

              <div className="workflow-step">
                <div className="workflow-step-icon">
                  <ShieldCheck size={18} />
                </div>

                <div>
                  <strong>Verify Report</strong>
                  <p>
                    Confirm that the report contains enough
                    information to proceed.
                  </p>
                </div>
              </div>

              <button
                className="workflow-button"
                onClick={verifyTicket}
                disabled={
                  ticket.status !== "NEW"
                }
              >
                <CheckCircle2 size={17} />
                Verify Ticket
              </button>

              <div className="workflow-divider" />

              <div className="workflow-step">
                <div className="workflow-step-icon">
                  <UserPlus size={18} />
                </div>

                <div>
                  <strong>Assign Technician</strong>
                  <p>
                    Select the technician responsible for this
                    job.
                  </p>
                </div>
              </div>

              <select
                className="technician-select"
                value={technician}
                onChange={(e) => setTechnician(e.target.value)}
              >
                <option value="">Select Technician</option>

                {technicians.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>

              <button
                className="workflow-button"
                onClick={assignTechnician}
              >
                <UserPlus size={17} />
                Assign Technician
              </button>

              <div className="workflow-divider" />

              <div className="workflow-step">
                <div className="workflow-step-icon">
                  <Wrench size={18} />
                </div>

                <div>
                  <strong>Technical Work</strong>
                  <p>
                    Allow the assigned technician to start the
                    repair.
                  </p>
                </div>
              </div>

              <button
                className="workflow-button"
                onClick={startWork}
                disabled={
                  ticket.status !== "ASSIGNED"
                }
              >
                <Wrench size={17} />
                Start Work
              </button>

              <button
                className="resolve-button"
                onClick={resolveTicket}
                disabled={
                  ticket.status !== "IN PROGRESS"
                }
              >
                <CheckCircle2 size={17} />
                Mark Resolved
              </button>
            </section>

            <section className="agent-detail-card">
              <div className="agent-card-heading">
                <div>
                  <span>TICKET SETTINGS</span>
                  <h2>Priority</h2>
                </div>

                <AlertTriangle size={22} />
              </div>

              <select
                className="priority-select"
                value={priority}
                onChange={(e) => {
                  setPriority(e.target.value);

                  updateTicket(
                    { priority: e.target.value },
                    `Priority changed to ${e.target.value}.`
                  );
                }}
              >
                <option value="URGENT">Urgent</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>

              <div className="current-technician">
                <UserRound size={18} />

                <div>
                  <span>Assigned Technician</span>

                  <strong>
                    {ticket.technician || "Not assigned"}
                  </strong>
                </div>
              </div>
            </section>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default AgentTicketDetails;