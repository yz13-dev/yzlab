import type { Tables, TablesInsert } from "db/supabase/database";

export type Domain = Tables<"domains">;

export type DomainLink = Tables<"links">;
export type Snippet = Tables<"snippets">;

export type DomainFull = Domain & {
  links: DomainLink[];
  snippets: Snippet[];
};

export type NewDomain = TablesInsert<"domains">;
export type NewLink = TablesInsert<"links">;
export type NewSnippet = TablesInsert<"snippets">;
