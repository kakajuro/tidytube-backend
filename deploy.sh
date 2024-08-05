# Pull latest changes
echo Pulling latests changes...
git pull

# Pull latest docker images
echo Pulling latest images...
docker compose pull

# Rebuild and deploy new containers
# Build in a couple of stages
docker compose up web server db -d --no-deps --build
docker compose up umami umami_db statping -d --no-deps --build
docker compose up caddy -d --no-deps --build

# Cleanup
echo Cleaning up unused containers...
docker image prune -f
docker container prune -f

# Complete
echo CD completed sucessfully