# Contributing <!-- omit in toc -->

## Table of contents <!-- omit in toc -->

- [Conventions](#conventions)
- [Branch naming convention](#branch-naming-convention)

## Conventions

- Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):
    Commit messages should be meaningful since some of them will end up in the
    product's changelog and the product version will automatically change based
    on them. See [Angular.js Commit Message Format](https://gist.github.com/brianclements/841ea7bffdb01346392c)
    for an example of how this is used on the industry.

    The following commit types are supported and enforced:

    - `build`: Changes that affect the build system or external dependencies
    - `dx`: Changes affecting the developer experience of the product
    - `chore` (Prefer `refactor` instead): Generic changes that don't introduce
        product changes
    - `ci`: Changes on the Continuous Integration
    - `doc`: Changes to the product documentation
    - `feat`: A new feature
    - `fix`: A bugfix
    - `perf`: Changes that improve performance
    - `refactor`: Changes that do not add a feature or a fix
    - `revert`: Changes that revert a previous commit
    - `style`: Changes to the product CSS styles
    - `test`: Changes to the product tests

- Use [Semantic Versioning](https://semver.org/): The groups of digits in the
    product versions should convey compatibility
- Commit as often as possible, making commits to have a specific purpose and
  commit only the files that fulfill such purpose
- Variable names (excluding exported variables and class members) should be
    prefixed by one of the following:

    - `p` when they're meant to represent parameters
    - `l` when they're meant to be used only in the local scope
    - `g` when they're meant to be used by all of the file's scopes

- When prefixed, variable names after such prefix should be full words, using
    camel case with an uppercase first letter (e.g. `lMyVariableName` ).
    Exceptions are allowed for iterators, such as the use of `i` to represent
    the index in a loop.
- Variable names should be descriptive but not excessively so.

## Branch naming convention

Use the following the naming branch naming convention:

    ```txt
    issue-ISSUE_NUMBER-ISSUE_TITLE
    ```

- `issue`: This prefix indicates that the branch is related to an issue or a task.
- `ISSUE_NUMBER`: This part represents the unique identifier of the issue or
  task in our project management system.
- `ISSUE_TITLE`: This part provides a brief description of the issue or task,
  helping to understand the purpose of the branch.

## Semantic release

For more information about semantic release check [this link](https://github.com/semantic-release/semantic-release)
