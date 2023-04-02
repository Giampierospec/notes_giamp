export const performNoteSum = (numbers: number[]) =>
  numbers?.length ? numbers?.reduce((a, b) => a + b) : 0
