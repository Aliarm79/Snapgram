import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const UserCards = () => {
  const { data: users,isPending:userLoading } = useGetUsers();
  if (userLoading) {
    return <Loader/>
  }
  return (
    <div className="user-grid">
      {users?.map((user) => {
        return (
          <div
            key={user.$id}
            className="flex  flex-col gap-4 py-14 px-24 border-dark-3 border-4 rounded-xl justify-center items-center "
          >
            <img
              src={user.imageUrl}
              alt="profile"
              className="w-24 rounded-full"
            />
            <h2 className="h2-bold">{user.name}</h2>{" "}
            <h3 className="base-regular text-light-3">@{user.username}</h3>{" "}
            <Link
              to={`/profile/${user.$id}`}
              className=" px-12 py-2 bg-primary-500 rounded-md"
            >
              Profile
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default UserCards;
