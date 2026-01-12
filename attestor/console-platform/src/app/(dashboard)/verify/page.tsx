"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ShieldX, AlertCircle, CheckCircle2 } from "lucide-react";

export default function VerifyPage() {
  const [proofInput, setProofInput] = useState("");
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean;
    checks: {
      signatureValid: boolean;
      witnessAttested: boolean;
      timestampFresh: boolean;
      parametersConsistent: boolean;
    };
    details?: {
      provider: string;
      owner: string;
      timestamp: string;
      age: string;
    };
    errors?: string[];
  } | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    setIsVerifying(true);
    // Mock verification - will be replaced with actual verification logic
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const parsed = JSON.parse(proofInput);
      setVerificationResult({
        isValid: true,
        checks: {
          signatureValid: true,
          witnessAttested: true,
          timestampFresh: true,
          parametersConsistent: true,
        },
        details: {
          provider: parsed.claimData?.provider || "http",
          owner: parsed.claimData?.owner || "0x...",
          timestamp: new Date().toISOString(),
          age: "2 minutes ago",
        },
      });
    } catch {
      setVerificationResult({
        isValid: false,
        checks: {
          signatureValid: false,
          witnessAttested: false,
          timestampFresh: false,
          parametersConsistent: false,
        },
        errors: ["Invalid JSON format. Please paste a valid proof."],
      });
    }

    setIsVerifying(false);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Verify Proof</h1>
        <p className="text-muted-foreground">
          Paste an attestation proof to verify its authenticity and view details.
        </p>
      </div>

      {/* Proof Input */}
      <Card>
        <CardHeader>
          <CardTitle>Proof Data</CardTitle>
          <CardDescription>
            Paste the complete proof JSON object below
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea
            className="w-full h-48 p-4 font-mono text-sm border rounded-lg bg-muted/50 resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder={`{
  "claimData": {
    "provider": "http",
    "parameters": "...",
    "owner": "0x...",
    "timestampS": 1234567890,
    "context": "..."
  },
  "signatures": ["0x..."],
  "witnesses": [{ "id": "...", "url": "..." }]
}`}
            value={proofInput}
            onChange={(e) => setProofInput(e.target.value)}
          />
          <Button
            onClick={handleVerify}
            disabled={!proofInput.trim() || isVerifying}
            className="w-full"
          >
            {isVerifying ? (
              <>Verifying...</>
            ) : (
              <>
                <ShieldCheck className="mr-2 h-4 w-4" />
                Verify Proof
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Verification Result */}
      {verificationResult && (
        <Card className={verificationResult.isValid ? "border-success" : "border-destructive"}>
          <CardHeader>
            <div className="flex items-center gap-2">
              {verificationResult.isValid ? (
                <ShieldCheck className="h-6 w-6 text-success" />
              ) : (
                <ShieldX className="h-6 w-6 text-destructive" />
              )}
              <CardTitle>
                {verificationResult.isValid ? "Valid Proof" : "Invalid Proof"}
              </CardTitle>
            </div>
            <CardDescription>
              {verificationResult.isValid
                ? "This proof has been verified successfully."
                : "This proof failed verification checks."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Verification Checks */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Verification Checks</h4>
              <div className="grid gap-2">
                {Object.entries(verificationResult.checks).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    {value ? (
                      <Badge variant="outline" className="badge-success">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Passed
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="badge-danger">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        Failed
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Proof Details */}
            {verificationResult.details && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Proof Details</h4>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Provider</span>
                    <span className="font-mono">{verificationResult.details.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Owner</span>
                    <span className="font-mono text-xs">{verificationResult.details.owner}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Timestamp</span>
                    <span>{verificationResult.details.age}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Errors */}
            {verificationResult.errors && verificationResult.errors.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-destructive">Errors</h4>
                <ul className="text-sm text-destructive space-y-1">
                  {verificationResult.errors.map((error, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
