import React from "react";
import FastImage from "react-native-fast-image";

const LogoTitle = (props) => {
  return (
    <FastImage source={{uri: props.headerImage}}
               style={{width: 50, height: 50}}/>
  );
}

export default LogoTitle;
