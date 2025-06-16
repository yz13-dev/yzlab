
const BUCKET_URL = "https://nhfgsubkgppotdlwtecy.supabase.co/storage/v1/object/public/"

export const imageHandler = (image: string) => {
  if (image.startsWith("data:image")) return image;
  return `${BUCKET_URL}${image}`
}
