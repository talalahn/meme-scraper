import fs from 'node:fs';
import cheerio from 'cheerio';
import request from 'request';

const memeSiteUrl = 'https://memegen-link-examples-upleveled.netlify.app/';

const memeFolder = './memes';
const customMemeFolder = './custom_meme';

const customMemeUrl = `https://api.memegen.link/images/${process.argv[4]}/${process.argv[2]}/${process.argv[3]}.png`;

const imageDownloaded = `Image downloaded`;

if (!process.argv[2]) {
  request(memeSiteUrl, (err, response, body) => {
    if (err) return console.error(err);

    const $ = cheerio.load(body);

    const allImages = [];
    if (!fs.existsSync(memeFolder)) {
      // check if folder already exists
      fs.mkdirSync(memeFolder); // creating folder
    }
    $('img').each(function (i) {
      allImages[i] = $(this).attr('src');
    });

    const imagesWithJpgEnding = allImages.map((image) => {
      return image.slice(0, -10);
    });
    const download = function (url, filename, callback) {
      request.head(url, function () {
        request(url).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };

    for (let counter = 0; counter < 10; counter++) {
      async function progressBar() {
        for (let i = 0; i < 10; i++) {
          const dots = '.'.repeat(100);
          // const left = 9 - i;
          // const empty = ' '.repeat(left);
          process.stdout.write(`\r[${dots}] ${(i + 1) * 10}%`);

          await imageDownloaded;
        }
      }
      progressBar().catch((error) => console.log(error));
      if (counter < 9) {
        download(
          imagesWithJpgEnding[counter],
          `./memes/0${counter + 1}.jpg`,
          function () {
            // console.log('Image downloaded');
            // console.log(imageDownloaded);
          },
        );
      } else {
        download(
          imagesWithJpgEnding[counter],
          `./memes/${counter + 1}.jpg`,
          function () {
            // console.log('Image downloaded');
            // console.log(imageDownloaded);
          },
        );
      }
    }
  });
} else if (process.argv[3]) {
  const download = function (url, filename, callback) {
    request.head(url, function () {
      request(url).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };
  if (!fs.existsSync(customMemeFolder)) {
    // check if folder already exists
    fs.mkdirSync(customMemeFolder);
  } // creating folder
  download(customMemeUrl, `./custom_meme/custom.png`, function () {
    console.log('Custom Image Downloaded');
  });
}
