import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Saved = () => {
  const { data: user, isPending: userLoading } = useGetCurrentUser();
  const posts = user?.save.map((item: Models.Document) => {
    return item.post;
  });
  return (
    <div className="flex flex-1   ">
      <div className="home-container ">
        <div className="flex justify-start items-center gap-3 w-full max-w-5xl">
          <img src="/assets/icons/save.svg" alt="add" width={36} />
          <h2 className="h3-bold md:h2-bold ">Saved Posts</h2>
        </div>

        {userLoading ? (
          <Loader />
        ) : posts.length === 0 ? (
          <div className="text-light-4 mt-10 text-center w-full">
            No post found
          </div>
        ) : (
          <GridPostList posts={posts} showStats={false} showUser={false} />
        )}
      </div>
    </div>
  );
};

export default Saved;
