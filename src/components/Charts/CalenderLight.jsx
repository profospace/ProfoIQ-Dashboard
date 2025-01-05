import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the default styles for react-calendar

const CalendarLight = ({ selectedDate, onDateChange, highlightedDates }) => {
    console.log("highlightedDates", highlightedDates)

    const isDateHighlighted = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        return highlightedDates.includes(formattedDate);
    };

    return (
        <div className="mt-8 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-6 text-start">Select a Date</h3>
            <Calendar
                onChange={onDateChange}
                value={selectedDate}
                tileClassName={({ date }) =>
                    isDateHighlighted(date) ? 'highlight' : ''
                }
                className="react-calendar border-none shadow-md rounded-lg"
                // tileDisabled={({ date }) => date.getDay() === 0 || date.getDay() === 6} // Disable weekends (optional)
            />
        </div>
    );
};

export default CalendarLight;
