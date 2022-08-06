import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { useDate } from "../utils/useDate";

interface DatePickerModalProps {
  date: Date;
  onChange: any;
  maximumDate?: Date;
}

const DatePickerModal = ({
  date,
  onChange,
  maximumDate,
}: DatePickerModalProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={styles.datePickerContainer}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.datePickerText}>{useDate(date)}</Text>
      </TouchableOpacity>
      <Modal isVisible={modalVisible} style={{ margin: 0 }}>
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <RNDateTimePicker
              value={date}
              onChange={onChange}
              mode="date"
              locale="ko-KR"
              display={"inline"}
              textColor="black"
              maximumDate={maximumDate}
              themeVariant="light"
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: "column-reverse",
    padding: 0,
  },

  modalContent: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 22,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
  },

  datePickerContainer: {
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#C3C9D3",
    marginBottom: 16,
  },

  datePickerText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#333D4B",
  },
});

export default DatePickerModal;
