import PostForm from "@/components/forms/PostForm";
import Loader from "@/components/shared/Loader";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isPending: isPostLoading } = useGetPostById(id||"");

  return (
    <div className="flex flex-1  ">
      {isPostLoading ? (
        <Loader />
      ) : (
        <div className="common-container">
          <div className="flex justify-start items-center gap-3 w-full max-w-5xl">
            <img src="/assets/icons/add-post.svg" alt="add" width={36} />
            <h2 className="h3-bold md:h2-bold ">Edit Post</h2>
          </div>
          <PostForm action="Update" post={post} />
        </div>
      )}
    </div>
  );
};

export default EditPost;
