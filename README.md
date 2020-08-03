

# For Math Wallet DAPP Developer

## Using Math Wallet Solana JS API


```javascript
// login
window.solana.getAccounts().then((accounts) => {
    // accounts -> [{ publiceKey, name }]
});

// Send transaction
import * as web3 from "@solana/web3.js";

// Transfer
const transaction = web3.SystemProgram.transfer({
    fromPubkey: new web3.PublicKey("GNutLCXQEEcmxkJH5f5rw51bTW2QcLGXqitmN3EaVPoV"),
    toPubkey: new web3.PublicKey("EgWHnckK7oYZY39NHuaH89wc6DEt2Lk5wT4rtrkqQBc6"),
    lamports: 10000,  // 10^9 = 1 SOL
});

/*
// CreateAccount
// const transaction = web3.SystemProgram.createAccount({...});

// Delegate
// const transaction = web3.StakeProgram.delegate({...});

// See more...
//  https://github.com/solana-labs/solana-web3.js
*/

// Use MathWallet connection
const connection = window.solana;

// Signer not required
const signers = [];

web3.sendAndConfirmTransaction(
    connection, 
    transaction, 
    signers, 
    {
        confirmations: 1,
    }
)
.then((signature) => {
    console.log("Success ->", signature);
})

```


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Download Math Wallet 麦子钱包下载

[http://mathwallet.org](http://mathwallet.org)

If you would like to list your DAPP in Math Wallet, please follow the steps in http://blog.medishares.org/?p=398

如果您希望将您开发的DAPP加入麦子钱包，请查看 http://blog.medishares.org/?p=398