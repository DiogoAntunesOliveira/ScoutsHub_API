docker rm -f scoutshub
docker rmi shub
sudo docker build -t shub ./app/
docker run --link mysql -p60000:60000 --name scoutshub -d shub
