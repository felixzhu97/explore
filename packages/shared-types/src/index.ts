/**
 * Thin Shared Kernel: service identity only.
 * Do not put bounded-context DTOs here — cross-context edges use
 * Published Language (e.g. @explore/contracts-ai OpenAPI).
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
