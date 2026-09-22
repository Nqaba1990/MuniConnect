import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "../../styles/calendar.css";

function Calendar() {
  const navigate = useNavigate();

  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const firstDay = new Date(
    year,
    month,
    1
  ).getDay();

  const adjustedFirstDay =
    firstDay === 0 ? 6 : firstDay - 1;

  const days = [];

  for (let i = 0; i < adjustedFirstDay; i++) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const previousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const goToToday = () => {
    setMonth(today.getMonth());
    setYear(today.getFullYear());
  };

  return (
    <div className="calendar-page">

      {/* HEADER */}
      <header className="calendar-header">

        <div className="calendar-header-left">

          <button
            className="calendar-back-button"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="calendar-breadcrumb">
              Resident / Calendar
            </div>

            <h1>Community Calendar</h1>

            <p>
              View municipal and community events.
            </p>
          </div>

        </div>

        <button
          className="calendar-today-button"
          onClick={goToToday}
        >
          <CalendarDays size={17} />
          Today
        </button>

      </header>

      {/* CALENDAR */}
      <section className="calendar-main-card">

        <div className="calendar-toolbar">

          <button
            className="calendar-navigation-button"
            onClick={previousMonth}
          >
            <ChevronLeft size={20} />
          </button>

          <div className="calendar-month-title">

            <CalendarDays size={20} />

            <h2>
              {monthNames[month]} {year}
            </h2>

          </div>

          <button
            className="calendar-navigation-button"
            onClick={nextMonth}
          >
            <ChevronRight size={20} />
          </button>

        </div>

        {/* DAYS OF WEEK */}

        <div className="calendar-weekdays">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>

        {/* DAYS */}

        <div className="calendar-grid">

          {days.map((day, index) => {

            const isToday =
              day === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear();

            return (
              <div
                key={index}
                className={
                  day
                    ? isToday
                      ? "calendar-day today"
                      : "calendar-day"
                    : "calendar-day outside-month"
                }
              >

                {day && (
                  <div className="calendar-day-number">
                    {day}
                  </div>
                )}

              </div>
            );
          })}

        </div>

      </section>

    </div>
  );
}

export default Calendar;