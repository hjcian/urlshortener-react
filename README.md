# URL shortener - React Demo
This repo is an very simple react app for demonstrating the [back-end URL shortener system](https://github.com/hjcian/urlshortener-python).

This react app provide the following interactive functionalities to you:
1. **Shorten URL**
   - this functionality provide a GUI to you for doing the URL shortening
2. **Preview URL**
   - this functionality take the shortened URL or token then return the original URL if exists.

## Table of Contents
- [URL shortener - React Demo](#url-shortener---react-demo)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
    - [Install](#install)
    - [Run as development mode](#run-as-development-mode)
    - [Build and Run as deployment mode](#build-and-run-as-deployment-mode)

## Usage
### Install
> System Prerequisites
> git
> node v10 or latter (developed on v10.22.0)
> npm 6 or latter (developed on 6.14.6)

```shell
git clone https://github.com/hjcian/urlshortener-react
cd urlshortener-react
npm i
```

### Run as development mode
> Prerequisites
> you should run my [back-end URL shortener system](https://github.com/hjcian/urlshortener-python) demo first

```shell
npm run start
```

### Build and Run as deployment mode

```shell
npm run build
npm install -g serve
serve -s build
```
