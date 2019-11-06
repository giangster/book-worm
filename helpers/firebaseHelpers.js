export const snapshotToArray = snapshot => {
  let returnArray = [];

  snapshot.forEach(snapshotItem => {
    let item = snapshotItem.val();
    item.key = snapshotItem.key;

    returnArray.push(item);
  });

  return returnArray;
};
