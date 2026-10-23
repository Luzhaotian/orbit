const UPSTREAM = "https://github.com/esengine/DeepSeek-Reasonix";

export const COMMUNITY = {
  upstream: UPSTREAM,
  upstreamLabel: "esengine/DeepSeek-Reasonix",
  issues: `${UPSTREAM}/issues`,
} as const;

// GitHub's own rule: alphanumerics and single hyphens, no hyphen at either end, 39 at most.
const LOGIN = /^[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}$/;

export function profileUrl(login: string): string | null {
  return LOGIN.test(login) ? `https://github.com/${login}` : null;
}
