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
    number: number | null
    person: string | null
    action: string | null
    object: string | null
  },
  map: any
}

export interface PutPaoList {
  [key: number]: {
    person: string
    action: string
    object: string
  }
}

export interface PaoAction {
  number: number
  person: string,
  action: string,
  object: string,
}
