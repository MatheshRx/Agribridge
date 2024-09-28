import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Routes } from "../../App";

export type ScreenParams = {
    navigation: NativeStackNavigationProp<RootStackParamList, Routes>
}

export type RootStackParamList = Record<Routes, ScreenParams> ;
