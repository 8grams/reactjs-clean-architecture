import React from "react";
import { UserPresenter } from "../../../data/Presenters/UserPresenter";
import { container } from "tsyringe";
import { Main } from "../../../entities/Main";
import { AlbumPresenter } from "../../../data/Presenters/AlbumPresenter";
import { Album } from "../../../entities/Album";
import { User } from "../../../entities/User";
import debounce from "lodash/debounce";

interface IState {
  isLoading: boolean;
  mainData: Main[];
  user: User[];
  albums: Album[];
  search: string;
  userId: number;
}

interface InitialState {
  state: IState;
  getData: Function;
  handleSelectUser: Function;
  handleChangeSearch: Function;
}

const initialState = {
  state: {
    isLoading: true,
    mainData: [],
    user: [],
    albums: [],
    search: "",
    userId: 0,
  },
  getData: () => {},
  handleSelectUser: () => {},
  handleChangeSearch: () => {},
};
const Context = React.createContext<InitialState>(initialState);
const { Provider: MainProvider } = Context;

const Provider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<IState>({
    isLoading: true,
    mainData: [],
    user: [],
    albums: [],
    search: "",
    userId: 0,
  });
  const albumPresenter = container.resolve(AlbumPresenter);
  const userPresenter = container.resolve(UserPresenter);

  const getData = async (): Promise<any> => {
    setState((prevstate) => ({
      ...prevstate,
      isLoading: true,
    }));
    try {
      const allAlbums = await albumPresenter.getAllAlbumPresenter();
      const allusers = await userPresenter.getAllUsersPresenter();

      const mainData = allAlbums.map((item: Album) => ({
        album: item,
        user: allusers.find((usr: User) => usr.id === item.userId) ?? null,
      }));

      setState((prevstate) => ({
        ...prevstate,
        mainData,
        user: allusers,
        albums: allAlbums,
        isLoading: false,
      }));
      return mainData;
    } catch (error) {
      console.log("error getAllUsersPresenter:", error);
      setState((prevstate) => ({
        ...prevstate,
        isLoading: false,
      }));
    }
  };

  const handleSelectUser = (id: number) => {
    setState((prevstate) => ({
      ...prevstate,
      userId: Number(id),
    }));
  };

  const handleChangeSearch = debounce(async (value: string) => {
    setState((prevstate) => ({
      ...prevstate,
      search: value,
    }));
    const data = await getData();
    const mainData = data.filter(
      (it: Main) => it.album.title.toLowerCase().indexOf(value) !== -1
    );
    setState((prevstate) => ({
      ...prevstate,
      mainData,
    }));
  }, 500);

  return (
    <MainProvider
      value={{
        state,
        getData,
        handleSelectUser,
        handleChangeSearch,
      }}
    >
      {children}
    </MainProvider>
  );
};

export const useMainContext = () => React.useContext(Context);
// eslint-disable-next-line
export default {
  useMainContext,
  Provider,
};
