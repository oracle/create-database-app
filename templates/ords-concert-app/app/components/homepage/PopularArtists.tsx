/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
/* eslint-disable max-len */
import React from 'react';

import {
  Box, InputAdornment, Modal,
  TextField,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import ArtistCard from './ArtistCard';
import FilterButton from '../artists/FilterButton';
import ORDSResponse from '../../models/ORDSResponse';
import Artist from '../../models/Artist';

const genres = ['Indie', 'Jazz', 'Rap', 'Reggae', 'Steampunk', 'Metal', 'Pop', 'Rock'];

const FIRST = 4;
const LAST = 8;

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 8,
};

interface PopularArtistsProps {
  artists: ORDSResponse< Artist >;
}

/**
 * The Popular Artists Component.
 * @param props the Popular Artists props.
 * @returns the Popular Artists Component.
 */
function PopularArtists(props: PopularArtistsProps) {
  const { artists } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // eslint-disable-next-line no-magic-numbers
  const FOLLOWERS = [69420, 99876, 45632, 32496, 98765, 12776, 100000, 88999, 99999];

  return (
    <div className="flex flex-col">
      <div className="my-10 flex flex-row justify-center">
        <h1 className="text-4xl">Popular Artists</h1>
      </div>
      <div className="my-4 flex flex-row">
        { artists.items.slice(0, FIRST).map((artist, index) => (
          <div key={artist.artist_id}>
            <ArtistCard artist={artist} followers={FOLLOWERS[index]} />
          </div>
        ))}
      </div>
      <div className="my-4 flex flex-row justify-center">
        { artists.items.slice(FIRST, LAST).map((artist, index) => (
          <div key={artist.artist_id}>
            <ArtistCard artist={artist} followers={FOLLOWERS[index + FIRST]} />
          </div>
        ))}
      </div>
      <div className="my-10 flex flex-row justify-center">
        <button type="button" onClick={handleOpen} className="rounded-3xl border-2 border-orange-500 px-8 py-2 text-orange-500">View All</button>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <div className="mb-6 flex flex-col">
              <h3 className="mb-8 font-mono text-4xl font-semibold">Follow your favorite artists</h3>
              <p className="mb-12 font-sans text-xl font-light">Get alerts and recommendations based on the artists you listen to most.</p>
              <TextField
                id="outlined-basic"
                label="Search Artists"
                variant="outlined"
                sx={{
                  backgroundColor: '#F4F6F9',
                }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
                }}
              />
            </div>
            <div className="mb-8 flex flex-row">
              { genres.map((genre) => (
                <div key={genre}>
                  <FilterButton genre={genre} />
                </div>
              ))}
            </div>
            <div className="h-72 overflow-y-auto">
              <div className="my-4 flex flex-row">
                { artists.items.slice(0, FIRST).map((artist, index) => (
                  <div key={artist.artist_id}>
                    <ArtistCard artist={artist} followers={FOLLOWERS[index]} />
                  </div>
                ))}
              </div>
              <div className="my-4 flex flex-row justify-center">
                { artists.items.slice(FIRST, LAST).map((artist, index) => (
                  <div key={artist.artist_id}>
                    <ArtistCard artist={artist} followers={FOLLOWERS[index + FIRST]} />
                  </div>
                ))}
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default PopularArtists;
