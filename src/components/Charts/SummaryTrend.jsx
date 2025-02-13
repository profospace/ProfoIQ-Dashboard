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


// import React, { useState, useEffect } from 'react';
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

// function SummaryTrend({ singlePropertyStats, selectedDate, lineChartRef }) {
//     const [view, setView] = useState(selectedDate ? 'selectedDate' : 'week'); // Default to 'selectedDate' if available

//     useEffect(() => {
//         if (selectedDate) {
//             setView('selectedDate'); // Automatically select 'SelectedDate' tab
//         }
//     }, [selectedDate]);

//     const processData = (view) => {
//         const sortedStats = singlePropertyStats.sort((a, b) => new Date(a.date) - new Date(b.date));

//         if (view === 'selectedDate') {
//             const filteredDetails = sortedStats
//                 .filter((stat) => new Date(stat.date).toDateString() === new Date(selectedDate).toDateString())
//                 .flatMap((stat) => stat.details);

//             const hourlyData = {};
//             filteredDetails.forEach((detail) => {
//                 const hour = new Date(detail.timestamp).getHours();
//                 const key = `${hour}:00`;

//                 if (!hourlyData[key]) {
//                     hourlyData[key] = { visits: 0, contacts: 0, saves: 0 };
//                 }

//                 if (detail.type === 'VISIT') hourlyData[key].visits += 1;
//                 if (detail.type === 'CONTACT') hourlyData[key].contacts += 1;
//                 if (detail.type === 'SAVE') hourlyData[key].saves += 1;
//             });

//             const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
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

//     // return (
//     //     <div>
//     //         {/* Tabs */}
//     //         <div className="flex space-x-4 mb-4 mt-8" >
//     //             {['selectedDate', '3days', 'week', 'month', 'quarter'].map((tab) => (
//     //                 <button
//     //                     key={tab}
//     //                     className={`px-4 py-2 rounded ${view === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//     //                     onClick={() => setView(tab)}
//     //                 >
//     //                     {tab.charAt(0).toUpperCase() + tab.slice(1)}
//     //                 </button>
//     //             ))}
//     //         </div>

//     //         {/* Chart */}
//     //         <div className="bg-white p-6 shadow rounded-lg w-full min-h-52" ref={lineChartRef}>
//     //             <Line data={lineChartData} options={lineChartOptions} />
//     //         </div>
//     //     </div>
//     // );

//     return (
//     <div className="space-y-4">
//         {/* Responsive Tabs */}
//         <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:space-x-4">
//             {['selectedDate', '3days', 'week', 'month', 'quarter'].map((tab) => (
//                 <button
//                     key={tab}
//                     className={`rounded px-3 py-2 text-sm transition-colors duration-200 sm:px-4 
//               ${view === tab
//                             ? 'bg-primary text-white dark:bg-blue-600'
//                             : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
//                         }`}
//                     onClick={() => setView(tab)}
//                 >
//                     {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                 </button>
//             ))}
//         </div>

//         {/* Chart Container */}
//         <div
//             className="min-h-[300px] w-full rounded-lg sm:min-h-[400px]"
//             ref={lineChartRef}
//         >
//             <Line data={lineChartData} options={lineChartOptions} />
//         </div>
//     </div>
//   );
// }

// export default SummaryTrend;


// import React, { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     LineElement,
//     PointElement,
//     Title,
//     Tooltip,
//     Legend,
//     Filler
// } from 'chart.js';

// // Register required components including Filler for area charts
// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     LineElement,
//     PointElement,
//     Title,
//     Tooltip,
//     Legend,
//     Filler
// );

// function SummaryTrend({ singlePropertyStats, selectedDate, lineChartRef }) {
//     const [view, setView] = useState(selectedDate ? 'selectedDate' : 'week');

//     useEffect(() => {
//         if (selectedDate) {
//             setView('selectedDate');
//         }
//     }, [selectedDate]);

//     const processData = (view) => {
//         const sortedStats = singlePropertyStats.sort((a, b) => new Date(a.date) - new Date(b.date));

//         if (view === 'selectedDate') {
//             const filteredDetails = sortedStats
//                 .filter((stat) => new Date(stat.date).toDateString() === new Date(selectedDate).toDateString())
//                 .flatMap((stat) => stat.details);

//             const hourlyData = {};
//             filteredDetails.forEach((detail) => {
//                 const hour = new Date(detail.timestamp).getHours();
//                 const key = `${hour}:00`;

//                 if (!hourlyData[key]) {
//                     hourlyData[key] = { visits: 0, contacts: 0, saves: 0 };
//                 }

//                 if (detail.type === 'VISIT') hourlyData[key].visits += 1;
//                 if (detail.type === 'CONTACT') hourlyData[key].contacts += 1;
//                 if (detail.type === 'SAVE') hourlyData[key].saves += 1;
//             });

//             const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
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
//                         backgroundColor: 'rgba(75, 192, 192, 0.1)',
//                         fill: true,
//                         tension: 0.4,
//                     },
//                     {
//                         label: 'Total Contacts',
//                         data: dataForChart.map((d) => d.contacts),
//                         borderColor: 'rgba(255, 99, 132, 1)',
//                         backgroundColor: 'rgba(255, 99, 132, 0.1)',
//                         fill: true,
//                         tension: 0.4,
//                     },
//                     {
//                         label: 'Total Saves',
//                         data: dataForChart.map((d) => d.saves),
//                         borderColor: 'rgba(54, 162, 235, 1)',
//                         backgroundColor: 'rgba(54, 162, 235, 0.1)',
//                         fill: true,
//                         tension: 0.4,
//                     },
//                 ],
//             };
//         }

//         return {
//             labels: sortedStats.map((stat) => stat.date),
//             datasets: [
//                 {
//                     label: 'Total Visits',
//                     data: sortedStats.map((stat) => stat.stats.visits || 0),
//                     borderColor: 'rgba(75, 192, 192, 1)',
//                     backgroundColor: 'rgba(75, 192, 192, 0.1)',
//                     fill: true,
//                     tension: 0.4,
//                 },
//                 {
//                     label: 'Total Contacts',
//                     data: sortedStats.map((stat) => stat.stats.contacts || 0),
//                     borderColor: 'rgba(255, 99, 132, 1)',
//                     backgroundColor: 'rgba(255, 99, 132, 0.1)',
//                     fill: true,
//                     tension: 0.4,
//                 },
//                 {
//                     label: 'Total Saves',
//                     data: sortedStats.map((stat) => stat.stats.saves || 0),
//                     borderColor: 'rgba(54, 162, 235, 1)',
//                     backgroundColor: 'rgba(54, 162, 235, 0.1)',
//                     fill: true,
//                     tension: 0.4,
//                 },
//             ],
//         };
//     };

