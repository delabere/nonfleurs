installing canvas is a bitch:
https://stackoverflow.com/questions/73297594/cannot-install-canvas-on-npm

lots of deps here before you can do 
`npm install canvas`

the rest of the deps were stolen from nonflowers




# on the pi
followed this guide:
https://hassancorrigan.com/blog/install-nodejs-on-a-raspberry-pi-zero/


set up dependencies for node canvas

ubuntu@pi-zero:~/src/nonfleurs $ sudo apt-get update -y

ubuntu@pi-zero:~/src/nonfleurs $ sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

needed to downgrade python from 3.11 to 3.10 to get rid of problem in canvas install

https://www.samwestby.com/tutorials/rpi-pyenv


then building didn't work
then I gave up for the night and killed the pi

in the morning it worked without the --build-from-source flags

🤷 - So I'm going to recommend a restart step in there

Run the inky installer again with your new python
curl https://get.pimoroni.com/inky | bash

python venv

install pillow


# for raspbery pi 3B

sudo apt-get update
sudo apt-get upgrade

clone the repo - using https here because cba with keys right now

git clone https://github.com/delabere/nonfleurs.git


install nodejs
sudo apt-get install nodejs


