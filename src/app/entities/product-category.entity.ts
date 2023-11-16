export namespace ProductCategory {
  export enum Enum {
    Top,
    Dress,
    Bottom,
    Jacket,
    Skirt,
  }

  export const Dictionary: {
    [key in Enum]: string[];
  } = {
    [Enum.Bottom]: ['Bottom', 'Bottoms'],
    [Enum.Dress]: ['Dress', 'Dresses'],
    [Enum.Jacket]: ['Jacket', 'Jackets'],
    [Enum.Skirt]: ['Skirt', 'Skirts'],
    [Enum.Top]: ['Top', 'Tops'],
  };
}
