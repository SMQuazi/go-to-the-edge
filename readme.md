# REG Stack test
A test of React with GoLang and EdgeDB

## Getting Started 

### Requirements
This project requires the installation of:
1. NPM - https://github.com/nvm-sh/nvm
2. Yarn - https://classic.yarnpkg.com/en/docs/install#debian-stable
3. EdgeDB - https://www.edgedb.com/install
4. GoLang - https://go.dev/doc/install

### Recommended
  - Air (for live reloading) - https://github.com/cosmtrek/air

### Setup

#### Initialize EdgeDB
1. `cd db`
2. `edgedb init`
3. `edgedb`
4. copy and paste content of `insertQuery.txt`

#### GoLang
1. `cd server`
2. if air installed, `air`. Otherwise, `go run .`

#### Frontend
1. `cd client`
2. `yarn`
3. `yarn start`