import { useNavigate } from "react-router-dom";
import { login } from "./../../reducers/login";
import { useDispatch, useSelector } from "react-redux";

const Landing = () => {
  const state = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();
  console.log(state, "state");

  const navigate = useNavigate();

  const moving = () => {
    navigate("/tasks");
  };

  return (
    <div>
      {state.signIn.token ? (
        <button onClick={moving()}>go</button>
      ) : (
        <>
          <h1>To Do </h1>
          <button
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </>
      )}
    </div>
  );
};

export default Landing;
