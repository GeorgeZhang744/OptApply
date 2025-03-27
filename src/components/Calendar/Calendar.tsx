import Calendar from 'react-calendar';
import { useState } from 'react';
import { mockApplications } from '../../data/mockdata';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];


const CalendarModal = () => {

    const [selectedJobs, setSelectedJobs] = useState<typeof mockApplications>([]);
    const [isAppModalOpen, setApplicationModalOpen] = useState(false);
    const [isCalendarModalOpen, setCalendarModalOpen] = useState(true);
    const [selectedDay, onChange] = useState<Value>(new Date());
    console.log(selectedDay);

    const hasDeadline = (date: Date) => {
        return mockApplications.some(app => {
            const deadlineDate = new Date(app.deadline);
            return (
                deadlineDate.getFullYear() === date.getFullYear() &&
                deadlineDate.getMonth() === date.getMonth() &&
                deadlineDate.getDate() === date.getDate()
            );
        });
      };

      const handleDayClick = (date: Date) => {
        const matchingJobs = mockApplications.filter(app => {
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
    
  return (
    <div>
        {isCalendarModalOpen && (
            <dialog id="calendarModal" className="modal">
                <div className="modal-box mx-auto my-auto">
                    <div className="p-4 rounded-lg shadow-md border border-gray-300 bg-white">
                        <Calendar
                            onChange={onChange}
                            value={selectedDay}
                            className="react-calendar"
                            minDetail="year"
                            tileContent={({ date, view }) =>
                                view === "month" && hasDeadline(date) ? (
                                <div className="flex justify-center items-center mt-1">
                                    <div className="w-2 h-2 rounded-full bg-red-500" />
                                </div>
                                ) : null
                            }
                            onClickDay={handleDayClick}
                        />
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        )}


        {isAppModalOpen && (
            <dialog open className="modal flex items-center justify-center">
                <div className="modal-box max-w-md w-full bg-white rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">Job(s) with Deadline</h3>
                    {selectedJobs.map((job, index) => (
                        <div key={index} className="border-b py-2">
                            <p><strong>Company:</strong> {job.company}</p>
                            <p><strong>Position:</strong> {job.position}</p>
                            <p><strong>Description:</strong> {job.jobDescription}</p>
                            <p><strong>Status:</strong> {job.status}</p>
                        </div>
                    ))}

                    <div className="modal-action mt-4">
                        <button className="btn btn-primary btn-sm" onClick={() => {
                            setApplicationModalOpen(false);
                            setCalendarModalOpen(true);
                        }}>Close</button>
                    </div>
                </div>
            </dialog>
        )}
    </div>
  );

};

export default CalendarModal;
