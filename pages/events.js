//TODO: Here we need to use Pre-rendering for SEO. And as our content is dynamic and need to fetch data at each an every request time, we need to use Server Side Rendering with getServerSideProps. And also we need to filter events. So, We need to use Client side data fetching on every filtering.
//*That is Why we implemented both pre-rendering and client side data fetching combined.

//?But Why we use shallow routing in here?
//*When we store events in a state and shows that events in the UI, it remains in the same route. After reloading the page the filtering events is not found. So we need to implement shallow routing. When user filter specific events, it will be displayed in same route with query parameter. So, after reloading the page it remains in the same route with query parameter and getServerSideProps will found a context, where query is remain there. And we need to fetch data with that query parameter. But when the user first time visit on the page. getServerSideProps will not found a context with query parameter. So, That time we need to fetch data for all events without query parameter or empty string.

import { useState } from "react";
import { useRouter } from "next/router";

const EventList = ({ eventList }) => {
  const [events, setEvents] = useState(eventList);
  const router = useRouter();

  const fetchSportsEvents = async () => {
    const response = await fetch(
      "http://localhost:4000/events?category=sports"
    );
    const data = await response.json();
    setEvents(data);
    router.push("/events?category=sports", undefined, { shallow: true });
  };

  return (
    <>
      <button onClick={fetchSportsEvents}>Sports Events</button>
      <h2>List of events</h2>
      {events.map((event) => (
        <div key={event.id}>
          <h2>
            {event.id} {event.title} {event.date} | {event.category}
          </h2>
          <p>{event.description}</p>
          <hr />
        </div>
      ))}
    </>
  );
};

export default EventList;

export async function getServerSideProps(context) {
  const { query } = context;
  const { category } = query;
  const queryString = category ? "category=sports" : "";
  const response = await fetch(`http://localhost:4000/events?${queryString}`);
  const data = await response.json();

  return {
    props: {
      eventList: data,
    },
  };
}
