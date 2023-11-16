export namespace ProductColor {
  export enum Enum {
    White,
    Red,
    Green,
    Blue,
    Black,
  }

  export const Dictionary: {
    [key in Enum]: string[];
  } = {
    [Enum.White]: ['White'],
    [Enum.Red]: ['Red'],
    [Enum.Green]: ['Green'],
    [Enum.Blue]: ['Blue'],
    [Enum.Black]: ['Black'],
  };
}
