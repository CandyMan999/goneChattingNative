export default function reducer(state, { type, payload }) {
  switch (type) {
    case "LOGIN_USER":
      return {
        ...state,
        currentUser: payload,
      };
    case "SET_USER_COORDS":
      return {
        ...state,
        currentUser: { ...state.currentUser, location: payload },
      };
    case "TOGGLE_PROFILE":
      return {
        ...state,
        isProfile: payload,
      };
    case "TOGGLE_LOGIN":
      return {
        ...state,
        showLogin: payload,
      };
    case "TOGGLE_SIGNUP":
      return {
        ...state,
        showSignup: payload,
      };
    case "TOGGLE_VIDEO":
      return {
        ...state,
        showVideo: payload,
      };
    case "TOGGLE_CHAT":
      return {
        ...state,
        showChatRequest: payload,
      };
    case "UPDATE_USER":
      return {
        ...state,
        currentUser: payload,
      };
    case "UPDATE_VIDEOS":
      return {
        ...state,
        currentUser: { ...state.currentUser, payload },
      };
    case "UPDATE_BLOCKED":
      return {
        ...state,
        currentUser: { ...state.currentUser, blockedUsers: payload },
      };
    case "UPDATE_PROFILE":
      return {
        ...state,
        profile: payload,
      };
    case "UPDATE_LOOKING_FOR":
      return {
        ...state,
        currentUser: { ...state.currentUser, lookingFor: payload },
      };

    case "UPDATE_LOCATION":
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          location: { ...state.currentUser.location, coordinates: payload },
        },
      };
    case "UPDATE_USER_VIDEO":
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          sentVideos: state.currentUser.sentVideos
            ? [...state.currentUser.sentVideos, payload]
            : [payload],
        },
      };
    case "JOIN_CHANNEL":
      return {
        ...state,
        userChannel: payload,
      };
    case "CHANGE_ROOM":
      return {
        ...state,
        roomId: payload,
      };
    case "VIEW_LOCATION":
      return {
        ...state,
        userLocation: {
          _id: payload._id,
          lat: payload.lat,
          lng: payload.lng,
        },
      };

    default:
      return state;
  }
}
