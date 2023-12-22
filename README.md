<p align="center">
  <img src="https://github.com/JoeSzymkowiczFiveM/fivem_surrealdb/assets/70592880/493fa452-4da8-4a23-a4f2-8585072271cf">
</p>


# fivem_surrealdb

A FiveM resource to communicate with a SurrealDB database using [surrealdb.js](https://www.npmjs.com/package/surrealdb.js). Get started using PocketBase by downloading the database [here](https://surrealdb.com/install) and you can find usage documentation about the SDK [here](https://surrealdb.com/docs/integration/sdks/nodejs).


## ✨ Features

- Several CRUD methods for records-related tasks
- Simple storage and access of JSON data, without the need to encode/decode.


## 📚 Installation

- Clone this repository to `fivem_surrealdb` in your FiveM `resources` folder.
- Copy `fivem_surrealdb/database.cfg` to your server root directory.
- Add the following lines to your server config:
```
exec "database.cfg"
start fivem_surrealdb
```
- Change `surrealdb_url`, `surrealdb_user`, `surrealdb_password`, `surrealdb_database`, and `surrealdb_namespace` in `database.cfg`.
- Run `npm install` in `resources/fivem_surrealdb` directory.


## 👀 Usage

- Add the following line to the fxmanifest of the resource you want to use fivem_surrealdb in:
```
server_script '@fivem_surrealdb/lib/SurrealDB.lua'
```


## 👐 Credit

This is just another FiveM wrapper for another weird database. Huge shoutout to the [Overextended](https://github.com/overextended) group for technical discussions and support.


# Discord

[Joe Szymkowicz FiveM Development](https://discord.gg/5vPGxyCB4z)
