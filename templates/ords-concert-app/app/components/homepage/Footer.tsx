/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { RocketLaunch } from '@mui/icons-material';
import SvgOrdsRed from '../icons/OrdsRed';
import OrdsLogo from '../../../images/ORDS.png';

/**
 * The Footer TBD
 * @returns the Footer Component.
 */
function Footer() {
  return (
    <footer className="flex min-h-60 items-center justify-around bg-black font-sans">
      <div className="flex flex-col items-center justify-center">
        <SvgOrdsRed className="w-20" />
        <span className="flex items-center text-sm text-white">
          Powered by ORDS
          <RocketLaunch className="w-8" />
        </span>
      </div>
      <div className="z-10 flex flex-col items-start text-base">
        <span className="my-1 text-white underline decoration-orange-600 underline-offset-4">
          Keep track of the latest concerts, festivals and more.
        </span>
        <span className="my-1 text-white underline decoration-red-600 underline-offset-4">
          Follow your favorite artists and their next move.
        </span>
        <span className="mb-6 mt-1 text-white underline decoration-white underline-offset-4">
          For more info on the sample app, click
          <a href="https://www.oracle.com/database/technologies/appdev/rest.html">
            here
          </a>
        </span>
        <span className="my-1 text-white">
          © 2024 Oracle. All rights reserved.
        </span>
      </div>
      <div className="flex flex-col text-white">
        <span className="text-lg">Powered by:</span>
        <ul className="underline">
          <div className="flex items-center">
            <li><a href="https://www.oracle.com/database/technologies/appdev/rest.html" target="_blank" rel="noreferrer">ORDS</a></li>
            <img src={OrdsLogo} alt="ORDS" className="w-8" />
          </div>
          <li><a href="https://remix.run/" target="_blank" rel="noreferrer">Remix</a></li>
          <li><a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">Tailwind</a></li>
          <li><a href="https://mui.com/" target="_blank" rel="noreferrer">MUI</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
