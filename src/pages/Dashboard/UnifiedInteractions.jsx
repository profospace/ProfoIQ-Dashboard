// import React, { useEffect, useState } from 'react';
// import { format, isToday, isYesterday, parseISO } from 'date-fns';
// import axios from 'axios';
// import { base_url } from '../../../utils/base_url';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const UnifiedInteractions = () => {
//     const [interactions, setInteractions] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [builderId, setBuilderId] = useState('');
//     const navigate = useNavigate();

//     // Load builder ID from localStorage
//     useEffect(() => {
//         const data = localStorage.getItem('builder-id') && JSON.parse(localStorage.getItem('builder-id'));
//         if (data?.id) {
//             setBuilderId(data.id);
//             console.log("Builder ID loaded:", data.id);
//         } else {
//             console.warn("No builder ID found in localStorage");
//         }
//     }, []);

//     // Fetch all interactions when builderId is available
//     useEffect(() => {
//         if (builderId) {
//             fetchAllInteractions();
//         }
//     }, [builderId]);

//     // Fetch all types of interactions
//     const fetchAllInteractions = async () => {
//         setIsLoading(true);
//         try {
//             // Fetch property interactions
//             const propertyResponse = await axios.get(
//                 `${base_url}/properties-interaction/api/interactions/stats?builderId=${builderId}`
//             );

//             // Fetch project interactions
//             const projectResponse = await axios.get(
//                 `${base_url}/properties-interaction/api/interactions/stats?builderId=${builderId}&interactionEntity=PROJECT`
//             );

//             // Extract and combine all interaction details
//             const propertyInteractions = propertyResponse?.data?.data || [];
//             const projectInteractions = projectResponse?.data?.data || [];

//             // Process property interactions
//             const processedPropertyInteractions = propertyInteractions.flatMap(item =>
//                 (item.details || []).map(detail => ({
//                     ...detail,
//                     entityId: item.entityId,
//                     entityType: 'PROPERTY',
//                     entityName: getEntityName(item.entityId, 'PROPERTY'),
//                     date: item.date,
//                     timestamp: detail.timestamp
//                 }))
//             );

//             // Process project interactions
//             const processedProjectInteractions = projectInteractions.flatMap(item =>
//                 (item.details || []).map(detail => ({
//                     ...detail,
//                     entityId: item.entityId,
//                     entityType: 'PROJECT',
//                     entityName: getEntityName(item.entityId, 'PROJECT'),
//                     date: item.date,
//                     timestamp: detail.timestamp
//                 }))
//             );

//             // Combine all interactions
//             const allInteractions = [
//                 ...processedPropertyInteractions,
//                 ...processedProjectInteractions
//             ];

//             // Sort by timestamp (newest first)
//             allInteractions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

//             setInteractions(allInteractions);
//         } catch (error) {
//             console.error("Error fetching interactions:", error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Helper function to get entity name (placeholder - in real app, this would use proper state data)
//     const getEntityName = (id, type) => {
//         // This is a placeholder - in a real app, you'd look up the actual name from your state
//         return type === 'PROPERTY' ? 'Property ' + id.substring(0, 4) : 'Project ' + id.substring(0, 4);
//     };

//     // Group interactions by date section (Today, Yesterday, or date)
//     const groupInteractionsByDate = (interactions) => {
//         const groups = {};

//         interactions.forEach(interaction => {
//             const date = parseISO(interaction.timestamp);
//             let dateKey;

//             if (isToday(date)) {
//                 dateKey = 'Today';
//             } else if (isYesterday(date)) {
//                 dateKey = 'Yesterday';
//             } else {
//                 dateKey = format(date, 'MMM d, yyyy');
//             }

//             if (!groups[dateKey]) {
//                 groups[dateKey] = [];
//             }

//             groups[dateKey].push(interaction);
//         });

//         return groups;
//     };

//     // Get color scheme based on interaction type
//     const getInteractionTypeColor = (type) => {
//         switch (type) {
//             case 'VISIT':
//                 return {
//                     bg: 'bg-green-50 dark:bg-green-900/20',
//                     text: 'text-green-700 dark:text-green-400',
//                     icon: (
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                         </svg>
//                     )
//                 };
//             case 'CONTACT':
//                 return {
//                     bg: 'bg-blue-50 dark:bg-blue-900/20',
//                     text: 'text-blue-700 dark:text-blue-400',
//                     icon: (
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                         </svg>
//                     )
//                 };
//             case 'SAVE':
//                 return {
//                     bg: 'bg-purple-50 dark:bg-purple-900/20',
//                     text: 'text-purple-700 dark:text-purple-400',
//                     icon: (
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
//                         </svg>
//                     )
//                 };
//             case 'CALLBACK':
//                 return {
//                     bg: 'bg-yellow-50 dark:bg-yellow-900/20',
//                     text: 'text-yellow-700 dark:text-yellow-400',
//                     icon: (
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//                         </svg>
//                     )
//                 };
//             default:
//                 return {
//                     bg: 'bg-gray-50 dark:bg-gray-700',
//                     text: 'text-gray-700 dark:text-gray-300',
//                     icon: (
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                     )
//                 };
//         }
//     };

//     // Get entity type badge
//     const getEntityTypeBadge = (type) => {
//         switch (type) {
//             case 'PROPERTY':
//                 return (
//                     <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
//                         Property
//                     </span>
//                 );
//             case 'PROJECT':
//                 return (
//                     <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
//                         Project
//                     </span>
//                 );
//             case 'BUILDING':
//                 return (
//                     <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
//                         Building
//                     </span>
//                 );
//             default:
//                 return null;
//         }
//     };

//     // Navigate to detail view
//     const navigateToDetail = (interaction) => {
//         if (interaction.entityType === 'PROPERTY') {
//             navigate(`/property-interaction/${interaction.entityId}?date=${interaction.date}`);
//         } else if (interaction.entityType === 'PROJECT') {
//             navigate(`/project-interaction/${interaction.entityId}?date=${interaction.date}`);
//         }
//     };

//     // Grouped interactions by date
//     const groupedInteractions = groupInteractionsByDate(interactions);

//     // Animation variants for Framer Motion
//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.07
//             }
//         }
//     };

//     const itemVariants = {
//         hidden: { y: 20, opacity: 0 },
//         visible: {
//             y: 0,
//             opacity: 1,
//             transition: {
//                 ease: [0.25, 0.1, 0.25, 1.0],
//                 duration: 0.5
//             }
//         }
//     };

//     const sectionVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.05
//             }
//         }
//     };

//     return (
//         <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6">
//                 All Interactions
//             </h1>

//             {isLoading ? (
//                 <div className="w-full flex items-center justify-center py-20">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//                 </div>
//             ) : interactions.length === 0 ? (
//                 <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
//                     <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
//                     </svg>
//                     <h2 className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">No Interactions Found</h2>
//                     <p className="mt-2 text-gray-500 dark:text-gray-400">There are no recorded interactions at this time.</p>
//                 </div>
//             ) : (
//                 <motion.div
//                     className="space-y-6"
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="visible"
//                 >
//                     {Object.entries(groupedInteractions).map(([dateLabel, dateInteractions]) => (
//                         <motion.div
//                             key={dateLabel}
//                             className="space-y-2"
//                             variants={sectionVariants}
//                         >
//                             <div className="flex items-center">
//                                 <div className="px-4 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 text-sm font-medium">
//                                     {dateLabel}
//                                 </div>
//                                 <div className="ml-3 h-px flex-grow bg-gray-200 dark:bg-gray-700"></div>
//                             </div>

//                             <div className="space-y-2">
//                                 {dateInteractions.map((interaction, index) => {
//                                     const typeColor = getInteractionTypeColor(interaction.type);

//                                     return (
//                                         <motion.div
//                                             key={`${interaction.entityId}-${interaction.timestamp}-${index}`}
//                                             className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
//                                             variants={itemVariants}
//                                             whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
//                                         >
//                                             <div className="p-4 flex items-center justify-between">
//                                                 <div className="flex items-start space-x-3">
//                                                     <div className={`p-2 rounded-full ${typeColor.bg} ${typeColor.text}`}>
//                                                         {typeColor.icon}
//                                                     </div>

//                                                     <div>
//                                                         <div className="flex items-center space-x-2">
//                                                             <h3 className="font-medium text-gray-800 dark:text-gray-200">
//                                                                 {interaction.userName || 'Anonymous User'}
//                                                             </h3>
//                                                             <div className="flex space-x-1">
//                                                                 {getEntityTypeBadge(interaction.entityType)}
//                                                                 <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
//                                                                     {interaction.type}
//                                                                 </span>
//                                                             </div>
//                                                         </div>

