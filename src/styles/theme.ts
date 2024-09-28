import { StatusBar } from "react-native";

type ColorKeys = 'primary' | 'secondary' | 'accent' | 'white' | 'black' | 'text';

export const COLORS: Record<ColorKeys, string> = {
    primary: '#606c38',
    secondary: '#ecf39e',
    accent: '#e9edc9',
    white: '#FFFFFF',
    black: '#000000',
    text: '#333333'
};

export const STYLES = {
    container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight ?? 0,
  }
}