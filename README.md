# 🏗 Multi-Sig-Wallet 💳🔐💼

built with Scaffolf-ETH2: <a href="https://docs.scaffoldeth.io">Documentation</a> | <a href="https://scaffoldeth.io">Website</a>

🛠️🔐💼 Create several Multi-Signature Wallets, fund them with Ether, authenticate and process transactions, to secure your capital.

📲🌐 The decentralized application (dApp) is organized into two main sections: "➕🔐 Create a New Multi-Sig Wallet" and " 💳💬Transactions".

✨🔐💼 In the "Create a New Multi-Sig Wallet" section, you have the ability to set up new multi-signature wallets—these are wallets that require multiple approvals before any transaction can be executed, enhancing security.
📊👀 Here, you'll also find a dashboard where you can view all the multi-signature wallets you've created, along with a list of the signer addresses for each wallet. This provides a clear overview of who holds signing authority in each wallet.

![Create Multi Sig Wallet tab](https://github.com/phipsae/multi-sig-wallet-new/blob/main/packages/nextjs/components/assets/imagesReadMe/createContractTab.png)

💸➡️📃Moving on to the "Transactions" tab, this section is designed to manage the financial operations of your multi-signature wallets.
📝✅🚫 Here, you can deposit funds into your multi-signature wallets. The interface allows you to submit new transactions, which must then be confirmed by the required number of signers as set up in the wallet creation. You also have the flexibility to cancel your confirmation before a transaction is finalized, should the need arise. In case a transaction is no longer needed or was created in error, you have the option to delete it ❌🗑️ . Once all necessary approvals are in place, you can execute the transaction 🏁🔏, completing the process.
This tab ensures that you have full control 🎮 over the transaction process, from ⏳ initiation to ✅ completion, while also maintaining 🔒 rigorous security standards.

![Transactions tab](https://github.com/phipsae/multi-sig-wallet-new/blob/main/packages/nextjs/components/assets/imagesReadMe/transactionsTab.png)

<h2>Scaffolf-ETH2:</h2>

🧪 An open-source, up-to-date toolkit for building decentralized applications (dapps) on the Ethereum blockchain. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, and Typescript.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

![Debug Contracts tab](https://github.com/scaffold-eth/scaffold-eth-2/assets/55535804/1171422a-0ce4-4203-bcd4-d2d1941d198b)

## Requirements

Before you begin, you need to install the following tools:

- [Node (v18 LTS)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/scaffold-eth/scaffold-eth-2.git
cd scaffold-eth-2
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`

## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.
