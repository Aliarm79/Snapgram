export interface IContextType {
  user: IUser;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
}
export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
}

export interface INewUser {
  name: string;
  username: string;
  email: string;
  password: string;
}
export type INewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
};
