
Omit and Pick are some of the most loved utility types in TypeScript. They let you create new types by excluding or selecting specific properties from an existing type.

```ts
type Album = {
  id: string;
  title: string;
  genre: string;
};

type AlbumWithoutId = Omit<Album, "id">;

// The album
const album: AlbumWithoutId = {
  id: "1",
//^^
// ❗ Object literal may only specify known properties, and 'id' does not exist in type 'AlbumWithoutId'.
  title: "The Dark Side of the Moon",
  genre: "Progressive Rock",
};
```

However, they have some pretty odd behavior when used with union types.

The Problem
-----------

Consider a scenario where we have three types for `Album`, `CollectorEdition`, and `DigitalRelease`.

These types share two common properties - `id` and `title` - but each also one unique attribute each:

```ts 
type Album = {
  id: string; // same per type
  title: string; // same per type
  genre: string; // different
};

type CollectorEdition = {
  id: string; // same per type
  title: string; // same per type
  limitedEditionFeatures: string[]; // different
};

type DigitalRelease = {
  id: string; // same per type
  title: string; // same per type
  digitalFormat: string; // different
};
```

After creating a `MusicProduct` type that is a union of these three types, say we want to create a `MusicProductWithoutId` type, mirroring the structure of `MusicProduct` but excluding the id field:


```ts
type MusicProduct = Album | CollectorEdition | DigitalRelease

// 🚁 Hovering over `MusicProductWithoutId` shows...
type MusicProduct = Omit<MusicProduct, 'id'>

```

You might assume that `MusicProductWithoutId` would be a union of the three types minus the id field. However, what we get instead is a simplified object type containing only title – the other properties that were shared across all types, without id.

```ts
// Expected:
type MusicProductWithoutId1 =
  | Omit<Album, "id">
  | Omit<CollectorEdition, "id">
  | Omit<DigitalRelease, "id">;

// Actual:
type MusicProductWithoutId2 = {
  title: string;
};
```

This is particularly annoying given that Partial and Required work as expected with union types:

```ts
type PartialMusicProduct = Partial<MusicProduct>;
//   ^^^^^^^^^^^^^^^^^^^ 🚁

// 🚁 Hovering over `PartialMusicProduct` shows...
type PartialMusicProduct = Partial<Album> | Partial<CollectorEdition> | Partial<DigitalRelease>
```



The Solution: DistributiveOmit and DistributivePick
---------------------------------------------------

In order to address this, we can create a DistributiveOmit type. It's defined similarly to Omit but operates individually on each union member.

```ts
type DistributiveOmit<T, K extends PropertyKey> = T extends any
  ? Omit<T, K>
  : never;
```

When we apply DistributiveOmit to our MusicProduct type, we get the anticipated result: a union of Album, CollectorEdition, and DigitalRelease with the id field omitted:

```ts
type MusicProductWithoutId = DistributiveOmit<MusicProduct, "id">;
//   ^^^^^^^^^^^^^^^^^^^^^ 🚁

// 🚁 Hovering over `MusicProductWithoutId` shows...
type MusicProductWithoutId = Omit<Album, "id"> | Omit<CollectorEdition, "id"> | Omit<DigitalRelease, "id">
```

Structurally, this is the same as:

```ts
type MusicProductWithoutId =
  | {
      title: string;
      genre: string;
    }
  | {
      title: string;
      limitedEditionFeatures: string[];
    }
  | {
      title: string;
      digitalFormat: string;
    }; 
```

In situations where you need to use Omit with union types, using a distributive version will give you a much more predictable result.

For completeness, the DistributivePick type can be defined in a similar way:

```ts     
type DistributivePick<T, K extends keyof T> = T extends any
  ? Pick<T, K>
  : never;
```