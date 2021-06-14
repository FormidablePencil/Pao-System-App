import { StyleSheet } from "react-native";

export const paoTableStyles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: "0px 15px",
  },
  firstItemInRow: {
    marginLeft: 3,
    alignSelf: "center",
    // color: ${({ color }) => color ?? "white"},
    width: "20px",
    textAlign: "center",
    justifyContent: "center",
  },
  firstItemInRowImage: {
    height: 30,
    width: 30,
  },
  itemInRow: {
    width: "33%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  styledTextInRowItemStudyMode: {
    textAlign: "center",
    // color: ${({ color }) => color ?? "white"},
    fontSize: 20,
  },
});
