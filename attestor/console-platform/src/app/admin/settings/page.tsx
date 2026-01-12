import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Configure application settings and view system health.
        </p>
      </div>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
          <CardDescription>
            Current status of connected services.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <div>
                <p className="font-medium">Attestor Service</p>
                <p className="text-sm text-muted-foreground">wss://attestor.locale.cash/ws</p>
              </div>
            </div>
            <Badge variant="outline" className="badge-success">Connected</Badge>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <div>
                <p className="font-medium">Database</p>
                <p className="text-sm text-muted-foreground">Supabase PostgreSQL</p>
              </div>
            </div>
            <Badge variant="outline" className="badge-success">Connected</Badge>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <div>
                <p className="font-medium">Chain RPC</p>
                <p className="text-sm text-muted-foreground">Holesky Testnet</p>
              </div>
            </div>
            <Badge variant="outline" className="badge-warning">Degraded</Badge>
          </div>
        </CardContent>
      </Card>

      {/* API Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>
            Configure external service connections.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="attestorUrl">Attestor WebSocket URL</Label>
            <Input
              id="attestorUrl"
              defaultValue="wss://attestor.locale.cash/ws"
              className="font-mono text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rpcUrl">Chain RPC URL</Label>
            <Input
              id="rpcUrl"
              defaultValue="https://rpc.holesky.ethpandaops.io"
              className="font-mono text-sm"
            />
          </div>
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Test Connections
          </Button>
        </CardContent>
      </Card>

      {/* Admin Users */}
      <Card>
        <CardHeader>
          <CardTitle>Admin Users</CardTitle>
          <CardDescription>
            Users with administrative access to this console.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">admin@locale.network</p>
                <p className="text-sm text-muted-foreground">Added Dec 1, 2024</p>
              </div>
              <Badge>Owner</Badge>
            </div>
            <Separator />
            <Button variant="outline" size="sm">
              Add Admin User
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible actions that affect all data sources.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Disable All Sources</p>
              <p className="text-sm text-muted-foreground">
                Temporarily disable all active data sources.
              </p>
            </div>
            <Button variant="outline" className="text-destructive border-destructive">
              Disable All
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Clear All Statistics</p>
              <p className="text-sm text-muted-foreground">
                Reset all attestation counts and statistics.
              </p>
            </div>
            <Button variant="outline" className="text-destructive border-destructive">
              Clear Stats
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
