"use client";

import { MountainIcon, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <MountainIcon className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              NFT Stats Viewer
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="#"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Stats
            </Link>
            <Link
              href="#"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Explore
            </Link>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <form>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search collections..."
                  className="w-full bg-background pl-9 md:w-[250px] lg:w-[300px]"
                />
              </div>
            </form>
          </div>
          <Button variant="outline">Connect Wallet</Button>
        </div>
      </div>
    </header>
  );
}
