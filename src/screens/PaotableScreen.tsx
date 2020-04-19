import React, { useState } from 'react'
import { View, Text } from 'react-native-tailwind'
import TableHeader from '../components/TableHeader'
import RenderList from '../components/RenderList'
import { Button } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPao, putPaoList } from '../actions/paoActions'
import styled from 'styled-components'

//~ everything has to work before CRUD with pao lists

export const PaotableScreen = () => {
  const [sets, setSets] = useState([
    { number: 0, person: 'James Bond', action: 'running', object: 'flamingos', },
    { number: 1, person: 'Triplets', action: 'drinking', object: 'milk', },
    { number: 2, person: 'Volk', action: 'howling', object: 'golden toilet paper', },
    { number: 3, person: 'Simem', action: 'licking', object: 'popsicles', },
    { number: 4, person: 'James Bond', action: 'running', object: 'flamingos', },
    { number: 5, person: 'Triplets', action: 'drinking', object: 'milk', },
    { number: 6, person: 'Volk', action: 'howling', object: 'golden toilet paper', },
    { number: 7, person: 'Simem', action: 'licking', object: 'popsicles', },
    { number: 8, person: 'James Bond', action: 'running', object: 'flamingos', },
    { number: 9, person: 'Triplets', action: 'drinking', object: 'milk', },
    { number: 10, person: 'Volk', action: 'howling', object: 'golden toilet paper', },
    { number: 11, person: 'Simem', action: 'licking', object: 'popsicles', },
    { number: 12, person: 'James Bond', action: 'running', object: 'flamingos', },
    { number: 13, person: 'Triplets', action: 'drinking', object: 'milk', },
    { number: 14, person: 'Volk', action: 'howling', object: 'golden toilet paper', },
    { number: 15, person: 'Simem', action: 'licking', object: 'popsicles', },
    { number: 16, person: 'James Bond', action: 'running', object: 'flamingos', },
    { number: 17, person: 'Triplets', action: 'drinking', object: 'milk', },
    { number: 18, person: 'Volk', action: 'howling', object: 'golden toilet paper', },
    { number: 19, person: 'Simem', action: 'licking', object: 'popsicles', },
  ]);
  const dispatch = useDispatch()
  const { accessToken } = useSelector((state: any) => state.auth)

  return (
    <View className="rounded h-full flex flex-1 flex-col justify-start">
      <TableHeader />
      <View className="bg-white">

        {/* <Button onPress={() => dispatch(fetchPao({ accessToken }))}>fetchPao</Button>
        <Button onPress={() => dispatch(putPaoList({ list: sets, accessToken }))}>putPaoList (upload a whole pao list)</Button>
        <Button>Input: push new doc</Button>
        <Button>Input: updatePaoDocument</Button>
        <Button>deletePaoDoc</Button> */}

        <RenderList />
      </View>
    </View>
  )
}

const CompensatingForTabCovering = styled.View`
  height: 200px;
  width: 20px;
`;

export default PaotableScreen
