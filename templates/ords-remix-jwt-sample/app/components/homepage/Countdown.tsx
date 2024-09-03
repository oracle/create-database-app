/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import { useFetcher, useSearchParams } from '@remix-run/react';
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react';
import { EngineType } from 'node_modules/embla-carousel/esm/components/Engine';
import { EmblaCarouselType } from 'embla-carousel';
import { Typography } from '@mui/material';
import Carousel from './Carousel';
import Timer from './Timer';
import { loader } from '../../routes/resources.concerts';
import ORDSResponse from '../../models/ORDSResponse';
import { NavigationState } from '../../utils/NavigationState';
import ORDSConcert from '../../models/ORDSConcert';
import AccordionComponent from '../tooltips/Accordion';
import TooltipTextComponent from '../tooltips/TooltipTextComponent';
import featureDescriptions from '../../utils/ORDSFeaturesDescription';
import { Ords } from '../icons';
import TooltipComponent from '../tooltips/TooltipComponent';

interface CountdownProps {
  events: ORDSResponse<ORDSConcert>
}

interface CountdownComponentProps {
  events: ORDSConcert[];
  slide : number;
  emblaRef:UseEmblaCarouselType[0];
  hasMoreConcerts:boolean;
  loadingMore:boolean;

}

/**
 * An empty card in case the Artist does not have any concerts.
 * @returns the Empty Body Component.
 */
function EmptyComponent() {
  return (
    <h1 className="text-4xl font-medium">Artist has no events!</h1>
  );
}

/**
 * A component to render a countdown for an event.
 * @param props The Countdown Component Props.
 * @returns the Countdown Component.
 */
