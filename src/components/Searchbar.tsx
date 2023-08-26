"use client";

import { Prisma, Novel } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import debounce from "lodash.debounce";
import { usePathname, useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { Users } from "lucide-react";

interface SearchBarProps {
  theme: string | undefined;
}

const SearchBar: FC<SearchBarProps> = ({ theme }) => {
  const [input, setInput] = useState<string>("");
  const pathname = usePathname();
  const commandRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useOnClickOutside(commandRef, () => {
    setInput("");
  });

  const request = debounce(async () => {
    refetch();
  }, 300);

  const debounceRequest = useCallback(() => {
    request();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    data: queryResults,
    refetch,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      if (!input) return [];
      const { data } = await axios.get(`/api/search?q=${input}`);
      return data as (Novel & {
        _count: Prisma.NovelCountOutputType;
      })[];
    },
    queryKey: ["search-query"],
    enabled: false,
  });

  useEffect(() => {
    setInput("");
  }, [pathname]);

  return (
    <Command
      ref={commandRef}
      className={` ${
        theme === "dark" ? "dark" : ""
      } relative rounded-lg border bg-search text-search-foreground max-w-lg z-50 overflow-visible ml-auto`}
    >
      <CommandInput
        onValueChange={(text) => {
          setInput(text);
          debounceRequest();
        }}
        value={input}
        className={` ${
          theme === "dark" ? "dark" : ""
        } text-search-foreground outline-none border-none focus:border-none focus:outline-none ring-0`}
        placeholder="Search Novels..."
      />

      {input.length > 0 && (
        <CommandList className="bg-search absolute top-full inset-x-0 shadow rounded-b-md">
          {isFetched && (
            <CommandEmpty>
              <p className="text-search-foreground">No results found.</p>
            </CommandEmpty>
          )}
          {(queryResults?.length ?? 0) > 0 ? (
            <CommandGroup heading="Novels">
              {queryResults?.map((novel) => (
                <CommandItem
                  onSelect={(e) => {
                    router.push(`/n/${e}`);
                    router.refresh();
                  }}
                  key={novel.id}
                  value={novel.title}
                >
                  <Users className="mr-2 h-4 w-4" />
                  <a href={`/n/${novel.title}`}>n/{novel.title}</a>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      )}
    </Command>
  );
};

export default SearchBar;
