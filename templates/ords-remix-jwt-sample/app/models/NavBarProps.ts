/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import City from './City';
import ORDSResponse from './ORDSResponse';
import OIDCProfile from './OIDCProfile';

interface NavBarProps {
  user: OIDCProfile | null;
  cities: ORDSResponse< City >;
}

export default NavBarProps;
