import axios from "axios";
const baseURL = process.env.REACT_APP_BASELINE_URL + "users";

export const fetchOtherUsers = async (loggedInUser) =>
  await axios
    .get(
      baseURL+`/${loggedInUser._id}`,
      
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedInUser.token}`,
        },
      }
    )
    .then((response) => {
      return response.data;
    });
