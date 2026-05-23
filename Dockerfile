FROM node:lts-buster

# Clone bot from GitHub
RUN git clone https://github.com/mustaffa-mkdc/-M-U-ST-A-FF-A-MD-V2-.git /root/𒋲⍟ᬼ⃟M💀⃝⃪U⛓ST۞༒A༒ FF⛓⍟ᬼ⃟A𒋲⍟ᬼ⃟MD💀⃝⃪V2🕷️™bot

# Set working directory
WORKDIR /root/mustaffa-md-v2-bot

# Install dependencies
RUN npm install && npm install -g pm2

# Expose port
EXPOSE 9090

# Start the bot
CMD ["npm", "start"]

