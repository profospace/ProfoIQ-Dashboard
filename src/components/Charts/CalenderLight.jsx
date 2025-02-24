import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the default styles for react-calendar

const CalendarLight = ({ selectedDate, onDateChange, highlightedDates }) => {
    console.log("highlightedDates", highlightedDates)

    const formatDateToYYYYMMDD = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const isDateHighlighted = (date) => {
        const formattedDate = formatDateToYYYYMMDD(date);
        return highlightedDates.includes(formattedDate);
    };


    return (
        <div className="w-full">
            <h3 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-200 sm:mb-6 sm:text-xl">
                Select a Date
            </h3>
            <Calendar
                onChange={onDateChange}
                value={selectedDate}
                tileClassName={({ date }) =>
                    isDateHighlighted(date) ? 'highlight' : ''
                }
                className="!w-full rounded-lg border-none shadow-sm dark:bg-boxdark"
            />
        </div>
    );
};

export default CalendarLight;
