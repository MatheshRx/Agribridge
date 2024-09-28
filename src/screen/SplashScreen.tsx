import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC, useEffect} from 'react';
import {COLORS, STYLES} from '../styles/theme';
import {ScreenParams} from '../types/screenPropTypes';
import {Routes} from '../../App';
import AgriStatusBar from '../components/AgriStatusBar';

const SplashScreen: FC<ScreenParams> = props => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      props?.navigation?.replace(Routes.BottomTap, {} as ScreenParams);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <SafeAreaView style={[STYLES.container, styles.container]}>
      <AgriStatusBar />
      <Image
        source={require('../assets/images/agri_splash.png')}
        style={{height: 200, aspectRatio: 1, borderRadius: 12, marginBottom: 8}}
        resizeMode="contain"
      />
      <Text
        style={{
          color: COLORS.primary,
          fontFamily: 'JosefinSans-Bold',
          fontSize: 30,
          textTransform: 'uppercase',
          letterSpacing: 2,
        }}>
        Agribridge
      </Text>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
