/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import React from 'react';
import ORDSResponse from '../../models/ORDSResponse';
import ORDSConcert from '../../models/ORDSConcert';

interface ConcertDetailsProps {
  concert: ORDSResponse<ORDSConcert>;
}

/**
 * The Concert Details Component.
 * @param props the countdown props.
 * @returns the Concert Details Component.
 */
function ConcertDetails(props: ConcertDetailsProps) {
  const { concert } = props;
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const concertDate = new Date(concert.items[0].event_date);
  const concertDateString = `${monthNames[concertDate.getMonth()]} ${concertDate.getDay()}, 
    ${concertDate.getFullYear()}`;
  return (
    <>
      <div className="flex w-full flex-row p-8 text-center">
        <div className="flex w-full flex-col">
          <h1 className="mb-5 text-center text-4xl font-bold">
            Event Details
          </h1>
          <p>
            Get Ready: Experience the Extraordinary! 🎉🎉🎉
          </p>
        </div>
      </div>
      <div className="flex w-full flex-row p-4 text-center">
        <div className="flex w-3/4 flex-col p-8">
          <h1 className="mb-5 text-justify text-xl font-bold">
            Venue
          </h1>
          <p className="mb-2 text-justify font-normal">
            {concert.items[0].venue_name}
            {' '}
            - 4 Pennsylvania Plaza, New York, NY 10001, USA
          </p>
          <h1 className="mb-5 text-justify text-xl font-bold">
            Additional Details
          </h1>
          <p className="mb-2 text-justify font-normal">
            {`Get ready for an unforgettable evening with ${concert.items[0].artist_name}!
                    Join us at ${concert.items[0].venue_name} on ${concertDateString} for a night of incredible
                    music and electrifying performances.
                    Enjoy a fantastic atmosphere, great company, and exclusive merchandise.
                    Don’t miss your chance to see ${concert.items[0].artist_name} live.
                    Secure your tickets now and experience a night to remember!`}
          </p>
          <h1 className="mb-5 text-justify text-xl font-bold">
            Biography
          </h1>
          <p className="mb-2 text-justify font-normal">
            A legendary singer known for their powerful voice and numerous hit songs.
            Despite facing numerous challenges, their talent and perseverance led them to success.
          </p>
          <h1 className="mb-5 text-justify text-xl font-bold">
            Reviews
          </h1>
          <p className="text-justify font-normal">
            Coming soon™️ 😉
          </p>
        </div>
        <div className="flex w-1/3 flex-col p-8">
          <h1 className="mb-5 text-justify text-xl font-bold">
            10,000 people going 😱
          </h1>
          <h1 className="mb-5 text-justify text-xl font-bold">
            95,000 people interested 🔥🔥🔥
          </h1>
        </div>
      </div>
    </>

  );
}

export default ConcertDetails;
