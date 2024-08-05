# Search Lyrics

Search lyrics is a simple and efficient npm package designed to fetch song lyrics and query details from the Genius API. Whether you're building a music app or a chatbot, this package provides a convenient way to access song information and lyrics directly from Genius.

## Installation

Install the package using npm:

```bash
npm install searchlyrics
```

## Features

- **Fetch Query Details**: Retrieve song details such as title, artist, release date, and more based on a search query.
- **Fetch Lyrics**: Get the lyrics of a song from a provided Genius lyrics URL.

## Usage

### Fetch Query Details

Use the `fetchQueryDetails` function to search for song details by providing a search query.

#### Example

```javascript
const { fetchQueryDetails } = require('searchlyrics');

async function searchSong(query) {
  try {
    const response = await fetchQueryDetails(query);
    if (response.status === 200) {
      console.log('Song Details:', response.data);
    } else {
      console.log('Error:', response.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

searchSong('Shape of You');
```

### Fetch Lyrics

Use the `fetchLyrics` function to fetch the lyrics of a song from a provided Genius lyrics URL.

#### Example

```javascript
const { fetchLyrics } = require('searchlyrics');

async function getSongLyrics(url) {
  try {
    const data = await fetchLyrics(url);
    console.log('Lyrics:', data.lyrics);
    console.log('Image:', data.image);
  } catch (error) {
    console.error('Error:', error);
  }
}

getSongLyrics('https://genius.com/Ed-sheeran-shape-of-you-lyrics');
```

## Full Example

Here is a comprehensive example that combines both functionalities:

```javascript
const { fetchQueryDetails, fetchLyrics } = require('searchlyrics');

async function fetchSongInfoAndLyrics(songName) {
  try {
    // Fetch song details
    const queryResponse = await fetchQueryDetails(songName);
    if (queryResponse.status !== 200) {
      console.log('Error fetching song details:', queryResponse.message);
      return;
    }

    // Log song details
    const songDetails = queryResponse.data[0];
    console.log('Song Details:');
    console.log('Title:', songDetails.songTitle);
    console.log('Artist:', songDetails.artistName);
    console.log('Release Date:', songDetails.releaseDate);
    console.log('Thumbnail:', songDetails.thumbnail);

    // Fetch and log lyrics
    const lyricsResponse = await fetchLyrics(songDetails.lyricsPath);
    console.log('\nLyrics:');
    console.log(lyricsResponse.lyrics);
    console.log('Image:', lyricsResponse.image);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Fetch and display information and lyrics for a song
fetchSongInfoAndLyrics('Shape of You');
```

### Full Example Code in a Separate File

Create a separate file to demonstrate the usage of this npm package. Let's call it `example.js`:

### **`example.js`**

```javascript
const { fetchQueryDetails, fetchLyrics } = require('searchlyrics');

async function fetchSongInfoAndLyrics(songName) {
  try {
    // Fetch song details
    const queryResponse = await fetchQueryDetails(songName);
    if (queryResponse.status !== 200) {
      console.log('Error fetching song details:', queryResponse.message);
      return;
    }

    // Log song details
    const songDetails = queryResponse.data[0];
    console.log('Song Details:');
    console.log('Title:', songDetails.songTitle);
    console.log('Artist:', songDetails.artistName);
    console.log('Release Date:', songDetails.releaseDate);
    console.log('Thumbnail:', songDetails.thumbnail);

    // Fetch and log lyrics
    const lyricsResponse = await fetchLyrics(songDetails.lyricsPath);
    console.log('\nLyrics:');
    console.log(lyricsResponse.lyrics);
    console.log('Image:', lyricsResponse.image);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Fetch and display information and lyrics for a song
fetchSongInfoAndLyrics('Shape of You');
```

### Running the Example

You can run the `example.js` file to see the package in action:

```bash
node example.js
```
## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
