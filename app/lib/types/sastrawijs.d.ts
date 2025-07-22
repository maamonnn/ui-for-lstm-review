declare module 'sastrawijs' {
  export class Stemmer {
    constructor(dictionary?: string[]);
    stem(word: string): string;
  }
  // Tambahkan class lain jika perlu
}