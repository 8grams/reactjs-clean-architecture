import React, { useEffect } from "react";
import { Else, If, Then } from "react-if";
import { Link, useHistory } from "react-router-dom";
import { Main as MainEntity } from "../../../entities/Main";
import { Loading } from "../../components/Loading";
import { PageTitle } from "../../components/PageTitle";
import { Wrapper } from "../../components/Wrapper";
import MainController, { useMainContext } from "../../controller/main";
import { ReactComponent as StartIcon } from "../../assets/svg/star.svg";
import { ColorGenerator } from "../../../app/misc/Color";
import { User } from "../../../entities/User";

const SearchFilterComponent = () => {
  const { handleSelectUser, state, handleChangeSearch } = useMainContext();
  const { user, userId, search } = state;
  return (
    <div className="w-full xl:w-full flex flex-col space-y-4 xl:flex-row xl:justify-between">
      <div className="w-2/3 lg:w-1/3">
        <input
          defaultValue={search}
          onChange={(e) => handleChangeSearch(e.target.value)}
          type="text"
          placeholder="Search Album"
          className="bg-black rounded-xl w-full"
        />
      </div>
      <div className="w-2/3 lg:w-1/3 space-x-5 flex items-center">
        <label htmlFor="filter" className="whitespace-nowrap">
          Filter by User
        </label>
        <select
          onChange={(e) => handleSelectUser(e.target.value)}
          name="filter"
          id="filter"
          className="w-full rounded-xl bg-black"
          value={userId.toString()}
        >
          <option disabled value="0">
            Select User
          </option>
          {user.map((usr: User, idx) => (
            <option key={idx} value={usr.id}>
              {usr.name}
            </option>
          ))}
        </select>
        <button
          onClick={() => handleSelectUser(0)}
          disabled={userId === 0}
          className={`text-xs font-semibold rounded-xl px-2 py-1 ${
            userId === 0 ? "bg-gray-800 cursor-not-allowed" : "bg-black "
          }`}
        >
          Reset
        </button>
      </div>
      <div className="w-full flex justify-end xl:hidden">
        <Link to={`/favorites`}>Favorite</Link>
      </div>
    </div>
  );
};

const AlbumCard: React.FC<{ idx: number; item: MainEntity }> = ({ idx, item }) => {
  const history = useHistory();
  const handleSelectAlbum = (id: number) => {
    history.push(`/album/${id}`);
  };
  return (
    <div
      style={{ backgroundColor: ColorGenerator() }}
      className="relative w-full h-60 rounded p-3 md:p-4 flex flex-col space-y-2"
      key={idx}
    >
      <div className="bg-black top-0 left-0 bg-opacity-30 w-full h-full absolute"></div>
      <div
        onClick={() => handleSelectAlbum(item.album.id)}
        className=" cursor-pointer -top-2 transition-all duration-300 left-0 hover:rotate-0 rotate-12 transform w-full h-full absolute"
      >
        <div className="absolute rounded-md right-4 bottom-14 w-24 h-24 bg-gray-400">
          <img
            className="w-full rounded-md"
            src={`https://picsum.photos/200?random=${idx + 1}`}
            alt={`photos-${idx}`}
          />
        </div>
      </div>
      <p className="truncate-2 leading-5 text-lg z-10 xl:text-xl font-semibold capitalize hover:text-gray-100 transition-all duration-300">
        <Link to={`/album/${item.album.id}`}>{item.album.title}</Link>
      </p>

      <p className="absolute font-semibold z-10 bottom-0 left-0 p-4 text-xs xl:text-sm text-gray-200 hover:text-white transition-all duration-300 ">
        By : <Link to={`/users/${item.album.userId}`}>{item.user?.name}</Link>
      </p>
    </div>
  );
};

const RenderAlbumCard = () => {
  const { mainData, userId } = useMainContext().state;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-8">
      {userId > 0
        ? mainData
            .filter((item: MainEntity) => item.user?.id === userId)
            .map((item: MainEntity, idx) => {
              return <AlbumCard key={idx} idx={idx} item={item} />;
            })
        : mainData.map((item: MainEntity, idx) => {
            return <AlbumCard key={idx} idx={idx} item={item} />;
          })}
    </div>
  );
};

const WrapperMain: React.FC = () => {
  const {
    getData,
    state: { isLoading },
  } = useMainContext();

  useEffect(() => {
    getData();
  }, []);

  return (
    <Wrapper>
      <PageTitle title="Album's Collection" />
      <SearchFilterComponent />
      <If condition={isLoading}>
        <Then>
          <Loading />
        </Then>
        <Else>
          <RenderAlbumCard />
        </Else>
      </If>
    </Wrapper>
  );
};

const FavoriteFloating = () => {
  return (
    <Link
      title="Go to favorite"
      className="hidden xl:block fixed bottom-10 right-10 h-10 w-10 text-yellow-400"
      to={"favorites"}
    >
      <StartIcon />
    </Link>
  );
};

const Main: React.FC = () => {
  return (
    <MainController.Provider>
      <WrapperMain />
      <FavoriteFloating />
    </MainController.Provider>
  );
};

export default Main;
