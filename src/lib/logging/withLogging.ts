import { _getPostHogClient } from "./posthogClient";

type ServiceObject = Record<string, (...args: never[]) => unknown>;

interface AnalyticsEvent {
  service: string;
  method: string;
  durationMs: number;
  status: "success" | "error";
}

function _captureAnalyticsEvent(event: AnalyticsEvent): void {
  const posthogClient = _getPostHogClient();
  if (!posthogClient) return;

  posthogClient.capture({
    distinctId: "server",
    event: "service_method_called",
    properties: event,
  });
}

export function withLogging<T extends ServiceObject>(
  serviceName: string,
  service: T,
): T {
  const wrappedService = {} as Record<string, unknown>;

  for (const methodName of Object.keys(service)) {
    const originalMethod = service[methodName]!;

    wrappedService[methodName] = async (...args: unknown[]) => {
      const startTime = performance.now();
      try {
        const result = await originalMethod(...(args as never[]));
        const durationMs = Math.round(performance.now() - startTime);
        const event = {
          service: serviceName,
          method: methodName,
          durationMs,
          status: "success" as const,
        };
        console.log(JSON.stringify(event));
        _captureAnalyticsEvent(event);
        return result;
      } catch (error) {
        const durationMs = Math.round(performance.now() - startTime);
        const event = {
          service: serviceName,
          method: methodName,
          durationMs,
          status: "error" as const,
        };
        console.log(JSON.stringify(event));
        _captureAnalyticsEvent(event);
        throw error;
      }
    };
  }

  return wrappedService as T;
}
