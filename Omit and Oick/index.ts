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

type MusicProduct = Album | CollectorEdition | DigitalRelease

// type MusicProductWithoutId = Omit<MusicProduct, 'id'>


// type PartialMusicProduct = Partial<MusicProduct>;
//   ^^^^^^^^^^^^^^^^^^^ 🚁

// 🚁 Hovering over `PartialMusicProduct` shows...
// type PartialMusicProduct = Partial<Album> | Partial<CollectorEdition> | Partial<DigitalRelease>



type DistributiveOmit<T, K extends PropertyKey> = T extends any ? Omit<T, K> : never

type MusicProductWithoutId = DistributiveOmit<MusicProduct, 'id'>