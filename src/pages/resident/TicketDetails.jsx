import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  CalendarDays,
  FileText,
  Camera,
  MessageSquare,
  Wrench,
  CheckCircle2,
  Clock3,
  Circle,
} from "lucide-react";

import "../../styles/ticket-details.css";

const ticketData = {
  "MC-WATE-123456": {
    id: "MC-WATE-123456",
    service: "Water",
    title: "Water Leak",
    description: "Water leaking near residential property.",
    location: "15 Main Street, Fort Beaufort",
    submitted: "15 September 2026, 09:42",
    status: "NEW",
    department: "Water Services",
    agentNotes: "Report received and waiting for verification.",
    technicianUpdate: "A technician has not yet been assigned.",
    timeline: [
      {
        title: "Report Submitted",
        description: "Your fault report was successfully submitted.",
        date: "15 Sep 2026, 09:42",
        completed: true,
      },
      {
        title: "Report Verified",
        description: "The report is waiting for municipal verification.",
        date: "Pending",
        completed: false,
      },
      {
        title: "Assigned to Technician",
        description: "A technician will be assigned after verification.",
        date: "Pending",
        completed: false,
      },
      {
        title: "Technician In Progress",
        description: "Technician work has not started.",
        date: "Pending",
        completed: false,
      },
      {
        title: "Resolved",
        description: "The fault will be marked resolved after completion.",
        date: "Pending",
        completed: false,
      },
    ],
  },

  "MC-ESKO-583921": {
    id: "MC-ESKO-583921",
    service: "Eskom",
    title: "Power Outage",
    description: "No electricity in the surrounding area.",
    location: "12 Station Road, Fort Beaufort",
    submitted: "14 September 2026, 14:15",
    status: "IN PROGRESS",
    department: "Eskom",
    agentNotes: "Fault verified and escalated for technical investigation.",
    technicianUpdate:
      "Technician has been assigned and is investigating the outage.",
    timeline: [
      {
        title: "Report Submitted",
        description: "Your fault report was successfully submitted.",
        date: "14 Sep 2026, 14:15",
        completed: true,
      },
      {
        title: "Report Verified",
        description: "The reported outage was verified.",
        date: "14 Sep 2026, 15:02",
        completed: true,
      },
      {
        title: "Assigned to Technician",
        description: "A technical team has been assigned.",
        date: "14 Sep 2026, 16:20",
        completed: true,
      },
      {
        title: "Technician In Progress",
        description: "The technical team is investigating the fault.",
        date: "15 Sep 2026, 08:30",
        completed: true,
      },
      {
        title: "Resolved",
        description: "The outage has not yet been resolved.",
        date: "Pending",
        completed: false,
      },
    ],
  },

  "MC-ELEC-472811": {
    id: "MC-ELEC-472811",
    service: "Electricity",
    title: "Streetlight Fault",
    description: "Streetlight not working.",
    location: "Market Street, Fort Beaufort",
    submitted: "10 September 2026, 18:30",
    status: "RESOLVED",
    department: "Municipal Electricity",
    agentNotes: "Streetlight fault verified and repaired.",
    technicianUpdate:
      "Technician replaced the damaged streetlight component.",
    timeline: [
      {
        title: "Report Submitted",
        description: "Your fault report was successfully submitted.",
        date: "10 Sep 2026, 18:30",
        completed: true,
      },
      {
        title: "Report Verified",
        description: "The fault was verified by the municipal agent.",
        date: "11 Sep 2026, 08:10",
        completed: true,
      },
      {
        title: "Assigned to Technician",
        description: "A technician was assigned to the repair.",
        date: "11 Sep 2026, 09:00",
        completed: true,
      },
      {
        title: "Technician In Progress",
        description: "The technician completed the repair.",
        date: "11 Sep 2026, 11:25",
        completed: true,
      },
      {
        title: "Resolved",
        description: "The reported fault has been resolved.",
        date: "11 Sep 2026, 12:10",
        completed: true,
      },
    ],
  },
};

