// // import React,{useState} from 'react'
// // import { jsPDF } from 'jspdf';
// // import 'jspdf-autotable';

// // import * as XLSX from 'xlsx';

// // import html2canvas from 'html2canvas';

// // function UserActivityTable({ filteredActivities, lineChartRef, selectedPropertyId, properties }) {
// //     console.log("filteredActivities", filteredActivities)
// //     const [showUserDetails, setShowUserDetails] = useState(true);
// //     const toggleUserDetails = () => {
// //         setShowUserDetails((prevState) => !prevState);
// //     };

// //     // User Activity Table
// //     const exportToExcel = () => {
// //         const data = filteredActivities.map((activity) => ({
// //             Username: showUserDetails ? activity.userName : '✘',
// //             VisitType: activity?.metadata?.visitType || "N/A",
// //             // Date_Time: activity.timestamp ? new Date(activity.timestamp).toLocaleString() : 'N/A',
// //             Date: activity.timestamp ? new Date(activity.timestamp).toLocaleDateString() : "N/A",
// //             Time: activity.timestamp ? new Date(activity.timestamp).toLocaleTimeString() : "N/A",

// //             Activity_Type: activity.type ? activity.type : 'N/A',
// //             // ContactNo: activity?.metadata?.phone || "N/A",
// //             // Email: activity?.metadata?.email || "N/A",
// //             PhoneNo : showUserDetails?(activity?.contactInfo?.phoneNumber || 'N/A') : '✘',
// //             Email : showUserDetails?(activity?.contactInfo?.email || 'N/A') : '✘',

// //             Device_Info: activity?.metadata?.deviceInfo || "N/A",
// //         }));
// //         const ws = XLSX.utils.json_to_sheet(data);
// //         const wb = XLSX.utils.book_new();
// //         XLSX.utils.book_append_sheet(wb, ws, "Property Activity");
// //         XLSX.writeFile(wb, "property_activity.xlsx");
// //     };


// //     // const exportToPDF = async () => {
// //     //     const doc = new jsPDF();

// //     //     // Find the property title
// //     //     const selectedProperty = properties.find(property => property.post_id === selectedPropertyId);
// //     //     const propertyTitle = selectedProperty ? selectedProperty.post_title : "Unknown Property";

// //     //     // Format the selected date
// //     //     const formattedDate = selectedDate.toLocaleDateString();

// //     //     // Add property title and selected date to the PDF header
// //     //     doc.setFontSize(16);
// //     //     doc.text(`Property: ${propertyTitle}`, 10, 10);
// //     //     doc.text(`Date: ${formattedDate}`, 10, 20);

// //     //     // Capture the Line chart as an image
// //     //     // const chartContainer = document.getElementById('lineChartContainer'); // The container holding the Line chart
// //     //     const chartContainer = lineChartRef.current; // The container holding the Line chart
// //     //     html2canvas(chartContainer).then((canvas) => {
// //     //         // Convert the canvas to an image
// //     //         const chartImage = canvas.toDataURL('image/png');

// //     //         // Add the chart image to the PDF
// //     //         doc.addImage(chartImage, 'PNG', 10, 30, 180, 100); // Adjust positioning and size as needed

// //     //         // Prepare the data for the table
// //     //         const data = filteredActivities.map((activity) => [
// //     //             showUserDetails ? activity.userName : '✘',
// //     //             activity.type ? activity.type : 'N/A',
// //     //             // activity.timestamp ? activity.timestamp : 'N/A',
// //     //             activity.timestamp ? new Date(activity.timestamp).toLocaleTimeString() : 'N/A',
// //     //             // activity.type === "VISIT" ? "Yes" : "No",
// //     //             activity?.metadata?.visitType || "N/A",
// //     //             // activity?.metadata?.phone || "N/A",
// //     //             // activity?.metadata?.email || "N/A",
// //     //             activity?.metadata?.deviceInfo || "N/A",
// //     //         ]);

// //     //         // Add the table below the chart image
// //     //         doc.autoTable({
// //     //             startY: 140, // Start the table below the chart
// //     //             head: [['Username', 'Activity Type', 'Time', 'Visit Type', 'Contact No.', 'Email', 'Device Info']],
// //     //             body: data,
// //     //         });

// //     //         // Save the document
// //     //         doc.save('property_activity.pdf');
// //     //     });
// //     // };
  
