import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";
import Loader from "@/components/shared/Loader";
import UserPost from "@/components/forms/UserPost";
const UpdateProfile = () => {
  const { data: user, isPending: userLoading } = useGetCurrentUser();

  return (
    <div className="flex flex-1   ">
      <div className="home-container ">
        <div className="flex justify-start items-center gap-3 w-full max-w-5xl">
          <img src="/assets/icons/edit.svg" alt="add" width={36} />
          <h2 className="h3-bold md:h2-bold ">Edit Profile</h2>
        </div>
        {userLoading || !user ? <Loader /> : <UserPost user={user} />}
      </div>
    </div>
  );
};

export default UpdateProfile;
