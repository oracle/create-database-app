/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import ReactDatePicker from 'react-datepicker';

interface DateRangePickerProps {
  startDate: null | Date;
  endDate: null | Date;
  handleSetStartDate: (date : Date) => void;
  handleSetEndDate: (date : Date) => void;
}
/**
 *Provides a Date Picker Component
 * @param props the component props
 @returns the date picker component
 */
function DateRangePicker(props : DateRangePickerProps) {
  const {
    startDate, endDate, handleSetEndDate, handleSetStartDate,
  } = props;

  const DatePicker = ReactDatePicker.default;
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <DatePicker
        selected={startDate}
        onChange={handleSetStartDate}
        selectsStart
        className="mt-1 block w-full rounded-md border border-gray-400 p-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        placeholderText="Start date"
      />
      <DatePicker
        selected={endDate}
        onChange={handleSetEndDate}
        selectsEnd
        className="mt-1 block w-full rounded-md border border-gray-400 p-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        placeholderText="End date"
      />
    </div>
  );
}

export default DateRangePicker;
