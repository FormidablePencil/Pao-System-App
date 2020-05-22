import { useEffect } from "react"
import { useSelector } from "react-redux"

const useCheckAmountOfPaoFilled = ({setPaoDocumentsFilled}) => {
  const pao = useSelector((state: any) => state.pao)

  useEffect(() => {
    if (pao.length === 1) {
      if (pao[0].number) {
        setPaoDocumentsFilled(1)
        return
      } else {
        setPaoDocumentsFilled(0)
        return
      }
    } else {
      let paoFilledCount = 0
      pao.forEach(item => {
        let amount = 0
        if (item.person) amount++
        if (item.action) amount++
        if (item.object) amount++
        if (amount === 3) paoFilledCount++
      })
      setPaoDocumentsFilled(paoFilledCount)
    }
  }, [pao])
}

export default useCheckAmountOfPaoFilled
