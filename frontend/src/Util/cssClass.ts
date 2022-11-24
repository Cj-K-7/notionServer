export function classCombine(...classes: (string | string[] | undefined)[]) {
  return classes
    .flat()
    .filter((value) => typeof value !== "undefined")
    .join(" ");
}