function CountdownComponent(props: CountdownComponentProps) {
  const {
    events, slide, emblaRef, hasMoreConcerts, loadingMore,
  } = props;
  const [searchParams] = useSearchParams();
  const enableTooltips = searchParams.has('tooltips');
  const paginationToolTipDescription = featureDescriptions.paginationTooltip;
  const collectionQueryTooltipDescription = featureDescriptions.collectionQueryTooltip;
  const itemsPerPageToolTipDescription = featureDescriptions.itemsPerPageTooltip;
  return (
    <div>
      <div className="flex w-full flex-col content-between rounded-md border bg-white">
        <div className="flex basis-3/4 flex-row items-center p-5">
          <div className="flex p-4">
            <p className="font-serif text-4xl">
              Welcome to
              <br />
              the ultimate
              <br />
              event
              <br />
              experience!
            </p>
          </div>
          <Carousel
            concerts={events}
            emblaRef={emblaRef}
            hasMoreConcerts={hasMoreConcerts}
            loadingMore={loadingMore}
            enableTooltips={enableTooltips}
          />
        </div>
        {
          enableTooltips && (
          <AccordionComponent
            featureProps={paginationToolTipDescription}
          >
            <div className="flex flex-row items-center">
              <div className="w-32 flex-none px-2">
                <Ords />
              </div>
              <div className="flex-col align-middle">
                <Typography component="div" variant="body2" color="text.secondary">
                  The ORDS response we get from the
                  {' '}
                  <Typography variant="body2" color="text.secondary" display="inline" sx={{ textDecoration: 'underline' }}>
                    /euser/v1/eventsHome
                  </Typography>
                  {' '}
                  <TooltipTextComponent anchorText="Collection Query Endpoint" featureProps={collectionQueryTooltipDescription} />
                  {' '}
                  contains some helpful metadata parameters like
                  {' '}
                  <Typography variant="body2" color="text.secondary" display="inline" sx={{ textDecoration: 'underline' }}>
                    hasMore
                  </Typography>
                  {' '}
                  <Typography variant="body2" color="text.secondary" display="inline" sx={{ textDecoration: 'underline' }}>
                    count
                  </Typography>
                  {' '}
                  <Typography variant="body2" color="text.secondary" display="inline" sx={{ textDecoration: 'underline' }}>
                    limit
                  </Typography>
                  {' and '}
                  <Typography variant="body2" color="text.secondary" display="inline" sx={{ textDecoration: 'underline' }}>
                    offset
                  </Typography>
                  {', '}
                  which allows us to determine if there are more records to query. So, once we
                  reach the last slide on the Carousel we can make another fetch call to get more
                  concerts to display.
                  <br />
                </Typography>
                <Typography component="div" variant="body2" color="text.secondary">
                  Once you reach the last slide on the carousel and you try to get more
                  concerts, a fetch request to the
                  {' '}
                  <Typography variant="body2" color="text.secondary" display="inline" sx={{ textDecoration: 'underline' }}>
                    /euser/v1/eventsHome?offset=OFFSET
                  </Typography>
                  {' '}
                  endpoint will be made and  the Carousel will be
                  updated with the newly created slides.
                  <br />
                  For this GET Request, we use the
                  {' '}
                  <TooltipTextComponent anchorText="p_items_per_page" featureProps={itemsPerPageToolTipDescription} />
                  {' '}
                  handler parameter as well as the number of slides in the carousel to determine
                  the offset value we must use to get the next concerts.
                </Typography>
              </div>
            </div>
          </AccordionComponent>

          )
        }
        <div className="flex basis-1/4 flex-row items-center bg-gray-200 p-5">
          <h1 className="basis-1/4 text-3xl font-light">
            Count every
            <br />
            second until
            {' '}
            <br />
            the event
          </h1>
          <Timer concertDate={events[slide] !== undefined ? events[slide].event_date : ''} />
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

/**
 * The Countdown Component.
 * @param props the Countdown props.
 * @returns the Countdown Component.
 */
function Countdown(props: CountdownProps) {
  const { events } = props;
  const [actualConcerts, setActualConcerts] = useState<ORDSConcert[]>(events.items);
  const hasMoreConcertsToLoadRef = useRef(events.hasMore);
  const scrollListenerRef = useRef<() => void>(() => undefined);
  const [hasMoreConcerts, setHasMoreConcerts] = useState<boolean>(events.hasMore);
  const fetcher = useFetcher<typeof loader>();
  const [slide, setSlide] = React.useState(0);
  const listenForScrollRef = useRef(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    watchSlides: (emblaAPI) => {
      const reloadEmbla = (): void => {
        const oldEngine = emblaAPI.internalEngine();

        emblaAPI.reInit();
        const newEngine = emblaAPI.internalEngine();
        const copyEngineModules: (keyof EngineType)[] = [
          'scrollBody',
          'location',
          'offsetLocation',
          'target',
        ];
        copyEngineModules.forEach((engineModule) => {
          Object.assign(newEngine[engineModule], oldEngine[engineModule]);
        });

        newEngine.translate.to(oldEngine.location.get());
        const { index } = newEngine.scrollTarget.byDistance(0, false);
        newEngine.index.set(index);
        newEngine.animation.start();

        setLoadingMore(false);
        listenForScrollRef.current = true;
      };

      const reloadAfterPointerUp = (): void => {
        emblaAPI.off('pointerUp', reloadAfterPointerUp);
        reloadEmbla();
      };

      const engine = emblaAPI.internalEngine();

      if (hasMoreConcertsToLoadRef.current && engine.dragHandler.pointerDown()) {
        const boundsActive = engine.limit.reachedMax(engine.target.get());
        engine.scrollBounds.toggleActive(boundsActive);
        emblaAPI.on('pointerUp', reloadAfterPointerUp);
      } else {
        reloadEmbla();
      }
    },
  });

  const logSlidesInView = useCallback((embla: EmblaCarouselType) => {
    const slideInView = embla.slidesInView()[0];
    const handleSlide = (slideNumber: number) => {
      setSlide(slideNumber);
    };
    handleSlide(slideInView);
  }, []);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('scroll', logSlidesInView);
    }
  }, [emblaApi, logSlidesInView]);
  useEffect(() => {
    if (!fetcher.data || fetcher.state === NavigationState.LOADING) {
      return;
    }
    if (fetcher.data) {
      const newConcerts = fetcher.data.events as ORDSResponse<ORDSConcert>;
      setHasMoreConcerts(newConcerts.hasMore);
      setActualConcerts((prevConcerts) => [...prevConcerts, ...newConcerts.items]);
    }
  }, [fetcher.data, fetcher.state]);

  const onScroll = useCallback((emblaAPI: EmblaCarouselType) => {
    if (!listenForScrollRef.current) return;
    setLoadingMore((initialLoadingMore) => {
      const lastSlide = emblaAPI.slideNodes().length - 1;
      const lastSlideInView = emblaAPI.slidesInView().includes(lastSlide);
      const loadMore = !initialLoadingMore && lastSlideInView;
      const MAX_NUMBER_SLIDES = 30;
      if (loadMore && hasMoreConcerts && lastSlide < MAX_NUMBER_SLIDES) {
        listenForScrollRef.current = false;
        const offset = lastSlide;
        const query = `/resources/concerts?offset=${offset}`;
        fetcher.load(query);
      }

      return initialLoadingMore || lastSlideInView;
    });
  }, [fetcher, hasMoreConcerts]);

  const addScrollListener = useCallback(
    (emblaAPI: EmblaCarouselType) => {
      scrollListenerRef.current = () => onScroll(emblaAPI);
      emblaAPI.on('scroll', scrollListenerRef.current);
    },
    [onScroll],
  );

  useEffect(() => {
    if (!emblaApi) return;
    addScrollListener(emblaApi);

    const onResize = () => emblaApi.reInit();
    window.addEventListener('resize', onResize);
    emblaApi.on('destroy', () => window.removeEventListener('resize', onResize));
  }, [emblaApi, addScrollListener]);

  return (
    <div className="my-20 flex flex-row justify-center p-5">
      { actualConcerts.length > 0
        ? (
          <CountdownComponent
            events={actualConcerts}
            slide={slide}
            emblaRef={emblaRef}
            hasMoreConcerts={hasMoreConcerts}
            loadingMore={loadingMore}
          />
        )
        : <EmptyComponent />}
    </div>
  );
}

export default Countdown;
