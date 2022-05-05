import fs from 'node:fs';
import cheerio from 'cheerio';
import request from 'request';

const URL_TO_PARSE = 'https://memegen-link-examples-upleveled.netlify.app/';

const dir = './memes';

if (!fs.existsSync(dir)) {
  // check if folder already exists
  fs.mkdirSync(dir); // creating folder
}
request(URL_TO_PARSE, (err, response, body) => {
  if (err) return console.error(err);

  const $ = cheerio.load(body);

  const allImages = [];

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
    if (counter < 9) {
      download(
        imagesWithJpgEnding[counter],
        `./memes/0${counter + 1}.jpg`,
        function () {
          console.log('Image downloaded');
        },
      );
    } else {
      download(
        imagesWithJpgEnding[counter],
        `./memes/${counter + 1}.jpg`,
        function () {
          console.log('Image downloaded');
        },
      );
    }
  }
});
