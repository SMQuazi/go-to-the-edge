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
In the `server` folder:
1. `edgedb project init` (note the name)
2. `edgedb`
3. copy and paste content of `insertQuery.txt`
4. quit edgedb `\q`

#### GoLang
In the `server` folder:
1. if air installed, `air`. Otherwise, `go run .`

#### Frontend
In the `client` folder:
1. `yarn`
2. `yarn start`