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

install git
sudo apt-get install git

clone the repo - using https here because cba with keys right now

git clone https://github.com/delabere/nonfleurs.git


install nodejs and npm
sudo apt-get install nodejs
sudo apt-get install npm


# install node deps
start with deps of deps for canvas
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

then
npm install

this will fail - ohnooo

but that's because we need to do a reboot after installing all those canvas deps

so after a `sudo reboot`

we can run `npm i` again

running node app.js should now leave an image in the root directory

# install python deps
the pi comes with pythin3.11 installed so you don't have to install this

virtual env (you can skip this step if you don't mind using a global environment on your pi)
python3 -m venv venv

activate it
source venv/bin/activate

then install requirements
pip install -r requirements.txt

and then install inky

pip install inky[rpi]

oh no this fails gloriously:
```
  × Building wheel for spidev (pyproject.toml) did not run successfully.
  │ exit code: 1
  ╰─> [27 lines of output]
      /tmp/pip-build-env-tg07cdig/overlay/lib/python3.11/site-packages/setuptools/dist.py:476: SetuptoolsDeprecationWarning: Invalid dash-separated options
      !!

              ********************************************************************************
              Usage of dash-separated 'description-file' will not be supported in future
              versions. Please use the underscore name 'description_file' instead.

              By 2024-Sep-26, you need to update your project and remove deprecated calls
              or your builds will no longer be supported.

              See https://setuptools.pypa.io/en/latest/userguide/declarative_config.html for details.
              ********************************************************************************

      !!
        opt = self.warn_dash_deprecation(opt, section)
      running bdist_wheel
      running build
      running build_ext
      building 'spidev' extension
      creating build
      creating build/temp.linux-aarch64-cpython-311
      aarch64-linux-gnu-gcc -Wsign-compare -DNDEBUG -g -fwrapv -O2 -Wall -g -fstack-protector-strong -Wformat -Werror=format-security -g -fwrapv -O2 -fPIC -I/home/ubuntu/nonfleurs/venv/include -I/usr/include/python3.11 -c spidev_module.c -o build/temp.linux-aarch64-cpython-311/spidev_module.o
      spidev_module.c:28:10: fatal error: Python.h: No such file or directory
         28 | #include <Python.h>
            |          ^~~~~~~~~~
      compilation terminated.
      error: command '/usr/bin/aarch64-linux-gnu-gcc' failed with exit code 1
      [end of output]

  note: This error originates from a subprocess, and is likely not a problem with pip.
  ERROR: Failed building wheel for spidev
```

a google search and we might be missing some build dependencies for that one... ugh

let's do 
`apt install gcc-arm-linux-gnueabihf`

and try again...

no dice... how about:
`sudo apt-get install python3-dev`

and try again...
huzaahh! it works!


okay now let's try

before we can use the display we need to update some configuration for the pi to enable some tings
First, make sure you have I2C and SPI enabled in sudo raspi-config.


`sudo raspi-config`

in the interface options, enable I2C and SPI, no need to reboot



we need to make the run file executable

`sudo chmod +x run.sh`

and then

`./run.sh`
