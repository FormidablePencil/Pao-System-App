import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StatusBar } from "react-native";
import playingCards from "./../assets/playing-cards-png-11-original.png";
import { paoTableStyles } from "../styles/paoTableStyles";
import { useTheme } from "react-native-paper";
import usePrimaryControlledColor, {
  WhereToColor,
} from "../hooks/usePrimaryControlledColor";

export const tableHeaderHeight = 60 + StatusBar.currentHeight;

const TableHeader = () => {
  const theme = useTheme();

  return (
    <LinearGradient
      start={[0.8, 0.8]}
      colors={[
        usePrimaryControlledColor(WhereToColor.tableHeader),
        usePrimaryControlledColor(WhereToColor.tableHeader2),
      ]}
      style={{ height: tableHeaderHeight }}
    >
      <View style={{ height: 20 }}></View>
      <View style={paoTableStyles.row}>
        <View style={firstItemInRowImage}>
          {/* <Image style={{ resizeMode: 'contain', height: 20, width: 20 }} source={playingCards} /> */}
        </View>
        <View style={paoTableStyles.itemInRow}>
          <View style={paoTableStyles.styledTextInRowItemStudyMode}>P</View>
        </View>
        <View style={paoTableStyles.itemInRow}>
          <View style={paoTableStyles.styledTextInRowItemStudyMode}>A</View>
        </View>
        <View style={paoTableStyles.itemInRow}>
          <View style={paoTableStyles.styledTextInRowItemStudyMode}>O</View>
        </View>
      </View>
    </LinearGradient>
  );
};

/* py-3 */
export default TableHeader;
