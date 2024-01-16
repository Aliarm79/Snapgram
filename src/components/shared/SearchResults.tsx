import { Models } from "appwrite";
import Loader from "@/components/shared/Loader";
import GridPostList from "./GridPostList";

type SearchResultsProps = {
  searchedPosts: Models.Document[];
  isSearchFetching: boolean;
};
const SearchResults = ({
  searchedPosts,
  isSearchFetching,
}: SearchResultsProps) => {
  if (isSearchFetching) return <Loader />;
  if (!isSearchFetching && searchedPosts.length > 0) {
    return <GridPostList posts={searchedPosts} />;
  }
  return (
    <div className="text-light-4 mt-10 text-center w-full">
      No results found
    </div>
  );
};

export default SearchResults;
