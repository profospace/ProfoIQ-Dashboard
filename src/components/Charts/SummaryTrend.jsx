// import React, { useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
// } from 'chart.js';

// // Register required components
// ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

// function SummaryTrend({ singlePropertyStats, selectedDate }) {
//     const [view, setView] = useState('week'); // Default view is 'week'

//     // Helper function to process data based on the view
//     // const processData = (view) => {
//     //     const sortedStats = singlePropertyStats.sort((a, b) => new Date(a.date) - new Date(b.date));

//     //     if (view === 'selectedDate') {
//     //         // Filter data for the selected date
//     //         const filteredData = sortedStats.filter(
//     //             (stat) => new Date(stat.date).toDateString() === new Date(selectedDate).toDateString()
//     //         );

//     //         return {
//     //             labels: filteredData.map((stat) => stat.date),
//     //             datasets: [
//     //                 {
//     //                     label: 'Total Visits',
//     //                     data: filteredData.map((stat) => stat.stats.visits || 0),
//     //                     borderColor: 'rgba(75, 192, 192, 1)',
//     //                     backgroundColor: 'rgba(75, 192, 192, 0.2)',
//     //                 },
//     //                 {
//     //                     label: 'Total Contacts',
//     //                     data: filteredData.map((stat) => stat.stats.contacts || 0),
//     //                     borderColor: 'rgba(255, 99, 132, 1)',
//     //                     backgroundColor: 'rgba(255, 99, 132, 0.2)',
//     //                 },
//     //                 {
//     //                     label: 'Total Saves',
//     //                     data: filteredData.map((stat) => stat.stats.saves || 0),
//     //                     borderColor: 'rgba(54, 162, 235, 1)',
//     //                     backgroundColor: 'rgba(54, 162, 235, 0.2)',
//     //                 },
//     //             ],
//     //         };
//     //     }

//     //     if (view === '3days') {
//     //         // Show data for the most recent 3 days
//     //         const lastThreeDays = sortedStats.slice(-3);
//     //         return {
//     //             labels: lastThreeDays.map((stat) => stat.date),
//     //             datasets: [
//     //                 {
//     //                     label: 'Total Visits',
//     //                     data: lastThreeDays.map((stat) => stat.stats.visits || 0),
//     //                     borderColor: 'rgba(75, 192, 192, 1)',
//     //                     backgroundColor: 'rgba(75, 192, 192, 0.2)',
//     //                 },
//     //                 {
//     //                     label: 'Total Contacts',
//     //                     data: lastThreeDays.map((stat) => stat.stats.contacts || 0),
//     //                     borderColor: 'rgba(255, 99, 132, 1)',
//     //                     backgroundColor: 'rgba(255, 99, 132, 0.2)',
//     //                 },
//     //                 {
//     //                     label: 'Total Saves',
//     //                     data: lastThreeDays.map((stat) => stat.stats.saves || 0),
//     //                     borderColor: 'rgba(54, 162, 235, 1)',
//     //                     backgroundColor: 'rgba(54, 162, 235, 0.2)',
//     //                 },
//     //             ],
//     //         };
//     //     }

//     //     if (view === 'week') {
//     //         // Group by week
//     //         const groupedByWeek = sortedStats.reduce((acc, stat) => {
//     //             const week = `Week ${Math.ceil(new Date(stat.date).getDate() / 7)}`;
//     //             acc[week] = acc[week] || { visits: 0, contacts: 0, saves: 0 };
//     //             acc[week].visits += stat.stats.visits || 0;
//     //             acc[week].contacts += stat.stats.contacts || 0;
//     //             acc[week].saves += stat.stats.saves || 0;
//     //             return acc;
//     //         }, {});
//     //         return {
//     //             labels: Object.keys(groupedByWeek),
//     //             datasets: [
//     //                 {
//     //                     label: 'Total Visits',
//     //                     data: Object.values(groupedByWeek).map((v) => v.visits),
//     //                     borderColor: 'rgba(75, 192, 192, 1)',
//     //                     backgroundColor: 'rgba(75, 192, 192, 0.2)',
//     //                 },
//     //                 {
//     //                     label: 'Total Contacts',
//     //                     data: Object.values(groupedByWeek).map((v) => v.contacts),
//     //                     borderColor: 'rgba(255, 99, 132, 1)',
//     //                     backgroundColor: 'rgba(255, 99, 132, 0.2)',
//     //                 },
//     //                 {
//     //                     label: 'Total Saves',
//     //                     data: Object.values(groupedByWeek).map((v) => v.saves),
//     //                     borderColor: 'rgba(54, 162, 235, 1)',
//     //                     backgroundColor: 'rgba(54, 162, 235, 0.2)',
//     //                 },
//     //             ],
//     //         };
//     //     }

