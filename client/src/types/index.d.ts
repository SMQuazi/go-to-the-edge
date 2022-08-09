export interface iStateAction {
  type: string;
  payload?: IState;
}

export interface iUserState {
  id: number | undefined
  username: string | undefined,
  displayName: string | undefined,
}