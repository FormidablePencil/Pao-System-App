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
    text: 'rgba(21,79,178,1.0)',
    primary: '#9979FF',
    accent: 'rgba(40,242,235,1.0)',
    background: '#BAAFE5',
    fabActionColors: {
      0: 'rgba(153,177,248,1.0)',
      1: 'rgba(90,178,237,1.0)',
      2: 'rgba(146,200,237,1.0)',
      3: 'rgba(141,231,237,1.0)',
      4: 'rgba(40,242,235,1.0)',
      5: 'rgba(97,255,250,1.0)',
    },
    linearGradientBgColors: {
      first: 'rgba(72,128,255,1.0)',
      second: 'rgba(144,97,255,1.0)',
    }
  },
  fonts: {
    regular: {
      fontFamily: 'MontserratMed'
      // MontserratMed
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