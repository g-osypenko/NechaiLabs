const { infiniteWeekDays } = require('./src/generators');
const { consumeWithTimeout } = require('./src/consumer');

const gen = infiniteWeekDays();
consumeWithTimeout(gen, 3); // Виведе дні тижня протягом 3 секунд