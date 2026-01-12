"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Play,
  Copy,
  CheckCircle2,
  Code,
  Activity,
  TrendingUp,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";

// Mock data - will be replaced with API
const mockFeed = {
  id: "twitter-followers",
  name: "Twitter Followers",
  category: "social",
  description:
    "Verify follower count from Twitter profile API. Creates cryptographic proof of your Twitter follower count at a specific point in time.",
  url: "https://api.twitter.com/2/users/{{userId}}/public_metrics",
  method: "GET",
  jsonPath: "data.public_metrics.followers_count",
  authType: "bearer",
  enabled: true,
  stats: {
    attestationCount: 1234,
    successRate: 99.8,
    lastAttestation: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    attestationsLast24h: 156,
    attestationsLast7d: 892,
  },
};

const mockRecentAttestations = [
  { id: "1", owner: "0x1234...5678", value: "12,450 followers", timestamp: "2 min ago" },
  { id: "2", owner: "0xabcd...ef01", value: "8,721 followers", timestamp: "15 min ago" },
  { id: "3", owner: "0x9876...5432", value: "45,200 followers", timestamp: "1 hour ago" },
  { id: "4", owner: "0xfedc...ba98", value: "2,100 followers", timestamp: "2 hours ago" },
];

const codeExample = `import { createClaimOnAvs } from '@locale/sdk';

const proof = await createClaimOnAvs({
  provider: 'twitter-followers',
  params: {
    userId: 'your_twitter_user_id'
  },
  // Your auth credentials (handled securely)
  secretParams: {
    bearerToken: process.env.TWITTER_BEARER_TOKEN
  }
});

console.log(proof);
// {
//   claimData: { provider: 'twitter-followers', ... },
//   signatures: ['0x...'],
//   witnesses: [{ id: '...', url: '...' }]
// }`;

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

export default function FeedDetailPage({ params: _params }: { params: { id: string } }) {
  const [testUserId, setTestUserId] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTest = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    // Would show result
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/feeds">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{mockFeed.name}</h1>
            <Badge variant="outline" className={getCategoryBadgeClass(mockFeed.category)}>
              {mockFeed.category}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1">{mockFeed.description}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Attestations</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockFeed.stats.attestationCount.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{mockFeed.stats.successRate}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last 24h</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockFeed.stats.attestationsLast24h}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Attestation</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatRelativeTime(new Date(mockFeed.stats.lastAttestation))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="try">
            <TabsList>
              <TabsTrigger value="try">Try It</TabsTrigger>
              <TabsTrigger value="integration">Integration</TabsTrigger>
              <TabsTrigger value="recent">Recent Attestations</TabsTrigger>
            </TabsList>

            {/* Try It Tab */}
            <TabsContent value="try" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Test This Feed</CardTitle>
                  <CardDescription>
                    Enter the required parameters to create an attestation.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="userId">Twitter User ID</Label>
                    <Input
                      id="userId"
                      placeholder="e.g., 123456789"
                      value={testUserId}
                      onChange={(e) => setTestUserId(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      You can find your Twitter User ID using various online tools.
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Authentication Required</Label>
                    <p className="text-sm text-muted-foreground">
                      This feed requires a Bearer Token for authentication. Your token will be
                      handled securely and never exposed in the attestation.
                    </p>
                  </div>

                  <Button
                    className="w-full"
                    onClick={handleTest}
                    disabled={!testUserId || isLoading}
                  >
                    {isLoading ? (
                      "Creating Attestation..."
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Create Attestation
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Integration Tab */}
            <TabsContent value="integration" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Code Example</CardTitle>
                    <Button variant="outline" size="sm" onClick={copyCode}>
                      {copied ? (
                        <CheckCircle2 className="mr-2 h-4 w-4 text-success" />
                      ) : (
                        <Copy className="mr-2 h-4 w-4" />
                      )}
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                  <CardDescription>
                    Use the Locale SDK to create attestations programmatically.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="p-4 bg-muted rounded-lg overflow-x-auto text-sm">
                    <code>{codeExample}</code>
                  </pre>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>API Endpoint</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{mockFeed.method}</Badge>
                    <code className="flex-1 p-2 bg-muted rounded text-sm font-mono">
                      {mockFeed.url}
                    </code>
                  </div>
                  <div>
                    <Label>JSON Path</Label>
                    <code className="block p-2 bg-muted rounded text-sm font-mono mt-1">
                      {mockFeed.jsonPath}
                    </code>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Recent Tab */}
            <TabsContent value="recent">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Attestations</CardTitle>
                  <CardDescription>Latest attestations created using this feed.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockRecentAttestations.map((att) => (
                      <div
                        key={att.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <ShieldCheck className="h-4 w-4 text-success" />
                          <div>
                            <p className="font-medium">{att.value}</p>
                            <p className="text-sm text-muted-foreground font-mono">
                              {att.owner}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{att.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="default">
                <Play className="mr-2 h-4 w-4" />
                Create Attestation
              </Button>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/docs">
                  <Code className="mr-2 h-4 w-4" />
                  View Documentation
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feed Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Provider</span>
                <span className="font-mono">{mockFeed.id}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Method</span>
                <Badge variant="outline">{mockFeed.method}</Badge>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Auth Type</span>
                <span className="capitalize">{mockFeed.authType}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="outline" className="badge-success">
                  Active
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
