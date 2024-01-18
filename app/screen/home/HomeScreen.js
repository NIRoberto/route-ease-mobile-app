import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import ScreenComponent from "../../components/ScreenComponent";
import AppText from "../../components/typo/AppText";
import colors from "../../config/colors";

import { Ionicons } from "@expo/vector-icons";
import AppForm from "../../components/forms/AppForm";
import AppSubmitButton from "../../components/forms/AppSubmitButton";
import { useNavigation } from "@react-navigation/native";
import AppFormPicker from "../../components/forms/AppFormPicket";
import AppFormDatePicker from "../../components/forms/AppFormDatePicker";
import { useContext, useEffect, useState } from "react";
import { API } from "../../config/axios";
import AppFormField from "../../components/forms/AppFormField";
import AppContext from "../../context/context";

// locationArrays.js

export const fromLocations = [
  { label: "Kigali", id: 0, value: "Kigali" },
  { label: "Gisenyi", id: 1, value: "Gisenyi" },
  { label: "Ruhengeri", id: 2, value: "Ruhengeri" },
  // Add more locations as needed
];

export const toLocations = [
  { label: "Kigali", id: 0, value: "Kigali" },
  { label: "Butare", id: 1, value: "Butare" },
  { label: "Musanze", id: 2, value: "Musanze" },
  // Add more locations as needed
];

const timeArray = [
  { label: "00:00", id: 0, value: "00:00" },
  { label: "01:00", id: 1, value: "01:00" },
  { label: "02:00", id: 2, value: "02:00" },
  { label: "03:00", id: 3, value: "03:00" },
  { label: "04:00", id: 4, value: "04:00" },
  { label: "05:00", id: 5, value: "05:00" },
  { label: "06:00", id: 6, value: "06:00" },
  { label: "07:00", id: 7, value: "07:00" },
  { label: "08:00", id: 8, value: "08:00" },
  { label: "09:00", id: 9, value: "09:00" },
  { label: "10:00", id: 10, value: "10:00" },
  { label: "11:00", id: 11, value: "11:00" },
  { label: "12:00", id: 12, value: "12:00" },
  { label: "13:00", id: 13, value: "13:00" },
  { label: "14:00", id: 14, value: "14:00" },
  { label: "15:00", id: 15, value: "15:00" },
  { label: "16:00", id: 16, value: "16:00" },
  { label: "17:00", id: 17, value: "17:00" },
  { label: "18:00", id: 18, value: "18:00" },
  { label: "19:00", id: 19, value: "19:00" },
  { label: "20:00", id: 20, value: "20:00" },
  { label: "21:00", id: 21, value: "21:00" },
  { label: "22:00", id: 22, value: "22:00" },
  { label: "23:00", id: 23, value: "23:00" },
];

// Example output

// Example output

const OperationItem = ({ title, icon, color }) => {
  return (
    <View>
      <TouchableHighlight
        underlayColor={"gray"}
        style={{
          justifyContent: " center ",
          alignItems: "center",
          margin: 5,
          backgroundColor: "white",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          padding: 10,
          borderRadius: 10,
        }}
        onPress={() => console.log("pressed")}
      >
        <>
          <Ionicons name={icon} size={24} color={color} />
          <AppText
            center={false}
            text={title}
            color={"black"}
            size={10}
            bold={false}
          />
        </>
      </TouchableHighlight>
    </View>
  );
};

const OperationArray = [
  {
    title: "Check Booking",
    icon: "book-outline",
    color: colors.primaryButton,
  },
  {
    title: "Re-Scedule",
    icon: "calendar-outline",
    color: colors.primaryButton,
  },
  {
    title: "Cancel Booking",
    icon: "close-circle-outline",
    color: colors.primaryButton,
  },
];

