import React from "react";
import { View, TouchableOpacity } from "react-native";

const BackDrop = ({ onClose, mobile }) => {
  return (
    <View
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 100,
      }}
    >
      {!mobile && (
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={onClose}
        />
      )}
    </View>
  );
};

export default BackDrop;
