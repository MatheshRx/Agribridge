import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen';
import MapScreen from '../screen/map/MapScreen';
import {Routes} from '../../App';

const Tab = createBottomTabNavigator();

const BottamTab: FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={Routes.List} component={HomeScreen} />
      <Tab.Screen name={Routes.Map} component={MapScreen} />
    </Tab.Navigator>
  );
};

export default BottamTab;

const styles = StyleSheet.create({});
