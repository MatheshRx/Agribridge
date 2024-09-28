import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('agribridge_data', jsonValue);
  } catch (error) {
    console.log('🚀 ~ storeData ~ ̥:', error);
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('agribridge_data');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log('🚀 ~ getData ~ ̥:', error);
  }
};
