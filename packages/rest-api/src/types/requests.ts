import type { Tables, TablesInsert, TablesUpdate } from "db/supabase/database";






export type Requests = Tables<"index-requests">
export type NewRequest = TablesInsert<"index-requests">
export type UpdateRequest = TablesUpdate<"index-requests">
