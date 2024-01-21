import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useGetPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const { ref, inView } = useInView();

  const {
    data: posts,
    hasNextPage,
    fetchNextPage,
    isPending: postLoading,
    
  } = useGetPosts();
  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold  w-full">Home Feed</h2>
          {postLoading && !posts ? (
            <Loader />
          ) : (
            <div>
              <ul className="flex flex-col flex-1 gap-9 w-full">
                {posts?.pages.map((item) =>
                  item?.documents.map((post: Models.Document) => (
                    <PostCard key={post.$id} post={post} />
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
        {hasNextPage && (
          <div ref={ref} className="mt-10">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
