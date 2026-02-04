# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.6.1] - 2026-02-04

### Changed

- General update of dependencies.

### Security

- #386 Addressed [CVE GHSA-3cgp-3xvw-98x8](https://osv.dev/vulnerability/GHSA-3cgp-3xvw-98x8).

## [1.6.0] - 2025-07-24

### Added

- Introducing a new template that showcases REST API development with Oracle REST Data Services (ORDS) and the Oracle Database Multilingual Engine (MLE).

### Changed

- `node-angular` template migrated from Angular `v19.2` to `v20.x`.
- General update of dependencies.

## [1.5.1] - 2025-05-19

### Added

- Introducing a new template that leverages the Oracle Database [Multilingual Engine (MLE)](https://docs.oracle.com/en/database/oracle/oracle-database/23/mlejs/introduction-to-mle.html) to showcase the development of data-centric applications.

### Changed

- Optimized package size.

## [1.5.0] – Unpublished
**Note:** Originally published as a beta release, then unpublished from NPM.

## [1.4.1] - 2025-04-23

### Changed

- General update of dependencies.
- #225 Fixed 'Rate exceeded' errors in the npm run migrate command of the ords-remix-jwt-sample template.
- #265 `node-jet` template migrated from `v17.1` to `18.0`.
- #266 `node-angular` template migrated from `v19.1` to `v19.2`.

## [1.4.0] - 2025-01-28

### Changed

- General update of dependencies.
- Templates migrated to use ESLint v9 with flat config.
- #204 `node-vue` template migrated from `v3.3` to `v3.5`.
- #203 `node-angular` template migrated from `v18.2` to `v19.1`.
- #200 `node-react` and #201 `node-react-todo` templates migrated from `v18.2` to `v19.0`.
- #199 `node-jet` template migrated to `v17.1`, and fixed incorrect references to the CDN pointing to an outdated version.
- #197 `ords-remix-jwt-sample` adopted use of Vite instead of the Remix Classic Compiler.

### Removed

- #156 Removed Basic authentication from the `ords-remix-jwt-sample` template.

### Security

- #198 Addressed [CVE GHSA-3xgq-45jj-v275](https://osv.dev/vulnerability/GHSA-3xgq-45jj-v275) by updating `cross-spawn` to `v7.0.6`

## [1.3.1] - 2024-09-05

### Fixed

- Missing `.gitignore` in `ords-remix-jwt-sample` template.

## [1.3.0] - 2024-09-04

### Added

- New ORDS JWT sample template built with [Remix](https://remix.run/).

### Changed

- Upgrade dependencies for generator and templates.

## [1.2.1] - 2024-08-27

### Fixed

- Error when generating `node-jet` application (#91).
- Unable to use `--template` flag for `node-jet` and `node-angular` templates (#92).

## [1.2.0] - 2024-08-19

### Added

- New [Angular](https://angular.dev/) template built with [Angular CLI](https://github.com/angular/angular-cli).

### Changed

- Reskin of `node-react-todo` app/template.
- Improved handling of flags in the CLI.
- General improvements.

## [1.1.11] - 2024-07-19

### Security

- Uptake newer dependencies to fix vulnerabilities detected in npm audit.

## [1.1.10] - 2024-07-10

### Changed

- Change todo template name from `node-todo` to `node-react-todo` in the documentation.

## [1.1.9] - 2024-07-10

### Fixed

- Fix README examples with missing `--` argument.

## [1.1.8] - 2024-07-10

### Added

- First public release. Full Changelog: https://github.com/oracle/create-database-app/commits/v1.1.8
