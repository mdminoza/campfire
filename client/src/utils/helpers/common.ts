export const arrayToObject = (
  arr: Object[],
  key = '_id',
  mapFunction: Function = (obj: Object): Object => obj,
): Object =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  arr.reduce((accumulator: any, obj: any): Object => {
    if (obj[key]) {
      return {
        ...accumulator,
        [obj[key]]: mapFunction(obj, accumulator[obj[key]]),
      };
    }

    return accumulator;
  }, {});

export const isSafari = (): boolean => {
  const seemsChrome = navigator.userAgent.indexOf('Chrome') > -1;
  const seemsSafari = navigator.userAgent.indexOf('Safari') > -1;
  return seemsSafari && !seemsChrome;
};