// //     const exportToPDF = async () => {
// //         const doc = new jsPDF();

// //         // Find the property title
// //         const selectedProperty = properties.find(property => property.post_id === selectedPropertyId);
// //         const propertyTitle = selectedProperty ? selectedProperty.post_title : "Unknown Property";

// //         // Format the selected date (assuming you have selectedDate in your component state)
// //         const formattedDate = new Date().toLocaleDateString(); // Update this as needed

// //         // Add property title and selected date to the PDF header
// //         doc.setFontSize(16);
// //         doc.text(`Property: ${propertyTitle}`, 10, 10);
// //         doc.text(`Date: ${formattedDate}`, 10, 20);

// //         // Ensure lineChartRef is passed as a prop
// //         const chartContainer = lineChartRef.current;
// //         if (!chartContainer) {
// //             console.error("Chart container not found.");
// //             return;
// //         }

// //         // Capture the Line chart as an image
// //         html2canvas(chartContainer).then((canvas) => {
// //             const chartImage = canvas.toDataURL('image/png');
// //             doc.addImage(chartImage, 'PNG', 10, 30, 180, 100); // Add chart image to the PDF

// //             // Prepare the data for the table
// //             const data = filteredActivities.map((activity) => [
// //                 showUserDetails ? activity.userName : '✘',
// //                 activity.type ? activity.type : 'N/A',
// //                 activity.timestamp ? new Date(activity.timestamp).toLocaleTimeString() : 'N/A',
// //                 activity?.metadata?.visitType || "N/A",
// //                 // activity?.contactInfo?.phoneNumber || "N/A",
// //                 // activity?.contactInfo?.email || "N/A",
// //                 showUserDetails ? (activity?.contactInfo?.phoneNumber || 'N/A') : '✘',
// //                 showUserDetails ? (activity?.contactInfo?.email || 'N/A') : '✘',
// //                 activity?.metadata?.deviceInfo || "N/A",
// //             ]);

// //             // Add the table below the chart image
// //             doc.autoTable({
// //                 startY: 140, // Start the table below the chart
// //                 head: [['Username', 'Activity Type', 'Time', 'Visit Type', 'Contact No.', 'Email', 'Device Info']],
// //                 body: data,
// //             });

// //             // Save the document
// //             doc.save('property_activity.pdf');
// //         }).catch((error) => {
// //             console.error("Error capturing the chart as an image:", error);
// //         });
// //     };

// //     return (
// //       <div className="mt-8">
// //           {filteredActivities.length > 0 ? (
// //               <>
// //                   <div className="flex gap-4 mb-6">
// //                       <button
// //                           onClick={toggleUserDetails}
// //                           className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-500"
// //                       >
// //                           {showUserDetails ? "Hide User Details" : "Show User Details"}
// //                       </button>
// //                       <button
// //                           onClick={exportToExcel}
// //                           className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-500"
// //                       >
// //                           Export to Excel
// //                       </button>
// //                       <button
// //                           onClick={exportToPDF}
// //                           className="px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-500"
// //                       >
// //                           Export to PDF
// //                       </button>
// //                   </div>

// //                   <div className="overflow-auto bg-white p-6 shadow rounded-lg">
// //                       <table className="table-auto w-full text-left">
// //                           <thead>
// //                               <tr className="bg-gray-100">
// //                                   <th className="px-4 py-2">Username</th>
// //                                   <th className="px-4 py-2">Activity Type</th>
// //                                   <th className="px-4 py-2">Date</th>
// //                                   <th className="px-4 py-2">Time</th>
// //                                   <th className="px-4 py-2">Visit Type</th>
// //                                   <th className="px-4 py-2">Contact No.</th>
// //                                   <th className="px-4 py-2">Email</th>
// //                                   <th className="px-4 py-2">Device Info</th>
// //                               </tr>
// //                           </thead>
// //                           <tbody>
// //                               {filteredActivities.map((activity, index) => (
// //                                   <tr key={index} className="border-b hover:bg-gray-50">
// //                                       <td className="px-4 py-2">
// //                                           {showUserDetails ? activity.userName : "\u2716"}
// //                                       </td>
// //                                       <td className="px-4 py-2">{activity.type}</td>
// //                                       <td className="px-4 py-2">
// //                                           {new Date(activity.timestamp).toLocaleDateString()}
// //                                       </td>
// //                                       <td className="px-4 py-2">
// //                                           {new Date(activity.timestamp).toLocaleTimeString()}
// //                                       </td>
// //                                       {/* <td className="px-4 py-2">
// //                                           {new Date(activity.timestamp).toLocaleString()}
// //                                       </td> */}
// //                                       <td className="px-4 py-2">
// //                                           {activity?.metadata?.visitType || "N/A"}
// //                                       </td>
// //                                       <td className="px-4 py-2">
// //                                           {/* {activity?.contactInfo?.phoneNumber || "N/A"} */}
// //                                           {showUserDetails ? (activity?.contactInfo?.phoneNumber || 'N/A') : '✘'}
// //                                       </td>
// //                                       <td className="px-4 py-2">
// //                                           {/* {activity?.contactInfo?.email || "N/A"} */}
// //                                           {showUserDetails ? (activity?.contactInfo?.email || 'N/A') : '✘'}
// //                                       </td>
// //                                       <td className="px-4 py-2">
// //                                           {activity?.metadata?.deviceInfo || "N/A"}
// //                                       </td>
// //                                   </tr>
// //                               ))}
// //                           </tbody>
// //                       </table>
// //                   </div>
// //               </>
// //           ) : (
// //               <p className="text-gray-500">No data available for this day.</p>
// //           )}
// //       </div>
// // )
// // }

