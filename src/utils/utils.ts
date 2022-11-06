export function shuffle<T extends Array<any>>(arr: T): T[number][] {
  const newArr = [...arr];

  let currentIndex = newArr.length; let
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    [newArr[currentIndex], newArr[randomIndex]] = [
      newArr[randomIndex], newArr[currentIndex]];
  }

  return newArr;
}
