'use client'
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className={`flex w-full items-center justify-between  dark:bg-dark mb-5 backdrop-blur-lg  `}>
   
        
          <div className="w-14 p-2 max-w-full  flex justify-center items-center ">
            <Link href="/" className="block items-center">
              <img
                src="codeMedic logo.svg"
                alt="logo"
                className="dark:hidden w-16"
              />
              <img
                src="codeMedic logo.svg"
                alt="logo"
                className="hidden dark:block w-16"
              />
            </Link>
          </div>
          
            <div className="text-black font-bold " >
              <button
                onClick={() => setOpen(!open)}
                id="navbarToggler"
                className={` ${
                  open && "navbarTogglerActive"
                } absolute  right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}  >
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
              </button>
              <nav
                id="navbarCollapse"
                className={`absolute flex right-4 top-full w-full max-w-[400px] justify-between rounded-lg bg-white text-black px-6   shadow dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-transparent ${
                  !open ? '': "hidden"
                } `}
              >
                <ul className="flex  w-full justify-between  ">
                  <ListItem NavLink="/">Debugger</ListItem>
                  <ListItem NavLink="/explainer">Explainer</ListItem>
                  <ListItem NavLink="/commenter">Commenter</ListItem>
                </ul>
              </nav>
            </div>
    </header>
  );
};

export default Navbar;

const ListItem = ({ children, NavLink }) => {
  return (
    <>
      <li className=" ">
        <Link 
          href={NavLink}
          className="flex py-2 text-base   hover:text-dark/50 dark:text-dark-6 dark:hover:text-dark/80 lg:ml-12 lg:inline-flex"
        >
          {children}
        </Link>
      </li>
    </>
  );
};
