const myCounter = () => {
  let i = 0;
  return () => {
    return i++;
  };
};
export default myCounter;
