import React from "react";
import { UserPresenter } from "../../../../data/presenters/UserPresenter";
import { container } from "tsyringe";
import { User } from "../../../../entities/User";
import { AlbumPresenter } from "../../../../data/presenters/AlbumPresenter";
import { Album } from "../../../../entities/Album";

interface IState {
  isLoading: boolean;
  userDetail: User | null;
  albumData: Album[]
}

interface InitialState {
  state: IState;
  getUserDetailById: Function;
}

const initialState = {
  state: {
    isLoading: true,
    userDetail: null,
    albumData: []
  },
  getUserDetailById: () => {},
};
const Context = React.createContext<InitialState>(initialState);
const { Provider: UserProvider } = Context;

const Provider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<IState>({
    isLoading: true,
    userDetail: null,
    albumData: []
  });
  const userPresenter = container.resolve(UserPresenter);
  const albumPresenter = container.resolve(AlbumPresenter);


  const setLoading = (value: boolean) => {
    setState((prevstate) => ({
      ...prevstate,
      isLoading: value,
    }));
  };

  const getUserDetailById = async (userId: number) => {
    setLoading(true);
    try {
      const userDetail = await userPresenter.getUserByIdPresenter(userId);
      const albumData = await albumPresenter.getAllAlbumPresenter();
      const albumDataFIlterByUserId = albumData.filter((item:Album) => item.userId === userDetail?.id)
      setState((prevstate) => ({
        ...prevstate,
        userDetail,
        albumData:albumDataFIlterByUserId,
        isLoading: false,
      }));
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <UserProvider value={{ state, getUserDetailById }}>{children}</UserProvider>
  );
};

export const useUserContext = () => React.useContext(Context);
// eslint-disable-next-line
export default {
  useUserContext,
  Provider,
};
