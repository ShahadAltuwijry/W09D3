import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import {
  create,
  get_tasks,
  user_tasks,
  delete_tasks,
  comp_task,
} from "../../reducers/tasks.js";
import { logout } from "./../../reducers/login";
import { useSelector, useDispatch } from "react-redux";

const Tasks = () => {
  const state = useSelector((state) => {
    return state;
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const moving = () => {
    // eslint-disable-next-line
    navigate("/");
  };

  //user tasks
  const getTasks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/allTasks`, {
        headers: { Authorization: `Bearer ${state.signIn.token}` },
      });

      const data = {
        userTask: res.data.map((item) => {
          return item;
        }),
      };

      dispatch(user_tasks({ data }));
    } catch (error) {
      console.log(error.message);
    }
  };

  //to get all users tasks for admins only------------------------
  const getAllUsersTasks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/adminGet`, {
        headers: { Authorization: `Bearer ${state.signIn.token}` },
      });

      const data = {
        tasks: res.data.map((item) => {
          return item;
        }),
      };

      dispatch(get_tasks({ data }));
    } catch (error) {
      console.log(error);
    }
  };

  //------------------------------------------------

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line
  }, [state.signIn.token]);

  useEffect(() => {
    getAllUsersTasks();
    // eslint-disable-next-line
  }, [state.signIn.token]);

  const addTask = async (e) => {
    e.preventDefault();
    try {
      let newTask = e.target.addTask.value;
      console.log(newTask);
      // console.log(token);
      const res = await axios.post(
        `${BASE_URL}/task/${state.signIn.user._id}`,
        {
          name: newTask,
          headers: { Authorization: `Bearer ${state.signIn.token}` },
        }
      );

      const data = {
        newTask: e.target.addTask.value,
      };
      dispatch(create({ data }));

      getTasks();
      getAllUsersTasks();
    } catch (error) {
      console.log(error.message);
    }
  };

  const completed = async (_id) => {
    try {
      // eslint-disable-next-line
      let res = await axios.put(`${BASE_URL}/check/${_id}`, {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      });

      const data = {
        completed: "",
      };
      dispatch(comp_task({ data }));

      getTasks();
      getAllUsersTasks();
    } catch (error) {
      console.log(error.message);
    }
  };

  const delTask = async (_id) => {
    try {
      // eslint-disable-next-line
      let res = await axios.delete(`${BASE_URL}/delete/${_id}`, {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      });

      const data = {
        delTask: "",
      };
      dispatch(delete_tasks({ data }));

      getTasks();
    } catch (error) {
      console.log(error.message);
    }
  };

  const adminDelTask = async (_id) => {
    try {
      // eslint-disable-next-line
      let res = await axios.delete(`${BASE_URL}/adminDel/${_id}`, {
        headers: {
          Authorization: `Bearer ${state.signIn.token}`,
        },
      });

      const data = {
        delTask: "",
      };
      dispatch(delete_tasks({ data }));

      getAllUsersTasks();
    } catch (error) {
      console.log(error.message);
    }
  };

  const logOut = () => {
    dispatch(logout({ token: "" }));
    navigate("/");
  };

  const userInfo = () => {
    // eslint-disable-next-line
    navigate("/userInfo");
  };

  let todoArr = state.task.tasks;
  console.log(state.task.tasks);

  return (
    <div>
      {!state.signIn.user ? (
        <>
          <h1>you must login or register first</h1>
          <button onClick={moving()}>Go</button>
        </>
      ) : (
        <div className="taskMainDiv">
          <h1>Tasks</h1>
          {state.task.length < 0 ? (
            <h1>no tasks found</h1>
          ) : (
            <>
              <form onSubmit={addTask}>
                <input
                  required
                  type="text"
                  name="addTask"
                  placeholder="add task"
                />
                <button type="submit">Add</button>
              </form>
              {state.signIn.user.role === "61a60b6d52ebd90581f0ff04" ? ( //admin all task return
                <div>
                  {state.task.tasks ? (
                    state.task.tasks.map((task, i) => {
                      return (
                        <div key={i + 9} className="taskDiv">
                          <>
                            <p
                              className={
                                // !state.task.tasks.isCompleted
                                state.task.tasks.map((task) => {
                                  return !task.isCompleted;
                                })
                                  ? "tasksP"
                                  : "taskDone"
                              }
                              key={i + 4}
                            >
                              {state.task.tasks.name}
                            </p>
                            <p
                              style={{
                                fontSize: "10px",
                                marginLeft: "-180px",
                                color: "gray",
                              }}
                            >
                              user id:
                              {state.task.tasks.userId}
                              {/* {tasks.map((task, i) => {
                                return(
                                <div key={i}>
                                  <p>{task.userId}</p>
                                </div>);
                              })} */}
                            </p>
                          </>
                          <div className="btnsDiv">
                            <button
                              key={i + 3}
                              className="btn"
                              id="delBtn"
                              onClick={() => adminDelTask(task._id)}
                            >
                              <img
                                className="iconImg"
                                src="https://img.icons8.com/small/32/000000/filled-trash.png"
                                alt="icon"
                              />
                            </button>
                            <button
                              key={i}
                              className="btn"
                              id="checkBtn"
                              onClick={() => completed(task._id)}
                            >
                              <img
                                className="iconImg"
                                src="https://img.icons8.com/ios-glyphs/30/000000/check-all.png"
                                alt="icon"
                              />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    //admin no task return
                    <h2>no tasks yet, try and add some!</h2>
                  )}
                </div>
              ) : (
                //user task return
                <>
                  {state.task.tasks.length > 0 ? (
                    state.task.tasks.map((task, i) => {
                      return (
                        <div key={task.name} className="taskDiv">
                          <p
                            className={
                              !task.isCompleted ? "tasksP" : "taskDone"
                            }
                            key={task._id}
                          >
                            {task.name}
                          </p>
                          <div className="btnsDiv">
                            <button
                              key={i + 3}
                              className="btn"
                              id="delBtn"
                              onClick={() => delTask(task._id)}
                            >
                              <img
                                className="iconImg"
                                src="https://img.icons8.com/small/32/000000/filled-trash.png"
                                alt="icon"
                              />
                            </button>
                            <button
                              key={i}
                              className="btn"
                              id="checkBtn"
                              onClick={() => completed(task._id)}
                            >
                              <img
                                className="iconImg"
                                src="https://img.icons8.com/ios-glyphs/30/000000/check-all.png"
                                alt="icon"
                              />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <h2>no tasks yet, try and add some!</h2>
                  )}
                </>
              )}
            </>
          )}
          <button className="outBtn" onClick={logOut}>
            log out
          </button>
          <button className="outBtn" onClick={userInfo}>
            User Info
          </button>
        </div>
      )}
    </div>
  );
};

export default Tasks;
