import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutrAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";

const LeftSidebar = () => {
  const { user, setIsAuthenticated } = useUserContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { mutate: signOut, isSuccess: isloggout } = useSignOutrAccount();
  useEffect(() => {
    if (isloggout) navigate("/sign-in");
    setIsAuthenticated(false);
  });
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to={"/"}>
          <img src="/assets/images/logo.svg" alt="logo" width={170} />{" "}
        </Link>
        <div className="flex gap-3 items-center">
          <Link to={`/profile/${user.id}`}>
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              className="w-14  rounded-full"
            />
          </Link>
          <div className="flex flex-col ">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </div>
        <ul className="flex flex-col 2xl:gap-6 gap-4">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.route;
            return (
              <ul
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500 "
                }`}
              >
                <Link to={link.route} className="flex gap-4 p-4 items-center">
                  <img
                    src={link.imgURL}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                    alt={link.label}
                  />
                  {link.label}
                </Link>
              </ul>
            );
          })}
        </ul>
      </div>
      <Button
        variant={"ghost"}
        className="shad-button_ghost "
        onClick={() => {
          signOut();
        }}
      >
        <img src="/assets/icons/logout.svg" alt="logout" width={27.5} />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