//     //     if (view === 'month') {
//     //         // Daily data for the month
//     //         return {
//     //             labels: sortedStats.map((stat) => stat.date),
//     //             datasets: [
//     //                 {
//     //                     label: 'Total Visits',
//     //                     data: sortedStats.map((stat) => stat.stats.visits || 0),
//     //                     borderColor: 'rgba(75, 192, 192, 1)',
//     //                     backgroundColor: 'rgba(75, 192, 192, 0.2)',
//     //                 },
//     //                 {
//     //                     label: 'Total Contacts',
//     //                     data: sortedStats.map((stat) => stat.stats.contacts || 0),
//     //                     borderColor: 'rgba(255, 99, 132, 1)',
//     //                     backgroundColor: 'rgba(255, 99, 132, 0.2)',
//     //                 },
//     //                 {
//     //                     label: 'Total Saves',
//     //                     data: sortedStats.map((stat) => stat.stats.saves || 0),
//     //                     borderColor: 'rgba(54, 162, 235, 1)',
//     //                     backgroundColor: 'rgba(54, 162, 235, 0.2)',
//     //                 },
//     //             ],
//     //         };
//     //     }

//     //     if (view === 'quarter') {
//     //         // Aggregate data by month for the quarter
//     //         const groupedByMonth = sortedStats.reduce((acc, stat) => {
//     //             const month = new Date(stat.date).toLocaleString('default', { month: 'short' });
//     //             acc[month] = acc[month] || { visits: 0, contacts: 0, saves: 0 };
//     //             acc[month].visits += stat.stats.visits || 0;
//     //             acc[month].contacts += stat.stats.contacts || 0;
//     //             acc[month].saves += stat.stats.saves || 0;
//     //             return acc;
//     //         }, {});
//     //         return {
//     //             labels: Object.keys(groupedByMonth),
//     //             datasets: [
//     //                 {
//     //                     label: 'Total Visits',
//     //                     data: Object.values(groupedByMonth).map((v) => v.visits),
//     //                     borderColor: 'rgba(75, 192, 192, 1)',
//     //                     backgroundColor: 'rgba(75, 192, 192, 0.2)',
//     //                 },
//     //                 {
//     //                     label: 'Total Contacts',
//     //                     data: Object.values(groupedByMonth).map((v) => v.contacts),
//     //                     borderColor: 'rgba(255, 99, 132, 1)',
//     //                     backgroundColor: 'rgba(255, 99, 132, 0.2)',
//     //                 },
//     //                 {
//     //                     label: 'Total Saves',
//     //                     data: Object.values(groupedByMonth).map((v) => v.saves),
//     //                     borderColor: 'rgba(54, 162, 235, 1)',
//     //                     backgroundColor: 'rgba(54, 162, 235, 0.2)',
//     //                 },
//     //             ],
//     //         };
//     //     }
//     // };

//     const processData = (view) => {
//         const sortedStats = singlePropertyStats.sort((a, b) => new Date(a.date) - new Date(b.date));

//         if (view === 'selectedDate') {
//             // Extract all details for the selected date
//             const filteredDetails = sortedStats
//                 .filter((stat) => new Date(stat.date).toDateString() === new Date(selectedDate).toDateString())
//                 .flatMap((stat) => stat.details);

//             // Group by hour
//             const hourlyData = {};
//             filteredDetails.forEach((detail) => {
//                 const hour = new Date(detail.timestamp).getHours(); // Extract hour
//                 const key = `${hour}:00`;

//                 // Initialize hourly stats if not present
//                 if (!hourlyData[key]) {
//                     hourlyData[key] = { visits: 0, contacts: 0, saves: 0 };
//                 }

//                 // Increment stats based on type
//                 if (detail.type === 'VISIT') hourlyData[key].visits += 1;
//                 if (detail.type === 'CONTACT') hourlyData[key].contacts += 1;
//                 if (detail.type === 'SAVE') hourlyData[key].saves += 1;
//             });

//             // Prepare x-axis labels (hours) and datasets
//             const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`); // Ensure all hours are present
//             const dataForChart = hours.map((hour) => ({
//                 hour,
//                 visits: hourlyData[hour]?.visits || 0,
//                 contacts: hourlyData[hour]?.contacts || 0,
//                 saves: hourlyData[hour]?.saves || 0,
//             }));

//             return {
//                 labels: dataForChart.map((d) => d.hour),
//                 datasets: [
//                     {
//                         label: 'Total Visits',
//                         data: dataForChart.map((d) => d.visits),
//                         borderColor: 'rgba(75, 192, 192, 1)',
//                         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                     },
//                     {
//                         label: 'Total Contacts',
//                         data: dataForChart.map((d) => d.contacts),
//                         borderColor: 'rgba(255, 99, 132, 1)',
//                         backgroundColor: 'rgba(255, 99, 132, 0.2)',
//                     },
//                     {
//                         label: 'Total Saves',
//                         data: dataForChart.map((d) => d.saves),
//                         borderColor: 'rgba(54, 162, 235, 1)',
//                         backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                     },
//                 ],
//             };
//         }

