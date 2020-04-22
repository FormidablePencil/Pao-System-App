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
  dowm
}

export enum tabScreens {
  Paotable = 'Paotable',
  Flashcards ='Flashcards',
  Settings = 'Settings'
}

export enum listMode {
  pagination,
  wholeList
}