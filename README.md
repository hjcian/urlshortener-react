# URL shortener - React Demo
This repo is an very simple react app for demonstrating the [back-end URL shortener system](https://github.com/hjcian/urlshortener-python), you should always run backend server at first.

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
  - [URL Redirections](#url-redirections)

## Usage
### Install
> System Prerequisites
> - git
> - node v10 or latter (developed on v10.22.0)
> - npm 6 or latter (developed on 6.14.6)

```shell
git clone https://github.com/hjcian/urlshortener-react
cd urlshortener-react
npm i
```

### Run as development mode
> Prerequisites
> - you should run my [back-end URL shortener system](https://github.com/hjcian/urlshortener-python) demo first

```shell
npm run start
```
app will run on **localhost:3000** by default

### Build and Run as deployment mode

```shell
npm run build
npm install -g serve
serve -s build
```
app will run on **localhost:5000** by default

## URL Redirections
The redirection function is supported by [backend server](https://github.com/hjcian/urlshortener-python).

So you could just use go to original URL by **Shortened URL**, e.g.:
![](https://i.imgur.com/QaH7P4m.png)
> ***http://127.0.0.1:12345** is the host of backend server.*

You can find more details about backend API on [URL Redirection - /\<token>](https://github.com/hjcian/urlshortener-python#url-redirection---token).