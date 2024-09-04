/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import React from 'react';
import { useSearchParams } from '@remix-run/react';
import ConcertCard from './ConcertCard';
import Timer from '../homepage/Timer';
import ORDSResponse from '../../models/ORDSResponse';
import ORDSConcert from '../../models/ORDSConcert';
import featureDescriptions from '../../utils/ORDSFeaturesDescription';
import TooltipComponent from '../tooltips/TooltipComponent';

interface CountdownProps {
  concert: ORDSResponse<ORDSConcert>;
}

/**
 * The Concert Countdown Component.
 * @param props the countdown props.
 * @returns the Concert Countdown Component.
 */
function ConcertCountdown(props: CountdownProps) {
  const { concert } = props;
  const [searchParams] = useSearchParams();
  const enableTooltips = searchParams.has('tooltips');
  return (
    <div className="w-full justify-center p-5">
      <div className="flex w-full flex-col content-between rounded-md border bg-white">
        <ConcertCard concert={concert.items[0]} />
        <div className="flex basis-1/4 flex-row items-center bg-gray-200 p-5">
          <h1 className="basis-1/4 text-3xl font-light">
            Count every
            <br />
            second until
            {' '}
            <br />
            the event
          </h1>
          <Timer concertDate={concert.items[0].event_date} />
          {
            enableTooltips && (
              <TooltipComponent
                featureProps={featureDescriptions.getDatesTooltip}
                width="40px"
                height="40px"
              />
            )
          }
        </div>
      </div>
    </div>
  );
}

export default ConcertCountdown;
