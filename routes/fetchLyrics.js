const axios = require('axios');
const cheerio = require('cheerio');

async function fetchLyrics(lyricsUrl) {
  try {
    const lyricsPageData = await axios.get(lyricsUrl);
    const $ = cheerio.load(lyricsPageData.data);
    const lyricsContainers = $('div[data-lyrics-container="true"]');
    const twitterImageMeta = $('meta[property="twitter:image"]');

    let lyricsText = "";
    let twitterImageUrl = "";

    lyricsContainers.each((index, element) => {
      let lyricsHtml = $(element).html();
      lyricsHtml = lyricsHtml.replace(/<br>/g, "\n");
      const lyricsSection = cheerio.load(lyricsHtml).text().trim();
      lyricsText += lyricsSection + "\n";
    });

    if (twitterImageMeta.length > 0) {
      twitterImageUrl = twitterImageMeta.attr('content');
    }

    return { lyrics: lyricsText.trim(), image: twitterImageUrl };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching lyrics!");
  }
}

module.exports = fetchLyrics;
