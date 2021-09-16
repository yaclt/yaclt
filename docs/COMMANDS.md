# `yaclt` Command Documentation

## `yaclt new`

Generate a new changelog entry

| Option              | Alias | Description                                                                                                                                                                                                                                | Type        | Required | Default Value                                                         | Requires Js Config |
| ------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- | -------- | --------------------------------------------------------------------- | ------------------ |
| `--issueId`         |       | The issue ID to be interpolated into the new changelog. Takes precedence over parsing from git branch based on --branchFormat                                                                                                              | `string`    | `false`  | `undefined`                                                           |                    |
| `--message`         | `-m`  | The change log message, defaults to a placeholder message                                                                                                                                                                                  | `string`    | `false`  | `undefined`                                                           |                    |
| `--lastCommit`      |       | Use the first line of the most recent git commit message as the message for the new changelog entry                                                                                                                                        | `boolean`   | `false`  | `undefined`                                                           |                    |
| `--changeType`      |       | The change type tag to use, defaults to the first one defined in --changeTypes                                                                                                                                                             | `string`    | `false`  | `undefined`                                                           |                    |
| `--entryFileName`   |       | Pass a custom entry filename. If using a JS config file and this is a function, it will be passed an instance of `DateTime` from Luxon representing the current timestamp. See Luxon documentation for `DateTime` API.                     | `string`    | `false`  | `undefined`                                                           |                    |
| `--edit`            |       | After generating the changelog file, open it in `$EDITOR`, if `$EDITOR` is defined                                                                                                                                                         | `boolean`   | `false`  | `false`                                                               |                    |
| JS: `preNew`        |       | A hook function to run before generating the changelog. Throw an error or return false to halt execution. Only usable from a Javascript config file. May be async.                                                                         | `undefined` | `false`  | `undefined`                                                           | ✅                 |
| JS: `postNew`       |       | A hook function to run after generating the changelog. Only usable from a Javascript config file. May be async.                                                                                                                            | `undefined` | `false`  | `undefined`                                                           | ✅                 |
| `--logsDir`         |       | The directory to find and place individual changelog entries                                                                                                                                                                               | `string`    | `false`  | `changelogs/`                                                         |                    |
| `--branchFormat`    |       | Regular expression with a capturing group to parse the issue ID out of your git branch. Implies --requireIssueIds and assumes that --format includes %issueid%                                                                             | `string`    | `false`  | `undefined`                                                           |                    |
| `--changelogFile`   |       | The name of the global changelog file to collect entries into                                                                                                                                                                              | `string`    | `false`  | `CHANGELOG.md`                                                        |                    |
| `--changeTypes`     |       | The allowed change type tags                                                                                                                                                                                                               | `array`     | `false`  | `NEW,IMPROVED,FIXED`                                                  |                    |
| `--requireIssueIds` |       | Require issue IDs in changelog entries                                                                                                                                                                                                     | `boolean`   | `false`  | `true`                                                                |                    |
| `--format`          |       | Changelog entry format, as a Handlebars template. To make change type tags optional, simply don't include the Handlebars variable for it.                                                                                                  | `string`    | `false`  | `[{{changeType}}] {{message}} {{echo "{"}}#{{issueId}}{{echo "}"}}\n` |                    |
| `--plumbing`        | `-p`  | Reduce output to just the relevant data, e.g. filepaths for `new` and `prepare-release`, `true/false` for `validate`, for scripting purposes. Also disables opening `$EDITOR`. Passing this option will override `--quiet` or `--verbose`. | `boolean`   | `false`  | `false`                                                               |                    |
| `--quiet`           | `-q`  | Silence all output.                                                                                                                                                                                                                        | `boolean`   | `false`  | `false`                                                               |                    |
| `--verbose`         | `-v`  | Output additional command logs and information.                                                                                                                                                                                            | `boolean`   | `false`  | `false`                                                               |                    |

## `yaclt validate`

Validate existing changelogs against the specified format

| Option                | Alias | Description                                                                                                                                                                                                                                | Type        | Required | Default Value                                                         | Requires Js Config |
| --------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- | -------- | --------------------------------------------------------------------- | ------------------ |
| `--validationPattern` |       | A regular expression used to validate each individual changelog entry                                                                                                                                                                      | `string`    | `true`   | `undefined`                                                           |                    |
| JS: `preValidate`     |       | A hook function to run before performing validation. Throw an error or return false to halt execution. Only usable from a Javascript configuration file. May be async.                                                                     | `undefined` | `false`  | `undefined`                                                           | ✅                 |
| JS: `postValidate`    |       | A hook function to run after performing validation. Only usable from a Javascript configuration file. May be async.                                                                                                                        | `undefined` | `false`  | `undefined`                                                           | ✅                 |
| `--logsDir`           |       | The directory to find and place individual changelog entries                                                                                                                                                                               | `string`    | `false`  | `changelogs/`                                                         |                    |
| `--branchFormat`      |       | Regular expression with a capturing group to parse the issue ID out of your git branch. Implies --requireIssueIds and assumes that --format includes %issueid%                                                                             | `string`    | `false`  | `undefined`                                                           |                    |
| `--changelogFile`     |       | The name of the global changelog file to collect entries into                                                                                                                                                                              | `string`    | `false`  | `CHANGELOG.md`                                                        |                    |
| `--changeTypes`       |       | The allowed change type tags                                                                                                                                                                                                               | `array`     | `false`  | `NEW,IMPROVED,FIXED`                                                  |                    |
| `--requireIssueIds`   |       | Require issue IDs in changelog entries                                                                                                                                                                                                     | `boolean`   | `false`  | `true`                                                                |                    |
| `--format`            |       | Changelog entry format, as a Handlebars template. To make change type tags optional, simply don't include the Handlebars variable for it.                                                                                                  | `string`    | `false`  | `[{{changeType}}] {{message}} {{echo "{"}}#{{issueId}}{{echo "}"}}\n` |                    |
| `--plumbing`          | `-p`  | Reduce output to just the relevant data, e.g. filepaths for `new` and `prepare-release`, `true/false` for `validate`, for scripting purposes. Also disables opening `$EDITOR`. Passing this option will override `--quiet` or `--verbose`. | `boolean`   | `false`  | `false`                                                               |                    |
| `--quiet`             | `-q`  | Silence all output.                                                                                                                                                                                                                        | `boolean`   | `false`  | `false`                                                               |                    |
| `--verbose`           | `-v`  | Output additional command logs and information.                                                                                                                                                                                            | `boolean`   | `false`  | `false`                                                               |                    |

