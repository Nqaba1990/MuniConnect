import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  History,
  CheckCircle2,
  Clock3,
  MapPin,
  Eye,
  Zap,
  Droplets,
  Trash2,
  Flame,
  Construction,
  ChevronDown,
} from "lucide-react";

import "../../styles/technician-job-history.css";

const COMPLETED_JOBS = [
  {
    id: "104790",
    ticketNumber: "MC-WATE-104790",
    title: "Water Leak Repair",
    service: "Water",
    location: "Fort Beaufort",
    resident: "Sipho Dlamini",
    priority: "HIGH",
    status: "COMPLETED",
    completedAt: "23 September 2026, 13:45",
    resolution:
      "Damaged section of water pipe replaced and supply restored.",
    icon: Droplets,
  },
  {
    id: "104781",
    ticketNumber: "MC-REFU-104781",
    title: "Missed Refuse Collection",
    service: "Refuse",
    location: "Adelaide",
    resident: "Ayanda Peterson",
    priority: "LOW",
    status: "COMPLETED",
    completedAt: "22 September 2026, 16:20",
    resolution:
      "Collection vehicle dispatched and outstanding refuse collected.",
    icon: Trash2,
  },
  {
    id: "104774",
    ticketNumber: "MC-ELEC-104774",
    title: "Streetlight Repair",
    service: "Electricity",
    location: "Bedford",
    resident: "Lwazi Mbeki",
    priority: "MEDIUM",
    status: "COMPLETED",
    completedAt: "22 September 2026, 14:05",
    resolution:
      "Faulty streetlight fitting replaced and light tested successfully.",
    icon: Construction,
  },
  {
    id: "104762",
    ticketNumber: "MC-FIRE-104762",
    title: "Fire Hydrant Inspection",
    service: "Fire Department",
    location: "Alice",
    resident: "Nomsa Mbeki",
    priority: "URGENT",
    status: "RESOLVED",
    completedAt: "21 September 2026, 11:35",
    resolution:
      "Hydrant inspected and temporary repair completed. Permanent replacement scheduled.",
    icon: Flame,
  },
  {
    id: "104751",
    ticketNumber: "MC-ESKO-104751",
    title: "Power Supply Investigation",
    service: "Eskom",
    location: "Fort Beaufort",
    resident: "Noluthando Radebe",
    priority: "URGENT",
    status: "COMPLETED",
    completedAt: "20 September 2026, 18:10",
    resolution:
      "Supply fault identified and Eskom fault reference updated on the ticket.",
    icon: Zap,
  },
  {
    id: "104738",
    ticketNumber: "MC-WATE-104738",
    title: "Low Water Pressure",
    service: "Water",
    location: "Hogsback",
    resident: "Thabo Williams",
    priority: "MEDIUM",
    status: "COMPLETED",
    completedAt: "19 September 2026, 15:30",
    resolution:
      "Pressure issue investigated and valve adjustment restored normal pressure.",
    icon: Droplets,
  },
];