//                                                         <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//                                                             Interacted with {interaction.entityName} at {format(new Date(interaction.timestamp), 'h:mm a')}
//                                                         </p>

//                                                         {interaction.metadata && (
//                                                             <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
//                                                                 {interaction.metadata.visitType && (
//                                                                     <span className="mr-3">Visit type: {interaction.metadata.visitType}</span>
//                                                                 )}
//                                                                 {interaction.metadata.city && (
//                                                                     <span className="mr-3">Location: {interaction.metadata.city}</span>
//                                                                 )}
//                                                             </div>
//                                                         )}
//                                                     </div>
//                                                 </div>

//                                                 <button
//                                                     onClick={() => navigateToDetail(interaction)}
//                                                     className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
//                                                     aria-label="View details"
//                                                 >
//                                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                                     </svg>
//                                                 </button>
//                                             </div>
//                                         </motion.div>
//                                     );
//                                 })}
//                             </div>
//                         </motion.div>
//                     ))}
//                 </motion.div>
//             )}
//         </div>
//     );
// };

// export default UnifiedInteractions;


// import React, { useEffect, useState } from 'react';
// import { format, isToday, isYesterday, parseISO } from 'date-fns';
// import axios from 'axios';
// import { base_url } from '../../../utils/base_url';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const UnifiedInteractions = () => {
//     const [interactions, setInteractions] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [builderId, setBuilderId] = useState('');
//     const navigate = useNavigate();

//     // Load builder ID from localStorage
//     useEffect(() => {
//         const data = localStorage.getItem('builder-id') && JSON.parse(localStorage.getItem('builder-id'));
//         if (data?.id) {
//             setBuilderId(data.id);
//             console.log("Builder ID loaded:", data.id);
//         } else {
//             console.warn("No builder ID found in localStorage");
//         }
//     }, []);

//     // Fetch all interactions when builderId is available
//     useEffect(() => {
//         if (builderId) {
//             fetchAllInteractions();
//         }
//     }, [builderId]);

//     // Fetch all types of interactions
//     const fetchAllInteractions = async () => {
//         setIsLoading(true);
//         try {
//             // Fetch property interactions
//             const propertyResponse = await axios.get(
//                 `${base_url}/properties-interaction/api/interactions/stats?builderId=${builderId}`
//             );

//             // Fetch project interactions
//             const projectResponse = await axios.get(
//                 `${base_url}/properties-interaction/api/interactions/stats?builderId=${builderId}&interactionEntity=PROJECT`
//             );

//             // Extract and combine all interaction details
//             const propertyInteractions = propertyResponse?.data?.data || [];
//             const projectInteractions = projectResponse?.data?.data || [];

//             // Process property interactions
//             const processedPropertyInteractions = propertyInteractions.flatMap(item =>
//                 (item.details || []).map(detail => ({
//                     ...detail,
//                     entityId: item.entityId,
//                     entityType: 'PROPERTY',
//                     entityName: getEntityName(item.entityId, 'PROPERTY'),
//                     date: item.date,
//                     timestamp: detail.timestamp
//                 }))
//             );

//             // Process project interactions
//             const processedProjectInteractions = projectInteractions.flatMap(item =>
//                 (item.details || []).map(detail => ({
//                     ...detail,
//                     entityId: item.entityId,
//                     entityType: 'PROJECT',
//                     entityName: getEntityName(item.entityId, 'PROJECT'),
//                     date: item.date,
//                     timestamp: detail.timestamp
//                 }))
//             );

//             // Combine all interactions
//             const allInteractions = [
//                 ...processedPropertyInteractions,
//                 ...processedProjectInteractions
//             ];

//             // Sort by timestamp (newest first)
//             allInteractions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

//             setInteractions(allInteractions);
//         } catch (error) {
//             console.error("Error fetching interactions:", error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Helper function to get entity name (placeholder - in real app, this would use proper state data)
//     const getEntityName = (id, type) => {
//         // This is a placeholder - in a real app, you'd look up the actual name from your state
//         return type === 'PROPERTY' ? 'Property ' + id.substring(0, 4) : 'Project ' + id.substring(0, 4);
//     };

//     // Group interactions by date section (Today, Yesterday, or date)
//     const groupInteractionsByDate = (interactions) => {
//         const groups = {};

//         interactions.forEach(interaction => {
//             const date = parseISO(interaction.timestamp);
//             let dateKey;

//             if (isToday(date)) {
//                 dateKey = 'Today';
//             } else if (isYesterday(date)) {
//                 dateKey = 'Yesterday';
//             } else {
//                 dateKey = format(date, 'MMM d, yyyy');
//             }

//             if (!groups[dateKey]) {
//                 groups[dateKey] = [];
//             }

//             groups[dateKey].push(interaction);
//         });

//         return groups;
//     };

//     // Format date like the image example (DD - DD MON)
//     const formatDateRange = (date) => {
//         // For demonstration purposes, just return a date range
//         // In a real app, you would calculate this from actual dates
//         const timestamp = new Date(date);
//         const day = timestamp.getDate();
//         const month = timestamp.toLocaleString('default', { month: 'short' }).toUpperCase();

//         // This is just an example to match the image format - you would customize based on your needs
//         return `${day} - ${day + 1} ${month}`;
//     };

//     // Format time like the image example (HH:MM)
//     const formatTime = (date) => {
//         const timestamp = new Date(date);
//         const hours = timestamp.getHours().toString().padStart(2, '0');
//         const minutes = timestamp.getMinutes().toString().padStart(2, '0');
//         return `${hours}:${minutes}`;
//     };

//     // Get interaction type display name
//     const getInteractionTypeDisplay = (type) => {
//         switch (type) {
//             case 'VISIT':
//                 return 'View Property';
//             case 'CONTACT':
//                 return 'User Inquiry';
//             case 'SAVE':
//                 return 'Saved Item';
//             case 'CALLBACK':
//                 return 'Callback Request';
//             default:
//                 return type;
//         }
//     };

//     // Navigate to detail view
//     const navigateToDetail = (interaction) => {
//         if (interaction.entityType === 'PROPERTY') {
//             navigate(`/property-interaction/${interaction.entityId}?date=${interaction.date}`);
//         } else if (interaction.entityType === 'PROJECT') {
//             navigate(`/project-interaction/${interaction.entityId}?date=${interaction.date}`);
//         }
//     };

//     // Grouped interactions by date
//     const groupedInteractions = groupInteractionsByDate(interactions);

//     // Animation variants for Framer Motion
//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.07
//             }
//         }
//     };

//     const itemVariants = {
//         hidden: { y: 20, opacity: 0 },
//         visible: {
//             y: 0,
//             opacity: 1,
//             transition: {
//                 ease: [0.25, 0.1, 0.25, 1.0],
//                 duration: 0.5
//             }
//         }
//     };

//     const sectionVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.05
//             }
//         }
//     };

//     return (
//         <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
//                 All Interactions
//             </h1>

//             {isLoading ? (
//                 <div className="w-full flex items-center justify-center py-20">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//                 </div>
//             ) : interactions.length === 0 ? (
//                 <div className="bg-white rounded-lg shadow-md p-6 text-center">
//                     <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
//                     </svg>
//                     <h2 className="mt-4 text-lg font-semibold text-gray-700">No Interactions Found</h2>
//                     <p className="mt-2 text-gray-500">There are no recorded interactions at this time.</p>
//                 </div>
//             ) : (
//                 <motion.div
//                     className="space-y-6"
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="visible"
//                 >
//                     {Object.entries(groupedInteractions).map(([dateLabel, dateInteractions]) => (
//                         <motion.div
//                             key={dateLabel}
//                             className="space-y-2"
//                             variants={sectionVariants}
//                         >
//                             <div className="flex items-center">
//                                 <div className="px-4 py-1 bg-gray-200 rounded-full text-gray-700 text-sm font-medium">
//                                     {dateLabel}
//                                 </div>
//                                 <div className="ml-3 h-px flex-grow bg-gray-200"></div>
//                             </div>

//                             <div className="space-y-3">
//                                 {dateInteractions.map((interaction, index) => {
//                                     // Format date (DD - DD MON) and time (HH:MM) for the left side
//                                     const dateStr = formatDateRange(interaction.timestamp);
//                                     const timeStr = formatTime(interaction.timestamp);

