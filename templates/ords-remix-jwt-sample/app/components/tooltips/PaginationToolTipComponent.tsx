/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { Typography } from '@mui/material';
import featureDescriptions from '../../utils/ORDSFeaturesDescription';
import AccordionComponent from './Accordion';
import { Ords } from '../icons';
/**
 * The admin tooltip component, describes the admin actions workflow.
 * @returns the Admin Actions Tooltip Component.
 */
function PaginationToolTip() {
  const { PaginationTooltipDescription } = featureDescriptions;

  return (
    <AccordionComponent
      featureProps={PaginationTooltipDescription}
    >
      <div className="flex flex-row items-center">
        <div className="w-32 flex-none px-2">
          <Ords />
        </div>
        <div className="flex-col align-middle">
          <Typography component="div" variant="body2" color="text.secondary">
            {
            'The response we get from the ORDS Concert App API endpoints contains the necessary information to implement pagination in the application. Here\'s how each part of the response helps with pagination:'
            }
          </Typography>
          <Typography variant="body2" color="text.secondary" display="inline" fontWeight="bold">
            Key Components of the API Response:
          </Typography>
          <br />
          <ul className="list-disc px-8">
            <li>
              <Typography variant="body2" color="text.secondary" display="inline" fontWeight="bold">
                haMore:
              </Typography>
              {' '}
              <Typography component="div" variant="body2" color="text.secondary" display="inline">
                This boolean value indicates whether there are more records available beyond
                the current set. If
                {' '}
                <code>true</code>
                , it means additional pages of data can be fetched, enabling continued pagination.
              </Typography>
            </li>
            <li>
              <Typography variant="body2" color="text.secondary" display="inline" fontWeight="bold">
                limit:
              </Typography>
              {' '}
              <Typography component="div" variant="body2" color="text.secondary" display="inline">
                This represents the maximum number of items returned per page. In this case, the
                {' '}
                <code>limit</code>
                {' '}
                is set to 25, meaning each page will contain up to 25 items.
              </Typography>
            </li>
            <li>
              <Typography variant="body2" color="text.secondary" display="inline" fontWeight="bold">
                offset:
              </Typography>
              {' '}
              <Typography component="div" variant="body2" color="text.secondary" display="inline">
                The
                {' '}
                <code>offset</code>
                {' '}
                indicates the starting point (index) for the current set of data. An
                <code>offset</code>
                {' '}
                of 0 means the data starts from the first record. As you navigate through pages, the
                <code>offset</code>
                {' '}
                value will increase by the
                <code>limit</code>
                {' '}
                (e.g., 0, 5, 10, etc.) to fetch the next set of records.
              </Typography>
            </li>
            <li>
              <Typography variant="body2" color="text.secondary" display="inline" fontWeight="bold">
                count:
              </Typography>
              {' '}
              <Typography component="div" variant="body2" color="text.secondary" display="inline">
                This shows the number of items returned in the current response.
                Here, it is 25, which matches the
                {' '}
                <code>limit</code>
                , indicating that this page is full.
              </Typography>
            </li>
            <li>
              <Typography variant="body2" color="text.secondary" display="inline" fontWeight="bold">
                links:
              </Typography>
              {' '}
              <Typography component="div" variant="body2" color="text.secondary" display="inline">
                The
                {' '}
                <code>links</code>
                {' '}
                array provides URLs that help navigate through the paginated data:
                <ul className="list-disc px-8">
                  <li>
                    The
                    {' '}
                    <code>self</code>
                    {' '}
                    link points to the current page of data.
                  </li>
                  <li>
                    The
                    {' '}
                    <code>next</code>
                    {' '}
                    link provides the URL for the next page of data, where the
                    {' '}
                    <code>offset</code>
                    {' '}
                    is updated to fetch the next set of items. This link is only present
                    in the response if the result set has a next page.
                  </li>
                  <li>
                    The
                    {' '}
                    <code>prev</code>
                    {' '}
                    link provides the URL for the previous page of data, where the
                    {' '}
                    <code>offset</code>
                    {' '}
                    is updated to fetch the previous set of items. This link is only present
                    in the response if the result set has a previous page.
                  </li>
                  <li>
                    The
                    {' '}
                    <code>first</code>
                    {' '}
                    link points to the first page of data.
                  </li>
                </ul>
                <br />
                <Typography variant="body2" color="text.secondary" display="inline">
                  With this response, the ORDS Concert App implements pagination  by using
                  following approach:
                </Typography>
                <br />
                <ul className="list-disc px-8">
                  <li>
                    <Typography variant="body2" color="text.secondary" display="inline" fontWeight="bold">
                      Initial Data Fetch:
                    </Typography>
                    {' '}
                    <Typography component="div" variant="body2" color="text.secondary" display="inline">
                      Start by fetching the first page of data with an
                      {' '}
                      <code>offset</code>
                      {' '}
                      of 0.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" color="text.secondary" display="inline" fontWeight="bold">
                      Handling Next Page:
                    </Typography>
                    {' '}
                    <Typography component="div" variant="body2" color="text.secondary" display="inline">
                      If the
                      {' '}
                      <code>hasMore</code>
                      {' '}
                      value is
                      {' '}
                      <code>true</code>
                      , then the Next button in the pagination component is enabled.
                      When the user clicks the Next button a fetch requests is
                      performed by Remix to fetch the next page of data.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" color="text.secondary" display="inline" fontWeight="bold">
                      Handling Previous Page:
                    </Typography>
                    {' '}
                    <Typography component="div" variant="body2" color="text.secondary" display="inline">
                      If the
                      {' '}
                      <code>prev</code>
                      {' '}
                      link is present in the response
                      {' '}
                      the Previous button is enabled. and  decrement the
                      <code>offset</code>
                      {' '}
                      by the
                      <code>limit</code>
                      {' '}
                      and make a new request to fetch the previous set of items.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" color="text.secondary" display="inline" fontWeight="bold">
                      Items per page:
                    </Typography>
                    {' '}
                    <Typography component="div" variant="body2" color="text.secondary" display="inline">
                      The ORDS Concert App allows you to adjust the
                      {' '}
                      <code>limit</code>
                      {' '}
                      parameter accordingly in the API request.
                    </Typography>
                  </li>
                </ul>
              </Typography>
            </li>
          </ul>
        </div>
      </div>
    </AccordionComponent>
  );
}

export default PaginationToolTip;
