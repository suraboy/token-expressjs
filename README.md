Set token to Cookies Expressjs
======

NOTE
----
The master branch will always contain the latest stable version. If you wish to check older versions or newer ones currently under development, please switch to the relevant branch.

Get Started
-----------

#### Requirements

To run this application on your machine, you need at least:

* docker-compose
* Apache Web Server with `mod_rewrite enabled`, and `AllowOverride Options` (or `All`) in your `httpd.conf` or or Nginx Web Server
* Latest Phalcon Framework extension installed/enabled
* MySQL >= 5.1.5


Application flow pattern:
---------------------
https://github.com/suraboy/token_expressjs.git

Run the docker for development:
---------------------
First you need to copy `.env.example` to `.env` for setup environment of appplication

You can now build, create, start, and attach to containers to the environment for your application. To build the containers use following command inside the project root:

```bash
docker-compose build
```

To start the application and run the containers in the background, use following command inside project root:

```bash
docker-compose up -d
```
```bash
docker-compose down
```

Installing Dependencies via Composer
------------------------------------
Run the composer installer:

```bash
docker exec -it token_expressjs_token-expressjs npm install
```
or
```bash
docker exec -it token_expressjs_token-expressjs npm update
```

Running Application
------------------------------------
Open the browser
```bash
http://localhost:7319
```

