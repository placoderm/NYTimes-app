# Build an Interface for NY Times latest articles API

This project is built using [one of the free APIs](https://developer.nytimes.com/apis) from the NY Times called [Times Newswire API](https://developer.nytimes.com/docs/timeswire-product/1/overview).

_Live Version:_ https://nytimes-app.netlify.app/

# Steps

1. Fetch the object and log it to the console to test
2. Render the items to the screen

- Lots of different parts of the data could be rendered, including a thumbnail, title, link, summary, category, date etc.

3. Create a button that will trigger the fetching of the data and rendering to screen
4. Instead of rendering the data from the API directly, add the items to an array (e.g. `storyArchive`) where all items can be stored.
5. Keep an updated version of this array in `localStorage`
6. If you haven't already, refactor step 2 above so the items are rendered individually by a single function.
7. Now when the fetch button is pressed, make it so that the new items are compared to the old items and add only those new items to the screen (and array) without re-rendering the whole `storyArchive`.

- Add some indicator to show that the new items are new.

8. Add a button to clear the `localStorage` version of `storyArchive`.
9. Add the ability to filter the items some how, so you can hide certain items (e.g. `Sports` or `Books`)

## Bonus features

- Add some kind of loader animation
- Add placeholder image for thumbnails
- Fade in the newly added items
