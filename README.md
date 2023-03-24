# `@fabriciojrepetto/streak-counter` a basic streak-counter

This is practice project, featuring a basic streak counter - inspired by Duolingo - written in TypeScript and meant for the browser (uses `localStorage`)

## Install

```shell
yarn add @FabricioJRepetto/streak-counter
```

```shell
npm install @FabricioJRepetto/streak-counter
```

## Usage
[![Demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/streak-counter-ts-course-forked-80nslo?fontsize=14&hidenavigation=1&theme=dark)

```
import {streakCounter} from '@fabriciojrepetto/streak-counter'

const today = new Date()
const streak = streakCounter(localStorage, today)

// streak returns an object:
// {
//    currentCount: 1,
//    lastLoginDate: "11/11/2021",
//    startDate: "11/11/2021",
// }
```