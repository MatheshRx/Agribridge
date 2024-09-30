import {Camera, LineLayer, MapView, ShapeSource} from '@rnmapbox/maps';
import {
  Button,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useRef, useMemo, FC} from 'react';
import {ScreenParams} from '../../types/screenPropTypes';
import {storeData} from '../../utils/Asyncstorage';
import {FeatureCollection} from 'geojson';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS} from '../../styles/theme';
import Polygon from './shapes/Polygon';
import CrosshairOverlay from './shapes/CrosshairOverlay';

type Position = [number, number];

const MapScreen: FC<ScreenParams> = props => {
  const [coordinates, setCoordinates] = useState<Position[]>([]); // ~ all coordinates
  const [lastCoordinate, setLastCoordinate] = useState<Position>([0, 0]); // ~ only last coordinates
  const [featureCollection, setFeatureCollection] =
    useState<FeatureCollection>(); // ~ polygon's starting point feature object
  const [started, setStarted] = useState(false);
  const [crosshairPos, setCrosshairPos] = useState([0, 0]);

  const coordinatesWithLast = useMemo(() => {
    return [...coordinates, lastCoordinate];
  }, [coordinates, lastCoordinate]);

  const map = useRef<MapView>(null);

  const newLocal = 'row';

  // @ Saving data in local storage
  const saveCoordsInLocal = () => {
    console.log({featureCollection});

    storeData(featureCollection as FeatureCollection);
    setStarted(false);
    ToastAndroid.show('Saved successfully', ToastAndroid.SHORT);
  };

  const cancelDrawing = () => {
    setStarted(false);
    setFeatureCollection(undefined);
  };

  return (
    <View style={{flex: 1}}>
      {/* // @ Map View */}
      <View style={{flex: 1}}>
        <MapView
          ref={map}
          style={{flex: 1}}
          onCameraChanged={async e => {
            const crosshairCoords = await map.current?.getCoordinateFromView(
              crosshairPos,
            );

            setLastCoordinate(crosshairCoords as Position);
            if (crosshairCoords && started) {
              setLastCoordinate(crosshairCoords as Position);
            }
          }}>
          {started && (
            <Polygon
              coordinates={coordinatesWithLast}
              saveCoords={(c: FeatureCollection) => setFeatureCollection(c)}
            />
          )}
          <Camera
            defaultSettings={{
              centerCoordinate: [78.121719, 9.939093],
              zoomLevel: 12,
            }}
          />
        </MapView>

        {/* // @ Cross hair to draw polygon */}
        <CrosshairOverlay onCenter={c => setCrosshairPos(c)} />
      </View>

      {/* // @ Buttons */}
      <View
        style={{
          paddingVertical: 12,
          backgroundColor: 'transparent',
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
        }}>
        {!started ? (
          // @ Button to start drawing
          <TouchableOpacity
            onPress={() => {
              setStarted(true);
              setCoordinates([lastCoordinate]);
            }}
            style={styles.button}>
            <Text style={{color: COLORS.white, fontFamily: 'JosefinSans-Bold'}}>
              Start
            </Text>
            <MIcon name="fountain-pen-tip" size={18} color={COLORS.white} />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              flexDirection: newLocal,
              justifyContent: 'center',
              gap: 10,
            }}>
            {/* // @ Button to mark locations */}
            <TouchableOpacity
              onPress={() => setCoordinates([...coordinates, lastCoordinate])}
              style={styles.button}>
              <Text style={styles.btnTxt}>Mark</Text>
              <MIcon name="plus" size={18} color={COLORS.white} />
            </TouchableOpacity>
            {/* // @ Button to cancel */}
            <TouchableOpacity onPress={cancelDrawing} style={styles.button}>
              <Text style={{color: COLORS.white, fontFamily: FONTS.bold}}>
                Cancel
              </Text>
              <MIcon name="close" size={18} color={COLORS.white} />
            </TouchableOpacity>
            {/* // @ Button to save */}
            <TouchableOpacity
              onPress={() => saveCoordsInLocal()}
              style={styles.button}>
              <Text style={{color: COLORS.white, fontFamily: FONTS.bold}}>
                Save & Stop
              </Text>
              <MIcon name="fountain-pen-tip" size={18} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    gap: 4,
  },

  btnTxt: {color: COLORS.white, fontFamily: FONTS.bold},
});

export default MapScreen;
