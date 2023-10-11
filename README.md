# Tailwind Classes Obfuscator
[![npm version](https://badge.fury.io/js/tailwind-obfuscator.svg)](https://badge.fury.io/js/tailwindobfuscation) [![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**tailwind-obfuscator** is a SvelteKit utility that provides advanced obfuscation capabilities for Tailwind CSS classes. Safeguard your CSS code by replacing class names and IDs with randomly generated strings. This utility helps protect your CSS code from reverse engineering and unauthorized copying.
## Features  
-  **Easy Setup**: Get started quickly with a straightforward installation and setup process. 
-  **Class Name Obfuscation**: Replace class selectors with prefixed, simplified, or randomly generated strings to obscure their original tailwind classes.
- **Lightweight**: The `tailwind-obfuscator` package is over 1GB. Just kidding :cold_face:. 
-  **SvelteKit Friendly**: Seamlessly integrate into SvelteKit projects.

## Prerequisites

This project requires NodeJS (version 8 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
6.4.1
v8.16.0
```

## Table of contents

- [Tailwind Classes Obfuscator](#tailwind-classes-obfuscator)
  - [Prerequisites](#prerequisites)
  - [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Build your CSS with Tailwind CLI](#build-your-css-with-tailwind-cli)
    - [Obfuscate TailwindCSS classes](#run-the-twobfus-command-to-obfuscate-your-tailwind-css-classes)
    - [Config Svelte Project](#config-your-svelte.config.js-import-and-add-it-to-the-preprocess-part)
  - [Command Properties](#command-properties)
    - [twobfus](#twobfus)
      - [Parameters](#parameters)
  - [Contributing](#contributing)
  - [Authors](#authors)
  - [License](#license)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Installation

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
import { vitePreprocess } from '@sveltejs/kit/vite';
import twObfuscator from 'tailwind-obfuscator'; // Import your custom attribute replacement function

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

| Type | Default value | Description |
| --- | --- | --- |
| string| null | Time in milliseconds |



`delay`

| Type | Default value | Description |
| --- | --- | --- |
| number | 5 | Time in milliseconds |


## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit -am 'Add some feature'`
5.  Push to the branch: `git push origin my-new-feature`
6.  Submit a pull request :sunglasses:


## Authors

* **[xinnypie](https://github.com/xinnypie)** - *Noob*

See also the list of [contributors](https://github.com/xinnypie/tailwind-obfuscator/contributors) who participated in this project.

## License

[MIT License](LICENSE.md) © xinnypie
