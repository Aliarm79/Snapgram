import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutrAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";

const Topbar = () => {
  const { user, setIsAuthenticated } = useUserContext();
  const navigate = useNavigate();
  const { mutate: signOut, isSuccess: isloggout } = useSignOutrAccount();
  useEffect(() => {
    if (isloggout) navigate("/sign-in");
    setIsAuthenticated(false);
  });
  return (
    <section className="topbar">
      <div className="flex py-5 px-4 justify-between items-center">
        <Link to={"/"}>
          <img src="/assets/images/logo.svg" alt="logo" width={150} />{" "}
        </Link>
        <div className="flex gap-4 items-center">
          <Link to={`/profile/${user.id}`}>
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              className="w-8 rounded-full"
            />
          </Link>
          <Button
            variant={"ghost"}
            className="shad-button_ghost "
            onClick={() => {
              signOut();
            }}
          >
            <img src="/assets/icons/logout.svg" alt="logout" width={27.5} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
