docker rm -f scoutshub
docker rmi shub
sudo docker build -t shub .
sudo docker run -p 60000:60000 --name scoutshub -d shub
