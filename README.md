# @js-lion/template


## 功能

- 简易的字符串替换工具

## 安装

**Npm**
```
$ npm install @js-lion/template
```

**yarn**
```
$ yarn add @js-lion/template
```

**pnpm**
```
$ pnpm install @js-lion/template
```

**可以通过 import 导入方式使用**

```
import { template } from "@js-lion/template";
```

**或则通过 require 导入方式使用**

```
const { template } = require("@js-lion/template");
```

## 案例

```
template("姓名={name}", { name: "张三" });

template("/api/user/:id", { id: 1001 });
```
