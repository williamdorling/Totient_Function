// Euler's totient function, phi(n), is defined as the number of positive integers 
// not exceeding n which are relatively prime to n.

// Problem 69: find the value of n <= 1,000,000 (in general n <= m) for which n/phi(n) is
// a maximum

// returns greatest common denominator of two integers, a and b.
const gcd = (a,b) => {
    if (b === 0){
        return a;
    }
    return gcd(b, a%b);
}

// returns the prime divisors of an integer n
const primeDivisors = (n) => {

    let divisors = [];

    // if multiple of 2 divide out by 2 until odd
    while (n % 2 === 0){
        divisors.push(2);
        n /= 2;
    }

    // loop through 3,5,7, ... , sqrt(n), do the same as above for each
    for (i=3; i <= Math.sqrt(n); i = i+2){
        while (n % i === 0){
            divisors.push(i);
            n /= i;
        }
    }

    // if divisors is still empty, then n must be prime
    if (divisors.length === 0){
        divisors.push(n);
    }

    return divisors;

}

// returns the number of positive integers <= n which are coprime to n.
const phi = (n) => {
    let totient = 0;
    for (i = 1; i <= n; i++){
        if (gcd(i, n) === 1){
            totient += 1;
        }
    }
    return totient;
}

// returns the value of n <= m for which n/phi(n) is a maximum
const Problem69 = (m) =>{
    let output = 2;
    let check = 2;
    for (n = 2; n <= m; n++){
        const totientCheck = n / phi(n);
        if (totientCheck > check ){
            [output, check] = [n, totientCheck]
        }
    }
    return output;
}

console.log(primeDivisors(1000000));