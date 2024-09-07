import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

const GlobalSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: searchTerm,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["q", "type"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, router, pathname, searchParams, query]);
  return (
    <Suspense>
      <div className="relative w-full max-w-[300px]">
        <div className="bg-slate-100 relative flex min-h-[40px] grow items-center gap-1 rounded-xl px-4">
          <CiSearch />
          <Input
            type="text"
            placeholder="Search for title, author, description ..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="paragraph-regular no-focus placeholder border-none shadow-none outline-none bg-transparent text-gray-500"
          />
        </div>
      </div>
    </Suspense>
  );
};

export default GlobalSearch;