//     const lineChartData = processData(view);

//     const lineChartOptions = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//                 labels: {
//                     usePointStyle: true,
//                     pointStyle: 'circle',
//                 }
//             },
//             tooltip: {
//                 backgroundColor: 'white',
//                 titleColor: '#666',
//                 bodyColor: '#666',
//                 bodyFont: {
//                     size: 14
//                 },
//                 titleFont: {
//                     size: 16,
//                     weight: 'normal'
//                 },
//                 padding: 16,
//                 borderColor: '#ddd',
//                 borderWidth: 1,
//                 displayColors: true,
//                 callbacks: {
//                     label: function (context) {
//                         return `${context.dataset.label}: ${context.parsed.y}`;
//                     }
//                 }
//             },
//             title: {
//                 display: true,
//                 text: `Trends - ${view.toUpperCase()} View`
//             },
//         },
//         scales: {
//             y: {
//                 beginAtZero: true,
//                 grid: {
//                     color: 'rgba(0, 0, 0, 0.05)'
//                 }
//             },
//             x: {
//                 grid: {
//                     color: 'rgba(0, 0, 0, 0.05)'
//                 }
//             }
//         },
//         elements: {
//             point: {
//                 radius: 4,
//                 hoverRadius: 6
//             },
//             line: {
//                 borderWidth: 2
//             }
//         }
//     };

//     return (
//         <div className="space-y-4">
//             <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:space-x-4">
//                 {['selectedDate', '3days', 'week', 'month', 'quarter'].map((tab) => (
//                     <button
//                         key={tab}
//                         className={`rounded px-3 py-2 text-sm transition-colors duration-200 sm:px-4 
//                         ${view === tab
//                                 ? 'bg-primary text-white dark:bg-blue-600'
//                                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
//                             }`}
//                         onClick={() => setView(tab)}
//                     >
//                         {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                     </button>
//                 ))}
//             </div>

//             <div
//                 className="min-h-[300px] w-full rounded-lg bg-white p-4 shadow-sm sm:min-h-[400px]"
//                 ref={lineChartRef}
//             >
//                 <Line data={lineChartData} options={lineChartOptions} />
//             </div>
//         </div>
//     );
// }

// export default SummaryTrend;

// import React, { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     LineElement,
//     PointElement,
//     Title,
//     Tooltip,
//     Legend,
//     Filler
// } from 'chart.js';

// // Register required components including Filler for area charts
// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     LineElement,
//     PointElement,
//     Title,
//     Tooltip,
//     Legend,
//     Filler
// );

// function SummaryTrend({ singlePropertyStats, selectedDate, lineChartRef }) {
//     const [view, setView] = useState(selectedDate ? 'selectedDate' : 'week');

//     useEffect(() => {
//         if (selectedDate) {
//             setView('selectedDate');
//         }
//     }, [selectedDate]);

//     const processData = (view) => {
//         const sortedStats = singlePropertyStats.sort((a, b) => new Date(a.date) - new Date(b.date));

//         if (view === 'selectedDate') {
//             const filteredDetails = sortedStats
//                 .filter((stat) => new Date(stat.date).toDateString() === new Date(selectedDate).toDateString())
//                 .flatMap((stat) => stat.details);

//             const hourlyData = {};
//             filteredDetails.forEach((detail) => {
//                 const hour = new Date(detail.timestamp).getHours();
//                 const key = `${hour}:00`;

//                 if (!hourlyData[key]) {
//                     hourlyData[key] = { visits: 0, contacts: 0, saves: 0 };
//                 }

//                 if (detail.type === 'VISIT') hourlyData[key].visits += 1;
//                 if (detail.type === 'CONTACT') hourlyData[key].contacts += 1;
//                 if (detail.type === 'SAVE') hourlyData[key].saves += 1;
//             });

//             const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
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
//                         backgroundColor: 'rgba(75, 192, 192, 0.1)',
//                         fill: true,
//                         tension: 0, // Set tension to 0 for straight lines
//                     },
//                     {
//                         label: 'Total Contacts',
//                         data: dataForChart.map((d) => d.contacts),
//                         borderColor: 'rgba(255, 99, 132, 1)',
//                         backgroundColor: 'rgba(255, 99, 132, 0.1)',
//                         fill: true,
//                         tension: 0, // Set tension to 0 for straight lines
//                     },
//                     {
//                         label: 'Total Saves',
//                         data: dataForChart.map((d) => d.saves),
//                         borderColor: 'rgba(54, 162, 235, 1)',
//                         backgroundColor: 'rgba(54, 162, 235, 0.1)',
//                         fill: true,
//                         tension: 0, // Set tension to 0 for straight lines
//                     },
//                 ],
//             };
//         }

//         return {
//             labels: sortedStats.map((stat) => stat.date),
//             datasets: [
//                 {
//                     label: 'Total Visits',
//                     data: sortedStats.map((stat) => stat.stats.visits || 0),
//                     borderColor: 'rgba(75, 192, 192, 1)',
//                     backgroundColor: 'rgba(75, 192, 192, 0.1)',
//                     fill: true,
//                     tension: 0, // Set tension to 0 for straight lines
//                 },
//                 {
//                     label: 'Total Contacts',
//                     data: sortedStats.map((stat) => stat.stats.contacts || 0),
//                     borderColor: 'rgba(255, 99, 132, 1)',
//                     backgroundColor: 'rgba(255, 99, 132, 0.1)',
//                     fill: true,
//                     tension: 0, // Set tension to 0 for straight lines
//                 },
//                 {
//                     label: 'Total Saves',
//                     data: sortedStats.map((stat) => stat.stats.saves || 0),
//                     borderColor: 'rgba(54, 162, 235, 1)',
//                     backgroundColor: 'rgba(54, 162, 235, 0.1)',
//                     fill: true,
//                     tension: 0, // Set tension to 0 for straight lines
//                 },
//             ],
//         };
//     };

//     const lineChartData = processData(view);

