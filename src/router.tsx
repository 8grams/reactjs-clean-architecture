import { Switch, BrowserRouter, Route } from "react-router-dom";
import Home from "./app/ui/pages/main";
import AlbumDetails from "./app/ui/pages/album";
import Users from "./app/ui/pages/users";
import Favorites from "./app/ui/pages/favorites";

export const routes = [
  {
    name: "Home",
    component: Home,
    path: "/",
    exact: true,
  },
  {
    name: "AlbumDetails",
    component: AlbumDetails,
    path: "/album/:id",
    exact: false,
  },
  {
    name: "Users",
    component: Users,
    path: "/users/:usersId",
    exact: false,
  },
  {
    name: "Favorites",
    component: Favorites,
    path: "/favorites",
    exact: false,
  },
];

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="w-full h-screen flex flex-col text-white">
        <div className="flex-1 container p-8 w-full mx-auto">
          <Switch>
            {routes.map((item, idx) => {
              return (
                <Route
                  key={idx}
                  exact={item.exact}
                  path={item.path}
                  component={item.component}
                />
              );
            })}
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};
export default Routes;
