import React, { useState, useEffect } from 'react';
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

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement);

const BarChart = ({ properties, handleBarClick }) => {
    console.log("properties", properties )
    return (
        <div className="bar-chart-container h-[400px] w-[72vw] ">
            <h3>Property Visits Chart</h3>
            <Bar
                data={{
                    labels: properties?.map((property) => property?.post_title),
                    datasets: [
                        {
                            label: 'Number of Visits',
                            data: properties?.map((property) => property?.visted || 0),
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                }}
                // options={{
                //     onClick: handleBarClick,
                //     scales: {
                //         x: {
                //             ticks: {
                //                 callback: function (val, index) {
                //                     return properties[index]?.post_title;
                //                 },
                //             },
                //             afterTickToLabelConversion: function (scale) {
                //                 const xLabels = scale.ticks.map((value, index) => {
                //                     // Additional transformations can be added here if needed
                //                     return properties[index]?.post_title;
                //                 });
                //                 scale.ticks = xLabels;
                //             },
                //         },
                //     },
                // }}
                options={{
                    onClick: handleBarClick,
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            ticks: {
                                callback: function (val, index) {
                                    // Directly returning the label string
                                    return properties[index]?.post_title || '';
                                },
                            },
                        },
                        y: {
                            beginAtZero: true,
                        },
                    },
                }}

            />
        </div>
    );
};

export default BarChart;
