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


// import React from 'react';
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

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement);

// const BarChart = ({ properties, handleBarClick }) => {
//     // Get current color mode from HTML class
//     const isDarkMode = document.documentElement.classList.contains('dark');

//     // Dynamic colors based on theme
//     const themeColors = {
//         background: isDarkMode ? 'rgba(75, 192, 192, 0.2)' : 'rgba(75, 192, 192, 0.2)',
//         border: isDarkMode ? 'rgba(75, 192, 192, 1)' : 'rgba(75, 192, 192, 1)',
//         text: isDarkMode ? '#E2E8F0' : '#1E293B',
//         grid: isDarkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(148, 163, 184, 0.2)',
//         cardBg: isDarkMode ? 'rgb(30, 41, 59)' : 'white'
//     };

//     return (
//         <div className="w-full h-[400px] md:h-[450px] lg:h-[500px] p-4 pb-10 rounded-lg shadow-md transition-colors duration-200 dark:bg-slate-800 bg-white">
//             <h3 className="text-[1.8rem] font-semibold my-4 dark:text-slate-200">Property Visits Chart</h3>
//             <div className="w-full h-[calc(100%-2rem)]">
//                 <Bar
//                     data={{
//                         labels: properties?.map((property) => property?.post_title),
//                         datasets: [
//                             {
//                                 label: 'Number of Visits',
//                                 data: properties?.map((property) => property?.visted || 0),
//                                 backgroundColor: themeColors.background,
//                                 borderColor: themeColors.border,
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
//                                     color: themeColors.text,
//                                     boxWidth: 20,
//                                     padding: 20,
//                                     font: {
//                                         size: 12
//                                     }
//                                 }
//                             },
//                             tooltip: {
//                                 backgroundColor: themeColors.cardBg,
//                                 titleColor: themeColors.text,
//                                 bodyColor: themeColors.text,
//                                 borderColor: themeColors.border,
//                                 borderWidth: 1,
//                                 padding: 12,
//                                 cornerRadius: 8
//                             }
//                         },
//                         scales: {
//                             x: {
//                                 ticks: {
//                                     color: themeColors.text,
//                                     callback: function (val, index) {
//                                         const label = properties[index]?.post_title || '';
//                                         return window.innerWidth < 768
//                                             ? label.slice(0, 10) + (label.length > 10 ? '...' : '')
//                                             : label;
//                                     },
//                                     // maxRotation: 45,
//                                     // minRotation: 45
//                                 },
//                                 grid: {
//                                     display: false,
//                                     color: themeColors.grid
//                                 }
//                             },
//                             y: {
//                                 beginAtZero: true,
//                                 ticks: {
//                                     stepSize: 1,
//                                     color: themeColors.text
//                                 },
//                                 grid: {
//                                     color: themeColors.grid
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

// import React from 'react';
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

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement);

// const BarChart = ({ properties, projects, buildings, handleBarClick }) => {
//     // Get current color mode from HTML class
//     const isDarkMode = document.documentElement.classList.contains('dark');

//     // Dynamic colors based on theme
//     const themeColors = {
//         background: isDarkMode ? 'rgba(75, 192, 192, 0.2)' : 'rgba(75, 192, 192, 0.2)',
//         border: isDarkMode ? 'rgba(75, 192, 192, 1)' : 'rgba(75, 192, 192, 1)',
//         text: isDarkMode ? '#E2E8F0' : '#1E293B',
//         grid: isDarkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(148, 163, 184, 0.2)',
//         cardBg: isDarkMode ? 'rgb(30, 41, 59)' : 'white',
//         // Additional colors for projects and buildings
//         projectBackground: isDarkMode ? 'rgba(153, 102, 255, 0.2)' : 'rgba(153, 102, 255, 0.2)',
//         projectBorder: isDarkMode ? 'rgba(153, 102, 255, 1)' : 'rgba(153, 102, 255, 1)',
//         buildingBackground: isDarkMode ? 'rgba(255, 159, 64, 0.2)' : 'rgba(255, 159, 64, 0.2)',
//         buildingBorder: isDarkMode ? 'rgba(255, 159, 64, 1)' : 'rgba(255, 159, 64, 1)',
//     };

//     // Prepare datasets based on which data is available
//     const datasets = [];

//     // Add properties dataset if available
//     if (properties && properties.length > 0) {
//         datasets.push({
//             label: 'Properties Visits',
//             data: properties.map((property) => property?.visted || 0),
//             backgroundColor: themeColors.background,
//             borderColor: themeColors.border,
//             borderWidth: 1,
//         });
//     }

//     // Add projects dataset if available
//     if (projects && projects.length > 0) {
//         datasets.push({
//             label: 'Projects Visits',
//             data: projects.map((project) => project?.visted || 0),
//             backgroundColor: themeColors.projectBackground,
//             borderColor: themeColors.projectBorder,
//             borderWidth: 1,
//         });
//     }

