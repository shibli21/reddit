import React, { useState } from "react";
import { useMeQuery } from "../generated/graphql";

interface Props {}

const NavBar = (props: Props) => {
  const { data } = useMeQuery();
  const [profileMenu, setProfileMenu] = useState(false);
  return (
    <div>
      <nav className="bg-gray-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div id="logo" className="flex-shrink-0 ">
                <img className="w-8 h-8" src="/r.svg" alt="logo" />
              </div>
            </div>
            <div className="block">
              <div className="flex items-center ml-4 md:ml-6">
                <div className="relative ml-3">
                  <div
                    onClick={() => setProfileMenu(!profileMenu)}
                    className="flex w-auto p-2 border cursor-pointer md:w-48 border-gray-"
                  >
                    <button
                      className="flex items-center max-w-xs text-sm focus:outline-none"
                      id="user-menu"
                      aria-haspopup="true"
                    >
                      <img
                        className="w-8 h-8 rounded-sm md:mr-2"
                        src="https://syedshiblimahmud.vercel.app/_next/image?url=%2Fme.jpg&w=384&q=75"
                        alt={data?.me?.username}
                      />
                      <div className="hidden md:block">
                        {data?.me?.username}
                      </div>
                    </button>
                  </div>
                  <div
                    className={`absolute right-0 ${
                      !profileMenu ? "hidden" : ""
                    } w-48 py-1 mt-2 origin-top-right bg-white  shadow-lg ring-1 ring-black ring-opacity-5`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Your Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Sign out
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
