import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import EventForm from "../../components/events/EventForm";
import { Events } from "../../types";
import Navbar from "../../components/Navbar";
import useAuth from "../../src/hook/auth";
import { withProtected } from "../../src/hook/route";
import { FaTrash } from "react-icons/fa";

function Events() {
  const [events, setEvents] = useState<Events[]>([]);
  const { token, user } = useAuth() as any;

  const getUserEvents = async () => {
    const eventIds = {};
    const response = await axios.get(
      "https://cc26-planout.herokuapp.com/eventusers",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    let filteredResponse = response.data.filter((event: any) => {
      return event.user_id === user.uid
     });
     for (let i = 0; i < filteredResponse.length; i ++){
       eventIds[filteredResponse[i].event_id] ? '' : eventIds[filteredResponse[i].event_id] = filteredResponse[i].event_id;
     }
     getEvents(eventIds);
  };

  const getEvents = async (data: Object) => {
    const eventIds = data;
    const response = await axios.get(
      "https://cc26-planout.herokuapp.com/events",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

   displayEvents(response, eventIds);
  };

  const displayEvents = async (response, eventIds) => {
    const eventData = response.data
      const filteredEvents =  await eventData.filter((event) => eventIds[event.id]);
      setEvents(filteredEvents);
  }


  async function deleteEvent(eventId: any) {
    await axios.delete(`https://cc26-planout.herokuapp.com/events/${eventId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
  useEffect(() => {
    getUserEvents();
  }, []);

  const showOnlyDate = (date: Date) => date.toString().slice(0, 10);
  return (
    <>
      <Navbar />
      <div className="container m-auto mt-20 border box-content h-screen no-scrollbar overflow-y-auto pb-2 md:w-1/2 bg-container bg-opacity-10">
        <div className="overflow-hidden m-10">
          <div className="mt-10 text-center text-4xl font-body font-bold">
            EVENTS
          </div>
          <div>
            <EventForm getEvents={getEvents} />
          </div>
          {events.map((event) => (
            <div
              key={event.id}
              className="pb-8 pt-4 pr-2 font-body rounded-md text-2xl mb-2 shadow-md md:w-1/2 m-auto mt-10 text-center hover:border-blue-500 hover:bg-blue-50 transition-all duration-500 ease-in bg-gray-50"
            >
              <FaTrash
                onClick={() => {
                  deleteEvent(event.id);
                  getEvents();
                }}
                className="text-sm float-right md:fill-gray-50 hover:cursor-pointer hover:fill-black"
              />

              <Link
                href="/events/[id]"
                as={`/events/${event.id}`}
                key={event.id}
              >
                <div className="hover:cursor-pointer">
                  <div className="text-center capitalize ">{event.name}</div>
                  <div className="text-center mt-2">
                    {showOnlyDate(event.date)}
                  </div>
                </div>
              </Link>

              <div className="text-sm float-right">
                {" "}
                Hosted by {event.hostFirstName} {event.hostLastName}{" "}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default withProtected(Events);
