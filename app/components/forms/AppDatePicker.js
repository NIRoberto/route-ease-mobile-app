// AppDatePicker.js

import React, { useState } from "react";
import { View, TouchableOpacity, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "../typo/AppText"; // Import your AppText component
import colors from "../../config/colors";

const AppDatePicker = ({ label, value, onChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };


  return (
    <View style={styles.container}>
        {label && <AppText text={label} color={"black"} />}
      <TouchableOpacity onPress={showDatepicker} style={styles.dateContainer}>
        <AppText
          text={value ? new Date(value).toLocaleDateString() : value}
          color={value ? colors.black : colors.mediumGrey}
          size={15}
        />
        <MaterialCommunityIcons
          name="calendar"
          size={20}
          color={colors.mediumGrey}
          style={styles.icon}
        />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default AppDatePicker;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  dateContainer: {
    flexDirection: "row",
    borderRadius: 10,
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: colors.primaryButton,
    padding: 15,
    alignItems: "center",
  },
  icon: {
    marginLeft: "auto",
  },
});
