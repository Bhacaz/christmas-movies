# Agent Guidelines for Christmas Movies

## Project Overview

This is an **Advent Christmas Calendar** web application that displays a curated collection of Christmas movies (25 total: 21 films + 4 activities) throughout December. Each day reveals a movie card with:

- Movie poster, title, and release year from TMDB API
- Streaming provider logos (where to watch)
- Gift-wrapped cards that "unwrap" on their designated date with animations
- French language interface ("Calendrier de l'avent")
- Festive UI with snowflakes, Christmas lights, and themed styling using Bulma CSS

**Movie data** is generated via Ruby script (`movie-data/build-data.rb`) that fetches from TMDB and outputs to `movies.json`.

## Build/Lint/Test Commands

- **Development server**: `npm run serve`
- **Build**: `npm run build`
- **Lint**: `npm run lint` (auto-fixes issues)
- **No test suite configured** - project uses manual testing

## Code Style Guidelines

### Vue 3 Composition

- Use **Vue 3** with Options API (not Composition API)
- Component structure: `<template>`, `<script>`, `<style>` (non-scoped)
- Export components with `export default { name: "ComponentName" }`

### Naming Conventions

- **Components**: PascalCase for names and files (e.g., `MovieCard.vue`)
- **Props**: kebab-case in templates, camelCase in props definition
- **Methods/Data**: camelCase for all JavaScript identifiers
- **CSS Classes**: kebab-case with semantic names

### Imports & Formatting

- Use **Prettier** + **ESLint** (extends `@vue/prettier` and `plugin:vue/vue3-essential`)
- Import components at top of `<script>` section
- Use relative imports with `@/` alias for src directory (e.g., `@/assets/img/gift.webp`)
- Double quotes for strings, semicolons optional (Prettier decides)

### Code Patterns

- Pre-commit hooks run lint-staged on `*.{js,jsx,vue}` files automatically
- Avoid TypeScript - project uses plain JavaScript
- Use `v-bind`, `v-for`, `v-if` directives following Vue 3 patterns
- Node version: **20.X** (specified in engines)
