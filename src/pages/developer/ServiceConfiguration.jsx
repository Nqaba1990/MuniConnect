import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Settings,
  Droplets,
  Waves,
  Zap,
  Flame,
  Trash2,
  Building2,
  Save,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import "../../styles/service-configuration.css";

function ServiceConfiguration() {
  const navigate = useNavigate();
  const { municipalityId } = useParams();

  const [services, setServices] = useState([
    {
      id: 1,
      name: "Water",
      description:
        "Water leaks, outages and water supply problems.",
      icon: Droplets,
      active: true,
      department: "Water Department",
      sla: "48 Hours",
    },
    {
      id: 2,
      name: "Sewerage",
      description:
        "Blocked drains, sewer leaks and overflowing manholes.",
      icon: Waves,
      active: true,
      department: "Sewerage Department",
      sla: "48 Hours",
    },
    {
      id: 3,
      name: "Electricity",
      description:
        "Municipal electricity faults and streetlights.",
      icon: Zap,
      active: true,
      department: "Electricity Department",
      sla: "24 Hours",
    },
    {
      id: 4,
      name: "Refuse",
      description:
        "Missed collections, bins and illegal dumping.",
      icon: Trash2,
      active: true,
      department: "Refuse Department",
      sla: "72 Hours",
    },
    {
      id: 5,
      name: "Fire Department",
      description:
        "Fire hazards, hydrants and fire-related services.",
      icon: Flame,
      active: true,
      department: "Fire Department",
      sla: "24 Hours",
    },
    {
      id: 6,
      name: "Eskom",
      description:
        "Community reports for Eskom electricity faults.",
      icon: Zap,
      active: true,
      department: "Eskom",
      sla: "External Provider",
    },
  ]);

  const [saved, setSaved] = useState(false);

  const municipality = {
    id: municipalityId,
    name: "Raymond Mhlaba Local Municipality",
    code: "RMLM",
  };

  const toggleService = (serviceId) => {
    setServices((currentServices) =>
      currentServices.map((service) =>
        service.id === serviceId
          ? {
              ...service,
              active: !service.active,
            }
          : service
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

  const handleConfigureService = (serviceId) => {
    navigate(
      `/developer/municipalities/${municipalityId}/services/${serviceId}`
    );
  };

  return (
    <div className="service-config-page">
      {/* =========================================
          HEADER
      ========================================== */}

      <header className="service-config-header">
        <div className="service-config-header-left">
          <button
            className="service-back-button"
            onClick={() =>
              navigate(
                `/developer/municipalities/${municipalityId}`
              )
            }
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <p className="service-eyebrow">
              MUNICIPALITY MANAGEMENT
            </p>

            <h1>Service Configuration</h1>

            <p>
              Configure the services available to{" "}
              <strong>{municipality.name}</strong>.
            </p>
          </div>
        </div>

        <button
          className="save-services-button"
          onClick={handleSave}
        >
          <Save size={18} />
          Save Changes
        </button>
      </header>

      {/* =========================================
          MUNICIPALITY BANNER
      ========================================== */}

      <section className="service-municipality-banner">
        <div className="service-banner-icon">
          <Building2 size={27} />
        </div>

        <div>
          <span>{municipality.code}</span>

          <h2>{municipality.name}</h2>

          <p>
            Services configured for this municipality.
          </p>
        </div>
      </section>

      {/* =========================================
          SAVE CONFIRMATION
      ========================================== */}

      {saved && (
        <div className="service-save-message">
          <CheckCircle2 size={19} />

          Service configuration saved successfully.
        </div>
      )}

      {/* =========================================
          SERVICE OVERVIEW
      ========================================== */}

      <section className="service-overview">
        <div className="service-overview-card">
          <span>Total Services</span>

          <strong>{services.length}</strong>
        </div>

        <div className="service-overview-card">
          <span>Active Services</span>

          <strong>
            {
              services.filter(
                (service) => service.active
              ).length
            }
          </strong>
        </div>

        <div className="service-overview-card">
          <span>Disabled Services</span>

          <strong>
            {
              services.filter(
                (service) => !service.active
              ).length
            }
          </strong>
        </div>
      </section>

      {/* =========================================
          AVAILABLE SERVICES
      ========================================== */}

      <section className="services-config-section">
        <div className="services-config-heading">
          <div>
            <p className="service-eyebrow">
              COMMUNITY SERVICES
            </p>

            <h2>Available Services</h2>

            <p>
              Enable or disable services that residents
              can access from the MuniConnect application.
            </p>
          </div>
        </div>

        <div className="services-config-grid">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                className={`service-config-card ${
                  !service.active
                    ? "service-disabled"
                    : ""
                }`}
                key={service.id}
              >
                {/* Service card header */}

                <div className="service-card-header">
                  <div className="service-config-icon">
                    <Icon size={24} />
                  </div>

                  <button
                    type="button"
                    className={`service-toggle ${
                      service.active
                        ? "toggle-active"
                        : "toggle-inactive"
                    }`}
                    onClick={() =>
                      toggleService(service.id)
                    }
                    aria-label={`Toggle ${service.name}`}
                  >
                    <span></span>
                  </button>
                </div>

                {/* Service information */}

                <div className="service-config-content">
                  <div className="service-name-row">
                    <h3>{service.name}</h3>

                    {service.active ? (
                      <span className="service-active-status">
                        <CheckCircle2 size={13} />
                        ACTIVE
                      </span>
                    ) : (
                      <span className="service-inactive-status">
                        <XCircle size={13} />
                        DISABLED
                      </span>
                    )}
                  </div>

                  <p>{service.description}</p>
                </div>

                {/* Service details */}

                <div className="service-config-details">
                  <div>
                    <span>Department</span>

                    <strong>
                      {service.department}
                    </strong>
                  </div>

                  <div>
                    <span>Service SLA</span>

                    <strong>
                      {service.sla}
                    </strong>
                  </div>
                </div>

                {/* Configure button */}

                <button
                  type="button"
                  className="service-settings-button"
                  onClick={() =>
                    handleConfigureService(
                      service.id
                    )
                  }
                >
                  <Settings size={16} />

                  Configure Service
                </button>
              </article>
            );
          })}
        </div>
      </section>

      {/* =========================================
          ESKOM NOTICE
      ========================================== */}

      <section className="eskom-service-notice">
        <div className="eskom-notice-icon">
          <Zap size={23} />
        </div>

        <div>
          <h3>
            Eskom is configured as a separate service
          </h3>

          <p>
            Eskom fault reports are kept separate from
            municipal electricity reports. This allows
            MuniConnect to distinguish between municipal
            electricity faults and faults that need to be
            handled by Eskom.
          </p>
        </div>
      </section>
    </div>
  );
}

export default ServiceConfiguration;