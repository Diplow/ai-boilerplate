type ServiceObject = Record<string, (...args: never[]) => unknown>;

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
        console.log(
          JSON.stringify({
            service: serviceName,
            method: methodName,
            durationMs,
            status: "success",
          }),
        );
        return result;
      } catch (error) {
        const durationMs = Math.round(performance.now() - startTime);
        console.log(
          JSON.stringify({
            service: serviceName,
            method: methodName,
            durationMs,
            status: "error",
          }),
        );
        throw error;
      }
    };
  }

  return wrappedService as T;
}
