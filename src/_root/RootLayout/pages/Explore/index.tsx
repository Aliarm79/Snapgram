import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import SearchResults from "@/components/shared/SearchResults";
import { Input } from "@/components/ui/input";
import {
  useGetPosts,
  
} from "@/lib/react-query/queriesAndMutations";
import { useState } from "react";

const Explore = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data: posts, } = useGetPosts();
  // const debouncedValue = useDebounce(searchValue, 500);

  // const { data: searchedPosts, isFetching: isSearchFetching } =
  //   useSearchPosts(debouncedValue);
  const shouldShowSearch = searchValue !== "";
  if (!posts) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Loader />
      </div>
    );
  }
  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img src="/assets/icons/search.svg" alt="search" width={24} />
          <Input
            type="text"
            placeholder="search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-between items-center w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>
        <div className="flex justify-center items-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img src="/assets/icons/filter.svg" alt="filter" width={20} />
        </div>
      </div>
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearch ? (
          <SearchResults />
        ) : (
          posts?.pages.map((item, index: number) => {
            return (
              <GridPostList
                key={`${item} ${index}`}
                posts={item?.documents || []}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Explore;
