# Contributing to this repository <!-- omit in toc -->

We welcome your contributions! There are multiple ways to contribute.

- [Conventions](#conventions)
- [Branch naming convention](#branch-naming-convention)
- [Opening issues](#opening-issues)
- [Contributing code](#contributing-code)
- [Pull request process](#pull-request-process)
- [Code of conduct](#code-of-conduct)

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

    - `p` when they are meant to represent parameters
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

## Opening issues

For bugs or enhancement requests, please file a GitHub issue unless it's
security related. When filing a bug remember that the better written the bug is,
the more likely it is to be fixed. If you think you've found a security
vulnerability, do not raise a GitHub issue and follow the instructions in our
[security policy](./SECURITY.md).

## Contributing code

We welcome your code contributions. Before submitting code via a pull request,
you will need to have signed the [Oracle Contributor Agreement][OCA] (OCA) and
your commits need to include the following line using the name and e-mail
address you used to sign the OCA:

```text
Signed-off-by: Your Name <you@example.org>
```

This can be automatically added to pull requests by committing with `--sign-off`
or `-s`, e.g.

```text
git commit --signoff
```

Only pull requests from committers that can be verified as having signed the OCA
can be accepted.

## Pull request process

1. Ensure there is an issue created to track and discuss the fix or enhancement
   you intend to submit.
1. Fork this repository.
1. Create a branch in your fork to implement the changes. We recommend using
   the issue number as part of your branch name, e.g. `1234-fixes`.
1. Ensure that any documentation is updated with the changes that are required
   by your change.
1. Ensure that any samples are updated if the base image has been changed.
1. Submit the pull request. *Do not leave the pull request blank*. Explain exactly
   what your changes are meant to do and provide simple steps on how to validate.
   your changes. Ensure that you reference the issue you created as well.
1. We will assign the pull request to 2-3 people for review before it is merged.

## Code of conduct

Follow the [Golden Rule](https://en.wikipedia.org/wiki/Golden_Rule). If you'd
like more specific guidelines, see the [Contributor Covenant Code of Conduct][COC].

[OCA]: https://oca.opensource.oracle.com
[COC]: https://www.contributor-covenant.org/version/1/4/code-of-conduct/
