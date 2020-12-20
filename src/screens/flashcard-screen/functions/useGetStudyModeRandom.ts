import { useSelector } from "react-redux"
import { RootReducerT } from "../../../store"

const useGetStudyModeRandom = () => {
  const studyRandomMode = useSelector((state: RootReducerT) => state.studyRandomMode)
  const getPaoItemRandomMode = (name, index) => studyRandomMode[name][index]?.item
  const getNumberRandomMode = (name, index) => {
    let num = studyRandomMode[name][index]?.number.toString()
    if (!num) return
    if (num.length === 1) num = `0${num}`
    return num
  }
  return { getPaoItemRandomMode, getNumberRandomMode }
}

export default useGetStudyModeRandom
