/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/screen/SplashScreen';
import BottamTab from './src/navigation/BottamTab';
import {MAPBOX_ACCESSTOKEN} from '@env';
import Mapbox from '@rnmapbox/maps';

export enum Routes {
  Splash = 'splash',
  BottomTap = 'bottomTap',
  Home = 'home',
  Map = 'map',
}

Mapbox.setAccessToken(MAPBOX_ACCESSTOKEN);
// Mapbox.setConnected(true);

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Routes.Splash}>
        <Stack.Screen
          name={Routes.Splash}
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Routes.BottomTap}
          component={BottamTab}
          options={{headerShown: false, animation: 'fade'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
