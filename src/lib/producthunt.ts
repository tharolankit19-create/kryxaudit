import type { RawResult } from "./types";

const PH_GRAPHQL = "https://api.producthunt.com/v2/api/graphql";

// Product Hunt GraphQL search across posts for a query term.
export async function searchProductHunt(query: string): Promise<RawResult[]> {
  const token = process.env.PRODUCTHUNT_TOKEN;
  if (!token) return [];

  const gql = `
    query Search($q: String!) {
      posts(first: 5, order: RANKING, topic: null) {
        edges {
          node {
            name
            tagline
            url
            website
            createdAt
            votesCount
          }
        }
      }
    }`;

  try {
    const res = await fetch(PH_GRAPHQL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: gql, variables: { q: query } }),
      // Product Hunt is rate-limited; keep it snappy.
      signal: AbortSignal.timeout(9000),
    });
    if (!res.ok) return [];
    const data = await res.json();
    const edges = data?.data?.posts?.edges ?? [];
    return edges
      .map((e: any) => e.node)
      .filter((n: any) => n && n.name)
      .map((n: any) => ({
        name: n.name,
        tagline: n.tagline || "",
        url: n.website || n.url || null,
        source: "producthunt",
        lastActivity: n.createdAt || null,
        meta: { votes: n.votesCount },
      })) as RawResult[];
  } catch {
    return [];
  }
}
