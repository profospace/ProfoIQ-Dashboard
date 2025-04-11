// import React, { useEffect, useState, useRef } from 'react';
// import CardDataStats from '../../components/CardDataStats';
// import BarChart from '../../components/Charts/BarChart';
// import CalendarLight from '../../components/Charts/CalenderLight';
// import SummaryTrend from '../../components/Charts/SummaryTrend';
// import UserActivityTable from '../../components/Charts/UserActivityTable';
// import ChartOne from '../../components/Charts/ChartOne';
// import ChartThree from '../../components/Charts/ChartThree';
// import ChartTwo from '../../components/Charts/ChartTwo';
// import ChatCard from '../../components/Chat/ChatCard';
// import MapOne from '../../components/Maps/MapOne';
// import TableOne from '../../components/Tables/TableOne';
// import axios from 'axios';
// import { base_url } from '../../../utils/base_url';



// const ECommerce = () => {
//   const [properties, setProperties] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [filteredActivities, setFilteredActivities] = useState([]);
//   const [highlightedDates, setHighlightedDates] = useState([]);
//   const [selectedPropertyId, setSelectedPropertyId] = useState(null);
//   const [singlePropertyStats, setSinglePropertyStats] = useState([]);
//   const lineChartRef = useRef(null);
//   const [totalViews, setTotalViews] = useState(0)
//   const [todayTopVisitor, setTodayTopVisitor] = useState({}) //  (for all property - upper cards) object will have name , visits
//   const [monthlyTopVisitor, setMonthlyTopVisitor] = useState({})

//   // for selected property today's Top visitor , and monthly Top Visitor
//   const [selectedPropTodayTopVisitor, setSelectedPropTodayTopVisitor] = useState('')
//   const [selectedPropMonthlyTopVisitor, setSelectedPropMonthlyTopVisitor] = useState('')
//   const [builderId , setBuilderId] = useState(null)

//   useEffect(
//     ()=>{
//       const data = localStorage.getItem('builder-id') && JSON.parse(localStorage.getItem('builder-id')) 
//       setBuilderId(data?.id)
//       console.log("builder-id", data)
//     },[]
//   )



//   console.log("singlePropertyStats", singlePropertyStats)


//   // initall fetch builders all properties
//   const fetchProperties = async () => {
//     // getting builder id from localstorage
//     const payload = JSON.parse(localStorage.getItem('builder-id'))
//     // console.log(payload)
//     try {
//       const response = await axios.get(`${base_url}/api/builders/${payload?.id}/properties`);
//       // const response = await axios.get(`https://propertify.onrender.com/api/builders/6763ca5d2c71a5e27c41f783/properties`);

//       fetchInteraction(response?.data?.data?.properties?.[0])
//       setSelectedPropertyId(response?.data?.data?.properties?.[0]?.post_id)
//       console.log(response)
//       if (response.data.success) {
//         setProperties(response?.data?.data?.properties);
//       }
//     } catch (error) {
//       console.error("Error fetching properties:", error);
//     }
//   };

//   const fetchInteraction = async (property) => {
//     // console.log("property", property)
//     try {
//       const response = await axios.get(`${base_url}/properties-interaction/api/interactions/stats?propertyId=${property?.post_id}&builderId=${builderId}`);
//       const interactionData = response?.data?.data;
//       setSinglePropertyStats(interactionData);
//       filterActivitiesByDate(property?.post_id, selectedDate, interactionData);
//     } catch (error) {
//       console.error("Error fetching property interactions:", error);
//     }
//   };

//   const handleBarClick = (event, elements) => {
//     if (elements.length > 0) {
//       const propertyIndex = elements[0].index;
//       const property = properties[propertyIndex];
//       setSelectedPropertyId(property?.post_id);
//       fetchInteraction(property);
//     }
//   };

//   // User Activity Tabble
//   const filterActivitiesByDate = (propertyId, date, stats = singlePropertyStats) => {
//     const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
//     const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
//     const formattedDate = utcDate.toISOString().split('T')[0];

//     const propertyStats = stats?.find((stat) => stat?.propertyId === propertyId && stat?.date === formattedDate);
//     setFilteredActivities(propertyStats?.details || []);
//   };


//   // calender 
//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     if (selectedPropertyId) {
//       filterActivitiesByDate(selectedPropertyId, date);
//     }
//   };

//   // Summary Trend -  line chart
//   const lineChartData = {
//     labels: singlePropertyStats.map(stat => stat.date).sort((a, b) => new Date(a) - new Date(b)),
//     datasets: [
//       {
//         label: 'Total Visits',
//         data: singlePropertyStats.sort((a, b) => new Date(a.date) - new Date(b.date)).map(stat => stat.stats.visits || 0),
//         borderColor: 'rgba(75, 192, 192, 1)',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         tension: 0.3,
//         fill: false,
//       },
//       {
//         label: 'Total Contacts',
//         data: singlePropertyStats.sort((a, b) => new Date(a.date) - new Date(b.date)).map(stat => stat.stats.contacts || 0),
//         borderColor: 'rgba(255, 99, 132, 1)',
//         backgroundColor: 'rgba(255, 99, 132, 0.2)',
//         tension: 0.3,
//         fill: false,
//       },
//       {
//         label: 'Total Saves',
//         data: singlePropertyStats.sort((a, b) => new Date(a.date) - new Date(b.date)).map(stat => stat.stats.saves || 0),
//         borderColor: 'rgba(54, 162, 235, 1)',
//         backgroundColor: 'rgba(54, 162, 235, 0.2)',
//         tension: 0.3,
//         fill: false,
//       },
//     ],
//   };

//   const lineChartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Trends for Visits, Contacts, and Saves',
//       },
//       annotation: {
//         annotations: singlePropertyStats.map(stat => ({
//           type: 'line',
//           scaleID: 'x',
//           value: stat.date,
//           borderColor: 'rgba(0, 0, 0, 0.5)',
//           borderWidth: 1,
//           label: {
//             display: true,
//             content: stat.date,
//             position: 'start',
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             color: 'white',
//             font: {
//               size: 10,
//             },
//           },
//         })),
//       },
//     },
//   };




//   useEffect(() => {
//     if (singlePropertyStats.length > 0) {
//       const highlightedDates = singlePropertyStats
//         .filter(property => property.details && property.details.length > 0)
//         .map(property => property.date);

//       setHighlightedDates(highlightedDates);
//     }
//   }, [singlePropertyStats]);

