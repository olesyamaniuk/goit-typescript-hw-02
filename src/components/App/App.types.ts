// export interface Image {
//     id: string;
//     title: string;
//     urls: {
//       small: string;
//       regular: string;
//     };
//     alt_description: string;
//   }
// export interface Image {
//   id: string;
//   description: string | null;
//   alt_description: string;
//   urls: {
//     raw: string;
//     full: string;
//     regular: string;
//     small: string;
//     thumb: string;
//   };
//   user: {
//     name: string;
//   };
// }

export interface Image {
  id: string;
  description: string | null;
  alt_description: string; // Change type from string | null to string
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user: {
    name: string;
  };
}