const HomeScreen = () => {
  const { user } = useContext(AppContext);
  const navigation = useNavigation();
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
      ? "Good Afternoon"
      : "Good Evening";

  const [jounery, setJourney] = useState([]);

  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        const response = await API.get("directions/getAlldirections");
        setJourney(response.data.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchJourneys();
  }, []);

  const departureCity = jounery.map((item) => {
    return {
      label: item.departureCity,
      id: item.id,
      value: item.departureCity,
    };
  });

  const destinationCity = jounery.map((item) => {
    return {
      label: item.destinationCity,
      id: item.id,
      value: item.destinationCity,
    };
  });

  const combineDepartureDestination = departureCity.map((item, index) => {
    console.log(item);
    return {
      label: item.label + "-" + destinationCity[index].label,
      id: index,
      value: item.label + "-" + destinationCity[index].label,
    };
  });

  return (
    <ScreenComponent>
      <View style={styles.container}>
        <View
          style={{
            flex: 0.3,
            backgroundColor: colors.primaryButton,
            position: "relative",
          }}
        >
          <View style={{}}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Image
                  style={styles.profile}
                  source={{
                    uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
                  }}
                />
                <View
                  style={{
                    flexDirection: "column",
                    padding: 10,
                    gap: 10,
                  }}
                >
                  <AppText
                    text={greeting}
                    color={"white"}
                    bold={false}
                    size={15}
                  />
                  <AppText
                    text={user?.user?.fullNames}
                    size={15}
                    color={"white"}
                    center={true}
                  />
                </View>
              </View>
              <TouchableHighlight
                style={{
                  backgroundColor: colors.primaryButton,
                }}
                activeOpacity={0.9}
                underlayColor={colors.primaryButton}
                onPress={() => navigation.navigate("Notifications")}
              >
                <View
                  style={{
                    position: "relative",
                    borderWidth: 1,
                    borderColor: "white",
                    borderRadius: 200,
                    padding: 10,
                  }}
                >
                  <Ionicons
                    name="notifications-outline"
                    size={18}
                    color="white"
                  />
                  <Text
                    style={{
                      position: "absolute",
                      right: "-20%",
                      borderRadius: 200,
                      width: 20,
                      height: 20,
                      textAlign: "center",
                      top: "-20%",
                      backgroundColor: "white",
                    }}
                  >
                    2
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
            <View
              style={{
                backgroundColor: "white",
                margin: 25,
                borderRadius: 20,
                padding: 15,
              }}
            >
              <AppText
                text="Where do you want to go?"
                size={20}
                color={colors.primaryButton}
                center={true}
                bold={false}
              />

              <AppForm
                initialValues={{ route: "", departureDate: "" }}
                onSubmit={(values) => {
                  console.log(values);
                  navigation.navigate("SearchTicketResult", { data: values });
                }}
              >
                {/* <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="map-marker"
                  name="from"
                  placeholder="From"
                  textContentType="emailAddress"
                /> */}

                <AppFormPicker
                  name="route"
                  items={combineDepartureDestination}
                  placeholder="Select where to go"
                />

                {/* <AppFormPicker
                  name="destinationCity"
                  items={destinationCity}
                  placeholder="Select Destination"
                /> */}

                {/* <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="map-marker"
                  name="to"
                  placeholder="To"
                  textContentType="emailAddress"
                /> */}
                <AppFormDatePicker
                  name="departureDate"
                  placeholder="Departure Date"
                />
                {/* <AppFormPicker
                  name="departureTime"
                  items={[
                    { label: "00:00", id: 0, value: "00:00" },
                    { label: "01:00", id: 1, value: "01:00" },
                    { label: "02:00", id: 2, value: "02:00" },
                    { label: "03:00", id: 3, value: "03:00" },
                    { label: "04:00", id: 4, value: "04:00" },
                    { label: "05:00", id: 5, value: "05:00" },
                    { label: "06:00", id: 6, value: "06:00" },
                    { label: "07:00", id: 7, value: "07:00" },
                    { label: "08:00", id: 8, value: "08:00" },
                    { label: "09:00", id: 9, value: "09:00" },
                    { label: "10:00", id: 10, value: "10:00" },
                    { label: "11:00", id: 11, value: "11:00" },
                    { label: "12:00", id: 12, value: "12:00" },
                    { label: "13:00", id: 13, value: "13:00" },
                    { label: "14:00", id: 14, value: "14:00" },
                    { label: "15:00", id: 15, value: "15:00" },
                    { label: "16:00", id: 16, value: "16:00" },
                    { label: "17:00", id: 17, value: "17:00" },
                    { label: "18:00", id: 18, value: "18:00" },
                    { label: "19:00", id: 19, value: "19:00" },
                    { label: "20:00", id: 20, value: "20:00" },
                    { label: "21:00", id: 21, value: "21:00" },
                    { label: "22:00", id: 22, value: "22:00" },
                    { label: "23:00", id: 23, value: "23:00" },
                  ]}
                  placeholder="Departure Time"
                /> */}

                {/* <AppFormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="calendar"
                  name="departureDate"
                  placeholder="Departure Date"
                  textContentType="emailAddress"
                /> */}
                <AppSubmitButton title="Search Bus" />
              </AppForm>
            </View>
          </View>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <FlatList
            data={OperationArray}
            style={{
              gap: 10,
            }}
            keyExtractor={(item) => item.title}
            numColumns={4}
            renderItem={({ item }) => (
              <OperationItem
                title={item.title}
                icon={item.icon}
                color={item.color}
              />
            )}
          />
        </View>
      </View>
    </ScreenComponent>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "white",
  },
});
