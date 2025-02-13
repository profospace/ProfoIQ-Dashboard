// import React, { useState, useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend,
//     PointElement
// } from 'chart.js';

// // Register required components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement);

// const BarChart = ({ properties, handleBarClick }) => {
//     console.log("properties", properties)
//     // return (
//     //     <div className="bar-chart-container h-[400px] w-[72vw] ">
//     //         <h3>Property Visits Chart</h3>
//     //         <Bar
//     //             data={{
//     //                 labels: properties?.map((property) => property?.post_title),
//     //                 datasets: [
//     //                     {
//     //                         label: 'Number of Visits',
//     //                         data: properties?.map((property) => property?.visted || 0),
//     //                         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//     //                         borderColor: 'rgba(75, 192, 192, 1)',
//     //                         borderWidth: 1,
//     //                     },
//     //                 ],
//     //             }}
//     //             // options={{
//     //             //     onClick: handleBarClick,
//     //             //     scales: {
//     //             //         x: {
//     //             //             ticks: {
//     //             //                 callback: function (val, index) {
//     //             //                     return properties[index]?.post_title;
//     //             //                 },
//     //             //             },
//     //             //             afterTickToLabelConversion: function (scale) {
//     //             //                 const xLabels = scale.ticks.map((value, index) => {
//     //             //                     // Additional transformations can be added here if needed
//     //             //                     return properties[index]?.post_title;
//     //             //                 });
//     //             //                 scale.ticks = xLabels;
//     //             //             },
//     //             //         },
//     //             //     },
//     //             // }}
//     //             options={{
//     //                 onClick: handleBarClick,
//     //                 responsive: true,
//     //                 maintainAspectRatio: false,
//     //                 scales: {
//     //                     x: {
//     //                         ticks: {
//     //                             callback: function (val, index) {
//     //                                 // Directly returning the label string
//     //                                 return properties[index]?.post_title || '';
//     //                             },
//     //                         },
//     //                     },
//     //                     y: {
//     //                         beginAtZero: true,
//     //                     },
//     //                 },
//     //             }}

//     //         />
//     //     </div>
//     // );

//     return (
//         <div className="w-full h-[400px] md:h-[450px] lg:h-[500px] p-4 pb-10 bg-white rounded-sm shadow-sm">
//             <h3 className="text-[1.8rem] font-semibold my-4">Property Visits Chart</h3>
//             <div className="w-full h-[calc(100%-2rem)]">
//                 <Bar
//                     data={{
//                         labels: properties?.map((property) => property?.post_title),
//                         datasets: [
//                             {
//                                 label: 'Number of Visits',
//                                 data: properties?.map((property) => property?.visted || 0),
//                                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                                 borderColor: 'rgba(75, 192, 192, 1)',
//                                 borderWidth: 1,
//                             },
//                         ],
//                     }}
//                     options={{
//                         onClick: handleBarClick,
//                         responsive: true,
//                         maintainAspectRatio: false,
//                         plugins: {
//                             legend: {
//                                 position: 'top',
//                                 labels: {
//                                     boxWidth: 20,
//                                     padding: 20,
//                                     font: {
//                                         size: 12
//                                     }
//                                 }
//                             }
//                         },
//                         scales: {
//                             x: {
//                                 ticks: {
//                                     callback: function (val, index) {
//                                         const label = properties[index]?.post_title || '';
//                                         // Truncate long labels on mobile
//                                         return window.innerWidth < 768
//                                             ? label.slice(0, 10) + (label.length > 10 ? '...' : '')
//                                             : label;
//                                     },
//                                     maxRotation: 45,
//                                     minRotation: 45
//                                 },
//                                 grid: {
//                                     display: false
//                                 }
//                             },
//                             y: {
//                                 beginAtZero: true,
//                                 ticks: {
//                                     stepSize: 1
//                                 }
//                             }
//                         }
//                     }}
//                 />
//             </div>
//         </div>
//     );
// };

// export default BarChart;


import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement);

const BarChart = ({ properties, handleBarClick }) => {
    // Get current color mode from HTML class
    const isDarkMode = document.documentElement.classList.contains('dark');

    // Dynamic colors based on theme
    const themeColors = {
        background: isDarkMode ? 'rgba(75, 192, 192, 0.2)' : 'rgba(75, 192, 192, 0.2)',
        border: isDarkMode ? 'rgba(75, 192, 192, 1)' : 'rgba(75, 192, 192, 1)',
        text: isDarkMode ? '#E2E8F0' : '#1E293B',
        grid: isDarkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(148, 163, 184, 0.2)',
        cardBg: isDarkMode ? 'rgb(30, 41, 59)' : 'white'
    };

    return (
        <div className="w-full h-[400px] md:h-[450px] lg:h-[500px] p-4 pb-10 rounded-lg shadow-md transition-colors duration-200 dark:bg-slate-800 bg-white">
            <h3 className="text-[1.8rem] font-semibold my-4 dark:text-slate-200">Property Visits Chart</h3>
            <div className="w-full h-[calc(100%-2rem)]">
                <Bar
                    data={{
                        labels: properties?.map((property) => property?.post_title),
                        datasets: [
                            {
                                label: 'Number of Visits',
                                data: properties?.map((property) => property?.visted || 0),
                                backgroundColor: themeColors.background,
                                borderColor: themeColors.border,
                                borderWidth: 1,
                            },
                        ],
                    }}
                    options={{
                        onClick: handleBarClick,
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'top',
                                labels: {
                                    color: themeColors.text,
                                    boxWidth: 20,
                                    padding: 20,
                                    font: {
                                        size: 12
                                    }
                                }
                            },
                            tooltip: {
                                backgroundColor: themeColors.cardBg,
                                titleColor: themeColors.text,
                                bodyColor: themeColors.text,
                                borderColor: themeColors.border,
                                borderWidth: 1,
                                padding: 12,
                                cornerRadius: 8
                            }
                        },
                        scales: {
                            x: {
                                ticks: {
                                    color: themeColors.text,
                                    callback: function (val, index) {
                                        const label = properties[index]?.post_title || '';
                                        return window.innerWidth < 768
                                            ? label.slice(0, 10) + (label.length > 10 ? '...' : '')
                                            : label;
                                    },
                                    maxRotation: 45,
                                    minRotation: 45
                                },
                                grid: {
                                    display: false,
                                    color: themeColors.grid
                                }
                            },
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    stepSize: 1,
                                    color: themeColors.text
                                },
                                grid: {
                                    color: themeColors.grid
                                }
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default BarChart;