import React, { useEffect, useState, useRef } from 'react';
import { format } from 'date-fns';
import UserActivityTable from '../../components/Charts/UserActivityTable';
import axios from 'axios';
import { base_url } from '../../../utils/base_url';

const PropertiesInteractions = () => {
  // State for properties and selection
  const [properties, setProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // State for interactions and filtering
  const [interactions, setInteractions] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [highlightedDates, setHighlightedDates] = useState([]);

  // State for calendar dropdown
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Builder ID from localStorage
  const [builderId, setBuilderId] = useState('');

  // References
  const tableRef = useRef(null);
  const calendarRef = useRef(null);
  const dateButtonRef = useRef(null);

  // Close calendar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target) &&
        dateButtonRef.current && !dateButtonRef.current.contains(event.target)) {
        setCalendarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calendarRef, dateButtonRef]);

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

  // Fetch properties for the builder
  const fetchProperties = async () => {
    setIsLoading(true);
    try {
      if (!builderId) {
        console.warn("No builder ID available for property fetch");
        setIsLoading(false);
        return;
      }

      const response = await axios.get(`${base_url}/api/builders/${builderId}/properties`);
      const propertiesData = response?.data?.data?.properties || [];

      console.log(`Fetched ${propertiesData.length} properties`);
      setProperties(propertiesData);

      // Select first property by default
      if (propertiesData.length > 0) {
        setSelectedPropertyId(propertiesData[0].post_id);
        fetchPropertyInteractions(propertiesData[0].post_id);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch interactions for a specific property
  const fetchPropertyInteractions = async (propertyId) => {
    setIsLoading(true);
    try {
      if (!builderId) {
        console.warn("No builder ID available for interaction fetch");
        setIsLoading(false);
        return;
      }

      const response = await axios.get(
        `${base_url}/properties-interaction/api/interactions/stats?propertyId=${propertyId}&builderId=${builderId}&interactionEntity=PROPERTY`
      );

      const interactionsData = response?.data?.data || [];
      console.log(`Fetched ${interactionsData.length} interaction records`);

      setInteractions(interactionsData);

      // Extract all dates with activities
      const dates = interactionsData
        .filter(interaction => interaction.details && interaction.details.length > 0)
        .map(interaction => interaction.date);

      setHighlightedDates(dates);

      // Filter activities for the selected date
      filterActivitiesByDate(propertyId, selectedDate, interactionsData);
    } catch (error) {
      console.error(`Error fetching property interactions:`, error);
      setInteractions([]);
      setFilteredActivities([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter activities by date
  const filterActivitiesByDate = (propertyId, date, interactionsData = interactions) => {
    const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
    const formattedDate = utcDate.toISOString().split('T')[0];

    console.log(`Filtering activities for property ${propertyId} on ${formattedDate}`);

    const matchingInteraction = interactionsData.find(
      interaction => interaction.entityId === propertyId && interaction.date === formattedDate
    );

    if (matchingInteraction?.details?.length > 0) {
      console.log(`Found ${matchingInteraction.details.length} activities for the selected date`);
      setFilteredActivities(matchingInteraction.details);
    } else {
      console.log("No activities found for the selected date");
      setFilteredActivities([]);
    }

    // Close the calendar after date selection
    setCalendarOpen(false);
  };

  // Handle property selection
  const handlePropertySelect = (propertyId) => {
    setSelectedPropertyId(propertyId);
    fetchPropertyInteractions(propertyId);
  };

  // Handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (selectedPropertyId) {
      filterActivitiesByDate(selectedPropertyId, date);
    }
  };

  // Toggle calendar dropdown
  const toggleCalendar = () => {
    setCalendarOpen(!calendarOpen);
  };

  // Initial data fetch
  useEffect(() => {
    if (builderId) {
      fetchProperties();
    }
  }, [builderId]);

  // Get selected property name
  const getSelectedPropertyName = () => {
    const property = properties.find(p => p.post_id === selectedPropertyId);
    return property?.post_title || 'Unknown Property';
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Property Interactions
      </h1>

      {isLoading && properties.length === 0 ? (
        <div className="w-full flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : properties.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <h2 className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">No Properties Found</h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">There are no properties associated with this builder.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header with tabs and date selector */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              {/* Property Info */}
              <div>
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  {getSelectedPropertyName()}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Viewing interactions for selected property
                </p>
              </div>

              {/* Date Selector with Dropdown Calendar */}
              <div className="relative">
                <button
                  ref={dateButtonRef}
                  onClick={toggleCalendar}
                  className="flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {format(selectedDate, 'MMMM d, yyyy')}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Property Tabs */}
            <div className="overflow-x-auto">
              <div className="inline-flex min-w-full border-b border-gray-200 dark:border-gray-700">
                {properties.map((property) => (
                  <button
                    key={property.post_id}
                    onClick={() => handlePropertySelect(property.post_id)}
                    className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${selectedPropertyId === property.post_id
                        ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500 dark:border-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                  >
                    {property.post_title || 'Unnamed Property'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Calendar Dropdown - Positioned in the portal to avoid cutting off */}
          {calendarOpen && (
            <div
              ref={calendarRef}
              className="fixed z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 w-80"
              style={{
                top: '60%',
                left: '66%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {format(selectedDate, 'MMMM yyyy')}
                </h3>
                <div className="flex space-x-1">
                  <button
                    onClick={() => {
                      const prevMonth = new Date(selectedDate);
                      prevMonth.setMonth(prevMonth.getMonth() - 1);
                      setSelectedDate(prevMonth);
                    }}
                    className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      const nextMonth = new Date(selectedDate);
                      nextMonth.setMonth(nextMonth.getMonth() + 1);
                      setSelectedDate(nextMonth);
                    }}
                    className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Days of week header */}
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                  <div key={day} className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-1">
                {(() => {
                  const days = [];
                  const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
                  const lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
                  const daysInMonth = lastDay.getDate();

                  // Add empty cells for days before the first day of the month
                  for (let i = 0; i < firstDay.getDay(); i++) {
                    days.push(
                      <div key={`empty-${i}`} className="h-8 rounded-md"></div>
                    );
                  }

                  // Add cells for each day of the month
                  for (let day = 1; day <= daysInMonth; day++) {
                    const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
                    const dateStr = date.toISOString().split('T')[0];
                    const isSelected = day === selectedDate.getDate() &&
                      selectedDate.getMonth() === date.getMonth() &&
                      selectedDate.getFullYear() === date.getFullYear();
                    const hasActivity = highlightedDates.includes(dateStr);

                    days.push(
                      <button
                        key={day}
                        onClick={() => handleDateChange(date)}
                        className={`h-8 rounded-md flex items-center justify-center text-sm transition-colors
                          ${isSelected
                            ? 'bg-blue-500 text-white'
                            : hasActivity
                              ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                      >
                        {day}
                      </button>
                    );
                  }

                  return days;
                })()}
              </div>

              {/* Quick date selectors */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleDateChange(new Date())}
                  className="px-2 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Today
                </button>
                <button
                  onClick={() => {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    handleDateChange(yesterday);
                  }}
                  className="px-2 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Yesterday
                </button>
                <button
                  onClick={() => {
                    const lastWeek = new Date();
                    lastWeek.setDate(lastWeek.getDate() - 7);
                    handleDateChange(lastWeek);
                  }}
                  className="px-2 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Last Week
                </button>
              </div>

              {/* Close button */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setCalendarOpen(false)}
                  className="px-3 py-1.5 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Activity Table - Full Width */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
            {isLoading ? (
              <div className="w-full flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div ref={tableRef}>
                <UserActivityTable
                  filteredActivities={filteredActivities}
                  lineChartRef={tableRef}
                  selectedEntityId={selectedPropertyId}
                  selectedEntityType="PROPERTY"
                  properties={properties}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertiesInteractions;