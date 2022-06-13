import axios from "axios";
import React, { useState } from "react";
import useAuth from "../src/hook/auth";
import { Tasks } from "../types";

export default function CostModal({
  setShowModal,
  task,
}: {
  setShowModal: (showModal: boolean) => void;
  task: Tasks;

}) {
  const [cost, setCost] = useState<number | null>(null);
  const { token } = useAuth() as any;

  const submitCost = async (id: number) => {
    try {
      await axios.put(
        `https://cc26-planout.herokuapp.com/tasks/${id}`,
        {
          id: id,
          cost: cost,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setShowCostModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed z-10 overflow-y-auto top-0 w-full left-0" id="modal">
      <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-20" />
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>
        <div
          className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <label>Cost</label>
            <input
              type="text"
              onChange={(e) => setCost(Number(e.target.value))}
              className="w-full bg-gray-100 p-2 mt-2 mb-3"
            />
          </div>
          <div className="bg-gray-200 px-4 py-3 text-right">
            <button
              onClick={() => submitCost(task.id)}
              type="button"
              className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowCostModal(false)}
              type="submit"
              className="py-2 px-4 bg-orange-300 text-white rounded hover:bg-orange-400 mr-2"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
