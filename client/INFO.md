# Spotless

## Styles
- white -> FFFFFF at 100%
- spotless-black = text-neutral-900 -> 232323 at 100%
- spotless-green -> 29A053 at 100%
- spotless-dark-green -> 1f783e at 100%
- placeholder-text (for Search) -> FFFFFF at 80%

- nav items font size = 20px
- spotless font size = 48px


## Architecture
### Components
- header = Header.js
  - icon + logo = Brand.js
  - navigation = Navigation.js
  - login/logout = ProfileButton.js
- footer = Footer.js
- main-area
  - user-profile
  - list
    - list-nav
    - table mode
    - list mode
    - modale => dialog
  - fav
    - fav-nav
    - card (similar to table mode)
  - social
    - social-nav
    - user cards
  - 
### Views
- start
- login
- list
- fav
- stats
- social
- settings