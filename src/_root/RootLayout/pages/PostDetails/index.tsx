import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { multiFormatDateString } from "@/lib/utils";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useUserContext();

  const { data: post, isPending: isPostLoading } = useGetPostById(id || "");

  const handleDeletePost = () => {};

  return (
    <div className="post_details-container">
      {isPostLoading ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img src={post?.imageUrl} alt="post" className="post_details-img" />
          <div className="post_details-info">
            <div className="flex justify-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex gap-3 items-center"
              >
                <img
                  src={
                    post?.creator.imageUrl ||
                    "assets/icons/profile-placeholder.svg"
                  }
                  alt="profile"
                  className="rounded-full w-8 lg:w-12"
                />

                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>
              {post?.creator.$id === user.id && (
                <div className="flex justify-center items-center gap-4">
                  <Link to={`/update-post/${post?.$id}`}>
                    <img src="/assets/icons/edit.svg" alt="edit" width={24} />
                  </Link>
                  {
                    <Button
                      variant={"ghost"}
                      className="post_details-delete_btn"
                      onClick={handleDeletePost}
                    >
                      <img
                        src="/assets/icons/delete.svg"
                        alt="delete"
                        width={24}
                      />
                    </Button>
                  }
                </div>
              )}
            </div>
            <hr className="border w-full border-dark-4/80" />
            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string) => {
                  return (
                    <li key={tag} className="text-light-3">
                      #{tag}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
