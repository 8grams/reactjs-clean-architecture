import React, { useEffect } from "react";
import { If, Then, Else } from "react-if";
import { useHistory, useParams } from "react-router";
import { Album } from "../../../../entities/Album";
import UserController, { useUserContext } from "../../controller/user";
import UserPng from "../../assets/png/Profile.png";
import { ColorGenerator } from "../../../misc/Color";
import { Link } from "react-router-dom";
import { Loading } from "../../components/Loading";
const UserDetailComponent = () => {
  const { userDetail: user } = useUserContext().state;

  return (
    <div className="w-full p-8 flex flex-col lg:flex-row space-x-12 items-center">
      <div className="flex flex-col space-y-3 items-center">
        <img className="w-52" src={UserPng} alt="" />
        <div className="flex flex-col items-center">
          <p className="font-semibold text-2xl">{user?.name}</p>
          <p>@{user?.username}</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col space-y-2">
        <h1 className="text-2xl font-semibold hidden lg:block">About</h1>
        <div className="flex">
          <p className="w-32 font-semibold">Email :</p>
          <p className="flex-1">{user?.email}</p>
        </div>
        <div className="flex">
          <p className="w-32 font-semibold">Phone :</p>
          <p className="flex-1">{user?.phone}</p>
        </div>
        <div className="flex">
          <p className="w-32 font-semibold">Website :</p>
          <p className="flex-1">{user?.website}</p>
        </div>
        <div className="flex">
          <p className="w-32 font-semibold">Address :</p>
          <p className="flex-1">
            {user?.address.street}, {user?.address.suite} - {user?.address.city}{" "}
            {user?.address.zipcode}
          </p>
        </div>
        <div className="flex">
          <p className="w-32 font-semibold">Company :</p>
          <p className="flex-1">
            {user?.company.name}, {user?.company.catchPhrase} -{" "}
            {user?.company.bs}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

const AlbumCard: React.FC<{ item: Album }> = ({ item }) => {
  const history = useHistory();
  const handleSelectAlbum = (id: number) => {
    history.push(`/album/${id}`);
  };
  return (
    <div
      style={{ backgroundColor: ColorGenerator() }}
      className="relative w-full h-60 rounded p-3 md:p-4 flex flex-col space-y-2"
    >
      <div className="bg-black top-0 left-0 bg-opacity-30 w-full h-full absolute"></div>
      <div
        onClick={() => handleSelectAlbum(item.id)}
        className=" cursor-pointer -top-2 transition-all duration-300 left-0 hover:rotate-0 rotate-12 transform w-full h-full absolute"
      >
        <div className="absolute rounded-md right-4 bottom-14 w-24 h-24 bg-gray-400">
          <img
            className="w-full rounded-md"
            src={`https://picsum.photos/200?random=${item.id + 1}`}
            alt={`photo-${item.id}`}
          />
        </div>
      </div>
      <p className="truncate-2 leading-5 text-lg z-10 xl:text-xl font-semibold capitalize hover:text-gray-100 transition-all duration-300">
        <Link to={`/album/${item.id}`}>{item.title}</Link>
      </p>
    </div>
  );
};

const AlbumListComponent = () => {
  const { albumData: album } = useUserContext().state;

  return (
    <div className="w-full space-y-4">
      <h1 className="text-2xl font-semibold">Album's</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-8">
        {album.map((item: Album, idx: number) => {
          return <AlbumCard key={idx} item={item} />;
        })}
      </div>
    </div>
  );
};
const WrapperUserWithContext = () => {
  const { usersId }: any = useParams();
  const { getUserDetailById, state } = useUserContext();
  const { isLoading } = state;
  useEffect(() => {
    getUserDetailById(usersId);
  }, []);
  return (
    <If condition={isLoading}>
      <Then>
        <div className="w-full flex animate-pulse items-center space-x-12 mb-10">
          <div className="w-52 h-52 rounded-full bg-sweetblack" />
          <div className="flex-1 flex flex-col space-y-4">
            <div className="w-1/2 h-6 bg-sweetblack" />
            <div className="w-1/2 h-6 bg-sweetblack" />
            <div className="w-1/2 h-6 bg-sweetblack" />
          </div>
        </div>
        <Loading />
      </Then>
      <Else>
        <UserDetailComponent />
        <AlbumListComponent />
      </Else>
    </If>
  );
};
const Users = () => {
  return (
    <UserController.Provider>
      <WrapperUserWithContext />
    </UserController.Provider>
  );
};

export default Users;
