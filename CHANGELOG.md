# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.8.5]

### Added
- Add breadcrumbs to target page
- Add command crud pages
- Add delete command output button
- Add delete target button and new NoResultsTableRow component
- Add edit links
- Add file size span component
- Add jsconfig file (to aid with language server support)
- Add jsconfig.json to docker image
- Add links to related entities on details page
- Add markdown support
- Add user edit form
- Improve task statuses
- Introduce task command tab

### Changed
- Use customised tailwind CSS instead of CDN one
- Copy craco config to container
- Do not use absolute src path
- Extract user form to own component
- Move user name to header
- Populate command dropdown dynamically on task form
- Present some detailed information in two columns
- Refactor tabs component
- Rename title
- Replace component style with classes
- Restore unordered lists styles
- Show raw user agent if can't be parsed
- Use 'strict' makefile
- Use absolute paths
- Use new command entity
- feat: :sparkles: copy code to clipboard
- feat: :sparkles: sidebar and header now are fixed to scroll

### Fixed
- Fix bug in command tab
- Fix command page title
- Fix issue in command tab
- Fix issue with user names in project membership
- Fix small aesthetic issues

### Removed
- Remove borders from section
- Remove form max width
- Remove table cell padding
- Remove two-columns class

[Unreleased]: https://github.com/reconmap/web-client/compare/0.8.5...master 
[0.8.5]: https://github.com/reconmap/web-client/compare/0.8.0...0.8.5

