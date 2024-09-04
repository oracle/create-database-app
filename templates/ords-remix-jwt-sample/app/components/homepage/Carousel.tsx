/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
/* This rule was disabled to properly define embla carousel styles. */
/* eslint-disable tailwindcss/no-custom-classname */
import { UseEmblaCarouselType } from 'embla-carousel-react';
import { CircularProgress } from '@mui/material';
import ConcertCard from './ConcertCard';
import ORDSConcert from '../../models/ORDSConcert';

interface CarouselProps {
  concerts: ORDSConcert[];
  emblaRef: UseEmblaCarouselType[0];
  hasMoreConcerts:boolean;
  loadingMore:boolean;
  enableTooltips:boolean;
}

/**
 * The Carousel Component.
 * @param props the Carousel props.
 * @returns the Carousel Component.
 */
function Carousel(props: CarouselProps) {
  const {
    concerts, emblaRef, hasMoreConcerts, loadingMore, enableTooltips,
  } = props;
  return (
    <div className="m-auto max-w-3xl">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {concerts.map((item) => (
            <div key={item.event_id} className="min-w-0 flex-embla-slide">
              <ConcertCard
                concert={item}
                enableTooltips={enableTooltips}
              />
            </div>
          ))}
          {hasMoreConcerts && (
            <div
              className={'min-w-0 flex-initial w-60 justify-center items-center'.concat(
                loadingMore ? ' flex' : '',
              )}
            >
              <CircularProgress style={{
                width: '15rem',
                height: '15rem',
              }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
