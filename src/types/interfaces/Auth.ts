export interface IPosition {
  id: number;
  position: string;
}

export interface IUserInfo {
  email: string;
  desiredPositions: IPosition[];
}
