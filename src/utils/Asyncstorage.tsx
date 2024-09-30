import AsyncStorage from '@react-native-async-storage/async-storage';
import {FeatureCollection, Point} from 'geojson';

export const storeData = async (value: FeatureCollection) => {
  try {
    const previousValue: FeatureCollection = await getData();
    if (previousValue) {
      const values: FeatureCollection = {
        ...previousValue,
        features: [...previousValue.features, value.features[0] as any],
      };
      const jsonValue = JSON.stringify(values);
      await AsyncStorage.setItem('agribridge_data', jsonValue);
    } else {
      const jsonValue = JSON.stringify(value);

      await AsyncStorage.setItem('agribridge_data', jsonValue);
    }
  } catch (error) {
    console.log('🚀 ~ storeData ~ ̥:', error);
  }
};

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('agribridge_data');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log('🚀 ~ getData ~ ̥:', error);
  }
};
