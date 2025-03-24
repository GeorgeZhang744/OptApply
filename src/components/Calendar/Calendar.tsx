import Calendar from 'react-calendar';
import { useState } from 'react';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarModal = () => {
    

    const [selectedDay, onChange] = useState<Value>(new Date());
    //console.log(selectedDay);
    
  return (

    <dialog id="calendarModal" className="modal">
        <div className="modal-box mx-auto my-auto">
           

            <div className="p-4 rounded-lg shadow-md border border-gray-300 bg-white">
                <Calendar
                    onChange={onChange}
                    value={selectedDay}
                    className="react-calendar"
                />
            </div>

        
            <div className="modal-action">
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
            </form>
            </div>
        </div>
    </dialog>
  );

};

export default CalendarModal;
