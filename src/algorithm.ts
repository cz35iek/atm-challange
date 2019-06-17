const coins = [100, 50, 20, 10]

export const getCoins = (amount: number) => {
  let result: number[] = []
  for (let coin of coins) {
    while (amount>=coin) {
      result.push(coin)
      amount-=coin      
    }    
  }
  if (amount > 0)
    throw new Error('NoteUnavailableException')
  if (amount < 0)
    throw new Error('InvalidArgumentException')  
  return result
}

// const getCoins = (S, m, n) =>
// { 
//     // table[i] will be storing the  
//     // number of solutions for value i. 
//     // We need n+1 rows as the table  
//     // is constructed in bottom up manner 
//     // using the base case (n = 0) 
//     const table = new Array(n + 1); 
      
//     // Base case (If given value is 0) 
//     table[0] = 1; 
  
//     // Pick all coins one by one and  
//     // update the table[] values after  
//     // the index greater than or equal  
//     // to the value of the picked coin 
//     for(let i = 0; i < m; i++) 
//         for(let j = S[i]; j <= n; j++) 
//             table[j] += table[j - S[i]]; 
  
//     return table[n]; 
// } 

export default getCoins
