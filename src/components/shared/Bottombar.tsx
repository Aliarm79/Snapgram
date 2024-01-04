import { Link, useLocation,  } from "react-router-dom";
import { bottombarLinks } from "@/constants";

const Bottombar = () => {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar bg-red">
      
        {bottombarLinks.map((link) => {
          const isActive = pathname === link.route;
          return (
            
              <Link
                key={link.label}
                className={`  ${
                  isActive && "bg-primary-500 "
                } rounded-lg flex-center flex-col p-2 gap-1 transition`}
                to={link.route}
              >
                <img
                  src={link.imgURL}
                  className={` ${isActive && "invert-white"} w-5 sm:w-6`}
                  alt={link.label}
                />
                <p className="tiny-medium sm:small-medium text-light-2">{link.label}</p>
              </Link>
          );
        })}
    </section>
  );
};

export default Bottombar;
