/// <reference path="../.astro/types.d.ts" />

declare module "*.yaml" {
  const value: Record<string, unknown>;
  export default value;
}
