import { PostHog } from "posthog-node";

import { env } from "~/env";

let cachedClient: PostHog | null | undefined;

export function _getPostHogClient(): PostHog | null {
  if (cachedClient !== undefined) return cachedClient;

  const apiKey = env.POSTHOG_KEY;
  if (!apiKey) {
    cachedClient = null;
    return null;
  }

  cachedClient = new PostHog(apiKey);

  process.on("beforeExit", async () => {
    await cachedClient?.shutdown();
  });

  return cachedClient;
}
