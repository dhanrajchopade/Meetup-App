import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../useFetch';  

const EventDetails = () => {
  const { id } = useParams();
  const { data: event, loading, error } = useFetch(`https://meetup-app-jade.vercel.app/events/${id}`); 

  if (loading) {
    return <div>Loading event details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className='bg-light'>
      <div className="container">
        {/* Event Title and Host */}
        <h1 className='py-3'>{event.title}</h1>
        <p>Hosted By: <strong> {event.hostedBy} </strong> </p>

        {/* Main Content Section */}
        <div className="row">
          {/* Left Column: Event Image */}
          <div className="col-md-6">
            <img src={event.eventImgUrl} alt={event.title} className="img-fluid" />
          </div>

          {/* Right Column: Event Details */}
          <div className="col-md-6">
            <p>
              {event.startingTime} to{' '} {event.endingTime}
            </p>
            <p>{event.location}</p>
            <p>₹ {event.price}</p>

            {/* Speakers Section - Bottom Right */}
            <div className="mt-6">
              <h2>Speakers: ({event.speakers ? event.speakers.length : 0}) </h2>
              <div className="d-flex flex-wrap">
                {event.speakers &&
                  event.speakers.map((speaker) => (
                    <div key={speaker.name} className="card me-3 mb-3" style={{ width: '180px' }}>
                      <img
                        src={speaker.imgUrl}
                        alt={speaker.name}
                        className="card-img-top rounded-circle"
                        style={{ width: '80px', height: '80px', margin: '10px auto' }}
                      />
                      <div className="card-body text-center">
                        <strong className="card-title">{speaker.name}</strong>
                        <p className="card-text">{speaker.title}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <button style={{ width: '180px' }} className="btn btn-danger my-4">RSVP</button>
          </div>
        </div>

        {/* Details Section */}
        <div className="col-md-6 my-4">
          <h2>Details:</h2>
          <div className="card">
            <div className="card-body">
              <p>{event.details}</p>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="col-md-6 my-4">
          <h2>Additional Information:</h2>
          <div className="card">
            <div className="card-body">
              <p> <strong> Dress Code: </strong> {event.dressCode}</p>
              <p> <strong> Age Restrictions: </strong> {event.ageRestrictions}</p>
            </div>
          </div>
        </div>

        {/* Event Tags Section */}
        <div className="col-md-6 my-4">
          <h2>Event Tags:</h2>
          {event.eventTags &&
            event.eventTags.map((tag, index) => (
              <span key={index} className="badge bg-secondary me-2">
                {tag}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
