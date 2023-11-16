export namespace ProductSize {
  export enum Enum {
    XS,
    S,
    M,
    L,
    XL,
    XXL,
  }

  export const Dictionary: {
    [key in Enum]: string[];
  } = {
    [Enum.XS]: ['XS'],
    [Enum.S]: ['S'],
    [Enum.M]: ['M'],
    [Enum.L]: ['L'],
    [Enum.XL]: ['XL'],
    [Enum.XXL]: ['XXL'],
  };
}
