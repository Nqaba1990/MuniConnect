import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Settings as SettingsIcon,
  Building2,
  Phone,
  UserPlus,
  Ticket,
  Bell,
  ShieldCheck,
  Save,
  RotateCcw,
  CheckCircle2,
  Mail,
  Smartphone,
  MessageSquare,
  LockKeyhole,
} from "lucide-react";

import "../../styles/admin-settings.css";

const initialSettings = {
  municipalityName:
    "Raymond Mhlaba Local Municipality",
  municipalityCode: "RMLM",
  province: "Eastern Cape",
  website: "https://www.rmlm.gov.za",

  phone: "043 123 4500",
  email: "info@rmlm.gov.za",
  address:
    "Main Street, Fort Beaufort, Eastern Cape",

  municipalityStatus: "ACTIVE",

  allowRegistration: true,
  requireEmailVerification: true,
  requireAccountApproval: false,

  autoAssignment: true,
  slaTracking: true,
  ticketNotifications: true,
  allowTicketReopen: true,

  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: false,
  emergencyAlerts: true,

  requireMfa: true,
  sessionTimeout: "30",
  passwordExpiry: "90",
  loginProtection: true,
};

function Settings() {
  const navigate = useNavigate();

  const [settings, setSettings] =
    useState(initialSettings);

  const [saved, setSaved] = useState(false);

  const handleChange = (field, value) => {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
  };

  const saveSettings = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const resetSettings = () => {
    const confirmed = window.confirm(
      "Reset all settings to their original values?"
    );

    if (!confirmed) {
      return;
    }

    setSettings({
      ...initialSettings,
    });

    setSaved(false);
  };

  return (
    <div className="admin-settings-page">
      {/* HEADER */}
      <header className="admin-settings-header">
        <div className="admin-settings-header-left">
          <button
            className="admin-settings-back"
            onClick={() =>
              navigate("/admin/dashboard")
            }
            title="Back to Admin Dashboard"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="admin-settings-breadcrumb">
              Admin / Settings
            </div>

            <h1>Municipality Settings</h1>

            <p>
              Configure your municipality's
              MuniConnect settings.
            </p>
          </div>
        </div>

        <button
          className="admin-settings-save-top"
          onClick={saveSettings}
        >
          <Save size={17} />
          Save Changes
        </button>
      </header>

      {/* MUNICIPALITY HEADER */}
      <section className="admin-settings-municipality">
        <div className="admin-settings-municipality-icon">
          <Building2 size={21} />
        </div>

        <div>
          <strong>
            {settings.municipalityName}
          </strong>

          <span>
            {settings.municipalityCode} ·{" "}
            {settings.province}
          </span>
        </div>

        <div className="admin-settings-scope">
          Municipality Scoped
        </div>
      </section>

      {/* SAVE MESSAGE */}
      {saved && (
        <div className="admin-settings-success">
          <CheckCircle2 size={18} />

          <div>
            <strong>
              Settings saved
            </strong>

            <span>
              Municipality settings have been
              updated successfully.
            </span>
          </div>
        </div>
      )}

      <div className="admin-settings-layout">
        {/* SIDE NAVIGATION */}
        <aside className="admin-settings-sidebar">
          <a href="#general">
            <Building2 size={16} />
            General
          </a>

          <a href="#contact">
            <Phone size={16} />
            Contact
          </a>

          <a href="#registration">
            <UserPlus size={16} />
            Registration
          </a>

          <a href="#tickets">
            <Ticket size={16} />
            Tickets
          </a>

          <a href="#notifications">
            <Bell size={16} />
            Notifications
          </a>

          <a href="#security">
            <ShieldCheck size={16} />
            Security
          </a>
        </aside>

        {/* CONTENT */}
        <main className="admin-settings-content">
          {/* GENERAL */}
          <section
            className="admin-settings-card"
            id="general"
          >
            <div className="admin-settings-card-header">
              <div className="admin-settings-section-icon">
                <Building2 size={19} />
              </div>

              <div>
                <h2>General Information</h2>

                <p>
                  Basic municipality information
                  displayed throughout MuniConnect.
                </p>
              </div>
            </div>

            <div className="admin-settings-grid">
              <label>
                Municipality Name

                <input
                  type="text"
                  value={
                    settings.municipalityName
                  }
                  onChange={(event) =>
                    handleChange(
                      "municipalityName",
                      event.target.value
                    )
                  }
                />
              </label>

              <label>
                Municipality Code

                <input
                  type="text"
                  value={
                    settings.municipalityCode
                  }
                  onChange={(event) =>
                    handleChange(
                      "municipalityCode",
                      event.target.value
                    )
                  }
                />
              </label>

              <label>
                Province

                <select
                  value={settings.province}
                  onChange={(event) =>
                    handleChange(
                      "province",
                      event.target.value
                    )
                  }
                >
                  <option>
                    Eastern Cape
                  </option>

                  <option>
                    Western Cape
                  </option>

                  <option>
                    Gauteng
                  </option>

                  <option>
                    KwaZulu-Natal
                  </option>

                  <option>
                    Free State
                  </option>

                  <option>
                    Limpopo
                  </option>

                  <option>
                    Mpumalanga
                  </option>

                  <option>
                    Northern Cape
                  </option>

                  <option>
                    North West
                  </option>
                </select>
              </label>

              <label>
                Website

                <input
                  type="text"
                  value={settings.website}
                  onChange={(event) =>
                    handleChange(
                      "website",
                      event.target.value
                    )
                  }
                />
              </label>
            </div>
          </section>

          {/* CONTACT */}
          <section
            className="admin-settings-card"
            id="contact"
          >
            <div className="admin-settings-card-header">
              <div className="admin-settings-section-icon">
                <Phone size={19} />
              </div>

              <div>
                <h2>Contact Information</h2>

                <p>
                  Contact information residents
                  can use to communicate with the
                  municipality.
                </p>
              </div>
            </div>

            <div className="admin-settings-grid">
              <label>
                Municipality Phone

                <div className="admin-settings-input-icon">
                  <Phone size={15} />

                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(event) =>
                      handleChange(
                        "phone",
                        event.target.value
                      )
                    }
                  />
                </div>
              </label>

              <label>
                Municipality Email

                <div className="admin-settings-input-icon">
                  <Mail size={15} />

                  <input
                    type="email"
                    value={settings.email}
                    onChange={(event) =>
                      handleChange(
                        "email",
                        event.target.value
                      )
                    }
                  />
                </div>
              </label>

              <label className="full">
                Physical Address

                <textarea
                  rows="3"
                  value={settings.address}
                  onChange={(event) =>
                    handleChange(
                      "address",
                      event.target.value
                    )
                  }
                />
              </label>
            </div>
          </section>

          {/* REGISTRATION */}
          <section
            className="admin-settings-card"
            id="registration"
          >
            <div className="admin-settings-card-header">
              <div className="admin-settings-section-icon">
                <UserPlus size={19} />
              </div>

              <div>
                <h2>Resident Registration</h2>

                <p>
                  Control how residents register
                  and access municipal services.
                </p>
              </div>
            </div>

            <div className="admin-settings-options">
              <SettingToggle
                title="Allow Resident Registration"
                description="Allow new residents to create MuniConnect accounts."
                checked={
                  settings.allowRegistration
                }
                onChange={(value) =>
                  handleChange(
                    "allowRegistration",
                    value
                  )
                }
              />

              <SettingToggle
                title="Require Email Verification"
                description="Residents must verify their email address before using their account."
                checked={
                  settings.requireEmailVerification
                }
                onChange={(value) =>
                  handleChange(
                    "requireEmailVerification",
                    value
                  )
                }
              />

              <SettingToggle
                title="Require Account Approval"
                description="New resident accounts require municipal administrator approval."
                checked={
                  settings.requireAccountApproval
                }
                onChange={(value) =>
                  handleChange(
                    "requireAccountApproval",
                    value
                  )
                }
              />
            </div>
          </section>

          {/* TICKETS */}
          <section
            className="admin-settings-card"
            id="tickets"
          >
            <div className="admin-settings-card-header">
              <div className="admin-settings-section-icon">
                <Ticket size={19} />
              </div>

              <div>
                <h2>Ticket Settings</h2>

                <p>
                  Configure how municipal fault
                  reports are processed.
                </p>
              </div>
            </div>

            <div className="admin-settings-options">
              <SettingToggle
                title="Automatic Ticket Assignment"
                description="Automatically assign tickets to available agents or technicians."
                checked={
                  settings.autoAssignment
                }
                onChange={(value) =>
                  handleChange(
                    "autoAssignment",
                    value
                  )
                }
              />

              <SettingToggle
                title="SLA Tracking"
                description="Track service-level agreements and escalation deadlines."
                checked={
                  settings.slaTracking
                }
                onChange={(value) =>
                  handleChange(
                    "slaTracking",
                    value
                  )
                }
              />

              <SettingToggle
                title="Resident Ticket Notifications"
                description="Notify residents when their ticket status changes."
                checked={
                  settings.ticketNotifications
                }
                onChange={(value) =>
                  handleChange(
                    "ticketNotifications",
                    value
                  )
                }
              />

              <SettingToggle
                title="Allow Ticket Reopening"
                description="Allow residents to request reopening of recently resolved tickets."
                checked={
                  settings.allowTicketReopen
                }
                onChange={(value) =>
                  handleChange(
                    "allowTicketReopen",
                    value
                  )
                }
              />
            </div>
          </section>

          {/* NOTIFICATIONS */}
          <section
            className="admin-settings-card"
            id="notifications"
          >
            <div className="admin-settings-card-header">
              <div className="admin-settings-section-icon">
                <Bell size={19} />
              </div>

              <div>
                <h2>
                  Notification Settings
                </h2>

                <p>
                  Configure the notification
                  channels available to residents.
                </p>
              </div>
            </div>

            <div className="admin-settings-options">
              <SettingToggle
                icon={<Mail size={16} />}
                title="Email Notifications"
                description="Send account and ticket notifications by email."
                checked={
                  settings.emailNotifications
                }
                onChange={(value) =>
                  handleChange(
                    "emailNotifications",
                    value
                  )
                }
              />

              <SettingToggle
                icon={<Bell size={16} />}
                title="Push Notifications"
                description="Send notifications through the MuniConnect PWA."
                checked={
                  settings.pushNotifications
                }
                onChange={(value) =>
                  handleChange(
                    "pushNotifications",
                    value
                  )
                }
              />

              <SettingToggle
                icon={
                  <Smartphone size={16} />
                }
                title="SMS Notifications"
                description="Allow SMS notifications for supported municipal services."
                checked={
                  settings.smsNotifications
                }
                onChange={(value) =>
                  handleChange(
                    "smsNotifications",
                    value
                  )
                }
              />

              <SettingToggle
                icon={
                  <MessageSquare size={16} />
                }
                title="Emergency Alerts"
                description="Allow urgent municipal alerts to be distributed to residents."
                checked={
                  settings.emergencyAlerts
                }
                onChange={(value) =>
                  handleChange(
                    "emergencyAlerts",
                    value
                  )
                }
              />
            </div>
          </section>

          {/* SECURITY */}
          <section
            className="admin-settings-card"
            id="security"
          >
            <div className="admin-settings-card-header">
              <div className="admin-settings-section-icon">
                <ShieldCheck size={19} />
              </div>

              <div>
                <h2>Security Settings</h2>

                <p>
                  Configure account security and
                  authentication policies.
                </p>
              </div>
            </div>

            <div className="admin-settings-options">
              <SettingToggle
                icon={
                  <LockKeyhole size={16} />
                }
                title="Require MFA"
                description="Require multi-factor authentication for municipality users."
                checked={
                  settings.requireMfa
                }
                onChange={(value) =>
                  handleChange(
                    "requireMfa",
                    value
                  )
                }
              />

              <SettingToggle
                title="Login Attempt Protection"
                description="Temporarily restrict accounts after repeated failed login attempts."
                checked={
                  settings.loginProtection
                }
                onChange={(value) =>
                  handleChange(
                    "loginProtection",
                    value
                  )
                }
              />
            </div>

            <div className="admin-settings-grid security-grid">
              <label>
                Session Timeout

                <select
                  value={
                    settings.sessionTimeout
                  }
                  onChange={(event) =>
                    handleChange(
                      "sessionTimeout",
                      event.target.value
                    )
                  }
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
              </label>

              <label>
                Password Expiry

                <select
                  value={
                    settings.passwordExpiry
                  }
                  onChange={(event) =>
                    handleChange(
                      "passwordExpiry",
                      event.target.value
                    )
                  }
                >
                  <option value="30">
                    30 days
                  </option>

                  <option value="60">
                    60 days
                  </option>

                  <option value="90">
                    90 days
                  </option>

                  <option value="180">
                    180 days
                  </option>

                  <option value="0">
                    Never
                  </option>
                </select>
              </label>
            </div>

            <div className="admin-settings-security-notice">
              <ShieldCheck size={18} />

              <div>
                <strong>
                  Municipality security policy
                </strong>

                <span>
                  These controls will be enforced
                  by Spring Security when the
                  MuniConnect backend is connected.
                </span>
              </div>
            </div>
          </section>

          {/* MUNICIPALITY STATUS */}
          <section className="admin-settings-card">
            <div className="admin-settings-card-header">
              <div className="admin-settings-section-icon">
                <CheckCircle2 size={19} />
              </div>

              <div>
                <h2>
                  Municipality Status
                </h2>

                <p>
                  Control whether this municipality
                  is active on MuniConnect.
                </p>
              </div>
            </div>

            <div className="admin-settings-status-row">
              <div>
                <strong>
                  Municipality Account
                </strong>

                <span>
                  Determines whether residents
                  can access this municipality.
                </span>
              </div>

              <select
                value={
                  settings.municipalityStatus
                }
                onChange={(event) =>
                  handleChange(
                    "municipalityStatus",
                    event.target.value
                  )
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
          </section>

          {/* ACTIONS */}
          <div className="admin-settings-actions">
            <button
              className="admin-settings-reset"
              onClick={resetSettings}
            >
              <RotateCcw size={17} />
              Reset Changes
            </button>

            <button
              className="admin-settings-save"
              onClick={saveSettings}
            >
              <Save size={17} />
              Save Settings
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

function SettingToggle({
  title,
  description,
  checked,
  onChange,
  icon,
}) {
  return (
    <div className="admin-setting-toggle">
      <div className="admin-setting-toggle-info">
        <div className="admin-setting-toggle-icon">
          {icon || <CheckCircle2 size={16} />}
        </div>

        <div>
          <strong>{title}</strong>

          <span>{description}</span>
        </div>
      </div>

      <button
        type="button"
        className={`admin-setting-switch ${
          checked ? "active" : ""
        }`}
        onClick={() =>
          onChange(!checked)
        }
        aria-label={`Toggle ${title}`}
      >
        <span />
      </button>
    </div>
  );
}

export default Settings;