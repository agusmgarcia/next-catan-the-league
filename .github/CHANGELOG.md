# Changelog

All notable changes to this project will be documented in this file.

## [v0.17.0](https://github.com/agusmgarcia/next-catan-the-league/tree/v0.17.0)

> February 11, 2026

### Features ✅

- **Image**: add ability to scroll within the modal

### Chores ⚙️

- bump dependencies

## [v0.16.0](https://github.com/agusmgarcia/next-catan-the-league/tree/v0.16.0)

> January 31, 2026

### Features ✅

- **ApproveMatchesPage**: add link to go to the league
- **CreateMatchPage**: add alert when the league has been completed
- **CreateLeaguePage**: split form
- **Carousel**: add component
- **Icon**: add admin variant
- **CreateMatchPage**: start using Form component
- **CreateLueagePage**: start using Form component
- **Form**: add component

### Fixes 🎯

- **ViewLeaguePage**: sort leagues by active
- **CreateMatchPage**: add divider
- **ApproveMatchPage**: switch ctas

### Chores ⚙️

- **Image**: make w-full as other components
- remove underline when they are not anchors
- bump vulnerable dependencies

## [v0.15.0](https://github.com/agusmgarcia/next-catan-the-league/tree/v0.15.0)

> January 22, 2026

### Features ✅

- **CreateMatchPage**: add viewer for screenshots
- **ApproveMatchesPage**: add viewer for screenshots
- **Image**: add viewer property
- **Modal**: add component

### Fixes 🎯

- **arrays**: adjust logic when using iterators
- **AppPage**: handle base_path for fonts
- **AuthenticatedLayout**: add padding when error in profile

## [v0.14.0](https://github.com/agusmgarcia/next-catan-the-league/tree/v0.14.0)

> January 21, 2026

### Features ✅

- start using stars for matches win
- **ViewLeaguePage**: add wins next to points
- **ViewLeaguePage**: add matches count reference
- **ViewLeaguePage**: add button to view other leagues when no league id
- **Image**: add background as an initial placeholder

### Fixes 🎯

- **LeaguesSlice**: send back the created id
- **ViewProfilePage**: adjust labels
- **VictoryPointImage**: set rounded border

### Chores ⚙️

- stop showing matches of total if are the same

## [v0.13.0](https://github.com/agusmgarcia/next-catan-the-league/tree/v0.13.0)

> January 20, 2026

### Features ✅

- **CatanClient**: add photoBlurURL property
- **CreateMatchPage**: add ability to upload image
- **Icon**: add camera variant

### Fixes 🎯

- **Button**: remove styles for raw variant

## [v0.12.0](https://github.com/agusmgarcia/next-catan-the-league/tree/v0.12.0)

> January 20, 2026

### Features ✅

- **ViewProfilePage**: stay in the same page
- **ViewLeaguePage**: stay in the same page
- **CreateMatchPage**: go to view league after creating it
- **Header**: go to home when logging out

### Fixes 🎯

- **LeagueIdSlice**: set undefined when no user
- **HomePage**: redirect as soon as leagueId has been selected
- **Header**: display placeholder when no league
- **Header**: prevent switching leagues while creating new match
- **ViewProfilePage**: adjust matches count stuff

### Chores ⚙️

- bump dependencies

## [v0.11.0](https://github.com/agusmgarcia/next-catan-the-league/tree/v0.11.0)

> January 17, 2026

### Features ✅

- **ViewProfilePage**: implement page
- **arrays**: add countOccurrences method
- **Icon**: add flag variant
- **Icon**: add trophy variant
- **Icon**: add hex variant
- **Icon**: add star variant
- **Header**: add logout functionality
- **Icon**: add logout variant
- **PlayerImage**: add 6rem variant

### Fixes 🎯

- **Footer**: adjust CTA height
- rename victoryCounts by victoriesCount
- **Footer**: adjust logic to have home selected

### Chores ⚙️

- **AppPage**: remove login page

## [v0.10.0](https://github.com/agusmgarcia/next-catan-the-league/tree/v0.10.0)

> January 15, 2026

### Features ✅

- **Header**: add icons
- **Icon**: add hourglass variant
- **Icon**: add arrowLeft variant
- **ViewLeaguesPage**: implement page
- **Icon**: add arrowRightWide variant
- **Icon**: add switch variant
- **CreateMatchPage**: set placeholders
- **CreateLeaguePage**: set placeholders
- **Input**: handle placeholder property

### Fixes 🎯

- **Footer**: stop making selected on /leagues/view
- **Footer**: make icons smaller
- **ApproveMatchesPage**: remove link at bottom
- **CreateMatchPage**: adjust createdAt styles
- **Header**: avoid displaying switch icon if no string
- **PlayerImage**: make color required
- **ViewLeaguePage**: adjust calculation logic

### Chores ⚙️

- start using matchesCount instead of completedAt
- **CreateMatchPage**: add comments
- **CreateLeaguePage**: add comments
- **Layout**: move it inside AppPage
- **Layout**: start handling loding and error
- **Layout**: let header handle the heading
- **Typography**: add font-semibold
- **Title**: stop using the component

## [v0.9.0](https://github.com/agusmgarcia/next-catan-the-league/tree/v0.9.0)

> January 13, 2026

### Features ✅

