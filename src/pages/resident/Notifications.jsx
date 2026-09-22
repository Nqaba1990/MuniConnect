import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Ticket,
  Info,
  Trash2,
  Check,
  CheckCheck,
  X,
  CalendarDays,
} from "lucide-react";

import "../../styles/notifications.css";

const initialNotifications = [
  {
    id: 1,
    type: "ALERT",
    title: "Water Supply Interruption",
    message:
      "Residents in Fort Beaufort may experience reduced water pressure due to maintenance on the main supply line.",
    date: "Today, 09:15",
    read: false,
    priority: "HIGH",
    action: "alert",
  },
  {
    id: 2,
    type: "TICKET",
    title: "Ticket Status Updated",
    message:
      "Your electricity fault report MC-ELEC-483921 has been assigned to a technician.",
    date: "Today, 08:42",
    read: false,
    priority: "NORMAL",
    ticketId: "MC-ELEC-483921",
    action: "ticket",
  },
  {
    id: 3,
    type: "TICKET",
    title: "Fault Report Received",
    message:
      "Your water fault report MC-WATE-729104 has been successfully received.",
    date: "Yesterday, 16:20",
    read: true,
    priority: "NORMAL",
    ticketId: "MC-WATE-729104",
    action: "ticket",
  },
  {
    id: 4,
    type: "SERVICE",
    title: "Refuse Collection Update",
    message:
      "Refuse collection in your area will take place one hour later than normal tomorrow.",
    date: "15 Sep 2026, 14:30",
    read: false,
    priority: "NORMAL",
    action: "service",
  },
  {
    id: 5,
    type: "ALERT",
    title: "Community Safety Notice",
    message:
      "Residents are reminded to report emergencies to the appropriate emergency services.",
    date: "12 Sep 2026, 10:05",
    read: true,
    priority: "HIGH",
    action: "alert",
  },
  {
    id: 6,
    type: "SYSTEM",
    title: "Welcome to MuniConnect",
    message:
      "Your MuniConnect resident account is active. You can now report faults and track your service requests.",
    date: "10 Sep 2026, 08:00",
    read: true,
    priority: "NORMAL",
    action: "system",
  },
];

