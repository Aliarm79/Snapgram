import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import Loader from "@/components/shared/Loader";
import { useEffect, useState } from "react";

type PostStatsprops = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsprops) => {
  const likesList = post?.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);
  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSaveedPost, isPending: isDeletingPost } =
    useDeleteSavedPost();
  const { data: currentUser } = useGetCurrentUser();

  const savedPost = currentUser?.save?.find(
    (record: Models.Document) => record.post.$id === post.$id
  );
  useEffect(() => {
    setIsSaved(!!savedPost);
  }, [currentUser]);
  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    let newLike = [...likes];
    if (checkIsLiked(newLike, userId)) {
      newLike = newLike.filter((id: string) => id !== userId);
    } else {
      newLike.push(userId);
    }
    setLikes(newLike);
    likePost({ postId: post.$id, likesArray: newLike });
  };
  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isDeletingPost && !isSavingPost) {
      if (isSaved) {
        setIsSaved(false);
        deleteSaveedPost(savedPost.$id);
      } else {
        setIsSaved(true);
        savePost({ postId: post.$id, userId: userId });
      }
    }
  };

  return (
    <div className="flex justify-between items-center mt-3">
      <div className="flex gap-2 ">
        <img
          src={
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }
          alt="like"
          width={20}
          onClick={handleLikePost}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2 ">
        {isDeletingPost || isSavingPost ? (
          <Loader />
        ) : (
          <img
            src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
            alt="like"
            width={20}
            onClick={handleSavePost}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
