import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  Download,
  Ticket,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  Droplets,
  Waves,
  Zap,
  Trash2,
  Flame,
  Building2,
  Users,
  MapPin,
  CalendarDays,
  TrendingUp,
} from "lucide-react";

import "../../styles/admin-reports.css";

const reportTickets = [
  {
    id: 1,
    ticket: "MC-WATE-104821",
    service: "Water",
    area: "Fort Beaufort",
    status: "OPEN",
    priority: "HIGH",
    technician: "Unassigned",
    resolutionHours: null,
  },
  {
    id: 2,
    ticket: "MC-FIRE-104799",
    service: "Fire Department",
    area: "Alice",
    status: "ASSIGNED",
    priority: "URGENT",
    technician: "Lwazi Nqoma",
    resolutionHours: null,
  },
  {
    id: 3,
    ticket: "MC-SEWE-104802",
    service: "Sewerage",
    area: "Fort Beaufort",
    status: "IN_PROGRESS",
    priority: "HIGH",
    technician: "Noluthando Radebe",
    resolutionHours: 7.2,
  },
  {
    id: 4,
    ticket: "MC-REFU-104808",
    service: "Refuse",
    area: "Adelaide",
    status: "RESOLVED",
    priority: "LOW",
    technician: "Thabo Williams",
    resolutionHours: 18.4,
  },
  {
    id: 5,
    ticket: "MC-ELEC-104815",
    service: "Electricity",
    area: "Bedford",
    status: "OPEN",
    priority: "MEDIUM",
    technician: "Unassigned",
    resolutionHours: null,
  },
  {
    id: 6,
    ticket: "MC-ESKO-104817",
    service: "Eskom",
    area: "Fort Beaufort",
    status: "IN_PROGRESS",
    priority: "URGENT",
    technician: "Lwazi Nqoma",
    resolutionHours: 4.8,
  },
  {
    id: 7,
    ticket: "MC-WATE-104780",
    service: "Water",
    area: "Alice",
    status: "RESOLVED",
    priority: "MEDIUM",
    technician: "Nomsa Mbeki",
    resolutionHours: 9.5,
  },
  {
    id: 8,
    ticket: "MC-ELEC-104781",
    service: "Electricity",
    area: "Hogsback",
    status: "RESOLVED",
    priority: "HIGH",
    technician: "Ayanda Peterson",
    resolutionHours: 11.2,
  },
  {
    id: 9,
    ticket: "MC-REFU-104782",
    service: "Refuse",
    area: "Bedford",
    status: "IN_PROGRESS",
    priority: "LOW",
    technician: "Thabo Williams",
    resolutionHours: null,
  },
  {
    id: 10,
    ticket: "MC-SEWE-104783",
    service: "Sewerage",
    area: "Adelaide",
    status: "RESOLVED",
    priority: "HIGH",
    technician: "Noluthando Radebe",
    resolutionHours: 13.7,
  },
  {
    id: 11,
    ticket: "MC-FIRE-104784",
    service: "Fire Department",
    area: "Fort Beaufort",
    status: "RESOLVED",
    priority: "URGENT",
    technician: "Lwazi Nqoma",
    resolutionHours: 2.4,
  },
  {
    id: 12,
    ticket: "MC-ESKO-104785",
    service: "Eskom",
    area: "Alice",
    status: "OPEN",
    priority: "URGENT",
    technician: "Unassigned",
    resolutionHours: null,
  },
];

const serviceConfig = [
  {
    name: "Water",
    icon: <Droplets size={18} />,
    className: "water",
  },
  {
    name: "Sewerage",
    icon: <Waves size={18} />,
    className: "sewerage",
  },
  {
    name: "Electricity",
    icon: <Zap size={18} />,
    className: "electricity",
  },
  {
    name: "Refuse",
    icon: <Trash2 size={18} />,
    className: "refuse",
  },
  {
    name: "Fire Department",
    icon: <Flame size={18} />,
    className: "fire",
  },
  {
    name: "Eskom",
    icon: <Zap size={18} />,
    className: "eskom",
  },
];

const areas = [
  "All Areas",
  "Fort Beaufort",
  "Alice",
  "Hogsback",
  "Adelaide",
  "Bedford",
];

const services = [
  "All Services",
  "Water",
  "Sewerage",
  "Electricity",
  "Refuse",
  "Fire Department",
  "Eskom",
];

