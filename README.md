# Law Enforcement Meta Parser (le-meta-parser) 🚀

A lightweight and efficient library to parse specific nested HTML structures from Meta response files into clean, hierarchical JSON objects.

Designed to handle complex parent-child relationships within HTML documents, converting them into structured data for APIs, data analysis, or dynamic interfaces.

## ✨ Features

* **Recursive Parsing:** Automatically detects nesting levels based on CSS classes (`div.t.o`).
* **Smart Text Extraction:** Filters out empty nodes and handles single vs. multiple text elements.
* **Flexible Input:** Works with both full `Document` objects and specific `Element` nodes.
* **Zero Dependencies:** Pure JavaScript, lightweight and fast.

## 📦 Installation

Install via npm:

```bash
npm install le-meta-parser
```

Or via yarn:

```bash
yarn add le-meta-parser
```

## 🚀 Quick Start

### 1. In the Browser (ES Modules)

If you are using a modern environment (Vite, Webpack, React, Vue, etc.):

```javascript
import { LEMetaParser } from 'le-meta-parser';

// Example: Parsing an uploaded file content
const htmlString = '<div class="t o"><div class="t i">Title</div><div class="m"><div>Content</div></div></div>';
const parser = new DOMParser();
const doc = parser.parseFromString(htmlString, 'text/html');

const result = LEMetaParser(doc);
console.log(result);
```

### 2. In Node.js

Since this library interacts with the DOM, you'll need `jsdom` to simulate a browser environment in Node:

```javascript
import { JSDOM } from 'jsdom';
import { LEMetaParser } from 'le-meta-parser';

const html = `...your html...`;
const { window } = new JSDOM(html);

const result = LEMetaParser(window.document);
console.log(JSON.stringify(result, null, 2));
```

## 🛠 Expected HTML Structure

The parser looks for elements with specific classes to build the hierarchy:

* **Container:** `div.t.o` (Represent a group/node)
* **Key (Title):** `div.t.i` (The property name in JSON)
* **Value (Content):** `div.m > div` (The data associated with the key)

## 📖 API Reference

### `LEMetaParser(root)`
The main function. Takes a DOM Document or Element and returns a formatted JS object/array.

## 📄 License

This project is licensed under the GNU General Public License (GPL), a free software license that guarantees users the freedom to run, study, share, and modify the software.

The GPL is a copyleft license, which means that any modified versions of the software must also be distributed under the same terms of the license. This promotes a free software community, encouraging collaboration and the sharing of improvements.

For more information about the GPL and its terms and conditions of use, visit GNU General Public License.