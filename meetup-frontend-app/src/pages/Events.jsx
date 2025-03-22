import { Link } from 'react-router-dom';
import { useState } from 'react';
import useFetch from '../useFetch';

const Events = () => {
  const { data, loading, error } = useFetch("https://meetup-app-jade.vercel.app/events");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEvents = data?.filter(event =>
    (filter === "all" || (event.type && event.type.includes(filter))) &&
    (event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.eventTags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <>
      <div className='bg-light'>
        <div className='container'>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1>Meetup Events</h1>
            <select id="selectType" className="form-select" style={{ width: 'auto' }} onChange={(e) => setFilter(e.target.value)} defaultValue="all">
              <option value="" disabled>Select Event Type</option>
              <option value="all">All</option>
              <option value="Both">Both</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          <div className="form-inline mb-3">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search by title and tags..."
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}

          <div className='row row-cols-1 row-cols-md-3 g-4 mt-3 mb-4'>
            {filteredEvents?.map((event) => (
              <div className='col' key={event._id}>
                <Link to={`/events/${event._id}`} style={{ textDecoration: "none" }}>
                  <div className='card h-100 position-relative'>
                    <img src={event.eventImgUrl} className='card-img-top' alt={event.title} />
                    <div className="z-3 position-absolute top-0 start-0 p-2 bg-light text-dark">
                      <span>{event.type}</span>
                    </div>
                    <div className='card-body'>
                      <p className='card-text'>{event.startingTime}</p>
                      <h5 className='card-title'>{event.title}</h5>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
