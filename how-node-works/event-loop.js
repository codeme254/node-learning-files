const fs = require('fs');
const crypto = require('crypto');

setTimeout(()=> console.log('finished the first timer'), 0);
setImmediate(() => console.log('finished the first immediate'));
const start = Date.now();
// how we change the size of the thread pool in node.js
// process.env.UV_THREADPOOL_SIZE = 1;
fs.readFile('test-file.txt', () => {
    console.log('I/O finished.');
    console.log('-------------')
    setTimeout(() => console.log('finished the second timer.'), 0);
    setTimeout(() => console.log('finished the third timer'), 3000);
    setImmediate(() => console.log('finished the second immediate'));
    process.nextTick(() => console.log('this is the process.nextTick'));

    // the thread pool in practice
    crypto.pbkdf2("myPassword", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now()-start, "we have successfully encrypted the password");
    });
    crypto.pbkdf2("myPassword", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now()-start, "we have successfully encrypted the password");
    });
    crypto.pbkdf2("myPassword", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now()-start, "we have successfully encrypted the password");
    });
    crypto.pbkdf2("myPassword", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now()-start, "we have successfully encrypted the password");
    });
})

console.log('greetings from the top level code')