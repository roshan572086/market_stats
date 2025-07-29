"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { collections } from "@/lib/data";
import type { Collection } from "@/lib/types";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 10;

type SortKey = keyof Collection;

const formatVolume = (volume: number) => {
  return `Ξ${volume.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const formatPercent = (change: number) => {
  const value = (change * 100).toFixed(1);
  return (
    <span className={change > 0 ? "text-green-600" : "text-red-600"}>
      {change > 0 ? "+" : ""}
      {value}%
    </span>
  );
};

export function StatsTable() {
  const [activeTab, setActiveTab] = useState("24h");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: "ascending" | "descending";
  } | null>({ key: "volume24h", direction: "descending" });
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (key: SortKey) => {
    let direction: "ascending" | "descending" = "descending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "descending"
    ) {
      direction = "ascending";
    }
    setSortConfig({ key, direction });
  };

  const filteredData = useMemo(() => {
    return collections.filter((collection) =>
      collection.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (typeof aValue === "number" && typeof bValue === "number") {
          if (aValue < bValue) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (aValue > bValue) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const SortableHeader = ({
    columnKey,
    children,
    className,
  }: {
    columnKey: SortKey;
    children: React.ReactNode;
    className?: string;
  }) => (
    <TableHead className={cn("p-2", className)}>
      <Button
        variant="ghost"
        onClick={() => handleSort(columnKey)}
        className="px-2"
      >
        {children}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </TableHead>
  );

  return (
    <div className="w-full space-y-6">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        Marketplace Stats
      </h1>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="1h">1H</TabsTrigger>
            <TabsTrigger value="6h">6H</TabsTrigger>
            <TabsTrigger value="24h">24H</TabsTrigger>
            <TabsTrigger value="7d">7D</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative flex-1 md:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search collections..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-card text-card-foreground shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] p-2 text-center">#</TableHead>
              <TableHead className="min-w-[250px] p-2">Collection</TableHead>
              <SortableHeader columnKey="floorPrice" className="text-right">
                Floor Price
              </SortableHeader>
              <SortableHeader
                columnKey={activeTab === "7d" ? "volume7d" : "volume24h"}
                className="text-right"
              >
                Volume
              </SortableHeader>
              <SortableHeader
                columnKey={activeTab === "7d" ? "sales7d" : "sales24h"}
                className="text-right"
              >
                Sales
              </SortableHeader>
              <SortableHeader columnKey="owners" className="text-right">
                Owners
              </SortableHeader>
              <SortableHeader columnKey="supply" className="text-right">
                Supply
              </SortableHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((collection, index) => (
              <TableRow key={collection.id}>
                <TableCell className="p-2 text-center text-muted-foreground">
                  {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                </TableCell>
                <TableCell className="p-2">
                  <div className="flex items-center gap-3">
                    <Image
                      src={collection.logoUrl}
                      alt={`${collection.name} logo`}
                      width={48}
                      height={48}
                      className="rounded-md"
                      data-ai-hint="nft collection"
                    />
                    <span className="font-medium">{collection.name}</span>
                  </div>
                </TableCell>
                <TableCell className="p-2 text-right font-mono">
                  {formatVolume(collection.floorPrice)}
                </TableCell>
                <TableCell className="p-2 text-right font-mono">
                  {formatVolume(
                    activeTab === "7d"
                      ? collection.volume7d
                      : collection.volume24h
                  )}
                </TableCell>
                <TableCell className="p-2 text-right font-mono">
                  {(activeTab === "7d"
                    ? collection.sales7d
                    : collection.sales24h
                  ).toLocaleString()}
                </TableCell>
                <TableCell className="p-2 text-right font-mono">
                  {collection.owners.toLocaleString()}
                </TableCell>
                <TableCell className="p-2 text-right font-mono">
                  {collection.supply.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          <strong>
            {Math.min(
              (currentPage - 1) * ITEMS_PER_PAGE + 1,
              sortedData.length
            )}
          </strong>{" "}
          to{" "}
          <strong>
            {Math.min(currentPage * ITEMS_PER_PAGE, sortedData.length)}
          </strong>{" "}
          of <strong>{sortedData.length}</strong> results
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
