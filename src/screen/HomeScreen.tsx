import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import AgriStatusBar from '../components/AgriStatusBar';
import Mapbox from '@rnmapbox/maps';
import {ScreenParams} from '../types/screenPropTypes';

const HomeScreen: FC<ScreenParams> = () => {
  return (
    <SafeAreaView style={styles.cotainer}>
      <AgriStatusBar />

      <Mapbox.MapView style={{flex: 1}} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cotainer: {
    flex: 1,
  },
});
