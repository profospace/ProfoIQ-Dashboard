import React, { useRef } from 'react'
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement, // Add this import for line chart
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register required components
ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);
function SummaryTrend({ lineChartData, lineChartOptions, lineChartRef }) {

  return (
      <div className="mt-8" id="lineChartContainer" ref={lineChartRef}>
          <h4 className="text-md font-semibold text-gray-700 mb-4">Summary Trends</h4>
          <div className="bg-white p-6 shadow rounded-lg w-full ">
              <Line data={lineChartData} options={lineChartOptions} />
          </div>
      </div>
  )
}

export default SummaryTrend