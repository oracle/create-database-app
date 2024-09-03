/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import React from 'react';
import {
  Form,
  useSearchParams,
  useNavigation,
} from '@remix-run/react';
import {
  Box,
  Modal,
} from '@mui/material';
import { modalStyle } from '../../CommonStyles';
import ConcertBannerProps from '../../models/ConcertProps';
import { NavigationState } from '../../utils/NavigationState';
import { UserActions } from '../../utils/UserActions';
import TooltipComponent from '../tooltips/TooltipComponent';
import featureDescriptions from '../../utils/ORDSFeaturesDescription';
import CustomCircularProgress from '../utils/CircularProgress';
import venuesBackgrounds from '../utils/venuesBackgrounds';
import artistImages from '../utils/artistImages';
import concertTitleColor from '../utils/concertTitleTextColor';
import concertDescriptionColor from '../utils/concertDescriptionTextColor';

interface UserActionsProps {
  userLikedConcert : boolean;
  concertID : number;
  userID : string | undefined;
}

/**
 * Renders the Concert Banner buttons depending on if the user liked the concert or not.
 * @param props the concert attributes.
 * @returns the User Actions Buttons
 */
function UserActionButtons(props: UserActionsProps) : React.ReactElement {
  const {
    userLikedConcert,
    concertID,
    userID,
  } = props;
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const enableTooltips = searchParams.has('tooltips');
  if (!userLikedConcert) {
    return (
      <div className="flex columns-3 space-x-6">
        <Form method="post">
          <input type="hidden" name="user_id" value={userID} />
          <input type="hidden" name="event_id" value={concertID} />
          <button
            className="w-full rounded-xl border-2 border-orange-500 bg-orange-500 px-4
                        py-2 font-semibold text-white
                        hover:border-orange-400 hover:bg-orange-400 hover:underline"
            name="kind"
            type="submit"
            value={UserActions.SUBSCRIBE}
          >
            {
              navigation.state !== NavigationState.IDLE
              && navigation.formData && navigation.formData.get('kind') === UserActions.SUBSCRIBE
                ? <CustomCircularProgress />
                : 'Subscribe'
            }
          </button>
        </Form>
        <Form method="post">
          <input type="hidden" name="user_id" value={userID} />
          <input type="hidden" name="event_id" value={concertID} />
          <button
            className="w-full rounded-xl border-2 border-orange-400 bg-transparent px-4
                        py-2 font-semibold text-white  hover:bg-orange-400 hover:underline"
            name="kind"
            type="submit"
            value={UserActions.INTERESTED}
          >
            {
              navigation.state !== NavigationState.IDLE
              && navigation.formData && navigation.formData.get('kind') === UserActions.INTERESTED
                ? <CustomCircularProgress />
                : 'Interested'
            }
          </button>
        </Form>
        {
          enableTooltips && (
            <TooltipComponent
              featureProps={featureDescriptions.subscribeTooltip}
            />
          )
        }
      </div>
    );
  }
  return (
    <div className="flex columns-2 space-x-6">
      <Form method="post">
        <input type="hidden" name="user_id" value={userID} />
        <input type="hidden" name="event_id" value={concertID} />
        <button
          className="w-full rounded-xl border-2 border-red-500 bg-red-500
                px-4 py-2 font-semibold
                text-white hover:border-red-400 hover:bg-red-400 hover:underline"
          name="kind"
          type="submit"
          value={UserActions.UNSUBSCRIBE}
        >
          {
            navigation.state !== NavigationState.IDLE
            && navigation.formData && navigation.formData.get('kind') === UserActions.UNSUBSCRIBE
              ? (
                <CustomCircularProgress />
              )
              : 'Unsubscribe'
          }
        </button>
      </Form>
      <Form method="post">
        <input type="hidden" name="user_id" value={userID} />
        <input type="hidden" name="event_id" value={concertID} />
        <button
          className="flex w-full rounded-xl border-2 border-red-400 bg-transparent px-4
                    py-2 font-semibold text-white  hover:bg-red-400 hover:underline"
          name="kind"
          type="submit"
          value={UserActions.NOT_INTERESTED}
        >
          {
            navigation.state !== NavigationState.IDLE
            && navigation.formData && navigation.formData.get('kind') === UserActions.NOT_INTERESTED
              ? <CustomCircularProgress />
              : 'Not Interested'
          }
        </button>
      </Form>
      {
      enableTooltips && (
      <TooltipComponent
        featureProps={featureDescriptions.howIsSubscribeTooltip}
      />
      )
      }
    </div>
  );
}

/**
 * The Concert Banner
 * @param props the concert attributes.
 * @returns the Concert Banner Component
 */
function ConcertBanner(props : ConcertBannerProps) {
  const {
    concert, user, likedConcert,
  } = props;
  const concertID = concert.items[0].event_id;
  const artistName = concert.items[0].artist_name;
  const venueName = concert.items[0].venue_name;
  const cityName = concert.items[0].city_name;
  const concertTitle = `${artistName} at ${venueName}, ${cityName}`;
  const concertDescription = concert.items[0].event_details;
  const musicGenres = concert.items[0].music_genres ? concert.items[0].music_genres.split(',').map((item) => item.trim()) : ['Indie'];
  const going = 99999;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className={`flex h-50 w-full flex-row items-center justify-center ${venuesBackgrounds[musicGenres[0]]} bg-cover bg-no-repeat`}>
      <div className="flex w-2/5 flex-col p-8">
        <h1 className={`mb-5 text-center text-4xl font-bold ${concertTitleColor[musicGenres[0]]} drop-shadow-[0_1.2px_1.2px_rgba(1,1,1,0.8)]`}>{concertTitle}</h1>
        <p className={`mb-8 text-justify text-lg font-normal ${concertDescriptionColor[musicGenres[0]]} drop-shadow-[0_1.2px_1.2px_rgba(1,1,1,0.8)]`}>{concertDescription}</p>
        {
          user === null
            ? (
              <button
                onClick={handleOpen}
                className="w-2/6 rounded-3xl border-2 border-orange-500 bg-orange-500
              py-2 font-semibold text-white
              hover:border-orange-400 hover:bg-orange-400 hover:underline"
                type="submit"
              >
                Log In/Sign Up
              </button>
            )
            : (
              <UserActionButtons
                userLikedConcert={likedConcert}
                concertID={concertID}
                userID={user.id}
              />
            )
        }
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <h3 className="self-start font-mono text-4xl font-semibold" id="modal-modal-title">
              Almost there!
            </h3>
            <p className="my-2 self-start font-serif text-xl font-light">
              You are seconds away from getting the latest news of
              {' '}
              {concertTitle}
            </p>
            <div className="my-4 flex w-3/5 flex-col items-center rounded bg-gray-100">
              <img className="my-4" src={artistImages[musicGenres[0]]} alt="artist" />
              <p className="my-1 font-mono text-xl font-semibold">{concertTitle}</p>
              <p className="my-1 font-mono text-base font-semibold text-gray-400">
                {going.toLocaleString()}
                {' '}
                people going
              </p>
            </div>
            <Form method="post" action="/auth0">
              <button
                className="rounded bg-red-600 px-4 py-2 text-xs text-white hover:bg-red-500"
                type="submit"
              >
                Log in/Sign In
              </button>
            </Form>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default ConcertBanner;
