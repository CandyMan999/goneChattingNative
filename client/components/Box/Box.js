import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import styled from "@emotion/native";

import { COLORS } from "../../constants/colors";

const Box = (props) => {
  const { onClick, children, ...otherProps } = props;

  return (
    <TouchableOpacity onPress={onClick}>
      <StyledView {...otherProps}>{children}</StyledView>
    </TouchableOpacity>
  );
};

const StyledView = styled(View)(
  ({
    alignItems,
    background,
    backgroundColor,
    border,
    borderBottom,
    borderLeft,
    borderRadius,
    borderRight,
    borderTop,
    bottom,
    boxShadow,
    center,
    centerText,
    column,
    color,
    direction,
    flex,
    flexWrap,
    height,
    justifyContent,
    left,
    margin,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    marginX,
    marginY,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    overflow,
    padding,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingX,
    paddingY,
    position,
    right,
    top,
    textAlign,
    transition,
    width,
    zIndex,
  }) => ({
    alignItems: center ? "center" : alignItems,
    backgroundColor: background || backgroundColor || "transparent",
    borderBottomWidth: borderBottom ? 1 : border ? 1 : undefined,
    borderBottomColor: borderBottom || border || undefined,
    borderLeftWidth: borderLeft ? 1 : border ? 1 : undefined,
    borderLeftColor: borderLeft || border || undefined,
    borderBottomLeftRadius: borderRadius,
    borderRightWidth: borderRight ? 1 : border ? 1 : undefined,
    borderRightColor: borderRight || border || undefined,
    borderBottomRightRadius: borderRadius,
    borderTopWidth: borderTop ? 1 : border ? 1 : undefined,
    borderTopColor: borderTop || border || undefined,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    bottom: typeof bottom === "number" ? bottom : undefined,
    color,
    display: "flex",
    flexDirection: column ? "column" : direction,
    flex,
    flexWrap,
    height: typeof height === "number" ? height : undefined,
    justifyContent,
    left: typeof left === "number" ? left : undefined,
    marginBottom: marginBottom || marginY || margin,
    marginLeft: marginLeft || marginX || margin,
    marginRight: marginRight || marginX || margin,
    marginTop: marginTop || marginY || margin,
    maxHeight: typeof maxHeight === "number" ? maxHeight : undefined,
    maxWidth: typeof maxWidth === "number" ? maxWidth : undefined,
    minHeight: typeof minHeight === "number" ? minHeight : undefined,
    minWidth: typeof minWidth === "number" ? minWidth : undefined,
    overflow,
    paddingBottom: paddingBottom || paddingY || padding,
    paddingLeft: paddingLeft || paddingX || padding,
    paddingRight: paddingRight || paddingX || padding,
    paddingTop: paddingTop || paddingY || padding,
    position,
    right: typeof right === "number" ? right : undefined,
    top: typeof top === "number" ? top : undefined,
    textAlign: centerText ? "center" : textAlign,
    transition,
    width: typeof width === "number" ? width : undefined,
    zIndex,
    ...(boxShadow && {
      shadowColor: "#000",
      shadowOffset: { width: 2, height: 4 },
      shadowOpacity: 0.8,
      shadowRadius: 10,
      elevation: 5,
    }),
  }),
  ({ card }) =>
    card && {
      shadowColor: "#000",
      shadowOffset: { width: 2, height: 4 },
      shadowOpacity: 0.8,
      shadowRadius: 10,
      borderRadius: 5,
      elevation: 5,
    }
);

export default Box;