function Notifications() {
  const navigate = useNavigate();

  const [notifications, setNotifications] =
    useState(initialNotifications);

  const [filter, setFilter] = useState("ALL");

  const [selectedNotification, setSelectedNotification] =
    useState(null);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const filteredNotifications = useMemo(() => {
    if (filter === "UNREAD") {
      return notifications.filter(
        (notification) => !notification.read
      );
    }

    if (filter === "ALERTS") {
      return notifications.filter(
        (notification) =>
          notification.type === "ALERT"
      );
    }

    if (filter === "TICKETS") {
      return notifications.filter(
        (notification) =>
          notification.type === "TICKET"
      );
    }

    return notifications;
  }, [notifications, filter]);

  const getIcon = (notification) => {
    if (notification.type === "ALERT") {
      return <AlertTriangle size={20} />;
    }

    if (notification.type === "TICKET") {
      return <Ticket size={20} />;
    }

    if (notification.type === "SERVICE") {
      return <CalendarDays size={20} />;
    }

    return <Info size={20} />;
  };

  const getIconClass = (notification) => {
    if (notification.type === "ALERT") {
      return "notification-icon-alert";
    }

    if (notification.type === "TICKET") {
      return "notification-icon-ticket";
    }

    if (notification.type === "SERVICE") {
      return "notification-icon-service";
    }

    return "notification-icon-system";
  };

  const markAsRead = (id) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification
      )
    );
  };

  const markAsUnread = (id) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: false,
            }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((previous) =>
      previous.filter(
        (notification) =>
          notification.id !== id
      )
    );

    if (
      selectedNotification?.id === id
    ) {
      setSelectedNotification(null);
    }
  };

  const clearAllNotifications = () => {
    const confirmed = window.confirm(
      "Delete all notifications?"
    );

    if (!confirmed) return;

    setNotifications([]);
    setSelectedNotification(null);
  };

  const openNotification = (notification) => {
    markAsRead(notification.id);
    setSelectedNotification(notification);
  };

  const handleNotificationAction = (
    notification
  ) => {
    markAsRead(notification.id);

    if (
      notification.action === "ticket" &&
      notification.ticketId
    ) {
      setSelectedNotification(null);

      navigate(
        `/tickets/${notification.ticketId}`
      );

      return;
    }

    setSelectedNotification(notification);
  };

  return (
    <div className="notifications-page">
      <header className="notifications-header">
        <div className="notifications-header-left">
          <button
            className="notifications-back-button"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="notifications-breadcrumb">
              Resident / Notifications
            </div>

            <h1>Notifications</h1>

            <p>
              Stay updated with municipal services,
              alerts and your reported faults.
            </p>
          </div>
        </div>

        <div className="notifications-header-actions">
          {unreadCount > 0 && (
            <button
              className="notifications-mark-all"
              onClick={markAllAsRead}
            >
              <CheckCheck size={16} />
              Mark All as Read
            </button>
          )}

          {notifications.length > 0 && (
            <button
              className="notifications-clear-button"
              onClick={clearAllNotifications}
            >
              <Trash2 size={16} />
              Clear All
            </button>
          )}
        </div>
      </header>

      <section className="notifications-summary">
        <div className="notifications-summary-icon">
          <Bell size={23} />
        </div>

        <div>
          <span>Notifications</span>

          <strong>
            {unreadCount} unread
          </strong>

          <p>
            You have {notifications.length} total
            notifications.
          </p>
        </div>
      </section>

      <section className="notifications-panel">
        <div className="notifications-panel-header">
          <div>
            <h2>Updates</h2>

            <p>
              Notifications for your MuniConnect
              account.
            </p>
          </div>

          <div className="notifications-filters">
            <button
              className={
                filter === "ALL"
                  ? "notification-filter active"
                  : "notification-filter"
              }
              onClick={() =>
                setFilter("ALL")
              }
            >
              All
            </button>

            <button
              className={
                filter === "UNREAD"
                  ? "notification-filter active"
                  : "notification-filter"
              }
              onClick={() =>
                setFilter("UNREAD")
              }
            >
              Unread
              {unreadCount > 0 && (
                <span>{unreadCount}</span>
              )}
            </button>

            <button
              className={
                filter === "ALERTS"
                  ? "notification-filter active"
                  : "notification-filter"
              }
              onClick={() =>
                setFilter("ALERTS")
              }
            >
              Alerts
            </button>

            <button
              className={
                filter === "TICKETS"
                  ? "notification-filter active"
                  : "notification-filter"
              }
              onClick={() =>
                setFilter("TICKETS")
              }
            >
              Tickets
            </button>
          </div>
        </div>

        <div className="notifications-list">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map(
              (notification) => (
                <div
                  key={notification.id}
                  className={
                    notification.read
                      ? "notification-item"
                      : "notification-item unread"
                  }
                >
                  <div
                    className={`notification-type-icon ${getIconClass(
                      notification
                    )}`}
                  >
                    {getIcon(notification)}
                  </div>

                  <div className="notification-content">
                    <div className="notification-title-row">
                      <div>
                        <h3>
                          {notification.title}
                        </h3>

                        {!notification.read && (
                          <span className="notification-unread-dot">
                            New
                          </span>
                        )}
                      </div>

                      <span className="notification-date">
                        {notification.date}
                      </span>
                    </div>

                    <p>
                      {notification.message}
                    </p>

                    <div className="notification-meta">
                      <span
                        className={`notification-type-badge type-${notification.type.toLowerCase()}`}
                      >
                        {notification.type}
                      </span>

                      {notification.priority ===
                        "HIGH" && (
                        <span className="notification-high-priority">
                          High Priority
                        </span>
                      )}

                      {notification.ticketId && (
                        <span>
                          {notification.ticketId}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="notification-actions">
                    <button
                      title="Open"
                      onClick={() =>
                        handleNotificationAction(
                          notification
                        )
                      }
                    >
                      <Info size={15} />
                    </button>

                    <button
                      title={
                        notification.read
                          ? "Mark as unread"
                          : "Mark as read"
                      }
                      onClick={() =>
                        notification.read
                          ? markAsUnread(
                              notification.id
                            )
                          : markAsRead(
                              notification.id
                            )
                      }
                    >
                      {notification.read ? (
                        <Bell size={15} />
                      ) : (
                        <Check size={15} />
                      )}
                    </button>

                    <button
                      className="notification-delete"
                      title="Delete"
                      onClick={() =>
                        deleteNotification(
                          notification.id
                        )
                      }
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              )
            )
          ) : (
            <div className="notifications-empty">
              <div className="notifications-empty-icon">
                <Bell size={30} />
              </div>

              <h3>
                No notifications
              </h3>

              <p>
                There are no notifications in this
                category.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="notifications-security">
        <ShieldIcon />

        <div>
          <strong>
            Municipality notifications
          </strong>

          <p>
            You are only shown alerts and service
            updates associated with your registered
            municipality.
          </p>
        </div>
      </section>

      {selectedNotification && (
        <div className="notification-modal-overlay">
          <div className="notification-modal">
            <div className="notification-modal-header">
              <div
                className={`notification-type-icon ${getIconClass(
                  selectedNotification
                )}`}
              >
                {getIcon(selectedNotification)}
              </div>

              <button
                className="notification-modal-close"
                onClick={() =>
                  setSelectedNotification(null)
                }
              >
                <X size={19} />
              </button>
            </div>

            <div className="notification-modal-body">
              <div className="notification-modal-type">
                {selectedNotification.type}
              </div>

              <h2>
                {selectedNotification.title}
              </h2>

              <p>
                {selectedNotification.message}
              </p>

              <div className="notification-modal-details">
                <div>
                  <span>Date</span>
                  <strong>
                    {selectedNotification.date}
                  </strong>
                </div>

                <div>
                  <span>Priority</span>
                  <strong>
                    {selectedNotification.priority}
                  </strong>
                </div>

                {selectedNotification.ticketId && (
                  <div>
                    <span>Ticket</span>
                    <strong>
                      {selectedNotification.ticketId}
                    </strong>
                  </div>
                )}
              </div>
            </div>

            <div className="notification-modal-footer">
              {selectedNotification.ticketId && (
                <button
                  className="notification-modal-primary"
                  onClick={() => {
                    const ticketId =
                      selectedNotification.ticketId;

                    setSelectedNotification(null);

                    navigate(
                      `/tickets/${ticketId}`
                    );
                  }}
                >
                  <Ticket size={16} />
                  View Ticket
                </button>
              )}

              <button
                className="notification-modal-secondary"
                onClick={() =>
                  setSelectedNotification(null)
                }
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ShieldIcon() {
  return (
    <div className="notifications-security-icon">
      <CheckCircle2 size={20} />
    </div>
  );
}

export default Notifications;