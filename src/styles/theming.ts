import { DefaultTheme, Theme } from "react-native-paper";

export interface PaoTheme {
  fonts: {
    largeHeader: { fontFamily: string }
  },
  btnHeight: {
    large: number
  }
  colors: {
    linearGradientBgColors: {
      first: string
      second: string
    },
    fabActionColors: any
  }
}
export type PaoThemeType = Theme & PaoTheme

export const PaoTheme: PaoThemeType = {
  ...DefaultTheme,
  roundness: 15,
  colors: {
    ...DefaultTheme.colors,
    text: '#1271F5',
    primary: '#2A9CFF',
    accent: '#48DFFF',
    fabActionColors: {
      0: '#99B1F8',
      1: '#5AB2ED',
      2: '#92C8ED',
      3: '#8DE7ED',
      4: '#28F2EB',
      5: '#61FFFA',
    },
    linearGradientBgColors: {
      first: '#4880FF',
      second: '#9061FF',
    }
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