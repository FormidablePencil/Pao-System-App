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

export interface PaoState {
  [key: number]: {
    number: number
    person: string,
    action: string,
    object: string,
  }
}

export interface PutPaoList {
  [key: number]: {
    person: string
    action: string
    object: string
  }
}