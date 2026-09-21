import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2024-01-01";

export const sanityConfigured = Boolean(projectId);

// The Sanity CDN can serve data that is a few seconds old, which made the
// pages regenerate right after a publish with stale content. Pages are cached
// by Next.js anyway, so read straight from the API.
export const sanityClient = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: false })
  : null;
