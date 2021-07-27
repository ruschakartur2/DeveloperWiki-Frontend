import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT, PROFILE_RETRIEVE, PROFILE_UPDATE,
} from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? (user) : null,
  profile: null,
  isLoggedIn: !!user

}
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        profile: payload.profile,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case PROFILE_RETRIEVE:
      return {
        ...state,
        profile: payload,
      }
    case PROFILE_UPDATE:
      return {
        ...state,
        profile: payload,
      }


    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
