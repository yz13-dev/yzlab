export function avatarURL(path: string) {
  const fixedPath = path.startsWith("/") ? path.slice(1, path.length) : path;
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatar/${fixedPath}`;
  return url;
}
