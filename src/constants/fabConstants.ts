
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
    }
  },


  listMode: {
    color: '#A96DFF',
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
    color: '#FFE542',
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

export enum fabModeOptions {
  standby,
  menuOpen,
  editing
}


export enum fabActionOptions {
  paginationMode,
  paotableEditMode,
  flashcardModeAscending,
  flashcardModedDescending,
  flashcardModedScrambled,
}
