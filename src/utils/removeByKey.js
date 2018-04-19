/*
    This is a helper functions that will return a new object
    Use this to remove properties from an object that ref state
    It works because it returns a new object or copy instead of a ref to state
*/
export default (myObj, deleteKey) => {
    return Object.keys(myObj)
      .filter(key => key !== deleteKey)
      .reduce((result, current) => {
        result[current] = myObj[current];
        return result;
    }, {});
}