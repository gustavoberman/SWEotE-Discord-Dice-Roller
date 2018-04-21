# SWIA-Discord-Dice-Roller
CREDIT: Vampwood for conceiving the bot, and SkyJedi for substantial contributions to the project. Dice images from Boardgamegeek PBF

Star Wars: Imperial Assault and its expansions are © and TM Fantasy Flight Games, Inc. Star Wars is © and TM Lucasfilm Ltd.


A Discord Bot Companion for Star Wars Imperial Assault

#Usage
Commands:
- !roll   rolls any combination of IA dice and returns totals

  - You may add " " at the end of the line to give the roll a description


  DICE IDENTIFIERS
  - y = Yellow
  - g = Green
  - b = Blue
  - r = Red
  - k = Black
  - w = White

    - note: if you use the !roll yyyggbbk method you must use the single character dice identifiers

  EXAMPLES
      - !roll yyyggbbk "Blast Him!"
      - !roll 3y 2g 2b 1k "Delusions of Grandeur"


- !help          Type '!help topic for further information'



#Installation and Setup

1. First you will need to have NodeJS installed on your machine. You can find the latest version [here](https://nodejs.org/en/)
2. Next create a discord account for your bot. You can do this [here](https://discordapp.com/developers/applications/me)
  1. Click "New App"
  2. Provide a Name (this is the name people will see when the bot joins a channel) and Description
  3. Click "Create App"
  4. On the new screen click "Create a Bot User"
  5. Open Notepad
  6. Under the heading "App Bot User" you will see "Token:click to reveal" Click to reveal it and copy the resulting text and paste it in notepad. Be sure to keep this token private.
  7. Under the heading "App Details" Copy the number after "Client ID:" and paste this in notepad as well.
  8. Replace "CLIENT_ID_GOES_HERE" in the following link with the Client ID you copied in the above step https://discordapp.com/oauth2/authorize?client_id=CLIENT_ID_GOES_HERE&scope=bot&permissions=0
  9. Paste the edited link into a web browser, select the discord server you wish to add the bot to, and click "Authorize".
3. Setup Firebase
  1. https://console.firebase.google.com
  2. Click "Add Project"
  3. Name project whatever you want, click Create
  4. Database...Rules....
    1. change to
    {
      "rules": {
        ".read": "true",
        ".write": "true"
      }
    }
  5. Overview....Click the reddish circle labeled "Add Firebase to your web app"
  5. Copy everything between var config = {  }
4. Click "Clone or Download" at the top of this page. Click "Download Zip" and extract the files.
5. Type \@<username> into your channel to get you userID
6. Open config.js with a text editor program of your choice.
7. Replace "BOT TOKEN" with your bot token you copied in step 2.6
8. Replace "ADMIN_ID" with the NUMBERS of your userID from step 5.
9. Paste into var firebaseconfig = {   }
10. Get Discord ServerID from Discord Server Settings...Widget...ServerID for your server
11. Paste ServerID into "swiaserver" in config.js 
12. Save file
13. upload custom emoji from emoji folder to the server.  https://support.discordapp.com/hc/en-us/articles/207619737-Adding-Emoji-Magic
13. Your bot is now configured and ready to launch.

#Running the bot

To run the bot, Just execute the file "start.bat" on a windows or "start.command" on mac.

#Updating the bot

To update the bot, Just execute the file "UPDATE.bat" on a windows or "UPDATE.command" on mac. Your config.js file will be backed up and restored automatically

#Configuration File config.js

  config.js has properties

  1. firebaseconfig
    -firebase token

  1. token
    - this is the login token for your bot
  2.  adminID
    - the user discordID for the Admin
  3. prefix
    - this is the symbol the bot uses to recognize commands. This is set to "!" by default
  4. maxRollsPerDie
    - This is the max number per dice type that can be rolled in a given roll command. Set to 20 by default. Commands that don't respect the roll limit will be aborted and send an error message to the discord chat.
  5. descriptorPrenpend
    - Any text you place between the double quotes following this property will be prepended to the text provided in the comment parameter.
    Example: if "descriptorPrepend" is set to "Targeting: ", then the command !roll rrb "Stormtrooper 1" is called, the bot will respond with:     Targeting: Stormtrooper 1
    gustavoberman roll results:    Hit: 3   Block: 1
  6.  swiaserver
    - server ID for SWIA Dice emoji


#Amazon EC2 install

  1.  Connect to your ubuntu Linux instance using SSH.

  2.  Install node  

    -  curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -

    -  sudo apt-get install -y nodejs

  3.  Download and unzip latest build
      wget https://github.com/gustavoberman/SWIA-Discord-Dice-Roller.zip
      unzip master.zip
      cd SWIA-Discord-Dice-Roller-master

  4.  Install npm for the bot
      npm install

  5.  Configure the bot
      sudo nano config.json

  6.  launch bot (this will launch the bot and let you close the terminal window)
      nohup nodejs bot.js &>/dev/null & disown
