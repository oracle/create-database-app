/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import {
  Form,
  useLocation,
  useNavigate,
  useSearchParams,
} from '@remix-run/react';

/**
 * Renders the tooltip call to action button.
 * @returns The Tooltip button.
 */
function TooltipButton() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const areTooltipsEnabled = searchParams.has('tooltips');
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-0 w-full p-5">
      {
        areTooltipsEnabled ? (
          <Form navigate={false} preventScrollReset>
            <button
              type="submit"
              className="float-right rounded-lg border-2 border-red-500 bg-red-500 p-2 font-semibold text-white hover:border-red-400
                            hover:bg-red-400 hover:underline"
              name="kind"
              value="enable"
              onClick={() => {
                const params = new URLSearchParams(location.search);
                params.delete('tooltips');
                navigate(`${location.pathname}?${params}`);
              }}
            >
              Disable Tooltips
            </button>
          </Form>
        ) : (
          <Form navigate={false} preventScrollReset>
            <button
              type="submit"
              className="float-right rounded-lg border-2 border-green-500 bg-green-500 p-2 font-semibold text-white hover:border-green-400
                            hover:bg-green-400 hover:underline"
              name="kind"
              value="enable"
              onClick={() => {
                navigate(`${location.pathname}${location.search ? `${location.search}&tooltips` : '?tooltips'}`);
              }}
            >
              Enable Tooltips
            </button>
          </Form>
        )
        }
    </div>
  );
}

export default TooltipButton;
