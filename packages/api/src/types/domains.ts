import type { Tables, TablesInsert } from "@yzlab/supabase/supabase/database";

export type Domain = Tables<"domains">;

export type DomainLink = Tables<"links">;
export type Snippet = Tables<"snippets">;

export type DomainLinkWithBlur = DomainLink & {
  blurImageURL: string | null
}
export type DomainLinkWithBufferScreenshot = Omit<DomainLink, "screenshot"> & {
  screenshot: Buffer<ArrayBufferLike> | null
}

export type DomainFull = Domain & {
  links: DomainLink[];
  snippets: Snippet[];
};

export type NewDomain = TablesInsert<"domains">;
export type NewLink = TablesInsert<"links">;
export type NewSnippet = TablesInsert<"snippets">;

export type UpdateDomain = TablesInsert<"domains">;
export type UpdateLink = TablesInsert<"links">;
export type UpdateSnippet = TablesInsert<"snippets">;
