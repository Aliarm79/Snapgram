import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
  creator?: Models.Document;
};
const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
  creator,
}: GridPostListProps) => {
  const { user } = useUserContext();
  return (
    <ul className="grid-container">
      {posts.map((post) => {
        if (post.location === "leauge of legends") {
          return;
          //this buggy post cant be deleted from server so i dont show it
        }
        return (
          <li className="relative h-80" key={post.$id}>
            <Link className="grid-post_link" to={`/posts/${post.$id}`}>
              <img
                src={post.imageUrl}
                alt="post"
                className="w-full h-full object-cover"
              />
            </Link>
            <div className="grid-post_user">
              {showUser && (
                <div className="flex items-center gap-2">
                  <img
                    src={post.creator.imageUrl || creator?.imageUrl}
                    alt="profile"
                    className="w-8 rounded-full"
                  />
                  <p>{post.creator.name || creator?.name}</p>
                </div>
              )}
              <div className="mb-3">
                {showStats && <PostStats post={post} userId={user.id} />}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default GridPostList;
