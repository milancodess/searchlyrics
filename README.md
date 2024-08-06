# Search Lyrics

Search lyrics is a simple and efficient npm package designed to fetch song lyrics and query details from the Genius API. Whether you're building a music app or a chatbot, this package provides a convenient way to access song information and lyrics directly from Genius.

## Installation

Install the package using npm:

```bash
npm install searchlyrics
```
Install the package globally to use the CLI tool:

```bash
npm install -g searchlyrics
```

## Usage

You can use the `searchlyrics` CLI tool to fetch song details and lyrics directly from the command line.

### Fetching Lyrics by Song Name

To fetch lyrics for a specific song, you can use the following command:

```bash
searchlyrics "Shape of You"
```

If you don't provide a song name as an argument, the CLI will prompt you to enter one:

```bash
searchlyrics
```

You will then be prompted to enter a song name:

```plaintext
Enter song name: Shape of You
```

### Example Output

Here is an example of what the output might look like:

<details>
  <summary>Click to expand example output</summary>

```plaintext
Song Details:
Title: Shape of You
Artist: Ed Sheeran
Release Date: January 6, 2017
Thumbnail: https://images.genius.com/9f8c5db5d2b997e1d9ed9b70cf2a41e7.1000x1000x1.jpg

Lyrics:
The club isn't the best place to find a lover
So the bar is where I go (mm-mm)
Me and my friends at the table doing shots
Drinking fast and then we talk slow (mm-mm)
...
```

  </details>

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
