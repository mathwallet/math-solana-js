<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <span class="title">Solana</span>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-card>
          <v-card-title>Account</v-card-title>
          <v-card-subtitle>
            <p v-if="account">{{account.publicKey}}</p>
          </v-card-subtitle>
          <v-card-actions>
            <v-btn color="primary" @click="login" small v-if="!account">Log in</v-btn>
            <v-btn color="error" @click="logout" small v-else>Log out</v-btn>
          </v-card-actions>
        </v-card>

        <v-card class="my-3" v-if="account">
          <v-card-title>Send Transaction</v-card-title>
          <v-card-subtitle>
            <v-text-field
              v-model="toPublicKey"
              label="To"
              placeholder="GNutLCXQEEcmxkJH5f5rw51bTW2QcLGXqitmN3EaVPoV"
              filled
            ></v-text-field>
            <v-text-field
              v-model="toAmount"
              label="Amount"
              placeholder="0.0001"
              :hint="balance?`Balance ${balance} SQL`:''"
              persistent-hint
              filled
            ></v-text-field>
          </v-card-subtitle>
          <v-card-actions>
            <v-btn color="primary" @click="sendTransaction()" small>Send</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import * as bip39 from "bip39";
import * as web3 from "@solana/web3.js";
import nacl from "tweetnacl";
import { formatAmount, parseAmount } from "./utils/Format";

export default {
  name: "App",
  data() {
    return {
      // Hander
      hander: 0,
      // RPC URL
      rpcUrl: "https://devnet.solana.com",
      // From
      account: null,
      // To
      toPublicKey: "4Rxjcd5qQLB1PE4AhTmsNpxCAHyidbmuYkynL7uRotG2",
      // Amount
      toAmount: "0.0001",
      // Balance
      balance: "",
    };
  },
  mounted() {
    this.hander = setInterval(() => {
      if (window.solana) {
        this.login();
        clearInterval(this.hander);
      }
    }, 1000);
  },
  methods: {
    login() {
      if (!window.solana) {
        alert("打开麦子插件并切换到 Solana");
        return;
      }
      window.solana.getAccounts().then((accounts) => {
        if (accounts.length) {
          this.account = accounts[0];
          // Get Balance
          this.getBalance(this.account.publicKey);
        }
      });
    },
    logout() {
      if (!window.solana) {
        alert("打开麦子插件并切换到 Solana");
        return;
      }
      window.solana.forgetAccounts().then(() => {
        this.account = null;
      });
    },
    getBalance(publicKey) {
      // Use MathWallet connection
      var connection = window.solana;

      connection
        .getBalance(new web3.PublicKey(publicKey))
        .then((balance) => {
          this.balance = formatAmount(balance);
        })
        .catch((e) => {});
    },
    sendTransaction() {
      // Use MathWallet connection
      var connection = window.solana;
      // Signer not required
      var signers = [];

      // Transfer
      const transaction = web3.SystemProgram.transfer({
        fromPubkey: new web3.PublicKey(this.account.publicKey),
        toPubkey: new web3.PublicKey(this.toPublicKey),
        lamports: new Number(parseAmount(this.toAmount)),
      });
      // CreateAccount
      // const transaction = web3.SystemProgram.createAccount({
      //   fromPubkey,
      //   newAccountPubkey,
      //   lamports,
      //   space,
      //   programId,
      // });

      // Delegate
      // web3.StakeProgram.delegate({
      //   stakePubkey,
      //   authorizedPubkek,
      //   votePubkey,
      // });

      // more.... https://github.com/solana-labs/solana-web3.js

      web3
        .sendAndConfirmTransaction(connection, transaction, signers, {
          confirmations: 1,
        })
        .then((signature) => {
          console.log(signature);
          alert("Success");
        })
        .catch((e) => {
          alert(e.message);
        });
    },
  },
};
</script>
