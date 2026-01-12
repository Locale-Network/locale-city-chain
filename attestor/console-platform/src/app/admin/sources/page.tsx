import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Plus, Search, MoreVertical, Pencil, Trash2, Play, ExternalLink } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data - will be replaced with real data from Supabase
const dataSources = [
  {
    id: "1",
    name: "twitter-followers",
    category: "social",
    description: "Twitter follower count verification",
    enabled: true,
    attestations: 1234,
    lastTested: "2 hours ago",
    createdAt: "Dec 15, 2024",
  },
  {
    id: "2",
    name: "github-repos",
    category: "identity",
    description: "GitHub repository ownership proof",
    enabled: true,
    attestations: 856,
    lastTested: "5 hours ago",
    createdAt: "Dec 10, 2024",
  },
  {
    id: "3",
    name: "discord-roles",
    category: "social",
    description: "Discord server role verification",
    enabled: true,
    attestations: 2341,
    lastTested: "1 day ago",
    createdAt: "Dec 5, 2024",
  },
  {
    id: "4",
    name: "linkedin-employment",
    category: "identity",
    description: "LinkedIn employment status verification",
    enabled: false,
    attestations: 0,
    lastTested: "Never",
    createdAt: "Dec 1, 2024",
  },
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

export default function SourcesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Sources</h1>
          <p className="text-muted-foreground">
            Manage your data source configurations.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/sources/new">
            <Plus className="mr-2 h-4 w-4" />
            New Source
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search sources..." className="pl-10" />
      </div>

      {/* Sources Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 font-medium">Name</th>
                  <th className="text-left p-4 font-medium">Category</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Attestations</th>
                  <th className="text-left p-4 font-medium">Last Tested</th>
                  <th className="text-right p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dataSources.map((source) => (
                  <tr key={source.id} className="border-b last:border-0">
                    <td className="p-4">
                      <div>
                        <Link
                          href={`/admin/sources/${source.id}`}
                          className="font-medium hover:underline"
                        >
                          {source.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {source.description}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant="outline"
                        className={getCategoryBadgeClass(source.category)}
                      >
                        {source.category}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant="outline"
                        className={source.enabled ? "badge-success" : "badge-warning"}
                      >
                        {source.enabled ? "Active" : "Disabled"}
                      </Badge>
                    </td>
                    <td className="p-4 font-mono text-sm">
                      {source.attestations.toLocaleString()}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {source.lastTested}
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
                            <Link href={`/admin/sources/${source.id}`}>
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/sources/${source.id}/edit`}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/sources/${source.id}/test`}>
                              <Play className="mr-2 h-4 w-4" />
                              Test Endpoint
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
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

      {/* Empty State */}
      {dataSources.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No data sources yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first data source to get started.
            </p>
            <Button asChild>
              <Link href="/admin/sources/new">
                <Plus className="mr-2 h-4 w-4" />
                Create Source
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
