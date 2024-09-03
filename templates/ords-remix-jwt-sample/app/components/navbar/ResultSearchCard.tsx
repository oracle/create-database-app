/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import {
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { useNavigate } from '@remix-run/react';
import { formatDate } from '../../utils/StringToDate';
import ResultCardProps from '../../models/ResultCardProps';

/**
 * The Result Card Component.
 * @param props the Result Card props.
 * @returns the Result Card Component.
 */
function ResultCard(props: ResultCardProps) {
  const { searchResult, closeDialog } = props;
  const navigate = useNavigate();
  return (
    <div className="flex">
      <Card className="flex flex-col p-8">
        <div className="flex flex-row items-center">
          <div className="flex w-1/3">
            <CardMedia
              component="img"
              alt="searchResult"
              className="rounded-full"
              image={searchResult.img}
            />
          </div>
          <CardContent className="flex w-2/3 grow flex-col items-center">
            <h1 className="font-sans text-lg font-medium">
              { searchResult.name }
            </h1>
            {
                searchResult.date
                && (
                  <p className="flex font-sans text-sm font-extralight">
                    { formatDate(searchResult.date) }
                  </p>
                )
              }
            {
                searchResult.description
                && (
                  <p className="flex font-sans text-sm font-extralight">
                    { searchResult.description }
                  </p>
                )
              }
            {
                searchResult.price
                && (
                  <p className="flex font-sans text-sm font-extralight">
                    { searchResult.price }
                  </p>
                )
              }
            {
                searchResult.followers
                && (
                  <p className="flex p-4 font-sans text-sm font-extralight">
                    { `${searchResult.followers.toLocaleString()}  followers`}

                  </p>
                )
              }
            <div className="flex justify-center">
              <button
                type="button"
                className="rounded-3xl border-2 border-orange-400 bg-orange-400 px-4 py-2 text-sm
                                font-semibold text-white hover:border-orange-300 hover:bg-orange-300"
                onClick={
                  () => {
                    closeDialog();
                    navigate(`/${searchResult.kind}/${searchResult.id}`);
                  }
                }
              >
                See More
              </button>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

export default ResultCard;