//                                     return (
//                                         <motion.div
//                                             key={`${interaction.entityId}-${interaction.timestamp}-${index}`}
//                                             className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
//                                             variants={itemVariants}
//                                             whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
//                                         >
//                                             <div className="flex overflow-hidden">
//                                                 {/* Left side date/time block similar to the image */}
//                                                 <div className="flex flex-col items-center justify-center px-3 py-2 bg-gray-100 min-w-16 text-center">
//                                                     {dateLabel === 'Today' ? (
//                                                         <div className="text-center">
//                                                             <div className="uppercase text-xs font-semibold text-gray-500">TODAY</div>
//                                                             <div className="text-xl font-bold text-gray-800">{timeStr}</div>
//                                                         </div>
//                                                     ) : (
//                                                         <div className="text-center">
//                                                             <div className="text-xs font-semibold text-gray-500">{dateStr}</div>
//                                                             <div className="text-xl font-bold text-gray-800">{timeStr}</div>
//                                                         </div>
//                                                     )}
//                                                 </div>

//                                                 {/* Right side content */}
//                                                 <div className="p-4 flex-grow">
//                                                     <div className="flex justify-between items-start">
//                                                         <div>
//                                                             <h3 className="font-semibold text-gray-800">
//                                                                 {getInteractionTypeDisplay(interaction.type)}
//                                                             </h3>
//                                                             <p className="text-sm text-gray-600 mt-1">
//                                                                 {interaction.userName || 'Anonymous user'} interacted with {interaction.entityName}
//                                                             </p>
//                                                             <p className="text-xs text-gray-500 mt-1">
//                                                                 {interaction.metadata?.city && `Location: ${interaction.metadata.city}`}
//                                                             </p>
//                                                         </div>

//                                                         {/* Add to calendar button (like in the image) */}
//                                                         <button
//                                                             onClick={() => navigateToDetail(interaction)}
//                                                             className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
//                                                         >
//                                                             <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                                                             </svg>
//                                                             View details
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </motion.div>
//                                     );
//                                 })}
//                             </div>
//                         </motion.div>
//                     ))}
//                 </motion.div>
//             )}
//         </div>
//     );
// };

// export default UnifiedInteractions;

// import React, { useEffect, useState } from 'react';
// import { format, isToday, isYesterday, parseISO } from 'date-fns';
// import axios from 'axios';
// import { base_url } from '../../../utils/base_url';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const UnifiedInteractions = () => {
//     const [interactions, setInteractions] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [builderId, setBuilderId] = useState('');
//     const navigate = useNavigate();

//     // Load builder ID from localStorage
//     useEffect(() => {
//         const data = localStorage.getItem('builder-id') && JSON.parse(localStorage.getItem('builder-id'));
//         if (data?.id) {
//             setBuilderId(data.id);
//             console.log("Builder ID loaded:", data.id);
//         } else {
//             console.warn("No builder ID found in localStorage");
//         }
//     }, []);

//     // Fetch all interactions when builderId is available
//     useEffect(() => {
//         if (builderId) {
//             fetchAllInteractions();
//         }
//     }, [builderId]);

//     // Fetch all types of interactions
//     const fetchAllInteractions = async () => {
//         setIsLoading(true);
//         try {
//             // Fetch property interactions
//             const propertyResponse = await axios.get(
//                 `${base_url}/properties-interaction/api/interactions/stats?builderId=${builderId}`
//             );

//             // Fetch project interactions
//             const projectResponse = await axios.get(
//                 `${base_url}/properties-interaction/api/interactions/stats?builderId=${builderId}&interactionEntity=PROJECT`
//             );

//             // Extract and combine all interaction details
//             const propertyInteractions = propertyResponse?.data?.data || [];
//             const projectInteractions = projectResponse?.data?.data || [];

//             // Process property interactions
//             const processedPropertyInteractions = propertyInteractions.flatMap(item =>
//                 (item.details || []).map(detail => ({
//                     ...detail,
//                     entityId: item.entityId,
//                     entityType: 'PROPERTY',
//                     entityName: getEntityName(item.entityId, 'PROPERTY'),
//                     date: item.date,
//                     timestamp: detail.timestamp
//                 }))
//             );

//             // Process project interactions
//             const processedProjectInteractions = projectInteractions.flatMap(item =>
//                 (item.details || []).map(detail => ({
//                     ...detail,
//                     entityId: item.entityId,
//                     entityType: 'PROJECT',
//                     entityName: getEntityName(item.entityId, 'PROJECT'),
//                     date: item.date,
//                     timestamp: detail.timestamp
//                 }))
//             );

//             // Combine all interactions
//             const allInteractions = [
//                 ...processedPropertyInteractions,
//                 ...processedProjectInteractions
//             ];

//             // Sort by timestamp (newest first)
//             allInteractions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

//             setInteractions(allInteractions);
//         } catch (error) {
//             console.error("Error fetching interactions:", error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Helper function to get entity name (placeholder - in real app, this would use proper state data)
//     const getEntityName = (id, type) => {
//         // This is a placeholder - in a real app, you'd look up the actual name from your state
//         return type === 'PROPERTY' ? 'Property ' + id.substring(0, 4) : 'Project ' + id.substring(0, 4);
//     };

//     // Group interactions by date section (Today, Yesterday, or date)
//     const groupInteractionsByDate = (interactions) => {
//         const groups = {};

//         interactions.forEach(interaction => {
//             const date = parseISO(interaction.timestamp);
//             let dateKey;

//             if (isToday(date)) {
//                 dateKey = 'Today';
//             } else if (isYesterday(date)) {
//                 dateKey = 'Yesterday';
//             } else {
//                 dateKey = format(date, 'MMM d, yyyy');
//             }

//             if (!groups[dateKey]) {
//                 groups[dateKey] = [];
//             }

//             groups[dateKey].push(interaction);
//         });

//         return groups;
//     };

//     // Format date like the image example (DD - DD MON)
//     const formatDateRange = (date) => {
//         // For demonstration purposes, just return a date range
//         // In a real app, you would calculate this from actual dates
//         const timestamp = new Date(date);
//         const day = timestamp.getDate();
//         const month = timestamp.toLocaleString('default', { month: 'short' }).toUpperCase();

//         // This is just an example to match the image format - you would customize based on your needs
//         return `${day} - ${day + 1} ${month}`;
//     };

//     // Format time like the image example (HH:MM)
//     const formatTime = (date) => {
//         const timestamp = new Date(date);
//         const hours = timestamp.getHours().toString().padStart(2, '0');
//         const minutes = timestamp.getMinutes().toString().padStart(2, '0');
//         return `${hours}:${minutes}`;
//     };

//     // Color utilities for date blocks - to match the image style
//     const getRandomColorBg = (entityId) => {
//         // Use the entity ID to deterministically choose a color
//         // This ensures the same entity always gets the same color
//         const colorOptions = [
//             'bg-blue-100',
//             'bg-purple-100',
//             'bg-green-100',
//             'bg-orange-100',
//             'bg-red-100',
//             'bg-yellow-100'
//         ];

//         // Simple hash function to get a consistent index
//         const hash = entityId.split('').reduce((a, b) => {
//             a = ((a << 5) - a) + b.charCodeAt(0);
//             return a & a;
//         }, 0);

//         return colorOptions[Math.abs(hash) % colorOptions.length];
//     };

//     // Matching text color for the background
//     const getRandomColorText = (entityId) => {
//         // Match text color to the background color
//         const colorOptions = [
//             'text-blue-800',
//             'text-purple-800',
//             'text-green-800',
//             'text-orange-800',
//             'text-red-800',
//             'text-yellow-800'
//         ];

//         // Use the same hash function to get matching text color
//         const hash = entityId.split('').reduce((a, b) => {
//             a = ((a << 5) - a) + b.charCodeAt(0);
//             return a & a;
//         }, 0);

//         return colorOptions[Math.abs(hash) % colorOptions.length];
//     };

//     // Get interaction type display name
//     const getInteractionTypeDisplay = (type) => {
//         switch (type) {
//             case 'VISIT':
//                 return 'View Property';
//             case 'CONTACT':
//                 return 'User Inquiry';
//             case 'SAVE':
//                 return 'Saved Item';
//             case 'CALLBACK':
//                 return 'Callback Request';
//             default:
//                 return type;
//         }
//     };

//     // Navigate to detail view
//     const navigateToDetail = (interaction) => {
//         if (interaction.entityType === 'PROPERTY') {
//             navigate(`/property-interaction/${interaction.entityId}?date=${interaction.date}`);
//         } else if (interaction.entityType === 'PROJECT') {
//             navigate(`/project-interaction/${interaction.entityId}?date=${interaction.date}`);
//         }
//     };

