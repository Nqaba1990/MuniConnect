import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Save,
  Globe,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Ticket,
  UserPlus,
  Settings,
  Wrench,
  LockKeyhole,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import "../../styles/municipality-settings.css";

function MunicipalitySettings() {
  const navigate = useNavigate();
  const { municipalityId } = useParams();

  const [settings, setSettings] = useState({
    name: "Raymond Mhlaba Local Municipality",
    code: "RMLM",
    province: "Eastern Cape",
    website: "https://www.raymondmhlaba.gov.za",
    phone: "043 123 4500",
    email: "info@rmlm.gov.za",
    address:
      "15 Market Street, Fort Beaufort, Eastern Cape",

    status: "ACTIVE",
    maintenanceMode: false,

    allowRegistration: true,
    requireEmailVerification: false,

    autoAssignment: true,
    slaTracking: true,
    ticketNotifications: true,

    requireMFA: true,
    sessionTimeout: "30",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setSettings((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="municipality-settings-page">

      {/* HEADER */}
      <header className="municipality-settings-header">
        <div className="municipality-settings-header-left">

          <button
            className="municipality-settings-back"
            onClick={() =>
              navigate(
                `/developer/municipalities/${municipalityId}`
              )
            }
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="municipality-settings-breadcrumb">
              Developer / Municipalities / Settings
            </div>

            <h1>Municipality Settings</h1>

            <p>
              Manage configuration and operational settings
              for this municipality.
            </p>
          </div>

        </div>

        <button
          className="municipality-settings-save"
          onClick={handleSave}
        >
          <Save size={17} />
          Save Changes
        </button>
      </header>

      {/* MUNICIPALITY SUMMARY */}
      <section className="municipality-settings-summary">

        <div className="municipality-settings-summary-icon">
          <Building2 size={24} />
        </div>

        <div>
          <span>Municipality</span>

          <strong>{settings.name}</strong>

          <small>
            Municipality Code: {settings.code}
          </small>
        </div>

        <div className="municipality-settings-summary-status">
          <span>Status</span>

          <strong
            className={
              settings.status === "ACTIVE"
                ? "settings-active"
                : "settings-disabled"
            }
          >
            <CheckCircle2 size={14} />
            {settings.status}
          </strong>
        </div>

      </section>

      {saved && (
        <div className="municipality-settings-success">
          <CheckCircle2 size={18} />

          <div>
            <strong>Settings saved</strong>

            <p>
              Municipality settings have been updated
              successfully.
            </p>
          </div>
        </div>
      )}

      <div className="municipality-settings-layout">

        {/* MAIN CONTENT */}
        <main className="municipality-settings-main">

          {/* GENERAL */}
          <section className="settings-section">

            <div className="settings-section-header">
              <div className="settings-section-icon">
                <Building2 size={19} />
              </div>

              <div>
                <h2>General Information</h2>

                <p>
                  Basic information displayed throughout
                  MuniConnect.
                </p>
              </div>
            </div>

            <div className="settings-form-grid">

              <div className="settings-field">
                <label>Municipality Name</label>

                <input
                  name="name"
                  value={settings.name}
                  onChange={handleChange}
                />
              </div>

              <div className="settings-field">
                <label>Municipality Code</label>

                <input
                  name="code"
                  value={settings.code}
                  onChange={handleChange}
                />
              </div>

              <div className="settings-field">
                <label>Province</label>

                <select
                  name="province"
                  value={settings.province}
                  onChange={handleChange}
                >
                  <option>Eastern Cape</option>
                  <option>Western Cape</option>
                  <option>Gauteng</option>
                  <option>KwaZulu-Natal</option>
                  <option>Free State</option>
                  <option>Limpopo</option>
                  <option>Mpumalanga</option>
                  <option>North West</option>
                  <option>Northern Cape</option>
                </select>
              </div>

              <div className="settings-field">
                <label>Website</label>

                <div className="settings-input-icon">
                  <Globe size={16} />

                  <input
                    name="website"
                    value={settings.website}
                    onChange={handleChange}
                  />
                </div>
              </div>

            </div>

          </section>

          {/* CONTACT */}
          <section className="settings-section">

            <div className="settings-section-header">
              <div className="settings-section-icon">
                <Phone size={19} />
              </div>

              <div>
                <h2>Contact Information</h2>

                <p>
                  Public contact details for the
                  municipality.
                </p>
              </div>
            </div>

            <div className="settings-form-grid">

              <div className="settings-field">
                <label>Contact Number</label>

                <div className="settings-input-icon">
                  <Phone size={16} />

                  <input
                    name="phone"
                    value={settings.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="settings-field">
                <label>Email Address</label>

                <div className="settings-input-icon">
                  <Mail size={16} />

                  <input
                    name="email"
                    type="email"
                    value={settings.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="settings-field full">
                <label>Physical Address</label>

                <div className="settings-input-icon">
                  <MapPin size={16} />

                  <input
                    name="address"
                    value={settings.address}
                    onChange={handleChange}
                  />
                </div>
              </div>

            </div>

          </section>

          {/* STATUS */}
          <section className="settings-section">

            <div className="settings-section-header">
              <div className="settings-section-icon">
                <Settings size={19} />
              </div>

              <div>
                <h2>Municipality Status</h2>

                <p>
                  Control the operational state of the
                  municipality.
                </p>
              </div>
            </div>

            <div className="settings-options">

              <div className="settings-select-row">

                <div>
                  <strong>Municipality Status</strong>

                  <span>
                    Disabled municipalities cannot be
                    accessed by residents.
                  </span>
                </div>

                <select
                  name="status"
                  value={settings.status}
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

              <label className="settings-toggle-row">

                <div>
                  <strong>Maintenance Mode</strong>

                  <span>
                    Temporarily place the municipality
                    portal into maintenance mode.
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="maintenanceMode"
                  checked={
                    settings.maintenanceMode
                  }
                  onChange={handleChange}
                />

              </label>

            </div>

          </section>

          {/* REGISTRATION */}
          <section className="settings-section">

            <div className="settings-section-header">
              <div className="settings-section-icon">
                <UserPlus size={19} />
              </div>

              <div>
                <h2>Resident Registration</h2>

                <p>
                  Control how residents register for this
                  municipality.
                </p>
              </div>
            </div>

            <div className="settings-options">

              <label className="settings-toggle-row">

                <div>
                  <strong>
                    Allow Resident Registration
                  </strong>

                  <span>
                    Allow new residents to create
                    accounts.
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="allowRegistration"
                  checked={
                    settings.allowRegistration
                  }
                  onChange={handleChange}
                />

              </label>

              <label className="settings-toggle-row">

                <div>
                  <strong>
                    Require Email Verification
                  </strong>

                  <span>
                    Require residents to verify their
                    email address.
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="requireEmailVerification"
                  checked={
                    settings.requireEmailVerification
                  }
                  onChange={handleChange}
                />

              </label>

            </div>

          </section>

          {/* TICKETS */}
          <section className="settings-section">

            <div className="settings-section-header">
              <div className="settings-section-icon">
                <Ticket size={19} />
              </div>

              <div>
                <h2>Ticket Settings</h2>

                <p>
                  Configure how municipal fault reports
                  are handled.
                </p>
              </div>
            </div>

            <div className="settings-options">

              <label className="settings-toggle-row">

                <div>
                  <strong>
                    Automatic Assignment
                  </strong>

                  <span>
                    Automatically assign tickets to
                    available agents or technicians.
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="autoAssignment"
                  checked={
                    settings.autoAssignment
                  }
                  onChange={handleChange}
                />

              </label>

              <label className="settings-toggle-row">

                <div>
                  <strong>
                    SLA Tracking
                  </strong>

                  <span>
                    Track response and resolution
                    deadlines for tickets.
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="slaTracking"
                  checked={
                    settings.slaTracking
                  }
                  onChange={handleChange}
                />

              </label>

              <label className="settings-toggle-row">

                <div>
                  <strong>
                    Resident Ticket Notifications
                  </strong>

                  <span>
                    Notify residents when their ticket
                    status changes.
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="ticketNotifications"
                  checked={
                    settings.ticketNotifications
                  }
                  onChange={handleChange}
                />

              </label>

            </div>

          </section>

          {/* SECURITY */}
          <section className="settings-section">

            <div className="settings-section-header">
              <div className="settings-section-icon">
                <ShieldCheck size={19} />
              </div>

              <div>
                <h2>Security</h2>

                <p>
                  Security requirements for municipality
                  users.
                </p>
              </div>
            </div>

            <div className="settings-options">

              <label className="settings-toggle-row">

                <div>
                  <strong>
                    Require Multi-Factor Authentication
                  </strong>

                  <span>
                    Require MFA for users accessing this
                    municipality.
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="requireMFA"
                  checked={
                    settings.requireMFA
                  }
                  onChange={handleChange}
                />

              </label>

              <div className="settings-select-row">

                <div>
                  <strong>
                    Session Timeout
                  </strong>

                  <span>
                    Automatically sign users out after
                    inactivity.
                  </span>
                </div>

                <select
                  name="sessionTimeout"
                  value={
                    settings.sessionTimeout
                  }
                  onChange={handleChange}
                >
                  <option value="15">
                    15 minutes
                  </option>

                  <option value="30">
                    30 minutes
                  </option>

                  <option value="60">
                    1 hour
                  </option>

                  <option value="120">
                    2 hours
                  </option>
                </select>

              </div>

            </div>

          </section>

        </main>

        {/* SIDE PANEL */}
        <aside className="municipality-settings-sidebar">

          <section className="settings-side-card">

            <div className="settings-side-icon">
              <Wrench size={20} />
            </div>

            <h3>Configuration</h3>

            <p>
              Changes made here apply to this municipality
              only.
            </p>

            <div className="settings-side-item">
              <span>Municipality</span>
              <strong>{settings.code}</strong>
            </div>

            <div className="settings-side-item">
              <span>Registration</span>

              <strong>
                {settings.allowRegistration
                  ? "Open"
                  : "Closed"}
              </strong>
            </div>

            <div className="settings-side-item">
              <span>MFA</span>

              <strong>
                {settings.requireMFA
                  ? "Required"
                  : "Optional"}
              </strong>
            </div>

            <div className="settings-side-item">
              <span>SLA Tracking</span>

              <strong>
                {settings.slaTracking
                  ? "Enabled"
                  : "Disabled"}
              </strong>
            </div>

          </section>

          <section className="settings-side-card security">

            <div className="settings-side-icon security">
              <LockKeyhole size={20} />
            </div>

            <h3>Tenant Isolation</h3>

            <p>
              Municipality settings are isolated from
              other municipalities.
            </p>

            <div className="settings-security-status">
              <CheckCircle2 size={16} />

              <span>
                Municipality isolation enabled
              </span>
            </div>

          </section>

          <section className="settings-side-card warning">

            <div className="settings-side-icon warning">
              <AlertTriangle size={20} />
            </div>

            <h3>Developer Notice</h3>

            <p>
              These settings are currently stored as
              frontend mock data. The production version
              will save them through the Spring Boot API
              and MariaDB.
            </p>

          </section>

        </aside>

      </div>

    </div>
  );
}

export default MunicipalitySettings;