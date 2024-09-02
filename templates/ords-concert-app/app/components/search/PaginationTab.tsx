/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import {
  Button, Select, MenuItem, SelectChangeEvent,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import PaginationToolTip from '../tooltips/PaginationToolTipComponent';

interface PaginationTabProps {
  pageSize: number;
  handlePageSizeChange: (event: SelectChangeEvent<number>) => void;
  hasPrevPage:boolean;
  hasNextPage:boolean;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  enableTooltips:boolean;

}

/**
 * A Pagination Component
 * @param props the component props
 * @returns The Pagination tab component
 */
function PaginationTab(props : PaginationTabProps) {
  const {
    pageSize, handlePageSizeChange, hasPrevPage, hasNextPage, handleNextPage,
    handlePrevPage, enableTooltips,
  } = props;
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex flex-row">
        <div className="flex items-center justify-center">
          <p className="mx-4">Items per page: </p>
          <Select
            labelId="simple-select-page-size"
            id="simple-select-page-size"
            value={pageSize}
            label="Page size"
            onChange={handlePageSizeChange}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
          </Select>
        </div>
        <Button color="orange" onClick={handlePrevPage} disabled={!hasPrevPage} startIcon={<ChevronLeft />}>
          Previous
        </Button>
        <Button color="orange" onClick={handleNextPage} disabled={!hasNextPage} endIcon={<ChevronRight />}>
          next
        </Button>
      </div>
      {enableTooltips && <PaginationToolTip />}
    </div>

  );
}

export default PaginationTab;
