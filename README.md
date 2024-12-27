# React-WatchList
 React portfolio piece with NodeJs express API with  mongoDB database. Requires TVDB API key for movie data.
 place database_url in server/.env file
![preview image](screenshots/image.png)
## TMDB API integration
add a TMDB API key in your account once you have one created and the app will use the TMDB api. The correct API key to get is "API Read Access Token"

### [Test site here](https://react-portfolio-theta-snowy.vercel.app/)

This site requires TMDB api key to function properly. To circumvent getting your own key, use this test account 
{user: test, password: test}


## TODO

- [ ] Make Search Bar separate for when on WatchList page
- [ ] add sort and filter options
- [ ] add pagination to watch list
- [x] make movie poster images clickable
- [ ] make watch list entries editable in the card without needing a separate page
- [x] quick add to watch list button should not display when movie is already on watch list
  - [x] add something to indicate movie is already on Watchlist
    - [x] remove from watchlist button on movie page
      - [ ] later when testing is no longer needed a single button with an icon is all thats needed for this like with watchlisting in plex
- [ ] add genre data and other data for movies
- [ ] add Completed WatchList with ratings
  - [ ] add mark as watched to movie pages with a rating option to mark a movie as watched   
- [ ] now there is notes and priority on normal movieCards