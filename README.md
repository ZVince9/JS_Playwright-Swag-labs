# TEST Project for Swag Labs

## Table of Contents

- [Description](#description)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Visual](#visual)

## Description

## Playwright

[Playwright](https://github.com/microsoft/playwright) is a Node.js library that provides a high-level API for automating browsers (Chromium, Firefox, and WebKit) for various automation tasks, including testing.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following software installed:

- Node.js: [https://nodejs.org/](https://nodejs.org/)

### Installation

1. Clone this repository to your local machine:

   ```sh
   git clone https://github.com/your-username/test-playwright-cucumber.git

   ```

2. npm install

## Runing Tests

- npm run test-regression-chrome
- npm run test-local
- npm run test-visual

^ depending which suite to run

## Visual

- Project has visual testing integrated with applitools.
- it's checking Login and inventory page after login in.

To run tests run the following

- npm run test-visual

## Dependencies

This project relies on the following dependencies:

- @applitools/eyes-playwright: For visual testing with Applitools Eyes.
- @playwright/test: The Playwright test runner.
- axios: For making HTTP requests.
- dotenv: To load environment variables from a .env file.
- playwright: The Playwright automation library.
