import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Camera,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "../../styles/fault-report.css";

function FaultReport({
  serviceName,
  serviceDescription,
  faultTypes,
}) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    faultType: "",
    description: "",
    address: "",
    contactNumber: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const generatedTicket =
      `MC-${serviceName.substring(0, 4).toUpperCase()}-${Date.now()
        .toString()
        .slice(-6)}`;

    setTicketNumber(generatedTicket);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="fault-page">

        <header className="fault-header">
          <button
            onClick={() => navigate("/dashboard")}
            className="back-button"
          >
            <ArrowLeft size={20} />
          </button>

          <h1>{serviceName}</h1>

          <div />
        </header>

        <main className="fault-content">

          <div className="success-card">

            <div className="success-icon">
              <CheckCircle size={56} />
            </div>

            <h2>Report Submitted</h2>

            <p>
              Your {serviceName.toLowerCase()} fault has
              been successfully submitted.
            </p>

            <div className="ticket-number">
              <span>Ticket Number</span>
              <strong>{ticketNumber}</strong>
            </div>

            <div className="success-status">
              <span>STATUS</span>
              <strong>NEW</strong>
            </div>

            <button
              className="primary-button"
              onClick={() => navigate("/tickets")}
            >
              View My Tickets
            </button>

            <button
              className="secondary-button"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </button>

          </div>

        </main>

      </div>
    );
  }

  return (
    <div className="fault-page">

      {/* Header */}

      <header className="fault-header">

        <button
          onClick={() => navigate("/dashboard")}
          className="back-button"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1>{serviceName}</h1>
          <p>Report a fault</p>
        </div>

        <div />

      </header>

      <main className="fault-content">

        {/* Introduction */}

        <section className="fault-intro">

          <div className="fault-service-icon">
            <AlertCircle size={30} />
          </div>

          <div>
            <h2>Report {serviceName} Fault</h2>

            <p>
              {serviceDescription}
            </p>
          </div>

        </section>

        {/* Form */}

        <form
          className="fault-form"
          onSubmit={handleSubmit}
        >

          {/* Fault Type */}

          <div className="form-section">

            <label htmlFor="faultType">
              Fault Type
            </label>

            <select
              id="faultType"
              name="faultType"
              value={form.faultType}
              onChange={handleChange}
              required
            >
              <option value="">
                Select fault type
              </option>

              {faultTypes.map((fault) => (
                <option
                  key={fault}
                  value={fault}
                >
                  {fault}
                </option>
              ))}

            </select>

          </div>

          {/* Description */}

          <div className="form-section">

            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows="5"
              placeholder={`Describe the ${serviceName.toLowerCase()} problem...`}
              value={form.description}
              onChange={handleChange}
              required
            />

          </div>

          {/* Location */}

          <div className="form-section">

            <label htmlFor="address">
              Location / Address
            </label>

            <div className="location-input">

              <MapPin size={20} />

              <input
                id="address"
                name="address"
                type="text"
                placeholder="Enter the fault location"
                value={form.address}
                onChange={handleChange}
                required
              />

            </div>

            <button
              type="button"
              className="location-button"
              onClick={() => {
                alert(
                  "GPS location will be connected in the next stage."
                );
              }}
            >
              <MapPin size={18} />
              Use My Current Location
            </button>

          </div>

          {/* Photo */}

          <div className="form-section">

            <label>
              Photos
            </label>

            <label className="photo-upload">

              <Camera size={25} />

              <span>
                Add photos of the fault
              </span>

              <small>
                Photos help the municipality understand
                the problem.
              </small>

              <input
                type="file"
                accept="image/*"
                capture="environment"
                multiple
              />

            </label>

          </div>

          {/* Contact */}

          <div className="form-section">

            <label htmlFor="contactNumber">
              Contact Number
            </label>

            <input
              id="contactNumber"
              name="contactNumber"
              type="tel"
              placeholder="e.g. 071 234 5678"
              value={form.contactNumber}
              onChange={handleChange}
              required
            />

          </div>

          {/* Submit */}

          <button
            type="submit"
            className="submit-fault-button"
          >
            <Send size={20} />
            Submit Fault Report
          </button>

        </form>

      </main>

    </div>
  );
}

export default FaultReport;