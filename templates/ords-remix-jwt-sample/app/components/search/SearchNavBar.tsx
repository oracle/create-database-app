/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { NavLink } from '@remix-run/react';
import { SearchNabVarProps } from '../../models/SearchNavBarProps';

/**
 * Renders the navigation search bar component
 * @param props the component props
 * @returns the navigation search bar component
 */
function SearchNavBar(props : SearchNabVarProps) {
  const { navPages } = props;

  return (
    <div className="mb-auto w-full">
      <nav className="w-full">
        <ul className="flex flex-row items-center">
          {
        navPages.map((navPage) => (
          <li className="decoration-orange-400 underline-offset-8 hover:underline" key={navPage.title}>
            <NavLink
              className="block size-full py-2 pr-8"
              to={navPage.link}
            >
              {({ isActive }) => (
                <span className={isActive ? 'font-bold underline decoration-orange-500 decoration-4' : 'font-sans'}>
                  {navPage.title}
                </span>
              )}
            </NavLink>
          </li>
        ))
        }
        </ul>
      </nav>
    </div>
  );
}

export default SearchNavBar;
