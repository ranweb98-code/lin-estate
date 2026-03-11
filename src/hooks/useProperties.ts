import { useQuery } from "@tanstack/react-query";
import { fetchPropertiesFromSheet } from "@/services/googleSheets";

export function useProperties() {
  return useQuery({
    queryKey: ["properties"],
    queryFn: fetchPropertiesFromSheet,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}
