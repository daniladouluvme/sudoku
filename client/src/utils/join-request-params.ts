export const joinRequestParams = (params: {
  [key: string]: string | number;
}): string => {
  if (!params) return "";
  const entries = Object.entries(params);
  if (!entries.length) return "";
  return (
    "?" +
    entries
      .filter(([_, v]) => v !== undefined)
      .map(([k, v]) => `${k}=${v}`)
      .join("&")
  );
};
