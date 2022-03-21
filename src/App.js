import React, { Component } from "react";
import TipButton from "./TipButton";
import * as nearAPI from "near-api-js";
import './global.css'

const { utils, connect, keyStores, WalletConnection } = nearAPI;

// Connection configuration
const config = {
  mainnet: {
    networkId: "mainnet",
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: "https://rpc.mainnet.near.org",
    walletUrl: "https://wallet.mainnet.near.org",
    helperUrl: "https://helper.mainnet.near.org",
    explorerUrl: "https://explorer.mainnet.near.org",
  },
  testnet: {
    networkId: "testnet",
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
  },
  
};

class App extends Component {
  state = {
    wallet: false,
    accountId: null,
  }

  sendNear = async (amount, receiver) => {
    const { wallet } = this.state;

    // Account sending the Near
    const account = wallet.account();

    // Convert the human readable number of Near we are sending to YoctoNear
    // YoctoNear is the number of indivisible units in one NEAR
    const yoctoNear = utils.format.parseNearAmount(amount);

    // Transfer tokens
    await account.sendMoney(
      receiver, // Receiver account id
      yoctoNear // Amount in yoctoNEAR
    );
  }

  // Initialize connection
  async initNear() {
    const near = await connect(config.mainnet);
    const wallet = new WalletConnection(near);

    // If a user is signed in return their account id
    // If a user is not signed in return null
    const accountId = wallet.getAccountId() || null;

    this.setState({
      wallet,
      accountId
    });
  }

  nearLogin = () => {
    const { wallet } = this.state;
    wallet.requestSignIn("");
  }

  componentDidMount() {
    this.initNear();
  }

  render() {
    const {
      accountId
    } = this.state;

    return (
      <main>
        <div className="container pt-5">
        <h1 className="fw-bolder">Mint Engineart</h1>
        <p className="lead mb-5">Blockchain’s finest casino is coming to #NEAR. 6789 NFT with casino profit sharing </p>
        <p>Citizens who have an unhealthy addiction to gambling. 10 commanders command a full brigade of the 6789 army in order to curb citizens' gambling addictions by developing a full-fledged casino platform.</p>
        <p>Discord: <a href="http://discord.gg/engineart
        " className="casino">discord.gg/engineart</a></p>
        <p>Casino: <a href="https://near.casino" className="casino">near.casino</a></p>
        <span className="supply1">SUPPLY : 6789</span><span className="supply2">PRICE : 7 Near</span><span className="supply3">MAX MINT: 4</span>
        <div><br></br></div> 

        {accountId ?
          <TipButton
            // Change this to your account id!
            receiver="mosesfinlay.testnet"
            sendNear={this.sendNear}
          />
        :
          <button
            className="btn btn-outline-dark mb-3"
            onClick={this.nearLogin}
          >
            Login with Near
          </button>
        }

        {accountId &&
          <>
            <p className="mb-0">Signed in as: {accountId}</p>

            {/* Clickable link for user's to sign out */}
            <a href="/" className="fw-light" onClick={() => this.state.wallet.signOut()}>Sign out</a>
          </>
        }
      </div>
      <img src="https://i.postimg.cc/zGbQSMjC/ezgif-com-gif-maker.gif" className="poto" width="100%" height="100%"></img>
      </main>
    );
  }
}

export default App;
