import {PaoTheme} from '../styles/theming'

export const fabProperties = {
  mainBtn: {
    menuOpen: {
      icon: { cards: 'cards-playing-outline' }
    },
    menu: {
      icon: { menu: 'menu' }
    },
    edit: {
      icon: { pencil: 'square-edit-outline' }
    },
    flashcardChangingSettings: {
      icon: { settings: 'content-save' }
    }
  },

  settingOptions: {
    // color: '#61FF5B',
    icon: { settings: 'settings' },
    mesg: 'settings'
  },

  accountSettings: {
    // color: '#61FF5B',
    icon: { accountSettings: 'account' },
    mesg: 'account settings'
  },

  goToFlashcards: {
    // color: '#61FF5B',
    icon: { card: 'card-text-outline' },
    mesg: 'study'
  },
  goToPaoList: {
    // color: '#61FF5B',
    icon: { list: 'format-list-numbered' },
    mesg: 'pao list'
  },


  hint: {
    // color: '#A96DFF',
    icon: { letterH: 'alpha-h' },
    mesg: 'show hint messagees',
    mesgOpposite: 'hide hint messagees'
  },

  listMode: {
    // color: '#A96DFF',
    pagination: {
      icon: {
        book: 'book-open-page-variant'
      },
      mesg: 'pagination mode',
    },
    wholeList: {
      icon: {
        list: 'format-list-numbered'
      },
      mesg: 'scrollable list mode coming soon!',
    },
  },


  editMode: {
    color: PaoTheme.colors.accent,
    icon: {
      pencil: 'square-edit-outline'
    },
    mesg: 'edit list'
  },


  arrangement: {
    mainBtn: {
      color: '#FF4EB4',
      icon: { arrangement: 'sort-variant' },
      mesg: 'arrangment options coming soon!'
    },
    color: 'pink',
    ascend: {
      icon: { ascend: 'sort-ascending' },
      mesg: 'accending'
    },
    descend: {
      icon: { descending: 'sort-descending' },
      mesg: 'deccending'
    },
    scrambledMode: {
      icon: { shuffle: 'shuffle-variant' },
      mesg: 'shuffleMode'
    }
  },

}

export enum enumFabAction {
  sharedFabActions = 'sharedFabActions',
  paoTableFabActions = 'paoTableFabActions',
  flashcardFabActions = 'flashcardFabActions'
}

export enum fabModeOptions {
  standby,
  menuOpen,
  editing,
  flashcardChangingSettings
}


export enum fabActionOptions {
  goToFlashcards,
  goToPaoList,
  pagination,
  editMode,
  flashcardModeAscending,
  flashcardModedDescending,
  flashcardModedScrambled,
}

export const fabOpt = {
  standby: { mode: fabModeOptions.standby, icon: fabProperties.mainBtn.menu.icon.menu, color: '#768AED' },
  menuOpen: { mode: fabModeOptions.menuOpen, icon: fabProperties.mainBtn.menuOpen.icon.cards, color: PaoTheme.colors.primary },
  editMode: { mode: fabModeOptions.editing, icon: fabProperties.mainBtn.edit.icon.pencil, color: fabProperties.editMode.color },
  flashcardChangingSettings: { mode: fabModeOptions.menuOpen, icon: fabProperties.mainBtn.flashcardChangingSettings.icon.settings, color: fabProperties.editMode.color }
}