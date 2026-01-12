"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Plus, Trash2, Play, Save } from "lucide-react";
import Link from "next/link";

const categories = [
  { value: "social", label: "Social" },
  { value: "identity", label: "Identity" },
  { value: "crypto", label: "Crypto" },
  { value: "general", label: "General" },
];

const authTypes = [
  { value: "none", label: "None" },
  { value: "bearer", label: "Bearer Token" },
  { value: "api-key", label: "API Key" },
  { value: "basic", label: "Basic Auth" },
];

const httpMethods = [
  { value: "GET", label: "GET" },
  { value: "POST", label: "POST" },
];

export default function NewSourcePage() {
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>([]);
  const [validations, setValidations] = useState<{ type: string; value: string }[]>([]);

  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const addValidation = () => {
    setValidations([...validations, { type: "contains", value: "" }]);
  };

  const removeValidation = (index: number) => {
    setValidations(validations.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/sources">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Data Source</h1>
          <p className="text-muted-foreground">
            Configure a new API endpoint for attestation.
          </p>
        </div>
      </div>

      <form className="space-y-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              General information about the data source.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="twitter-followers"
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  Unique identifier for the source (lowercase, hyphens only)
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Verify follower count from Twitter profile API"
              />
            </div>
          </CardContent>
        </Card>

        {/* API Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
            <CardDescription>
              Configure the HTTP endpoint to fetch data from.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="method">Method</Label>
                <Select defaultValue="GET">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {httpMethods.map((method) => (
                      <SelectItem key={method.value} value={method.value}>
                        {method.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-3">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  placeholder="https://api.twitter.com/2/users/{{userId}}"
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Use {"{{param}}"} syntax for dynamic parameters
                </p>
              </div>
            </div>

            {/* Headers */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Headers</Label>
                <Button type="button" variant="outline" size="sm" onClick={addHeader}>
                  <Plus className="mr-1 h-3 w-3" />
                  Add Header
                </Button>
              </div>
              {headers.length > 0 ? (
                <div className="space-y-2">
                  {headers.map((header, i) => (
                    <div key={i} className="flex gap-2">
                      <Input
                        placeholder="Header name"
                        value={header.key}
                        onChange={(e) => {
                          const newHeaders = [...headers];
                          newHeaders[i].key = e.target.value;
                          setHeaders(newHeaders);
                        }}
                        className="flex-1"
                      />
                      <Input
                        placeholder="Value"
                        value={header.value}
                        onChange={(e) => {
                          const newHeaders = [...headers];
                          newHeaders[i].value = e.target.value;
                          setHeaders(newHeaders);
                        }}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeHeader(i)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No custom headers configured.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Authentication */}
        <Card>
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
            <CardDescription>
              Configure authentication for the API endpoint.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="authType">Auth Type</Label>
                <Select defaultValue="none">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {authTypes.map((auth) => (
                      <SelectItem key={auth.value} value={auth.value}>
                        {auth.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="authHeader">Auth Header Name</Label>
                <Input
                  id="authHeader"
                  placeholder="Authorization"
                  className="font-mono"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Response Handling */}
        <Card>
          <CardHeader>
            <CardTitle>Response Handling</CardTitle>
            <CardDescription>
              Configure how to extract and validate data from the response.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="jsonPath">JSON Path</Label>
              <Input
                id="jsonPath"
                placeholder="data.public_metrics.followers_count"
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Path to extract the value from the JSON response
              </p>
            </div>

            {/* Validations */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Response Validations</Label>
                <Button type="button" variant="outline" size="sm" onClick={addValidation}>
                  <Plus className="mr-1 h-3 w-3" />
                  Add Validation
                </Button>
              </div>
              {validations.length > 0 ? (
                <div className="space-y-2">
                  {validations.map((validation, i) => (
                    <div key={i} className="flex gap-2">
                      <Select
                        value={validation.type}
                        onValueChange={(value) => {
                          const newValidations = [...validations];
                          newValidations[i].type = value;
                          setValidations(newValidations);
                        }}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="contains">Contains</SelectItem>
                          <SelectItem value="regex">Regex</SelectItem>
                          <SelectItem value="status_code">Status Code</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Value to match"
                        value={validation.value}
                        onChange={(e) => {
                          const newValidations = [...validations];
                          newValidations[i].value = e.target.value;
                          setValidations(newValidations);
                        }}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeValidation(i)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No validations configured.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/sources">Cancel</Link>
          </Button>
          <Button type="button" variant="secondary">
            <Play className="mr-2 h-4 w-4" />
            Test Endpoint
          </Button>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Create Source
          </Button>
        </div>
      </form>
    </div>
  );
}
