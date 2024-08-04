# Pull latest changes
echo Pulling latests changes...
git pull

# Pull latest docker images
echo Pulling latest images...
docker compose pull

# Test command
echo Test command

# Cleanup
echo Cleaning up unused containers...
docker image prune -f
docker container prune -f

# Complete
echo CD complete