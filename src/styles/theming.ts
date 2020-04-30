import { DefaultTheme, Theme } from "react-native-paper";

export interface PaoTheme {
  fonts: {
    largeHeader: { fontFamily: string }
  },
  btnHeight: {
    large: number
  }
}
export type PaoThemeType = Theme & PaoTheme

export const PaoTheme: PaoThemeType = {
  ...DefaultTheme,
  roundness: 15,
  colors: {
    ...DefaultTheme.colors,
    primary: '#533295',
    accent: '#cf20c6',
  },
  fonts: {
    regular: {
      fontFamily: 'MontserratReg'
    },
    medium: {
      fontFamily: 'MontserratMed'
    },
    light: {
      fontFamily: 'MontserratLight'
    },
    thin: {
      fontFamily: 'MontserratThin'
    },
    largeHeader: {
      fontFamily: 'YesevaOne'
    },
  },
  btnHeight: {
    large: 50
  },
};