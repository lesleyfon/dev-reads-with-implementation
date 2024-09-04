## What a Discriminated Union is in TypeScript


One of TypeScript's single greatest features is not technically a feature on its own. It's a pattern for modelling a type that can be in one of several different states: `discriminated unions`.

You can use these "disco unions" (as they're known to their friends) to model a ton of different things. Let's look at the problems they solve.

### The Problem: The Bag Of Optionals
Let's imagine we are modelling a data fetch. We have a State type with a status property which can be in one of three states: loading, success, or error.

```ts
type State = {
  status: "loading" | "success" | "error";
};
```


This is useful, but we also need to capture some extra properties: the data coming back from the fetch, or the error message if the fetch fails.

We could add an error and data property to the State type:
```ts
type State = {
  status: "loading" | "success" | "error";
  error?: string;
  data?: string;
};
```

And let's imagine we have a renderUI function that returns a string based on the input.

```ts
const renderUI = (state: State) => {
  if (state.status === "loading") {
    return "Loading...";
  }

  if (state.status === "error") {
    return `Error: ${state.error.toUpperCase()}`;
//                   ^^^^^^^^^^^
// ❗ 'state.error' is possibly 'undefined'.
  }

  if (state.status === "success") {
    return `Data: ${state.data}`;
  }
};
```

<br>This all looks good, except for the error we're getting on state.error. TypeScript is telling us that state.error could be undefined, and we can't call `toUpperCase` on `undefined`.

This is because we've declared our State type in an incorrect way. We've made it so the error and data properties are *not related to the statuses where they occur.* In other words, it's possible to create types which will never happen in our app:


```ts
type State = {
  status: "loading" | "success" | "error";
  error?: string;
  data?: string;
};

const state: State = {
  status: "loading",
  error: "This is an error", // should not happen on "loading!"
  data: "This is data", // should not happen on "loading!"
};
```
<br>I'd describe this type as a "bag of optionals". It's a type that's too loose. We need to tighten it up so that error can only happen on error, and data can only happen on success.

### The Solution: Discriminated Unions

The solution is to turn our State type into a discriminated union.

A discriminated union is a type that has a common property, the `'discriminant'`, which is a literal type that is unique to each member of the union.

In our case, the status property is the discriminant.

Let's take each status and separate them into separate object literals:
```ts
type State =
  | {
      status: "loading";
    }
  | {
      status: "error";
    }
  | {
      status: "success";
    };

```

<br>Now, we can associate the error and data properties with the error and success statuses respectively:

```ts
type State =
  | {
      status: "loading";
    }
  | {
      status: "error";
      error: string;
    }
  | {
      status: "success";
      data: string;
    };
```
Now, if we hover over `state.error` in the `renderUI` function, we can see that TypeScript knows that `state.error` is a string:
```ts
type State =
  | {
      status: "loading";
    }
  | {
      status: "error";
      error: string;
    }
  | {
      status: "success";
      data: string;
    };

const renderUI = (state: State) => {
  if (state.status === "loading") {
    return "Loading...";
  }

  if (state.status === "error") {
    console.log(state.error);
//                    ^^^^^ 🚁

    return `Error: ${state.error.toUpperCase()}`;
  }

  if (state.status === "success") {
    return `Data: ${state.data}`;
  }
};
// 🚁 Hovering over `error` shows...
(property) error: string
```

<br> This is due to TypeScript's narrowing - it knows that `state.status` is `"error"`, so it knows that `state.error` is a string inside of the if block.

To clean up our original type, we could use a type alias for each of the statuses:
```ts
type LoadingState = {
  status: "loading";
};

type ErrorState = {
  status: "error";
  error: string;
};

type SuccessState = {
  status: "success";
  data: string;
};

type State = LoadingState | ErrorState | SuccessState;
```

<br>So if you're noticing that your types are resembling 'bags of optionals', it's a good idea to consider using a discriminated union.

Summary
- Discriminated unions are a way to model a type that can be in one of several different states.
- They help solve the 'bag of optionals' problem, where a type is too loose because of too many optional properties.
- Discriminated unions have a 'discriminant' - a literal type that is unique to each member of the union.
- TypeScript can narrow the type of a discriminated union based on the discriminant property.
​