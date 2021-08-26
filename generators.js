function* infiniteCounter() {
  for (let i = 0; i < 4; i++) {
    yield i;
  }
}

const generator = infiniteCounter();
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
