import React, { useState, useEffect, useContext, useRef } from "react";
import { Portal, Provider, FAB, useTheme } from "react-native-paper";
import {
  fabProperties as fabConsts,
  fabModeOptions,
  fabActionOptions,
  fabOpt,
  enumFabAction,
} from "../../../constants/fabConstants";
import { tabScreens } from "../../../constants/constants";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { PaoThemeType } from "../../../styles/theming";
import { TabNavContext } from "../../../routes/StackNavigator";
import { FlashcardSettingsTypes } from "../../../reducer/flashcardOptionsReducer";
import { arrangmentOpt } from "../../../reducer/flashcardOptionsReducer";
import usePrimaryControlledColor, {
  WhereToColor,
} from "../../../hooks/usePrimaryControlledColor";
import useOnPressFabsHandlers from "./useOnPressFabsHandlers";
import useFabActionVariousProperties, {
  navigationRef,
} from "./useFabActionVariousProperties";
import { RootReducerT } from "../../../store";
import OptsMenus from "./OptsMenus";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface FabOptTypes {
  mode: number;
  icon: string;
  color: string | null;
}

interface CurrentFabPropsInterface {
  mainFab: FabOptTypes;
  fabActionsVariousProperties: any;
}

const getWhatFabPropsKey = (currentScreen: tabScreens) => {
  if (currentScreen === tabScreens.Paotable)
    return enumFabAction.paoTableFabActions;
  else if (currentScreen === tabScreens.Flashcards)
    return enumFabAction.flashcardFabActions;
  else return "";
};

const FabActionBtn = ({
  currentScreen,
  setCurrentScreen,
  // currentScreensetModalOpen,
  setModalOpen,
  // editModeTrue,
  // setEditModeTrue,
}) => {
  const {
    showHints,
    setShowHints,
    showNavigationIcons,
    setShowNavigationIcons,
  } = useContext(TabNavContext);
  const dispatch = useDispatch();
  const theme: PaoThemeType = useTheme();
  const fabActionContentRef = useRef(null);
  const fabActionContentRef2 = useRef(null);
  // const [currentScreen, setCurrentScreen] = useState(navigationRef.current?.getCurrentRoute().name)
  const editModeTrue = useSelector(
    (state: RootReducerT) => state.fabProperties.config.editMode
  );
  const [whatFabProps, setWhatFabProps] = useState(() =>
    getWhatFabPropsKey(navigationRef.current?.getCurrentRoute().name)
  );
  const [currentFabProps, setCurrentFabProps] = useState({
    mainFab: fabOpt.standby,
  });
  // toggleEditMode

  useEffect(() => {
    setWhatFabProps(
      getWhatFabPropsKey(navigationRef.current?.getCurrentRoute().name)
    );
  }, [currentScreen]);

  // //~ settings for flashcard screen
  const [loading, setLoading] = useState(false);
  const [
    sliderValueautoPlayFlashcardsDuration,
    setSliderValueautoPlayFlashcardsDuration,
  ] = useState();
  const [
    flashcardSettings,
    setFlashcardSettings,
  ] = useState<FlashcardSettingsTypes>({
    flashcardItemDisplayedFront: [
      { number: true },
      { person: false },
      { action: true },
      { object: false },
    ],
    autoPlayFlashcards: { play: false, duration: 5 },
    flashcardOrder: arrangmentOpt.ascending,
  });

  // //* solution is to fire a function from parent to toggle fab visibility

  const {
    handleOnPressFabActions,
    handleOnPressGeneral,
  } = useOnPressFabsHandlers({
    loading,
    currentFabProps,
    fabConsts,
    setLoading,
    setFlashcardSettings,
    flashcardSettings,
    sliderValueautoPlayFlashcardsDuration,
    currentScreen,
    fabActionContentRef,
    fabActionContentRef2,
    setCurrentFabProps,
    setShowNavigationIcons,
  });

  const fabActionVariousProperties = useFabActionVariousProperties({
    setCurrentScreen,
    fabConsts,
    showHints,
    handleOnPressFabActions,
    handleOnPressGeneral,
  });

  const controlledColor = usePrimaryControlledColor(
    WhereToColor.primaryColor,
    theme.colors.primary
  );
  const mainFabBackgroundColor =
    currentFabProps.mainFab.mode === fabModeOptions.editing
      ? currentFabProps.mainFab.color
      : controlledColor;
  const bgColor = usePrimaryControlledColor(
    WhereToColor.goToUnfilledBtn,
    theme.colors.accent
  );

  return (
    <View style={styles.container}>
      {whatFabProps.length > 1 && (
        <>
          <Provider>
            <Portal>
              <FAB.Group
                fabStyle={{ backgroundColor: mainFabBackgroundColor }}
                style={{ top: 0 }}
                visible={true}
                color="white"
                open={currentFabProps.mainFab.mode === fabModeOptions.menuOpen}
                icon={currentFabProps.mainFab.icon}
                actions={[
                  ...fabActionVariousProperties[whatFabProps],
                  ...fabActionVariousProperties.sharedFabActions,
                ]}
                onStateChange={() => handleOnPressGeneral()}
                onPress={() => handleOnPressGeneral()}
                theme={{
                  colors: {
                    /* backdrop: 'transparent' */
                  },
                }}
                contentStyles={styles.contentStyles}
              >
                <OptsMenus
                  currentFabProps={currentFabProps}
                  currentScreen={currentScreen}
                  bgColor={bgColor}
                  fabActionContentRef={fabActionContentRef}
                  fabActionContentRef2={fabActionContentRef2}
                  sliderValueautoPlayFlashcardsDuration={
                    sliderValueautoPlayFlashcardsDuration
                  }
                  flashcardSettings={flashcardSettings}
                  setFlashcardSettings={setFlashcardSettings}
                  setLoading={setLoading}
                  setModalOpen={setModalOpen}
                  handleOnPressGeneral={handleOnPressGeneral}
                />
              </FAB.Group>
            </Portal>
          </Provider>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: "absolute", height: "100%", width: "100%" },
  contentStyles: {
    backgroundColor: Colors.purple900,
    borderRadius: 10,
    position: "absolute",
    top: 50,
    width: "90%",
    // height: '25%',
    // width: '50%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default FabActionBtn;
