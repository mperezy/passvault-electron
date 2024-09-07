FROM debian:bullseye-slim

# Disable interactive mode
ENV DEBIAN_FRONTEND=noninteractive

# Install dependencies and clean up afterwards
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    wget \
    gnupg \
    ca-certificates \
    curl \
    software-properties-common \
    dpkg \
    wine64 \
    mono-complete && \
    dpkg --add-architecture i386 && \
    apt-get update && apt-get install -y --no-install-recommends wine64 mono-complete && \
    curl -fsSL https://dl.winehq.org/wine-builds/winehq.key | tee /etc/apt/trusted.gpg.d/winehq.asc && \
    add-apt-repository "deb https://dl.winehq.org/wine-builds/debian/ bullseye main" && \
    apt-get update && apt-get install -y --install-recommends winehq-stable && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Wine configuration
ENV WINEPREFIX /root/.wine
RUN wine wineboot --init

# Install Git, Node.js, and yarn
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y --no-install-recommends git-all nodejs && \
    npm install -g yarn && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Copy project files
COPY . /app
WORKDIR /app

CMD ["yarn", "makeDist:win"]
