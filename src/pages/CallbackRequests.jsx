import React, { useState, useEffect } from 'react';
import { base_url } from '../../utils/base_url';
import useColorMode from '../hooks/useColorMode';

const CallbackRequests = () => {
    const [colorMode] = useColorMode();
    const [loading, setLoading] = useState(true);
    const [callbacks, setCallbacks] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        total: 1,
        totalRecords: 0
    });
    const [status, setStatus] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [builderId, setBuilderId] = useState('67bb17484e27e62569bcfd17')


    // useEffect(
    //     () => {
    //         const data = localStorage.getItem('builder-id') && JSON.parse(localStorage.getItem('builder-id'))
    //         setBuilderId(data?.id)
    //     }, []
    // )

    useEffect(() => {
        fetchCallbacks();
    }, [builderId, status, page, limit]);

    const fetchCallbacks = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${base_url}/api/callback/builder/${builderId}`
            );
            const result = await response.json();

            if (result.success) {
                setCallbacks(result.data);
                setPagination(result.pagination);
            }
        } catch (error) {
            console.error('Error fetching callbacks:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        setPage(1);
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= pagination.total) {
            setPage(newPage);
        }
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'COMPLETED':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'CANCELLED':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    return (
        <div className={`w-full p-4 rounded-lg shadow-md ${colorMode === 'dark' ? 'bg-boxdark text-bodydark' : 'bg-white text-black'
            }`}>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                <h2 className="text-2xl font-semibold mb-4 md:mb-0 text-blue-900 ">Callback Requests</h2>

                <div className="flex flex-col sm:flex-row gap-3">
                    <select
                        value={status}
                        onChange={handleStatusChange}
                        className={`rounded-md px-3 py-2 text-sm ${colorMode === 'dark'
                            ? 'bg-boxdark-2 border-strokedark'
                            : 'bg-gray-50 border-stroke'
                            } border focus:outline-none focus:ring-1 focus:ring-primary`}
                    >
                        <option value="">All Status</option>
                        <option value="PENDING">Pending</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>

                    <select
                        value={limit}
                        onChange={(e) => setLimit(Number(e.target.value))}
                        className={`rounded-md px-3 py-2 text-sm ${colorMode === 'dark'
                            ? 'bg-boxdark-2 border-strokedark'
                            : 'bg-gray-50 border-stroke'
                            } border focus:outline-none focus:ring-1 focus:ring-primary`}
                    >
                        <option value={5}>5 per page</option>
                        <option value={10}>10 per page</option>
                        <option value={25}>25 per page</option>
                        <option value={50}>50 per page</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            ) : callbacks.length === 0 ? (
                <div className={`text-center py-10 ${colorMode === 'dark' ? 'text-bodydark' : 'text-bodydark2'
                    }`}>
                    No callback requests found
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className={`w-full min-w-full ${colorMode === 'dark' ? 'text-bodydark' : 'text-black'
                            }`}>
                            <thead className={`text-xs uppercase ${colorMode === 'dark' ? 'bg-boxdark-2 text-bodydark' : 'bg-gray-50 text-gray-700'
                                }`}>
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left">ID</th>
                                    <th scope="col" className="px-6 py-3 text-left">Phone Number</th>
                                    <th scope="col" className="px-6 py-3 text-left">Requested Time</th>
                                    <th scope="col" className="px-6 py-3 text-left">Status</th>
                                    <th scope="col" className="px-6 py-3 text-left">Created At</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {callbacks.map((callback) => (
                                    <tr
                                        key={callback._id}
                                        className={`hover:bg-gray-50 dark:hover:bg-boxdark-2 transition-colors duration-150 ease-in-out`}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {callback._id.substring(0, 8)}...
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {callback.phoneNumber}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {callback.requestedTime}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(callback.status)}`}>
                                                {callback.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {formatDate(callback.createdAt)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 px-4">
                        <div className={`text-sm ${colorMode === 'dark' ? 'text-bodydark' : 'text-gray-700'
                            } mb-4 sm:mb-0`}>
                            Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, pagination.totalRecords)} of {pagination.totalRecords} results
                        </div>

                        <div className="flex space-x-1">
                            <button
                                onClick={() => handlePageChange(1)}
                                disabled={page === 1}
                                className={`px-3 py-1 rounded ${page === 1
                                    ? 'cursor-not-allowed opacity-50'
                                    : colorMode === 'dark'
                                        ? 'bg-boxdark-2 hover:bg-primary hover:text-white'
                                        : 'bg-gray-100 hover:bg-primary hover:text-white'
                                    }`}
                            >
                                First
                            </button>
                            <button
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 1}
                                className={`px-3 py-1 rounded ${page === 1
                                    ? 'cursor-not-allowed opacity-50'
                                    : colorMode === 'dark'
                                        ? 'bg-boxdark-2 hover:bg-primary hover:text-white'
                                        : 'bg-gray-100 hover:bg-primary hover:text-white'
                                    }`}
                            >
                                Prev
                            </button>

                            {Array.from({ length: Math.min(5, pagination.total) }, (_, i) => {
                                let pageNumber;

                                if (pagination.total <= 5) {
                                    pageNumber = i + 1;
                                } else if (page <= 3) {
                                    pageNumber = i + 1;
                                } else if (page >= pagination.total - 2) {
                                    pageNumber = pagination.total - 4 + i;
                                } else {
                                    pageNumber = page - 2 + i;
                                }

                                return (
                                    <button
                                        key={i}
                                        onClick={() => handlePageChange(pageNumber)}
                                        className={`px-3 py-1 rounded ${page === pageNumber
                                            ? 'bg-primary text-white'
                                            : colorMode === 'dark'
                                                ? 'bg-boxdark-2 hover:bg-primary hover:text-white'
                                                : 'bg-gray-100 hover:bg-primary hover:text-white'
                                            }`}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            })}

                            <button
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page === pagination.total}
                                className={`px-3 py-1 rounded ${page === pagination.total
                                    ? 'cursor-not-allowed opacity-50'
                                    : colorMode === 'dark'
                                        ? 'bg-boxdark-2 hover:bg-primary hover:text-white'
                                        : 'bg-gray-100 hover:bg-primary hover:text-white'
                                    }`}
                            >
                                Next
                            </button>
                            <button
                                onClick={() => handlePageChange(pagination.total)}
                                disabled={page === pagination.total}
                                className={`px-3 py-1 rounded ${page === pagination.total
                                    ? 'cursor-not-allowed opacity-50'
                                    : colorMode === 'dark'
                                        ? 'bg-boxdark-2 hover:bg-primary hover:text-white'
                                        : 'bg-gray-100 hover:bg-primary hover:text-white'
                                    }`}
                            >
                                Last
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CallbackRequests;