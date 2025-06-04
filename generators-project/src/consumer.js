// src/consumer.js

function consumeWithTimeout(iterator, seconds) {
  const endTime = Date.now() + seconds * 1000;
  let count = 0;

  while (Date.now() < endTime) {
    const { value, done } = iterator.next();
    if (done) break;
    console.log(value);
    count++;
  }

  console.log(`Total values consumed: ${count}`);
}

module.exports = {
  consumeWithTimeout,
};
