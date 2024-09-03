/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { Form } from '@remix-run/react';

/**
 * Displays the Artist Form
 * @returns the artist form
 */
function ArtistForm() {
  return (
    <div className="flex flex-col py-2">
      <Form method="post" name="artists">
        <div className="flex flex-col">
          <div className="flex flex-col py-4">
            <span className="mb-2 font-bold">
              Artist Name
              <span className="text-red-700">*</span>
            </span>
            <input name="artist_name" className="rounded-md border border-gray-400 px-3 py-4" type="text" required />
          </div>
          <div className="flex flex-col py-4">
            <span className="mb-2 font-bold">
              Biography
              <span className="text-red-700">*</span>
            </span>
            <textarea name="bio" className="rounded-md border border-gray-400 px-3 py-4" rows={5} required />
          </div>
          <div className="flex flex-col py-4">
            <span className="mb-2 font-bold">
              Description
              <span className="text-red-700">*</span>
            </span>
            <textarea name="description" className="rounded-md border border-gray-400 px-3 py-4" rows={5} required />
          </div>
        </div>
        <div className="flex flex-row justify-end py-4">
          <button name="type" type="submit" value="artists" className="rounded-lg bg-orange-500 p-4 text-white">
            Create Artist
          </button>
        </div>
      </Form>
    </div>
  );
}

export default ArtistForm;
