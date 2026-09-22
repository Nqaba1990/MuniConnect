import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Settings,
  Save,
  CheckCircle2,
  Clock3,
  Users,
  AlertTriangle,
  ListChecks,
  Bell,
  ShieldCheck,
} from "lucide-react";
import "../../styles/service-details.css";

function ServiceDetails() {
  const navigate = useNavigate();
  const { municipalityId, serviceId } = useParams();

  const serviceDefinitions = {
    1: {
      name: "Water",
      description:
        "Water leaks, outages and water supply problems.",
      department: "Water Department",
      color: "blue",
      faultTypes: [
        "No Water",
        "Water Leak",
        "Burst Pipe",
        "Low Water Pressure",
        "Damaged Water Meter",
        "Contaminated Water",
        "Other",
      ],
    },

    2: {
      name: "Sewerage",
      description:
        "Blocked drains, sewer leaks and overflowing manholes.",
      department: "Sewerage Department",
      color: "blue",
      faultTypes: [
        "Blocked Drain",
        "Sewage Leak",
        "Overflowing Manhole",
        "Blocked Sewer",
        "Damaged Sewer Line",
        "Bad Odour",
        "Other",
      ],
    },

    3: {
      name: "Electricity",
      description:
        "Municipal electricity faults and streetlights.",
      department: "Electricity Department",
      color: "blue",
      faultTypes: [
        "Power Outage",
        "Streetlight Fault",
        "Damaged Electrical Pole",
        "Electrical Cable Fault",
        "Sparking Cable",
        "Transformer Fault",
        "Other",
      ],
    },

    4: {
      name: "Refuse",
      description:
        "Missed collections, bins and illegal dumping.",
      department: "Refuse Department",
      color: "blue",
      faultTypes: [
        "Missed Collection",
        "Illegal Dumping",
        "Damaged Bin",
        "Overflowing Bins",
        "Waste Collection Problem",
        "Other",
      ],
    },

    5: {
      name: "Fire Department",
      description:
        "Fire hazards, hydrants and fire-related services.",
      department: "Fire Department",
      color: "blue",
      faultTypes: [
        "Fire Hazard",
        "Fire Hydrant Problem",
        "Blocked Fire Access",
        "Damaged Fire Equipment",
        "Other",
      ],
    },

    6: {
      name: "Eskom",
      description:
        "Community reports for Eskom electricity faults.",
      department: "Eskom",
      color: "blue",
      faultTypes: [
        "Power Outage",
        "Damaged Power Line",
        "Fallen Electricity Pole",
        "Transformer Fault",
        "Sparking Power Line",
        "Streetlight Fault",
        "Other",
      ],
    },
  };

  const service =
    serviceDefinitions[serviceId] ||
    serviceDefinitions[1];

  const [enabled, setEnabled] = useState(true);

  const [department, setDepartment] = useState(
    service.department
  );

  const [sla, setSla] = useState(
    service.name === "Refuse"
      ? "72"
      : service.name === "Eskom"
      ? "0"
      : "48"
  );

  const [slaUnit, setSlaUnit] = useState(
    service.name === "Eskom"
      ? "External Provider"
      : "Hours"
  );

  const [assignmentMode, setAssignmentMode] =
    useState("AUTO");

  const [escalationEnabled, setEscalationEnabled] =
    useState(true);

  const [notificationsEnabled, setNotificationsEnabled] =
    useState(true);

  const [faultTypes, setFaultTypes] = useState(
    service.faultTypes
  );

  const [newFaultType, setNewFaultType] =
    useState("");

  const [saved, setSaved] = useState(false);

  const municipality = {
    name: "Raymond Mhlaba Local Municipality",
    code: "RMLM",
  };

  const addFaultType = () => {
    const trimmed = newFaultType.trim();

    if (!trimmed) {
      return;
    }

    if (
      faultTypes.some(
        (faultType) =>
          faultType.toLowerCase() ===
          trimmed.toLowerCase()
      )
    ) {
      return;
    }

    setFaultTypes((current) => [
      ...current,
      trimmed,
    ]);

    setNewFaultType("");
    setSaved(false);
  };

  const removeFaultType = (faultTypeToRemove) => {
    setFaultTypes((current) =>
      current.filter(
        (faultType) =>
          faultType !== faultTypeToRemove
      )
    );

    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="service-details-page">
      {/* =================================
          HEADER
      ================================== */}

      <header className="service-details-header">
        <div className="service-details-header-left">
          <button
            className="service-details-back"
            onClick={() =>
              navigate(
                `/developer/municipalities/${municipalityId}/services`
              )
            }
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <p className="service-details-eyebrow">
              SERVICE CONFIGURATION
            </p>

            <h1>{service.name}</h1>

            <p>
              Configure how the {service.name} service
              operates for this municipality.
            </p>
          </div>
        </div>

        <button
          className="service-details-save"
          onClick={handleSave}
        >
          <Save size={18} />
          Save Changes
        </button>
      </header>

      {/* =================================
          SERVICE SUMMARY
      ================================== */}

      <section className="service-details-summary">
        <div className="service-summary-icon">
          <Settings size={28} />
        </div>

        <div className="service-summary-content">
          <span>{municipality.code}</span>

          <h2>{municipality.name}</h2>

          <p>{service.description}</p>
        </div>

        <div className="service-summary-status">
          <span>Service Status</span>

          <button
            className={`service-status-toggle ${
              enabled
                ? "status-toggle-on"
                : "status-toggle-off"
            }`}
            onClick={() => {
              setEnabled(!enabled);
              setSaved(false);
            }}
          >
            <span></span>

            {enabled ? "ACTIVE" : "DISABLED"}
          </button>
        </div>
      </section>

      {/* =================================
          SAVE MESSAGE
      ================================== */}

      {saved && (
        <div className="service-details-save-message">
          <CheckCircle2 size={19} />

          {service.name} service configuration
          saved successfully.
        </div>
      )}

      {/* =================================
          BASIC SETTINGS
      ================================== */}

      <section className="service-settings-section">
        <div className="service-section-heading">
          <div className="service-section-icon">
            <Building2 size={20} />
          </div>

          <div>
            <h2>Basic Service Settings</h2>

            <p>
              Configure the department and general
              service behaviour.
            </p>
          </div>
        </div>

        <div className="service-form-grid">
          <div className="service-form-field">
            <label>Service Name</label>

            <input
              value={service.name}
              disabled
            />
          </div>

          <div className="service-form-field">
            <label>Department</label>

            <select
              value={department}
              onChange={(event) =>
                setDepartment(event.target.value)
              }
            >
              <option>
                Water Department
              </option>

              <option>
                Sewerage Department
              </option>

              <option>
                Electricity Department
              </option>

              <option>
                Refuse Department
              </option>

              <option>
                Fire Department
              </option>

              <option>Eskom</option>
            </select>
          </div>
        </div>
      </section>

      {/* =================================
          SLA SETTINGS
      ================================== */}

      <section className="service-settings-section">
        <div className="service-section-heading">
          <div className="service-section-icon">
            <Clock3 size={20} />
          </div>

          <div>
            <h2>Service Level Agreement</h2>

            <p>
              Define the expected response or
              resolution time for this service.
            </p>
          </div>
        </div>

        <div className="service-form-grid">
          <div className="service-form-field">
            <label>SLA Target</label>

            <input
              type="number"
              min="0"
              value={sla}
              onChange={(event) =>
                setSla(event.target.value)
              }
              disabled={
                service.name === "Eskom"
              }
            />
          </div>

          <div className="service-form-field">
            <label>SLA Unit</label>

            <select
              value={slaUnit}
              onChange={(event) =>
                setSlaUnit(event.target.value)
              }
            >
              <option value="Hours">
                Hours
              </option>

              <option value="Days">
                Days
              </option>

              <option value="External Provider">
                External Provider
              </option>
            </select>
          </div>
        </div>

        {service.name === "Eskom" && (
          <div className="external-provider-notice">
            <AlertTriangle size={18} />

            <div>
              <strong>
                External Service Provider
              </strong>

              <p>
                Eskom is treated as an external
                electricity provider. Response times
                can therefore be managed separately
                from municipal electricity.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* =================================
          FAULT TYPES
      ================================== */}

      <section className="service-settings-section">
        <div className="service-section-heading">
          <div className="service-section-icon">
            <ListChecks size={20} />
          </div>

          <div>
            <h2>Fault Types</h2>

            <p>
              These options will appear when residents
              submit a {service.name} fault.
            </p>
          </div>
        </div>

        <div className="fault-type-list">
          {faultTypes.map((faultType) => (
            <div
              className="fault-type-item"
              key={faultType}
            >
              <span>{faultType}</span>

              <button
                onClick={() =>
                  removeFaultType(faultType)
                }
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="add-fault-type">
          <input
            value={newFaultType}
            onChange={(event) =>
              setNewFaultType(event.target.value)
            }
            placeholder="Add a new fault type..."
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addFaultType();
              }
            }}
          />

          <button onClick={addFaultType}>
            Add Fault Type
          </button>
        </div>
      </section>

      {/* =================================
          ASSIGNMENT
      ================================== */}

      <section className="service-settings-section">
        <div className="service-section-heading">
          <div className="service-section-icon">
            <Users size={20} />
          </div>

          <div>
            <h2>Assignment Rules</h2>

            <p>
              Determine how new tickets are assigned
              to municipal staff.
            </p>
          </div>
        </div>

        <div className="assignment-options">
          <label
            className={`assignment-option ${
              assignmentMode === "AUTO"
                ? "assignment-selected"
                : ""
            }`}
          >
            <input
              type="radio"
              name="assignment"
              value="AUTO"
              checked={
                assignmentMode === "AUTO"
              }
              onChange={(event) =>
                setAssignmentMode(
                  event.target.value
                )
              }
            />

            <div>
              <strong>
                Automatic Assignment
              </strong>

              <p>
                Automatically assign tickets to
                available staff based on department
                and service area.
              </p>
            </div>
          </label>

          <label
            className={`assignment-option ${
              assignmentMode === "MANUAL"
                ? "assignment-selected"
                : ""
            }`}
          >
            <input
              type="radio"
              name="assignment"
              value="MANUAL"
              checked={
                assignmentMode === "MANUAL"
              }
              onChange={(event) =>
                setAssignmentMode(
                  event.target.value
                )
              }
            />

            <div>
              <strong>
                Manual Assignment
              </strong>

              <p>
                Require an agent or administrator to
                manually assign every ticket.
              </p>
            </div>
          </label>
        </div>
      </section>

      {/* =================================
          ESCALATION
      ================================== */}

      <section className="service-settings-section">
        <div className="service-section-heading">
          <div className="service-section-icon">
            <AlertTriangle size={20} />
          </div>

          <div>
            <h2>Escalation</h2>

            <p>
              Automatically escalate tickets that
              exceed the configured SLA.
            </p>
          </div>
        </div>

        <div className="service-switch-row">
          <div>
            <strong>
              Enable automatic escalation
            </strong>

            <p>
              Notify supervisors when tickets exceed
              their expected response time.
            </p>
          </div>

          <button
            className={`service-toggle ${
              escalationEnabled
                ? "toggle-active"
                : "toggle-inactive"
            }`}
            onClick={() =>
              setEscalationEnabled(
                !escalationEnabled
              )
            }
          >
            <span></span>
          </button>
        </div>
      </section>

      {/* =================================
          NOTIFICATIONS
      ================================== */}

      <section className="service-settings-section">
        <div className="service-section-heading">
          <div className="service-section-icon">
            <Bell size={20} />
          </div>

          <div>
            <h2>Notifications</h2>

            <p>
              Control notifications generated by this
              service.
            </p>
          </div>
        </div>

        <div className="service-switch-row">
          <div>
            <strong>
              Enable service notifications
            </strong>

            <p>
              Notify residents and staff when important
              ticket events occur.
            </p>
          </div>

          <button
            className={`service-toggle ${
              notificationsEnabled
                ? "toggle-active"
                : "toggle-inactive"
            }`}
            onClick={() =>
              setNotificationsEnabled(
                !notificationsEnabled
              )
            }
          >
            <span></span>
          </button>
        </div>
      </section>

      {/* =================================
          SECURITY NOTICE
      ================================== */}

      <section className="service-security-notice">
        <div className="service-security-icon">
          <ShieldCheck size={23} />
        </div>

        <div>
          <h3>
            Configuration applies to this municipality
          </h3>

          <p>
            These settings belong to{" "}
            <strong>
              {municipality.name}
            </strong>
            . When the backend is connected, service
            configuration will be stored against this
            municipality and will not affect another
            municipality.
          </p>
        </div>
      </section>
    </div>
  );
}

export default ServiceDetails;