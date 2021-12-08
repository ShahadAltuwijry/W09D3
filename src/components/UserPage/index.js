import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { login } from "./../../reducers/login";
import { useSelector } from "react-redux";

const UserData = () => {
  const state = useSelector((state) => {
    return state;
  });

  // console.log(state.login.signIn.user.email);
  // const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState("");
  const [token, setToken] = useState([]);
  const [get, setGet] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  //to set all that needed from localstorage
  const user = () => {
    const userLogged = localStorage.getItem("user");
    setToken(JSON.parse(userLogged));
    const data = localStorage.getItem("email");
    setUserEmail(JSON.parse(data));
  };

  useEffect(() => {
    user();
  }, []);

  //to get all the users
  const getAllUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/adminAll`, {
        headers: { Authorization: `Bearer ${state.signIn.token}` },
      });
      return setAllUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(state);

  //   to get the users
  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  }, [state.signIn.user.role]);

  // console.log(allUsers);

  //to toggle the all users button
  const getting = () => {
    setGet(!get);
    console.log(get, "get");
  };

  //log out button
  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const taskPage = () => {
    navigate("/tasks");
  };

  return (
    <div
      className="userDataDiv"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>user Page</h1>
      <div
        style={{
          width: "43%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <h2 style={{ color: "black", fontSize: "30px" }}>user email: </h2>
        <h2 style={{ color: "rgba(0, 0, 0, 0.7)" }}>
          {state.signIn.user.email}
        </h2>
      </div>
      {state.signIn.user.role === "61a60b6d52ebd90581f0ff04" ? (
        <div className="adminDiv">
          <h3 className="roleH"> Admin</h3>
          <button onClick={getting}>Get All Users</button>
          {!get ? (
            ""
          ) : (
            <>
              <div className="allUsersDiv">
                <ul className="userList">
                  {allUsers.map((user, i) => (
                    <li key={i} className="userMail">
                      {user.email}
                      {/* <button
                        key={i + 2}
                        onClick={() => {
                          getUserTasks(user._id);
                          gettingTask();
                        }}
                      >
                        user tasks
                      </button> */}
                    </li>
                  ))}
                </ul>
                {/* {getTask ? (
                  <div className="userTasks">
                    <ul className="taskList">
                      {userTasks.map((ele, i) => {
                        <li className="userTask">{ele[i]}</li>;
                      })}
                      <li>{userTasks}</li>
                    </ul>
                    <h1>here</h1>
                  </div>
                ) : (
                  "no tasks shown"
                )} */}
              </div>
            </>
          )}
        </div>
      ) : (
        <h3 className="roleH"> User</h3>
      )}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          className="btn"
          onClick={taskPage}
          style={{ width: "90px", marginTop: "30px", marginRight: "10px" }}
        >
          tasks page
        </button>
        <button className="outBtn" onClick={logOut}>
          log out
        </button>
      </div>
    </div>
  );
};

export default UserData;
