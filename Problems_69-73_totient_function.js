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
// Find the value of n, 1 < n < 10**7 (in general n <m), for which phi(n) is a permutation of n
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


const Problem70 = (m) =>{
    let output = 0;
    let check = m;
    for (n = 2; n <= m; n++){
        const totient = phi(n);
        if (permutation(n, totient)){
            const totientCheck = n / totient;
            if (totientCheck < check ){
                [output, check] = [n, totientCheck]
            }
        }
    }
    if (output === 0){
        return "no n found with phi(n) a permutation of n"
    }
    return output;
}

// console.log(Problem70(10000000));

// Consider the fraction, n/d , where n and d are positive integers. If n<d and HCF(n,d)=1,
// it is called a reduced proper fraction.

// Problem 71:By listing the set of reduced proper fractions for d <= 1000000(in general d <= m)
// in ascending order of size, find the numerator of the fraction immediately to the left of 3/7
// (in general to the left of a/b)
 

const Problem71Naive = (m, a, b) =>{
    const target = a/b;
    let output = 0;
    let numerator = 0;
    // loop through i = 2,3,4,...,m
    // find all x1, x2, ... ,xn coprime to i
    // pick j such that xj/i < target and j is maximal
    // if xj/i > output, numerator = xj

    for (i = 2; i <= m; i++){
        let largestCoprime = 1;
        for (j = 2; j < target*i ; j++){
            if (gcd(i,j) === 1){
                largestCoprime = j;
            }
            if (largestCoprime/i > output){
                output = largestCoprime/i;
                numerator = largestCoprime;
            }
        }
    }
    return [numerator, numerator/output];
}

// return greatest reduced proper fraction < a/b, with maximum denominator m.
const Problem71 = (m,a,b) => {
    const target = a/b;
    let output = 0;
    let numerator = 0;
    const start = Math.ceil(b/a);
    for (i = start; i <= m; i++){
        if(i === b){
            continue;
        }
        let largestCoprime = 0;
        let nextCheck = Math.floor(target*i);
        while (largestCoprime === 0){
            if (gcd(nextCheck, i) === 1){
                largestCoprime = nextCheck;
                if (largestCoprime/i > output){
                    output = largestCoprime/i;
                    numerator = largestCoprime;
                }
            }
            else {
                nextCheck -= 1;
            }
        }
    }
    return [numerator, Math.round(numerator/output)];
}

// console.log("First method",Problem71(1000000,3,7));

// takes in fractions a1/b1 and a2/b2 and returns mediant (a1+a2)/(b1+b2) 
const mediant = (a1,b1,a2,b2) => {
    let numerator = a1 + a2;
    let denominator = b1 + b2;
    const hcf = gcd(numerator,denominator);
    numerator /= hcf;
    denominator /= hcf;
    return [Math.round(numerator), Math.round(denominator)];
}


// const Problem71Refactor = (m,a,b) => {
//     const target = a/b;
//     let check = [1,m];
//     while (check[1] <= m){
//         check = mediant(check[0],check[1],a,b);
//         console.log(check);
//     }
//     return check;
// }

// console.log("Second method", Problem71Refactor(8,3,7));


// Problem 72: How many elements would be contained in the set of reduced proper fractions for 
// d <= 1000000 (in general d <= m)?
 

const Problem72 = (m) => {
    let total = 0
    for (n = 2; n<=m; n++){
        total += phi(n)
    }
    return total;
}

// console.log(Problem72(1000000));


// returns ordered list of reduced proper fractions with denominator <= m
const fractionList = (m) => {
    let fractions = [0,1,1,1]
    const listLength = Problem72(m)+2;
    while (fractions.length < listLength*2){
        for (i=0; i< fractions.length-2; i=i+2){
            const nextFrac = mediant(fractions[i],fractions[i+1],fractions[i+2],fractions[i+3]);
            if (nextFrac[1] <= m ){
                fractions.splice(i+2,0,nextFrac[0],nextFrac[1]);
                i+=2;
                
            }
        }
    }
    fractions.splice(0,2);
    fractions.splice(-2,2);
    return "done " + fractions.length/2;
    // return fractions;
}

// console.log(fractionList(700));



