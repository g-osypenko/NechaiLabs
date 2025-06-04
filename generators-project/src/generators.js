// src/generators.js

function* infiniteWeekDays() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  let i = 0;
  while (true) {
    yield days[i % days.length];
    i++;
  }
}

module.exports = {
  infiniteWeekDays,
};
