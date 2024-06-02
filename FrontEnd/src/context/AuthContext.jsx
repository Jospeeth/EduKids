import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const storedUser = localStorage.getItem("user");
const initialState = { user: storedUser ? JSON.parse(storedUser) : null };  

function authReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "SIGNIN":
      return { ...state, user: payload };

    case "SIGNOUT":
      return initialState;
    default:
      return state;
  }
}
//genrerate a server


export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const isStudent = state.user && state.user.isStudent !== undefined ? state.user.isStudent : false;
  const className = isStudent ? "hidden" : "block";

  return (
    <AuthContext.Provider value={{ state, dispatch, isStudent, className }}>
      {children}
    </AuthContext.Provider>
  );
};