// Problem 73: How many fractions lie between 1/3 (in general a1/b1) and 
// 1/2 (in general a2/b2) in the sorted set of reduced proper fractions 
// for d<=12000 (in general d <= m)?


const Problem73 = (a1,b1,a2,b2,m) => {
    let minFraction;
    let maxFraction;
    if (a1/b1 < a2/b2){
        minFraction = [a1,b1];
        maxFraction = [a2,b2];
    }
    else {
        minFraction = [a2,b2];
        maxFraction = [a1,b1];
    }
    const minValue = minFraction[0]/minFraction[1];
    const maxValue = maxFraction[0]/maxFraction[1];

    let count = -1;
    let nextFraction = maxFraction;

    while(nextFraction[0]/nextFraction[1] > minValue){
        nextFraction = Problem71(m,nextFraction[0],nextFraction[1]);
        count++;
    }

    return count;
}

// console.log(Problem73(1,3,1,2,700));

const fractionListBetween = (a1,b1,a2,b2,m) =>{
    let fractions;
    if (a1/b1 < a2/b2){
        fractions = [a1,b1,a2,b2];
    }
    else {
        fractions = [a2,b2,a1,b1];
    }
    let additions = -1;
    while(additions != 0){
        additions = 0;
        for (i=0; i< fractions.length-2; i=i+2){
            const nextFrac = mediant(fractions[i],fractions[i+1],fractions[i+2],fractions[i+3]);
            if (nextFrac[1] <= m ){
                fractions.splice(i+2,0,nextFrac[0],nextFrac[1]);
                i+=2;
                additions++;  
            }
        }
    }
    fractions.splice(0,2);
    fractions.splice(-2,2);
    return "done " + fractions.length/2;
    // return fractions;
}

// console.log(fractionListBetween(1,3,1,2,700));

const fractionListBetween2 = (a1,b1,a2,b2,m) =>{
    let fractions;
    if (a1/b1 < a2/b2){
        fractions = [a1,b1,a2,b2];
    }
    else {
        fractions = [a2,b2,a1,b1];
    }
    let additions = -1;
    let indicesToLoop = [0];
    while(additions != 0){
        additions = 0;
        let newIndicesToLoop = [];
        for (i of indicesToLoop){
            const nextFrac = mediant(fractions[i],fractions[i+1],fractions[i+2],fractions[i+3]);
            if (nextFrac[1] <= m ){
                fractions.splice(i+2 ,0 ,nextFrac[0] ,nextFrac[1]);
                newIndicesToLoop.push(i + additions*2, i + additions*2 + 2); 
                additions++;
            }
        }
        indicesToLoop = [...newIndicesToLoop];
        console.log(indicesToLoop);
        console.log(fractions);
    }
    fractions.splice(0,2);
    fractions.splice(-2,2);
    return m + " " + fractions.length/2;
    // return fractions;
}

// console.log(fractionListBetween2(1,3,1,2,8));

const mediant2 = (a,b) => {
    let numerator = a[0] + b[0];
    let denominator = a[1] + b[1];
    const hcf = gcd(numerator, denominator);
    [numerator, denominator] = [Math.round(numerator/hcf), Math.round(denominator/hcf)];
    return [numerator,denominator];
}

// console.log(mediant2([1,3],[1,3]));

const fractionListBetween3 = (a,b,m) => {
    let fractions;
    if (a[0]/a[1] < b[0]/b[1]){
        fractions = [a,b];
    }
    else {
        fractions = [b,a];
    }
    let additions = -1;
    let indicesToLoop = [0];
    // while (additions != 0) {
    while (indicesToLoop.length > 0) {
        additions = 0;
        let newIndicesToLoop = [];
        let newFractions = [...fractions];
        for (i of indicesToLoop){
            const nextFrac = mediant2(fractions[i], fractions[i+1]);
            if (nextFrac[1] <= m){
                newFractions.splice(i+additions+1,0,nextFrac);
                newIndicesToLoop.push(i+additions, i+additions+1);
                additions++;
            }
        }
        fractions = [...newFractions];
        indicesToLoop = [...newIndicesToLoop];
    }
    fractions.splice(0,1);
    fractions.splice(-1,1);
    return m + ": " + fractions.length;
    // return fractions;
    
}

console.log(fractionListBetween3([1,3],[1,2],700));