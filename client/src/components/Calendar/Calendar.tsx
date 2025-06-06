import Calendar from "react-calendar";
import { useState, useEffect } from "react";
import { mockApplications } from "../../data/mockdata";
import { Link } from "react-router-dom";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarModal = () => {
  const [selectedJobs, setSelectedJobs] = useState<typeof mockApplications>([]);
  const [isAppModalOpen, setApplicationModalOpen] = useState(false);
  const [isCalendarModalOpen, setCalendarModalOpen] = useState(true);
  const [selectedDay, onChange] = useState<Value>(new Date());
  console.log(selectedDay);

  const hasDeadline = (date: Date) => {
    return mockApplications.some((app) => {
      const deadlineDate = new Date(app.deadline);
      return (
        deadlineDate.getFullYear() === date.getFullYear() &&
        deadlineDate.getMonth() === date.getMonth() &&
        deadlineDate.getDate() === date.getDate()
      );
    });
  };

  const monthWithDeadline = (date: Date) => {
    return mockApplications.some((app) => {
      const deadline = new Date(app.deadline);
      return deadline.getFullYear() === date.getFullYear() && deadline.getMonth() === date.getMonth();
    });
  };

  const handleDayClick = (date: Date) => {
    const matchingJobs = mockApplications.filter((app) => {
      const deadlineDate = new Date(app.deadline);
      return (
        deadlineDate.getFullYear() === date.getFullYear() &&
        deadlineDate.getMonth() === date.getMonth() &&
        deadlineDate.getDate() === date.getDate()
      );
    });

    if (matchingJobs.length > 0) {
      setSelectedJobs(matchingJobs);
      setApplicationModalOpen(true);
      setCalendarModalOpen(false);
    }
  };

  useEffect(() => {
    if (isAppModalOpen) {
      document.documentElement.classList.add("modal-open");
    } else {
      document.documentElement.classList.remove("modal-open");
    }
  }, [isAppModalOpen]);

  return (
    <div>
      {isCalendarModalOpen && (
        <dialog id="calendarModal" className="modal p-2">
          <div className="modal-box w-full max-w-2xl p-2">
            <div className="flex justify-center p-4 rounded-lg shadow-md border border-gray-300 bg-white">
              <Calendar
                onChange={onChange}
                value={selectedDay}
                className="react-calendar calendar-big "
                minDetail="year"
                tileContent={({ date, view }) => {
                  if (view === "month" && hasDeadline(date)) {
                    return (
                      <div className="flex justify-center items-center mt-1">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                      </div>
                    );
                  }
                  if (view === "year" && monthWithDeadline(date)) {
                    return (
                      <div className="flex justify-center items-center mt-1">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                      </div>
                    );
                  }
                  return null;
                }}
                onClickDay={handleDayClick}
                next2Label={null}
                prev2Label={null}
                showNeighboringMonth={false}
              />
            </div>
            <div className="modal-action flex justify-end px-2">
              <form method="dialog">
                <button className="btn px-10">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      )}

      {isAppModalOpen && (
        <div className="modal modal-open p-4">
          <div className="modal-box max-w-md w-full bg-white rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Job(s) with Deadline</h3>
            {selectedJobs.map((job, index) => (
              <div key={index} className="border-b py-2">
                <p>
                  <strong>Company:</strong> {job.company}
                </p>
                <p>
                  <strong>Position:</strong> {job.position}
                </p>
                <p>
                  <strong>Description:</strong> {job.jobDescription}
                </p>
                <p>
                  <strong>Status:</strong> {job.status}
                </p>
                <Link
                  to={`/application/${job.id}`}
                  onClick={() => {
                    setApplicationModalOpen(false);
                    setCalendarModalOpen(true);
                  }}
                >
                  <strong className="underline">View More</strong>
                </Link>
              </div>
            ))}
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => {
                  setCalendarModalOpen(true);
                  setApplicationModalOpen(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarModal;
