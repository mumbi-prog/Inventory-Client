import React, { useEffect, useState } from 'react';
import UpdateModal from './UpdateModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import api from '../api/Api';
import { BiSolidEditAlt } from 'react-icons/bi';
import { BsTrash3 } from 'react-icons/bs';
import { FaLocationDot } from 'react-icons/fa6';
import WelOrg from './WelOrg';

function formatDate(dateString) {
  const date = new Date(dateString);
  const month = date.toLocaleDateString(undefined, { month: 'short' });
  const day = date.getDate();
  return (
    <div className="event-date font-bold flex flex-col items-center justify-center mt-2">
      <p className="month text-main-blue font-medium text-sm">{month}</p>
      <p className="day text-3xl mt-2 font-bold">{day}</p>
    </div>
  );
}

function Dashboard() {
  const [organizerData, setOrganizerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ setError ] = useState(null);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [eventToUpdate, setEventToUpdate] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  useEffect(() => {
    api.get('/organiser_dashboard')
      .then((response) => response.data)
      .then((data) => {
        setOrganizerData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching organizer dashboard:', error);
      });
  }, []);

  const openUpdateModal = (event) => {
    setIsUpdateModalOpen(true);
    setEventToUpdate(event);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setEventToUpdate(null);
  };

  const openDeleteModal = (event) => {
    setIsDeleteModalOpen(true);
    setEventToDelete(event);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setEventToDelete(null);
  };

  const handleUpdateEvent = (updatedEventData) => {
    api
      .patch(`/events/${eventToUpdate.id}`, updatedEventData)
      .then((response) => {
        if (response.status === 200) {
          setOrganizerData((prevEvents) =>
            prevEvents.map((event) =>
              event.id === eventToUpdate.id ? { ...event, ...updatedEventData } : event
            )
          );
          closeUpdateModal();
          
        } else {
          console.error('Failed to update event');
        }
      })
      .catch((err) => {
        setError(err);
      });
  };
  

  const confirmDeleteEvent = (event) => {
    closeDeleteModal();

    api
      .delete(`/events/${event.id}`)
      .then((response) => {
        if (response.status === 204) {
          setOrganizerData((prevEvents) => prevEvents.filter((e) => e.id !== event.id));
        } else {
          console.error('Failed to delete event');
        }
      })
      .catch((err) => {
        console.error('Error while deleting event:', err);
      });
  };

  if (loading) {
    return (
      <section className="dots-container mt-[15%]">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </section>
    );
  }
  

  return (
    <div className="organizer-dashboard mx-[20px] font-sans my-[30px]">
      <div className="dashboard-container">
        <WelOrg />
        <h2 className="dashboard-title text-2xl font-medium mb-[15px]">Organizer Dashboard</h2>

        <div className="event-stats bg-gray-400 inline-block px-[50px] py-[30px] rounded-md hover:bg-acc-blue">
          <p className='font-bold text-lg'>Total Events:</p>
          <p className='font-bold text-lg'>{organizerData.length}</p>
        </div>
         

          <h2 className='text-2xl font-medium my-[15px]'>My Events</h2>
          {organizerData.length === 0 ? (
          <p className='font-medium'>No events. Get to creating some.</p>
        ) : (
        <div className="event-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-[10px]">
          {organizerData.map((event) => (
            <div key={event.id} className="event-card border border-gray-300 rounded-lg shadow-md">
              <div className="event-img">
                <img src={event.image_url} alt={event.title} className="h-40 w-full object-cover rounded-t-lg" />
              </div>
              <div className="event-selected-details flex p-5">
                <div className="event-date">
                  {formatDate(event.date)}
                </div>
                <div className="event-venue pl-6">
                  <h3 className="event-title font-sans mt-0 text-lg font-bold uppercase text-black ml-2">
                    {event.title}
                  </h3>
                  <div className="venue-info flex items-center mt-3">
                    <p className="text-black text-md mr-2">
                      <FaLocationDot className="location-icon" />
                    </p>
                    <p className="venue-details text-sm">
                      {event.venue_name}, {event.event_location}
                    </p>
                  </div>
                  <div className="event-actions flex mt-4">
                    <BsTrash3 onClick={() => openDeleteModal(event)} className="cursor-pointer mr-4" />
                    <BiSolidEditAlt onClick={() => openUpdateModal(event)} className="cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
      {isUpdateModalOpen && (
        <UpdateModal onClose={closeUpdateModal} onUpdate={handleUpdateEvent} eventData={eventToUpdate} />
      )}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal onCancel={closeDeleteModal} onConfirm={() => confirmDeleteEvent(eventToDelete)} />
      )}
    </div>
  );
}

export default Dashboard;
