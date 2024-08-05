const axios = require('axios');
const qs = require('querystring');

const GENIUS_ACCESS_TOKEN = 'ohCXKqz-spvgUf4Rq1lGNdJM-Lp2--eetb0VaR5WzROO4rxKFMMVHzTyN0Fsr64u'; //REPLACE_WITH_YOUR_TOKEN

async function fetchQueryDetails(query) {
  if (!query) {
    throw new Error("Please provide a song name!");
  }

  const searchUrl = `https://api.genius.com/search?${qs.stringify({ q: query })}`;

  try {
    const searchResponse = await axios.get(searchUrl, {
      headers: {
        Authorization: `Bearer ${GENIUS_ACCESS_TOKEN}`
      }
    });

    const searchResults = searchResponse.data.response.hits;

    if (searchResults.length === 0) {
      return { status: 404, message: "No results found for the given song!" };
    }

    // Extract relevant information and populate the results array
    const results = searchResults.map(hit => ({
      songTitle: hit.result.title,
      artistName: hit.result.artist_names,
      lyricsPath: `https://genius.com${hit.result.path}`,
      releaseDate: hit.result.release_date_for_display || 'Unknown',
      thumbnail: hit.result.song_art_image_url || 'No image available'
    }));

    return { status: 200, data: results };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "An error occurred while fetching query details!" };
  }
}

module.exports = fetchQueryDetails;
