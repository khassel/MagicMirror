FROM node:18-bullseye

WORKDIR $HOME/magicmirror

COPY ./ $HOME/magicmirror/

RUN ls -la
RUN uname -a
RUN cat /etc/os-release
RUN apt-get update
RUN apt-get install -y xvfb
RUN Xvfb :99 -screen 0 1024x768x16 &
RUN export DISPLAY=:99
RUN npm run install-mm:dev
RUN touch css/custom.css
RUN npm run test:prettier
RUN npm run test:js
RUN npm run test:css
RUN npm run test
