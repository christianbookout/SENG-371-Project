
docker image build -t flask -f Dockerfile.flask .
docker run -p 5000:5000 -d flask

docker image build -t node -f Dockerfile.node .
docker run -p 3000:3000 node