import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userApi } from "../api/userApi";
import { authActions } from "../state/actions/authActions";

const InnitData = ({children}) => {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userCustomer"));
    console.log('111')
    const fetchUserData = async () => {
      if (user) {
        try {
          const response = await userApi.get(user.id);
          console.log('hhhhhh')
          if (response.status === 200) {
            localStorage.setItem(
              "userCustomer",
              JSON.stringify(response?.data.user)
            );
          } else {
            console.error("Failed to fetch user data from backend");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, []);

  // Trả về một nội dung JSX rỗng
  return children;
};

export default InnitData;