- **Footer**: display rules instead of leagues view
- **ViewRulesPage**: add page
- **Icon**: add rules variant
- **CreateLeaguePage**: add page
- **VictoryPointImage**: add component
- **PlayerImage**: add component
- **CreateMatchPage**: implement page
- **Input**: add component

### Fixes 🎯

- **HomePage**: adjust matches locator
- **Banner**: remove className
- **ViewLeaguePage**: adjust min and max height of a color
- **Divider**: adjust min and max height
- **LeagueIdSlice**: adjust selection logic

### Chores ⚙️

- **CatanClient**: restructure database
- start using email as id

## [v0.8.0](https://github.com/agusmgarcia/next-catan-the-league/tree/v0.8.0)

> January 11, 2026

### Features ✅

- **CatanClient**: start fetching all users info

### Fixes 🎯

- **ApproveMatchesPage**: make approval inmutable
- **CatanClient**: fetch matches filtering by playerId
- **CatanClient**: avoid fetching leagues if no user
- **ApproveMatchesPage**: disable the rest of the buttons
- **ApproveMatchesPage**: Add link even if there are elements
- **Divider**: add flex-none class

### Chores ⚙️

- **arrays**: make groupBy part of the module

## [v0.7.0](https://github.com/agusmgarcia/next-catan-the-league/tree/v0.7.0)

> January 10, 2026

### Features ✅

- **ViewPastMatches**: add page
- **ApproveMatchesPage**: add link to view past matches
- **Alert**: add success variant

### Fixes 🎯

- **CatanClient**: update updatedAt when approve/reject matches
- **Layout**: make error to be bold
- **ViewLeaguePage**: replace medal icon by crown

### Chores ⚙️

- **Title**: rename prop inside hook
- **ApproveMatchesPage**: adjust URL
- **CatanClient**: rename approval by approved

## [v0.6.0](https://github.com/agusmgarcia/next-catan-the-league/tree/v0.6.0)

> January 10, 2026

### Features ✅

- **ApproveMatchesPage**: implement page
- **Button**: add primary and secondary variant
- **groupByArrays**: add utility
- **Icon**: add cross variant
- **Icon**: add check variant
- **Icon**: add cross-fill variant
- **Icon**: add check-fill variant
- **ViewLeaguePage**: adjust card color
- **CatanClient**: start handling winner per match
- **Footer**: add matches for approval counter
- **Typography**: add span variant
- **MatchesForApprovalSlice**: add slice
- **CatanClient**: add playerId to the matches
- **Icon**: replace add by plus
- **CreateMatchPage**: add page

### Fixes 🎯

- **AppPage**: adjust error handling logic
- **CatanClient**: retrieve matches where all players have approve
- **Footer**: adjust key property
- **Footer**: adjust links
- **ViewLeaguePage**: make transitions to appears once
- **Anchor**: use the NextJS component

### Chores ⚙️

- **HomePage**: adjust hook
- **splitArrays**: simplify usage

## [v0.5.0](https://github.com/agusmgarcia/next-catan-the-league/tree/v0.5.0)

> January 7, 2026

### Features ✅

- add missing pages
- **MatchesSlice**: add slice

### Fixes 🎯

- **ViewLeaguePage**: adjust params logic

### Chores ⚙️

- **Layout**: add fragment

## [v0.4.0](https://github.com/agusmgarcia/next-catan-the-league/tree/v0.4.0)

> January 7, 2026

### Features ✅

- **CatanClient**: implement getLeague
- **CatanClient**: implement getLeagues
- **UsersSlice**: add slice
- **splitArrays**: add utility
- **CatanClient**: create user if it doesn't exist

### Fixes 🎯

- **Alert**: place a Typography inside it
- **ViewLeaguePage**: adjust league id selection

### Chores ⚙️

- from custom noise to custom-noise

## [v0.3.0](https://github.com/agusmgarcia/next-catan-the-league/tree/v0.3.0)

> January 7, 2026

### Features ✅

- **AppPage**: add footer
- **ViewLeaguePage**: add page
- **HomePage**: start using title
- **LoginPage**: start using title
- **Title**: add fragment
- **HomePage**: adjust styles
- **AppPage**: adjust styles
- **LoginPage**: remove hover status
- **Anchor**: add component
- **Icon**: add profile variant
- **Icon**: add checkboxes variant
- **Icon**: add list variant
- **Icon**: add home variant
- **Icon**: add add variant
- **Icon**: add medal variant
- **Typography**: stop using text-stroke
- rename bg-noise-30 to noise-30

## [v0.2.0](https://github.com/agusmgarcia/next-catan-the-league/tree/v0.2.0)

> January 4, 2026

### Features ✅

- **HomePage**: add page
- **LoginPage**: add user ability to login
- **AppPage**: add authenticated layout
- **LeagueSlice**: add slice
- **LeaguesSlice**: add slice
- **UserSlice**: add slice
- **Divider**: add component
- **Typography**: add text-shadow
- **Alert**: add component
- **Icon**: add crown variant
- **Icon**: add spinner variant
- **Button**: handle disabled state
- **Banner**: add component
- **Image**: add ref property

## [v0.1.0](https://github.com/agusmgarcia/next-catan-the-league/tree/v0.1.0)

> December 30, 2025

### Features ✅

- **LoginPage**: add page
- **AppPage**: add page
- **Image**: add component
- **Icon**: add component
- **Button**: add component
- **Typography**: add component

### Chores ⚙️

- setup project
