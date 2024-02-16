FROM ubuntu:latest

# Disable interactive mode
ENV DEBIAN_FRONTEND=noninteractive

# Install required dependencies
RUN apt-get update && \
    apt-get install -y wget gnupg ca-certificates && \
    dpkg --add-architecture i386 && \
    apt-get update && \
    apt-get install -y wine64 && \
    apt-get install -y mono-complete

# Download and install Wine from WineHQ
RUN dpkg --add-architecture i386 && \
    apt-get update && \
    apt-get install -y curl && \
    apt-get install -y software-properties-common && \
    curl -fsSL https://dl.winehq.org/wine-builds/winehq.key | apt-key add - && \
    add-apt-repository "deb https://dl.winehq.org/wine-builds/ubuntu/ $(lsb_release -cs) main" && \
    apt-get update && \
    apt-get install -y --install-recommends winehq-stable

# Wine configuration
#ENV WINEARCH win32
ENV WINEPREFIX /root/.wine
RUN wine wineboot --init

# Install Git, Nodej.js and yarn
RUN apt-get install -y git-all && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g yarn

# Copy project files
COPY . /app
WORKDIR /app

CMD ["yarn", "makeDist:win"]