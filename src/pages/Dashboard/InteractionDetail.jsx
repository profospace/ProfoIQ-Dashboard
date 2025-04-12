import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import axios from 'axios';
import { base_url } from '../../../utils/base_url';
import { motion } from 'framer-motion';

const InteractionDetail = () => {
    const { entityId } = useParams();
    const [searchParams] = useSearchParams();
    const dateParam = searchParams.get('date');
    const entityType = window.location.pathname.includes('property') ? 'PROPERTY' : 'PROJECT';

    const [interaction, setInteraction] = useState(null);
    const [entityDetails, setEntityDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [builderId, setBuilderId] = useState('');

    const navigate = useNavigate();

    // Load builder ID from localStorage
    useEffect(() => {
        const data = localStorage.getItem('builder-id') && JSON.parse(localStorage.getItem('builder-id'));
        if (data?.id) {
            setBuilderId(data.id);
        } else {
            setError("No builder ID found. Please log in again.");
            setIsLoading(false);
        }
    }, []);

    // Fetch interaction details
    useEffect(() => {
        if (builderId && entityId && dateParam) {
            fetchInteractionDetails();
            fetchEntityDetails();
        }
    }, [builderId, entityId, dateParam, entityType]);

    // Fetch specific interaction
    const fetchInteractionDetails = async () => {
        setIsLoading(true);
        try {
            const entityParam = entityType === 'PROPERTY' ? `propertyId=${entityId}` : `projectId=${entityId}`;

            const response = await axios.get(
                `${base_url}/properties-interaction/api/interactions/stats?${entityParam}&builderId=${builderId}&interactionEntity=${entityType}`
            );

            const interactionsData = response?.data?.data || [];

            // Find the specific interaction data for this date
            const dateInteraction = interactionsData.find(item => item.date === dateParam);

            if (!dateInteraction || !dateInteraction.details || dateInteraction.details.length === 0) {
                setError("Interaction details not found for the specified date.");
                setIsLoading(false);
                return;
            }

            // Get the first interaction (we'll show all details associated with this date)
            setInteraction({
                ...dateInteraction,
                entityId,
                entityType
            });

        } catch (error) {
            console.error("Error fetching interaction details:", error);
            setError("Failed to load interaction details. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch entity details (property or project)
    const fetchEntityDetails = async () => {
        try {
            let response;

            if (entityType === 'PROPERTY') {
                response = await axios.get(`${base_url}/api/properties/${entityId}`);
            } else {
                response = await axios.get(`${base_url}/api/projects/${entityId}`);
            }

            if (response?.data?.success) {
                setEntityDetails(response.data.data);
            }
        } catch (error) {
            console.error(`Error fetching ${entityType.toLowerCase()} details:`, error);
            // We don't set the error state here since this is supplementary information
        }
    };

    // Go back to previous page
    const handleGoBack = () => {
        navigate(-1);
    };

    // Get color scheme based on interaction type
    const getInteractionTypeColor = (type) => {
        switch (type) {
            case 'VISIT':
                return {
                    bg: 'bg-green-50 dark:bg-green-900/20',
                    text: 'text-green-700 dark:text-green-400',
                    border: 'border-green-200 dark:border-green-900',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    )
                };
            case 'CONTACT':
                return {
                    bg: 'bg-blue-50 dark:bg-blue-900/20',
                    text: 'text-blue-700 dark:text-blue-400',
                    border: 'border-blue-200 dark:border-blue-900',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                    )
                };
            case 'SAVE':
                return {
                    bg: 'bg-purple-50 dark:bg-purple-900/20',
                    text: 'text-purple-700 dark:text-purple-400',
                    border: 'border-purple-200 dark:border-purple-900',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    )
                };
            case 'CALLBACK':
                return {
                    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
                    text: 'text-yellow-700 dark:text-yellow-400',
                    border: 'border-yellow-200 dark:border-yellow-900',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    )
                };
            default:
                return {
                    bg: 'bg-gray-50 dark:bg-gray-700',
                    text: 'text-gray-700 dark:text-gray-300',
                    border: 'border-gray-200 dark:border-gray-700',
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )
                };
        }
    };

    // Animation variants
    const pageVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: { duration: 0.5 }
        },
        exit: { opacity: 0 }
    };

    const itemVariants = {
        initial: { y: 20, opacity: 0 },
        animate: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }
        }
    };

    if (isLoading) {
        return (
            <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-center text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Error</h2>
                    <p className="text-center text-gray-600 dark:text-gray-400 mb-4">{error}</p>
                    <div className="flex justify-center">
                        <button
                            onClick={handleGoBack}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!interaction) {
        return (
            <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
                    <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">No Interaction Found</h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">The requested interaction could not be found.</p>
                    <button
                        onClick={handleGoBack}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    // Get color scheme based on the first interaction type
    const typeColors = getInteractionTypeColor(interaction.details[0]?.type || 'VISIT');

    return (
        <motion.div
            className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {/* Back Button */}
            <div className="max-w-4xl mx-auto mb-6">
                <button
                    onClick={handleGoBack}
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Interactions
                </button>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto">
                {/* Header Card */}
                <motion.div
                    className={`bg-white dark:bg-gray-800 rounded-lg shadow-md border ${typeColors.border} overflow-hidden mb-6`}
                    variants={itemVariants}
                >
                    <div className={`p-4 ${typeColors.bg} ${typeColors.text} border-b ${typeColors.border}`}>
                        <div className="flex items-center">
                            <div className="p-2 rounded-full bg-white dark:bg-gray-800">
                                {typeColors.icon}
                            </div>
                            <h1 className="ml-3 text-xl font-semibold">
                                {entityType === 'PROPERTY' ? 'Property' : 'Project'} Interaction Details
                            </h1>
                        </div>
                    </div>

                    <div className="p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                    {entityType === 'PROPERTY' ? 'Property' : 'Project'} Information
                                </h2>
                                <div className="space-y-2">
                                    <div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">ID:</span>
                                        <p className="font-medium text-gray-800 dark:text-gray-200">{entityId}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Name:</span>
                                        <p className="font-medium text-gray-800 dark:text-gray-200">
                                            {entityDetails?.post_title || entityDetails?.name || `${entityType.charAt(0) + entityType.slice(1).toLowerCase()} Name`}
                                        </p>
                                    </div>
                                    {entityType === 'PROPERTY' && entityDetails && (
                                        <>
                                            <div>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">Type:</span>
                                                <p className="font-medium text-gray-800 dark:text-gray-200">{entityDetails.type_name || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">Address:</span>
                                                <p className="font-medium text-gray-800 dark:text-gray-200">{entityDetails.address || 'N/A'}</p>
                                            </div>
                                        </>
                                    )}
                                    {entityType === 'PROJECT' && entityDetails && (
                                        <>
                                            <div>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">Type:</span>
                                                <p className="font-medium text-gray-800 dark:text-gray-200">{entityDetails.type || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">Status:</span>
                                                <p className="font-medium text-gray-800 dark:text-gray-200">{entityDetails.status || 'N/A'}</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                    Interaction Summary
                                </h2>
                                <div className="space-y-2">
                                    <div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Date:</span>
                                        <p className="font-medium text-gray-800 dark:text-gray-200">{format(parseISO(dateParam), 'MMMM d, yyyy')}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Total Visits:</span>
                                        <p className="font-medium text-gray-800 dark:text-gray-200">{interaction.stats?.visits || 0}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Total Contacts:</span>
                                        <p className="font-medium text-gray-800 dark:text-gray-200">{interaction.stats?.contacts || 0}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Total Saves:</span>
                                        <p className="font-medium text-gray-800 dark:text-gray-200">{interaction.stats?.saves || 0}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Interaction Details */}
                <motion.div
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden mb-6"
                    variants={itemVariants}
                >
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Detailed Activity Log
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            All interactions recorded on {format(parseISO(dateParam), 'MMMM d, yyyy')}
                        </p>
                    </div>

                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {interaction.details.map((detail, index) => {
                            const detailColors = getInteractionTypeColor(detail.type);

                            return (
                                <div key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                                    <div className="flex items-start">
                                        <div className={`p-2 rounded-full ${detailColors.bg} ${detailColors.text} mt-1`}>
                                            {detailColors.icon}
                                        </div>

                                        <div className="ml-3 flex-grow">
                                            <div className="flex flex-wrap items-center justify-between gap-2">
                                                <div className="flex items-center">
                                                    <h3 className="font-medium text-gray-800 dark:text-gray-200">
                                                        {detail.userName || 'Anonymous User'}
                                                    </h3>
                                                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${detailColors.bg} ${detailColors.text}`}>
                                                        {detail.type}
                                                    </span>
                                                </div>

                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    {format(parseISO(detail.timestamp), 'h:mm a')}
                                                </span>
                                            </div>

                                            {/* User Contact Information */}
                                            {(detail.type === 'CONTACT' || detail.type === 'CALLBACK') && (
                                                <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-750 rounded-md">
                                                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Contact Information
                                                    </h4>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        <div>
                                                            <span className="text-xs text-gray-500 dark:text-gray-400">Phone:</span>
                                                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                                                {detail.contactInfo?.phoneNumber || 'N/A'}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <span className="text-xs text-gray-500 dark:text-gray-400">Email:</span>
                                                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                                                {detail.contactInfo?.email || 'N/A'}
                                                            </p>
                                                        </div>
                                                        {detail.metadata?.contactMethod && (
                                                            <div>
                                                                <span className="text-xs text-gray-500 dark:text-gray-400">Contact Method:</span>
                                                                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                                                    {detail.metadata.contactMethod}
                                                                </p>
                                                            </div>
                                                        )}
                                                        {detail.metadata?.contactStatus && (
                                                            <div>
                                                                <span className="text-xs text-gray-500 dark:text-gray-400">Status:</span>
                                                                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                                                    {detail.metadata.contactStatus}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Visit Details */}
                                            {detail.type === 'VISIT' && detail.metadata && (
                                                <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-750 rounded-md">
                                                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Visit Details
                                                    </h4>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                        {detail.metadata.visitType && (
                                                            <div>
                                                                <span className="text-xs text-gray-500 dark:text-gray-400">Visit Type:</span>
                                                                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                                                    {detail.metadata.visitType}
                                                                </p>
                                                            </div>
                                                        )}
                                                        {detail.metadata.visitDuration && (
                                                            <div>
                                                                <span className="text-xs text-gray-500 dark:text-gray-400">Duration:</span>
                                                                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                                                    {detail.metadata.visitDuration} seconds
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Location Information */}
                                            {detail.location && (detail.location.details || detail.metadata) && (
                                                <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-750 rounded-md">
                                                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Location Information
                                                    </h4>
                                                    <div className="grid grid-cols-1 gap-2">
                                                        {detail.location?.details?.address && (
                                                            <div>
                                                                <span className="text-xs text-gray-500 dark:text-gray-400">Address:</span>
                                                                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                                                    {detail.location.details.address}
                                                                </p>
                                                            </div>
                                                        )}

                                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                                            {detail.metadata?.subLocality && (
                                                                <div>
                                                                    <span className="text-xs text-gray-500 dark:text-gray-400">Sub-Locality:</span>
                                                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                                                        {detail.metadata.subLocality}
                                                                    </p>
                                                                </div>
                                                            )}
                                                            {detail.metadata?.locality && (
                                                                <div>
                                                                    <span className="text-xs text-gray-500 dark:text-gray-400">Locality:</span>
                                                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                                                        {detail.metadata.locality}
                                                                    </p>
                                                                </div>
                                                            )}
                                                            {(detail.metadata?.city || detail.location?.details?.city) && (
                                                                <div>
                                                                    <span className="text-xs text-gray-500 dark:text-gray-400">City:</span>
                                                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                                                        {detail.metadata?.city || detail.location?.details?.city}
                                                                    </p>
                                                                </div>
                                                            )}
                                                            {detail.location?.details?.state && (
                                                                <div>
                                                                    <span className="text-xs text-gray-500 dark:text-gray-400">State:</span>
                                                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                                                        {detail.location.details.state}
                                                                    </p>
                                                                </div>
                                                            )}
                                                            {detail.location?.details?.country && (
                                                                <div>
                                                                    <span className="text-xs text-gray-500 dark:text-gray-400">Country:</span>
                                                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                                                        {detail.location.details.country}
                                                                    </p>
                                                                </div>
                                                            )}
                                                            {detail.location?.details?.pincode && (
                                                                <div>
                                                                    <span className="text-xs text-gray-500 dark:text-gray-400">Pincode:</span>
                                                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                                                        {detail.location.details.pincode}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Device Information */}
                                            {detail.metadata?.deviceInfo && (
                                                <div className="mt-2">
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">Device Info:</span>
                                                    <p className="text-sm text-gray-800 dark:text-gray-200">{detail.metadata.deviceInfo}</p>
                                                </div>
                                            )}

                                            {/* Any additional metadata */}
                                            {detail.metadata && Object.keys(detail.metadata).filter(key =>
                                                !['visitType', 'visitDuration', 'contactMethod', 'contactStatus',
                                                    'deviceInfo', 'city', 'subLocality', 'locality', 'location'].includes(key)
                                            ).length > 0 && (
                                                    <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-750 rounded-md">
                                                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                            Additional Information
                                                        </h4>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                            {Object.entries(detail.metadata).filter(([key]) =>
                                                                !['visitType', 'visitDuration', 'contactMethod', 'contactStatus',
                                                                    'deviceInfo', 'city', 'subLocality', 'locality', 'location'].includes(key)
                                                            ).map(([key, value]) => (
                                                                <div key={key}>
                                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
                                                                    </span>
                                                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                                                        {typeof value === 'object' ? JSON.stringify(value) : value.toString()}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {interaction.details.length === 0 && (
                        <div className="p-8 text-center">
                            <p className="text-gray-500 dark:text-gray-400">No detailed activity records found for this date.</p>
                        </div>
                    )}
                </motion.div>

                {/* Additional Actions */}
                <motion.div
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden mb-6"
                    variants={itemVariants}
                >
                    <div className="p-4">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                            Actions
                        </h2>

                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => window.print()}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none transition-colors"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                </svg>
                                Print Report
                            </button>

                            <button
                                onClick={() => {
                                    // This would be implemented to export to CSV
                                    alert('Export functionality would be implemented here');
                                }}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none transition-colors"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Export to CSV
                            </button>

                            {entityType === 'PROPERTY' && (
                                <a
                                    href={`/properties/${entityId}`}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none transition-colors"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    View Property Details
                                </a>
                            )}

                            {entityType === 'PROJECT' && (
                                <a
                                    href={`/projects/${entityId}`}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none transition-colors"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    View Project Details
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Navigation */}
                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleGoBack}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to All Interactions
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default InteractionDetail;