/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { Form } from '@remix-run/react';
import React from 'react';
import City from '../../models/City';
import ORDSResponse from '../../models/ORDSResponse';
import { BASE } from '../../routes/constants/index.server';

interface VenuesFormProps {
  cities: ORDSResponse<City>
}

/**
 * Displays the Venue Form
 * @param props the VenueForm props
 * @returns the Venue form
 */
function VenuesForm(props: VenuesFormProps) {
  const { cities } = props;
  const [city, setCity] = React.useState(cities.items[0].city_id);

  const handleCitySelect = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    setCity(parseInt(target.value, BASE));
  };

  return (
    <div className="flex flex-col py-2">
      <Form method="post" name="artists">
        <div className="flex flex-col">
          <div className="flex flex-col py-4">
            <span className="mb-2 font-bold">
              Venue Name
              <span className="text-red-700">*</span>
            </span>
            <input name="venue_name" className="rounded-md border border-gray-400 px-3 py-4" type="text" required />
          </div>
          <div className="flex flex-col py-4">
            <span className="mb-2 font-bold">
              Location
              <span className="text-red-700">*</span>
            </span>
            <input name="location" className="rounded-md border border-gray-400 px-3 py-4" type="text" required />
          </div>
          <div className="flex flex-col py-2">
            <span className="mb-2 font-bold">
              City
              <span className="text-red-700">*</span>
            </span>
            <select
              id="venue-select"
              defaultValue={city}
              onChange={handleCitySelect}
              className="rounded-md border border-gray-400 px-3 py-4"
              name="city_id"
            >
              { cities.items.map((item) => (
                <option
                  key={item.city_id}
                  value={item.city_id}
                >
                  {item.name}
                </option>
              )) }
            </select>
          </div>
        </div>
        <div className="flex flex-row justify-end py-4">
          <button name="type" type="submit" value="venues" className="rounded-lg bg-orange-500 p-4 text-white">
            Create Venue
          </button>
        </div>
      </Form>
    </div>
  );
}

export default VenuesForm;
