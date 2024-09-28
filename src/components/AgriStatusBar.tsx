import {StatusBar, StatusBarProps, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';

const AgriStatusBar: FC<StatusBarProps> = ({barStyle}) => {
  return (
    <StatusBar
      translucent
      barStyle={barStyle ? barStyle : 'light-content'}
      backgroundColor={'transparent'}
    />
  );
};

export default AgriStatusBar;

const styles = StyleSheet.create({});