// // export default UserActivityTable


// import React, { useState } from 'react';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';
// import * as XLSX from 'xlsx';
// import html2canvas from 'html2canvas';

// const UserActivityTable = ({ filteredActivities, lineChartRef, selectedPropertyId, properties }) => {
//     const [showUserDetails, setShowUserDetails] = useState(true);

//     const toggleUserDetails = () => {
//         setShowUserDetails((prevState) => !prevState);
//     };

//     const exportToExcel = () => {
//         const data = filteredActivities.map((activity) => ({
//             Username: showUserDetails ? activity.userName : '✘',
//             VisitType: activity?.metadata?.visitType || "N/A",
//             Date: activity.timestamp ? new Date(activity.timestamp).toLocaleDateString() : "N/A",
//             Time: activity.timestamp ? new Date(activity.timestamp).toLocaleTimeString() : "N/A",
//             Activity_Type: activity.type ? activity.type : 'N/A',
//             PhoneNo: showUserDetails ? (activity?.contactInfo?.phoneNumber || 'N/A') : '✘',
//             Email: showUserDetails ? (activity?.contactInfo?.email || 'N/A') : '✘',
//             Device_Info: activity?.metadata?.deviceInfo || "N/A",
//         }));
//         const ws = XLSX.utils.json_to_sheet(data);
//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, "Property Activity");
//         XLSX.writeFile(wb, "property_activity.xlsx");
//     };

//     const exportToPDF = async () => {
//         const doc = new jsPDF();
//         const selectedProperty = properties.find(property => property.post_id === selectedPropertyId);
//         const propertyTitle = selectedProperty ? selectedProperty.post_title : "Unknown Property";
//         const formattedDate = new Date().toLocaleDateString();

//         doc.setFontSize(16);
//         doc.text(`Property: ${propertyTitle}`, 10, 10);
//         doc.text(`Date: ${formattedDate}`, 10, 20);

//         const chartContainer = lineChartRef.current;
//         if (!chartContainer) {
//             console.error("Chart container not found.");
//             return;
//         }

//         html2canvas(chartContainer).then((canvas) => {
//             const chartImage = canvas.toDataURL('image/png');
//             doc.addImage(chartImage, 'PNG', 10, 30, 180, 100);

//             const data = filteredActivities.map((activity) => [
//                 showUserDetails ? activity.userName : '✘',
//                 activity.type ? activity.type : 'N/A',
//                 activity.timestamp ? new Date(activity.timestamp).toLocaleTimeString() : 'N/A',
//                 activity?.metadata?.visitType || "N/A",
//                 showUserDetails ? (activity?.contactInfo?.phoneNumber || 'N/A') : '✘',
//                 showUserDetails ? (activity?.contactInfo?.email || 'N/A') : '✘',
//                 activity?.metadata?.deviceInfo || "N/A",
//             ]);

//             doc.autoTable({
//                 startY: 140,
//                 head: [['Username', 'Activity Type', 'Time', 'Visit Type', 'Contact No.', 'Email', 'Device Info']],
//                 body: data,
//             });

