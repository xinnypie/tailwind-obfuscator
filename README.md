<div align="center">
    <img src="https://m1r.ai/9/c33f3.png" alt="Tailwind logo">
</div>
<br/>
<div align="center">
  <!-- Downloads Permonth -->
  <a href="https://npmjs.org/package/tailwind-obfuscator"><img src="https://img.shields.io/npm/dm/tailwind-obfuscator.svg" alt="Downloads"></a>
  <a href="LICENSE.md"><img src="https://img.shields.io/github/license/xinnypie/tailwind-obfuscator" alt="License"></a>
  <a href="https://npmjs.com/package/tailwind-obfuscator"><img src="https://img.shields.io/npm/v/tailwind-obfuscator.svg" alt="npm package"></a>
  <a href="https://github.com/xinnypie/tailwind-obfuscator">
    <img src="https://badgen.net/github/stars/xinnypie/tailwind-obfuscator" alt="Star">
  </a>
  <a href="https://pr.new/xinnypie/tailwind-obfuscato"><img src="https://developer.stackblitz.com/img/start_pr_dark_small.svg" alt="Start new PR in StackBlitz Codeflow"></a>
</div>
<br/>

# Tailwind Obfuscator ⚡

> Tailwind Obfuscator for SvelteKit. Protect your TailwindCSS classes from unauthorized copying. Current support includes Svelte, with upcoming features to support Vite, Webpack and Turbopack as well.

- 💡 Easy to Use
- ⚡️ Lightweight and Fast
- 🛠️ Customizable
- 📦 Support for Multiple Bundlers
- 🔩 Comprehensive Functionalities
- 🔑 Robust Protection for your TailwindCSS classes



<details>
<summary>Table of Contents</summary>
<ol>
  <li>
    <a href="#getting-started">Getting Started</a>
    <ul>
      <li><a href="#prerequisites">Prerequisites</a></li>
      <li><a href="#installation">Installation</a></li>
    </ul>
  </li>
  <li><a href="#roadmap">Roadmap</a></li>
  <li>
    <a href="#usage">Usage</a>
    <ul>
      <li><a href="#build-your-css-with-tailwind-cli">Build your CSS with Tailwind CLI</a></li>
      <li><a href="#run-the-twobfus-command-to-obfuscate-your-tailwind-css-classes">Obfuscate TailwindCSS classes</a></li>
      <li><a href="#config-your-svelteconfigjs-import-and-add-it-to-the-preprocess-part">Config Svelte Project</a></li>
    </ul>
  </li>
  <li>
  <a href="#command-properties">Command Properties</a>
    <ul>
      <li>
      <a href="#twobfus">twobfus</a>
        <ul>
          <li><a href="#parameters">Parameters</a></li>
        </ul>
      </li>
    </ul>
  </li>
  <li><a href="#contributing">Contributing</a></li>
  <li><a href="#license">License</a></li>
  <li><a href="#authors">Authors</a></li>
</ol>
</details>

## Roadmap

- [x] Customizable classname length/prefix/suffix
- [ ] Customizable classname prefix/suffix
- [x] Support for SveteKit
- [ ] Zero Config
- [ ] Support for Vite
- [ ] Support for Webpack
- [ ] Support for Turbopack

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

This project requires NodeJS (version 8 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
6.4.1
v8.16.0
```

### Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

To install and set up the library, run:

```sh
$ npm install -D tailwind-obfuscator
```

Or if you prefer using Yarn:

```sh
$ yarn add --dev tailwind-obfuscator
```

Or if you prefer using PNPM:

```sh
$ pnpm add -D tailwind-obfuscator
```

## Usage

### Build your CSS with Tailwind CLI

```sh
$ npx tailwindcss -i <input CSS file> -o <output CSS file>
```

Example

```sh
$ npx tailwindcss -i src/app.css -o build/client/_app/immutable/assets/obfuscated.css
```

The -i flag indicates the input CSS file that includes @tailwind directives, while -o flag indicates the output CSS file. You can minify your CSS by adding the --minify flag

### Run the `twobfus` command to obfuscate your Tailwind CSS classes

```sh
$ npx twobfus --tw <path of built CSS file> <length of class name you want>
```

Example

```sh
$ npx twobfus --tw build/client/_app/immutable/assets/obfuscated.css 5
```

The `--tw` flag indicates the path of the built CSS file, while the second parameter indicates the length of the class name you want. The default value is 5.

### Config your `svelte.config.js` import and add it to the preprocess part

```javascript
import { vitePreprocess } from "@sveltejs/kit/vite";
import twObfuscator from "tailwind-obfuscator"; // Import your custom attribute replacement function

const config = {
  preprocess: [
    vitePreprocess({}),
    twObfuscator({
      enable: true, // Set to true to enable class obfuscation (default is true)
    }),
  ],
  // ...
};

export default config;
```

Once you've configured `tailwind-obfuscator` in your `svelte.config.js` and run the `twobfus` command, your Tailwind CSS classes will be obfuscated automatically during the SvelteKit build process.

## Command Properties

### twobfus

```sh
$ npx twobfus --tw <builtFile> <classLength>
```

#### Parameters

`builtFile`

| Type   | Default value | Description          |
| ------ | ------------- | -------------------- |
| string | null          | Time in milliseconds |

`delay`

| Type   | Default value | Description          |
| ------ | ------------- | -------------------- |
| number | 5             | Time in milliseconds |

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit -am 'Add some feature'`
5.  Push to the branch: `git push origin my-new-feature`
6.  Submit a pull request :sunglasses:

## Authors

- **[xinnypie](https://github.com/xinnypie)** - _Noob_

See also the list of [contributors](https://github.com/xinnypie/tailwind-obfuscator/contributors) who participated in this project.

## License

[MIT License](LICENSE.md) © xinnypie