//     // Grouped interactions by date
//     const groupedInteractions = groupInteractionsByDate(interactions);

//     // Animation variants for Framer Motion
//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.07
//             }
//         }
//     };

//     const itemVariants = {
//         hidden: { y: 20, opacity: 0 },
//         visible: {
//             y: 0,
//             opacity: 1,
//             transition: {
//                 ease: [0.25, 0.1, 0.25, 1.0],
//                 duration: 0.5
//             }
//         }
//     };

//     const sectionVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.05
//             }
//         }
//     };

//     return (
//         <div className="p-4 sm:p-6 lg:p-2 bg-gray-100 min-h-screen">
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
//                 All Interactions
//             </h1>

//             {isLoading ? (
//                 <div className="w-full flex items-center justify-center py-20">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//                 </div>
//             ) : interactions.length === 0 ? (
//                 <div className="bg-white rounded-lg shadow-md p-6 text-center">
//                     <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
//                     </svg>
//                     <h2 className="mt-4 text-lg font-semibold text-gray-700">No Interactions Found</h2>
//                     <p className="mt-2 text-gray-500">There are no recorded interactions at this time.</p>
//                 </div>
//             ) : (
//                 <motion.div
//                     className="space-y-6"
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="visible"
//                 >
//                     {Object.entries(groupedInteractions).map(([dateLabel, dateInteractions]) => (
//                         <motion.div
//                             key={dateLabel}
//                             className="space-y-2"
//                             variants={sectionVariants}
//                         >
//                             <div className="flex items-center">
//                                 <div className="px-4 py-1 bg-gray-200 rounded-full text-gray-700 text-sm font-medium">
//                                     {dateLabel}
//                                 </div>
//                                 <div className="ml-3 h-px flex-grow bg-gray-200"></div>
//                             </div>

//                             <div className="space-y-3">
//                                 {dateInteractions.map((interaction, index) => {
//                                     // Format date (DD - DD MON) and time (HH:MM) for the left side
//                                     const dateStr = formatDateRange(interaction.timestamp);
//                                     const timeStr = formatTime(interaction.timestamp);

//                                     return (
//                                         <motion.div
//                                             key={`${interaction.entityId}-${interaction.timestamp}-${index}`}
//                                             className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-3"
//                                             variants={itemVariants}
//                                             whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
//                                         >
//                                             <div className="flex overflow-hidden">
//                                                 {/* Left side date/time block with random colors */}
//                                                 <div className={`flex flex-col rounded-lg items-center justify-center px-6 py-2 ${getRandomColorBg(interaction.entityId)} min-w-16 text-center`}>
//                                                     {dateLabel === 'Today' ? (
//                                                         <div className="text-center">
//                                                             <div className={`uppercase text-xs font-semibold ${getRandomColorText(interaction.entityId)}`}>TODAY</div>
//                                                             <div className={`text-3xl font-bold ${getRandomColorText(interaction.entityId)}`}>{timeStr}</div>
//                                                         </div>
//                                                     ) : (
//                                                         <div className="text-center ">
//                                                             <div className={`text-xs font-semibold ${getRandomColorText(interaction.entityId)}`}>{dateStr}</div>
//                                                             <div className={`text-3xl font-bold ${getRandomColorText(interaction.entityId)}`}>{timeStr}</div>
//                                                         </div>
//                                                     )}
//                                                 </div>

//                                                 {/* Right side content */}
//                                                 <div className="p-4 flex-grow">
//                                                     <div className="flex justify-between items-start">
//                                                         <div>
//                                                             <h3 className="font-semibold text-gray-800">
//                                                                 {getInteractionTypeDisplay(interaction.type)}
//                                                             </h3>
//                                                             <p className="text-sm text-gray-600 mt-1">
//                                                                 {interaction.userName || 'Anonymous user'} interacted with {interaction.entityName}
//                                                             </p>
//                                                             <p className="text-xs text-gray-500 mt-1">
//                                                                 Location: {interaction.metadata?.city || '________'}
//                                                             </p>
//                                                         </div>


//                                                         {/* Add to calendar button (like in the image) */}
//                                                         <button
//                                                             onClick={() => navigateToDetail(interaction)}
//                                                             className="inline-flex items-center text-sm text-black hover:bg-gray-900 hover:text-white px-4 py-2 rounded-md"
//                                                         >
//                                                             <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                                                             </svg>
//                                                             View details
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </motion.div>
//                                     );
//                                 })}
//                             </div>
//                         </motion.div>
//                     ))}
//                 </motion.div>
//             )}
//         </div>
//     );
// };

// export default UnifiedInteractions;


// import React, { useEffect, useState } from 'react';
// import { format, isToday, isYesterday, parseISO } from 'date-fns';
// import axios from 'axios';
// import { base_url } from '../../../utils/base_url';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const UnifiedInteractions = () => {
//     const [interactions, setInteractions] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [builderId, setBuilderId] = useState('');
//     const navigate = useNavigate();

//     // Load builder ID from localStorage
//     useEffect(() => {
//         const data = localStorage.getItem('builder-id') && JSON.parse(localStorage.getItem('builder-id'));
//         if (data?.id) {
//             setBuilderId(data.id);
//             console.log("Builder ID loaded:", data.id);
//         } else {
//             console.warn("No builder ID found in localStorage");
//         }
//     }, []);

//     // Fetch all interactions when builderId is available
//     useEffect(() => {
//         if (builderId) {
//             fetchAllInteractions();
//         }
//     }, [builderId]);

//     // Fetch all types of interactions
//     const fetchAllInteractions = async () => {
//         setIsLoading(true);
//         try {
//             // Fetch property interactions
//             const propertyResponse = await axios.get(
//                 `${base_url}/properties-interaction/api/interactions/stats?builderId=${builderId}`
//             );

//             // Fetch project interactions
//             const projectResponse = await axios.get(
//                 `${base_url}/properties-interaction/api/interactions/stats?builderId=${builderId}&interactionEntity=PROJECT`
//             );

//             // Extract and combine all interaction details
//             const propertyInteractions = propertyResponse?.data?.data || [];
//             const projectInteractions = projectResponse?.data?.data || [];

//             // Process property interactions
//             const processedPropertyInteractions = propertyInteractions.flatMap(item =>
//                 (item.details || []).map(detail => ({
//                     ...detail,
//                     entityId: item.entityId,
//                     entityType: 'PROPERTY',
//                     entityName: getEntityName(item.entityId, 'PROPERTY'),
//                     date: item.date,
//                     timestamp: detail.timestamp
//                 }))
//             );

//             // Process project interactions
//             const processedProjectInteractions = projectInteractions.flatMap(item =>
//                 (item.details || []).map(detail => ({
//                     ...detail,
//                     entityId: item.entityId,
//                     entityType: 'PROJECT',
//                     entityName: getEntityName(item.entityId, 'PROJECT'),
//                     date: item.date,
//                     timestamp: detail.timestamp
//                 }))
//             );

//             // Combine all interactions
//             const allInteractions = [
//                 ...processedPropertyInteractions,
//                 ...processedProjectInteractions
//             ];

//             // Sort by timestamp (newest first)
//             allInteractions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

//             setInteractions(allInteractions);
//         } catch (error) {
//             console.error("Error fetching interactions:", error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Helper function to get entity name (placeholder - in real app, this would use proper state data)
//     const getEntityName = (id, type) => {
//         // This is a placeholder - in a real app, you'd look up the actual name from your state
//         return type === 'PROPERTY' ? 'Property ' + id.substring(0, 4) : 'Project ' + id.substring(0, 4);
//     };

//     // Group interactions by date section (Today, Yesterday, or date)
//     const groupInteractionsByDate = (interactions) => {
//         const groups = {};

//         interactions.forEach(interaction => {
//             const date = parseISO(interaction.timestamp);
//             let dateKey;

//             if (isToday(date)) {
//                 dateKey = 'Today';
//             } else if (isYesterday(date)) {
//                 dateKey = 'Yesterday';
//             } else {
//                 dateKey = format(date, 'MMM d, yyyy');
//             }

//             if (!groups[dateKey]) {
//                 groups[dateKey] = [];
//             }

//             groups[dateKey].push(interaction);
//         });

//         return groups;
//     };

