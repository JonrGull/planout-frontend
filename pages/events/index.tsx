import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import EventForm from "../../components/events/EventForm";
import { Events } from "../../types";
import Navbar from "../../components/Navbar";
import useAuth from "../../src/hook/auth";
import { withProtected } from "../../src/hook/route";
import { HiOutlineX } from "react-icons/hi";
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
      return event.user_id === user.uid;
    });
    for (let i = 0; i < filteredResponse.length; i++) {
      eventIds[filteredResponse[i].event_id]
        ? ""
        : (eventIds[filteredResponse[i].event_id] =
            filteredResponse[i].event_id);
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

  const displayEvents = async (
    response: AxiosResponse<any, any>,
    eventIds: Object
  ) => {
    const eventData = response.data;
    const filteredEvents = await eventData.filter((event) => {
      return eventIds[event.id] || event.hostId === user.uid;
    });
    filteredEvents.sort((a, b) =>
      a.date.localeCompare(b.date, { ignorePunctuation: true })
    );
    filteredEvents.sort((a: { date: string }, b: { date: any }) =>
      a.date.localeCompare(b.date)
    );
    setEvents(filteredEvents);
  };

  async function deleteEvent(eventId: any) {
    const response = await axios.delete(
      `https://cc26-planout.herokuapp.com/events/${eventId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 200) {
      getUserEvents();
    }
  }

  useEffect(() => {
    getUserEvents();
  }, []);

  const showOnlyDate = (date: Date) => date.toString().slice(0, 10);

  return (
    <>
      <Navbar />
      <div className="container m-auto mt-20 border box-content h-screen no-scrollbar overflow-y-auto pb-2 md:w-1/2 bg-container bg-opacity-10 shadow-2xl">
        <div className="overflow-hidden m-10 p-1">
          <div className="mt-8 text-center text-4xl font-body font-bold">
            EVENTS
          </div>
          <div>
            <EventForm getEvents={getUserEvents} />
          </div>
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-eventBg md:w-1/2 m-auto mt-10 font-body shadow-lg"
            >
              <div className="flex flex-row  border-b border-gray-400 bg-nav">
                <div className="flex flex-row items-center">
                  <img
                    src={event.hostPhoto}
                    className="ml-2 mt-2 mb-2 rounded-full w-16 h-16 mr-4"
                  />
                  <div className="text-lg">
                    Hosted by{" "}
                    <span className="font-semibold">
                      {event.hostFirstName} {event.hostLastName}
                    </span>
                  </div>
                </div>
                <HiOutlineX
                  className="ml-auto mr-1 mt-2 hover:cursor-pointer  hover:bg-gray-400 hover:text-black md:text-gray-300"
                  onClick={() => {
                    alert(`Deleting event ${event.name}`);
                    deleteEvent(event.id);
                    getUserEvents();
                  }}
                />
              </div>

              <div className="text-center p-2 ">
                <div className="text-2xl font-semibold break-all">
                  {event.name}
                </div>
                <div className="text-xl">{showOnlyDate(event.date)}</div>
              </div>

              <Link
                href="/events/[id]"
                as={`/events/${event.id}`}
                key={event.id}
              >
                <div className="p-2">
                  <button className="bg-blue-300 text-lg hover:bg-opacity-80 border border-gray-300 hover:border-white font-semibold flex flex-row ml-auto pl-2 pr-2 pt-1 pb-1 rounded-md">
                    View tasks
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default withProtected(Events);
