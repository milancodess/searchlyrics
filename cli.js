#!/usr/bin/env node

const { fetchQueryDetails, fetchLyrics } = require('./index');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  const songName = process.argv[2] || await askQuestion('Enter song name: ');
  
  try {
    const queryResponse = await fetchQueryDetails(songName);
    if (queryResponse.status !== 200) {
      console.log('Error fetching song details:', queryResponse.message);
      rl.close();
      return;
    }

    const songDetails = queryResponse.data[0];

    const lyricsResponse = await fetchLyrics(songDetails.lyricsPath);
    
    console.log('\nSong Details:');
    console.log('Title:', songDetails.songTitle);
    console.log('Artist:', songDetails.artistName);
    console.log('Release Date:', songDetails.releaseDate);
    console.log('Thumbnail:', songDetails.thumbnail);
    console.log('\nLyrics:');
    console.log(lyricsResponse.lyrics);

    rl.close();
  } catch (error) {
    console.error('Error:', error);
    rl.close();
  }
}

main();
