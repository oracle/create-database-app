/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
/* eslint-disable react/jsx-props-no-spreading */
import {
  Box, Tab, Tabs,
  styled,
} from '@mui/material';
import React from 'react';
import EventCard from './EventCard';
import ORDSResponse from '../../models/ORDSResponse';
import TabPanelProps from '../../models/TabPanelProps';
import ORDSConcert from '../../models/ORDSConcert';

const [today, tomorrow, dayAfterTomorrow] = [new Date(), new Date(), new Date()];
tomorrow.setDate(tomorrow.getDate() + 1);
dayAfterTomorrow.setDate(tomorrow.getDate() + 1);
const LAST_TAB = 2;

const isSameDayAsToday = (dateString: string, date: Date) => {
  const givenDate = new Date(dateString);
  return givenDate.getUTCFullYear() === date.getUTCFullYear()
           && givenDate.getUTCMonth() === date.getUTCMonth()
           && givenDate.getUTCDate() === date.getUTCDate();
};

const StyledTab = styled(Tab)({
  '&.Mui-selected': {
    color: '#000',
  },
});

/**
 * The Tab Pannel Component.
 * @param props the Tab Pannel props.
 * @returns the Tab Pannel Component.
 */
function CustomTabPanel(props: TabPanelProps) {
  const {
    children, value, index,
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <div>
          <div>{children}</div>
        </div>
      )}
    </div>
  );
}

/**
 * A message to indicate that no event was scheduled in a given date.
 * @returns No Events Scheduled Message Component.
 */
function NoEventsMessage() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="py-12 text-2xl font-medium uppercase">No events scheduled</h2>
    </div>
  );
}

const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

interface TimelineProps {
  events: ORDSResponse< ORDSConcert >;
}

/**
 * The Timeline Component.
 * @param props the Timeline props.
 * @returns the Timeline Component.
 */
function Timeline(props: TimelineProps) {
  const { events } = props;
  const [eventsToday, setEventsToday] = React.useState<ORDSConcert[]>([]);
  const [eventsTomorrow, setEventsTomorrow] = React.useState<ORDSConcert[]>([]);
  const [eventsAfter, setEventsAfter] = React.useState<ORDSConcert[]>([]);

  React.useEffect(() => {
    const filterEvents = (date: Date) => events.items.filter((item) => {
      const isSame = isSameDayAsToday(item.event_date, date);
      return isSame;
    });

    setEventsToday(filterEvents(today));
    setEventsTomorrow(filterEvents(tomorrow));
    setEventsAfter(filterEvents(dayAfterTomorrow));
  }, [events]);

  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="my-20 flex justify-center">
      <div className="flex w-full flex-col items-center">
        <h1 className="py-2 font-sans text-4xl">Events Near You</h1>
        <span className="py-2 font-sans text-2xl font-light">Welcome to the ultimate event experience!</span>
        <div className="my-10 w-4/6 justify-evenly">
          <Box sx={{
            borderBottom: 1,
            borderColor: 'divider',
          }}
          >
            <div className="text-black">
              <Tabs
                value={value}
                onChange={handleChange}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: '#000',
                    color: '#000',
                  },
                }}
              >
                <StyledTab className="w-1/3" label={today.toDateString()} {...a11yProps(0)} suppressHydrationWarning />
                <StyledTab className="w-1/3" label={tomorrow.toDateString()} {...a11yProps(1)} suppressHydrationWarning />
                <StyledTab className="w-1/3" label={dayAfterTomorrow.toDateString()} {...a11yProps(LAST_TAB)} suppressHydrationWarning />
              </Tabs>
            </div>
          </Box>
          <CustomTabPanel value={value} index={0}>
            { eventsToday.length > 0
              ? eventsToday.map((item) => (
                <div key={item.event_id} className="py-5">
                  <EventCard event={item} />
                </div>
              ))
              : <NoEventsMessage />}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            { eventsTomorrow.length > 0
              ? eventsTomorrow.map((item) => (
                <div key={item.event_id} className="py-5">
                  <EventCard event={item} />
                </div>
              ))
              : <NoEventsMessage />}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            { eventsAfter.length > 0
              ? eventsAfter.map((item) => (
                <div key={item.event_id} className="py-5">
                  <EventCard event={item} />
                </div>
              ))
              : <NoEventsMessage />}
          </CustomTabPanel>
        </div>
      </div>
    </div>
  );
}

export default Timeline;
