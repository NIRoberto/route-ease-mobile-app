import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import AppContext from "./context";
import { getData } from "../config/storage";
import { API } from "../config/axios";
import { useQuery } from "@tanstack/react-query";

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
    const [tickets, setTickets] = useState([]);

  console.log(user?.access_token);
//   const { data: tickets = [] } = useQuery({
//     queryKey: ["tickets"],
//     queryFn: async () => {
//       const response = await API.get("tickets/getMyTicketData", {
//         headers: {
//           Authorization: `Bearer ${user.access_token}`,
//         },
//       });
//       return response.data.data;
//     },
//   });
  console.log(tickets);

    const fetchUserTickets = async () => {
      try {
        const response = await API.get("tickets/getMyTicketData", {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });
        console.log(response.data.data);
        setTickets(response.data.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    useEffect(() => {
      fetchUserTickets();
    }, [user]);

  useEffect(() => {
    const updateUser = async () => {
      setUser(await getData("user"));
    };
    updateUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        tickets,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
