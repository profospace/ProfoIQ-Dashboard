import React, { useState } from 'react';

const EventCard = ({ date, time, title, description, dateRange }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex mb-4">
            {/* Left side with date/time */}
            <div className="flex flex-col items-center justify-center px-3 py-3 bg-gray-100 min-w-16 text-center">
                <div className="text-xs font-semibold text-gray-500">{dateRange}</div>
                <div className="text-xl font-bold text-gray-800">{time}</div>
            </div>

            {/* Right side with content */}
            <div className="p-4 flex-grow">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-semibold text-gray-800">{title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{description}</p>
                    </div>

                    {/* Add to calendar button */}
                    <button className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add to calendar
                    </button>
                </div>
            </div>
        </div>
    );
};

const EventCardDemo = () => {
    // Events data matching the screenshot
    const events = [
        {
            id: 1,
            dateRange: "TODAY",
            time: "17:00",
            title: "Bergen International Film Festival",
            description: "Films from all over the world gather all film enthusiasts for unique moments at the Bergen International Film Festival."
        },
        {
            id: 2,
            dateRange: "22 - 31 OCT",
            time: "10:00",
            title: "Wool week",
            description: "ULLVEKA 2021 will be held for the eighth time in the period 22 - 31 October 2021, and will take place in the entire Bergen region."
        },
        {
            id: 3,
            dateRange: "22 - 31 OCT",
            time: "19:00",
            title: "Light park at Bergenhus Fortress",
            description: "LUMINA - a magical experience for young and old at Bergenhus Fortress, 12 November to 15 December 2021."
        },
        {
            id: 4,
            dateRange: "13 - 31 DEC",
            time: "10:00",
            title: "Gingerbread City 2021",
            description: "The world's largest Gingerbread Town can be found in the Xhibition shopping center, right in the center of Bergen."
        }
    ];

    return (
        <div className="max-w-xl mx-auto p-4 bg-gray-100">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Events</h1>

            {events.map(event => (
                <EventCard
                    key={event.id}
                    dateRange={event.dateRange}
                    time={event.time}
                    title={event.title}
                    description={event.description}
                />
            ))}
        </div>
    );
};

export default EventCardDemo;