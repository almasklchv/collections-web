export const BASE_URL = "http://localhost:3000";
// https://collections-api-6ldr.onrender.com
export const NO_IMAGE =
  "https://firebasestorage.googleapis.com/v0/b/collections-c7751.appspot.com/o/Image_not_available.png?alt=media&token=7c79ece3-f1a8-4263-941f-b66213d55310";
export const ME =
  localStorage.getItem("user") && localStorage.getItem("user") !== "undefined"
    ? JSON.parse(localStorage.getItem("user") ?? "")
    : null;
export const COLLECTION_TYPE_IMAGES = {
  coins: "https://my.hobbykeeper.com/images/types/SAFE.svg?1",
  postcards: "https://my.hobbykeeper.com/images/types/CARD.svg?1",
  banknotes: "https://my.hobbykeeper.com/images/types/NOTE.svg?1",
  painting: "https://my.hobbykeeper.com/images/types/PAINT.svg?1",
  stamps: "https://my.hobbykeeper.com/images/types/STAMP.svg?1",
};
export const collectionTypes = [
  "COINS",
  "POSTCARDS",
  "BANKNOTES",
  "PAINTING",
  "STAMPS",
];
