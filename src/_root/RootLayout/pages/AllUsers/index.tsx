import UserCards from "@/components/shared/UserCard";

const AllUsers = () => {
  return (
    <div className="flex flex-1   ">
      <div className="home-container ">
        <div className="flex justify-start items-center gap-3 w-full max-w-5xl">
          <img src="/assets/icons/people.svg" alt="add" width={36} />
          <h2 className="h3-bold md:h2-bold ">All Users</h2>
        </div>
        <UserCards />
      </div>
    </div>
  );
};

export default AllUsers;
