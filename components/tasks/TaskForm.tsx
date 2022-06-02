import axios from "axios";
import router from "next/router";
import React, { useState } from "react";

import TaskModal from "../tasks/TaskModal";
import useAuth from "../../src/hook/auth";

export default function TaskForm({ getTasks }: any) {
  const [showModal, setShowModal] = useState(false);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPoints, setTaskPoints] = useState("");
  const [taskCost, setTaskCost] = useState("");
  const { token } = useAuth() as any;

  const createTask = () => {
    const dataObj = {
      description: taskDescription,
      status: false,
      points: taskPoints,
      event_id: router.query.id,
      user_id: 2,
      cost: taskCost,
    };
    submitPostReq(dataObj);
  };

  const submitPostReq = async (data: object) => {
    try {
      await axios.post("  https://cc26-planout.herokuapp.com/tasks ", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        className="block text-white float-right mb-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        data-modal-toggle="authentication-modal"
        onClick={() => setShowModal(true)}
      >
        Create Task
      </button>

      {showModal && (
        <TaskModal
          setShowModal={setShowModal}
          setTaskDescription={setTaskDescription}
          setTaskPoints={setTaskPoints}
          setTaskCost={setTaskCost}
          createTask={createTask}
          getTasks={getTasks}
        />
      )}
    </div>
  );
}