function TicketDetails() {
  const navigate = useNavigate();
  const { ticketId } = useParams();

  const ticket = ticketData[ticketId];

  if (!ticket) {
    return (
      <div className="ticket-details-page">
        <div className="ticket-details-empty">
          <FileText size={48} />
          <h2>Ticket Not Found</h2>
          <p>
            We could not find a ticket with the reference number{" "}
            <strong>{ticketId}</strong>.
          </p>

          <button onClick={() => navigate("/tickets")}>
            Back to My Tickets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ticket-details-page">
      <header className="ticket-details-header">
        <button
          className="ticket-back-button"
          onClick={() => navigate("/tickets")}
        >
          <ArrowLeft size={20} />
          Back to My Tickets
        </button>

        <div className="ticket-header-content">
          <div>
            <span className="ticket-reference">{ticket.id}</span>

            <h1>{ticket.title}</h1>

            <p>
              {ticket.service} · {ticket.department}
            </p>
          </div>

          <span
            className={`ticket-status-badge ${ticket.status
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            {ticket.status}
          </span>
        </div>
      </header>

      <main className="ticket-details-content">
        <section className="ticket-info-grid">
          <div className="ticket-info-card">
            <div className="ticket-info-icon">
              <MapPin size={21} />
            </div>

            <div>
              <span>Location</span>
              <strong>{ticket.location}</strong>
            </div>
          </div>

          <div className="ticket-info-card">
            <div className="ticket-info-icon">
              <CalendarDays size={21} />
            </div>

            <div>
              <span>Submitted</span>
              <strong>{ticket.submitted}</strong>
            </div>
          </div>

          <div className="ticket-info-card">
            <div className="ticket-info-icon">
              <Wrench size={21} />
            </div>

            <div>
              <span>Department</span>
              <strong>{ticket.department}</strong>
            </div>
          </div>
        </section>

        <section className="ticket-main-grid">
          <div className="ticket-card ticket-timeline-card">
            <div className="ticket-section-heading">
              <div>
                <span className="section-label">PROGRESS</span>
                <h2>Ticket Timeline</h2>
              </div>

              <Clock3 size={23} />
            </div>

            <div className="ticket-timeline">
              {ticket.timeline.map((item, index) => (
                <div
                  className={`timeline-item ${
                    item.completed ? "completed" : "pending"
                  }`}
                  key={item.title}
                >
                  <div className="timeline-marker">
                    {item.completed ? (
                      <CheckCircle2 size={22} />
                    ) : (
                      <Circle size={22} />
                    )}
                  </div>

                  <div className="timeline-content">
                    <div className="timeline-title-row">
                      <h3>{item.title}</h3>
                      <span>{item.date}</span>
                    </div>

                    <p>{item.description}</p>
                  </div>

                  {index < ticket.timeline.length - 1 && (
                    <div className="timeline-line" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="ticket-side-column">
            <section className="ticket-card">
              <div className="ticket-section-heading">
                <div>
                  <span className="section-label">REPORT</span>
                  <h2>Description</h2>
                </div>

                <FileText size={21} />
              </div>

              <p className="ticket-description">
                {ticket.description}
              </p>
            </section>

            <section className="ticket-card">
              <div className="ticket-section-heading">
                <div>
                  <span className="section-label">ATTACHMENTS</span>
                  <h2>Photos</h2>
                </div>

                <Camera size={21} />
              </div>

              <div className="ticket-photo-placeholder">
                <Camera size={32} />
                <p>No photos attached to this report.</p>
              </div>
            </section>
          </div>
        </section>

        <section className="ticket-updates-grid">
          <div className="ticket-card update-card">
            <div className="update-icon">
              <MessageSquare size={21} />
            </div>

            <div>
              <span className="section-label">AGENT NOTES</span>
              <h2>Municipal Agent</h2>
              <p>{ticket.agentNotes}</p>
            </div>
          </div>

          <div className="ticket-card update-card">
            <div className="update-icon">
              <Wrench size={21} />
            </div>

            <div>
              <span className="section-label">TECHNICIAN UPDATE</span>
              <h2>Technical Team</h2>
              <p>{ticket.technicianUpdate}</p>
            </div>
          </div>
        </section>

        <div className="ticket-actions">
          <button onClick={() => navigate("/tickets")}>
            <ArrowLeft size={18} />
            My Tickets
          </button>

          <button
            className="primary-ticket-action"
            onClick={() => navigate("/dashboard")}
          >
            Report Another Fault
          </button>
        </div>
      </main>
    </div>
  );
}

export default TicketDetails;