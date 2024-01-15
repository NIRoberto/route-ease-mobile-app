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
  const navigation = useNavigation();
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
      ? "Good Afternoon"
      : "Good Evening";

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
                  source={require("../../assets/Robert.png")}
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
                    text="Robert Niyitanga"
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
                initialValues={{ from: "", to: "" }}
                onSubmit={(values) => {
                  // console.log(values);
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
                  name="Origin"
                  items={fromLocations}
                  placeholder="Select Origin"
                />
                <AppFormPicker
                  name="Destination"
                  items={toLocations}
                  placeholder="Select Destination"
                />

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