//     // Format date like the image example (DD - DD MON)
//     const formatDateRange = (date) => {
//         // For demonstration purposes, just return a date range
//         // In a real app, you would calculate this from actual dates
//         const timestamp = new Date(date);
//         const day = timestamp.getDate();
//         const month = timestamp.toLocaleString('default', { month: 'short' }).toUpperCase();

//         // This is just an example to match the image format - you would customize based on your needs
//         return `${day} - ${day + 1} ${month}`;
//     };

//     // Format time like the image example (HH:MM)
//     const formatTime = (date) => {
//         const timestamp = new Date(date);
//         const hours = timestamp.getHours().toString().padStart(2, '0');
//         const minutes = timestamp.getMinutes().toString().padStart(2, '0');
//         return `${hours}:${minutes}`;
//     };

//     // Color utilities for date blocks - based on the date itself
//     const getDateColorBg = (dateLabel) => {
//         // Colors based on the date label
//         const colorMapping = {
//             'Today': 'bg-blue-100',
//             'Yesterday': 'bg-purple-100'
//         };

//         // If it's a specific date (not Today or Yesterday), use a consistent pattern
//         if (!colorMapping[dateLabel]) {
//             // Extract the month from the dateLabel (format is like "Apr 12, 2025")
//             const monthStr = dateLabel.split(' ')[0];

//             // Map months to specific colors
//             const monthColorMap = {
//                 'Jan': 'bg-red-100',
//                 'Feb': 'bg-pink-100',
//                 'Mar': 'bg-orange-100',
//                 'Apr': 'bg-yellow-100',
//                 'May': 'bg-green-100',
//                 'Jun': 'bg-teal-100',
//                 'Jul': 'bg-blue-100',
//                 'Aug': 'bg-indigo-100',
//                 'Sep': 'bg-purple-100',
//                 'Oct': 'bg-pink-100',
//                 'Nov': 'bg-red-100',
//                 'Dec': 'bg-green-100'
//             };

//             return monthColorMap[monthStr] || 'bg-gray-100';
//         }

//         return colorMapping[dateLabel];
//     };

//     // Matching text color for the background
//     const getDateColorText = (dateLabel) => {
//         // Match text color to the background color
//         const colorMapping = {
//             'Today': 'text-blue-800',
//             'Yesterday': 'text-purple-800'
//         };

//         // If it's a specific date, use a consistent pattern
//         if (!colorMapping[dateLabel]) {
//             // Extract the month from the dateLabel
//             const monthStr = dateLabel.split(' ')[0];

//             // Map months to specific colors
//             const monthColorMap = {
//                 'Jan': 'text-red-800',
//                 'Feb': 'text-pink-800',
//                 'Mar': 'text-orange-800',
//                 'Apr': 'text-yellow-800',
//                 'May': 'text-green-800',
//                 'Jun': 'text-teal-800',
//                 'Jul': 'text-blue-800',
//                 'Aug': 'text-indigo-800',
//                 'Sep': 'text-purple-800',
//                 'Oct': 'text-pink-800',
//                 'Nov': 'text-red-800',
//                 'Dec': 'text-green-800'
//             };

//             return monthColorMap[monthStr] || 'text-gray-800';
//         }

//         return colorMapping[dateLabel];
//     };

//     // Get interaction type display name
//     const getInteractionTypeDisplay = (type) => {
//         switch (type) {
//             case 'VISIT':
//                 return 'View Property';
//             case 'CONTACT':
//                 return 'User Inquiry';
//             case 'SAVE':
//                 return 'Saved Item';
//             case 'CALLBACK':
//                 return 'Callback Request';
//             default:
//                 return type;
//         }
//     };

//     // Navigate to detail view
//     const navigateToDetail = (interaction) => {
//         if (interaction.entityType === 'PROPERTY') {
//             navigate(`/property-interaction/${interaction.entityId}?date=${interaction.date}`);
//         } else if (interaction.entityType === 'PROJECT') {
//             navigate(`/project-interaction/${interaction.entityId}?date=${interaction.date}`);
//         }
//     };

//     // Grouped interactions by date
//     const groupedInteractions = groupInteractionsByDate(interactions);

//     // Animation variants for Framer Motion
//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.07
//             }
//         }
//     };

//     const itemVariants = {
//         hidden: { y: 20, opacity: 0 },
//         visible: {
//             y: 0,
//             opacity: 1,
//             transition: {
//                 ease: [0.25, 0.1, 0.25, 1.0],
//                 duration: 0.5
//             }
//         }
//     };

//     const sectionVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.05
//             }
//         }
//     };

//     return (
//         <div className="p-4 sm:p-6 lg:p-2 bg-gray-100 min-h-screen">
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
//                 All Interactions
//             </h1>

//             {isLoading ? (
//                 <div className="w-full flex items-center justify-center py-20">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//                 </div>
//             ) : interactions.length === 0 ? (
//                 <div className="bg-white rounded-lg shadow-md p-6 text-center">
//                     <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
//                     </svg>
//                     <h2 className="mt-4 text-lg font-semibold text-gray-700">No Interactions Found</h2>
//                     <p className="mt-2 text-gray-500">There are no recorded interactions at this time.</p>
//                 </div>
//             ) : (
//                 <motion.div
//                     className="space-y-6"
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="visible"
//                 >
//                     {Object.entries(groupedInteractions).map(([dateLabel, dateInteractions]) => (
//                         <motion.div
//                             key={dateLabel}
//                             className="space-y-2"
//                             variants={sectionVariants}
//                         >
//                             <div className="flex items-center">
//                                 <div className="px-4 py-1 bg-gray-200 rounded-full text-gray-700 text-sm font-medium">
//                                     {dateLabel}
//                                 </div>
//                                 <div className="ml-3 h-px flex-grow bg-gray-200"></div>
//                             </div>

//                             <div className="space-y-3">
//                                 {dateInteractions.map((interaction, index) => {
//                                     // Format date (DD - DD MON) and time (HH:MM) for the left side
//                                     const dateStr = formatDateRange(interaction.timestamp);
//                                     const timeStr = formatTime(interaction.timestamp);

//                                     // Get colors based on the date label (consistent for all cards in the same date section)
//                                     const bgColor = getDateColorBg(dateLabel);
//                                     const textColor = getDateColorText(dateLabel);

//                                     return (
//                                         <motion.div
//                                             key={`${interaction.entityId}-${interaction.timestamp}-${index}`}
//                                             className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-3"
//                                             variants={itemVariants}
//                                             whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
//                                         >
//                                             <div className="flex overflow-hidden">
//                                                 {/* Left side date/time block with date-based colors */}
//                                                 <div className={`flex flex-col rounded-lg items-center justify-center px-6 py-2 ${bgColor} min-w-16 text-center`}>
//                                                     {dateLabel === 'Today' ? (
//                                                         <div className="text-center">
//                                                             <div className={`uppercase text-xs font-semibold ${textColor}`}>TODAY</div>
//                                                             <div className={`text-3xl font-bold ${textColor}`}>{timeStr}</div>
//                                                         </div>
//                                                     ) : (
//                                                         <div className="text-center ">
//                                                             <div className={`text-xs font-semibold ${textColor}`}>{dateStr}</div>
//                                                             <div className={`text-3xl font-bold ${textColor}`}>{timeStr}</div>
//                                                         </div>
//                                                     )}
//                                                 </div>

//                                                 {/* Right side content */}
//                                                 <div className="p-4 flex-grow">
//                                                     <div className="flex justify-between items-start">
//                                                         <div>
//                                                             <h3 className="font-semibold text-gray-800">
//                                                                 {getInteractionTypeDisplay(interaction.type)}
//                                                             </h3>
//                                                             <p className="text-sm text-gray-600 mt-1">
//                                                                 {interaction.userName || 'Anonymous user'} interacted with {interaction.entityName}
//                                                             </p>
//                                                             <p className="text-xs text-gray-500 mt-1">
//                                                                 Location: {interaction.metadata?.city || '________'}
//                                                             </p>
//                                                         </div>


//                                                         {/* Add to calendar button (like in the image) */}
//                                                         <button
//                                                             onClick={() => navigateToDetail(interaction)}
//                                                             className="inline-flex items-center text-sm text-black hover:bg-gray-900 hover:text-white px-4 py-2 rounded-md"
//                                                         >
//                                                             <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                                                             </svg>
//                                                             View details
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </motion.div>
//                                     );
//                                 })}
//                             </div>
//                         </motion.div>
//                     ))}
//                 </motion.div>
//             )}
//         </div>
//     );
// };

// export default UnifiedInteractions;



