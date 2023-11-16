export namespace ProductPattern {
  export enum Enum {
    Solid,
    Striped,
    Printed,
    Plaid,
    Dotted,
  }

  export const Dictionary: {
    [key in Enum]: string[];
  } = {
    [Enum.Dotted]: ['Dotted'],
    [Enum.Plaid]: ['Plaid'],
    [Enum.Printed]: ['Printed'],
    [Enum.Solid]: ['Solid'],
    [Enum.Striped]: ['Striped'],
  };
}
