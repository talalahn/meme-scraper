import { kill } from 'process';

const progressBar = '[..........]';
for (let i = 1; i < 11; i++) {
  // progressBar.replace([i], 'X');


  process.stdout.write(`\r[]`)
  progressBar.replace(progressBar[i], 'X');
  console.log(progressBar);
}

// const tal = 'tal';

// const tal2 = tal.replace(tal[0], 'x');

// console.log(tal2);
for (let counter = 0; counter < 10; counter++) {
  async function progressBar() {
    for (let i = 0; i < 10; i++) {
      const dots = "[..........]";
      // const left = 9 - i;
      // const empty = ' '.repeat(left);
      //  (dots[i + 1], 'X');
      process.stdout.write(`\r[${dots.replace(dots[i], "x"}] ${(i + 1) * 10}%`);
      await imageDownloaded;
    }
  }