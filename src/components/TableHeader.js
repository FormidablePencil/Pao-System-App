import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Image } from 'react-native'
import playingCards from './../assets/playing-cards-png-11-original.png'
import { Row, FirstItemInRowImage, ItemInRow, StyledTextInRowItem } from '../styles/paoTableStyles'
import { useTheme } from 'react-native-paper'
import usePrimaryControlledColor, { WhereToColor } from '../hooks/usePrimaryControlledColor'

const TableHeader = () => {
  const theme = useTheme()
  return (
    <LinearGradient
      start={[.8, 0.8]}
      colors={[usePrimaryControlledColor(WhereToColor.tableHeader), usePrimaryControlledColor(WhereToColor.tableHeader2)]}
      style={{ height: 60 }}>
      <Row>
        <FirstItemInRowImage>
          {/* <Image style={{ resizeMode: 'contain', height: 20, width: 20 }} source={playingCards} /> */}
        </FirstItemInRowImage>
        <ItemInRow>
          <StyledTextInRowItem>P</StyledTextInRowItem>
        </ItemInRow>
        <ItemInRow>
          <StyledTextInRowItem>A</StyledTextInRowItem>
        </ItemInRow>
        <ItemInRow>
          <StyledTextInRowItem>O</StyledTextInRowItem>
        </ItemInRow>
      </Row>
    </LinearGradient>
  )
}

/* py-3 */
export default TableHeader
