import React from "react";
import { UserPresenter } from "../../../data/Presenters/UserPresenter";
import { container } from "tsyringe";
import { AlbumPresenter } from "../../../data/Presenters/AlbumPresenter";
import { Album } from "../../../entities/Album";
import { User } from "../../../entities/User";
import { useParams } from "react-router";
import { PhotoPresenter } from "../../../data/Presenters/PhotoPresenter";
import { Photo } from "../../../entities/Photo";
import {
  getPhotoFromLocal,
  setPhotoToLocal,
  setCommentToLocal,
  getCommentFromLocal,
} from "../../../app/misc/Storage";

interface IState {
  isLoading: boolean;
  albumDetail: Album | null;
  userDetail: User | null;
  photoDataByAlbumId: Photo[];
}

interface InitialState {
  state: IState;
  getData: Function;
  handleSetFavoritePhoto: Function;
  handleChangeInput: Function;
  handleAddComment: Function;
}

const initialState = {
  state: {
    isLoading: true,
    albumDetail: null,
    userDetail: null,
    photoDataByAlbumId: [],
  },
  getData: () => {},
  handleSetFavoritePhoto: () => {},
  handleChangeInput: () => {},
  handleAddComment: () => {},
};
const Context = React.createContext<InitialState>(initialState);
const { Provider: AlbumProvider } = Context;

const Provider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<IState>({
    isLoading: true,
    albumDetail: null,
    userDetail: null,
    photoDataByAlbumId: [],
  });

  const setLoading = (value: boolean) => {
    setState((prevstate) => ({
      ...prevstate,
      isLoading: value,
    }));
  };

  const { id }: any = useParams();

  const albumPresenter = container.resolve(AlbumPresenter);
  const userPresenter = container.resolve(UserPresenter);
  const photoPresenter = container.resolve(PhotoPresenter);

  const getData = async () => {
    setLoading(true);
    try {
      const albumDetail = await albumPresenter.getAlbumByIdPresenter(id);
      const userDetail = await userPresenter.getUserByIdPresenter(
        albumDetail?.userId
      );
      const photosData = await photoPresenter.getAllPhotoPresenter();
      const photoDataByAlbumId = photosData.filter(
        (pht: Photo) => pht.albumId === albumDetail?.id
      );

      const favoritePhoto = getPhotoFromLocal();
      const commentDataFromLocal = getCommentFromLocal();
      const photosDataWithFavoriteCheck = photoDataByAlbumId.map(
        (item: Photo) => ({
          ...item,
          isFavorite: favoritePhoto.some((pht: number) => pht === item.id),
          comment:
            commentDataFromLocal.find((pht: any) => pht.photoId === item.id)
              ?.comment || null,
          isShowEdit: commentDataFromLocal.some(
            (pht: any) => pht.photoId === item.id
          ),
        })
      );

      setState((prevstate) => ({
        ...prevstate,
        isLoading: false,
        albumDetail,
        userDetail,
        photoDataByAlbumId: photosDataWithFavoriteCheck,
      }));
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSetFavoritePhoto = (photo: Photo, idx: number) => {
      const photos = [...state.photoDataByAlbumId];
      photos[idx].isFavorite = !photo.isFavorite;
      setState((prevstate) => ({
        ...prevstate,
        photoDataByAlbumId: photos,
      }));
      setPhotoToLocal(photo.id, photo.isFavorite);
  };

  const handleAddComment = (photo: Photo, index: number) => {
    const photos = [...state.photoDataByAlbumId];
    photos[index].isShowEdit = true;
    setState((prevstate) => ({
      ...prevstate,
      photoDataByAlbumId: photos,
    }));
    setCommentToLocal({ photoId: photo.id, value: photo.comment! });
  };

  const handleChangeInput = (value: string, index: number) => {
    const photos = [...state.photoDataByAlbumId];
    photos[index].comment = value;
    setState((prevstate) => ({
      ...prevstate,
      photoDataByAlbumId: photos,
    }));
  };

  return (
    <AlbumProvider
      value={{
        state,
        getData,
        handleSetFavoritePhoto,
        handleChangeInput,
        handleAddComment,
      }}
    >
      {children}
    </AlbumProvider>
  );
};

export const useAlbumContext = () => React.useContext(Context);
// eslint-disable-next-line
export default {
  useAlbumContext,
  Provider,
};
