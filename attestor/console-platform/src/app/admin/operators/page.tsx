"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  Users,
  Shield,
  AlertCircle,
} from "lucide-react";
import { formatAddress, formatRelativeTime } from "@/lib/utils";

// Mock data - will be replaced with API calls
const mockApplications = [
  {
    id: "1",
    walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
    status: "pending" as const,
    companyName: "Acme Node Operators",
    contactEmail: "ops@acme.io",
    submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    walletAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    status: "in_review" as const,
    companyName: "Blockchain Services Inc",
    contactEmail: "admin@blockservices.co",
    submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    walletAddress: "0x9876543210fedcba9876543210fedcba98765432",
    status: "approved" as const,
    companyName: "Node Masters",
    contactEmail: "team@nodemasters.xyz",
    submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    reviewedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const mockOperators = [
  {
    id: "1",
    walletAddress: "0x9876543210fedcba9876543210fedcba98765432",
    displayName: "Node Masters",
    isWhitelisted: true,
    isRegistered: true,
    teeWallet: "0xabc123...",
    tasksCompleted: 156,
    successRate: 99.4,
  },
  {
    id: "2",
    walletAddress: "0xfedcba9876543210fedcba9876543210fedcba98",
    displayName: "Validator Pro",
    isWhitelisted: true,
    isRegistered: true,
    teeWallet: "0xdef456...",
    tasksCompleted: 89,
    successRate: 98.9,
  },
  {
    id: "3",
    walletAddress: "0x5678901234abcdef5678901234abcdef56789012",
    displayName: null,
    isWhitelisted: true,
    isRegistered: false,
    teeWallet: null,
    tasksCompleted: 0,
    successRate: 0,
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "pending":
      return (
        <Badge variant="outline" className="badge-warning">
          <Clock className="mr-1 h-3 w-3" />
          Pending
        </Badge>
      );
    case "in_review":
      return (
        <Badge variant="outline" className="badge-social">
          <AlertCircle className="mr-1 h-3 w-3" />
          In Review
        </Badge>
      );
    case "approved":
      return (
        <Badge variant="outline" className="badge-success">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Approved
        </Badge>
      );
    case "rejected":
      return (
        <Badge variant="outline" className="badge-danger">
          <XCircle className="mr-1 h-3 w-3" />
          Rejected
        </Badge>
      );
    default:
      return null;
  }
}

export default function OperatorsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const pendingCount = mockApplications.filter(
    (a) => a.status === "pending" || a.status === "in_review"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Operator Management</h1>
        <p className="text-muted-foreground">
          Review applications and manage registered operators.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Operators</CardTitle>
            <Shield className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockOperators.filter((o) => o.isRegistered).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Whitelisted</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockOperators.filter((o) => o.isWhitelisted).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="applications">
        <TabsList>
          <TabsTrigger value="applications" className="gap-2">
            Applications
            {pendingCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {pendingCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="operators">Registered Operators</TabsTrigger>
        </TabsList>

        {/* Applications Tab */}
        <TabsContent value="applications" className="space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search applications..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-4 font-medium">Applicant</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Submitted</th>
                      <th className="text-right p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockApplications.map((app) => (
                      <tr key={app.id} className="border-b last:border-0">
                        <td className="p-4">
                          <div>
                            <p className="font-medium">{app.companyName}</p>
                            <p className="text-sm text-muted-foreground font-mono">
                              {formatAddress(app.walletAddress)}
                            </p>
                          </div>
                        </td>
                        <td className="p-4">{getStatusBadge(app.status)}</td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {formatRelativeTime(new Date(app.submittedAt))}
                        </td>
                        <td className="p-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/operators/${app.id}`}>
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  View Details
                                </Link>
                              </DropdownMenuItem>
                              {app.status === "pending" && (
                                <DropdownMenuItem>
                                  <AlertCircle className="mr-2 h-4 w-4" />
                                  Start Review
                                </DropdownMenuItem>
                              )}
                              {(app.status === "pending" || app.status === "in_review") && (
                                <>
                                  <DropdownMenuItem className="text-success">
                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Reject
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Operators Tab */}
        <TabsContent value="operators" className="space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search operators..." className="pl-10" />
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-4 font-medium">Operator</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">TEE Wallet</th>
                      <th className="text-left p-4 font-medium">Tasks</th>
                      <th className="text-left p-4 font-medium">Success Rate</th>
                      <th className="text-right p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOperators.map((op) => (
                      <tr key={op.id} className="border-b last:border-0">
                        <td className="p-4">
                          <div>
                            <p className="font-medium">
                              {op.displayName || formatAddress(op.walletAddress)}
                            </p>
                            <p className="text-sm text-muted-foreground font-mono">
                              {formatAddress(op.walletAddress)}
                            </p>
                          </div>
                        </td>
                        <td className="p-4">
                          {op.isRegistered ? (
                            <Badge variant="outline" className="badge-success">
                              Registered
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="badge-warning">
                              Pending Registration
                            </Badge>
                          )}
                        </td>
                        <td className="p-4 font-mono text-sm">
                          {op.teeWallet || "-"}
                        </td>
                        <td className="p-4">{op.tasksCompleted}</td>
                        <td className="p-4">
                          {op.successRate > 0 ? (
                            <span className="text-success">{op.successRate}%</span>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/operators/${op.id}`}>
                              View
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
