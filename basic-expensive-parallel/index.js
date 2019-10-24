const path = require('path')
const { Worker } = require('worker_threads')
const { createLoggers } = require('./shared')

const { log, error } = createLoggers('MAIN')

const workersToRun = 4

const messageParts = `I'm the main thread and I'm still ticking 🚀🚀`.split(' ')
let i = 0
const interval = setInterval(
  () => log(messageParts[i++ % messageParts.length]),
  500,
)

const workersRunning = new Set()

const runWorker = label => {
  workersRunning.add(label)
  log(`Starting a new worker thread for ${label}`)

  const workerData = { label }
  const worker = new Worker(path.join(__dirname, './worker.js'), { workerData })
  worker.on('error', err => error(`Error from ${label}:`, err))
  worker.on('message', data => log(`Message from ${label}:`, data))
  worker.on('exit', () => {
    log(`${label} exited`)
    workersRunning.delete(label)
    if (workersRunning.size === 0) clearInterval(interval)
  })
}

for (let i = 1; i <= workersToRun; i++) {
  runWorker(`Worker ${i}`)
}
