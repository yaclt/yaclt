# Release 2.5.3 - 2021-11-30

## FIXED

- [FIXED] Trim extra newlines from end of default template {#185}

---

# Release 2.5.2 - 2021-11-17

## IMPROVED

- [IMPROVED] Added additional tests for utils module {#30}
- [IMPROVED] Add additional tests for utils module {#30}
- [IMPROVED] Add test for strategies module {#30}

## FIXED

- [FIXED] Fixed `$EDITOR` handling when it contains arguments (e.g. `EDITOR="code --wait"`) {#183}

---

# Release 2.5.1 - 2021-10-08

## IMPROVED

- [IMPROVED] Add additional test coverage {#30}
- [IMPROVED] Check if release branch exists before attempting to create it {#160}

## NEW

- [NEW] Add support for edit flag to prepare-release command {#129}

---

# Release 2.5.0 - 2021-10-04

## IMPROVED

- [IMPROVED] Change `PrepareReleaseStrategy` abstract class to an interface {#131}
- [IMPROVED] Allowed config files to be "hidden files" by starting the name with a dot {#164}
- [IMPROVED] Add pre-push git hook to validate changelogs {#142}
- [IMPROVED] Dependabot: Bump ansi-regex from 5.0.0 to 5.0.1 {#174}
- [IMPROVED] Configured pipeline for test and refactored test files {#30}

## NEW

- [NEW] Enabled jest and added test for string-utils, template-utils {#30}

---

# Release 2.4.1 - 2021-09-20

## IMPROVED

- [IMPROVED] Update bug issue template to remove irrelevant prompts {#149}
- [IMPROVED] Add a fun ASCII logo to the version info {#165}
- [IMPROVED] Sort JS-only options to bottom of tables in COMMANDS.md {#166}
- [IMPROVED] Provide a default value for `--validationPattern` that corresponds to the default value of `--format`, and log a warning if using the default value of one but not the other {#163}

---

# Release 2.4.0 - 2021-09-13

## NEW

- [NEW] Add support for user-defined entry file names {#127}

---

# Release 2.3.0 - 2021-09-12

## IMPROVED

- [IMPROVED] Fix typo in function name, change `relativeize` to `relativize` {#130}
- [IMPROVED] Enhanced README.md {#151}
- [IMPROVED] Replace `required` property with `demandOption` since `required` is deprecated in `yargs` {#152}
- [IMPROVED] Move shebang line into source and remove `shebangify.js` from build script {#153}

## NEW

- [NEW] Add middleware to check for options not known to any command {#155}

---

# Release 2.2.0 - 2021-09-10

## IMPROVED

- [IMPROVED] Run CI for PRs {#133}
- [IMPROVED] Move `@types/luxon` to `devDependencies` instead of `dependencies` {#118}
- [IMPROVED] Improve `CONTRIBUTING.md` and add `CODEOWNERS` file {#143}
- [IMPROVED] Update Code of Conduct {#146}
- [IMPROVED] Update `yacltrc.js` to allow preparing releases with a version change in `package.json` {#148}
- [IMPROVED] Upadated PR template to make sure people are reading the contributing guidelines {#137}

---

# Release 2.1.0 - 2021-09-07

## IMPROVED

- [IMPROVED] Add changelog validation to CI {#122}
- [IMPROVED] Hijack `console` methods to use `Logger` for formatting when invoked from a JS config file {#117}

---

# Release 2.0.4 - 2021-09-01

## FIXED

- [FIXED] Fix checking out release branch when `releaseBranchPattern` is set {#114}

---

# Release 2.0.3 - 2021-09-01

## FIXED

- [FIXED] Fix typo in work 'committing' {#112}

---

# Release 2.0.2 - 2021-08-30

## FIXED

- [FIXED] Use `path.resolve` to avoid module not found error for global config files {#109}

---

# Release 2.0.1 - 2021-08-29

## FIXED

- [FIXED] Remove remaining references to `moment` {#107}

---

# Release 2.0.0 - 2021-08-29

## IMPROVED

- [IMPROVED] Remove `handlebars-helpers` and `moment` and replace with a custom `timestamp` helper using Luxon {#105}

---

# Release 1.1.2 - 2021-08-29

## FIXED

- [FIXED] Update `prepare-release` command to support optional change type tags {#103}

---

# Release 1.1.1 - 2021-08-29

## IMPROVED

- [IMPROVED] Add `-q` as shorthand for `--quiet`, `-v` as shorthand for `--verbose`, and `-p` as shorthand for `--plumbing` {#101}

---

# Release 1.1.0 - 2021-08-28

## IMPROVED

- [IMPROVED] Make changeType tags optional by removing the Handlebars variable from the format string {#85}

## NEW

- [NEW] Add more advanced logger and configurable log levels {#98}

---

# Release 1.0.0 - 2021-08-21

## IMPROVED

- [IMPROVED] Replace emojis with standard unicode characters and color error and warning output {#88}
- [IMPROVED] Replace all direct shell calls to git with isomorphic-git {#89}
- [IMPROVED] Refactor hooks architecture to be much more configurable and less brittle {#79}

---

# Release 0.8.1 - 2021-08-12

## FIXED

- [FIXED] Fix misspelled "releaesNumber" argument to "releaseNumber" {#90}

---

# Release 0.8.0 - 2021-08-10

## IMPROVED

- [IMPROVED] Add recommendCommands() option to CLI builder {#74}

## NEW

- [NEW] Add option + middleware handler to set message from last commit message {#82}
- [NEW] Add --plumbing option to minimize output for scripting purposes {#86}

---

# Release 0.7.0 - 2021-08-05

## NEW

- [NEW] Add pre- and post- command hooks {#76}

---

# Release 0.6.3 - 2021-08-05

## FIXED

- [FIXED] disable postinstall when not installing locally {#72}

---

# Release 0.6.2 - 2021-07-24

## IMPROVED

- [IMPROVED] Remove unused dependency and add postinstall script for husky install {#70}

---

# Release 0.6.1 - 2021-07-24

## IMPROVED

- [IMPROVED] Add documentation to README.md about features added in 0.6.0 {#68}

---

# Release 0.6.0 - 2021-07-24

## NEW

- [NEW] Allow any CLI option to be a function {#62}
- [NEW] Add a new util function to handle compiling markdown templates {#61}
- [NEW] Add middleware to allow Handlebars template options to be filepaths to read from {#64}

## FIXED

- [FIXED] Fix breaklines for changelog MD files {#61}

---

# Release 0.5.2 - 2021-07-02

## NEW

- [NEW] Add script to automate releases {#39}

## FIXED

- [FIXED] Fix removal of individual entries {#58}

---

# Release 0.5.2 - 2021-07-01

## NEW

- [NEW] Remove changelog entries via globbing pattern {#54}

---

# Release 0.5.1 - 2021-07-01

## NEW

- [NEW] Add flag --edit to open $EDITOR if defined {#51}

---

# Release 0.5.0 - 2021-07-01

## FIXED

- [FIXED] Add newline to end of default CHANGELOG.md template {#47}

## NEW

- [NEW] Add option to automatically checkout new branch during release {#37}

---

# Release 0.4.2 - 2021-06-22

## NEW

- [NEW] Add required --validationPattern argument for validate and prepare-release commands {#45}

---

# Release 0.4.1 - 2021-06-22

## FIXED

- [FIXED] Fix new entry filename format timestamp to be YYYY-MM-DD_HH-mm-ss.md {#43}

---

# Release 0.4.0 - 2021-06-22

## FIXED

- [FIXED] Abort prepare-release if changelogs are invalid {#35}

## NEW

- [NEW] Add automated documentation generation {#31}

---

# Release 0.3.0 - 2021-06-21

## NEW

- [NEW] Add support for global config files {#32}

---

# Release 0.2.1 - 2021-06-21

## NEW

- [NEW] Implement completions for fish shell {#28}

---

# Release 0.2.0 - 2021-06-21

## IMPROVED

- [IMPROVED] Document handlebars variables in README.md {#24}

## NEW

- [NEW] Implement bash completions {#26}

---

# Release 0.0.3 - 2021-06-21

## FIXED

- [FIXED] Update version numbering in changelog {#20}
- [FIXED] Fix change type parsing {#21}

---
