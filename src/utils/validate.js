/* 合并对象 */
export const mapValue = (obj, data) => {
  for (let i in data) {
    if (i in obj) {
      obj[i] = data[i];
    }
  }
};

export const mapKey = (obj, data) => {
  for (let i in obj) {
    if (i in data) {
      obj[i] = data[i];
    }
  }
};
