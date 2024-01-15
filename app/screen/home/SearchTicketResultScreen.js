import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { FlatList } from "react-native";
import colors from "../../config/colors";
import AppText from "../../components/typo/AppText";
import { useNavigation } from "@react-navigation/native";
import ScreenComponent from "../../components/ScreenComponent";

const generateYearData = (year) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const yearData = [];

  for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
    const monthName = months[monthIndex];
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const dateObject = {
        day,
        dayName: new Date(year, monthIndex, day).toLocaleDateString("en-US", {
          weekday: "long",
        }),
        month: monthIndex + 1, // Adding 1 to get 1-indexed months
        monthName: monthName,
        date: new Date(year, monthIndex, day),
      };

      yearData.push(dateObject);
    }
  }

  return yearData;
};

const dummyRoutes = [
  {
    id: 1,
    travelAgency: {
      image: "travel_agency1.jpg",
      name: "Travel World",
      dateOfJourney: "2024-01-15",
    },
    startTime: "10:00 AM", // Example start time
    endTime: "02:00 PM", // Example end time
    date: "2024-01-20",
    status: "Available",
    duration: "4 hours", // Example duration
  },
  {
    id: 2,
    travelAgency: {
      image: "travel_agency2.jpg",
      name: "Adventure Tours",
      dateOfJourney: "2024-02-10",
    },
    startTime: "03:00 PM", // Example start time
    endTime: "09:00 PM", // Example end time
    date: "2024-02-15",
    status: "Not Available",
    duration: "6 hours", // Example duration
  },
  {
    id: 3,
    travelAgency: {
      image: "travel_agency3.jpg",
      name: "Dream Destinations",
      dateOfJourney: "2024-03-05",
    },
    startTime: "11:00 AM", // Example start time
    endTime: "04:00 PM", // Example end time
    date: "2024-03-10",
    status: "Available",
    duration: "5 hours", // Example duration
  },
  {
    id: 4,
    travelAgency: {
      image: "travel_agency3.jpg",
      name: "Dream Destinations",
      dateOfJourney: "2024-03-05",
    },
    startTime: "11:00 AM", // Example start time
    endTime: "04:00 PM", // Example end time
    date: "2024-03-10",
    status: "Available",
    duration: "5 hours", // Example duration
  },
  {
    id: 5,
    travelAgency: {
      image: "travel_agency3.jpg",
      name: "Dream Destinations",
      dateOfJourney: "2024-03-05",
    },
    startTime: "11:00 AM", // Example start time
    endTime: "04:00 PM", // Example end time
    date: "2024-03-10",
    status: "Available",
    duration: "5 hours", // Example duration
  },
];

const FilterDate = ({ day, dayName, monthName, selected, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.dateContainer,
        { backgroundColor: selected ? colors.primaryButton : "white" },
      ]}
    >
      <AppText
        text={dayName.slice(0, 3)}
        color={selected ? "white" : "black"}
        bold={true}
      />
      <AppText
        text={day}
        center={false}
        color={selected ? "white" : "black"}
        bold={false}
      />
      <AppText
        text={monthName.slice(0, 3)}
        color={selected ? "white" : "black"}
        bold={false}
      />
    </TouchableOpacity>
  );
};

const RouteCard = ({
  travelAgency: { image, name, dateOfJourney },
  startTime,
  endTime,
  date,
  status,
  duration,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        console.log("Route Card Pressed");
        navigation.navigate("Book", {
          data: {
            travelAgency: {
              image,
              name,
              dateOfJourney,
            },
            startTime,
            endTime,
            date,
            status,
            duration,
          },
        });
      }}
    >
      <View style={styles.routeCard}>
        <View style={styles.routeCardHeader}>
          <Image
            style={styles.routeCardHeaderImage}
            source={require("../../assets/agency/ritco.jpeg")}
          />
          <View style={styles.routeCardHeaderDetails}>
            <AppText
              text={name}
              color={"black"}
              center={false}
              size={18}
              bold={true}
            />
            {/* <AppText text={dateOfJourney} color={"black"} bold={false} /> */}
          </View>
        </View>
        <View style={styles.routeCardDetails}>
          <View style={styles.routeCardDetailsLeft}>
            <AppText
              text={startTime}
              color={"black"}
              center={false}
              bold={false}
            />
            <AppText
              text={endTime}
              color={"black"}
              center={false}
              bold={false}
            />
          </View>
          <View style={styles.routeCardDetailsRight}>
            <AppText text={date} color={"black"} bold={false} center={false} />
            <AppText
              text={status}
              color={status === "Available" ? "green" : "red"}
              bold={false}
              center={false}
            />
            <AppText
              text={duration}
              color={"black"}
              center={false}
              bold={false}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const SearchTicketResultScreen = ({ route }) => {
  console.log(route.params);
  const [selected, setSelectedDate] = useState(false);

  return (
    <ScreenComponent>
      <View style={styles.container}>
        {/*  use flatlist */}
        <FlatList
          data={generateYearData(2024)}
          keyExtractor={(item) => {
            return new Date(item.date).toISOString().slice(0, 10);
          }}
          renderItem={({ item }) => (
            <FilterDate
              day={item.day}
              dayName={item.dayName}
              monthName={item.monthName}
              style={{
                borderWidth: 1,
              }}
              selected={
                selected && selected.getTime() === item.date.getTime()
                  ? true
                  : false
              }
              onPress={() => {
                setSelectedDate(item.date);
              }}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <FlatList
          // data={dummyRoutes.filter((route) => {
          //   console.log(
          //     selected ? new Date(selected).toISOString().slice(0, 10) : true
          //   );
          //   return selected
          //     ? route.date === new Date(selected).toISOString().slice(0, 10)
          //     : true;
          // })}
          data={dummyRoutes}
          style={{ marginTop: 10, height: "90%" }}
          keyExtractor={(item) => {
            return item.id.toString();
          }}
          renderItem={({ item }) => <RouteCard {...item} />}
        />
      </View>
    </ScreenComponent>
  );
};

export default SearchTicketResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  dateContainer: {
    padding: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginRight: 10,
    flexDirection: "row",
    gap: 10,
    // height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },

  routeCard: {
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
    marginVertical: 15,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    padding: 20,
    marginBottom: 10,
  },
  routeCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  routeCardHeaderImage: {
    width: 70,
    height: 70,
    borderRadius: 25,
    marginRight: 10,
  },
  routeCardHeaderDetails: {
    flexDirection: "column",
  },
  routeCardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  routeCardDetailsLeft: {
    flexDirection: "column",
    gap: 5,
  },
  routeCardDetailsRight: {
    flexDirection: "column",
  },
});