//     const lineChartOptions = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//                 labels: {
//                     usePointStyle: true,
//                     pointStyle: 'circle',
//                 }
//             },
//             tooltip: {
//                 backgroundColor: 'white',
//                 titleColor: '#666',
//                 bodyColor: '#666',
//                 bodyFont: {
//                     size: 14
//                 },
//                 titleFont: {
//                     size: 16,
//                     weight: 'normal'
//                 },
//                 padding: 16,
//                 borderColor: '#ddd',
//                 borderWidth: 1,
//                 displayColors: true,
//                 callbacks: {
//                     label: function (context) {
//                         return `${context.dataset.label}: ${context.parsed.y}`;
//                     }
//                 }
//             },
//             title: {
//                 display: true,
//                 text: `Trends - ${view.toUpperCase()} View`
//             },
//         },
//         scales: {
//             y: {
//                 beginAtZero: true,
//                 grid: {
//                     color: 'rgba(0, 0, 0, 0.05)'
//                 }
//             },
//             x: {
//                 grid: {
//                     color: 'rgba(0, 0, 0, 0.05)'
//                 }
//             }
//         },
//         elements: {
//             point: {
//                 radius: 4,
//                 hoverRadius: 6
//             },
//             line: {
//                 borderWidth: 2
//             }
//         }
//     };

//     return (
//         <div className="space-y-4">
//             <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:space-x-4">
//                 {['selectedDate', '3days', 'week', 'month', 'quarter'].map((tab) => (
//                     <button
//                         key={tab}
//                         className={`rounded px-3 py-2 text-sm transition-colors duration-200 sm:px-4 
//                         ${view === tab
//                                 ? 'bg-primary text-white dark:bg-blue-600'
//                                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
//                             }`}
//                         onClick={() => setView(tab)}
//                     >
//                         {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                     </button>
//                 ))}
//             </div>

//             <div
//                 className="min-h-[300px] w-full rounded-lg bg-white p-4 shadow-sm sm:min-h-[400px]"
//                 ref={lineChartRef}
//             >
//                 <Line data={lineChartData} options={lineChartOptions} />
//             </div>
//         </div>
//     );
// }

// export default SummaryTrend;

// import React, { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     LineElement,
//     PointElement,
//     Title,
//     Tooltip,
//     Legend,
//     Filler
// } from 'chart.js';

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     LineElement,
//     PointElement,
//     Title,
//     Tooltip,
//     Legend,
//     Filler
// );

// function SummaryTrend({ singlePropertyStats, selectedDate, lineChartRef }) {
//     const [view, setView] = useState(selectedDate ? 'selectedDate' : 'week');

//     useEffect(() => {
//         if (selectedDate) {
//             setView('selectedDate');
//         }
//     }, [selectedDate]);

//     const processData = (view) => {
//         const sortedStats = singlePropertyStats.sort((a, b) => new Date(a.date) - new Date(b.date));

//         if (view === 'selectedDate') {
//             const filteredDetails = sortedStats
//                 .filter((stat) => new Date(stat.date).toDateString() === new Date(selectedDate).toDateString())
//                 .flatMap((stat) => stat.details);

//             const hourlyData = {};
//             filteredDetails.forEach((detail) => {
//                 const hour = new Date(detail.timestamp).getHours();
//                 const key = `${hour}:00`;

//                 if (!hourlyData[key]) {
//                     hourlyData[key] = { visits: 0, contacts: 0, saves: 0 };
//                 }

//                 if (detail.type === 'VISIT') hourlyData[key].visits += 1;
//                 if (detail.type === 'CONTACT') hourlyData[key].contacts += 1;
//                 if (detail.type === 'SAVE') hourlyData[key].saves += 1;
//             });

//             const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
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
//                         label: 'Visits',
//                         data: dataForChart.map((d) => d.visits),
//                         borderColor: 'rgb(53, 162, 235)',
//                         backgroundColor: 'rgba(53, 162, 235, 0.1)',
//                         fill: true,
//                         tension: 0,
//                     },
//                     {
//                         label: 'Contacts',
//                         data: dataForChart.map((d) => d.contacts),
//                         borderColor: 'rgb(75, 192, 192)',
//                         backgroundColor: 'rgba(75, 192, 192, 0.1)',
//                         fill: true,
//                         tension: 0,
//                     },
//                     {
//                         label: 'Saves',
//                         data: dataForChart.map((d) => d.saves),
//                         borderColor: 'rgb(255, 99, 132)',
//                         backgroundColor: 'rgba(255, 99, 132, 0.1)',
//                         fill: true,
//                         tension: 0,
//                     },
//                 ],
//             };
//         }

//         return {
//             labels: sortedStats.map((stat) => stat.date),
//             datasets: [
//                 {
//                     label: 'Visits',
//                     data: sortedStats.map((stat) => stat.stats.visits || 0),
//                     borderColor: 'rgb(53, 162, 235)',
//                     backgroundColor: 'rgba(53, 162, 235, 0.1)',
//                     fill: true,
//                     tension: 0,
//                 },
//                 {
//                     label: 'Contacts',
//                     data: sortedStats.map((stat) => stat.stats.contacts || 0),
//                     borderColor: 'rgb(75, 192, 192)',
//                     backgroundColor: 'rgba(75, 192, 192, 0.1)',
//                     fill: true,
//                     tension: 0,
//                 },
//                 {
//                     label: 'Saves',
//                     data: sortedStats.map((stat) => stat.stats.saves || 0),
//                     borderColor: 'rgb(255, 99, 132)',
//                     backgroundColor: 'rgba(255, 99, 132, 0.1)',
//                     fill: true,
//                     tension: 0,
//                 },
//             ],
//         };
//     };

//     const lineChartData = processData(view);

