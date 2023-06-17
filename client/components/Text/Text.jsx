import React from "react";
import { Text as RNText } from "react-native";
import styled from "@emotion/native";
import { fontSizes, FONT_SIZES } from "./font-sizes";

const Text = (props) => <StyledText {...props}>{props.children}</StyledText>;

const StyledText = styled(RNText)(
  ({
    fontSize,
    color,
    center,
    bold,
    margin,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    marginX,
    marginY,
    lineHeight,
    textShadow,
    paddingLeft,
    paddingRight,
    position,
    bottom,
    backgroundColor,
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  }) => ({
    fontSize: fontSizes[fontSize] || fontSizes[FONT_SIZES.MEDIUM],
    color,
    fontWeight: bold ? "bold" : undefined,
    textAlign: center ? "center" : undefined,
    marginBottom: marginBottom ? marginBottom : marginY ? marginY : margin,
    marginLeft: marginLeft ? marginLeft : marginX ? marginX : margin,
    marginRight: marginRight ? marginRight : marginX ? marginX : margin,
    marginTop: marginTop ? marginTop : marginY ? marginY : margin,
    lineHeight,
    paddingLeft,
    paddingRight,
    position,
    bottom,
    backgroundColor,
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
  })
);

export default Text;
