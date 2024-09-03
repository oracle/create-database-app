/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { LoaderFunctionArgs } from '@remix-run/node';
import { json, useLoaderData, useSearchParams } from '@remix-run/react';
import React, { ReactElement } from 'react';
import BannerComponent from '../components/tooltips/BannerComponent';
import { auth } from '~/utils/auth.server';
import BannerComponentProps from '../models/BannerComponentProps';
import featureDescriptions from '../utils/ORDSFeaturesDescription';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  const enableTooltips = searchParams.has('tooltips');
  const {
    profile,
  } = await auth.isAuthenticated(request, {
    failureRedirect: `/error${enableTooltips ? '?tooltips' : ''}`,
  });
  return json({
    profile,
  });
};

/**
 * Renders the users profile information.
 * @returns Profile component.
 */
export default function Profile() : ReactElement {
  const {
    profile,
  } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const enableTooltips = searchParams.has('tooltips');
  const [bannerIsOpen, setBannerIsOpen] = React.useState(enableTooltips);
  const closeBanner = () => {
    setBannerIsOpen(false);
  };
  const bannerProps: BannerComponentProps = {
    open: bannerIsOpen,
    severity: 'info',
    onClose: closeBanner,
    autoHideDuration: 6000,
    vertical: 'top',
    horizontal: 'center',
    feature: featureDescriptions.userLoggedInTooltip,
  };
  return (
    <div className="flex size-4/5 flex-col bg-slate-100">
      <div className="size-full flex-col items-center justify-center px-8 py-4">
        <div className="flex size-full flex-col items-center justify-center p-4">
          <div className="flex w-3/5 flex-col items-center justify-center text-2xl">
            <img className="mb-4 w-1/5 rounded-3xl" src={profile.photos![0].value} alt="profile-picture" />
            <span className="py-2">{profile.displayName}</span>
            <span className="py-2">{profile.emails ? profile.emails[0].value : ''}</span>
            <span className="py-2">
              {
             // eslint-disable-next-line no-underscore-dangle
              profile._json?.nickname
              }
            </span>
          </div>
        </div>
      </div>
      <BannerComponent
        open={bannerProps.open}
        severity={bannerProps.severity}
        onClose={bannerProps.onClose}
        autoHideDuration={bannerProps.autoHideDuration}
        vertical={bannerProps.vertical}
        horizontal={bannerProps.horizontal}
        feature={bannerProps.feature}
      />
    </div>
  );
}
