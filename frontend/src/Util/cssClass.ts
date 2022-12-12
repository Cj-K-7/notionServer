export function classCombine(...classes: (string | string[] | undefined)[]) {
  if (classes.length === 1) return classes.flat()[0];
  return classes
    .flat()
    .filter((value) => !!value)
    .join(" ");
}
