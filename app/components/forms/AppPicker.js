import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "../typo/AppText";
import { Modal, TouchableOpacity } from "react-native";
import colors from "../../config/colors";

const PickerItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <AppText text={item.label} size={15} color={"black"} />
    </TouchableOpacity>
  );
};
const AppPicker = ({
  icon,
  placeholder,
  items,
  selectedItem,
  onSelectItem,
  numberOfColumns = 1,
  PickerItemComponent = PickerItem,
  width = "100%",
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const handlePress = () => {
    setModalVisible(true);
  };
  return (
    <>
      {placeholder && (
        <AppText style={styles.label} text={placeholder} color={"black"} />
      )}
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.container}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={10}
              style={styles.iconBtn}
            />
          )}
          <AppText
            text={selectedItem ? selectedItem : placeholder}
            color={"black"}
            center={false}
            bold={false}
            size={15}
          />
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={10}
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>
      <Modal style={styles.modal} visible={modalVisible} animationType="slide">
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.closeButton}>
            <AppText
              text={"Close"}
              color={"white"}
              bold={true}
              size={15}
              center={false}
            />
          </View>
        </TouchableOpacity>
        <FlatList
          data={items}
          keyExtractor={(item) => item.value.toString()}
          numColumns={numberOfColumns}
          renderItem={({ item }) => (
            <PickerItem
              item={item}
              onPress={() => {
                setModalVisible(false);
                onSelectItem(item);
              }}
            />
          )}
        />
      </Modal>
    </>
  );
};

export default AppPicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "white",
    gap: 5,
    borderRadius: 10,
    position: "relative",
    margin: 10,
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: colors.primaryButton,
  },
  label: {
    textTransform: "capitalize",
    color: "#333333",
    paddingHorizontal: 10,
  },
  iconBtn: {
    marginRight: 5,
    color: colors.primaryButton,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: 10,
    position: "absolute",
    right: 10,
    color: "gray",
    top: "100%",
  },
  item: {
    padding: 20,
    margin: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 22,
  },
  closeButton: {
    width: "96%",
    height: 50,
    margin: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    backgroundColor: colors.primaryButton,
  },
});
