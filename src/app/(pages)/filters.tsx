"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDownZA, ArrowUpZA } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function Filters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className="flex gap-4 mt-8">
      <Input
        placeholder="Search course..."
        onChange={(e) => {
          router.push(
            pathname + "?" + createQueryString("title", e.target.value),
            { scroll: false },
          );
        }}
      />

      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          router.push(
            pathname +
              "?" +
              createQueryString(
                "sort",
                searchParams.get("sort") === "desc" ? "asc" : "desc",
              ),
            { scroll: false },
          );
        }}
      >
        {searchParams.get("sort") === "desc" ? (
          <ArrowDownZA className="w-5 h-5" />
        ) : (
          <ArrowUpZA className="w-5 h-5" />
        )}
      </Button>
    </div>
  );
}