//     const lineChartOptions = {
//         responsive: true,
//         interaction: {
//             mode: 'index',
//             intersect: false,
//         },
//         plugins: {
//             legend: {
//                 position: 'top',
//                 labels: {
//                     usePointStyle: true,
//                     pointStyle: 'circle',
//                     padding: 20,
//                     font: {
//                         size: 12
//                     }
//                 }
//             },
//             tooltip: {
//                 enabled: true,
//                 position: 'nearest',
//                 backgroundColor: 'white',
//                 titleColor: '#666',
//                 bodyColor: '#666',
//                 titleFont: {
//                     size: 14,
//                     weight: 'normal'
//                 },
//                 bodyFont: {
//                     size: 14
//                 },
//                 padding: 12,
//                 borderColor: '#ddd',
//                 borderWidth: 1,
//                 displayColors: true,
//                 boxPadding: 6,
//                 callbacks: {
//                     title: function (tooltipItems) {
//                         return tooltipItems[0].label;
//                     },
//                     label: function (context) {
//                         const label = context.dataset.label;
//                         const value = context.parsed.y;
//                         const dotColor = context.dataset.borderColor;
//                         return [` ${label}: ${value}`];
//                     },
//                     labelTextColor: function () {
//                         return '#666';
//                     },
//                 }
//             },
//         },
//         scales: {
//             y: {
//                 beginAtZero: true,
//                 grid: {
//                     color: 'rgba(0, 0, 0, 0.05)'
//                 },
//                 border: {
//                     dash: [4, 4]
//                 }
//             },
//             x: {
//                 grid: {
//                     display: false
//                 },
//                 border: {
//                     dash: [4, 4]
//                 }
//             }
//         },
//         elements: {
//             point: {
//                 radius: 4,
//                 hoverRadius: 6,
//                 borderWidth: 2,
//                 backgroundColor: 'white'
//             },
//             line: {
//                 borderWidth: 2
//             }
//         }
//     };

//     return (
//         <div className="space-y-4">
//             <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:space-x-4">
//                 {['selectedDate', '3days', 'week', 'month', 'quarter'].map((tab) => (
//                     <button
//                         key={tab}
//                         className={`rounded px-3 py-2 text-sm transition-colors duration-200 sm:px-4 
//                         ${view === tab
//                                 ? 'bg-primary text-white dark:bg-blue-600'
//                                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
//                             }`}
//                         onClick={() => setView(tab)}
//                     >
//                         {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                     </button>
//                 ))}
//             </div>

//             <div
//                 className="min-h-[300px] w-full rounded-lg bg-white p-4 shadow-sm sm:min-h-[400px]"
//                 ref={lineChartRef}
//             >
//                 <Line data={lineChartData} options={lineChartOptions} />
//             </div>
//         </div>
//     );
// }

// export default SummaryTrend;

// import React, { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     LineElement,
//     PointElement,
//     Title,
//     Tooltip,
//     Legend,
//     Filler
// } from 'chart.js';

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     LineElement,
//     PointElement,
//     Title,
//     Tooltip,
//     Legend,
//     Filler
// );

// function SummaryTrend({ singlePropertyStats, selectedDate, lineChartRef }) {
//     const [view, setView] = useState(selectedDate ? 'selectedDate' : 'week');

//     useEffect(() => {
//         if (selectedDate) {
//             setView('selectedDate');
//         }
//     }, [selectedDate]);

//     const processData = (view) => {
//         // ... (previous processData code remains the same)
//         const sortedStats = singlePropertyStats.sort((a, b) => new Date(a.date) - new Date(b.date));

//         if (view === 'selectedDate') {
//             const filteredDetails = sortedStats
//                 .filter((stat) => new Date(stat.date).toDateString() === new Date(selectedDate).toDateString())
//                 .flatMap((stat) => stat.details);

//             const hourlyData = {};
//             filteredDetails.forEach((detail) => {
//                 const hour = new Date(detail.timestamp).getHours();
//                 const key = `${hour}:00`;

//                 if (!hourlyData[key]) {
//                     hourlyData[key] = { visits: 0, contacts: 0, saves: 0 };
//                 }

//                 if (detail.type === 'VISIT') hourlyData[key].visits += 1;
//                 if (detail.type === 'CONTACT') hourlyData[key].contacts += 1;
//                 if (detail.type === 'SAVE') hourlyData[key].saves += 1;
//             });

//             const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
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
//                         label: 'Visits',
//                         data: dataForChart.map((d) => d.visits),
//                         borderColor: 'rgb(53, 162, 235)',
//                         backgroundColor: 'rgba(53, 162, 235, 0.1)',
//                         fill: true,
//                         tension: 0,
//                     },
//                     {
//                         label: 'Contacts',
//                         data: dataForChart.map((d) => d.contacts),
//                         borderColor: 'rgb(75, 192, 192)',
//                         backgroundColor: 'rgba(75, 192, 192, 0.1)',
//                         fill: true,
//                         tension: 0,
//                     },
//                     {
//                         label: 'Saves',
//                         data: dataForChart.map((d) => d.saves),
//                         borderColor: 'rgb(255, 99, 132)',
//                         backgroundColor: 'rgba(255, 99, 132, 0.1)',
//                         fill: true,
//                         tension: 0,
//                     },
//                 ],
//             };
//         }

//         return {
//             labels: sortedStats.map((stat) => stat.date),
//             datasets: [
//                 {
//                     label: 'Visits',
//                     data: sortedStats.map((stat) => stat.stats.visits || 0),
//                     borderColor: 'rgb(53, 162, 235)',
//                     backgroundColor: 'rgba(53, 162, 235, 0.1)',
//                     fill: true,
//                     tension: 0,
//                 },
//                 {
//                     label: 'Contacts',
//                     data: sortedStats.map((stat) => stat.stats.contacts || 0),
//                     borderColor: 'rgb(75, 192, 192)',
//                     backgroundColor: 'rgba(75, 192, 192, 0.1)',
//                     fill: true,
//                     tension: 0,
//                 },
//                 {
//                     label: 'Saves',
//                     data: sortedStats.map((stat) => stat.stats.saves || 0),
//                     borderColor: 'rgb(255, 99, 132)',
//                     backgroundColor: 'rgba(255, 99, 132, 0.1)',
//                     fill: true,
//                     tension: 0,
//                 },
//             ],
//         };
//     };

//     const lineChartData = processData(view);

