export const getType = (something: any) => {
  const type = Object.prototype.toString.call(something);
  return type.slice(8, type.length-1).toLowerCase();
}