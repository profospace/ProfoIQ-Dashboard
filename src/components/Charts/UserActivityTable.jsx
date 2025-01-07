import React,{useState} from 'react'
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

import * as XLSX from 'xlsx';

import html2canvas from 'html2canvas';

function UserActivityTable({ filteredActivities, lineChartRef, selectedPropertyId, properties }) {
    console.log("filteredActivities", filteredActivities)
    const [showUserDetails, setShowUserDetails] = useState(true);
    const toggleUserDetails = () => {
        setShowUserDetails((prevState) => !prevState);
    };

    // User Activity Table
    const exportToExcel = () => {
        const data = filteredActivities.map((activity) => ({
            Username: showUserDetails ? activity.userName : '✘',
            VisitType: activity?.metadata?.visitType || "N/A",
            // Date_Time: activity.timestamp ? new Date(activity.timestamp).toLocaleString() : 'N/A',
            Date: activity.timestamp ? new Date(activity.timestamp).toLocaleDateString() : "N/A",
            Time: activity.timestamp ? new Date(activity.timestamp).toLocaleTimeString() : "N/A",

            Activity_Type: activity.type ? activity.type : 'N/A',
            // ContactNo: activity?.metadata?.phone || "N/A",
            // Email: activity?.metadata?.email || "N/A",
            PhoneNo : showUserDetails?(activity?.contactInfo?.phoneNumber || 'N/A') : '✘',
            Email : showUserDetails?(activity?.contactInfo?.email || 'N/A') : '✘',

            Device_Info: activity?.metadata?.deviceInfo || "N/A",
        }));
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Property Activity");
        XLSX.writeFile(wb, "property_activity.xlsx");
    };


    // const exportToPDF = async () => {
    //     const doc = new jsPDF();

    //     // Find the property title
    //     const selectedProperty = properties.find(property => property.post_id === selectedPropertyId);
    //     const propertyTitle = selectedProperty ? selectedProperty.post_title : "Unknown Property";

    //     // Format the selected date
    //     const formattedDate = selectedDate.toLocaleDateString();

    //     // Add property title and selected date to the PDF header
    //     doc.setFontSize(16);
    //     doc.text(`Property: ${propertyTitle}`, 10, 10);
    //     doc.text(`Date: ${formattedDate}`, 10, 20);

    //     // Capture the Line chart as an image
    //     // const chartContainer = document.getElementById('lineChartContainer'); // The container holding the Line chart
    //     const chartContainer = lineChartRef.current; // The container holding the Line chart
    //     html2canvas(chartContainer).then((canvas) => {
    //         // Convert the canvas to an image
    //         const chartImage = canvas.toDataURL('image/png');

    //         // Add the chart image to the PDF
    //         doc.addImage(chartImage, 'PNG', 10, 30, 180, 100); // Adjust positioning and size as needed

    //         // Prepare the data for the table
    //         const data = filteredActivities.map((activity) => [
    //             showUserDetails ? activity.userName : '✘',
    //             activity.type ? activity.type : 'N/A',
    //             // activity.timestamp ? activity.timestamp : 'N/A',
    //             activity.timestamp ? new Date(activity.timestamp).toLocaleTimeString() : 'N/A',
    //             // activity.type === "VISIT" ? "Yes" : "No",
    //             activity?.metadata?.visitType || "N/A",
    //             // activity?.metadata?.phone || "N/A",
    //             // activity?.metadata?.email || "N/A",
    //             activity?.metadata?.deviceInfo || "N/A",
    //         ]);

    //         // Add the table below the chart image
    //         doc.autoTable({
    //             startY: 140, // Start the table below the chart
    //             head: [['Username', 'Activity Type', 'Time', 'Visit Type', 'Contact No.', 'Email', 'Device Info']],
    //             body: data,
    //         });

    //         // Save the document
    //         doc.save('property_activity.pdf');
    //     });
    // };
  
    const exportToPDF = async () => {
        const doc = new jsPDF();

        // Find the property title
        const selectedProperty = properties.find(property => property.post_id === selectedPropertyId);
        const propertyTitle = selectedProperty ? selectedProperty.post_title : "Unknown Property";

        // Format the selected date (assuming you have selectedDate in your component state)
        const formattedDate = new Date().toLocaleDateString(); // Update this as needed

        // Add property title and selected date to the PDF header
        doc.setFontSize(16);
        doc.text(`Property: ${propertyTitle}`, 10, 10);
        doc.text(`Date: ${formattedDate}`, 10, 20);

        // Ensure lineChartRef is passed as a prop
        const chartContainer = lineChartRef.current;
        if (!chartContainer) {
            console.error("Chart container not found.");
            return;
        }

        // Capture the Line chart as an image
        html2canvas(chartContainer).then((canvas) => {
            const chartImage = canvas.toDataURL('image/png');
            doc.addImage(chartImage, 'PNG', 10, 30, 180, 100); // Add chart image to the PDF

            // Prepare the data for the table
            const data = filteredActivities.map((activity) => [
                showUserDetails ? activity.userName : '✘',
                activity.type ? activity.type : 'N/A',
                activity.timestamp ? new Date(activity.timestamp).toLocaleTimeString() : 'N/A',
                activity?.metadata?.visitType || "N/A",
                // activity?.contactInfo?.phoneNumber || "N/A",
                // activity?.contactInfo?.email || "N/A",
                showUserDetails ? (activity?.contactInfo?.phoneNumber || 'N/A') : '✘',
                showUserDetails ? (activity?.contactInfo?.email || 'N/A') : '✘',
                activity?.metadata?.deviceInfo || "N/A",
            ]);

            // Add the table below the chart image
            doc.autoTable({
                startY: 140, // Start the table below the chart
                head: [['Username', 'Activity Type', 'Time', 'Visit Type', 'Contact No.', 'Email', 'Device Info']],
                body: data,
            });

            // Save the document
            doc.save('property_activity.pdf');
        }).catch((error) => {
            console.error("Error capturing the chart as an image:", error);
        });
    };

    return (
      <div className="mt-8">
          {filteredActivities.length > 0 ? (
              <>
                  <div className="flex gap-4 mb-6">
                      <button
                          onClick={toggleUserDetails}
                          className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-500"
                      >
                          {showUserDetails ? "Hide User Details" : "Show User Details"}
                      </button>
                      <button
                          onClick={exportToExcel}
                          className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-500"
                      >
                          Export to Excel
                      </button>
                      <button
                          onClick={exportToPDF}
                          className="px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-500"
                      >
                          Export to PDF
                      </button>
                  </div>

                  <div className="overflow-auto bg-white p-6 shadow rounded-lg">
                      <table className="table-auto w-full text-left">
                          <thead>
                              <tr className="bg-gray-100">
                                  <th className="px-4 py-2">Username</th>
                                  <th className="px-4 py-2">Activity Type</th>
                                  <th className="px-4 py-2">Date</th>
                                  <th className="px-4 py-2">Time</th>
                                  <th className="px-4 py-2">Visit Type</th>
                                  <th className="px-4 py-2">Contact No.</th>
                                  <th className="px-4 py-2">Email</th>
                                  <th className="px-4 py-2">Device Info</th>
                              </tr>
                          </thead>
                          <tbody>
                              {filteredActivities.map((activity, index) => (
                                  <tr key={index} className="border-b hover:bg-gray-50">
                                      <td className="px-4 py-2">
                                          {showUserDetails ? activity.userName : "\u2716"}
                                      </td>
                                      <td className="px-4 py-2">{activity.type}</td>
                                      <td className="px-4 py-2">
                                          {new Date(activity.timestamp).toLocaleDateString()}
                                      </td>
                                      <td className="px-4 py-2">
                                          {new Date(activity.timestamp).toLocaleTimeString()}
                                      </td>
                                      {/* <td className="px-4 py-2">
                                          {new Date(activity.timestamp).toLocaleString()}
                                      </td> */}
                                      <td className="px-4 py-2">
                                          {activity?.metadata?.visitType || "N/A"}
                                      </td>
                                      <td className="px-4 py-2">
                                          {/* {activity?.contactInfo?.phoneNumber || "N/A"} */}
                                          {showUserDetails ? (activity?.contactInfo?.phoneNumber || 'N/A') : '✘'}
                                      </td>
                                      <td className="px-4 py-2">
                                          {/* {activity?.contactInfo?.email || "N/A"} */}
                                          {showUserDetails ? (activity?.contactInfo?.email || 'N/A') : '✘'}
                                      </td>
                                      <td className="px-4 py-2">
                                          {activity?.metadata?.deviceInfo || "N/A"}
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              </>
          ) : (
              <p className="text-gray-500">No data available for this day.</p>
          )}
      </div>
)
}

export default UserActivityTable