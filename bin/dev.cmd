:: Copyright (c) 2024, Oracle and/or its affiliates.
:: All rights reserved
:: Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/

@echo off

node --loader ts-node/esm --no-warnings=ExperimentalWarning "%~dp0\dev" %*