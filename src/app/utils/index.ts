export const Utils = {
  getValuesFromEnum<T>(enumObject: T) {
    return Object.values(enumObject as keyof T) as unknown as (keyof T)[];
  },

  chooseRandomElement<T>(array: T[]) {
    const index = Math.floor(Math.random() * array.length);
    return {
      index,
      value: array[index] as string[],
    };
  },
};
