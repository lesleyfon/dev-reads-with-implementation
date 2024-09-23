```json
{
  "compilerOptions": {
    // Make indexing stricter
    "noUncheckedIndexedAccess": true,

    // No accidental global scripts
    "moduleDetection": "force",

    // Every other "module" option is wrong
    "module": "NodeNext", // (or "Preserve")

    // Enforced 'type-only' imports
    "verbatimModuleSyntax": true
  }
}
```
noUncheckedIndexedAccess
---

`noUncheckedIndexedAccess` is by now pretty well known. Without it, TypeScript lets you stumble into some pretty nasty runtime errors.
For instance, the code below won't show an error, but will crash at runtime
```ts
const obj: Record<string, string> = {};

obj.a.toUpperCase(); // No error!
```

This is because by default (even with strict: true), TypeScript will assume that any property in obj will be a string, even though it could be undefined at runtime.

```ts
const obj: Record<string, string> = {};

// 'string' in the types, but 'undefined' at runtime
console.log(obj.a);
//              ^ 🚁

// 🚁 Hovering over `a` shows...
string
```

moduleDetection
---
`moduleDetection` force tells TypeScript that you have zero global scripts in your project.

Without it, TypeScript will treat files without imports and exports as global scripts.

This means you get odd errors when you try to declare variables that clash with the global scope:
```ts
const window = {
//    ^^^^^^
// ❗ Cannot redeclare block-scoped variable 'window'.
  glazing: "double",
  heightInFeet: 4,
};
```
But with `moduleDetection: force`, it'll behave correctly.

It's an auto-include for any modern TS project.

module
---
`module` is a setting with a BUNCH of different options. But really, there are only two modern options.

`NodeNext` tells TypeScript that your code will be run by Node.js.

This imposes some constraints, like needing to use specific .js extensions for files.

```ts
// You MUST add the .js extension!
import { foo } from "./foo.js";
```

And `Preserve` tells TypeScript that an external bundler will handle the bundling.

This means you don't need to specify the .js extension.

```ts
import { foo } from "./foo";
```
As a guide, you should use NodeNext when you're transpiling with tsc, and Preserve the rest of the time (like using a frontend framework, or a bundler like Rollup).

Note that NodeNext is equivalent to Node16 - so this is perfectly fine to use, too.

You can specify `moduleResolution` to be Node. This is a pretty common pattern.

But it's a terrible idea.

Many libraries use 'exports' in package.json to specify multiple entry points to their package. But 'Node' doesn't support this.

Kill it with fire wherever you see it:

```json
{
  "compilerOptions": {
    "moduleResolution": "Node" // BAD, do not use
  }
}
```

verbatimModuleSyntax
---

Finally, `verbatimModuleSyntax` makes TypeScript stricter with how you you use imports and exports.

In most cases, this will mean you'll be forced to use import type and export type instead of import and export.

```ts
import { ComponentProps } from "react";
//       ^^^^^^^^^^^^^^
// ❗ 'ComponentProps' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.
```
The way to fix this is to use `import type` instead.

Type-only imports are erased at runtime - and the fewer imports you have, the less runtime code will need to be handled by your bundler.

So, a setting to enforce them is pretty hand

```ts
// No more error!
import type { ComponentProps } from "react";
```

 [TSConfig Cheat Sheet](https://www.totaltypescript.com/tsconfig-cheat-sheet?ck_subscriber_id=2836587167)

