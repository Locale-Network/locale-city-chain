import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Search, Filter } from "lucide-react";

// Mock feeds data - will be replaced with real data from API
const allFeeds = [
  {
    id: "twitter-followers",
    name: "Twitter Followers",
    category: "social",
    description: "Verify follower count from Twitter profile API with ZK proof.",
    attestations: 1234,
    successRate: 99.8,
    lastAttestation: "2 min ago",
  },
  {
    id: "github-repos",
    name: "GitHub Repositories",
    category: "identity",
    description: "Prove repository ownership and contribution history.",
    attestations: 856,
    successRate: 99.5,
    lastAttestation: "5 min ago",
  },
  {
    id: "discord-roles",
    name: "Discord Roles",
    category: "social",
    description: "Verify Discord server membership and role assignments.",
    attestations: 2341,
    successRate: 98.9,
    lastAttestation: "1 min ago",
  },
  {
    id: "linkedin-employment",
    name: "LinkedIn Employment",
    category: "identity",
    description: "Prove current employment status and company affiliation.",
    attestations: 432,
    successRate: 97.2,
    lastAttestation: "15 min ago",
  },
  {
    id: "wallet-balance",
    name: "Wallet Balance",
    category: "crypto",
    description: "Verify ETH or token balance at a specific block.",
    attestations: 3456,
    successRate: 99.9,
    lastAttestation: "30 sec ago",
  },
  {
    id: "nft-ownership",
    name: "NFT Ownership",
    category: "crypto",
    description: "Prove ownership of specific NFT collections.",
    attestations: 1876,
    successRate: 99.7,
    lastAttestation: "3 min ago",
  },
];

const categories = ["all", "social", "identity", "crypto", "general"];

function getCategoryBadgeClass(category: string): string {
  switch (category) {
    case "social":
      return "badge-social";
    case "identity":
      return "badge-identity";
    case "crypto":
      return "badge-crypto";
    default:
      return "badge-general";
  }
}

export default function FeedsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Browse Data Feeds</h1>
        <p className="text-muted-foreground">
          Explore all available data feeds and find the right one for your use case.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search feeds..."
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "all" ? "default" : "outline"}
              size="sm"
              className="capitalize whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Feeds Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {allFeeds.map((feed) => (
          <Card key={feed.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{feed.name}</CardTitle>
                <Badge
                  variant="outline"
                  className={getCategoryBadgeClass(feed.category)}
                >
                  {feed.category}
                </Badge>
              </div>
              <CardDescription>{feed.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Attestations</span>
                  <span className="font-medium text-foreground">
                    {feed.attestations.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate</span>
                  <span className="font-medium text-success">
                    {feed.successRate}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Last Attestation</span>
                  <span className="font-medium text-foreground">
                    {feed.lastAttestation}
                  </span>
                </div>
              </div>
            </CardContent>
            <div className="p-6 pt-0">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link href={`/feeds/${feed.id}`}>View Details</Link>
                </Button>
                <Button size="sm" className="flex-1">
                  Try It
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State (hidden when there are results) */}
      {allFeeds.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Filter className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No feeds found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
}