//             doc.save('property_activity.pdf');
//         }).catch((error) => {
//             console.error("Error capturing the chart as an image:", error);
//         });
//     };

//     return (
//         <div className="mt-8">
//             {filteredActivities.length > 0 ? (
//                 <>
//                     <div className="flex flex-wrap gap-4 mb-6">
//                         <button
//                             onClick={toggleUserDetails}
//                             className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-500 dark:hover:bg-blue-400 transition-all duration-300 transform hover:scale-105"
//                         >
//                             {showUserDetails ? "Hide User Details" : "Show User Details"}
//                         </button>
//                         <button
//                             onClick={exportToExcel}
//                             className="px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-500 dark:hover:bg-green-400 transition-all duration-300 transform hover:scale-105"
//                         >
//                             Export to Excel
//                         </button>
//                         <button
//                             onClick={exportToPDF}
//                             className="px-4 py-2 bg-red-600 dark:bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-500 dark:hover:bg-red-400 transition-all duration-300 transform hover:scale-105"
//                         >
//                             Export to PDF
//                         </button>
//                     </div>

//                     <div className="overflow-auto rounded-xl shadow-xl bg-white dark:bg-gray-800 transition-colors duration-300">
//                         <div className="p-6">
//                             <table className="w-full border-collapse table-auto">
//                                 <thead>
//                                     <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200">
//                                         <th className="px-4 py-3 rounded-tl-lg">Username</th>
//                                         <th className="px-4 py-3">Activity Type</th>
//                                         <th className="px-4 py-3">Date</th>
//                                         <th className="px-4 py-3">Time</th>
//                                         <th className="px-4 py-3">Visit Type</th>
//                                         <th className="px-4 py-3">Contact No.</th>
//                                         <th className="px-4 py-3">Email</th>
//                                         <th className="px-4 py-3 rounded-tr-lg">Device Info</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="text-gray-600 dark:text-gray-300">
//                                     {filteredActivities.map((activity, index) => (
//                                         <tr
//                                             key={index}
//                                             className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
//                                         >
//                                             <td className="px-4 py-3">
//                                                 {showUserDetails ? activity.userName : "✘"}
//                                             </td>
//                                             <td className="px-4 py-3">{activity.type}</td>
//                                             <td className="px-4 py-3">
//                                                 {new Date(activity.timestamp).toLocaleDateString()}
//                                             </td>
//                                             <td className="px-4 py-3">
//                                                 {new Date(activity.timestamp).toLocaleTimeString()}
//                                             </td>
//                                             <td className="px-4 py-3">
//                                                 {activity?.metadata?.visitType || "N/A"}
//                                             </td>
//                                             <td className="px-4 py-3">
//                                                 {showUserDetails ? (activity?.contactInfo?.phoneNumber || 'N/A') : '✘'}
//                                             </td>
//                                             <td className="px-4 py-3">
//                                                 {showUserDetails ? (activity?.contactInfo?.email || 'N/A') : '✘'}
//                                             </td>
//                                             <td className="px-4 py-3">
//                                                 {activity?.metadata?.deviceInfo || "N/A"}
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </>
//             ) : (
//                 <p className="text-gray-500 dark:text-gray-400">No data available for this day.</p>
//             )}
//         </div>
//     );
// };

// export default UserActivityTable;

import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';

