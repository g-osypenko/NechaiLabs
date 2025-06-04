// src/consumer.js

function consumeWithTimeout(iterator, seconds) {
  const endTime = Date.now() + seconds * 1000;
  let count = 0;
  const MAX_ITER = 1000;

  for (; count < MAX_ITER && Date.now () <endTime; count++){
    const { value,done } = iterator.next ();
    if (done) break;
    console.log (value);
  }

  console.log(`Total values consumed: ${count}`);
}

module.exports = {
  consumeWithTimeout,
};
