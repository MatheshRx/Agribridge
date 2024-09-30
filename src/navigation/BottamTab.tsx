import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MapScreen from '../screen/map/MapScreen';
import {Routes} from '../../App';
import Cluster from '../screen/map/Cluster';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../styles/theme';

const Tab = createBottomTabNavigator();

const BottamTab: FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={Routes.List}
        component={Cluster}
        options={{
          tabBarIcon: props => (
            <MIcon name="map" size={24} color={props.color} />
          ),
          tabBarActiveTintColor: COLORS.primary,
        }}
      />
      <Tab.Screen
        name={Routes.Map}
        component={MapScreen}
        options={{
          tabBarIcon: props => (
            <MIcon name="marker" size={24} color={props.color} />
          ),
          tabBarActiveTintColor: COLORS.primary,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottamTab;

const styles = StyleSheet.create({});
