# Bingo Tracker

A simple app for tracking bingo games with multiple boards.

Create games, add and manage bingo boards, and keep track of plays and called numbers in one place.

## What you can do

* Create and manage bingo games
* Add multiple boards to each game
* Import boards from files
* Configure board templates
* Track multiple plays within a game
* Record called numbers as a play progresses
* Define winning patterns for each play
* Manage your games and boards from a single application

## How it works

A typical session looks like:

```text
Game
├── Board 1
├── Board 2
├── Board 3
└── Plays
    ├── Play 1
    └── Play 2
```

Create a game, add its boards, start a play, and record numbers as they're called. Multiple boards and plays can be tracked independently within the same game.

## Architecture

Bingo Tracker follows a pragmatic, feature-oriented architecture inspired by Clean Architecture.

The codebase separates domain logic, application orchestration, UI, and infrastructure while keeping dependencies explicit and testable. Features are organized vertically, with soft boundaries that prioritize cohesion and maintainability over strict isolation.

For a detailed explanation of the architecture, dependency rules, testing strategy, and composition patterns, see [`architecture.md`](./docs/architecture.md).

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
