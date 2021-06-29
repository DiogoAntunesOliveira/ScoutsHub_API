scp -i /home/snnap/Desktop/scoutshub.pem -r /home/snnap/Documents/nodeProjects/scoutshub/update.sh ubuntu@18.132.113.234:/home/ubuntu/app/



echo -ne '#####                     (33%)\r'
sleep 1
echo -ne '#############             (66%)\r'
sleep 1
echo -ne '#######################   (100%)\r'
echo -ne '\n'





scp -i /home/snnap/Desktop/scoutshub.pem -r /home/snnap/Documents/nodeProjects/scoutshub/ ubuntu@18.132.113.234:/home/ubuntu/app/
echo -e "SCP connection successfully"
ssh -i /home/snnap/Desktop/scoutshub.pem ubuntu@18.132.113.234 'chmod +x /home/ubuntu/app/update.sh'
echo -e "SSH CHMOD complete"
ssh -i /home/snnap/Desktop/scoutshub.pem ubuntu@18.132.113.234 'sh /home/ubuntu/app/update.sh'






echo -e "SSH connection successfully"
echo -e "Dockerfile upgrading..."
echo -e "bash file start executed -> connected..."
echo -ne '#####                     (33%)\r'
sleep 1
echo -ne '#############             (66%)\r'
sleep 1
echo -ne '#######################   (100%)\r'
echo -ne '\n'
echo -e "bash file start complete"
echo -e "Finished Successfully"