// import React, { useEffect, useState } from 'react';
// import { format, isToday, isYesterday, parseISO } from 'date-fns';
// import axios from 'axios';
// import { base_url } from '../../../utils/base_url';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const UnifiedInteractions = () => {
//     const [interactions, setInteractions] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [builderId, setBuilderId] = useState('');
//     const navigate = useNavigate();

//     // Load builder ID from localStorage
//     useEffect(() => {
//         const data = localStorage.getItem('builder-id') && JSON.parse(localStorage.getItem('builder-id'));
//         if (data?.id) {
//             setBuilderId(data.id);
//             console.log("Builder ID loaded:", data.id);
//         } else {
//             console.warn("No builder ID found in localStorage");
//         }
//     }, []);

//     // Fetch all interactions when builderId is available
//     useEffect(() => {
//         if (builderId) {
//             fetchAllInteractions();
//         }
//     }, [builderId]);

//     // Fetch all types of interactions
//     const fetchAllInteractions = async () => {
//         setIsLoading(true);
//         try {
//             // Fetch property interactions
//             const propertyResponse = await axios.get(
//                 `${base_url}/properties-interaction/api/interactions/stats?builderId=${builderId}`
//             );

//             // Fetch project interactions
//             const projectResponse = await axios.get(
//                 `${base_url}/properties-interaction/api/interactions/stats?builderId=${builderId}&interactionEntity=PROJECT`
//             );

//             // Extract and combine all interaction details
//             const propertyInteractions = propertyResponse?.data?.data || [];
//             const projectInteractions = projectResponse?.data?.data || [];

//             // Process property interactions
//             const processedPropertyInteractions = propertyInteractions.flatMap(item =>
//                 (item.details || []).map(detail => ({
//                     ...detail,
//                     entityId: item.entityId,
//                     entityType: 'PROPERTY',
//                     entityName: getEntityName(item.entityId, 'PROPERTY'),
//                     date: item.date,
//                     timestamp: detail.timestamp
//                 }))
//             );

//             // Process project interactions
//             const processedProjectInteractions = projectInteractions.flatMap(item =>
//                 (item.details || []).map(detail => ({
//                     ...detail,
//                     entityId: item.entityId,
//                     entityType: 'PROJECT',
//                     entityName: getEntityName(item.entityId, 'PROJECT'),
//                     date: item.date,
//                     timestamp: detail.timestamp
//                 }))
//             );

//             // Combine all interactions
//             const allInteractions = [
//                 ...processedPropertyInteractions,
//                 ...processedProjectInteractions
//             ];

//             // Sort by timestamp (newest first)
//             allInteractions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

//             setInteractions(allInteractions);
//         } catch (error) {
//             console.error("Error fetching interactions:", error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Helper function to get entity name (placeholder - in real app, this would use proper state data)
//     const getEntityName = (id, type) => {
//         // This is a placeholder - in a real app, you'd look up the actual name from your state
//         return type === 'PROPERTY' ? 'Property ' + id.substring(0, 4) : 'Project ' + id.substring(0, 4);
//     };

//     // Group interactions by date section (Today, Yesterday, or date)
//     const groupInteractionsByDate = (interactions) => {
//         const groups = {};

//         interactions.forEach(interaction => {
//             const date = parseISO(interaction.timestamp);
//             let dateKey;

//             if (isToday(date)) {
//                 dateKey = 'Today';
//             } else if (isYesterday(date)) {
//                 dateKey = 'Yesterday';
//             } else {
//                 dateKey = format(date, 'MMM d, yyyy');
//             }

//             if (!groups[dateKey]) {
//                 groups[dateKey] = [];
//             }

//             groups[dateKey].push(interaction);
//         });

//         return groups;
//     };

//     // Format date like the image example (DD - DD MON)
//     const formatDateRange = (date) => {
//         // For demonstration purposes, just return a date range
//         // In a real app, you would calculate this from actual dates
//         const timestamp = new Date(date);
//         const day = timestamp.getDate();
//         const month = timestamp.toLocaleString('default', { month: 'short' }).toUpperCase();

//         // This is just an example to match the image format - you would customize based on your needs
//         return `${day} - ${day + 1} ${month}`;
//     };

//     // Format time like the image example (HH:MM)
//     const formatTime = (date) => {
//         const timestamp = new Date(date);
//         const hours = timestamp.getHours().toString().padStart(2, '0');
//         const minutes = timestamp.getMinutes().toString().padStart(2, '0');
//         return `${hours}:${minutes}`;
//     };

//     // Color utilities for date blocks - based on the date itself
//     const getDateColorBg = (dateLabel) => {
//         // Colors based on the date label
//         const colorMapping = {
//             'Today': 'bg-blue-100',
//             'Yesterday': 'bg-purple-100'
//         };

//         // If it's a specific date (not Today or Yesterday), use a consistent pattern
//         if (!colorMapping[dateLabel]) {
//             // Extract the month from the dateLabel (format is like "Apr 12, 2025")
//             const monthStr = dateLabel.split(' ')[0];

//             // Map months to specific colors
//             const monthColorMap = {
//                 'Jan': 'bg-red-100',
//                 'Feb': 'bg-pink-100',
//                 'Mar': 'bg-orange-100',
//                 'Apr': 'bg-yellow-100',
//                 'May': 'bg-green-100',
//                 'Jun': 'bg-teal-100',
//                 'Jul': 'bg-blue-100',
//                 'Aug': 'bg-indigo-100',
//                 'Sep': 'bg-purple-100',
//                 'Oct': 'bg-pink-100',
//                 'Nov': 'bg-red-100',
//                 'Dec': 'bg-green-100'
//             };

//             return monthColorMap[monthStr] || 'bg-gray-100';
//         }

//         return colorMapping[dateLabel];
//     };

//     // Matching text color for the background
//     const getDateColorText = (dateLabel) => {
//         // Match text color to the background color
//         const colorMapping = {
//             'Today': 'text-blue-800',
//             'Yesterday': 'text-purple-800'
//         };

//         // If it's a specific date, use a consistent pattern
//         if (!colorMapping[dateLabel]) {
//             // Extract the month from the dateLabel
//             const monthStr = dateLabel.split(' ')[0];

//             // Map months to specific colors
//             const monthColorMap = {
//                 'Jan': 'text-red-800',
//                 'Feb': 'text-pink-800',
//                 'Mar': 'text-orange-800',
//                 'Apr': 'text-yellow-800',
//                 'May': 'text-green-800',
//                 'Jun': 'text-teal-800',
//                 'Jul': 'text-blue-800',
//                 'Aug': 'text-indigo-800',
//                 'Sep': 'text-purple-800',
//                 'Oct': 'text-pink-800',
//                 'Nov': 'text-red-800',
//                 'Dec': 'text-green-800'
//             };

//             return monthColorMap[monthStr] || 'text-gray-800';
//         }

//         return colorMapping[dateLabel];
//     };

//     // Get interaction type display name
//     const getInteractionTypeDisplay = (type) => {
//         switch (type) {
//             case 'VISIT':
//                 return 'View Property';
//             case 'CONTACT':
//                 return 'User Inquiry';
//             case 'SAVE':
//                 return 'Saved Item';
//             case 'CALLBACK':
//                 return 'Callback Request';
//             default:
//                 return type;
//         }
//     };

//     // Navigate to detail view - Fixed to ensure it works correctly
//     const navigateToDetail = (interaction) => {
//         // Convert the date format to ensure compatibility with InteractionDetail component
//         // Use the existing date from the interaction object
//         if (interaction.entityType === 'PROPERTY') {
//             navigate(`/property-interaction/${interaction.entityId}?date=${interaction.date}`);
//         } else if (interaction.entityType === 'PROJECT') {
//             navigate(`/project-interaction/${interaction.entityId}?date=${interaction.date}`);
//         }
//     };

//     // Grouped interactions by date
//     const groupedInteractions = groupInteractionsByDate(interactions);

//     // Animation variants for Framer Motion
//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.07
//             }
//         }
//     };

//     const itemVariants = {
//         hidden: { y: 20, opacity: 0 },
//         visible: {
//             y: 0,
//             opacity: 1,
//             transition: {
//                 ease: [0.25, 0.1, 0.25, 1.0],
//                 duration: 0.5
//             }
//         }
//     };

//     const sectionVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.05
//             }
//         }
//     };

//     return (
//         <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen w-full max-w-full">
//             <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
//                 All Interactions
//             </h1>

