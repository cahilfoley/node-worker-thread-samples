exports.createLoggers = label => {
  const log = (...args) => {
    console.log(`[${label}]`, ...args)
  }

  const error = (...args) => {
    console.error(`[${label}]`, ...args)
  }

  return { log, error }
}

// An intentionally terrible way of testing if a number is prime
const testPrime = candidate => {
  for (let c = 2; c <= Math.sqrt(candidate); ++c) {
    if (candidate % c === 0) return false
  }

  return true
}

const calculatePrimes = (iterations, multiplier) => {
  const primes = []

  while (primes.length < iterations) {
    const candidate = Math.floor(iterations * multiplier * Math.random())
    if (testPrime(candidate)) primes.push(candidate)
  }

  return primes
}

exports.cpuIntensiveTask = () => {
  const iterations = 10000
  const multiplier = 1000000000

  const primes = []

  for (let i = 0; i < iterations; i++) {
    // while (primes.length < iterations) {
    const candidate = Math.floor(iterations * multiplier * Math.random())
    if (testPrime(candidate)) primes.push(candidate)
  }

  return primes
}

exports.createTimer = () => {
  const startTime = Date.now()

  return () => Math.floor((Date.now() - startTime) / 10) / 100
}
