import React, { useEffect } from "react";
import { If, Then, Else } from "react-if";
import { Photo } from "../../../../entities/Photo";
import { Loading } from "../../components/Loading";
import { PageTitle } from "../../components/PageTitle";
import { Wrapper } from "../../components/Wrapper";
import FavoriteController, {
  useFavoriteContext,
  AlbumAndPhoto,
} from "../../controller/favorite";
import { ReactComponent as TrashIcon } from "../../assets/svg/trash.svg";
import { Empty } from "../../components/Empty";

const AlbumPhotoComponent: React.FC = () => {
  const { removePhotoFromFavorite, state } = useFavoriteContext();
  const { albumDetailWithFavoritePhotos: album } = state;
  return (
    <div className="w-full flex flex-col space-y-10">
      {album.map((item: AlbumAndPhoto, index) => {
        return (
          <div
            className=" flex flex-col w-full border border-slowblack rounded-lg"
            key={index}
          >
            <p className="text-xl capitalize font-semibold bg-slowblack p-5 rounded-t-lg">
              {item.albumData.title}
            </p>
            <div className="flex flex-row flex-nowrap overflow-x-auto space-x-6 px-6">
              {item.photos.map((pht: Photo, idx) => {
                return (
                  <div style={{ flex: "0 0 auto" }} className="py-6" key={idx}>
                    <div className="w-60 relative">
                      <img
                        className="w-full inline-block rounded"
                        src={pht.url}
                        alt=""
                      />
                      <div
                        onClick={() =>
                          removePhotoFromFavorite(index, idx, pht.id)
                        }
                        className="w-10 flex hover:bg-sweetblack duration-500 transition-all hover:text-red-500 items-center rounded-bl-2xl justify-center cursor-pointer h-10 bg-lowestblack absolute top-0 right-0"
                      >
                        <div className="w-4">
                          <TrashIcon />
                        </div>
                      </div>
                      <div className="bg-lowestblack capitalize absolute bottom-4 px-4 py-2 text-white truncate tracking-wider opacity-80 text-sm font-semibold w-full">
                        {pht.title}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
const WrapperFavorite = () => {
  const {
    getData,
    state: { isLoading, albumDetailWithFavoritePhotos },
  } = useFavoriteContext();

  useEffect(() => {
    getData();
  }, []);
  return (
    <Wrapper>
      <PageTitle title="Favorite's Collection" />
      <If condition={isLoading}>
        <Then>
          <Loading />
        </Then>
        <Else>
          <If condition={!albumDetailWithFavoritePhotos.length}>
            <Then>
              <Empty />
            </Then>
            <Else>
              <AlbumPhotoComponent />
            </Else>
          </If>
        </Else>
      </If>
    </Wrapper>
  );
};
const Favorites = () => {
  return (
    <FavoriteController.Provider>
      <WrapperFavorite />
    </FavoriteController.Provider>
  );
};

export default Favorites;
