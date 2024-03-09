import { createSlice } from "@reduxjs/toolkit";
import { authAPI } from "../services/authAPI";
import { userAPI } from "../services/user";
import { userDataAPI } from "../services/userDataAPI";
import { obtainNavigatePath, obtainToken } from "../utils/help";

interface ISliceState {
  state: "loading" | "finished";
  accessToken: string;
  loggedInUser: object | null;
  showLoginModal: boolean;
  navigatePath: string;
}

const initialState: ISliceState = {
  state: "loading",
  loggedInUser: null,
  accessToken: obtainToken,
  showLoginModal: false,
  navigatePath: obtainNavigatePath,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleShowLoginModal: (state) => {
      state.showLoginModal = !state.showLoginModal;
    },
    handleLogout: (state) => {
      localStorage.clear();
      state.loggedInUser = null;
      state.accessToken = "";
      state.navigatePath = "";
    },
    handelNavigatePath: (state) => {
      const { loggedInUser } = state;
      const adminRoute = "/dashboard";
      const defaultRoute = "/dashboard/profile";
      localStorage.removeItem("navigatePath");

      if (loggedInUser) {
        switch ((loggedInUser as any).role) {
          case "admin":
            state.navigatePath = adminRoute;
            localStorage.setItem("navigatePath", adminRoute);
            break;
          case "user":
            state.navigatePath = defaultRoute;
            localStorage.setItem("navigatePath", defaultRoute);
            break;
          default:
            state.navigatePath = "/";
            localStorage.setItem("navigatePath", "/");
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authAPI.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("loggedInUser");
        localStorage.setItem("accessToken", payload?.accessToken);
        localStorage.setItem("loggedInUser", JSON.stringify(payload?.data));
        state.accessToken = payload?.accessToken;

        state.showLoginModal = false;
      }
    );
    builder.addMatcher(
      userAPI.endpoints.registerUser.matchFulfilled,
      (state, { payload }) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("loggedInUser");
        localStorage.setItem("accessToken", payload?.accessToken);
        localStorage.setItem("loggedInUser", JSON.stringify(payload?.data));
        state.accessToken = payload?.accessToken;

        state.showLoginModal = false;
      }
    );
    builder.addMatcher(
      userDataAPI.endpoints.getCurrentUser.matchFulfilled,
      (state, { payload }) => {
        state.loggedInUser = payload;
      }
    );
  },
});

export const { handleShowLoginModal, handleLogout, handelNavigatePath } =
  authSlice.actions;

export default authSlice.reducer;