//             {isLoading ? (
//                 <div className="w-full flex items-center justify-center py-12 sm:py-20">
//                     <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-500"></div>
//                 </div>
//             ) : interactions.length === 0 ? (
//                 <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center">
//                     <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
//                     </svg>
//                     <h2 className="mt-3 sm:mt-4 text-lg font-semibold text-gray-700">No Interactions Found</h2>
//                     <p className="mt-1 sm:mt-2 text-gray-500">There are no recorded interactions at this time.</p>
//                 </div>
//             ) : (
//                 <motion.div
//                     className="space-y-4 sm:space-y-6"
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="visible"
//                 >
//                     {Object.entries(groupedInteractions).map(([dateLabel, dateInteractions]) => (
//                         <motion.div
//                             key={dateLabel}
//                             className="space-y-2"
//                             variants={sectionVariants}
//                         >
//                             <div className="flex items-center">
//                                 <div className="px-3 sm:px-4 py-1 bg-gray-200 rounded-full text-gray-700 text-xs sm:text-sm font-medium truncate max-w-[120px] sm:max-w-none">
//                                     {dateLabel}
//                                 </div>
//                                 <div className="ml-2 sm:ml-3 h-px flex-grow bg-gray-200"></div>
//                             </div>

//                             <div className="space-y-2 sm:space-y-3">
//                                 {dateInteractions.map((interaction, index) => {
//                                     // Format date (DD - DD MON) and time (HH:MM) for the left side
//                                     const dateStr = formatDateRange(interaction.timestamp);
//                                     const timeStr = formatTime(interaction.timestamp);

//                                     // Get colors based on the date label (consistent for all cards in the same date section)
//                                     const bgColor = getDateColorBg(dateLabel);
//                                     const textColor = getDateColorText(dateLabel);

//                                     return (
//                                         <motion.div
//                                             key={`${interaction.entityId}-${interaction.timestamp}-${index}`}
//                                             className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
//                                             variants={itemVariants}
//                                             whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
//                                             whileTap={{ scale: 0.99 }}
//                                         >
//                                             <div className="flex flex-col sm:flex-row overflow-hidden">
//                                                 {/* Left side date/time block with date-based colors - stacks on mobile */}
//                                                 <div className={`flex sm:flex-col justify-between sm:justify-center items-center rounded-t-lg sm:rounded-t-none sm:rounded-l-lg sm:rounded-r-none px-4 sm:px-6 py-3 sm:py-4 ${bgColor} w-full sm:w-auto sm:min-w-[100px] text-center`}>
//                                                     {dateLabel === 'Today' ? (
//                                                         <div className="flex sm:flex-col items-center sm:items-center justify-between sm:justify-center w-full">
//                                                             <div className={`uppercase text-xs font-semibold ${textColor}`}>TODAY</div>
//                                                             <div className={`text-2xl sm:text-3xl font-bold ${textColor} sm:mt-1`}>{timeStr}</div>
//                                                         </div>
//                                                     ) : (
//                                                         <div className="flex sm:flex-col items-center sm:items-center justify-between sm:justify-center w-full">
//                                                             <div className={`text-xs font-semibold ${textColor}`}>{dateStr}</div>
//                                                             <div className={`text-2xl sm:text-3xl font-bold ${textColor} sm:mt-1`}>{timeStr}</div>
//                                                         </div>
//                                                     )}
//                                                 </div>

//                                                 {/* Right side content */}
//                                                 <div className="p-3 sm:p-4 flex-grow">
//                                                     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
//                                                         <div>
//                                                             <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
//                                                                 {getInteractionTypeDisplay(interaction.type)}
//                                                             </h3>
//                                                             <p className="text-xs sm:text-sm text-gray-600 mt-1">
//                                                                 {interaction.userName || 'Anonymous user'} interacted with {interaction.entityName}
//                                                             </p>
//                                                             <p className="text-xs text-gray-500 mt-1">
//                                                                 Location: {interaction.metadata?.city || '________'}
//                                                             </p>
//                                                         </div>

//                                                         {/* View details button - full width on mobile */}
//                                                         <button
//                                                             onClick={() => navigateToDetail(interaction)}
//                                                             className="w-full sm:w-auto mt-2 sm:mt-0 inline-flex items-center justify-center sm:justify-start text-xs sm:text-sm text-black hover:bg-gray-900 hover:text-white border border-gray-200 px-3 sm:px-4 py-2 rounded-md transition-colors active:bg-gray-800 active:text-white"
//                                                         >
//                                                             <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                                                             </svg>
//                                                             View details
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </motion.div>
//                                     );
//                                 })}
//                             </div>
//                         </motion.div>
//                     ))}
//                 </motion.div>
//             )}
//         </div>
//     );
// };

// export default UnifiedInteractions;