function JobHistory() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredJobs = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return COMPLETED_JOBS.filter((job) => {
      const matchesSearch =
        !searchValue ||
        job.ticketNumber.toLowerCase().includes(searchValue) ||
        job.title.toLowerCase().includes(searchValue) ||
        job.location.toLowerCase().includes(searchValue) ||
        job.resident.toLowerCase().includes(searchValue);

      const matchesService =
        serviceFilter === "ALL" || job.service === serviceFilter;

      const matchesStatus =
        statusFilter === "ALL" || job.status === statusFilter;

      return matchesSearch && matchesService && matchesStatus;
    });
  }, [search, serviceFilter, statusFilter]);

  const totalJobs = COMPLETED_JOBS.length;
  const completedJobs = COMPLETED_JOBS.filter(
    (job) => job.status === "COMPLETED"
  ).length;
  const resolvedJobs = COMPLETED_JOBS.filter(
    (job) => job.status === "RESOLVED"
  ).length;
  const urgentJobs = COMPLETED_JOBS.filter(
    (job) => job.priority === "URGENT"
  ).length;

  const getPriorityClass = (priority) =>
    `history-priority history-priority-${priority.toLowerCase()}`;

  const getStatusClass = (status) =>
    `history-status history-status-${status.toLowerCase()}`;

  return (
    <div className="technician-history-page">
      <header className="technician-history-header">
        <div className="technician-history-header-left">
          <button
            className="technician-history-back"
            onClick={() => navigate("/technician/dashboard")}
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="technician-history-breadcrumb">
              Technician / Job History
            </div>

            <h1>Job History</h1>

            <p>
              Review jobs previously resolved or completed by the technician.
            </p>
          </div>
        </div>
      </header>

      <main className="technician-history-content">
        <section className="technician-history-stats">
          <div className="history-stat-card">
            <div className="history-stat-icon">
              <History size={21} />
            </div>

            <div>
              <span>Total Jobs</span>
              <strong>{totalJobs}</strong>
            </div>
          </div>

          <div className="history-stat-card">
            <div className="history-stat-icon completed">
              <CheckCircle2 size={21} />
            </div>

            <div>
              <span>Completed</span>
              <strong>{completedJobs}</strong>
            </div>
          </div>

          <div className="history-stat-card">
            <div className="history-stat-icon resolved">
              <Clock3 size={21} />
            </div>

            <div>
              <span>Resolved</span>
              <strong>{resolvedJobs}</strong>
            </div>
          </div>

          <div className="history-stat-card">
            <div className="history-stat-icon urgent">
              <Zap size={21} />
            </div>

            <div>
              <span>Urgent Jobs</span>
              <strong>{urgentJobs}</strong>
            </div>
          </div>
        </section>

        <section className="technician-history-card">
          <div className="history-toolbar">
            <div className="history-search">
              <Search size={18} />

              <input
                type="text"
                placeholder="Search ticket, resident, location..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <div className="history-filter">
              <select
                value={serviceFilter}
                onChange={(event) => setServiceFilter(event.target.value)}
              >
                <option value="ALL">All Services</option>
                <option value="Water">Water</option>
                <option value="Electricity">Electricity</option>
                <option value="Refuse">Refuse</option>
                <option value="Fire Department">Fire Department</option>
                <option value="Eskom">Eskom</option>
              </select>

              <ChevronDown size={16} />
            </div>

            <div className="history-filter">
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="ALL">All Statuses</option>
                <option value="COMPLETED">Completed</option>
                <option value="RESOLVED">Resolved</option>
              </select>

              <ChevronDown size={16} />
            </div>
          </div>

          <div className="history-results-bar">
            <div>
              <strong>{filteredJobs.length}</strong> jobs found
            </div>

            {(search ||
              serviceFilter !== "ALL" ||
              statusFilter !== "ALL") && (
              <button
                onClick={() => {
                  setSearch("");
                  setServiceFilter("ALL");
                  setStatusFilter("ALL");
                }}
              >
                Clear Filters
              </button>
            )}
          </div>

          <div className="history-job-list">
            {filteredJobs.length === 0 ? (
              <div className="history-empty">
                <History size={34} />
                <h3>No jobs found</h3>
                <p>
                  Try changing your search or filter selections.
                </p>
              </div>
            ) : (
              filteredJobs.map((job) => {
                const ServiceIcon = job.icon;

                return (
                  <div className="history-job-row" key={job.id}>
                    <div className="history-service-icon">
                      <ServiceIcon size={21} />
                    </div>

                    <div className="history-job-main">
                      <div className="history-job-title-row">
                        <div>
                          <span className="history-ticket-number">
                            {job.ticketNumber}
                          </span>

                          <h3>{job.title}</h3>
                        </div>

                        <div className="history-badges">
                          <span
                            className={getPriorityClass(job.priority)}
                          >
                            {job.priority}
                          </span>

                          <span className={getStatusClass(job.status)}>
                            {job.status}
                          </span>
                        </div>
                      </div>

                      <div className="history-job-meta">
                        <span>{job.service}</span>

                        <span>
                          <MapPin size={14} />
                          {job.location}
                        </span>

                        <span>{job.resident}</span>
                      </div>

                      <div className="history-resolution">
                        <strong>Resolution:</strong> {job.resolution}
                      </div>

                      <div className="history-completed-date">
                        <CheckCircle2 size={14} />
                        {job.status === "COMPLETED"
                          ? "Completed"
                          : "Resolved"}{" "}
                        {job.completedAt}
                      </div>
                    </div>

                    <button
                      className="history-view-button"
                      onClick={() =>
                        navigate(`/technician/jobs/${job.id}`)
                      }
                    >
                      <Eye size={16} />
                      View
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default JobHistory;