/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import React from 'react';
import {
  CalendarToday, AccountCircle, Place, SupervisorAccount,
} from '@mui/icons-material';
import { useSearchParams } from '@remix-run/react';
import EventForm from './EventForm';
import ORDSResponse from '../../models/ORDSResponse';
import Artist from '../../models/Artist';
import Venue from '../../models/Venue';
import EventStatus from '../../models/EventStatus';
import ArtistForm from './ArtistForm';
import { iconStyle } from '../../CommonStyles';
import City from '../../models/City';
import VenuesForm from './VenuesForm';
import AdminToolTip from '../tooltips/AdminToolTIpComponent';
import { Forms as FORMS } from '../../utils/enums';
import ParametersToolTip from '../tooltips/Parameters';

interface AdminDashboardProps {
  artists: ORDSResponse<Artist>,
  venues: ORDSResponse<Venue>,
  status: ORDSResponse<EventStatus>,
  cities: ORDSResponse<City>,
}

/**
 * Renders the Admin Dashboard form
 * @param props The Admin Dashboard Props
 * @returns The requested form
 */
function AdminDashboard(props: AdminDashboardProps) {
  const {
    artists, venues, status, cities,
  } = props;
  const [searchParams] = useSearchParams();
  const enableTooltips = searchParams.has('tooltips');

  const [selectedForm, setSelectedForm] = React.useState(FORMS.EVENTS_FORM);

  const displayChosenForm = () => (
    <>
      <h1 className="text-3xl font-bold">
        {`Create a new ${(selectedForm === FORMS.EVENTS_FORM && 'Event') || (selectedForm === FORMS.ARTIST_FORM && 'Artist') || 'Venue'}`}
      </h1>
      {
              enableTooltips && (
                <div>
                  <AdminToolTip />
                  <ParametersToolTip />
                </div>
              )
            }
      {
        selectedForm === FORMS.EVENTS_FORM
        && <EventForm artists={artists} venues={venues} status={status} />
      }
      {
        selectedForm === FORMS.ARTIST_FORM
        && <ArtistForm />
      }
      {
        selectedForm === FORMS.VENUES_FORM
        && <VenuesForm cities={cities} />
      }
    </>
  );

  /**
   * Handles which form to display
   * @param form - The form to display
   */
  function handleSelectedForm(form: number) {
    setSelectedForm(form);
  }
  return (
    <div className="my-12 flex w-full flex-col bg-white px-20">
      <div className="my-8 flex flex-row justify-around">
        <button
          onClick={() => handleSelectedForm(FORMS.EVENTS_FORM)}
          type="button"
          className={`flex flex-col items-center rounded-lg border border-gray-300 p-12 
            ${selectedForm === FORMS.EVENTS_FORM ? 'bg-orange-400 text-white' : ''}`}
        >
          <CalendarToday sx={iconStyle(selectedForm === FORMS.EVENTS_FORM)} />
          <span>Create an event</span>
        </button>
        <button
          onClick={() => handleSelectedForm(FORMS.ARTIST_FORM)}
          type="button"
          className={`flex flex-col items-center rounded-lg border border-gray-300 p-12 
            ${selectedForm === FORMS.ARTIST_FORM ? 'bg-orange-400 text-white' : ''}`}
        >
          <AccountCircle sx={iconStyle(selectedForm === FORMS.ARTIST_FORM)} />
          <span>Create an artist</span>
        </button>
        <button
          onClick={() => handleSelectedForm(FORMS.VENUES_FORM)}
          type="button"
          className={`flex flex-col items-center rounded-lg border border-gray-300 p-12 
            ${selectedForm === FORMS.VENUES_FORM ? 'bg-orange-400 text-white' : ''}`}
        >
          <Place sx={iconStyle(selectedForm === FORMS.VENUES_FORM)} />
          <span>Create a venue</span>
        </button>
        <button type="button" className="flex flex-col items-center rounded-lg border border-gray-300 p-12">
          <SupervisorAccount sx={iconStyle(false)} />
          <span>Your account</span>
        </button>
      </div>
      <div>
        { displayChosenForm() }
      </div>
    </div>
  );
}

export default AdminDashboard;