function Reports() {
  const navigate = useNavigate();

  const [period, setPeriod] = useState("30");
  const [serviceFilter, setServiceFilter] =
    useState("All Services");
  const [areaFilter, setAreaFilter] =
    useState("All Areas");

  const filteredTickets = useMemo(() => {
    return reportTickets.filter((ticket) => {
      const serviceMatch =
        serviceFilter === "All Services" ||
        ticket.service === serviceFilter;

      const areaMatch =
        areaFilter === "All Areas" ||
        ticket.area === areaFilter;

      return serviceMatch && areaMatch;
    });
  }, [serviceFilter, areaFilter]);

  const totalTickets = filteredTickets.length;

  const openTickets = filteredTickets.filter(
    (ticket) =>
      ticket.status === "OPEN" ||
      ticket.status === "ASSIGNED"
  ).length;

  const inProgress = filteredTickets.filter(
    (ticket) => ticket.status === "IN_PROGRESS"
  ).length;

  const resolved = filteredTickets.filter(
    (ticket) => ticket.status === "RESOLVED"
  ).length;

  const urgent = filteredTickets.filter(
    (ticket) => ticket.priority === "URGENT"
  ).length;

  const resolutionTimes = filteredTickets
    .filter(
      (ticket) =>
        typeof ticket.resolutionHours === "number"
    )
    .map((ticket) => ticket.resolutionHours);

  const averageResolution =
    resolutionTimes.length > 0
      ? (
          resolutionTimes.reduce(
            (sum, value) => sum + value,
            0
          ) / resolutionTimes.length
        ).toFixed(1)
      : "0.0";

  const serviceReport = serviceConfig.map(
    (service) => {
      const serviceTickets = filteredTickets.filter(
        (ticket) =>
          ticket.service === service.name
      );

      const serviceResolved =
        serviceTickets.filter(
          (ticket) =>
            ticket.status === "RESOLVED"
        ).length;

      const serviceUrgent =
        serviceTickets.filter(
          (ticket) =>
            ticket.priority === "URGENT"
        ).length;

      const resolutionValues =
        serviceTickets
          .filter(
            (ticket) =>
              typeof ticket.resolutionHours ===
              "number"
          )
          .map(
            (ticket) =>
              ticket.resolutionHours
          );

      const average =
        resolutionValues.length > 0
          ? (
              resolutionValues.reduce(
                (sum, value) =>
                  sum + value,
                0
              ) /
              resolutionValues.length
            ).toFixed(1)
          : "—";

      return {
        ...service,
        total: serviceTickets.length,
        resolved: serviceResolved,
        urgent: serviceUrgent,
        average,
      };
    }
  );

  const areaReport = areas
    .filter((area) => area !== "All Areas")
    .map((area) => {
      const areaTickets = filteredTickets.filter(
        (ticket) => ticket.area === area
      );

      const areaResolved =
        areaTickets.filter(
          (ticket) =>
            ticket.status === "RESOLVED"
        ).length;

      return {
        name: area,
        total: areaTickets.length,
        resolved: areaResolved,
        open:
          areaTickets.length -
          areaResolved,
      };
    });

  const technicians = [
    {
      name: "Lwazi Nqoma",
      assigned: 3,
      completed: 1,
      inProgress: 2,
      average: "3.6h",
    },
    {
      name: "Noluthando Radebe",
      assigned: 2,
      completed: 2,
      inProgress: 0,
      average: "10.4h",
    },
    {
      name: "Thabo Williams",
      assigned: 2,
      completed: 1,
      inProgress: 1,
      average: "18.4h",
    },
    {
      name: "Ayanda Peterson",
      assigned: 1,
      completed: 1,
      inProgress: 0,
      average: "11.2h",
    },
  ];

  const slaWithin =
    resolved > 0
      ? Math.round(
          (resolved / totalTickets) * 100
        )
      : 0;

  const slaApproaching =
    totalTickets > 0
      ? Math.round(
          (inProgress / totalTickets) * 100
        )
      : 0;

  const slaBreached =
    totalTickets > 0
      ? Math.max(
          0,
          100 - slaWithin - slaApproaching
        )
      : 0;

  const maxServiceTickets = Math.max(
    ...serviceReport.map(
      (service) => service.total
    ),
    1
  );

  const exportReport = () => {
    alert(
      "Report export will be connected to the backend later."
    );
  };

  return (
    <div className="admin-reports-page">
      {/* HEADER */}
      <header className="admin-reports-header">
        <div className="admin-reports-header-left">
          <button
            className="admin-reports-back"
            onClick={() =>
              navigate("/admin/dashboard")
            }
            title="Back to Admin Dashboard"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="admin-reports-breadcrumb">
              Admin / Reports & Analytics
            </div>

            <h1>Reports & Analytics</h1>

            <p>
              Monitor municipal service performance,
              tickets and SLA activity.
            </p>
          </div>
        </div>

        <button
          className="admin-reports-export"
          onClick={exportReport}
        >
          <Download size={17} />
          Export Report
        </button>
      </header>

      {/* MUNICIPALITY */}
      <div className="admin-reports-municipality">
        <div className="admin-reports-municipality-icon">
          <Building2 size={20} />
        </div>

        <div>
          <strong>
            Raymond Mhlaba Local Municipality
          </strong>

          <span>
            RMLM · Eastern Cape
          </span>
        </div>

        <div className="admin-reports-scope">
          Municipality Scoped
        </div>
      </div>

      {/* FILTERS */}
      <section className="admin-reports-filters">
        <div className="admin-reports-filter">
          <CalendarDays size={16} />

          <label>Reporting Period</label>

          <select
            value={period}
            onChange={(event) =>
              setPeriod(event.target.value)
            }
          >
            <option value="7">
              Last 7 Days
            </option>

            <option value="30">
              Last 30 Days
            </option>

            <option value="90">
              Last 90 Days
            </option>

            <option value="365">
              Last 12 Months
            </option>
          </select>
        </div>

        <div className="admin-reports-filter">
          <BarChart3 size={16} />

          <label>Service</label>

          <select
            value={serviceFilter}
            onChange={(event) =>
              setServiceFilter(
                event.target.value
              )
            }
          >
            {services.map((service) => (
              <option
                key={service}
                value={service}
              >
                {service}
              </option>
            ))}
          </select>
        </div>

        <div className="admin-reports-filter">
          <MapPin size={16} />

          <label>Area</label>

          <select
            value={areaFilter}
            onChange={(event) =>
              setAreaFilter(
                event.target.value
              )
            }
          >
            {areas.map((area) => (
              <option
                key={area}
                value={area}
              >
                {area}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* SUMMARY */}
      <section className="admin-reports-summary">
        <div className="admin-report-summary-card">
          <div className="admin-report-summary-icon tickets">
            <Ticket size={21} />
          </div>

          <div>
            <span>Total Tickets</span>
            <strong>{totalTickets}</strong>
            <small>
              Reporting period
            </small>
          </div>
        </div>

        <div className="admin-report-summary-card">
          <div className="admin-report-summary-icon open">
            <Clock3 size={21} />
          </div>

          <div>
            <span>Open Tickets</span>
            <strong>{openTickets}</strong>
            <small>
              Awaiting completion
            </small>
          </div>
        </div>

        <div className="admin-report-summary-card">
          <div className="admin-report-summary-icon progress">
            <TrendingUp size={21} />
          </div>

          <div>
            <span>In Progress</span>
            <strong>{inProgress}</strong>
            <small>
              Currently assigned
            </small>
          </div>
        </div>

        <div className="admin-report-summary-card">
          <div className="admin-report-summary-icon resolved">
            <CheckCircle2 size={21} />
          </div>

          <div>
            <span>Resolved</span>
            <strong>{resolved}</strong>
            <small>
              Completed tickets
            </small>
          </div>
        </div>

        <div className="admin-report-summary-card">
          <div className="admin-report-summary-icon urgent">
            <AlertTriangle size={21} />
          </div>

          <div>
            <span>Urgent</span>
            <strong>{urgent}</strong>
            <small>
              Priority tickets
            </small>
          </div>
        </div>

        <div className="admin-report-summary-card">
          <div className="admin-report-summary-icon time">
            <Clock3 size={21} />
          </div>

          <div>
            <span>Avg Resolution</span>
            <strong>
              {averageResolution}h
            </strong>
            <small>
              Completed tickets
            </small>
          </div>
        </div>
      </section>

      {/* SERVICE PERFORMANCE */}
      <section className="admin-reports-panel">
        <div className="admin-reports-panel-header">
          <div>
            <h2>Service Performance</h2>

            <p>
              Ticket volume and resolution by
              municipal service.
            </p>
          </div>

          <BarChart3 size={20} />
        </div>

        <div className="admin-service-report-list">
          {serviceReport.map((service) => (
            <div
              className="admin-service-report-row"
              key={service.name}
            >
              <div className="admin-service-report-name">
                <div
                  className={`admin-service-report-icon ${service.className}`}
                >
                  {service.icon}
                </div>

                <div>
                  <strong>
                    {service.name}
                  </strong>

                  <span>
                    {service.total} tickets
                  </span>
                </div>
              </div>

              <div className="admin-service-report-bar">
                <div
                  style={{
                    width: `${
                      (service.total /
                        maxServiceTickets) *
                      100
                    }%`,
                  }}
                />
              </div>

              <div className="admin-service-report-value">
                <strong>
                  {service.resolved}
                </strong>

                <span>
                  resolved
                </span>
              </div>

              <div className="admin-service-report-value urgent">
                <strong>
                  {service.urgent}
                </strong>

                <span>
                  urgent
                </span>
              </div>

              <div className="admin-service-report-value">
                <strong>
                  {service.average}
                </strong>

                <span>
                  avg. hours
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TWO COLUMN */}
      <section className="admin-reports-two-column">
        {/* SLA */}
        <div className="admin-reports-panel">
          <div className="admin-reports-panel-header">
            <div>
              <h2>SLA Performance</h2>

              <p>
                Ticket handling against SLA targets.
              </p>
            </div>

            <Clock3 size={20} />
          </div>

          <div className="admin-sla-content">
            <div className="admin-sla-ring">
              <div className="admin-sla-ring-inner">
                <strong>
                  {slaWithin}%
                </strong>

                <span>
                  Resolved
                </span>
              </div>
            </div>

            <div className="admin-sla-legend">
              <div>
                <span className="sla-dot within" />
                <span>
                  Within SLA
                </span>
                <strong>
                  {slaWithin}%
                </strong>
              </div>

              <div>
                <span className="sla-dot approaching" />
                <span>
                  Approaching SLA
                </span>
                <strong>
                  {slaApproaching}%
                </strong>
              </div>

              <div>
                <span className="sla-dot breached" />
                <span>
                  SLA Breached
                </span>
                <strong>
                  {slaBreached}%
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* AREAS */}
        <div className="admin-reports-panel">
          <div className="admin-reports-panel-header">
            <div>
              <h2>Area Performance</h2>

              <p>
                Tickets by municipal service area.
              </p>
            </div>

            <MapPin size={20} />
          </div>

          <div className="admin-area-report-list">
            {areaReport.map((area) => (
              <div
                className="admin-area-report-row"
                key={area.name}
              >
                <div className="admin-area-report-info">
                  <MapPin size={15} />

                  <strong>
                    {area.name}
                  </strong>
                </div>

                <div className="admin-area-report-stats">
                  <span>
                    {area.total} total
                  </span>

                  <span className="resolved">
                    {area.resolved} resolved
                  </span>

                  <span className="open">
                    {area.open} open
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNICIANS */}
      <section className="admin-reports-panel">
        <div className="admin-reports-panel-header">
          <div>
            <h2>Technician Performance</h2>

            <p>
              Assignment and resolution activity.
            </p>
          </div>

          <Users size={20} />
        </div>

        <div className="admin-technician-table-wrapper">
          <table className="admin-technician-table">
            <thead>
              <tr>
                <th>Technician</th>
                <th>Assigned</th>
                <th>Completed</th>
                <th>In Progress</th>
                <th>Avg. Resolution</th>
              </tr>
            </thead>

            <tbody>
              {technicians.map((technician) => (
                <tr key={technician.name}>
                  <td>
                    <div className="admin-technician-name">
                      <div>
                        {technician.name
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <strong>
                        {technician.name}
                      </strong>
                    </div>
                  </td>

                  <td>
                    {technician.assigned}
                  </td>

                  <td>
                    <span className="admin-table-success">
                      {technician.completed}
                    </span>
                  </td>

                  <td>
                    {technician.inProgress}
                  </td>

                  <td>
                    {technician.average}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* REPORT NOTE */}
      <div className="admin-reports-footer-note">
        <BarChart3 size={17} />

        <div>
          <strong>
            Reporting data
          </strong>

          <span>
            Current figures are demonstration data.
            Live reporting will be connected to the
            MuniConnect backend, ticket database and
            audit system during the Spring Boot/MariaDB
            phase.
          </span>
        </div>
      </div>
    </div>
  );
}

export default Reports;