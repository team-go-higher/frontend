export const objectToParams = (o: Object): URLSearchParams => {
  const searchParams = new URLSearchParams();

  Object.entries(o).forEach(([k, v]) => {
    if (Array.isArray(v) && v.length > 0) {
      v.map((e: string) => {
        return searchParams.append(k, e);
      });
    }
    if (!Array.isArray(v) && v !== undefined && v !== null) searchParams.append(k, v.toString());
  });

  return searchParams;
};
