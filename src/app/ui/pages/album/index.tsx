import React, { useEffect } from "react";
import { Else, If, Then } from "react-if";
import { Link } from "react-router-dom";
import { Photo } from "../../../../entities/Photo";
import { Loading } from "../../components/Loading";
import { PageTitle } from "../../components/PageTitle";
import { Wrapper } from "../../components/Wrapper";
import AlbumController, { useAlbumContext } from "../../controller/album";
import { ReactComponent as StartIcon } from "../../assets/svg/star.svg";
import { ReactComponent as NotesIcon } from "../../assets/svg/notes.svg";
const AlbumDetails: React.FC = () => {
  const { albumDetail, userDetail } = useAlbumContext().state;
  return (
    <div className="w-full flex justify-between">
      <h1 className="capitalize text-lg font-semibold tracking-wider">
        {albumDetail?.title}
      </h1>
      <div className="flex flex-col space-y-2">
        <span>
          Authors :{" "}
          <Link
            className="text-gray-200 font-semibold hover:text-white"
            to={`/users/${userDetail?.id}`}
          >
            {userDetail?.name}
          </Link>
        </span>
        <span>
          Email :{" "}
          <a href={`mailto:${userDetail?.email}`}>{userDetail?.email}</a>
        </span>
      </div>
    </div>
  );
};
const RenderAlbumDetail: React.FC = () => {
  const { handleSetFavoritePhoto, state, handleChangeInput, handleAddComment } =
    useAlbumContext();
  const { photoDataByAlbumId } = state;
  return (
    <div className="grid grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-8">
      {photoDataByAlbumId.map((item: Photo, idx) => {
        return (
          <div
           
            className="w-full bg-sweetblack hover:bg-slowblack duration-500 transition-all rounded p-3 md:p-4 flex flex-col space-y-4"
            key={idx}
          >
            <div className="w-full relative">
              <img
                className="w-full rounded-md filter"
                src={item.url}
                alt={item.id + "-photo"}
              />
              <div
                title={item.isFavorite ? "Favorite" : "Add to Favorite"}
                onClick={() => handleSetFavoritePhoto(item, idx)}
                className={`absolute top-2 cursor-pointer right-2 w-6 ${
                  item.isFavorite ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                <StartIcon />
              </div>
            </div>

            <If condition={!item.isShowEdit}>
              <Then>
                {/* <button > */}

                <div className="flex w-full items-center border border-gray-500 rounded">
                  <div className="flex-1">
                    <input
                      className="bg-black w-full focus:ring-0 outline-none focus:outline-none border-none"
                      defaultValue={item.comment ?? ""}
                      onChange={(e) => handleChangeInput(e.target.value, idx)}
                      type="text"
                      placeholder="Note"
                    />
                  </div>

                  <div
                    onClick={() => handleAddComment(item, idx)}
                    className=" px-2 h-full flex items-center text-white cursor-pointer"
                  >
                    <div className="w-4">
                      <NotesIcon />
                    </div>
                  </div>
                </div>
              </Then>
              <Else>
                <p className="flex-1 font-semibold">{item.comment}</p>
              </Else>
            </If>
          </div>
        );
      })}
    </div>
  );
};

const WrapperMain: React.FC = () => {
  const { getData, state } = useAlbumContext();
  const { isLoading } = state;
  useEffect(() => {
    getData();
  }, []);

  return (
    <Wrapper>
      <PageTitle title="Album Details" />
      <If condition={isLoading}>
        <Then>
          <Loading />
        </Then>
        <Else>
          <div className="flex flex-col space-y-6">
            <AlbumDetails />
            <RenderAlbumDetail />
          </div>
        </Else>
      </If>
    </Wrapper>
  );
};

const Album = () => {
  return (
    <AlbumController.Provider>
      <WrapperMain />
    </AlbumController.Provider>
  );
};

export default Album;
