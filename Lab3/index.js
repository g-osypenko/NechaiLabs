// index.js
import { memoize } from './memoization.js';

// Демонстративна "важка" функція
function slowFib(n) {
    if (n <= 1) return n;
    return slowFib(n - 1) + slowFib(n - 2);
}

console.log("=== Memoization with LRU ===");
const memoFibLRU = memoize(slowFib, { strategy: 'LRU', maxSize: 50 });

console.time("First call");
console.log(memoFibLRU(35)); // Повільно
console.timeEnd("First call");

console.time("Second call (cached)");
console.log(memoFibLRU(35)); // Швидко
console.timeEnd("Second call (cached)");

console.log("\n=== Memoization with TIME (TTL 2s) ===");
const memoFibTime = memoize(slowFib, { strategy: 'TIME', ttl: 2000 });
console.log(memoFibTime(30));
setTimeout(() => {
    console.log("After TTL expired:");
    console.log(memoFibTime(30)); // Знову рахує
}, 3000);
