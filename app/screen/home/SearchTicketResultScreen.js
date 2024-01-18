import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import colors from "../../config/colors";
import AppText from "../../components/typo/AppText";
import { useNavigation } from "@react-navigation/native";
import ScreenComponent from "../../components/ScreenComponent";
import { API } from "../../config/axios";
import { capitalizeString } from "../../utils/func";

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

// const dummyRoutes = [
//   {
//     _id: "65a683e317aa531c6ddacd53",
//     TravelAgencyId: {
//       _id: "65a57d61eb377d600b9a7851",
//       travelAgenceName: "City Travels2",
//       agencysites: [],
//       contactInformation: "123-456-7890",
//       routes: [
//         "65a57d34eb377d600b9a784d",
//         "65a57d34eb377d600b9a784d",
//         "65a67d410a338915c9fea78c",
//         "65a681c217aa531c6ddacd2b",
//       ],
//       Journeys: [],
//       cars: ["65a57f83eb377d600b9a7860", "65a6a2a19a52d8852621b04e"],
//       createdAt: "2024-01-15T18:45:53.434Z",
//       updatedAt: "2024-01-16T15:37:05.829Z",
//       TravelAgencyId: "65a57d61eb377d600b9a7851",
//       __v: 6,
//       image:
//         "https://www.jobinrwanda.com/sites/default/files/styles/medium/public/employer_logos/xlogo_2130242003.png,qitok=a11ZtBb6.pagespeed.ic.wCryn_YzzN.jpg",
//     },
//     carId: {
//       image:
//         "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.scania.com%2Fcontent%2Fdam%2Fgroup%2Fproducts-and-services%2Fbuses-and-coaches%2Fscania-buses-and-coaches-mobile-21080-006.jpg&tbnid=p1jzA6IN8WcGMM&vet=12ahUKEwiL-8GFyOGDAxU5mycCHRxxBtwQMyglegUIARDBAQ..i&imgrefurl=https%3A%2F%2Fwww.scania.com%2Fgroup%2Fen%2Fhome%2Fproducts-and-services%2Fbuses-and-coaches.html&docid=49WRzvvNDR-FyM&w=1434&h=1433&q=bus&ved=2ahUKEwiL-8GFyOGDAxU5mycCHRxxBtwQMyglegUIARDBAQ",
//       _id: "65a57f83eb377d600b9a7860",
//       TravelAgencyId: "65a57d61eb377d600b9a7851",
//       travelAgencyName: "City Travels2",
//       model: "Sedan",
//       make: "Toyota",
//       year: 2022,
//       equipedseats: 25,
//       driverName: "John Doe",
//       telephone: "+1234567890",
//       status: "available",
//       availbleafter: "after 30 minutes",
//       injourney: "none",
//       CarId: "65a57f83eb377d600b9a7860",
//       __v: 0,
//     },
//     directionId: {
//       _id: "65a6838217aa531c6ddacd3f",
//       TravelAgencyId: "65a57d61eb377d600b9a7851",
//       RouteId: "65a681c217aa531c6ddacd2b",
//       directionName: "musanze<- - ->kigali",
//       departureCity: "musanze",
//       destinationCity: "kigali",
//       bookings: [],
//       ticketsbooked: [],
//       payedticketsbooked: [],
//       nonpayedbookedtickets: [],
//       bookedDate: [],
//       bookedTime: [],
//       periodic: 1,
//       specificationofperiodic: "Weekly",
//       createdDate: "2024-01-16T13:24:18.791Z",
//       updatedDate: "2024-01-16T13:24:18.791Z",
//       directionId: "65a6838217aa531c6ddacd3f",
//       __v: 0,
//     },
//     RouteId: {},
//     departureCity: "musanze",
//     destinationCity: "kigali",
//     travelAgenceName: "City Travels2",
//     departureDate: "2024-01-16",
//     pendingtickets: [],
//     departureTime: "17:00",
//     plannedSeats: 2,
//     bookedSeats: 0,
//     payedticketsbooked: [],
//     payedSeats: 0,
//     nonPayedSeats: 2,
//     remainingNonPayedSeats: 0,
//     ticketsbooked: [],
//     status: "Pending",
//     agents: [],
//     createdDate: "2024-01-16T13:25:55.153Z",
//     updatedDate: "2024-01-16T13:25:55.153Z",
//     journeyId: "65a683e317aa531c6ddacd53",
//     __v: 0,
//   },
// ];

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