//     // Add buildings dataset if available
//     if (buildings && buildings.length > 0) {
//         datasets.push({
//             label: 'Buildings Visits',
//             data: buildings.map((building) => building?.visted || 0),
//             backgroundColor: themeColors.buildingBackground,
//             borderColor: themeColors.buildingBorder,
//             borderWidth: 1,
//         });
//     }

//     // Prepare labels - combine all items
//     const allItems = [
//         ...(properties || []).map(item => ({ ...item, type: 'property' })),
//         ...(projects || []).map(item => ({ ...item, type: 'project' })),
//         ...(buildings || []).map(item => ({ ...item, type: 'building' }))
//     ];

//     // Custom click handler that knows which type of item was clicked
//     const handleEnhancedBarClick = (event, elements) => {
//         if (elements.length > 0) {
//             const index = elements[0].index;
//             const item = allItems[index];
//             // Pass the item and its type to the original handler
//             if (handleBarClick) {
//                 handleBarClick(event, elements, item);
//             }
//         }
//     };

//     return (
//         <div className="w-full h-[400px] md:h-[450px] lg:h-[500px] p-4 pb-10 rounded-lg shadow-md transition-colors duration-200 dark:bg-slate-800 bg-white">
//             <h3 className="text-[1.8rem] font-semibold my-4 dark:text-slate-200">Asset Visits Chart</h3>
//             <div className="w-full h-[calc(100%-2rem)]">
//                 <Bar
//                     data={{
//                         labels: allItems.map(item => item?.post_title || item?.name || 'Unnamed'),
//                         datasets: datasets,
//                     }}
//                     options={{
//                         onClick: handleEnhancedBarClick,
//                         responsive: true,
//                         maintainAspectRatio: false,
//                         plugins: {
//                             legend: {
//                                 position: 'top',
//                                 labels: {
//                                     color: themeColors.text,
//                                     boxWidth: 20,
//                                     padding: 20,
//                                     font: {
//                                         size: 12
//                                     }
//                                 }
//                             },
//                             tooltip: {
//                                 backgroundColor: themeColors.cardBg,
//                                 titleColor: themeColors.text,
//                                 bodyColor: themeColors.text,
//                                 borderColor: themeColors.border,
//                                 borderWidth: 1,
//                                 padding: 12,
//                                 cornerRadius: 8,
//                                 callbacks: {
//                                     title: function (tooltipItems) {
//                                         const index = tooltipItems[0].dataIndex;
//                                         const item = allItems[index];
//                                         return `${item.type.charAt(0).toUpperCase() + item.type.slice(1)}: ${item.post_title || item.name || 'Unnamed'}`;
//                                     }
//                                 }
//                             }
//                         },
//                         scales: {
//                             x: {
//                                 ticks: {
//                                     color: themeColors.text,
//                                     callback: function (val, index) {
//                                         const item = allItems[index];
//                                         const label = item?.post_title || item?.name || 'Unnamed';
//                                         return window.innerWidth < 768
//                                             ? label.slice(0, 10) + (label.length > 10 ? '...' : '')
//                                             : label;
//                                     },
//                                 },
//                                 grid: {
//                                     display: false,
//                                     color: themeColors.grid
//                                 }
//                             },
//                             y: {
//                                 beginAtZero: true,
//                                 ticks: {
//                                     stepSize: 1,
//                                     color: themeColors.text
//                                 },
//                                 grid: {
//                                     color: themeColors.grid
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


import React, { useState } from 'react';
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

