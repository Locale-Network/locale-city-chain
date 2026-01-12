"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  RefreshCw,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  Activity,
  Zap,
} from "lucide-react";
import { formatAddress, formatRelativeTime } from "@/lib/utils";

type TaskStatus = "created" | "pending" | "completed" | "expired" | "challenged" | "slashed";

// Mock data - will be replaced with API calls
const mockTasks = [
  {
    id: "1",
    taskIndex: 156,
    provider: "twitter",
    owner: "0x1234567890abcdef1234567890abcdef12345678",
    status: "completed" as TaskStatus,
    feePaid: "0.001",
    operators: [
      { address: "0xabc...", signed: true },
      { address: "0xdef...", signed: true },
    ],
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    taskIndex: 155,
    provider: "github",
    owner: "0xabcdef1234567890abcdef1234567890abcdef12",
    status: "pending" as TaskStatus,
    feePaid: "0.001",
    operators: [
      { address: "0xabc...", signed: true },
      { address: "0xdef...", signed: false },
    ],
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    taskIndex: 154,
    provider: "discord",
    owner: "0x9876543210fedcba9876543210fedcba98765432",
    status: "completed" as TaskStatus,
    feePaid: "0.001",
    operators: [
      { address: "0xabc...", signed: true },
      { address: "0xdef...", signed: true },
    ],
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 28 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    taskIndex: 153,
    provider: "twitter",
    owner: "0x5678901234abcdef5678901234abcdef56789012",
    status: "expired" as TaskStatus,
    feePaid: "0.001",
    operators: [
      { address: "0xabc...", signed: false },
      { address: "0xdef...", signed: false },
    ],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    taskIndex: 152,
    provider: "linkedin",
    owner: "0xfedcba9876543210fedcba9876543210fedcba98",
    status: "challenged" as TaskStatus,
    feePaid: "0.001",
    operators: [
      { address: "0xabc...", signed: true },
      { address: "0xdef...", signed: true },
    ],
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 4.5 * 60 * 60 * 1000).toISOString(),
  },
];

const stats = {
  total: 156,
  completed: 148,
  pending: 3,
  expired: 4,
  challenged: 1,
  avgCompletionTime: "2.3s",
};

function getStatusIcon(status: TaskStatus) {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-4 w-4 text-success" />;
    case "pending":
      return <Clock className="h-4 w-4 text-warning" />;
    case "expired":
      return <XCircle className="h-4 w-4 text-muted-foreground" />;
    case "challenged":
    case "slashed":
      return <AlertTriangle className="h-4 w-4 text-destructive" />;
    default:
      return <Activity className="h-4 w-4 text-muted-foreground" />;
  }
}

function getStatusBadge(status: TaskStatus) {
  const classes = {
    completed: "badge-success",
    pending: "badge-warning",
    created: "badge-social",
    expired: "bg-muted text-muted-foreground",
    challenged: "badge-danger",
    slashed: "badge-danger",
  };

  return (
    <Badge variant="outline" className={classes[status]}>
      {getStatusIcon(status)}
      <span className="ml-1 capitalize">{status}</span>
    </Badge>
  );
}

export default function TasksPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [providerFilter, setProviderFilter] = useState<string>("all");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Task Monitoring</h1>
          <p className="text-muted-foreground">
            Monitor attestation tasks and operator performance.
          </p>
        </div>
        <Button variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.completed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Challenged</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.challenged}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Time</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgCompletionTime}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by task ID, owner, or provider..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="challenged">Challenged</SelectItem>
            </SelectContent>
          </Select>
          <Select value={providerFilter} onValueChange={setProviderFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Providers</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="github">GitHub</SelectItem>
              <SelectItem value="discord">Discord</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tasks Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 font-medium">Task</th>
                  <th className="text-left p-4 font-medium">Provider</th>
                  <th className="text-left p-4 font-medium">Owner</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Operators</th>
                  <th className="text-left p-4 font-medium">Created</th>
                  <th className="text-left p-4 font-medium">Fee</th>
                </tr>
              </thead>
              <tbody>
                {mockTasks.map((task) => (
                  <tr key={task.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="p-4">
                      <span className="font-mono font-medium">#{task.taskIndex}</span>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="capitalize">
                        {task.provider}
                      </Badge>
                    </td>
                    <td className="p-4 font-mono text-sm">
                      {formatAddress(task.owner)}
                    </td>
                    <td className="p-4">{getStatusBadge(task.status)}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        {task.operators.map((op, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              op.signed ? "bg-success" : "bg-muted"
                            }`}
                            title={`${op.address} - ${op.signed ? "Signed" : "Pending"}`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-muted-foreground">
                          {task.operators.filter((o) => o.signed).length}/
                          {task.operators.length}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {formatRelativeTime(new Date(task.createdAt))}
                    </td>
                    <td className="p-4 font-mono text-sm">{task.feePaid} ETH</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
