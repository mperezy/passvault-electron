# Passvault Electron

## Requirements

- Node.js
- Yarn
- Docker and `docker-compose` plugin

## How to run

- For development:
  - ```shell
    $ yarn start:dev
    ```
- For production (to see how it looks):
  - ```shell
    $ yarn start:prod
    ```

## How to build installers

### For Linux (Debian based distros):

- This build process can be only executed in a Linux environment. 
- ```shell
  $ yarn makeDist:deb
  ```
- The `.deb` installer can be found in `out/make/deb/x64` folder.


### For Windows:

#### Inside Docker:

- In order to build an installer for windows in a linux/macOS environment we can use docker.
- There are two npm commands both using `docker-compose` V1 or V2
  - ```shell
    # Using docker-compose v1
    $ yarn makeDistWin:composeV1
    ```
  - ```shell
    # Using docker-compose v2
    $ yarn makeDistWin:composeV2
    ```
#### Outside Docker:

- This build process can be only executed in a Windows environment.
- ```shell
  > yarn makeInstallers:windows
  ```
- The `.exe` installer can be found in `out/make/squirrel.windows/x64` folder.

### For macOS:

- This build process can be only executed in a macOS environment.
- ```shell
  $ yarn makeDist:macos
  ```
#### Apple Silicon Chip:

- The `.app` installer can be found in `out/make/Passvault-darwin-arm64` folder.

#### Apple Intel Chip:

- The `.app` installer can be found in `out/make/Passvault-darwin-x64` folder.