export const RouteCard = ({
  TravelAgencyId,
  _id,
  carId,
  directionId,
  RouteId,
  departureCity,
  destinationCity,
  departureDate,
  departureTime,
  plannedSeats,
  bookedSeats,
  payedticketsbooked,
  payedSeats,
  nonPayedSeats,
  remainingNonPayedSeats,
  status,
  agents,
  createdDate,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Book", {
          data: {
            TravelAgencyId,
            _id,
            carId,
            directionId,
            RouteId,
            departureCity,
            destinationCity,
            departureDate,
            departureTime,
            plannedSeats,
            bookedSeats,
            payedSeats,
            nonPayedSeats,
            status,
            agents,
            createdDate,
          },
        });
      }}
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        backgroundColor: "white",
        borderRadius: 10,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Image
            source={{
              uri:
                TravelAgencyId?.image ||
                "https://horizonexpress.rw/wp-content/uploads/2022/02/Horizon_Express_Logo_Modified_page-0001__1_-removebg-preview.png",
            }}
            style={{ width: 50, height: 50, borderRadius: 10 }}
          />
          <View style={{ marginLeft: 10 }}>
            <AppText
              text={TravelAgencyId?.travelAgenceName}
              color={"black"}
              bold={true}
            />
            <AppText
              text={TravelAgencyId?.contactInformation}
              color={"black"}
              bold={false}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            gap: 10,
          }}
        >
          <AppText text={status} color={"green"} size={10} bold={true} />
          <AppText
            text={"700RWF"}
            color={colors.primaryText}
            size={18}
            bold={false}
          />
        </View>
      </View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <View
          style={{
            marginLeft: 10,
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
            padding: 10,
          }}
        >
          <AppText
            text={capitalizeString(departureCity)}
            size={18}
            color={"black"}
            bold={true}
          />
          <AppText
            text={capitalizeString(destinationCity)}
            size={18}
            color={"black"}
            bold={false}
          />
        </View>

        <View
          style={{
            marginTop: 10,
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
            padding: 10,
          }}
        >
          <AppText
            text={departureTime}
            color={colors.primaryText}
            bold={true}
          />
          <AppText
            text={departureDate}
            color={colors.primaryText}
            bold={true}
          />
        </View>
        {/* <View
          style={{
            marginLeft: 10,
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
            padding: 10,
          }}
        >
          <AppText text={departureDate} color={"black"} bold={true} />
          <AppText text={departureDate} color={"black"} bold={false} />
        </View> */}
        <View
          style={{
            marginTop: 10,
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
            padding: 10,
          }}
        >
          <AppText
            text={`${bookedSeats} booked seats`}
            color={"black"}
            bold={false}
          />
          <AppText
            text={`${payedSeats} payed seats`}
            color={"black"}
            bold={false}
          />
          <AppText
            text={`${nonPayedSeats} non payed seats`}
            color={"black"}
            bold={false}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const SearchTicketResultScreen = ({ route }) => {
  const [selected, setSelectedDate] = useState(false);
  const [todayJourney, setTodayJourney] = useState();
  useEffect(() => {
    const fetchTodayJourney = async () => {
      try {
        const response = await API.get("journey/getAllJourneys");
        setTodayJourney(response.data.data);
      } catch (error) {}
    };
    fetchTodayJourney();
  }, []);

  console.log(
    todayJourney?.filter(
      (item) =>
        item.departureDate ==
          new Date(route.params.data.departureDate)
            .toISOString()
            .split("T")[0] &&
        route.params.data.route ===
          item.departureCity + "-" + item.destinationCity
    )
  );

  let filteredJourney = todayJourney?.filter(
    (item) =>
      item.departureDate ==
        new Date(route.params.data.departureDate).toISOString().split("T")[0] &&
      route.params.data.route ===
        item.departureCity + "-" + item.destinationCity
  );

  return (
    <ScreenComponent>
      <View style={styles.container}>
        {/* <FlatList
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
        /> */}

        <AppText text={"Search Results"} center={false} bold={true} size={20} />
        {filteredJourney?.length > 0 ? (
          <FlatList
            // data={dummyRoutes.filter((route) => {
            //   console.log(
            //     selected ? new Date(selected).toISOString().slice(0, 10) : true
            //   );
            //   return selected
            //     ? route.date === new Date(selected).toISOString().slice(0, 10)
            //     : true;
            // })}
            data={filteredJourney}
            style={{ marginTop: 10 }}
            keyExtractor={(item) => {
              return item._id;
            }}
            renderItem={({ item }) => {
              return <RouteCard {...item} />;
            }}
          />
        ) : (
          todayJourney && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Image
                source={{
                  uri: "https://as1.ftcdn.net/v2/jpg/04/25/45/24/1000_F_425452476_9Uzk2I9lRR4ADsQHByf92spQeMvb2EN2.jpg",
                }}
                style={{
                  height: 200,
                  width: 200,
                }}
              />
              <AppText
                text={"No Ticket, good back and search again"}
                color={"red"}
                size={20}
                bold={false}
              />
            </View>
          )
        )}
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
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },

  routeCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
  },

  routeCardLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
});
