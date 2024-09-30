// import {FAB, Icon, ListItem, Overlay} from '@rneui/base';
import {
  Camera,
  CircleLayer,
  CircleLayerStyle,
  MapView,
  ShapeSource,
  SymbolLayer,
  SymbolLayerStyle,
} from '@rnmapbox/maps';
import {FeatureCollection} from 'geojson';
import React, {useCallback, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {getData} from '../../utils/Asyncstorage';
import AgriStatusBar from '../../components/AgriStatusBar';
import clusterPoints from '../../assets/clusterPoints.json';

const layerStyles: {
  singlePoint: CircleLayerStyle;
  clusteredPoints: CircleLayerStyle;
  clusterCount: SymbolLayerStyle;
} = {
  singlePoint: {
    circleColor: 'green',
    circleOpacity: 0.84,
    circleStrokeWidth: 2,
    circleStrokeColor: 'white',
    circleRadius: 5,
    circlePitchAlignment: 'map',
  },

  clusteredPoints: {
    circlePitchAlignment: 'map',

    circleColor: [
      'step',
      ['get', 'point_count'],
      '#51bbd6',
      100,
      '#f1f075',
      750,
      '#f28cb1',
    ],

    circleRadius: ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],

    circleOpacity: 0.84,
    circleStrokeWidth: 2,
    circleStrokeColor: 'white',
  },

  clusterCount: {
    textField: [
      'format',
      ['concat', ['get', 'point_count'], '\n'],
      {'font-scale': 0.8},
    ],
    textSize: 12,
    textPitchAlignment: 'map',
  },
};

const Cluster = () => {
  const shapeSource = useRef<ShapeSource>(null);
  const [clusters, setClusters] = useState({});

  // @ getting data from local storage
  useFocusEffect(
    useCallback(() => {
      getMapData();
    }, []),
  );

  const getMapData = async () => {
    const mapData = await getData();
    setClusters(mapData);
    console.log(JSON.stringify(mapData));
  };

  return (
    <SafeAreaView style={styles.container}>
      <AgriStatusBar />

      <MapView style={styles.container}>
        <Camera
          defaultSettings={{
            centerCoordinate: [78.121719, 9.939093],
            zoomLevel: 6,
          }}
        />

        <ShapeSource
          id="Cluster"
          ref={shapeSource}
          cluster
          clusterRadius={50}
          clusterMaxZoomLevel={14}
          shape={
            {
              ...clusterPoints, // random json cluster points
              ...clusters,
            } as unknown as FeatureCollection
          }>
          <SymbolLayer id="pointCount" style={layerStyles.clusterCount} />

          <CircleLayer
            id="clusteredPoints"
            belowLayerID="pointCount"
            filter={['has', 'point_count']}
            style={layerStyles.clusteredPoints}
          />

          <CircleLayer
            id="singlePoint"
            filter={['!', ['has', 'point_count']]}
            style={layerStyles.singlePoint}
          />
        </ShapeSource>
      </MapView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Cluster;
