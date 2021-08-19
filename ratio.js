function poluchitProstuyuDrob(delimoe, delitel) {
  const poluchitNaibolshiyObshiyDelitel = (a, b) =>
    b ? poluchitNaibolshiyObshiyDelitel(b, a % b) : a;

  const naibolshiyObshiyDelitel = poluchitNaibolshiyObshiyDelitel(
    delimoe,
    delitel
  );

  return [delimoe / naibolshiyObshiyDelitel, delitel / naibolshiyObshiyDelitel];
}

function посчитатьМаксСоотношение(simpleRatio, multiplier, limit) {
  const currentRatio = simpleRatio.map(n => n * multiplier);
  return currentRatio.every(n => n < limit)
    ? [
        currentRatio,
        ...посчитатьМаксСоотношение(simpleRatio, multiplier + 1, limit),
      ]
    : [];
}

function getRatios(delimoe, delitel, limit) {
  const prostayaDrob = poluchitProstuyuDrob(delimoe, delitel);
  return посчитатьМаксСоотношение(prostayaDrob, 1, limit);
}

console.log(getRatios(16, 12, 25));

let accumulator = 0;
const sum = number => {
  if (number === undefined) return accumulator;
  accumulator += number;
  return sum;
};

console.log(sum(3)(3)(6)(5)());
