export const getGridColsClass = (itemsPerRow: number) => {
  switch (itemsPerRow) {
    case 2:
      return "grid-cols-2";
    case 3:
    default:
      return "grid-cols-3";
  }
};
