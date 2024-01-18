import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import AppContext from "../../context/context";
import ScreenComponent from "../../components/ScreenComponent";
import AppText from "../../components/typo/AppText";
import { TicketCard } from "./ActiveTicket";

const CompletedTicket = () => {
  const { tickets } = useContext(AppContext);
  console.log(tickets);

  return (
    <ScreenComponent>
      <AppText text={"Completed Ticket"} size={20} bold={true} center={true} />

      <FlatList
        data={tickets?.filter((item) => item.status === "paid")}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return <TicketCard {...item} />;
        }}
      />
    </ScreenComponent>
  );
};

export default CompletedTicket;

const styles = StyleSheet.create({});
