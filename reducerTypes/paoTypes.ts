export interface PaoReducer {
  type: string
  payload: {
    index: string
    [key: string]: object | string
    person: {
      number: undefined,
      name: undefined,
    },
    action: {
      number: undefined,
      name: undefined,
    },
    object: {
      number: undefined,
      name: undefined,
    }
  }
}

export interface PaoState { //! wrong. should be a collection of docs in an array
  [key: string]: object;
  person: {
    number: number | undefined
    name: string | undefined
  }
  action: {
    number: number | undefined
    name: string | undefined
  },
  object: {
    number: number | undefined
    name: string | undefined
  }
}

export interface PutPaoList {
  list: {
    person: {
      number: number | undefined
      name: string | undefined
    }
    action: {
      number: number | undefined
      name: string | undefined
    },
    object: {
      number: number | undefined
      name: string | undefined
    }
  }
}