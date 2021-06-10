scp -i /home/snnap/Desktop/scoutshub.pem -r /home/snnap/Documents/nodeProjects/ ubuntu@3.8.78.234:/home/ubuntu/app/
ssh -i /home/snnap/Desktop/scoutshub.pem ubuntu@3.8.78.234 'chmod +x /home/ubuntu/app/update.sh'
ssh -i /home/snnap/Desktop/scoutshub.pem ubuntu@3.8.78.234 'sh /home/ubuntu/app/update.sh'