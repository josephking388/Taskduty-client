import React, { useState } from "react";
import "/src/pages/alltask/Tasks.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { dummyData } from "../data";
import { useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const ClientTask = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const userId = useParams();
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    const request = await fetch(`https://taskduty-server-c65y.onrender.com/api/v1/task/${userId}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await request.json();
    console.log(response.tasks);
    setData(response.tasks);
  };

  // delete

  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`https://taskduty-server-c65y.onrender.com/api/v1/deletetask/${userId}`,{
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          }

      })
      console.log(response);
      if(response.status === 200){
        toast.success(response.data.massage)
      }

      setData(data.filter((existingDatum)=> existingDatum._id !== userId))


    } catch (error) {

        console.log(error);
    }
};
useEffect(() => {
  fetchData();
}, []);

  return (
    <>
      <div className="container py-3" id="top">
        <div className="d-flex justify-content-between align-items-center py-4">
          <div>
            <h1>All Task</h1>
          </div>
          <div>
            <Link to="/newtask" className="purple">
              {" "}
              + Add New Task{" "}
            </Link>
          </div>
        </div>

        {/* all tasks */}

        <div className="d-flex gap-3 flex-column">
          {data && data.map((datum) => (
              <div key={datum._id}>
                <div className="border rounded-2 mb-2  d-flex flex-column gap-5  justify-content-between">
                  <div className="d-flex justify-content-between align-items-center border-bottom  p-4 ">
                    <h5>{datum.tags}</h5>
                    <div className="d-flex gap-2 ">
                      <Link
                        to={`/edittask/${datum._id}`}
                        className="btn text-white btn-purple"
                      >
                        Edit
                      </Link>

                      <button
                        className="btn text-white btn-purple"
                        onClick={() => handleDelete(datum._id)}
                      >
                        {" "}
                        delete
                      </button>
                    </div>
                  </div>
                  <div className="text-box p-4">
                    <h2 className="text-start ">{datum.taskTitle}</h2>
                    <p className="text-start ">{datum.description}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="d-flex justify-content-center py-4 ">
          <a
            href="#top"
            className="text-center purple text-decoration-underline "
          >
            {" "}
            Back To Top
          </a>
        </div>
      </div>
    </>
  );
};

export default ClientTask;
