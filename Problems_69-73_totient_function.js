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

    // loop through 3,5,7,9, ... , sqrt(n), do the same as above for each
    for (i=3; i <= n**0.5 ; i = i+2){
        while (n % i === 0){
            divisors.push(i);
            n /= i;
        }
    }

    // if n is now a prime number >2
    if (n>2){
        divisors.push(n);
    }

    return divisors;

}

// returns the unique prime divisors of an integer n
const uniquePrimeDivisors = (n) => {

    let divisors = [];

    // if multiple of 2 divide out by 2 until odd
    if (n % 2 === 0){
        divisors.push(2);
    }
    while (n % 2 === 0){
        n /= 2;
    }

    // loop through 3,5,7,9, ... , sqrt(n), do the same as above for each
    for (i=3; i <= n**0.5 ; i = i+2){
        if (n % i === 0){
            divisors.push(i);
        }
        while (n % i === 0){
            n /= i;
        }
    }

    // if n is now a prime number >2
    // this is the case where the largest prime factor of the original n appears
    // to the power of 1 in the prime factorisation of n
    if (n>2){
        divisors.push(n);
    }

    return divisors;

}


// returns the number of positive integers <= n which are coprime to n.
const phiNaive = (n) => {
    let totient = 0;
    for (i = 1; i <= n; i++){
        if (gcd(i, n) === 1){
            totient += 1;
        }
    }
    return totient;
}

// does as above using product rule for computing phi(n) based on prime factors of n:
// phi(n) = n*(1 - 1/p1)*(1 - 1/p2)*...*(1 - 1/pn) for p1, p2, ..., pn the unique prime factors of n. 
const phi = (n) => {
    let totient = n;
    const primeFactors = uniquePrimeDivisors(n);
    for (p of primeFactors){
        // totient *= (1 - 1/p);
        totient = Math.round(totient*(1 - 1/p));
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

// console.log(Problem69(1000000));



// Problem 70: Interestingly, phi(87109) = 79180, and it can be seen that 
// 87109 is a permutation of 79180.
// Find the value of n, 1 < n < 10**7 , for which phi(n) is a permutation of n
// and the ratio n/phi(n) produces a minimum.

// takes in two positive integers, a and b, and returns whether they are permutations of eachother
const permutation = (a,b) =>{
    let stringa = a.toString();
    let stringb = b.toString();

    if (stringa.length !== stringb.length){
        return false;
    }

    // create arrays counting number of occurences of 0,1,...,9
    let counta = new Array(10).fill(0);
    let countb = new Array(10).fill(0);

    // increment count of each digit in a and b
    for ( i = 0; i < stringa.length; i++) {
        counta[parseInt(stringa.charAt(i))] += 1;
        countb[parseInt(stringb.charAt(i))] += 1;
    }

    return countb.toString() === counta.toString();

}


