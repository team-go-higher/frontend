export interface IUserInfoJson {
  accessToken: string;
  role: string;
}

interface IUpdateUserInfoProps {
  role?: string;
  accessToken?: string;
}

export const getUserInfo = (): IUserInfoJson => {
  const userInfo: string = localStorage.getItem('userInfo') as string;
  const userInfoJson: IUserInfoJson = JSON.parse(userInfo);

  return userInfoJson;
};

export const updateUserInfo = ({ role, accessToken }: IUpdateUserInfoProps) => {
  const userInfo: IUserInfoJson = getUserInfo();

  const newUserInfo: IUserInfoJson = {
    accessToken: accessToken || userInfo.accessToken,
    role: role || userInfo.role,
  };

  localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
};
