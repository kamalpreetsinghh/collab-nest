"use client";

import { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";

type CustomMenuProps = {
  title: string;
  state: string;
  filters: Array<string>;
  setState: (value: string) => void;
};

const CustomMenu = ({ title, state, filters, setState }: CustomMenuProps) => (
  <div className="flex-start flex-col w-full gap-7 relative">
    <label htmlFor={title} className="w-full">
      {title}
    </label>
    <Menu as="div" className="self-start relative">
      <div>
        <MenuButton className="flex-center custom-menu-btn">
          {state || "Category"}
          <IoIosArrowDown />
        </MenuButton>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="flex-start custom-menu-items">
          {filters.map((tag) => (
            <MenuItem key={tag}>
              <button
                type="button"
                value={tag}
                className="custom-menu-item"
                onClick={(e) => setState(e.currentTarget.value)}
              >
                {tag}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Transition>
    </Menu>
  </div>
);

export default CustomMenu;