const UserActivityTable = ({ filteredActivities, lineChartRef, selectedPropertyId, properties }) => {
    console.log("filteredActivities", filteredActivities)
    const [showUserDetails, setShowUserDetails] = useState(true);

    const toggleUserDetails = () => {
        setShowUserDetails((prevState) => !prevState);
    };

    // Export functions remain the same
    const exportToExcel = () => {
        const data = filteredActivities.map((activity) => ({
            Username: showUserDetails ? activity.userName : '✘',
            VisitType: activity?.metadata?.visitType || "N/A",
            Date: activity.timestamp ? new Date(activity.timestamp).toLocaleDateString() : "N/A",
            Time: activity.timestamp ? new Date(activity.timestamp).toLocaleTimeString() : "N/A",
            Activity_Type: activity.type ? activity.type : 'N/A',
            PhoneNo: showUserDetails ? (activity?.contactInfo?.phoneNumber || 'N/A') : '✘',
            Email: showUserDetails ? (activity?.contactInfo?.email || 'N/A') : '✘',
            Device_Info: activity?.metadata?.deviceInfo || "N/A",
        }));
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Property Activity");
        XLSX.writeFile(wb, "property_activity.xlsx");
    };

    const exportToPDF = async () => {
        // PDF export logic remains the same
        const doc = new jsPDF();
        const selectedProperty = properties.find(property => property.post_id === selectedPropertyId);
        const propertyTitle = selectedProperty ? selectedProperty.post_title : "Unknown Property";
        const formattedDate = new Date().toLocaleDateString();

        doc.setFontSize(16);
        doc.text(`Property: ${propertyTitle}`, 10, 10);
        doc.text(`Date: ${formattedDate}`, 10, 20);

        const chartContainer = lineChartRef.current;
        if (!chartContainer) {
            console.error("Chart container not found.");
            return;
        }

        html2canvas(chartContainer).then((canvas) => {
            const chartImage = canvas.toDataURL('image/png');
            doc.addImage(chartImage, 'PNG', 10, 30, 180, 100);

            const data = filteredActivities.map((activity) => [
                showUserDetails ? activity.userName : '✘',
                activity.type ? activity.type : 'N/A',
                activity.timestamp ? new Date(activity.timestamp).toLocaleTimeString() : 'N/A',
                activity?.metadata?.visitType || "N/A",
                showUserDetails ? (activity?.contactInfo?.phoneNumber || 'N/A') : '✘',
                showUserDetails ? (activity?.contactInfo?.email || 'N/A') : '✘',
                activity?.metadata?.deviceInfo || "N/A",
            ]);

            doc.autoTable({
                startY: 140,
                head: [['Username', 'Activity Type', 'Time', 'Visit Type', 'Contact No.', 'Email', 'Device Info']],
                body: data,
            });

            doc.save('property_activity.pdf');
        }).catch((error) => {
            console.error("Error capturing the chart as an image:", error);
        });
    };

    return (
        <div className="mt-8 px-4 sm:px-0">
            {filteredActivities.length > 0 ? (
                <>
                    {/* Responsive button grid */}
                    <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-3 mb-6">
                        <button
                            onClick={toggleUserDetails}
                            className="w-full sm:w-auto px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-500 dark:hover:bg-blue-400 transition-all duration-300 text-sm sm:text-base"
                        >
                            {showUserDetails ? "Hide User Details" : "Show User Details"}
                        </button>
                        <button
                            onClick={exportToExcel}
                            className="w-full sm:w-auto px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-500 dark:hover:bg-green-400 transition-all duration-300 text-sm sm:text-base"
                        >
                            Export to Excel
                        </button>
                        <button
                            onClick={exportToPDF}
                            className="w-full sm:w-auto px-4 py-2 bg-red-600 dark:bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-500 dark:hover:bg-red-400 transition-all duration-300 text-sm sm:text-base"
                        >
                            Export to PDF
                        </button>
                    </div>

                    {/* Mobile-optimized table container */}
                    <div className="w-full rounded-xl shadow-xl bg-white dark:bg-gray-800 transition-colors duration-300">
                        <div className="overflow-x-auto">
                            <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-100 dark:bg-gray-700">
                                            <tr>
                                                <th scope="col" className="sticky left-0 z-10 bg-gray-100 dark:bg-gray-700 px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-200">
                                                    Username
                                                </th>
                                                {/* Other headers with responsive text size */}
                                                <th scope="col" className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-200">Activity Type</th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-200">Date</th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-200">Time</th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-200">Visit Type</th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-200">Contact No.</th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-200">Email</th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-200">Device Info</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                                            {filteredActivities.map((activity, index) => (
                                                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                                                    <td className="sticky left-0 z-10 bg-white dark:bg-gray-800 whitespace-nowrap px-4 py-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                                                        {showUserDetails ? activity.userName : "✘"}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300">{activity.type}</td>
                                                    <td className="whitespace-nowrap px-4 py-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                                                        {new Date(activity.timestamp).toLocaleDateString()}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                                                        {new Date(activity.timestamp).toLocaleTimeString()}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                                                        {activity?.metadata?.visitType || "N/A"}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                                                        {showUserDetails ? (activity?.contactInfo?.phoneNumber || 'N/A') : '✘'}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                                                        {showUserDetails ? (activity?.contactInfo?.email || 'N/A') : '✘'}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                                                        {activity?.metadata?.deviceInfo || "N/A"}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center">No data available for this day.</p>
            )}
        </div>
    );
};

export default UserActivityTable;