export interface authState {
  username: number | undefined,
  accessToken: string | undefined,
  refreshToken: string | undefined,
}

export interface AuthReducer {
  type: string
  payload: {
    username: string | undefined
    accessToken: string | undefined
    refreshToken: string | undefined
  }
}
