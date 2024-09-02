/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
import { SearchResultItem } from './SearchResultItem';

interface ResultCardProps {
  searchResult: SearchResultItem;
  closeDialog: () => void;
}

export default ResultCardProps;
