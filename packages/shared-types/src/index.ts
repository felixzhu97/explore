/**
 * Cross-project shared types. Prefer importing from here instead of
 * duplicating DTOs across explore-* apps.
 */
export type ExploreServiceId =
  | 'explore-ai'
  | 'explore-iam'
  | 'explore-chat'
  | 'explore-commerce'
  | 'explore-lowcode';

export interface ExploreServiceRef {
  id: ExploreServiceId;
  /** Optional OpenAPI / docs URL for contract checks */
  openApiUrl?: string;
}
