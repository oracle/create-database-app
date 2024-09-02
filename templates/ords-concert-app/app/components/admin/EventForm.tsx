/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { Form, useSearchParams } from '@remix-run/react';
import React from 'react';
import Artist from '../../models/Artist';
import EventStatus from '../../models/EventStatus';
import ORDSResponse from '../../models/ORDSResponse';
import Venue from '../../models/Venue';
import { BASE } from '../../routes/constants/index.server';
import TooltipComponent from '../tooltips/TooltipComponent';
import featureDescriptions from '../../utils/ORDSFeaturesDescription';

interface EventFormProps {
  artists: ORDSResponse<Artist>,
  venues: ORDSResponse<Venue>,
  status: ORDSResponse<EventStatus>
}

/**
 * Displays the Event Form
 * @param props the EventForm props
 * @returns the Event form
 */
function EventForm(props: EventFormProps) {
  const { artists, venues, status } = props;
  const [searchParams] = useSearchParams();
  const enableTooltips = searchParams.has('tooltips');
  const [artist, setArtist] = React.useState(artists.items[0].artist_id);
  const [venue, setVenue] = React.useState(venues.items[0].venue_id);
  const [eventStatus, setEventStatus] = React.useState(status.items[0].event_status_id);
  const handleArtistSelect = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    setArtist(parseInt(target.value, BASE));
  };
  const handleVenueSelect = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    setVenue(parseInt(target.value, BASE));
  };
  const handleStatusSelect = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    setEventStatus(parseInt(target.value, BASE));
  };
  return (
    <div className="flex flex-row">
      <Form className="w-full" method="post" name="events">
        <div className="flex flex-col py-2">
          <div className="flex flex-col py-4">
            <div className="flex flex-row">
              <span className="mb-2 font-bold">
                Date
                <span className="text-red-700">*</span>
                {
                  enableTooltips && (
                  <TooltipComponent
                    featureProps={featureDescriptions.postDatesTooltip}
                    width="40px"
                    height="40px"
                  />
                  )
                }
              </span>
            </div>
            <input name="event_date" className="rounded-md border border-gray-400 px-3 py-4" type="date" required />
          </div>
        </div>
        <div className="flex flex-col py-2">
          <span className="mb-2 font-bold">
            Artist
            <span className="text-red-700">*</span>
          </span>
          <select
            id="artist-select"
            defaultValue={artist}
            onChange={handleArtistSelect}
            className="rounded-md border border-gray-400 px-3 py-4"
            name="artist_id"
            required
          >
            { artists.items.map((item) => (
              <option key={item.artist_id} value={item.artist_id}>{ item.name }</option>
            )) }
          </select>
        </div>
        <div className="flex flex-col py-2">
          <span className="mb-2 font-bold">
            Venues
            <span className="text-red-700">*</span>
          </span>
          <select
            id="artist-select"
            defaultValue={venue}
            onChange={handleVenueSelect}
            className="rounded-md border border-gray-400 px-3 py-4"
            name="venue_id"
            required
          >
            { venues.items.map((item) => (
              <option key={item.city_id} value={item.venue_id}>{ item.name }</option>
            )) }
          </select>
        </div>
        <div className="flex flex-col py-2">
          <span className="mb-2 font-bold">
            Event Status
            <span className="text-red-700">*</span>
          </span>
          <select
            id="artist-select"
            defaultValue={eventStatus}
            onChange={handleStatusSelect}
            className="rounded-md border border-gray-400 px-3 py-4"
            name="status_id"
            required
          >
            { status.items.map((item) => (
              <option
                key={item.event_status_id}
                value={item.event_status_id}
              >
                {item.event_status_name}
              </option>
            )) }
          </select>
        </div>
        <div className="flex flex-col py-2">
          <div className="flex flex-row items-center">
            <span className="mb-2 font-bold">
              Details
              <span className="text-red-700">*</span>
            </span>
            {
            enableTooltips && (
              <TooltipComponent
                featureProps={featureDescriptions.sanitizationTooltip}
                width="40px"
                height="40px"
              />
            )
          }
          </div>
          <textarea name="details" className="rounded-md border border-gray-400 px-3 py-4" rows={5} />
        </div>
        <div className="flex flex-row items-center justify-end py-4">
          <button name="type" value="concerts" type="submit" className="rounded-lg bg-orange-500 p-4 text-white">
            Create Event
          </button>
        </div>
      </Form>
    </div>
  );
}

export default EventForm;
