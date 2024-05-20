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

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  {
    return (
      <AuthContext.Provider value={{ state, dispatch }}>
        {children}
      </AuthContext.Provider>
    );
  }
};
