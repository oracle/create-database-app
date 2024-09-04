/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import React from 'react';
import {
  Box, CircularProgress, Modal, Chip,
} from '@mui/material';
import { Auth0Profile } from 'remix-auth-auth0';
import { Form, useNavigation, useSearchParams } from '@remix-run/react';
import Artist from '../../models/Artist';
import { modalStyle } from '../../CommonStyles';
import { UserActions } from '../../utils/UserActions';
import { NavigationState } from '../../utils/NavigationState';
import TooltipComponent from '../tooltips/TooltipComponent';
import featureDescriptions from '../../utils/ORDSFeaturesDescription';
import artistImages from '../utils/artistImages';
import artistBackgrounds from '../utils/artistBackgrounds';
import artistBioColor from '../utils/artistBioTextColor';
import artistTitleColor from '../utils/artistTitleColor';

interface HeroBannerProps {
  artist: Artist;
  user: Auth0Profile | null;
  userLikedArtist: boolean;
}

/**
 * The Hero Artist Component
 * @param props the Banner attributes.
 * @returns the Hero Artist Component
 */
function HeroBanner(props: HeroBannerProps) {
  const { artist, user, userLikedArtist } = props;
  const [open, setOpen] = React.useState(false);
  const [searchParams] = useSearchParams();
  const enableTooltips = searchParams.has('tooltips');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigation = useNavigation();
  const musicGenres = artist.music_genres ? artist.music_genres.split(',').map((item) => item.trim()) : ['Indie'];

  const followButtonState = (userFollows: boolean) => {
    if (userFollows) {
      return (
        <Form method="post" className="flex w-2/6 items-center">
          <input type="hidden" name="user_id" value={user?.id} />
          <input type="hidden" name="artist_id" value={artist.artist_id} />
          <button
            type="submit"
            className="w-full rounded-3xl bg-red-500
                  py-2 text-lg font-semibold text-white"
            name="kind"
            value={UserActions.UNSUBSCRIBE}
          >
            Unfollow
          </button>
          <div className="ml-2">
            {
          enableTooltips && (
          <TooltipComponent
            featureProps={featureDescriptions.subscribeArtistTooltip}
            width="40px"
            height="40px"
          />
          )
        }
          </div>
        </Form>
      );
    }
    return (
      <Form method="post" className="flex w-2/6 items-center">
        <input type="hidden" name="user_id" value={user?.id} />
        <input type="hidden" name="artist_id" value={artist.artist_id} />
        <button
          type="submit"
          className="w-full rounded-3xl border-2 border-orange-500 bg-orange-500
                  py-2 text-lg font-semibold text-white"
          name="kind"
          value={UserActions.SUBSCRIBE}
        >
          Follow
        </button>
        <div className="ml-2">
          {
          enableTooltips && (
          <TooltipComponent
            featureProps={featureDescriptions.subscribeArtistTooltip}
            width="40px"
            height="40px"
          />
          )
        }
        </div>
      </Form>
    );
  };

  return (
    <div className={`${artistBackgrounds[musicGenres[0]]} flex max-h-[calc(75%)] w-full flex-row items-center justify-center bg-cover bg-no-repeat`}>
      <div className="flex w-3/5 flex-col p-4 px-32">
        <h1 className={`mb-5 text-6xl font-bold ${artistTitleColor[musicGenres[0]]} drop-shadow-[0_1.2px_1.2px_rgba(1,1,1,0.8)]`}>{artist.name}</h1>
        <p className={`mb-5 text-lg font-normal ${artistBioColor[musicGenres[0]]} drop-shadow-[0_1.2px_1.2px_rgba(1,1,1,0.8)]`}>{artist.bio}</p>
        <div className="mb-8 flex flex-wrap gap-2 py-2">
          {
                  musicGenres.map((musicGenre : string) => (
                    <Chip
                      key={`music-genre-${musicGenre}-${artist.name}`}
                      label={musicGenre}
                      sx={{
                        backgroundColor: 'green',
                        color: 'white',
                      }}
                    />
                  ))
                }
        </div>
        <div className="flex items-center">
          {
        // eslint-disable-next-line no-nested-ternary
        user
          ? navigation.state !== NavigationState.IDLE
          && navigation.formData
            ? <CircularProgress />
            : followButtonState(userLikedArtist)
          : (
            <button
              type="button"
              onClick={handleOpen}
              className="w-2/6 rounded-3xl border-2 border-orange-500 bg-orange-500
                        py-2 text-lg font-semibold text-white"
            >
              Follow Artist
            </button>
          )
        }
        </div>
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
              You are seconds away from following
              {' '}
              {artist.name}
            </p>
            <div className="my-4 flex w-3/5 flex-col items-center rounded bg-gray-100">
              <img className="my-4" src={artistImages[musicGenres[0]]} alt="artist" />
              <p className="my-1 font-mono text-xl font-semibold">{artist.name}</p>
              <p className="my-1 font-mono text-base font-semibold text-gray-400">
                100 followers
              </p>
            </div>
            <Form method="post" action="/auth0" className="flex w-2/5 justify-center">
              <button type="submit" className="w-2/5 rounded-3xl bg-red-600 py-4 text-white">
                Sign in
              </button>
            </Form>
          </Box>
        </Modal>
      </div>
      <div>
        <img className="w-2/5 py-48" src={artistImages[musicGenres[0]]} alt="artist" />
      </div>
    </div>
  );
}

export default HeroBanner;
