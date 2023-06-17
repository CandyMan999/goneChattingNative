import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AnimatePresence, MotiView } from "moti";
import { COLORS } from "../../constants";

const OnlineDot = ({ online }) => {
  const outerDotVariants = {
    start: {
      scale: 1,
      opacity: 1,
      boxShadow: `0px 0px 0px 0px ${COLORS.green}`,
      loop: Infinity,
      type: "spring",
      repeatDelay: 0,
    },
    end: {
      scale: 5,
      opacity: 0,
      boxShadow: `0px 0px 20px 8px ${COLORS.green}`,
    },
  };

  const ringOverlayVariants = {
    start: {
      scale: 1,
      opacity: 1,
    },
    end: {
      scale: 7,
      opacity: 0,
    },
  };

  return (
    <View style={styles.container}>
      <AnimatePresence exitBeforeEnter>
        {online && (
          <MotiView
            from={outerDotVariants.start}
            animate={outerDotVariants.end}
            transition={{
              duration: 2500,
              loop: Infinity,
              type: "timing",
            }}
            exit={outerDotVariants.end}
            style={[
              styles.dot,
              { backgroundColor: COLORS.green },
              online && styles.onlineDot,
            ]}
            key="online"
          ></MotiView>
        )}
        {!online && (
          <MotiView
            style={[
              styles.dot,
              { backgroundColor: COLORS.red },
              !online && styles.offlineDot,
            ]}
            key="offline"
          />
        )}
      </AnimatePresence>
      {online && <View style={styles.innerDot} />}
      <Text
        style={[
          styles.statusText,
          { color: online ? COLORS.green : COLORS.black },
        ]}
      >
        {online ? "Online" : "Offline"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    margin: 4,
  },
  onlineDot: {
    justifyContent: "center",
    alignItems: "center",
  },
  offlineDot: {},
  innerDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.green,
    position: "absolute",
    marginLeft: 3,
  },
  statusText: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default OnlineDot;
