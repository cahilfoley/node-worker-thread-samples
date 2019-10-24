const { parentPort, workerData } = require('worker_threads')
const { createLoggers, createTimer, cpuIntensiveTask } = require('./shared')

const { log } = createLoggers('WORKER')

const timer = createTimer()

log(`${workerData.label} starting`)

const primes = cpuIntensiveTask()

log(`Worker ran for ${timer()} secs, generated ${primes.length} primes`)

parentPort.postMessage(`generated ${primes.length} primes`)
