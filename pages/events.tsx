import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { withProtected } from "../src/hook/route";
import Link from 'next/link';

function Events() {
  interface Event {
    id: number;
    host: string;
    name: string;
    event_name: string;
    date: Date;
    budget: number;
    created_at: number;
    modified: number;
  }
  const [events, setEvents] = useState<Event[]>([]);

  const showEvents = () => {
    fetch("https://cc26-planout.herokuapp.com/events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "x-auth-token": localStorage.getItem("token")
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      });
  };

  useEffect(() => {
    showEvents();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container m-auto mt-20 box-content h-screen md:w-1/2 border-2">
        <div className="overflow-hidden m-10">
          <div className="mt-10 text-center text-4xl font-header">EVENTS</div>
          <div>
            {events.map((event) => (
              <Link
              className="p-4 font-body text-2xl border-2 md:w-1/2 m-auto mt-10 text-center hover:cursor-pointer hover:border-blue-500 hover:bg-blue-100 transition-all duration-500 ease-in"
              href={"/event/" + event.id}
                key={event.id}
              >
                {event.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withProtected(Events);