//   useEffect(
//     () => {
//       fetchProperties()
//     }, []
//   )


//   useEffect(() => {
//     const totalVisited = properties.reduce((total, property) => total + property.visted, 0);
//     setTotalViews(totalVisited);
//     // console.log(totalVisited);
//   }, [properties]);





//   // // Colllecting data of Interaction for total , monthly , daily TOP visitor
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const responses = await Promise.all(
//           properties.map(async (property) => {
//             const response = await axios.get(
//               `${base_url}/properties-interaction/api/interactions/stats?propertyId=${property?.post_id}&builderId=${builderId}`
//             );
//             return response.data.data;
//           })
//         );

//         console.log(responses)

//         // Get all dates and find the most recent date
//         const allDates = responses.flatMap(propertyData =>
//           propertyData.map(entry => entry.date)
//         );
//         const mostRecentDate = allDates.sort().reverse()[0];

//         // // Calculate today's visitors
//         // Get today's date in YYYY-MM-DD format
//         const todayDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

//         // Calculate today's visitors
//         const todayVisitors = {};
//         responses.forEach(propertyData => {
//           const todayData = propertyData.find(entry => entry.date === todayDate); // Check for today's date
//           if (todayData) {
//             todayData.details.forEach(detail => {
//               if (detail.type === 'VISIT') {
//                 todayVisitors[detail.userName] = (todayVisitors[detail.userName] || 0) + 1;
//               }
//             });
//           }
//         });

//         // Get the most frequent visitor (Top Visitor)
//         const topVisitor = Object.entries(todayVisitors).reduce((top, [userName, visits]) => {
//           return visits > top.visits ? { userName, visits } : top;
//         }, { userName: '', visits: 0 });

//         console.log('Top Visitor Today:', topVisitor);


//         // Calculate monthly visitors
//         const currentMonth = mostRecentDate.substring(0, 7); // YYYY-MM
//         const monthlyVisitors = {};
//         responses.forEach(propertyData => {
//           propertyData.forEach(entry => {
//             if (entry.date.startsWith(currentMonth)) {
//               entry.details.forEach(detail => {
//                 if (detail.type === 'VISIT') {
//                   monthlyVisitors[detail.userName] = (monthlyVisitors[detail.userName] || 0) + 1;
//                 }
//               });
//             }
//           });
//         });

//         // Sort and get top visitors
//         const todayTopVisitor = Object.entries(todayVisitors)
//           .sort(([, a], [, b]) => b - a)[0] || ['No visitors', 0];

//         const monthlyTopVisitor = Object.entries(monthlyVisitors)
//           .sort(([, a], [, b]) => b - a)[0] || ['No visitors', 0];

//         console.log('Most Recent Date:', mostRecentDate);
//         console.log('Today\'s Top Visitor:', {
//           name: todayTopVisitor[0],
//           visits: todayTopVisitor[1]
//         });

//         setTodayTopVisitor({
//           name: todayTopVisitor[0],
//           visits: todayTopVisitor[1]
//         })

//         console.log('Monthly Top Visitor:', {
//           name: monthlyTopVisitor[0],
//           visits: monthlyTopVisitor[1]
//         });
//         setMonthlyTopVisitor({
//           name: monthlyTopVisitor[0],
//           visits: monthlyTopVisitor[1]
//         })

//         // Log all visitors for verification
//         console.log('\nAll Today\'s Visitors:', todayVisitors);
//         console.log('All Monthly Visitors:', monthlyVisitors);

//       } catch (error) {
//         console.error("Error fetching data: ", error);
//       }
//     };

//     fetchData();
//   }, [properties]);



//   // single selected property stats calculation *****************************
//   useEffect(
//     () => {

//       // Get all visitors for today (assuming today is 2024-12-29)
//       // const todayData = singlePropertyStats.find(day => day.date === "2024-12-25");
//       const today = new Date().toISOString().split('T')[0]; // Formats date as "YYYY-MM-DD"

//       const todayData = singlePropertyStats.find(day => day.date === today);

//       const todayVisitors = {};
//       if (todayData) {
//         todayData.details.forEach(detail => {
//           if (detail.type === "VISIT") {
//             todayVisitors[detail.userName] = (todayVisitors[detail.userName] || 0) + 1;
//           }
//         });
//       }
//       const topTodayVisitor = Object.entries(todayVisitors)
//         .sort(([, a], [, b]) => b - a)[0] || ['No visitors', 0];

//       // Get all visitors for the month
//       const monthlyVisitors = {};
//       singlePropertyStats.forEach(day => {
//         day.details.forEach(detail => {
//           if (detail.type === "VISIT") {
//             monthlyVisitors[detail.userName] = (monthlyVisitors[detail.userName] || 0) + 1;
//           }
//         });
//       });
//       const topMonthlyVisitor = Object.entries(monthlyVisitors)
//         .sort(([, a], [, b]) => b - a)[0] || ['No visitors', 0];



//       // console.log("Today's Top Visitor" , topTodayVisitor[0] , topTodayVisitor[1] , "Monthly Top Visitor" , topMonthlyVisitor[0] , topMonthlyVisitor[1])

//       setSelectedPropTodayTopVisitor(topTodayVisitor)
//       setSelectedPropMonthlyTopVisitor(topMonthlyVisitor)

//     }, [singlePropertyStats]
//   )


//   console.log(selectedPropTodayTopVisitor, selectedPropMonthlyTopVisitor)

//   return (
//     <>
//       <div>
//         <h1 className="text-xl mb-2 font-semibold md:text-2xl lg:text-3xl">
//           Overall Performance{" "}
//         </h1>
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
//           {/* levelUp */}
//           <CardDataStats title="Total Visitors" total={totalViews ? totalViews : "____"} rate="" >
//             <svg
//               className="fill-primary dark:fill-white"
//               width="22"
//               height="16"
//               viewBox="0 0 22 16"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
//                 fill=""
//               />
//               <path
//                 d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
//                 fill=""
//               />
//             </svg>
//           </CardDataStats>

//           <CardDataStats title="Today Top Visitor" total={todayTopVisitor && `${todayTopVisitor.name ? todayTopVisitor.name : "___________"} (${todayTopVisitor.visits || 0} visits)`}>
//             <svg
//               className="fill-primary dark:fill-white"
//               width="22"
//               height="22"
//               viewBox="0 0 22 22"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z"
//                 fill=""
//               />
//               <path
//                 d="M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z"
//                 fill=""
//               />
//             </svg>
//           </CardDataStats>
//           <CardDataStats title="Monthly Top Visitor" total={monthlyTopVisitor && `${monthlyTopVisitor.name ? monthlyTopVisitor.name : "___________"} (${monthlyTopVisitor.visits || 0} visits)`} >
//             <svg
//               className="fill-primary dark:fill-white"
//               width="22"
//               height="18"
//               viewBox="0 0 22 18"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
//                 fill=""
//               />
//               <path
//                 d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
//                 fill=""
//               />
//               <path
//                 d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
//                 fill=""
//               />
//             </svg>
//           </CardDataStats>
//         </div>
//       </div>

//       {/* <div className='mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'> */}
//       <div className='w-full space-y-6 mt-4'>
//         <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-8">
//           <div className="w-full">
//             <BarChart properties={properties} handleBarClick={handleBarClick} />
//           </div>
//         </div>


//         {singlePropertyStats.length > 0 && (
//           <div className="space-y-4 md:space-y-6">
//             {/* Title */}
//             <div className="w-full">
//               <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
//                 Activity for{" "}
//                 {properties?.find((p) => p.post_id === selectedPropertyId)
//                   ?.post_title}
//               </h1>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:gap-8">
//               {/* Today's Top Visitor Card */}
//               <CardDataStats
//                 title="Today Top Visitor"
//                 total={
//                   selectedPropTodayTopVisitor &&
//                   `${selectedPropTodayTopVisitor[0]} (${selectedPropTodayTopVisitor[1]} visits)`
//                 }
//               >
//                 <svg
//                   className="fill-primary dark:fill-white"
//                   width="22"
//                   height="22"
//                   viewBox="0 0 22 22"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z"
//                     fill=""
//                   />
//                   <path
//                     d="M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z"
//                     fill=""
//                   />
//                 </svg>
//               </CardDataStats>

//               {/* Monthly Top Visitor Card */}
//               <CardDataStats
//                 title="Monthly Top Visitor"
//                 total={
//                   selectedPropMonthlyTopVisitor &&
//                   `${selectedPropMonthlyTopVisitor[0]} (${selectedPropMonthlyTopVisitor[1]} visits)`
//                 }
//               >
//                 <svg
//                   className="fill-primary dark:fill-white"
//                   width="22"
//                   height="18"
//                   viewBox="0 0 22 18"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
//                     fill=""
//                   />
//                   <path
//                     d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
//                     fill=""
//                   />
//                   <path
//                     d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
//                     fill=""
//                   />
//                 </svg>
//               </CardDataStats>
//             </div>
//           </div>
//         )}



//         {singlePropertyStats.length > 0 && (
//           <div className="space-y-6 lg:space-y-8">
//             {/* Calendar and Chart Container */}
//             <div className="">
//               {/* Calendar Section */}
//               <div className="w-full lg:col-span-4 xl:col-span-3">
//                 <div className="rounded-lg bg-white p-4 shadow-md dark:bg-boxdark sm:p-6">
//                   <CalendarLight
//                     selectedDate={selectedDate}
//                     onDateChange={handleDateChange}
//                     highlightedDates={highlightedDates}
//                   />
//                 </div>
//               </div>

//               {/* Chart Section */}
//               <div className="w-full lg:col-span-8 xl:col-span-9 mt-8">
//                 <div className="rounded-lg bg-white p-4 shadow-md dark:bg-boxdark sm:p-6">
//                   <SummaryTrend
//                     singlePropertyStats={singlePropertyStats}
//                     selectedDate={selectedDate}
//                     lineChartRef={lineChartRef}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="col-span-12">
//           <UserActivityTable filteredActivities={filteredActivities} lineChartRef={lineChartRef} selectedPropertyId={selectedPropertyId} properties={properties} />
//         </div>
//       </div>

//     </>
//   );
// };

// export default ECommerce;


// import React, { useEffect, useState, useRef } from 'react';
// import CardDataStats from '../../components/CardDataStats';
// import BarChart from '../../components/Charts/BarChart';
// import CalendarLight from '../../components/Charts/CalenderLight';
// import SummaryTrend from '../../components/Charts/SummaryTrend';
// import UserActivityTable from '../../components/Charts/UserActivityTable';
// import ChartOne from '../../components/Charts/ChartOne';
// import ChartThree from '../../components/Charts/ChartThree';
// import ChartTwo from '../../components/Charts/ChartTwo';
// import ChatCard from '../../components/Chat/ChatCard';
// import MapOne from '../../components/Maps/MapOne';
// import TableOne from '../../components/Tables/TableOne';
// import axios from 'axios';
// import { base_url } from '../../../utils/base_url';



// const ECommerce = () => {
//   const [properties, setProperties] = useState([]);
//   const [projects, setProjects] = useState([]); // New state for projects
//   const [buildings, setBuildings] = useState([]); // New state for buildings
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [filteredActivities, setFilteredActivities] = useState([]);
//   const [highlightedDates, setHighlightedDates] = useState([]);
//   const [selectedPropertyId, setSelectedPropertyId] = useState(null);
//   const [singlePropertyStats, setSinglePropertyStats] = useState([]);
//   const lineChartRef = useRef(null);
//   const [totalViews, setTotalViews] = useState(0)
//   const [todayTopVisitor, setTodayTopVisitor] = useState({}) //  (for all property - upper cards) object will have name , visits
//   const [monthlyTopVisitor, setMonthlyTopVisitor] = useState({})

//   // for selected property today's Top visitor , and monthly Top Visitor
//   const [selectedPropTodayTopVisitor, setSelectedPropTodayTopVisitor] = useState('')
//   const [selectedPropMonthlyTopVisitor, setSelectedPropMonthlyTopVisitor] = useState('')
//   const [builderId, setBuilderId] = useState('6763ca5d2c71a5e27c41f783')

//   const [selectedItemType, setSelectedItemType] = useState('property'); // New state to track selected item type
//   const [selectedProjectId, setSelectedProjectId] = useState(null); // New state for selected project
//   const [selectedBuildingId, setSelectedBuildingId] = useState(null); // New state for selected building


//   useEffect(
//     () => {
//       const data = localStorage.getItem('builder-id') && JSON.parse(localStorage.getItem('builder-id'))
//       setBuilderId(data?.id)
//       console.log("builder-id", data)
//     }, []
//   )



//   console.log("singlePropertyStats", singlePropertyStats)


//   // initall fetch builders all properties
//   const fetchProperties = async () => {
//     // getting builder id from localstorage
//     const payload = JSON.parse(localStorage.getItem('builder-id'))
//     console.log("payload", payload)
//     try {
//       const response = await axios.get(`${base_url}/api/builders/${payload?.id}/properties`);
//       // const response = await axios.get(`https://propertify.onrender.com/api/builders/6763ca5d2c71a5e27c41f783/properties`);

//       fetchInteraction(response?.data?.data?.properties?.[0])
//       setSelectedPropertyId(response?.data?.data?.properties?.[0]?.post_id)
//       setProjects(response?.data?.data?.projects || []);
//       setBuildings(response?.data?.data?.buildings || []);


//       console.log(response)
//       if (response.data.success) {
//         setProperties(response?.data?.data?.properties);
//       }
//     } catch (error) {
//       console.error("Error fetching properties:", error);
//     }
//   };

//   const fetchInteraction = async (property) => {
//     // console.log("property", property)
//     try {
//       const response = await axios.get(`${base_url}/properties-interaction/api/interactions/stats?propertyId=${property?.post_id}&builderId=${builderId}`);
//       const interactionData = response?.data?.data;
//       setSinglePropertyStats(interactionData);
//       filterActivitiesByDate(property?.post_id, selectedDate, interactionData);
//     } catch (error) {
//       console.error("Error fetching property interactions:", error);
//     }
//   };

//   const handleBarClick = (event, elements) => {
//     if (elements.length > 0) {
//       const propertyIndex = elements[0].index;
//       const property = properties[propertyIndex];
//       setSelectedPropertyId(property?.post_id);
//       fetchInteraction(property);
//     }
//   };

//   // User Activity Tabble
//   const filterActivitiesByDate = (propertyId, date, stats = singlePropertyStats) => {
//     const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
//     const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
//     const formattedDate = utcDate.toISOString().split('T')[0];

//     const propertyStats = stats?.find((stat) => stat?.propertyId === propertyId && stat?.date === formattedDate);
//     setFilteredActivities(propertyStats?.details || []);
//   };


//   // calender 
//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     if (selectedPropertyId) {
//       filterActivitiesByDate(selectedPropertyId, date);
//     }
//   };

//   // Summary Trend -  line chart
//   const lineChartData = {
//     labels: singlePropertyStats.map(stat => stat.date).sort((a, b) => new Date(a) - new Date(b)),
//     datasets: [
//       {
//         label: 'Total Visits',
//         data: singlePropertyStats.sort((a, b) => new Date(a.date) - new Date(b.date)).map(stat => stat.stats.visits || 0),
//         borderColor: 'rgba(75, 192, 192, 1)',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         tension: 0.3,
//         fill: false,
//       },
//       {
//         label: 'Total Contacts',
//         data: singlePropertyStats.sort((a, b) => new Date(a.date) - new Date(b.date)).map(stat => stat.stats.contacts || 0),
//         borderColor: 'rgba(255, 99, 132, 1)',
//         backgroundColor: 'rgba(255, 99, 132, 0.2)',
//         tension: 0.3,
//         fill: false,
//       },
//       {
//         label: 'Total Saves',
//         data: singlePropertyStats.sort((a, b) => new Date(a.date) - new Date(b.date)).map(stat => stat.stats.saves || 0),
//         borderColor: 'rgba(54, 162, 235, 1)',
//         backgroundColor: 'rgba(54, 162, 235, 0.2)',
//         tension: 0.3,
//         fill: false,
//       },
//     ],
//   };

//   const lineChartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Trends for Visits, Contacts, and Saves',
//       },
//       annotation: {
//         annotations: singlePropertyStats.map(stat => ({
//           type: 'line',
//           scaleID: 'x',
//           value: stat.date,
//           borderColor: 'rgba(0, 0, 0, 0.5)',
//           borderWidth: 1,
//           label: {
//             display: true,
//             content: stat.date,
//             position: 'start',
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             color: 'white',
//             font: {
//               size: 10,
//             },
//           },
//         })),
//       },
//     },
//   };




//   useEffect(() => {
//     if (singlePropertyStats.length > 0) {
//       const highlightedDates = singlePropertyStats
//         .filter(property => property.details && property.details.length > 0)
//         .map(property => property.date);

//       setHighlightedDates(highlightedDates);
//     }
//   }, [singlePropertyStats]);

//   useEffect(
//     () => {
//       fetchProperties()
//     }, []
//   )


//   useEffect(() => {
//     const totalVisited = properties.reduce((total, property) => total + property.visted, 0);
//     setTotalViews(totalVisited);
//     // console.log(totalVisited);
//   }, [properties]);





//   // // Colllecting data of Interaction for total , monthly , daily TOP visitor
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const responses = await Promise.all(
//           properties.map(async (property) => {
//             const response = await axios.get(
//               `${base_url}/properties-interaction/api/interactions/stats?propertyId=${property?.post_id}&builderId=${builderId}`
//             );
//             return response.data.data;
//           })
//         );

//         console.log(responses)

//         // Get all dates and find the most recent date
//         const allDates = responses.flatMap(propertyData =>
//           propertyData.map(entry => entry.date)
//         );
//         const mostRecentDate = allDates.sort().reverse()[0];

//         // // Calculate today's visitors
//         // Get today's date in YYYY-MM-DD format
//         const todayDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

//         // Calculate today's visitors
//         const todayVisitors = {};
//         responses.forEach(propertyData => {
//           const todayData = propertyData.find(entry => entry.date === todayDate); // Check for today's date
//           if (todayData) {
//             todayData.details.forEach(detail => {
//               if (detail.type === 'VISIT') {
//                 todayVisitors[detail.userName] = (todayVisitors[detail.userName] || 0) + 1;
//               }
//             });
//           }
//         });

//         // Get the most frequent visitor (Top Visitor)
//         const topVisitor = Object.entries(todayVisitors).reduce((top, [userName, visits]) => {
//           return visits > top.visits ? { userName, visits } : top;
//         }, { userName: '', visits: 0 });

//         console.log('Top Visitor Today:', topVisitor);


//         // Calculate monthly visitors
//         const currentMonth = mostRecentDate.substring(0, 7); // YYYY-MM
//         const monthlyVisitors = {};
//         responses.forEach(propertyData => {
//           propertyData.forEach(entry => {
//             if (entry.date.startsWith(currentMonth)) {
//               entry.details.forEach(detail => {
//                 if (detail.type === 'VISIT') {
//                   monthlyVisitors[detail.userName] = (monthlyVisitors[detail.userName] || 0) + 1;
//                 }
//               });
//             }
//           });
//         });

//         // Sort and get top visitors
//         const todayTopVisitor = Object.entries(todayVisitors)
//           .sort(([, a], [, b]) => b - a)[0] || ['No visitors', 0];

//         const monthlyTopVisitor = Object.entries(monthlyVisitors)
//           .sort(([, a], [, b]) => b - a)[0] || ['No visitors', 0];

//         console.log('Most Recent Date:', mostRecentDate);
//         console.log('Today\'s Top Visitor:', {
//           name: todayTopVisitor[0],
//           visits: todayTopVisitor[1]
//         });

//         setTodayTopVisitor({
//           name: todayTopVisitor[0],
//           visits: todayTopVisitor[1]
//         })

//         console.log('Monthly Top Visitor:', {
//           name: monthlyTopVisitor[0],
//           visits: monthlyTopVisitor[1]
//         });
//         setMonthlyTopVisitor({
//           name: monthlyTopVisitor[0],
//           visits: monthlyTopVisitor[1]
//         })

//         // Log all visitors for verification
//         console.log('\nAll Today\'s Visitors:', todayVisitors);
//         console.log('All Monthly Visitors:', monthlyVisitors);

//       } catch (error) {
//         console.error("Error fetching data: ", error);
//       }
//     };

//     fetchData();
//   }, [properties]);



//   // single selected property stats calculation *****************************
//   useEffect(
//     () => {

//       // Get all visitors for today (assuming today is 2024-12-29)
//       // const todayData = singlePropertyStats.find(day => day.date === "2024-12-25");
//       const today = new Date().toISOString().split('T')[0]; // Formats date as "YYYY-MM-DD"

//       const todayData = singlePropertyStats.find(day => day.date === today);

//       const todayVisitors = {};
//       if (todayData) {
//         todayData.details.forEach(detail => {
//           if (detail.type === "VISIT") {
//             todayVisitors[detail.userName] = (todayVisitors[detail.userName] || 0) + 1;
//           }
//         });
//       }
//       const topTodayVisitor = Object.entries(todayVisitors)
//         .sort(([, a], [, b]) => b - a)[0] || ['No visitors', 0];

//       // Get all visitors for the month
//       const monthlyVisitors = {};
//       singlePropertyStats.forEach(day => {
//         day.details.forEach(detail => {
//           if (detail.type === "VISIT") {
//             monthlyVisitors[detail.userName] = (monthlyVisitors[detail.userName] || 0) + 1;
//           }
//         });
//       });
//       const topMonthlyVisitor = Object.entries(monthlyVisitors)
//         .sort(([, a], [, b]) => b - a)[0] || ['No visitors', 0];



//       // console.log("Today's Top Visitor" , topTodayVisitor[0] , topTodayVisitor[1] , "Monthly Top Visitor" , topMonthlyVisitor[0] , topMonthlyVisitor[1])

//       setSelectedPropTodayTopVisitor(topTodayVisitor)
//       setSelectedPropMonthlyTopVisitor(topMonthlyVisitor)

//     }, [singlePropertyStats]
//   )


//   console.log(selectedPropTodayTopVisitor, selectedPropMonthlyTopVisitor)

//   return (
//     <>
//       <div>
//         <h1 className="text-xl mb-2 font-semibold md:text-2xl lg:text-3xl">
//           Overall Performance{" "}
//         </h1>
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
//           {/* levelUp */}
//           <CardDataStats title="Total Visitors" total={totalViews ? totalViews : "____"} rate="" >
//             <svg
//               className="fill-primary dark:fill-white"
//               width="22"
//               height="16"
//               viewBox="0 0 22 16"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
//                 fill=""
//               />
//               <path
//                 d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
//                 fill=""
//               />
//             </svg>
//           </CardDataStats>

//           <CardDataStats title="Today Top Visitor" total={todayTopVisitor && `${todayTopVisitor.name ? todayTopVisitor.name : "___________"} (${todayTopVisitor.visits || 0} visits)`}>
//             <svg
//               className="fill-primary dark:fill-white"
//               width="22"
//               height="22"
//               viewBox="0 0 22 22"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z"
//                 fill=""
//               />
//               <path
//                 d="M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z"
//                 fill=""
//               />
//             </svg>
//           </CardDataStats>
//           <CardDataStats title="Monthly Top Visitor" total={monthlyTopVisitor && `${monthlyTopVisitor.name ? monthlyTopVisitor.name : "___________"} (${monthlyTopVisitor.visits || 0} visits)`} >
//             <svg
//               className="fill-primary dark:fill-white"
//               width="22"
//               height="18"
//               viewBox="0 0 22 18"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
//                 fill=""
//               />
//               <path
//                 d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
//                 fill=""
//               />
//               <path
//                 d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
//                 fill=""
//               />
//             </svg>
//           </CardDataStats>
//         </div>
//       </div>

//       {/* <div className='mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'> */}
//       <div className='w-full space-y-6 mt-4'>
//         <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-8">
//           <div className="w-full">
//             {/* <BarChart properties={properties} handleBarClick={handleBarClick} /> */}
//             <BarChart
//               properties={properties}
//               projects={projects}
//               buildings={buildings}
//               handleBarClick={handleBarClick}
//             />
//           </div>
//         </div>


//         {singlePropertyStats.length > 0 && (
//           <div className="space-y-4 md:space-y-6">
//             {/* Title */}
//             <div className="w-full">
//               <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
//                 Activity for{" "}
//                 {properties?.find((p) => p.post_id === selectedPropertyId)
//                   ?.post_title}
//               </h1>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:gap-8">
//               {/* Today's Top Visitor Card */}
//               <CardDataStats
//                 title="Today Top Visitor"
//                 total={
//                   selectedPropTodayTopVisitor &&
//                   `${selectedPropTodayTopVisitor[0]} (${selectedPropTodayTopVisitor[1]} visits)`
//                 }
//               >
//                 <svg
//                   className="fill-primary dark:fill-white"
//                   width="22"
//                   height="22"
//                   viewBox="0 0 22 22"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z"
//                     fill=""
//                   />
//                   <path
//                     d="M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z"
//                     fill=""
//                   />
//                 </svg>
//               </CardDataStats>

//               {/* Monthly Top Visitor Card */}
//               <CardDataStats
//                 title="Monthly Top Visitor"
//                 total={
//                   selectedPropMonthlyTopVisitor &&
//                   `${selectedPropMonthlyTopVisitor[0]} (${selectedPropMonthlyTopVisitor[1]} visits)`
//                 }
//               >
//                 <svg
//                   className="fill-primary dark:fill-white"
//                   width="22"
//                   height="18"
//                   viewBox="0 0 22 18"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
//                     fill=""
//                   />
//                   <path
//                     d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
//                     fill=""
//                   />
//                   <path
//                     d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
//                     fill=""
//                   />
//                 </svg>
//               </CardDataStats>
//             </div>
//           </div>
//         )}



//         {singlePropertyStats.length > 0 && (
//           <div className="space-y-6 lg:space-y-8">
//             {/* Calendar and Chart Container */}
//             <div className="">
//               {/* Calendar Section */}
//               <div className="w-full lg:col-span-4 xl:col-span-3">
//                 <div className="rounded-lg bg-white p-4 shadow-md dark:bg-boxdark sm:p-6">
//                   <CalendarLight
//                     selectedDate={selectedDate}
//                     onDateChange={handleDateChange}
//                     highlightedDates={highlightedDates}
//                   />
//                 </div>
//               </div>

//               {/* Chart Section */}
//               <div className="w-full lg:col-span-8 xl:col-span-9 mt-8">
//                 <div className="rounded-lg bg-white p-4 shadow-md dark:bg-boxdark sm:p-6">
//                   <SummaryTrend
//                     singlePropertyStats={singlePropertyStats}
//                     selectedDate={selectedDate}
//                     lineChartRef={lineChartRef}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="col-span-12">
//           <UserActivityTable filteredActivities={filteredActivities} lineChartRef={lineChartRef} selectedPropertyId={selectedPropertyId} properties={properties} />
//         </div>
//       </div>

//     </>
//   );
// };

// export default ECommerce;

import React, { useEffect, useState, useRef } from 'react';
import CardDataStats from '../../components/CardDataStats';
import BarChart from '../../components/Charts/BarChart';
import CalendarLight from '../../components/Charts/CalenderLight';
import SummaryTrend from '../../components/Charts/SummaryTrend';
import UserActivityTable from '../../components/Charts/UserActivityTable';
import axios from 'axios';
import { base_url } from '../../../utils/base_url';

const ECommerce = () => {
  // State variables for entities
  const [properties, setProperties] = useState([]);
  const [projects, setProjects] = useState([]);
  const [buildings, setBuildings] = useState([]);

  // Selection and filtering states
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [highlightedDates, setHighlightedDates] = useState([]);
  const [selectedEntityId, setSelectedEntityId] = useState(null);
  const [selectedEntityType, setSelectedEntityType] = useState('PROPERTY');
  const [entityStats, setEntityStats] = useState([]);

  // Charts and refs
  const lineChartRef = useRef(null);

  // Analytics states
  const [totalViews, setTotalViews] = useState(0);
  const [todayTopVisitor, setTodayTopVisitor] = useState({});
  const [monthlyTopVisitor, setMonthlyTopVisitor] = useState({});
  const [selectedEntityTodayTopVisitor, setSelectedEntityTodayTopVisitor] = useState('');
  const [selectedEntityMonthlyTopVisitor, setSelectedEntityMonthlyTopVisitor] = useState('');
  const [builderId, setBuilderId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load builder ID from localStorage
  useEffect(() => {
    const data = localStorage.getItem('builder-id') && JSON.parse(localStorage.getItem('builder-id'));
    if (data?.id) {
      setBuilderId(data.id);
      console.log("builder-id loaded:", data.id);
    } else {
      console.warn("No builder ID found in localStorage");
    }
  }, []);

  // Fetch builder's properties, projects, and buildings
  const fetchBuilderData = async () => {
    setIsLoading(true);
    try {
      const payload = JSON.parse(localStorage.getItem('builder-id'));
      if (!payload?.id) {
        console.error("No builder ID available");
        setIsLoading(false);
        return;
      }

      console.log(`Fetching builder data for ID: ${payload.id}`);
      const response = await axios.get(`${base_url}/api/builders/${payload.id}/properties`);
      console.log("Builder data response:", response.data);

      const projectResponse = await axios.get(`${base_url}/api/builders/${payload.id}/projects`)
      console.log("propehectRes" , projectResponse?.data?.data?.projects)

      const propertiesData = response?.data?.data?.properties || [];
      const projectsData = response?.data?.data?.projects || [];
      const buildingsData = response?.data?.data?.buildings || [];

      setProperties(propertiesData);
      setProjects(projectResponse?.data?.data?.projects);
      setBuildings(buildingsData);

      // Calculate total views
      calculateTotalViews(propertiesData, projectsData, buildingsData);

      // Set the first entity as selected by default
      if (propertiesData.length > 0) {
        console.log("Setting default property:", propertiesData[0].post_id);
        setSelectedEntityId(propertiesData[0].post_id);
        setSelectedEntityType('PROPERTY');
        await fetchInteraction(propertiesData[0], 'PROPERTY');
      } else if (projectsData.length > 0) {
        console.log("Setting default project:", projectsData[0].projectId);
        setSelectedEntityId(projectsData[0].projectId);
        setSelectedEntityType('PROJECT');
        await fetchInteraction(projectsData[0], 'PROJECT');
      } else if (buildingsData.length > 0) {
        console.log("Setting default building:", buildingsData[0].buildingId);
        setSelectedEntityId(buildingsData[0].buildingId);
        setSelectedEntityType('BUILDING');
        await fetchInteraction(buildingsData[0], 'BUILDING');
      } else {
        console.warn("No properties, projects, or buildings found");
      }
    } catch (error) {
      console.error("Error fetching builder data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate total views across all entities
  const calculateTotalViews = (properties, projects, buildings) => {
    const propViews = properties.reduce((total, prop) => total + (prop.visted || 0), 0);
    const projectViews = projects.reduce((total, project) => total + (project.visted || 0), 0);
    const buildingViews = buildings.reduce((total, building) => total + (building.visted || 0), 0);
    const total = propViews + projectViews + buildingViews;
    setTotalViews(total);
    console.log(`Total views calculated: ${total} (Properties: ${propViews}, Projects: ${projectViews}, Buildings: ${buildingViews})`);
  };

  // Fetch interaction data for selected entity
  const fetchInteraction = async (entity, entityType) => {
    try {
      if (!builderId) {
        console.error("No builder ID available for interaction fetch");
        return;
      }

      const entityIdParam = entityType === 'PROPERTY'
        ? `propertyId=${entity?.post_id}`
        : entityType === 'PROJECT'
          ? `projectId=${entity?.projectId}`
          : `buildingId=${entity?.buildingId}`;

      console.log(`Fetching interactions: ${base_url}/properties-interaction/api/interactions/stats?${entityIdParam}&builderId=${builderId}&interactionEntity=${entityType}`);

      const response = await axios.get(
        `${base_url}/properties-interaction/api/interactions/stats?${entityIdParam}&builderId=${builderId}&interactionEntity=${entityType}`
      );

      const interactionData = response?.data?.data || [];
      console.log("Interaction data:", interactionData);
      setEntityStats(interactionData);

      filterActivitiesByDate(
        entityType === 'PROPERTY' ? entity?.post_id :
          entityType === 'PROJECT' ? entity?.projectId :
            entity?.buildingId,
        selectedDate,
        entityType,
        interactionData
      );
    } catch (error) {
      console.error(`Error fetching ${entityType} interactions:`, error);
      setEntityStats([]);
      setFilteredActivities([]);
    }
  };

  // Handle clicking on a bar in the chart
  const handleEntityClick = (event, elements, item) => {
    if (elements && elements.length > 0) {
      console.log("Entity clicked:", item);
      const entityId = item.post_id || item.projectId || item.buildingId;
      const entityType = item.type.toUpperCase();

      setSelectedEntityId(entityId);
      setSelectedEntityType(entityType);
      fetchInteraction(item, entityType);
    }
  };

  // Filter activities by date
  const filterActivitiesByDate = (entityId, date, entityType, stats = entityStats) => {
    const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
    const formattedDate = utcDate.toISOString().split('T')[0];

    console.log(`Filtering activities for ${entityType} ${entityId} on ${formattedDate}`);

    const entityData = stats?.find(
      (stat) => stat?.entityId === entityId &&
        stat?.entityType === entityType &&
        stat?.date === formattedDate
    );

    if (entityData?.details?.length > 0) {
      console.log(`Found ${entityData.details.length} activities for the selected date`);
      setFilteredActivities(entityData.details);
    } else {
      console.log("No activities found for the selected date");
      setFilteredActivities([]);
    }
  };

  // Handle date selection in calendar
  const handleDateChange = (date) => {
    console.log("Date changed:", date);
    setSelectedDate(date);
    if (selectedEntityId && selectedEntityType) {
      filterActivitiesByDate(selectedEntityId, date, selectedEntityType);
    }
  };

  // Initial data fetch
  useEffect(() => {
    if (builderId) {
      console.log("Initiating data fetch with builder ID:", builderId);
      fetchBuilderData();
    }
  }, [builderId]);

  // Update highlighted dates when entity stats change
  useEffect(() => {
    if (entityStats.length > 0) {
      const dates = entityStats
        .filter(entity => entity.details && entity.details.length > 0)
        .map(entity => entity.date);

      console.log("Setting highlighted dates:", dates);
      setHighlightedDates(dates);
    }
  }, [entityStats]);

  // Calculate visitor statistics across all entities
  useEffect(() => {
    const fetchVisitorStats = async () => {
      if (!builderId) return;
      console.log("projects", projects)
      try {
        console.log("Fetching visitor stats for all entities");

        // Fetch interactions for all entities
        const allEntityPromises = [
          ...properties.map(prop => axios.get(
            `${base_url}/properties-interaction/api/interactions/stats?propertyId=${prop?.post_id}&builderId=${builderId}`
          )),
          ...projects.map(project => axios.get(
            `${base_url}/properties-interaction/api/interactions/stats?projectId=${project?.projectId}&builderId=${builderId}`
          )),
          ...buildings.map(building => axios.get(
            `${base_url}/properties-interaction/api/interactions/stats?buildingId=${building?.buildingId}&builderId=${builderId}`
          ))
        ];

        if (allEntityPromises.length === 0) {
          console.log("No entities to fetch stats for");
          return;
        }

        const responses = await Promise.all(allEntityPromises);
        const allInteractionData = responses.flatMap(response => response.data.data || []);

        // Today's date in YYYY-MM-DD format
        const todayDate = new Date().toISOString().split('T')[0];

        // Calculate today's visitors
        const todayVisitors = {};
        allInteractionData?.forEach(data => {
          const todayData = data.find(entry => entry?.date === todayDate);
          if (todayData) {
            todayData.details.forEach(detail => {
              if (detail.type === 'VISIT') {
                todayVisitors[detail.userName] = (todayVisitors[detail.userName] || 0) + 1;
              }
            });
          }
        });

        // Calculate monthly visitors
        const currentMonth = todayDate.substring(0, 7); // YYYY-MM
        const monthlyVisitors = {};
        allInteractionData.forEach(data => {
          data.forEach(entry => {
            if (entry.date && entry.date.startsWith(currentMonth)) {
              entry.details.forEach(detail => {
                if (detail.type === 'VISIT') {
                  monthlyVisitors[detail.userName] = (monthlyVisitors[detail.userName] || 0) + 1;
                }
              });
            }
          });
        });

        // Get top visitors
        const todayTopVisitorArray = Object.entries(todayVisitors)
          .sort(([, a], [, b]) => b - a)[0] || ['No visitors', 0];

        const monthlyTopVisitorArray = Object.entries(monthlyVisitors)
          .sort(([, a], [, b]) => b - a)[0] || ['No visitors', 0];

        console.log("Today's top visitor:", todayTopVisitorArray);
        console.log("Monthly top visitor:", monthlyTopVisitorArray);

        setTodayTopVisitor({
          name: todayTopVisitorArray[0],
          visits: todayTopVisitorArray[1]
        });

        setMonthlyTopVisitor({
          name: monthlyTopVisitorArray[0],
          visits: monthlyTopVisitorArray[1]
        });

      } catch (error) {
        console.error("Error fetching visitor stats:", error);
      }
    };

    if (properties.length > 0 || projects.length > 0 || buildings.length > 0) {
      fetchVisitorStats();
    }
  }, [properties, projects, buildings, builderId]);

  // Calculate visitor statistics for selected entity
  useEffect(() => {
    if (entityStats.length === 0) return;

    // Get today's date
    const today = new Date().toISOString().split('T')[0];

    // Calculate today's top visitor for selected entity
    const todayVisitors = {};
    const todayData = entityStats.find(day => day.date === today);
    if (todayData && todayData.details) {
      todayData.details.forEach(detail => {
        if (detail.type === "VISIT") {
          todayVisitors[detail.userName] = (todayVisitors[detail.userName] || 0) + 1;
        }
      });
    }
    const topTodayVisitor = Object.entries(todayVisitors)
      .sort(([, a], [, b]) => b - a)[0] || ['No visitors', 0];

    // Calculate monthly top visitor for selected entity
    const monthlyVisitors = {};
    entityStats.forEach(day => {
      if (day.details) {
        day.details.forEach(detail => {
          if (detail.type === "VISIT") {
            monthlyVisitors[detail.userName] = (monthlyVisitors[detail.userName] || 0) + 1;
          }
        });
      }
    });
    const topMonthlyVisitor = Object.entries(monthlyVisitors)
      .sort(([, a], [, b]) => b - a)[0] || ['No visitors', 0];

    console.log("Selected entity today top visitor:", topTodayVisitor);
    console.log("Selected entity monthly top visitor:", topMonthlyVisitor);

    setSelectedEntityTodayTopVisitor(topTodayVisitor);
    setSelectedEntityMonthlyTopVisitor(topMonthlyVisitor);
  }, [entityStats]);

  // Get the name of the selected entity
  const getSelectedEntityName = () => {
    if (selectedEntityType === 'PROPERTY') {
      const property = properties.find(p => p.post_id === selectedEntityId);
      return property?.post_title || 'Unknown Property';
    } else if (selectedEntityType === 'PROJECT') {
      const project = projects.find(p => p.projectId === selectedEntityId);
      return project?.name || 'Unknown Project';
    } else {
      const building = buildings.find(b => b.buildingId === selectedEntityId);
      return building?.name || 'Unknown Building';
    }
  };

  return (
    <>
      <div>
        <h1 className="text-xl mb-2 font-semibold md:text-2xl lg:text-3xl">
          Overall Performance{" "}
        </h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
          <CardDataStats title="Total Visitors" total={totalViews ? totalViews.toString() : "____"} rate="" >
            <svg
              className="fill-primary dark:fill-white"
              width="22"
              height="16"
              viewBox="0 0 22 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
                fill=""
              />
              <path
                d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
                fill=""
              />
            </svg>
          </CardDataStats>

          <CardDataStats
            title="Today Top Visitor"
            total={todayTopVisitor && `${todayTopVisitor.name ? todayTopVisitor.name : "___________"} (${todayTopVisitor.visits || 0} visits)`}
          >
            <svg
              className="fill-primary dark:fill-white"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z"
                fill=""
              />
              <path
                d="M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z"
                fill=""
              />
            </svg>
          </CardDataStats>

          <CardDataStats
            title="Monthly Top Visitor"
            total={monthlyTopVisitor && `${monthlyTopVisitor.name ? monthlyTopVisitor.name : "___________"} (${monthlyTopVisitor.visits || 0} visits)`}
          >
            <svg
              className="fill-primary dark:fill-white"
              width="22"
              height="18"
              viewBox="0 0 22 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
                fill=""
              />
              <path
                d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
                fill=""
              />
              <path
                d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
                fill=""
              />
            </svg>
          </CardDataStats>
        </div>
      </div>

      <div className='w-full space-y-6 mt-8'>
        {/* Bar Chart - IMPORTANT! This was missing in the original implementation */}
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-8">
          <div className="w-full">
            <BarChart
              properties={properties}
              projects={projects}
              buildings={buildings}
              handleBarClick={handleEntityClick}
            />
          </div>
        </div>

        {selectedEntityId && (
          <div className="space-y-4 md:space-y-6">
            {/* Title with entity type indicator */}
            <div className="w-full flex items-center gap-3">
              <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                Activity for{" "}
              </h1>
              <div className={`px-3 py-1 rounded-full text-white text-xs font-semibold
                ${selectedEntityType === 'PROPERTY' ? 'bg-blue-600' :
                  selectedEntityType === 'PROJECT' ? 'bg-purple-600' : 'bg-orange-600'}`}>
                {selectedEntityType}
              </div>
              <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                {getSelectedEntityName()}
              </h1>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:gap-8">
              {/* Today's Top Visitor Card */}
              <CardDataStats
                title="Today Top Visitor"
                total={
                  selectedEntityTodayTopVisitor &&
                  `${selectedEntityTodayTopVisitor[0]} (${selectedEntityTodayTopVisitor[1]} visits)`
                }
              >
                <svg
                  className="fill-primary dark:fill-white"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z"
                    fill=""
                  />
                  <path
                    d="M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z"
                    fill=""
                  />
                </svg>
              </CardDataStats>

              {/* Monthly Top Visitor Card */}
              <CardDataStats
                title="Monthly Top Visitor"
                total={
                  selectedEntityMonthlyTopVisitor &&
                  `${selectedEntityMonthlyTopVisitor[0]} (${selectedEntityMonthlyTopVisitor[1]} visits)`
                }
              >
                <svg
                  className="fill-primary dark:fill-white"
                  width="22"
                  height="18"
                  viewBox="0 0 22 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
                    fill=""
                  />
                  <path
                    d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
                    fill=""
                  />
                  <path
                    d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
                    fill=""
                  />
                </svg>
              </CardDataStats>
            </div>
          </div>
        )}

        {/* Calendar and Charts Area */}
        <div className="space-y-6 lg:space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Calendar Section */}
            <div className="lg:col-span-4">
              <div className="rounded-lg bg-white p-4 shadow-md dark:bg-boxdark sm:p-6">
                <CalendarLight
                  selectedDate={selectedDate}
                  onDateChange={handleDateChange}
                  highlightedDates={highlightedDates}
                />
              </div>
            </div>

            {/* Chart Section */}
            <div className="lg:col-span-8">
              <div className="rounded-lg bg-white p-4 shadow-md dark:bg-boxdark sm:p-6">
                <SummaryTrend
                  singlePropertyStats={entityStats}
                  selectedDate={selectedDate}
                  lineChartRef={lineChartRef}
                />
              </div>
            </div>
          </div>
        </div>

        {/* User Activity Table */}
        <div className="mt-6">
          {isLoading ? (
            <div className="w-full flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <UserActivityTable
              filteredActivities={filteredActivities}
              lineChartRef={lineChartRef}
              selectedEntityId={selectedEntityId}
              selectedEntityType={selectedEntityType}
              properties={properties}
              projects={projects}
              buildings={buildings}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ECommerce;
