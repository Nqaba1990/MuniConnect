import {
  ArrowLeft,
  Ticket as TicketIcon,
  Clock3,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import "../../styles/tickets.css";

function Tickets() {
  const navigate = useNavigate();

  const tickets = [
    {
      id: "MC-WATE-123456",
      service: "Water",
      title: "Water Leak",
      description: "Water leaking near residential property.",
      date: "15 September 2026",
      status: "NEW",
    },
    {
      id: "MC-ESKO-583921",
      service: "Eskom",
      title: "Power Outage",
      description: "No electricity in the surrounding area.",
      date: "14 September 2026",
      status: "IN PROGRESS",
    },
    {
      id: "MC-ELEC-472811",
      service: "Electricity",
      title: "Streetlight Fault",
      description: "Streetlight not working.",
      date: "10 September 2026",
      status: "RESOLVED",
    },
  ];

  const getStatusIcon = (status) => {
    if (status === "RESOLVED") {
      return <CheckCircle2 size={19} />;
    }

    if (status === "IN PROGRESS") {
      return <Clock3 size={19} />;
    }

    return <AlertCircle size={19} />;
  };

  return (
    <div className="tickets-page">

      {/* Header */}
      <header className="tickets-header">

        <button
          className="tickets-back"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1>My Tickets</h1>
          <p>Track your service requests</p>
        </div>

      </header>

      <main className="tickets-content">

        {/* Summary */}
        <section className="ticket-summary">

          <div className="summary-icon">
            <TicketIcon size={28} />
          </div>

          <div>
            <strong>{tickets.length} Reports</strong>
            <span>Your submitted service requests</span>
          </div>

        </section>

        {/* Tickets */}
        <section className="tickets-list">

          <div className="tickets-title">
            <h2>Recent Reports</h2>
            <span>{tickets.length}</span>
          </div>

          {tickets.map((ticket) => (
            <button
              key={ticket.id}
              className="ticket-card"
              onClick={() =>
                navigate(`/tickets/${ticket.id}`)
              }
            >

              <div className="ticket-top">

                <div>
                  <span className="ticket-service">
                    {ticket.service}
                  </span>

                  <h3>{ticket.title}</h3>
                </div>

                <ChevronRight size={21} />

              </div>

              <p className="ticket-description">
                {ticket.description}
              </p>

              <div className="ticket-bottom">

                <span className="ticket-id">
                  {ticket.id}
                </span>

                <span className="ticket-date">
                  {ticket.date}
                </span>

              </div>

              <div
                className={`ticket-status ${ticket.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {getStatusIcon(ticket.status)}
                {ticket.status}
              </div>

            </button>
          ))}

        </section>

        {/* New report */}
        <button
          className="new-report-button"
          onClick={() => navigate("/dashboard")}
        >
          + Report Another Fault
        </button>

      </main>

    </div>
  );
}

export default Tickets;