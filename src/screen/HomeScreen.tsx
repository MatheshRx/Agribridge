import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import AgriStatusBar from '../components/AgriStatusBar';
import Mapbox from '@rnmapbox/maps';
import {ScreenParams} from '../types/screenPropTypes';
import {getData} from '../utils/Asyncstorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const HomeScreen: FC<ScreenParams> = () => {
  const [list, setList] = useState();

  useFocusEffect(
    useCallback(() => {
      getMapData();
    }, []),
  );

  const getMapData = async () => {
    const mapData = await getData();
    setList(mapData);

    console.log({mapData});
  };

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
