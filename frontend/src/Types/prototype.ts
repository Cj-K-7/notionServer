//Array
Array.prototype.classify = function (this) {
  return this.filter((value) => typeof value !== "undefined").join(" ");
};

export {};
