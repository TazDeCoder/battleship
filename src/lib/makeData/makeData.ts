export default function makeData({
  missed,
  ships,
}: {
  missed: any[];
  ships: any;
}) {
  const arr: any[] = [];
  const shipKeys = [...Object.keys(ships)];
  for (let colIdx = 1; colIdx < 11; colIdx += 1) {
    const colObj: {
      [key: string]: number | 'x' | 'o';
    } = {
      colNum: colIdx,
    };
    shipKeys.forEach((key) => {
      const { hits }: { hits: any[] } = ships[key];
      missed.forEach((miss) => {
        if (miss[1] === colIdx) {
          colObj[`col${miss[0]}`] = 'o';
        }
      });
      hits.forEach((hit) => {
        if (hit[1] === colIdx) {
          colObj[`col${hit[0]}`] = 'x';
        }
      });
      arr[colIdx] = colObj;
    });
  }
  return arr;
}
