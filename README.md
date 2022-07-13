<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
![Repo Size][size-shield]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/fahri-r/perpustakaan-api">
    <img src="https://i.imgur.com/mkwxUS0.png" alt="Logo" height="80">
  </a>

<h3 align="center">Perpustakaan API</h3>

  <p align="center">
    Backend application for library management system.
    <br />
    <a href="https://github.com/fahri-r/perpustakaan-api"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://apiperpustakaan.herokuapp.com/docs/">View Demo</a>
    ·
    <a href="https://github.com/fahri-r/perpustakaan-api/issues">Report Bug</a>
    ·
    <a href="https://github.com/fahri-r/perpustakaan-api/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]][product-screenshot]

Perpustakaan (Library) is backend application for library management system. It can manage data in libraries such as books, borrows, publishers, employees, and members.

<p align="right">
    <a href="#top">
    <img src="https://img.shields.io/badge/back%20to%20top-%E2%86%A9-blue" />
    </a>
</p>

### Built With

- [AdonisJS](https://adonisjs.com/)
- [Node.js](https://nodejs.org/)

<p align="right">
    <a href="#top">
    <img src="https://img.shields.io/badge/back%20to%20top-%E2%86%A9-blue" />
    </a>
</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- [Node.js v14.7.4 or higher](https://nodejs.org/dist/v14.17.4/)

### Installation

1. Clone the repo.

   ```sh
   git clone https://github.com/fahri-r/perpustakaan-api.git
   ```

2. Install NPM packages.

   ```sh
   npm install
   ```

3. Rename `.env.example` into `.env`.

4. Set the database value in `.env`.

   ```sh
   ...
   MYSQL_HOST=localhost
   MYSQL_PORT=3306
   MYSQL_USER=lucid
   MYSQL_PASSWORD=
   MYSQL_DB_NAME=lucid
   ...
   ```

5. Create database according to **MYSQL_DB_NAME**. in this case I have to create a database named `lucid`.

6. Execute database migration.
   ```sh
   node ace migration:run
   ```

<p align="right">
    <a href="#top">
    <img src="https://img.shields.io/badge/back%20to%20top-%E2%86%A9-blue" />
    </a>
</p>

<!-- USAGE EXAMPLES -->

## Usage

Once you have done the installation, let's start the local server.

```sh
node ace serve --watch
```

Now, Visit http://localhost:3333 and you will see a message saying "Hello World". If you want to see the API Documentation, then visit http://localhost:3333/docs.

<p align="right">
    <a href="#top">
    <img src="https://img.shields.io/badge/back%20to%20top-%E2%86%A9-blue" />
    </a>
</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

<p align="right">
    <a href="#top">
    <img src="https://img.shields.io/badge/back%20to%20top-%E2%86%A9-blue" />
    </a>
</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">
    <a href="#top">
    <img src="https://img.shields.io/badge/back%20to%20top-%E2%86%A9-blue" />
    </a>
</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/fahri-r/main-bersama-api?style=for-the-badge
[contributors-url]: https://github.com/fahri-r/perpustakaan-api/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/fahri-r/main-bersama-api?style=for-the-badge
[forks-url]: https://github.com/fahri-r/perpustakaan-api/network/members
[stars-shield]: https://img.shields.io/github/stars/fahri-r/main-bersama-api?style=for-the-badge
[stars-url]: https://github.com/fahri-r/perpustakaan-api/stargazers
[issues-shield]: https://img.shields.io/github/issues/fahri-r/main-bersama-api?style=for-the-badge
[issues-url]: https://github.com/fahri-r/perpustakaan-api/issues
[license-shield]: https://img.shields.io/github/license/fahri-r/main-bersama-api?style=for-the-badge
[license-url]: https://github.com/fahri-r/perpustakaan-api/blob/main/LICENSE
[size-shield]: https://img.shields.io/github/repo-size/fahri-r/main-bersama-api?style=for-the-badge
[product-screenshot]: https://i.imgur.com/nhbeMAT.png