//     const lineChartOptions = {
//         responsive: true,
//         interaction: {
//             mode: 'index',
//             intersect: false,
//         },
//         plugins: {
//             legend: {
//                 position: 'top',
//                 labels: {
//                     usePointStyle: true,
//                     pointStyle: 'circle',
//                     padding: 20,
//                     font: {
//                         size: 12
//                     }
//                 }
//             },
//             tooltip: {
//                 enabled: true,
//                 position: 'nearest',
//                 backgroundColor: 'white',
//                 titleColor: '#666',
//                 bodyColor: '#666',
//                 titleFont: {
//                     size: 14,
//                     weight: 'normal'
//                 },
//                 bodyFont: {
//                     size: 14
//                 },
//                 padding: 12,
//                 borderColor: '#ddd',
//                 borderWidth: 1,
//                 displayColors: true,
//                 boxPadding: 6,
//                 callbacks: {
//                     title: function (tooltipItems) {
//                         return tooltipItems[0].label;
//                     },
//                     label: function (context) {
//                         const label = context.dataset.label;
//                         const value = context.parsed.y;
//                         return [` ${label}: ${value}`];
//                     },
//                     labelTextColor: function () {
//                         return '#666';
//                     },
//                 }
//             },
//         },
//         scales: {
//             y: {
//                 beginAtZero: true,
//                 grid: {
//                     color: 'rgba(0, 0, 0, 0.1)',
//                     drawBorder: false,
//                     drawTicks: false,
//                 },
//                 border: {
//                     display: false,
//                 },
//                 ticks: {
//                     padding: 10,
//                 }
//             },
//             x: {
//                 grid: {
//                     color: 'rgba(0, 0, 0, 0.1)',
//                     drawBorder: false,
//                     drawTicks: false,
//                 },
//                 border: {
//                     display: false,
//                 },
//                 ticks: {
//                     padding: 10,
//                 }
//             }
//         },
//         elements: {
//             point: {
//                 radius: 4,
//                 hoverRadius: 6,
//                 borderWidth: 2,
//                 backgroundColor: 'white'
//             },
//             line: {
//                 borderWidth: 2
//             }
//         },
//         hover: {
//             mode: 'index',
//             intersect: false,
//         },
//         // Add custom plugin to highlight y-axis line on hover
//         plugins: [{
//             id: 'highlightYAxis',
//             beforeDraw: (chart) => {
//                 if (chart.tooltip?.active) {
//                     const ctx = chart.ctx;
//                     const xAxis = chart.scales.x;
//                     const yAxis = chart.scales.y;
//                     const activeTooltip = chart.tooltip;

//                     // Draw darker y-axis line
//                     ctx.save();
//                     ctx.beginPath();
//                     ctx.moveTo(activeTooltip.caretX, yAxis.top);
//                     ctx.lineTo(activeTooltip.caretX, yAxis.bottom);
//                     ctx.lineWidth = 1;
//                     ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
//                     ctx.stroke();
//                     ctx.restore();
//                 }
//             }
//         }]
//     };

//     return (
//         <div className="space-y-4">
//             <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:space-x-4">
//                 {['selectedDate', '3days', 'week', 'month', 'quarter'].map((tab) => (
//                     <button
//                         key={tab}
//                         className={`rounded px-3 py-2 text-sm transition-colors duration-200 sm:px-4 
//                         ${view === tab
//                                 ? 'bg-primary text-white dark:bg-blue-600'
//                                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
//                             }`}
//                         onClick={() => setView(tab)}
//                     >
//                         {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                     </button>
//                 ))}
//             </div>

//             <div
//                 className="min-h-[300px] w-full rounded-lg bg-white p-4 shadow-sm sm:min-h-[400px]"
//                 ref={lineChartRef}
//             >
//                 <Line data={lineChartData} options={lineChartOptions} />
//             </div>
//         </div>
//     );
// }

// export default SummaryTrend;

// import React, { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     LineElement,
//     PointElement,
//     Title,
//     Tooltip,
//     Legend,
//     Filler
// } from 'chart.js';

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     LineElement,
//     PointElement,
//     Title,
//     Tooltip,
//     Legend,
//     Filler
// );

// function SummaryTrend({ singlePropertyStats, selectedDate, lineChartRef }) {
//     const [view, setView] = useState(selectedDate ? 'selectedDate' : 'week');

//     useEffect(() => {
//         if (selectedDate) {
//             setView('selectedDate');
//         }
//     }, [selectedDate]);

//     // ... (processData function remains the same)
//     const processData = (view) => {
//         // Previous processData implementation remains unchanged
//         const sortedStats = singlePropertyStats.sort((a, b) => new Date(a.date) - new Date(b.date));

//         if (view === 'selectedDate') {
//             const filteredDetails = sortedStats
//                 .filter((stat) => new Date(stat.date).toDateString() === new Date(selectedDate).toDateString())
//                 .flatMap((stat) => stat.details);

//             const hourlyData = {};
//             filteredDetails.forEach((detail) => {
//                 const hour = new Date(detail.timestamp).getHours();
//                 const key = `${hour}:00`;

//                 if (!hourlyData[key]) {
//                     hourlyData[key] = { visits: 0, contacts: 0, saves: 0 };
//                 }

//                 if (detail.type === 'VISIT') hourlyData[key].visits += 1;
//                 if (detail.type === 'CONTACT') hourlyData[key].contacts += 1;
//                 if (detail.type === 'SAVE') hourlyData[key].saves += 1;
//             });

//             const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
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
//                         label: 'Visits',
//                         data: dataForChart.map((d) => d.visits),
//                         borderColor: 'rgb(53, 162, 235)',
//                         backgroundColor: 'rgba(53, 162, 235, 0.1)',
//                         fill: true,
//                         tension: 0,
//                     },
//                     {
//                         label: 'Contacts',
//                         data: dataForChart.map((d) => d.contacts),
//                         borderColor: 'rgb(75, 192, 192)',
//                         backgroundColor: 'rgba(75, 192, 192, 0.1)',
//                         fill: true,
//                         tension: 0,
//                     },
//                     {
//                         label: 'Saves',
//                         data: dataForChart.map((d) => d.saves),
//                         borderColor: 'rgb(255, 99, 132)',
//                         backgroundColor: 'rgba(255, 99, 132, 0.1)',
//                         fill: true,
//                         tension: 0,
//                     },
//                 ],
//             };
//         }

//         return {
//             labels: sortedStats.map((stat) => stat.date),
//             datasets: [
//                 {
//                     label: 'Visits',
//                     data: sortedStats.map((stat) => stat.stats.visits || 0),
//                     borderColor: 'rgb(53, 162, 235)',
//                     backgroundColor: 'rgba(53, 162, 235, 0.1)',
//                     fill: true,
//                     tension: 0,
//                 },
//                 {
//                     label: 'Contacts',
//                     data: sortedStats.map((stat) => stat.stats.contacts || 0),
//                     borderColor: 'rgb(75, 192, 192)',
//                     backgroundColor: 'rgba(75, 192, 192, 0.1)',
//                     fill: true,
//                     tension: 0,
//                 },
//                 {
//                     label: 'Saves',
//                     data: sortedStats.map((stat) => stat.stats.saves || 0),
//                     borderColor: 'rgb(255, 99, 132)',
//                     backgroundColor: 'rgba(255, 99, 132, 0.1)',
//                     fill: true,
//                     tension: 0,
//                 },
//             ],
//         };
//     };

