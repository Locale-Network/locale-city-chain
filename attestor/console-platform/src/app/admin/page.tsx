import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Database, Plus, Activity, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

// Mock data - will be replaced with real data
const stats = [
  { label: "Total Sources", value: "12", icon: Database, change: "+2 this week" },
  { label: "Active", value: "10", icon: CheckCircle2, status: "success" },
  { label: "Pending Review", value: "2", icon: Clock, status: "warning" },
  { label: "Errors (24h)", value: "3", icon: AlertTriangle, status: "danger" },
];

const recentActivity = [
  { action: "Source created", source: "twitter-followers", time: "2 hours ago", user: "admin" },
  { action: "Source updated", source: "github-repos", time: "5 hours ago", user: "admin" },
  { action: "Test executed", source: "discord-roles", time: "1 day ago", user: "admin" },
  { action: "Source enabled", source: "linkedin-employment", time: "2 days ago", user: "admin" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage data sources and monitor feed health.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/sources/new">
            <Plus className="mr-2 h-4 w-4" />
            New Source
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${
                stat.status === "success" ? "text-success" :
                stat.status === "warning" ? "text-warning" :
                stat.status === "danger" ? "text-danger" :
                "text-muted-foreground"
              }`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.change && (
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions + Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/sources">
                <Database className="mr-2 h-4 w-4" />
                View All Sources
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/sources/new">
                <Plus className="mr-2 h-4 w-4" />
                Create New Source
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/settings">
                <Activity className="mr-2 h-4 w-4" />
                View System Health
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest administrative actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-center gap-4 text-sm">
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-muted-foreground">
                      {activity.source} • {activity.user}
                    </p>
                  </div>
                  <span className="text-muted-foreground text-xs">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
