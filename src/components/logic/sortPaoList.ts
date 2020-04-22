import { fabActions } from '../../constants/constants'
import shuffle from 'shuffle-array'

export const sortPaoList = ({ list, mode }: any) => {
  if (mode === fabActions.random) {
    return shuffle(list)
  } else if (mode === fabActions.accending) {
    return list
  } else if (mode === fabActions.deccending) {
    return list.reverse()
  }

  return []

}

export const mergePaoArrays = (firstArray: any, secondArray: any) => { //seperate component for cleanliness but change the name
  const firstArrayCut = firstArray.filter((document: any) => {
    if (document.number >= 0 && document.number <= 99) {
      return document
    }
  })
  const margedArr = secondArray.map((document: any, index: number) => {
    const docExists = firstArrayCut.filter((doc: any) => doc.number === document.number)[0]
    if (docExists) return docExists
    else return document
  })
  return margedArr
}

export default sortPaoList
