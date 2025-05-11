import { clientQuery } from "@/lib/hono-client";
import { useQuery } from "@tanstack/react-query";

export const useQueryChartCount = () => {
  return useQuery({
    queryKey: ["chart-count"],
    queryFn: async () => {
      const response = await clientQuery.api.charts.count.$get();

      const data = await response.json();

      if ("error" in data) {
        throw new Error(data.error);
      }

      return data.totalItems;
    },
  });
};
