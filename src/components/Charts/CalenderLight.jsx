import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the default styles for react-calendar

const CalendarLight = ({ selectedDate, onDateChange, highlightedDates }) => {
    console.log("highlightedDates", highlightedDates)

    // const isDateHighlighted = (date) => {
    //     const formattedDate = date.toISOString().split('T')[0];
    //     return highlightedDates.includes(formattedDate);
    // };

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


    // return (
    //     <div className="mt-8 rounded-lg max-w-xl">
    //         <h3 className="text-xl font-semibold text-gray-700 mb-6 text-start">Select a Date</h3>
    //         <Calendar
    //             onChange={onDateChange}
    //             value={selectedDate}
    //             tileClassName={({ date }) =>
    //                 isDateHighlighted(date) ? 'highlight' : ''
    //             }
    //             className="react-calendar border-none shadow-md rounded-lg"
    //             // tileDisabled={({ date }) => date.getDay() === 0 || date.getDay() === 6} // Disable weekends (optional)
    //         />
    //     </div>
    // );

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
