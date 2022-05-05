import cheerio from 'cheerio';
import request from 'request';

const URL_TO_PARSE = 'https://memegen-link-examples-upleveled.netlify.app/';

request(URL_TO_PARSE, (err, response, body) => {
  if (err) return console.error(err);

  const $ = cheerio.load(body);

  const allImages = [];

  $('img').each(function (i, e) {
    allImages[i] = $(this).attr('src');
  });
  // console.log(allImages);
  const firstTenImages = allImages.slice(0, 10);
  console.log(firstTenImages);
});

//   console.log($('img').attr('src'));
// });

//   console.log(images);
// });
// import { isString } from 'util';
// import axios from 'axios';
// request(url, function (error, response, body) {
//   console.error('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   let splitHtml = ('body:', body).split('/n'); // Print the HTML for the url.
//   // console.log(splitHtml.match('jpg'));
//   console.log(splitHtml);
//   return splitHtml.toString;
// });

// import fetch from 'node-fetch';

// const response = await fetch(
//   'https://memegen-link-examples-upleveled.netlify.app/',
// );
// const body = await response.text();
// const htmlString = body.split('/n');
// // console.log(htmlString)

// const htmlString = async () => {
//   const response = await axios.get(
//     'https://memegen-link-examples-upleveled.netlify.app/',
//   );
//   console.log(response);
// };
