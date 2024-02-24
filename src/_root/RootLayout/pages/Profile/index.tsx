import { useGetProfile } from "@/lib/react-query/queriesAndMutations";
import Loader from "@/components/shared/Loader";
import { Link, useParams } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
const Profile = () => {
  const { id } = useParams();

  const { data: user, isPending: userLoading } = useGetProfile(id!);
  const { user: currentUser } = useUserContext();

  return (
    <div className="flex flex-1   ">
      <div className="home-container ">
        {userLoading || !user ? (
          <Loader />
        ) : (
          <div className="flex justify-start  items-center gap-6 w-full max-w-5xl">
            <img
              src={user?.imageUrl}
              alt="user"
              className="h-28 lg:h-36  w-28 lg:w-36 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <h2 className="h3-bold md:h2-bold ">{user.name}</h2>
              <h3 className="base-regular text-light-3">@{user.username}</h3>
              <p className="mt-3">{user.bio}</p>
            </div>
            {user.$id === currentUser.id && (
              <div className="bg-[#101012] py-3 px-6 ml-auto flex gap-2 rounded-lg">
                <img
                  src="/assets/icons/edit.svg  "
                  className="fill-current"
                  width={20}
                  alt="edit"
                />
                <Link to={`/update-profile/${user.$id}`}>Edit Profile</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
