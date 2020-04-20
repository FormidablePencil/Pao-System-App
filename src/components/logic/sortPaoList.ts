import { flashcardModeOptions } from '../../constants/constants'
import shuffle from 'shuffle-array'

const sortPaoList = ({ list, mode }: any) => {
  if (mode === flashcardModeOptions.random) {
    return shuffle(list)
  } else if (mode === flashcardModeOptions.accending) {
    return list
  } else if (mode === flashcardModeOptions.deccending) {
    return list.reverse()
  }


}

export default sortPaoList