//     const lineChartData = processData(view);

//     const lineChartOptions = {
//         responsive: true,
//         interaction: {
//             mode: 'index',
//             intersect: false,
//         },
//         plugins: {
//             legend: {
//                 position: 'top',
//                 labels: {
//                     usePointStyle: true,
//                     pointStyle: 'circle',
//                     padding: 20,
//                     font: {
//                         size: 12
//                     }
//                 }
//             },
//             tooltip: {
//                 enabled: true,
//                 position: 'nearest',
//                 backgroundColor: 'white',
//                 titleColor: '#666',
//                 bodyColor: '#666',
//                 titleFont: {
//                     size: 14,
//                     weight: 'normal'
//                 },
//                 bodyFont: {
//                     size: 14
//                 },
//                 padding: 12,
//                 borderColor: '#ddd',
//                 borderWidth: 1,
//                 displayColors: true,
//                 boxPadding: 6,
//                 callbacks: {
//                     title: function (tooltipItems) {
//                         return tooltipItems[0].label;
//                     },
//                     label: function (context) {
//                         const label = context.dataset.label;
//                         const value = context.parsed.y;
//                         return [` ${label}: ${value}`];
//                     },
//                     labelTextColor: function () {
//                         return '#666';
//                     },
//                 }
//             },
//         },
//         scales: {
//             y: {
//                 beginAtZero: true,
//                 grid: {
//                     color: 'rgba(0, 0, 0, 0.1)',
//                     drawBorder: false,
//                     drawTicks: false,
//                 },
//                 border: {
//                     display: false,
//                 },
//                 ticks: {
//                     padding: 10,
//                 }
//             },
//             x: {
//                 grid: {
//                     color: 'rgba(0, 0, 0, 0.1)',
//                     drawBorder: false,
//                     drawTicks: false,
//                 },
//                 border: {
//                     display: false,
//                 },
//                 ticks: {
//                     padding: 10,
//                 }
//             }
//         },
//         elements: {
//             point: {
//                 radius: 2,
//                 hoverRadius: 6,
//                 borderWidth: 2,
//                 backgroundColor: 'rgb(255, 255, 255)',
//                 backgroundColor: function (context) {
//                     // Default state - semi-transparent white
//                     const defaultColor = 'rgb(255, 255, 255)';
//                     // Hover state - solid white
//                     const hoverColor = 'rgb(255, 255, 255)';

//                     // If point is hovered or active in tooltip
//                     if (context.raw && context.active) {
//                         return hoverColor;
//                     }
//                     return defaultColor;
//                 },
//                 hoverBackgroundColor: 'white', // Ensure white background on hover
//                 borderColor: function (context) {
//                     return context.dataset.borderColor;
//                 },
//                 hoverBorderWidth: 3,
//             },
//             line: {
//                 borderWidth: 1
//             }
//         },
//         hover: {
//             mode: 'index',
//             intersect: false,
//         },
//         onHover: (event, elements) => {
//             event.native.target.style.cursor = 'crosshair';
//         },
//         plugins: [{
//             id: 'highlightYAxis',
//             beforeDraw: (chart) => {
//                 if (chart.tooltip?.active) {
//                     const ctx = chart.ctx;
//                     const xAxis = chart.scales.x;
//                     const yAxis = chart.scales.y;
//                     const activeTooltip = chart.tooltip;

//                     // Draw black y-axis line
//                     ctx.save();
//                     ctx.beginPath();
//                     ctx.moveTo(activeTooltip.caretX, yAxis.top);
//                     ctx.lineTo(activeTooltip.caretX, yAxis.bottom);
//                     ctx.lineWidth = 1;
//                     ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)'; // Changed to black
//                     ctx.stroke();
//                     ctx.restore();
//                 }
//             }
//         }]
//     };

//     return (
//         <div className="space-y-4">
//             <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:space-x-4">
//                 {['selectedDate', '3days', 'week', 'month', 'quarter'].map((tab) => (
//                     <button
//                         key={tab}
//                         className={`rounded px-3 py-2 text-sm transition-colors duration-200 sm:px-4 
//                         ${view === tab
//                                 ? 'bg-primary text-white dark:bg-blue-600'
//                                 : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
//                             }`}
//                         onClick={() => setView(tab)}
//                     >
//                         {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                     </button>
//                 ))}
//             </div>

//             <div
//                 className="min-h-[300px] w-full rounded-lg bg-white p-4 shadow-sm sm:min-h-[400px]"
//                 ref={lineChartRef}
//             >
//                 <Line data={lineChartData} options={lineChartOptions} />
//             </div>
//         </div>
//     );
// }

// export default SummaryTrend;


// import React, { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     LineElement,
//     PointElement,
//     Title,
//     Tooltip,
//     Legend,
//     Filler
// } from 'chart.js';

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     LineElement,
//     PointElement,
//     Title,
//     Tooltip,
//     Legend,
//     Filler
// );

// function SummaryTrend({ singlePropertyStats, selectedDate, lineChartRef }) {
//     const [view, setView] = useState(selectedDate ? 'selectedDate' : 'week');

//     useEffect(() => {
//         if (selectedDate) {
//             setView('selectedDate');
//         }
//     }, [selectedDate]);

//     const processData = (view) => {
//         // Previous processData implementation remains unchanged
//         const sortedStats = singlePropertyStats.sort((a, b) => new Date(a.date) - new Date(b.date));

//         if (view === 'selectedDate') {
//             const filteredDetails = sortedStats
//                 .filter((stat) => new Date(stat.date).toDateString() === new Date(selectedDate).toDateString())
//                 .flatMap((stat) => stat.details);

//             const hourlyData = {};
//             filteredDetails.forEach((detail) => {
//                 const hour = new Date(detail.timestamp).getHours();
//                 const key = `${hour}:00`;

//                 if (!hourlyData[key]) {
//                     hourlyData[key] = { visits: 0, contacts: 0, saves: 0 };
//                 }

