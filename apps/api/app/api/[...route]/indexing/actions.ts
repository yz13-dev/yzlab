


export const toBase64 = (png: string) => {
  const base64 = `data:image/png;base64,${png}`
  return base64;
}
