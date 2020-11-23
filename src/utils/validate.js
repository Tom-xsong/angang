/* 合并对象 */
export const mapValue = (obj, data) => {
  for (let i in data) {
    if (i in obj) {
      obj[i] = data[i];
    }
  }
};
