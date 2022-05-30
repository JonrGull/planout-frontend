import React from "react";
import Dashboard from "../components/Dashboard";
import { withProtected } from "../src/hook/route";
import Navbar from "../components/Navbar";
import axios from "axios";

async function FindFriends() {
  const res = await axios.get('/friends'); //edit later
  console.log(res);
  
}

function Profile() {
  return (
    <div>
      {" "}
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default withProtected(Profile);