## `yaclt prepare-release`

Gather the changelogs from `--logsDir` and compile them into `--changelogFile` using `--changelogTemplate`

| Option                   | Alias | Description                                                                                                                                                                                                                                | Type        | Required | Default Value                                                                                                                                                               | Requires Js Config |
| ------------------------ | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `--changelogTemplate`    |       | The Handlebars template to use to generate the changelog additions. Can be a filepath to read the template from, or a template literal string.                                                                                             | `string`    | `false`  | `# Release {{releaseNumber}} - {{currentDateTime "ISODate"}}\n\n{{#each entryGroups}}## {{capitalize label}}\n\n{{#each items}}- {{this}}\n{{/each}}\n\n{{/each}}\n---\n\n` |                    |
| `--releaseNumber`        |       | A label for the release                                                                                                                                                                                                                    | `string`    | `true`   | `undefined`                                                                                                                                                                 |                    |
| `--releaseBranchPattern` |       | A pattern to generate a release branch name which will be automatically checked out before preparing the release.                                                                                                                          | `string`    | `false`  | `undefined`                                                                                                                                                                 |                    |
| `--validationPattern`    |       | A regular expression used to validate each individual changelog entry                                                                                                                                                                      | `string`    | `true`   | `undefined`                                                                                                                                                                 |                    |
| JS: `preValidate`        |       | A hook function to run before performing validation. Throw an error or return false to halt execution. Only usable from a Javascript configuration file. May be async.                                                                     | `undefined` | `false`  | `undefined`                                                                                                                                                                 | ✅                 |
| JS: `postValidate`       |       | A hook function to run after performing validation. Only usable from a Javascript configuration file. May be async.                                                                                                                        | `undefined` | `false`  | `undefined`                                                                                                                                                                 | ✅                 |
| JS: `prePrepare`         |       | A hook function to run before preparing the release changes. Throw an error or return false to halt execution. Only usable from a Javascript configuration file. May be async.                                                             | `undefined` | `false`  | `undefined`                                                                                                                                                                 | ✅                 |
| JS: `postPrepare`        |       | A hook function to run after preparing the release changes. Only usable from a Javascript configuration file. May be async.                                                                                                                | `undefined` | `false`  | `undefined`                                                                                                                                                                 | ✅                 |
| `--logsDir`              |       | The directory to find and place individual changelog entries                                                                                                                                                                               | `string`    | `false`  | `changelogs/`                                                                                                                                                               |                    |
| `--branchFormat`         |       | Regular expression with a capturing group to parse the issue ID out of your git branch. Implies --requireIssueIds and assumes that --format includes %issueid%                                                                             | `string`    | `false`  | `undefined`                                                                                                                                                                 |                    |
| `--changelogFile`        |       | The name of the global changelog file to collect entries into                                                                                                                                                                              | `string`    | `false`  | `CHANGELOG.md`                                                                                                                                                              |                    |
| `--changeTypes`          |       | The allowed change type tags                                                                                                                                                                                                               | `array`     | `false`  | `NEW,IMPROVED,FIXED`                                                                                                                                                        |                    |
| `--requireIssueIds`      |       | Require issue IDs in changelog entries                                                                                                                                                                                                     | `boolean`   | `false`  | `true`                                                                                                                                                                      |                    |
| `--format`               |       | Changelog entry format, as a Handlebars template. To make change type tags optional, simply don't include the Handlebars variable for it.                                                                                                  | `string`    | `false`  | `[{{changeType}}] {{message}} {{echo "{"}}#{{issueId}}{{echo "}"}}\n`                                                                                                       |                    |
| `--plumbing`             | `-p`  | Reduce output to just the relevant data, e.g. filepaths for `new` and `prepare-release`, `true/false` for `validate`, for scripting purposes. Also disables opening `$EDITOR`. Passing this option will override `--quiet` or `--verbose`. | `boolean`   | `false`  | `false`                                                                                                                                                                     |                    |
| `--quiet`                | `-q`  | Silence all output.                                                                                                                                                                                                                        | `boolean`   | `false`  | `false`                                                                                                                                                                     |                    |
| `--verbose`              | `-v`  | Output additional command logs and information.                                                                                                                                                                                            | `boolean`   | `false`  | `false`                                                                                                                                                                     |                    |