import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen';
import DrawPolyline from '../screen/Dummy';

const Tab = createBottomTabNavigator();

const BottamTab: FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={DrawPolyline} />
    </Tab.Navigator>
  );
};

export default BottamTab;

const styles = StyleSheet.create({});
