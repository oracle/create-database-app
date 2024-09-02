/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { ErrorResponse } from '@remix-run/node';
import {
  useSearchParams,
  Form,
} from '@remix-run/react';
import { OrdsRed } from '../icons';
import featureDescriptions from '../../utils/ORDSFeaturesDescription';
import AccordionComponent from '../tooltips/Accordion';
import AuthenticationToolTip from '../tooltips/AuthenticationToolTipComponent';
import ErrorAccordionComponent from './ErrorAccordion';

interface ErrorPageProps {
  error : ErrorResponse

}

/**
 * Renders an error component when there is some kind of error in one our fetch queries.
 * @param props The error page props
 * @returns The error page with helpful details.
 */
function ErrorComponent(props: ErrorPageProps) {
  const { error } = props;
  const [searchParams] = useSearchParams();
  const enableTooltips = searchParams.has('tooltips');
  const errorTooltipDescription = featureDescriptions.errorTooltip;
  const HTTP_UNAUTHORIZED_CODE = 401;
  return (
    <div className="flex h-1/2 w-full flex-col items-center justify-center drop-shadow-xl">
      <div className="top-0 block w-32 flex-none translate-y-1/3 px-2">
        <OrdsRed width="8rem" height="8rem" />
      </div>
      <div className="flex max-w-3xl flex-col items-center justify-center rounded-2xl border-2 p-10">
        <h1 className="mb-10 text-pretty text-9xl font-bold text-red-600">
          {error.status}
        </h1>
        <h1 className="mb-8 break-all text-6xl font-semibold">
          {error.statusText}
        </h1>
        {
          error.data ? <ErrorAccordionComponent errorData={error.data} /> : ''
        }
        {
          error.status === HTTP_UNAUTHORIZED_CODE && (
            <div className="p-4">
              <Form method="post" action="/auth0">
                <button
                  className="rounded bg-red-600 px-8 py-2 text-white hover:bg-red-500"
                  type="submit"
                >
                  Sign In
                </button>
              </Form>
            </div>
          )
        }
      </div>
      {
        enableTooltips && (
        <div className="w-2/3 p-4">
          {
            error.status === HTTP_UNAUTHORIZED_CODE ? (
              <AuthenticationToolTip />
            ) : (
              <AccordionComponent
                featureProps={errorTooltipDescription}
              />
            )
}
        </div>
        )
      }
    </div>
  );
}

export default ErrorComponent;
