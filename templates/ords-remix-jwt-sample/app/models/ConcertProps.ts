/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { Auth0Profile } from 'remix-auth-auth0';
import Concert from './ORDSConcert';
import ORDSResponse from './ORDSResponse';

interface ConcertBannerProps {
  user : Auth0Profile | null;
  concert: ORDSResponse<Concert>;
  likedConcert: boolean;
}

export default ConcertBannerProps;
