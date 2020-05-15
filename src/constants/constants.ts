export enum comps {
  enterOptions,
  signup,
  signin
}

export enum inputErrMessages {
  existsMsg = 'Account already exists',
  passwordMsg = 'password must have...',
  usernameMsg = 'username must be ...',
  invalidSigninMsg = "Invalid username or password",
  emptyFields = 'empty fields'
}

export enum fabActions {
  random = 'random',
  accending = 'accending',
  deccending = 'deccending',
}

export enum swipeDirection {
  left,
  right,
  up,
  down
}

export enum tabScreens {
  Paotable = 'Paotable',
  Flashcards = 'Flashcards',
  // FavList ='FavList'
}

export enum listMode {
  pagination,
  wholeList
}



// {
//   style: { backgroundColor: fabProperties.arrangement.color },
//   icon: fabProperties.arrangement.accending.icon.triangleRightSideUp,
//   label: fabProperties.arrangement.accending.mesg,
//   onPress: () => setFabAction({ ...fabAction, flashcardMode: fabActions.accending })
// },
// {
//   style: { backgroundColor: fabProperties.arrangement.color },
//   icon: fabProperties.arrangement.deccending.icon.triangleUpSideDown,
//   label: fabProperties.arrangement.deccending.mesg,
//   onPress: () => setFabAction({ ...fabAction, flashcardMode: fabActions.deccending })
// },
// {
//   style: { backgroundColor: fabProperties.arrangement.color },
//   icon: fabProperties.arrangement.scrambledMode.icon.shuffle,
//   label: fabProperties.arrangement.scrambledMode.mesg,
//   onPress: () => setFabAction({ ...fabAction, flashcardMode: fabActions.random })
// },

