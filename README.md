# Official-Joke-API-Challenge by Armando Regalado
The objective of this challenge is not necessarily just to solve the problem - but to evaluate your software development skills, code quality, creativity, and resourcefulness as a potential future colleague. Please share the necessary artifacts you would provide to your colleagues in a real-world professional setting.

## Project Overview
### Technologies:
* React.js: Base library for building the UI components.
* Axios: For making API calls to fetch jokes.
* Bootstrap: For responsive and styled components (buttons, dropdowns, pagination, etc.).
* Custom CSS: For overriding Bootstrap and enhancing visual styling.
* React Hooks:
* useState: For managing component states (jokes, likes, pagination, sorting, etc.).
* useEffect: For fetching jokes and managing local storage cache.
* LocalStorage: For caching jokes and remembering likes/dislikes persistently.
* React Pagination: Custom implementation to navigate through pages.
* React Context API (Optional): Could be added later for global state management if necessary.


### Feature List
1. Fetch Jokes:

* Retrieve jokes dynamically from the Official Joke API.
* Cache jokes in LocalStorage to improve performance and reduce API calls.

2. Sort Jokes:

* Sort by ID (ascending).
* Sort by Setup alphabetically.
* Sort by Likes or Dislikes dynamically.

3.  Pagination:
* Implement custom pagination to show a user-selected number of jokes per page (5, 10, 15, 20).

4. Add Custom Jokes:
* Form to add user-defined jokes with setup, punchline, and type.
* Added jokes are included in the local state and cached for persistence.

5. Rate Jokes:

* Upvote (👍) and Downvote (👎) buttons to rate jokes.
* Ratings (likes/dislikes) persist in the session using state.
6. Filter Jokes:

* Filter jokes by their Type (dropdown selection).
* Supports dynamic addition of new types based on user input.
7. Reset Functionality:

* Reset Sorting: Clear active sorting and display the filtered list.
* Reset Cache: Remove cached jokes from LocalStorage and fetch fresh jokes from the API.
8. Jokes Per Page Selection:

* Allow users to control the number of jokes displayed per page dynamically using a dropdown.

### Project File Structure
* src/
* ├── components/
* │   ├── JokeList.js        # Main component: fetch, display, sort, paginate, and reset jokes
* │   ├── JokeCard.js        # Displays individual joke with likes/dislikes buttons
* │   ├── AddJokeForm.js     # Form component to add new jokes with type selection
* │   ├── Pagination.js      # Custom pagination component
* │
* ├── App.js                 # Root component rendering JokeList
* ├── api.js                 # Fetch jokes from Official Joke API
* ├── index.css              # Custom global styles (Bootstrap overrides, custom UI enhancements)
* ├── App.css                # Component-specific styles for JokeList, AddJokeForm, etc.
* └── index.js               # React entry point
