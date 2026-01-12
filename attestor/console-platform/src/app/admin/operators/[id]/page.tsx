"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Mail,
  Globe,
  MessageCircle,
  Shield,
  Server,
  Copy,
  Activity,
} from "lucide-react";
import { formatAddress } from "@/lib/utils";

// Mock data - will be replaced with API call
const mockOperator = {
  id: "1",
  walletAddress: "0x9876543210fedcba9876543210fedcba98765432",
  status: "approved" as const,
  isWhitelisted: true,
  isRegistered: true,
  teeWallet: "0xabc123def456789abc123def456789abc123def4",
  dockerImageHash: "sha256:abc123def456789...",
  profile: {
    companyName: "Node Masters",
    displayName: "Node Masters",
    contactEmail: "team@nodemasters.xyz",
    contactTelegram: "@nodemasters",
    contactDiscord: "nodemasters#1234",
    website: "https://nodemasters.xyz",
    description:
      "Professional node operators with 99.9% uptime guarantee. Running validators since 2020.",
    geographicRegions: ["US", "EU", "APAC"],
    supportedProviders: ["twitter", "github", "discord", "linkedin"],
  },
  stats: {
    tasksCompleted: 156,
    tasksAssigned: 158,
    successRate: 98.7,
    totalEarnings: "2.45",
    avgResponseTime: 1.2,
  },
  submittedAt: "2024-12-01T10:00:00Z",
  reviewedAt: "2024-12-03T15:30:00Z",
  reviewedBy: "admin@locale.network",
};

const mockRecentTasks = [
  { id: "1", provider: "twitter", status: "completed", completedAt: "2 min ago" },
  { id: "2", provider: "github", status: "completed", completedAt: "15 min ago" },
  { id: "3", provider: "discord", status: "completed", completedAt: "1 hour ago" },
  { id: "4", provider: "twitter", status: "expired", completedAt: "2 hours ago" },
  { id: "5", provider: "linkedin", status: "completed", completedAt: "3 hours ago" },
];

export default function OperatorDetailPage({
  params: _params,
}: {
  params: { id: string };
}) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/operators">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">
            {mockOperator.profile.displayName || formatAddress(mockOperator.walletAddress)}
          </h1>
          <p className="text-muted-foreground font-mono">
            {mockOperator.walletAddress}
          </p>
        </div>
        <div className="flex gap-2">
          {mockOperator.isRegistered ? (
            <Badge variant="outline" className="badge-success">
              <Shield className="mr-1 h-3 w-3" />
              Registered
            </Badge>
          ) : (
            <Badge variant="outline" className="badge-warning">
              Pending Registration
            </Badge>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Overview */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockOperator.stats.tasksCompleted}</div>
                <p className="text-xs text-muted-foreground">
                  of {mockOperator.stats.tasksAssigned} assigned
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">
                  {mockOperator.stats.successRate}%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockOperator.stats.totalEarnings} ETH</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockOperator.stats.avgResponseTime}s</div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="profile">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="tee">TEE Configuration</TabsTrigger>
              <TabsTrigger value="tasks">Recent Tasks</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Company Name
                    </label>
                    <p>{mockOperator.profile.companyName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Description
                    </label>
                    <p>{mockOperator.profile.description}</p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Geographic Regions
                      </label>
                      <div className="flex gap-1 mt-1">
                        {mockOperator.profile.geographicRegions.map((region) => (
                          <Badge key={region} variant="secondary">
                            {region}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Supported Providers
                      </label>
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {mockOperator.profile.supportedProviders.map((provider) => (
                          <Badge key={provider} variant="outline">
                            {provider}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`mailto:${mockOperator.profile.contactEmail}`}
                      className="hover:underline"
                    >
                      {mockOperator.profile.contactEmail}
                    </a>
                  </div>
                  {mockOperator.profile.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={mockOperator.profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {mockOperator.profile.website}
                      </a>
                    </div>
                  )}
                  {mockOperator.profile.contactTelegram && (
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-muted-foreground" />
                      <span>{mockOperator.profile.contactTelegram}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tee" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>TEE Wallet</CardTitle>
                  <CardDescription>
                    The TEE-derived wallet address used for signing attestations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {mockOperator.teeWallet ? (
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg font-mono text-sm">
                      <span className="flex-1 truncate">{mockOperator.teeWallet}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(mockOperator.teeWallet!, "tee")}
                      >
                        {copied === "tee" ? (
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No TEE wallet registered yet</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Docker Image</CardTitle>
                  <CardDescription>
                    The Docker image hash used for TEE attestations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {mockOperator.dockerImageHash ? (
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg font-mono text-sm">
                      <Server className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="flex-1 truncate">{mockOperator.dockerImageHash}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(mockOperator.dockerImageHash!, "docker")}
                      >
                        {copied === "docker" ? (
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No Docker image registered</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tasks">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockRecentTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Activity className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium capitalize">{task.provider}</p>
                            <p className="text-sm text-muted-foreground">{task.completedAt}</p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            task.status === "completed" ? "badge-success" : "badge-danger"
                          }
                        >
                          {task.status}
                        </Badge>
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
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {!mockOperator.isWhitelisted && (
                <Button className="w-full" variant="default">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Approve Application
                </Button>
              )}
              {mockOperator.isWhitelisted && !mockOperator.isRegistered && (
                <Button className="w-full" variant="outline">
                  Send Registration Reminder
                </Button>
              )}
              <Button className="w-full" variant="outline" asChild>
                <a
                  href={`https://holesky.etherscan.io/address/${mockOperator.walletAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View on Etherscan
                </a>
              </Button>
              <Separator className="my-2" />
              <Button className="w-full text-destructive" variant="outline">
                <XCircle className="mr-2 h-4 w-4" />
                Revoke Whitelist
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <div className="w-0.5 flex-1 bg-border" />
                  </div>
                  <div className="pb-4">
                    <p className="font-medium">Application Approved</p>
                    <p className="text-sm text-muted-foreground">
                      Dec 3, 2024 • by {mockOperator.reviewedBy}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">Application Submitted</p>
                    <p className="text-sm text-muted-foreground">Dec 1, 2024</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
