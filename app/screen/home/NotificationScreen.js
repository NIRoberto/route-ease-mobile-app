import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenComponent from "../../components/ScreenComponent";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const NotificationsCard = ({ icon, title, subTitle, date }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};
const notificationData = [
  {
    title: "Your ticket is confirmed!",
    subTitle: "Tap to view details",
    date: "Just now",
    icon: (
      <MaterialCommunityIcons
        name="ticket-confirmation"
        size={24}
        color="green"
      />
    ),
  },
  {
    title: "Reminder: Upcoming Event",
    subTitle: "Don’t forget to attend the concert tomorrow",
    date: "Tomorrow",
    icon: (
      <MaterialCommunityIcons name="calendar-clock" size={24} color="blue" />
    ),
  },
  {
    title: "Special Offer on Tickets!",
    subTitle: "Exclusive discount available for a limited time",
    date: "2 hours ago",
    icon: <MaterialCommunityIcons name="sale" size={24} color="red" />,
  },
  {
    title: "Important Update: Venue Change",
    subTitle: "The venue for the event has been changed. Check details.",
    date: "3 days ago",
    icon: (
      <MaterialCommunityIcons name="alert-circle" size={24} color="orange" />
    ),
  },
  {
    title: "Last Minute Ticket Deals",
    subTitle: "Grab the best seats at discounted prices for tonight’s show",
    date: "1 hour ago",
    icon: (
      <MaterialCommunityIcons name="ticket-percent" size={24} color="purple" />
    ),
  },
  {
    title: "Event Cancellation Notice",
    subTitle: "Unfortunately, the event has been canceled. Check for refunds.",
    date: "1 week ago",
    icon: <MaterialCommunityIcons name="cancel" size={24} color="red" />,
  },
  {
    title: "Your Review is Valued!",
    subTitle: "Share your experience and help us improve",
    date: "1 day ago",
    icon: <MaterialCommunityIcons name="star" size={24} color="yellow" />,
  },
  {
    title: "Limited Edition Merchandise",
    subTitle: "Exclusive event merchandise now available. Shop now!",
    date: "4 hours ago",
    icon: <MaterialCommunityIcons name="shopping" size={24} color="green" />,
  },
  {
    title: "Flash Sale: VIP Access",
    subTitle: "Upgrade to VIP for exclusive perks. Limited time offer!",
    date: "5 hours ago",
    icon: <MaterialCommunityIcons name="tag" size={24} color="gold" />,
  },
  {
    title: "Feedback Request",
    subTitle:
      "Let us know about your ticket booking experience. Your feedback matters!",
    date: "2 weeks ago",
    icon: (
      <MaterialCommunityIcons
        name="comment-text-outline"
        size={24}
        color="blue"
      />
    ),
  },
];

const NotificationScreen = () => {
  return (
    <ScreenComponent>
      <View>
        <FlatList
          data={notificationData}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <NotificationsCard
              title={item.title}
              date={item.title}
              subTitle={item.subTitle}
              icon={item.icon}
            />
          )}
        />
      </View>
    </ScreenComponent>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "white",
    marginBottom: 10,
  },
  iconContainer: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subTitle: {
    color: "grey",
  },
  date: {
    color: "grey",
    fontSize: 12,
  },
});
