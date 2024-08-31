
# tidytube backend 

tidytube is an open-source web extension which allows you to remove parts of Youtube's UI. Users are able to remove elements from the search page, homepage as well as blocking shorts from playing.

This is the backend (ish) portion of the codebase. This repo is made up of:
- The website (Nextjs)
- The main server + database (ExpressJS + Redis)
- The web analytics service (Umami)
- The uptime service (statping-ng)
- The reverse proxy service (Caddy)

## Where's the extension?

The repo for the client side portion of the extension can be found here: https://github.com/kakajuro/tidytube
## Build Locally

Clone the project

```bash
  git clone https://github.com/kakajuro/tidytube-backend.git my-project
```

Go to the project directory

```bash
  cd my-project
```

### Running the services individually

For the website:

```bash
  cd web
  yarn dev
```

For the server (excludes the redis database):

```bash
  cd server
  yarn dev
```

### Running the services together

The services can be ran together using Docker.

For development run:

```bash
  docker compose -f "docker-compose.dev.yml" up -d
```

This will start up the server, database and website containers with Caddy as a reverse proxy to them. These will be available by the ```test.localhost``` url. The services can be run individually as well, for example:

```bash
  docker compose -f "docker-compose.dev.yml" up web -d
```

The production build can be ran through the other compose file. This will include all the services such as the web analytics and the uptime service 

```bash
  docker compose up -d
```


Also make sure to replace the env.example files with .env files in these file locations:

```bash
caddy/.env
server/.env
umami/.env
web/.env

```
## API Docs
API Docs available [here](https://github.com/kakajuro/tidytube-backend/wiki/API-Documentation)
### License

This project is licensed under the GPLv3 License - see [LICENSE.md](LICENSE) file for more information