import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { menusActions } from "../../store/Menu.store";
import Directories from "./Directories/Directories";
import NavLinks from "./NavLinks";
import LayoutMenus from "../Utilities/LayoutMenus";
import DarkMode from "../AccountSection/DarkMode";

const classLinkActive =
  "text-rose-600 bg-violet-100 border-r-4 border-rose-500 dark:bg-slate-700/[.2] dark:text-slate-200 dark:border-slate-200";

const Menu = () => {
  const menuOpen = useAppSelector((state) => state.menu.menuHeaderOpened);
  const dispatch = useAppDispatch();

  const closeMenuHandler = () => {
    dispatch(menusActions.closeMenuHeader());
  };
  return (
    <LayoutMenus
      menuOpen={menuOpen}
      closeMenuHandler={closeMenuHandler}
      className="left-0"
    >
      <header className="h-full flex flex-col">
        <a
          href="/"
          className="font-bold uppercase text-center mt-8 text-lg tracking-wide hidden xl:block"
        >
          Wealzy
        </a>
        <Directories classActive={classLinkActive} />
        <NavLinks classActive={classLinkActive} />
        <div className="flex xl:hidden pl-4 w-full">
        <DarkMode/>
        </div>

      </header>

    </LayoutMenus>
  );
};

export default Menu;
