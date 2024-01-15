import React from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import AppText from "./typo/AppText";

const ReusableModal = ({ title, children, modalVisible, setModalVisible }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <AppText
                text={title}
                center={false}
                bold={true}
                size={20}
              />
              {children}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent black overlay
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "80%",
  },
  title: {
    marginBottom: 10,

  },
});

export default ReusableModal;