//         // Existing functionality for other views (week, month, quarter)
//         return {
//             labels: sortedStats.map((stat) => stat.date),
//             datasets: [
//                 {
//                     label: 'Total Visits',
//                     data: sortedStats.map((stat) => stat.stats.visits || 0),
//                     borderColor: 'rgba(75, 192, 192, 1)',
//                     backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                 },
//                 {
//                     label: 'Total Contacts',
//                     data: sortedStats.map((stat) => stat.stats.contacts || 0),
//                     borderColor: 'rgba(255, 99, 132, 1)',
//                     backgroundColor: 'rgba(255, 99, 132, 0.2)',
//                 },
//                 {
//                     label: 'Total Saves',
//                     data: sortedStats.map((stat) => stat.stats.saves || 0),
//                     borderColor: 'rgba(54, 162, 235, 1)',
//                     backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                 },
//             ],
//         };
//     };


//     const lineChartData = processData(view);

//     const lineChartOptions = {
//         responsive: true,
//         plugins: {
//             legend: { position: 'top' },
//             title: { display: true, text: `Trends - ${view.toUpperCase()} View` },
//         },
//     };

//     return (
//         <div>
//             {/* Tabs */}
//             <div className="flex space-x-4 mb-4 mt-8">
//                 {['selectedDate', '3days', 'week', 'month', 'quarter'].map((tab) => (
//                     <button
//                         key={tab}
//                         className={`px-4 py-2 rounded ${view === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//                         onClick={() => setView(tab)}
//                     >
//                         {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                     </button>
//                 ))}
//             </div>

//             {/* Chart */}
//             <div className="bg-white p-6 shadow rounded-lg w-full min-h-52">
//                 <Line data={lineChartData} options={lineChartOptions} />
//             </div>
//         </div>
//     );
// }

// export default SummaryTrend;


import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register required components
ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

function SummaryTrend({ singlePropertyStats, selectedDate }) {
    const [view, setView] = useState(selectedDate ? 'selectedDate' : 'week'); // Default to 'selectedDate' if available

    useEffect(() => {
        if (selectedDate) {
            setView('selectedDate'); // Automatically select 'SelectedDate' tab
        }
    }, [selectedDate]);

    const processData = (view) => {
        const sortedStats = singlePropertyStats.sort((a, b) => new Date(a.date) - new Date(b.date));

        if (view === 'selectedDate') {
            const filteredDetails = sortedStats
                .filter((stat) => new Date(stat.date).toDateString() === new Date(selectedDate).toDateString())
                .flatMap((stat) => stat.details);

            const hourlyData = {};
            filteredDetails.forEach((detail) => {
                const hour = new Date(detail.timestamp).getHours();
                const key = `${hour}:00`;

                if (!hourlyData[key]) {
                    hourlyData[key] = { visits: 0, contacts: 0, saves: 0 };
                }

                if (detail.type === 'VISIT') hourlyData[key].visits += 1;
                if (detail.type === 'CONTACT') hourlyData[key].contacts += 1;
                if (detail.type === 'SAVE') hourlyData[key].saves += 1;
            });

            const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
            const dataForChart = hours.map((hour) => ({
                hour,
                visits: hourlyData[hour]?.visits || 0,
                contacts: hourlyData[hour]?.contacts || 0,
                saves: hourlyData[hour]?.saves || 0,
            }));

            return {
                labels: dataForChart.map((d) => d.hour),
                datasets: [
                    {
                        label: 'Total Visits',
                        data: dataForChart.map((d) => d.visits),
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    },
                    {
                        label: 'Total Contacts',
                        data: dataForChart.map((d) => d.contacts),
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    },
                    {
                        label: 'Total Saves',
                        data: dataForChart.map((d) => d.saves),
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    },
                ],
            };
        }

        return {
            labels: sortedStats.map((stat) => stat.date),
            datasets: [
                {
                    label: 'Total Visits',
                    data: sortedStats.map((stat) => stat.stats.visits || 0),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: 'Total Contacts',
                    data: sortedStats.map((stat) => stat.stats.contacts || 0),
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                },
                {
                    label: 'Total Saves',
                    data: sortedStats.map((stat) => stat.stats.saves || 0),
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                },
            ],
        };
    };

    const lineChartData = processData(view);

    const lineChartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: `Trends - ${view.toUpperCase()} View` },
        },
    };

    return (
        <div>
            {/* Tabs */}
            <div className="flex space-x-4 mb-4 mt-8">
                {['selectedDate', '3days', 'week', 'month', 'quarter'].map((tab) => (
                    <button
                        key={tab}
                        className={`px-4 py-2 rounded ${view === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setView(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Chart */}
            <div className="bg-white p-6 shadow rounded-lg w-full min-h-52">
                <Line data={lineChartData} options={lineChartOptions} />
            </div>
        </div>
    );
}

export default SummaryTrend;
