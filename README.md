
[![Build and deployment workflow](https://github.com/reconmap/web-client/actions/workflows/build-deployment.yml/badge.svg)](https://github.com/reconmap/web-client/actions/workflows/build-deployment.yml)  [![Docker Repository on Quay](https://img.shields.io/badge/quay.io-latest-green "Docker Repository on Quay")](https://quay.io/repository/reconmap/web-client) [![Maintainability](https://api.codeclimate.com/v1/badges/c66c89d29be730d92085/maintainability)](https://codeclimate.com/github/Reconmap/web-client/maintainability) [![Gitter](https://badges.gitter.im/reconmap/community.svg)](https://gitter.im/reconmap/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

# Reconmap Web client

The Reconmap Web client allows users to interact with the Reconmap API to create projects, tasks, commands, reports and much more. Other clients include the [CLI](https://github.com/reconmap/cli) (command line interface) and the [mobile client](https://github.com/reconmap/web-client). 

This is a component of many in the [Reconmap's architecture](https://reconmap.org/development/architecture.html).

## Requirements

- Docker
- Make
- [Reconmap REST API](https://github.com/reconmap/rest-api)

## Running instructions 

```sh
make prepare start
firefox http://localhost:5500/
```
