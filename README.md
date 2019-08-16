# Mellins Enigma Vouchers

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)

> Generate Enigma Vouchers from Mellins website

This Node.js backend is used to generate Enigma Vouchers by Mellins customers on the [Mellins Website](http://mellins.co.za/vouchers). These vouchers can then be redeemed in store or on the Mellins Online Store.

## Tech Stack

* Node.js
* TypeScript
* Express
* Winston Logging

### 🏠 [Homepage](https://github.com/Asjas/mellins-enigma-vouchers#readme)

## Install

```sh
yarn
```

## Usage

You will need to following for the project.

1. Enigma account details
2. Email Account with SMTP and Login details

To start the development server you need to copy the sample `.env` file to create a local `.env` file for development. Once you have copied the `.env` file you can fill it in with the needed environment variables.

```sh
cp .env.sample .env
```

The command to start the development server is

```sh
yarn dev
```

The command to build and run the production server is.

```sh
yarn start
```

## Run tests

The tests are written using `jest` and `supertest`. You can use the following command to run the tests.

```sh
yarn test
```

And you can use this command to run the test watcher to reload the tests on each file save.

```sh
yarn test:watch
```

## Author

**A-J Roos <aj@pienaarconsulting.co.za>**

* Github: [@asjas](https://github.com/asjas)

## Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/Asjas/mellins-enigma-vouchers/issues).
