
interface FAV {
  currentMainFab: any
  setCurrentMainFab: (item: any) => void
}

interface Returned {
  handleOnPressFabActions: (item: any) => void
  handleOnPressMainFab: () => void
  paoTableFabActions: any
  flashcardFabActions: any
}

const useFabFunctions = ({
  // currentMainFab,
  // setCurrentMainFab,
}: FAV): Returned => {

  

  // useEffect(() => { //! here we are just setting fab properties. Move this it
  //   switch (fabAction) {

  //     case tabScreens.Paotable:
  //       // setFabAction({})
  //       // ([...paoTableFabActions, ...sharedFabActions])
  //       break;
  //     case tabScreens.Flashcards:
  //       // ([...flashcardFabActions, ...sharedFabActions])
  //       // setFabAction({})
  //       break;
  //     case tabScreens.Settings:
  //       break;
  //     case tabScreens.FavList:
  //       break;

  //     default:
  //       break;
  //   }
  // }, [fabAction])


  
 


  // //rgb


  return {
  }

}

export default useFabFunctions