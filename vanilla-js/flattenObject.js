const obj = {
  name: "human",
  powers: ["gaslighting", "anxiety"],
  features: {
    others: {
      hands: {
        count: 2,
        fingers: 5,
      },
      arrayboi: [1, 2, 3],
    },
  },
};

const flattenObj = (obj) => {
  const flattenedObj = {};

  const flatten = (value, newKey) => {
    if (typeof value !== "object") {
      flattenedObj[newKey] = value;
    } else {
      for (const key in value) {
        console.log(key);
        flatten(value[key], newKey ? newKey + "." + key : key);
        console.log("ends");
      }
    }
  };

  flatten(obj, "");
  return flattenedObj;
};

const flattened = flattenObj(obj);
console.log(flattened);
