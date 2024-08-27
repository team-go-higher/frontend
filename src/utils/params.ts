export const objectToParams = (o: Object): URLSearchParams => {
  const searchParams = new URLSearchParams();

  Object.entries(o).forEach(([k, v]) => {
    if (Array.isArray(v) && v.length > 0) {
      console.log(v);
      v.map((e: string) => {
        return searchParams.append(k, e);
      });
    }
    if (!Array.isArray(v) && v) searchParams.append(k, v.toString());
  });

  return searchParams;
};