const BarChart = ({ properties, projects, buildings, handleBarClick }) => {
    // State to track which entity type filter is active
    const [activeFilter, setActiveFilter] = useState('all');

    // Get current color mode from HTML class
    const isDarkMode = document.documentElement.classList.contains('dark');

    // Dynamic colors based on theme
    const themeColors = {
        propertyBackground: isDarkMode ? 'rgba(75, 192, 192, 0.2)' : 'rgba(75, 192, 192, 0.2)',
        propertyBorder: isDarkMode ? 'rgba(75, 192, 192, 1)' : 'rgba(75, 192, 192, 1)',
        projectBackground: isDarkMode ? 'rgba(153, 102, 255, 0.2)' : 'rgba(153, 102, 255, 0.2)',
        projectBorder: isDarkMode ? 'rgba(153, 102, 255, 1)' : 'rgba(153, 102, 255, 1)',
        buildingBackground: isDarkMode ? 'rgba(255, 159, 64, 0.2)' : 'rgba(255, 159, 64, 0.2)',
        buildingBorder: isDarkMode ? 'rgba(255, 159, 64, 1)' : 'rgba(255, 159, 64, 1)',
        text: isDarkMode ? '#E2E8F0' : '#1E293B',
        grid: isDarkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(148, 163, 184, 0.2)',
        cardBg: isDarkMode ? 'rgb(30, 41, 59)' : 'white',
    };

    // Filter entities based on the active filter
    const getFilteredEntities = () => {
        let filteredItems = [];

        if (activeFilter === 'all' || activeFilter === 'properties') {
            filteredItems = [
                ...(properties || []).map(item => ({
                    ...item,
                    type: 'property',
                    displayName: item.post_title || 'Unnamed Property',
                    visits: item.visted || 0,
                    color: themeColors.propertyBackground,
                    borderColor: themeColors.propertyBorder
                }))
            ];
        }

        if (activeFilter === 'all' || activeFilter === 'projects') {
            filteredItems = [
                ...filteredItems,
                ...(projects || []).map(item => ({
                    ...item,
                    type: 'project',
                    displayName: item.name || 'Unnamed Project',
                    visits: item.visted || 0,
                    color: themeColors.projectBackground,
                    borderColor: themeColors.projectBorder
                }))
            ];
        }

        if (activeFilter === 'all' || activeFilter === 'buildings') {
            filteredItems = [
                ...filteredItems,
                ...(buildings || []).map(item => ({
                    ...item,
                    type: 'building',
                    displayName: item.name || 'Unnamed Building',
                    visits: item.visted || 0,
                    color: themeColors.buildingBackground,
                    borderColor: themeColors.buildingBorder
                }))
            ];
        }

        // Sort by visit count for better visualization
        return filteredItems.sort((a, b) => b.visits - a.visits);
    };

    const filteredEntities = getFilteredEntities();

    // Prepare the chart data
    const chartData = {
        labels: filteredEntities.map(item => item.displayName),
        datasets: [
            {
                label: 'Total Visits',
                data: filteredEntities.map(item => item.visits),
                backgroundColor: filteredEntities.map(item => item.color),
                borderColor: filteredEntities.map(item => item.borderColor),
                borderWidth: 1,
            }
        ]
    };

    // Custom click handler that passes the clicked entity
    const handleChartClick = (event, elements) => {
        if (elements.length > 0) {
            const index = elements[0].index;
            const selectedEntity = filteredEntities[index];
            handleBarClick(event, elements, selectedEntity);
        }
    };

    return (
        <div className="w-full h-[400px] md:h-[450px] lg:h-[500px] p-4 pb-10 rounded-lg shadow-md transition-colors duration-200 dark:bg-slate-800 bg-white">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-[1.5rem] font-semibold dark:text-slate-200">Asset Visits Chart</h3>

                {/* Filter buttons */}
                <div className="flex space-x-2">
                    <button
                        onClick={() => setActiveFilter('all')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${activeFilter === 'all'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setActiveFilter('properties')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${activeFilter === 'properties'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                    >
                        Properties
                    </button>
                    <button
                        onClick={() => setActiveFilter('projects')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${activeFilter === 'projects'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                    >
                        Projects
                    </button>
                    <button
                        onClick={() => setActiveFilter('buildings')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${activeFilter === 'buildings'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                    >
                        Buildings
                    </button>
                </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center">
                    <div className="w-4 h-4 mr-2 rounded" style={{ backgroundColor: themeColors.propertyBorder }}></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">Properties</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 mr-2 rounded" style={{ backgroundColor: themeColors.projectBorder }}></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">Projects</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 mr-2 rounded" style={{ backgroundColor: themeColors.buildingBorder }}></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">Buildings</span>
                </div>
            </div>

            <div className="w-full h-[calc(100%-5rem)]">
                {filteredEntities.length > 0 ? (
                    <Bar
                        data={chartData}
                        options={{
                            onClick: handleChartClick,
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: false
                                },
                                tooltip: {
                                    backgroundColor: themeColors.cardBg,
                                    titleColor: themeColors.text,
                                    bodyColor: themeColors.text,
                                    borderColor: themeColors.grid,
                                    borderWidth: 1,
                                    padding: 12,
                                    cornerRadius: 8,
                                    callbacks: {
                                        title: function (tooltipItems) {
                                            const index = tooltipItems[0].dataIndex;
                                            const item = filteredEntities[index];
                                            return `${item.type.charAt(0).toUpperCase() + item.type.slice(1)}: ${item.displayName}`;
                                        },
                                        label: function (context) {
                                            return `Visits: ${context.parsed.y}`;
                                        }
                                    }
                                }
                            },
                            scales: {
                                x: {
                                    ticks: {
                                        color: themeColors.text,
                                        callback: function (val, index) {
                                            const label = filteredEntities[index]?.displayName || '';
                                            return window.innerWidth < 768
                                                ? label.slice(0, 10) + (label.length > 10 ? '...' : '')
                                                : label;
                                        },
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
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500 dark:text-gray-400">No data available for the selected filter.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BarChart;