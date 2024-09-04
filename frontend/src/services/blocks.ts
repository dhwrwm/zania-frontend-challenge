export const getBlocks = async <T>() => {
  const res = await fetch("/blocks");
  if (!res.ok) {
    throw new Error("Failed to fetch  blocs");
  }

  return res.json() as T;
};

export const updateBlocks = async <T>(data: any) => {
  const res = await fetch("/blocks", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch  blocs");
  }

  return res.json() as T;
};