//                 if (detail.type === 'VISIT') hourlyData[key].visits += 1;
//                 if (detail.type === 'CONTACT') hourlyData[key].contacts += 1;
//                 if (detail.type === 'SAVE') hourlyData[key].saves += 1;
//             });

//             const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
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
//                         label: 'Visits',
//                         data: dataForChart.map((d) => d.visits),
//                         borderColor: 'rgb(53, 162, 235)',
//                         backgroundColor: 'rgba(53, 162, 235, 0.1)',
//                         fill: true,
//                         tension: 0,
//                     },
//                     {
//                         label: 'Contacts',
//                         data: dataForChart.map((d) => d.contacts),
//                         borderColor: 'rgb(75, 192, 192)',
//                         backgroundColor: 'rgba(75, 192, 192, 0.1)',
//                         fill: true,
//                         tension: 0,
//                     },
//                     {
//                         label: 'Saves',
//                         data: dataForChart.map((d) => d.saves),
//                         borderColor: 'rgb(255, 99, 132)',
//                         backgroundColor: 'rgba(255, 99, 132, 0.1)',
//                         fill: true,
//                         tension: 0,
//                     },
//                 ],
//             };
//         }

//         return {
//             labels: sortedStats.map((stat) => stat.date),
//             datasets: [
//                 {
//                     label: 'Visits',
//                     data: sortedStats.map((stat) => stat.stats.visits || 0),
//                     borderColor: 'rgb(53, 162, 235)',
//                     backgroundColor: 'rgba(53, 162, 235, 0.1)',
//                     fill: true,
//                     tension: 0,
//                 },
//                 {
//                     label: 'Contacts',
//                     data: sortedStats.map((stat) => stat.stats.contacts || 0),
//                     borderColor: 'rgb(75, 192, 192)',
//                     backgroundColor: 'rgba(75, 192, 192, 0.1)',
//                     fill: true,
//                     tension: 0,
//                 },
//                 {
//                     label: 'Saves',
//                     data: sortedStats.map((stat) => stat.stats.saves || 0),
//                     borderColor: 'rgb(255, 99, 132)',
//                     backgroundColor: 'rgba(255, 99, 132, 0.1)',
//                     fill: true,
//                     tension: 0,
//                 },
//             ],
//         };
//     };

//     const lineChartData = processData(view);

//     const lineChartOptions = {
//         responsive: true,
//         interaction: {
//             mode: 'index',
//             intersect: false,
//         },
//         plugins: {
//             legend: {
//                 display: false // Hide the default legend since we'll create our own
//             },
//             tooltip: {
//                 enabled: true,
//                 position: 'nearest',
//                 backgroundColor: 'white',
//                 titleColor: '#666',
//                 bodyColor: '#666',
//                 titleFont: {
//                     size: 14,
//                     weight: 'normal'
//                 },
//                 bodyFont: {
//                     size: 14
//                 },
//                 padding: 12,
//                 borderColor: '#ddd',
//                 borderWidth: 1,
//                 displayColors: true,
//                 boxPadding: 6,
//                 callbacks: {
//                     title: function (tooltipItems) {
//                         return tooltipItems[0].label;
//                     },
//                     label: function (context) {
//                         const label = context.dataset.label;
//                         const value = context.parsed.y;
//                         return [` ${label}: ${value}`];
//                     },
//                     labelTextColor: function () {
//                         return '#666';
//                     },
//                 }
//             },
//         },
//         scales: {
//             y: {
//                 beginAtZero: true,
//                 grid: {
//                     color: 'rgba(0, 0, 0, 0.1)',
//                     drawBorder: false,
//                     drawTicks: false,
//                 },
//                 border: {
//                     display: false,
//                 },
//                 ticks: {
//                     padding: 10,
//                 }
//             },
//             x: {
//                 grid: {
//                     color: 'rgba(0, 0, 0, 0.1)',
//                     drawBorder: false,
//                     drawTicks: false,
//                 },
//                 border: {
//                     display: false,
//                 },
//                 ticks: {
//                     padding: 10,
//                 }
//             }
//         },
//         elements: {
//             point: {
//                 radius: 2,
//                 hoverRadius: 6,
//                 borderWidth: 2,
//                 backgroundColor: 'rgb(255, 255, 255)',
//                 backgroundColor: function (context) {
//                     return context.raw && context.active ? 'rgb(255, 255, 255)' : 'rgb(255, 255, 255)';
//                 },
//                 hoverBackgroundColor: 'white',
//                 borderColor: function (context) {
//                     return context.dataset.borderColor;
//                 },
//                 hoverBorderWidth: 3,
//             },
//             line: {
//                 borderWidth: 1
//             }
//         },
//         hover: {
//             mode: 'index',
//             intersect: false,
//         },
//         onHover: (event, elements) => {
//             event.native.target.style.cursor = 'crosshair';
//         },
//         plugins: [{
//             id: 'highlightYAxis',
//             beforeDraw: (chart) => {
//                 if (chart.tooltip?.active) {
//                     const ctx = chart.ctx;
//                     const xAxis = chart.scales.x;
//                     const yAxis = chart.scales.y;
//                     const activeTooltip = chart.tooltip;

//                     ctx.save();
//                     ctx.beginPath();
//                     ctx.moveTo(activeTooltip.caretX, yAxis.top);
//                     ctx.lineTo(activeTooltip.caretX, yAxis.bottom);
//                     ctx.lineWidth = 1;
//                     ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
//                     ctx.stroke();
//                     ctx.restore();
//                 }
//             }
//         }]
//     };

//     // Custom legend items
//     const legendItems = [
//         { label: 'Visits', color: 'rgb(53, 162, 235)' },
//         { label: 'Contacts', color: 'rgb(75, 192, 192)' },
//         { label: 'Saves', color: 'rgb(255, 99, 132)' }
//     ];

//     return (
//         <div className="space-y-4">
//             <div className="flex items-center justify-between">
//                 <div className="flex flex-wrap gap-2 sm:flex-nowrap">
//                     {['selectedDate', '3days', 'week', 'month', 'quarter'].map((tab) => (
//                         <button
//                             key={tab}
//                             className={`rounded px-3 py-2 text-sm transition-colors duration-200 sm:px-4 
//                             ${view === tab
//                                     ? 'bg-primary text-white dark:bg-blue-600'
//                                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
//                                 }`}
//                             onClick={() => setView(tab)}
//                         >
//                             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                         </button>
//                     ))}
//                 </div>