import React, { useEffect, useState } from 'react';
import { format, isToday, isYesterday, parseISO } from 'date-fns';
import axios from 'axios';
import { base_url } from '../../../utils/base_url';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const UnifiedInteractions = () => {
    const [interactions, setInteractions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [builderId, setBuilderId] = useState('');
    const navigate = useNavigate();

    // Load builder ID from localStorage
    useEffect(() => {
        const data = localStorage.getItem('builder-id') && JSON.parse(localStorage.getItem('builder-id'));
        if (data?.id) {
            setBuilderId(data.id);
            console.log("Builder ID loaded:", data.id);
        } else {
            console.warn("No builder ID found in localStorage");
        }
    }, []);

    // Fetch all interactions when builderId is available
    useEffect(() => {
        if (builderId) {
            fetchAllInteractions();
        }
    }, [builderId]);

    // Fetch all types of interactions
    const fetchAllInteractions = async () => {
        setIsLoading(true);
        try {
            // Fetch property interactions
            const propertyResponse = await axios.get(
                `${base_url}/properties-interaction/api/interactions/stats?builderId=${builderId}`
            );

            // Fetch project interactions
            const projectResponse = await axios.get(
                `${base_url}/properties-interaction/api/interactions/stats?builderId=${builderId}&interactionEntity=PROJECT`
            );

            // Extract and combine all interaction details
            const propertyInteractions = propertyResponse?.data?.data || [];
            const projectInteractions = projectResponse?.data?.data || [];

            // Process property interactions
            const processedPropertyInteractions = propertyInteractions.flatMap(item =>
                (item.details || []).map(detail => ({
                    ...detail,
                    entityId: item.entityId,
                    entityType: 'PROPERTY',
                    entityName: getEntityName(item.entityId, 'PROPERTY'),
                    date: item.date,
                    timestamp: detail.timestamp
                }))
            );

            // Process project interactions
            const processedProjectInteractions = projectInteractions.flatMap(item =>
                (item.details || []).map(detail => ({
                    ...detail,
                    entityId: item.entityId,
                    entityType: 'PROJECT',
                    entityName: getEntityName(item.entityId, 'PROJECT'),
                    date: item.date,
                    timestamp: detail.timestamp
                }))
            );

            // Combine all interactions
            const allInteractions = [
                ...processedPropertyInteractions,
                ...processedProjectInteractions
            ];

            // Sort by timestamp (newest first)
            allInteractions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

            setInteractions(allInteractions);
        } catch (error) {
            console.error("Error fetching interactions:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Helper function to get entity name (placeholder - in real app, this would use proper state data)
    const getEntityName = (id, type) => {
        // This is a placeholder - in a real app, you'd look up the actual name from your state
        return type === 'PROPERTY' ? 'Property ' + id.substring(0, 4) : 'Project ' + id.substring(0, 4);
    };

    // Group interactions by date section (Today, Yesterday, or date)
    const groupInteractionsByDate = (interactions) => {
        const groups = {};

        interactions.forEach(interaction => {
            const date = parseISO(interaction.timestamp);
            let dateKey;

            if (isToday(date)) {
                dateKey = 'Today';
            } else if (isYesterday(date)) {
                dateKey = 'Yesterday';
            } else {
                dateKey = format(date, 'MMM d, yyyy');
            }

            if (!groups[dateKey]) {
                groups[dateKey] = [];
            }

            groups[dateKey].push(interaction);
        });

        return groups;
    };

    // Format date like the image example (DD - DD MON)
    const formatDateRange = (date) => {
        // For demonstration purposes, just return a date range
        // In a real app, you would calculate this from actual dates
        const timestamp = new Date(date);
        const day = timestamp.getDate();
        const month = timestamp.toLocaleString('default', { month: 'short' }).toUpperCase();

        // This is just an example to match the image format - you would customize based on your needs
        return `${day} - ${day + 1} ${month}`;
    };

    // Format time like the image example (HH:MM)
    const formatTime = (date) => {
        const timestamp = new Date(date);
        const hours = timestamp.getHours().toString().padStart(2, '0');
        const minutes = timestamp.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    // Color utilities for date blocks - based on the date itself
    const getDateColorBg = (dateLabel) => {
        // Colors based on the date label
        const colorMapping = {
            'Today': 'bg-blue-100',
            'Yesterday': 'bg-purple-100'
        };

        // If it's a specific date (not Today or Yesterday), use a consistent pattern
        if (!colorMapping[dateLabel]) {
            // Extract the month from the dateLabel (format is like "Apr 12, 2025")
            const monthStr = dateLabel.split(' ')[0];

            // Map months to specific colors
            const monthColorMap = {
                'Jan': 'bg-red-100',
                'Feb': 'bg-pink-100',
                'Mar': 'bg-orange-100',
                'Apr': 'bg-yellow-100',
                'May': 'bg-green-100',
                'Jun': 'bg-teal-100',
                'Jul': 'bg-blue-100',
                'Aug': 'bg-indigo-100',
                'Sep': 'bg-purple-100',
                'Oct': 'bg-pink-100',
                'Nov': 'bg-red-100',
                'Dec': 'bg-green-100'
            };

            return monthColorMap[monthStr] || 'bg-gray-100';
        }

        return colorMapping[dateLabel];
    };

    // Matching text color for the background
    const getDateColorText = (dateLabel) => {
        // Match text color to the background color
        const colorMapping = {
            'Today': 'text-blue-800',
            'Yesterday': 'text-purple-800'
        };

        // If it's a specific date, use a consistent pattern
        if (!colorMapping[dateLabel]) {
            // Extract the month from the dateLabel
            const monthStr = dateLabel.split(' ')[0];

            // Map months to specific colors
            const monthColorMap = {
                'Jan': 'text-red-800',
                'Feb': 'text-pink-800',
                'Mar': 'text-orange-800',
                'Apr': 'text-yellow-800',
                'May': 'text-green-800',
                'Jun': 'text-teal-800',
                'Jul': 'text-blue-800',
                'Aug': 'text-indigo-800',
                'Sep': 'text-purple-800',
                'Oct': 'text-pink-800',
                'Nov': 'text-red-800',
                'Dec': 'text-green-800'
            };

            return monthColorMap[monthStr] || 'text-gray-800';
        }

        return colorMapping[dateLabel];
    };

    // Get interaction type display name
    const getInteractionTypeDisplay = (type) => {
        switch (type) {
            case 'VISIT':
                return 'View Property';
            case 'CONTACT':
                return 'User Inquiry';
            case 'SAVE':
                return 'Saved Item';
            case 'CALLBACK':
                return 'Callback Request';
            default:
                return type;
        }
    };

    // Navigate to detail view - Fixed to ensure it works correctly
    const navigateToDetail = (interaction) => {
        // Convert the date format to ensure compatibility with InteractionDetail component
        // Use the existing date from the interaction object
        if (interaction.entityType === 'PROPERTY') {
            navigate(`/property-interaction/${interaction.entityId}?date=${interaction.date}`);
        } else if (interaction.entityType === 'PROJECT') {
            navigate(`/project-interaction/${interaction.entityId}?date=${interaction.date}`);
        }
    };

    // Grouped interactions by date
    const groupedInteractions = groupInteractionsByDate(interactions);

    // Animation variants for Framer Motion
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.07
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                ease: [0.25, 0.1, 0.25, 1.0],
                duration: 0.5
            }
        }
    };

    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-2 bg-gray-100 min-h-screen">
            <h1 className="text-xl sm:text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                All Interactions
            </h1>

            {isLoading ? (
                <div className="w-full flex items-center justify-center py-12 sm:py-20">
                    <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-500"></div>
                </div>
            ) : interactions.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    <h2 className="mt-4 text-lg font-semibold text-gray-700">No Interactions Found</h2>
                    <p className="mt-2 text-gray-500">There are no recorded interactions at this time.</p>
                </div>
            ) : (
                <motion.div
                    className="space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {Object.entries(groupedInteractions).map(([dateLabel, dateInteractions]) => (
                        <motion.div
                            key={dateLabel}
                            className="space-y-2"
                            variants={sectionVariants}
                        >
                            <div className="flex items-center">
                                <div className="px-3 sm:px-4 py-1 bg-gray-200 rounded-full text-gray-700 text-xs sm:text-sm font-medium truncate max-w-[120px] sm:max-w-none">
                                    {dateLabel}
                                </div>
                                <div className="ml-2 sm:ml-3 h-px flex-grow bg-gray-200"></div>
                            </div>

                            <div className="space-y-2 sm:space-y-3">
                                {dateInteractions.map((interaction, index) => {
                                    // Format date (DD - DD MON) and time (HH:MM) for the left side
                                    const dateStr = formatDateRange(interaction.timestamp);
                                    const timeStr = formatTime(interaction.timestamp);

                                    // Get colors based on the date label (consistent for all cards in the same date section)
                                    const bgColor = getDateColorBg(dateLabel);
                                    const textColor = getDateColorText(dateLabel);

                                    return (
                                        <motion.div
                                            key={`${interaction.entityId}-${interaction.timestamp}-${index}`}
                                            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-0 sm:p-3"
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                                            whileTap={{ scale: 0.99 }}
                                        >
                                            {/* Mobile layout (stacked) for small screens */}
                                            <div className="flex flex-col sm:hidden overflow-hidden">
                                                {/* Top date/time block for mobile */}
                                                <div className={`flex justify-between items-center px-4 py-3 ${bgColor} w-full text-center`}>
                                                    {dateLabel === 'Today' ? (
                                                        <div className={`uppercase text-xs font-semibold ${textColor}`}>TODAY</div>
                                                    ) : (
                                                        <div className={`text-xs font-semibold ${textColor}`}>{dateStr}</div>
                                                    )}
                                                    <div className={`text-2xl font-bold ${textColor}`}>{timeStr}</div>
                                                </div>

                                                {/* Content for mobile */}
                                                <div className="p-3 flex-grow">
                                                    <div>
                                                        <h3 className="font-semibold text-gray-800 text-sm">
                                                            {getInteractionTypeDisplay(interaction.type)}
                                                        </h3>
                                                        <p className="text-xs text-gray-600 mt-1">
                                                            {interaction.userName || 'Anonymous user'} interacted with {interaction.entityName}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            Location: {interaction.metadata?.city || '________'}
                                                        </p>
                                                    </div>

                                                    {/* Full width button for mobile */}
                                                    <button
                                                        onClick={() => navigateToDetail(interaction)}
                                                        className="w-full mt-3 inline-flex items-center justify-center text-xs text-black hover:bg-gray-900 hover:text-white border border-gray-200 px-3 py-2 rounded-md transition-colors active:bg-gray-800 active:text-white"
                                                    >
                                                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                        </svg>
                                                        View details
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Original desktop layout - Exactly as before */}
                                            <div className="hidden sm:flex overflow-hidden">
                                                {/* Left side date/time block with date-based colors */}
                                                <div className={`flex flex-col rounded-lg items-center justify-center px-6 py-2 ${bgColor} min-w-16 text-center`}>
                                                    {dateLabel === 'Today' ? (
                                                        <div className="text-center">
                                                            <div className={`uppercase text-xs font-semibold ${textColor}`}>TODAY</div>
                                                            <div className={`text-3xl font-bold ${textColor}`}>{timeStr}</div>
                                                        </div>
                                                    ) : (
                                                        <div className="text-center">
                                                            <div className={`text-xs font-semibold ${textColor}`}>{dateStr}</div>
                                                            <div className={`text-3xl font-bold ${textColor}`}>{timeStr}</div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Right side content - Exactly as before */}
                                                <div className="p-4 flex-grow">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="font-semibold text-gray-800">
                                                                {getInteractionTypeDisplay(interaction.type)}
                                                            </h3>
                                                            <p className="text-sm text-gray-600 mt-1">
                                                                {interaction.userName || 'Anonymous user'} interacted with {interaction.entityName}
                                                            </p>
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                Location: {interaction.metadata?.city || '________'}
                                                            </p>
                                                        </div>

                                                        {/* Original button for desktop */}
                                                        <button
                                                            onClick={() => navigateToDetail(interaction)}
                                                            className="inline-flex items-center text-sm text-black hover:bg-gray-900 hover:text-white px-4 py-2 rounded-md"
                                                        >
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                            </svg>
                                                            View details
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default UnifiedInteractions;

