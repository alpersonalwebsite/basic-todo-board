# Basic TODO board

[![Greenkeeper badge](https://badges.greenkeeper.io/alpersonalwebsite/basic-todo-board.svg)](https://greenkeeper.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

This is an easy, basic and raw (minimum styling) example of **HOW to** create a `TODO board`

**NOTE:** This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation
```
yarn install
```

## Running the dev server
```
yarn start
```

## Description

...

Using `React.memo()` 

The first time we render our App we should see in our browser's `console` something like this:

![First render](images/first.png)

However, what happens if we remove a task...?

![After removing a task](images/removing-task.png)

You can see that everything renders again, but that particular task. 

In this small application we will not suffer "performance issues", yet, we can improve its efficiency. 