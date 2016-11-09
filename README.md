# twitch

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# start backend server
node server.js

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Todo

1. DONE Migrate streamer list logic from App.vue to StreamerList.vue, so that App just has the base list of streamers

2. DONE BUT SEARCH ISN'T POSSIBLE SO CLIENT JUST HAS TO ADD A USERNAME Search functionality, so that the client can search the Twitch api for usernames of streamers (and perhaps games), and then add those users to the list of users in App.vue

3. DONE Functionality to remove users from the streamer list

4. Backend so that a user can save their list of users and then see that list when they return to the site instead of the default

5. HALFWAY DONE Make it look pretty

6. HALFWAY DONE Catch and pass timeout errors, which are returning an undefined object which breaks the server

7. Do some testing, for example what happens if someone spams the update button, it will probably stack up api calls which wouldn't be pretty. In that case, add an abort previous request functionality into the vue-resource call https://github.com/vuejs/vue-resource/blob/master/docs/recipes.md. This will possibly be troublesome, because each offline streamer has to make it's own request, so either each offline streamer's requests will have to be tracked separately, or it might be possible to make an array of all offline streamer requests that have been made and remove them all when updateOfflineStreamerList is called

8. Find a way to prevent the 404 message being logged in the client's console. To do this, something other than vue-resource will have to be used for the api calls, because vue-resource doesn't allow this to be changed