//                 <div className="flex items-center gap-6">
//                     {legendItems.map((item, index) => (
//                         <div key={index} className="flex items-center gap-2">
//                             <div
//                                 className="h-3 w-3 rounded-full"
//                                 style={{ backgroundColor: item.color }}
//                             />
//                             <span className="text-sm text-gray-600">{item.label}</span>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div
//                 className="min-h-[300px] w-full rounded-lg bg-white p-4 shadow-sm sm:min-h-[400px]"
//                 ref={lineChartRef}
//             >
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
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import useColorMode from '../../hooks/useColorMode';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

function SummaryTrend({ singlePropertyStats, selectedDate, lineChartRef }) {
    const [view, setView] = useState(selectedDate ? 'selectedDate' : 'week');
    const [colorMode] = useColorMode();
    const isDark = colorMode === 'dark';

    useEffect(() => {
        if (selectedDate) {
            setView('selectedDate');
        }
    }, [selectedDate]);

    const processData = (view) => {
        // Previous processData implementation remains unchanged
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
                        label: 'Visits',
                        data: dataForChart.map((d) => d.visits),
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: isDark ? 'rgba(53, 162, 235, 0.2)' : 'rgba(53, 162, 235, 0.1)',
                        fill: true,
                        tension: 0,
                    },
                    {
                        label: 'Contacts',
                        data: dataForChart.map((d) => d.contacts),
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: isDark ? 'rgba(75, 192, 192, 0.2)' : 'rgba(75, 192, 192, 0.1)',
                        fill: true,
                        tension: 0,
                    },
                    {
                        label: 'Saves',
                        data: dataForChart.map((d) => d.saves),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: isDark ? 'rgba(255, 99, 132, 0.2)' : 'rgba(255, 99, 132, 0.1)',
                        fill: true,
                        tension: 0,
                    },
                ],
            };
        }

        return {
            labels: sortedStats.map((stat) => stat.date),
            datasets: [
                {
                    label: 'Visits',
                    data: sortedStats.map((stat) => stat.stats.visits || 0),
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: isDark ? 'rgba(53, 162, 235, 0.2)' : 'rgba(53, 162, 235, 0.1)',
                    fill: true,
                    tension: 0,
                },
                {
                    label: 'Contacts',
                    data: sortedStats.map((stat) => stat.stats.contacts || 0),
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: isDark ? 'rgba(75, 192, 192, 0.2)' : 'rgba(75, 192, 192, 0.1)',
                    fill: true,
                    tension: 0,
                },
                {
                    label: 'Saves',
                    data: sortedStats.map((stat) => stat.stats.saves || 0),
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: isDark ? 'rgba(255, 99, 132, 0.2)' : 'rgba(255, 99, 132, 0.1)',
                    fill: true,
                    tension: 0,
                },
            ],
        };
    };

    const lineChartData = processData(view);

    const lineChartOptions = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true,
                position: 'nearest',
                backgroundColor: isDark ? '#374151' : 'white',
                titleColor: isDark ? '#D1D5DB' : '#666',
                bodyColor: isDark ? '#D1D5DB' : '#666',
                titleFont: {
                    size: 14,
                    weight: 'normal'
                },
                bodyFont: {
                    size: 14
                },
                padding: 12,
                borderColor: isDark ? '#4B5563' : '#ddd',
                borderWidth: 1,
                displayColors: true,
                boxPadding: 6,
                callbacks: {
                    title: function (tooltipItems) {
                        return tooltipItems[0].label;
                    },
                    label: function (context) {
                        const label = context.dataset.label;
                        const value = context.parsed.y;
                        return [` ${label}: ${value}`];
                    },
                    labelTextColor: function () {
                        return isDark ? '#D1D5DB' : '#666';
                    },
                }
            },
            highlightYAxis: {
                beforeDraw: (chart) => {
                    if (chart.tooltip?.active) {
                        const ctx = chart.ctx;
                        const yAxis = chart.scales.y;
                        const activeTooltip = chart.tooltip;

                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(activeTooltip.caretX, yAxis.top);
                        ctx.lineTo(activeTooltip.caretX, yAxis.bottom);
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = isDark ? 'rgba(209, 213, 219, 0.8)' : 'rgba(0, 0, 0, 0.8)';
                        ctx.stroke();
                        ctx.restore();
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: isDark ? 'rgba(209, 213, 219, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    drawBorder: false,
                    drawTicks: false,
                },
                border: {
                    display: false,
                },
                ticks: {
                    padding: 10,
                    color: isDark ? '#D1D5DB' : '#666'
                }
            },
            x: {
                grid: {
                    color: isDark ? 'rgba(209, 213, 219, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    drawBorder: false,
                    drawTicks: false,
                },
                border: {
                    display: false,
                },
                ticks: {
                    padding: 10,
                    color: isDark ? '#D1D5DB' : '#666'
                }
            }
        },
        elements: {
            point: {
                radius: 2,
                hoverRadius: 6,
                borderWidth: 2,
                backgroundColor: isDark ? '#1F2937' : 'rgb(255, 255, 255)',
                hoverBackgroundColor: isDark ? '#1F2937' : 'white',
                borderColor: function (context) {
                    return context.dataset.borderColor;
                },
                hoverBorderWidth: 3,
            },
            line: {
                borderWidth: 1
            }
        },
        hover: {
            mode: 'index',
            intersect: false,
        },
        onHover: (event, elements) => {
            event.native.target.style.cursor = 'crosshair';
        }
    };

    // Custom legend items
    const legendItems = [
        { label: 'Visits', color: 'rgb(53, 162, 235)' },
        { label: 'Contacts', color: 'rgb(75, 192, 192)' },
        { label: 'Saves', color: 'rgb(255, 99, 132)' }
    ];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2 sm:flex-nowrap">
                    {['selectedDate', '3days', 'week', 'month', 'quarter'].map((tab) => (
                        <button
                            key={tab}
                            className={`rounded px-3 py-2 text-sm transition-colors duration-200 sm:px-4 
                            ${view === tab
                                    ? 'bg-primary text-white dark:bg-blue-600'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                                }`}
                            onClick={() => setView(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-6">
                    {legendItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-300">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div
                className="min-h-[300px] w-full rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800 sm:min-h-[400px]"
                ref={lineChartRef}
            >
                <Line data={lineChartData} options={lineChartOptions} />
            </div>
        </div>
    );
}

export default SummaryTrend;