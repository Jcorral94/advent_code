import fs from "fs";

const sample = fs.readFileSync("./input.txt", "utf-8");

// --- Day 1: Trebuchet?! ---
// Part One
function partOne() {
  return sample
    .split("\n")
    .map(str => str.split("").filter(char => !isNaN(char)))
    .map(arr => arr[0] + arr[arr.length - 1])
    .reduce((acc, val) => acc + Number(val), 0);
}
// Part Two
function partTwo() {
  const wordValues = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const lines = sample.split("\n");
  let theEnd = [];

  for (let i = 0; i < lines.length; i++) {
    let map = [];
    let line = lines[i];

    // go through each wordValue
    for (let j = 0; j < wordValues.length; j++) {
      const checking = wordValues[j];

      const regex = new RegExp(checking, 'g');

      const found = [...line.matchAll(regex)];
      // console.log(found);
      // map the found index string to value
      if (found.length > 0) {
        for (let k = 0; k < found.length; k++) {
          // console.log(found[k][0], found[k].index);
          map.push({
            word: found[k][0],
            index: found[k].index,
            value: wordValues.indexOf(found[k][0]) + 1
          });
        }
      }
    }
    //get the numbers out
    const numbers = [...line.matchAll(/[0-9]/g)]?.map((val) => {
      // console.log(val[0]);
      return { value: Number(val[0]), index: val.index };
    });
    // merge
    map = [...map, ...numbers];
    // console.log('map', map);
    map = map.sort((a, b) => a.index - b.index);
    const fin = Number('' + map[0].value + map[map.length - 1].value)
    theEnd.push(fin);
  }

  return theEnd
    .reduce((acc, val) => acc + Number(val), 0);

}

// --- Day 2: Cube Conundrum ---
const day2 = {
  partOne() {
    const check = {
      'red': 12,
      'green': 13,
      'blue': 14
    };

    let idTotals = 0;

    return sample
      .split("\n")
      .reduce((acc, line) => {
        acc = acc || 0;
        const lineArray = line.split(": ");
        const game = lineArray[0];
        const options = lineArray[1];

        let rounds = options.split("; ");

        rounds = rounds.map((round) => round.split(', '));

        const checked = rounds.map((round) => {
          return round.map(cubes => {
            const [number, color] = cubes.split(' ');

            return +number <= check[color];
          });
        });

        const final = checked.map(value => value.every(v => v === true)).every(val => val === true);
        if (final === true) {
          acc += Number(+game.split(' ')[1]);
        }

        return acc;

      }, 0);
  },
  partTwo() {

  }
}
