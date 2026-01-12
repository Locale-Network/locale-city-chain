import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Database, ShieldCheck, Rss, TrendingUp } from "lucide-react";

// Mock featured feeds - will be replaced with real data
const featuredFeeds = [
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
];

const stats = [
  { label: "Total Feeds", value: "24", icon: Database },
  { label: "Attestations", value: "12.5K", icon: ShieldCheck },
  { label: "Active Sources", value: "18", icon: Rss },
  { label: "Success Rate", value: "99.2%", icon: TrendingUp },
];

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

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Discover Verified Data Feeds
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Browse and integrate attestation-backed data feeds powered by Locale&apos;s
          decentralized attestor network. Create verifiable proofs for any API.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Feeds */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Featured Feeds</h2>
          <Button variant="ghost" asChild>
            <Link href="/feeds">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredFeeds.map((feed) => (
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
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Verify a Proof</CardTitle>
            <CardDescription>
              Paste an attestation proof to verify its authenticity and view details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild>
              <Link href="/verify">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Open Verifier
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integration Docs</CardTitle>
            <CardDescription>
              Learn how to integrate data feeds into your application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild>
              <Link href="/docs">
                <Rss className="mr-2 h-4 w-4" />
                View Documentation
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
