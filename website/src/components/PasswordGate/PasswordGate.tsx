"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@design-system/components/Button/Button";
import styles from "./PasswordGate.module.css";

/**
 * PasswordGate
 * --------------------------------------------------------------
 * Client-side password modal that decrypts a URL using AES-GCM
 * with a key derived from the typed password (PBKDF2).
 *
 * The Drive URL is NOT in the bundle in plaintext. Anyone who
 * inspects the source only sees the ciphertext blobs below.
 * If the password is wrong, decryption fails — no URL leaks.
 * --------------------------------------------------------------
 */

// Encrypted payload generated locally with AES-GCM + PBKDF2 (250k iters, SHA-256)
const SALT_B64 = "D8+zo/HrFPPkgQMu+2+qSw==";
const IV_B64 = "88Cjdz7B5lIgaFRk";
const CT_B64 =
  "Atj1asZ2sivOKZcEcf86DPY0mfQSZ/Hx5VDO7IdMM9YayjHXBjbX0Nn/4x1sTD1EeKnYuFN7tuTQ9OzH1j+kdB9KwMvqVMH+UiO03Bu4W4O3ITdJODcGeYCM2xUhOtothas=";
const PBKDF2_ITERATIONS = 250000;

function b64ToBytes(b64: string): Uint8Array<ArrayBuffer> {
  const bin = atob(b64);
  const buf = new ArrayBuffer(bin.length);
  const out = new Uint8Array(buf);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function decryptUrl(password: string): Promise<string> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: b64ToBytes(SALT_B64),
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );
  const plaintext = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: b64ToBytes(IV_B64) },
    key,
    b64ToBytes(CT_B64)
  );
  return new TextDecoder().decode(plaintext);
}

interface PasswordGateProps {
  /** Label for the trigger button */
  triggerLabel?: string;
}

export default function PasswordGate({
  triggerLabel = "View work samples",
}: PasswordGateProps) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input when the modal opens
  useEffect(() => {
    if (open) {
      setPassword("");
      setError(null);
      // small delay so the element is in the DOM and visible
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || busy) return;
    setBusy(true);
    setError(null);
    try {
      const url = await decryptUrl(password);
      // Sanity check: must look like an http(s) URL
      if (!/^https?:\/\//i.test(url)) {
        throw new Error("invalid");
      }
      window.open(url, "_blank", "noopener,noreferrer");
      setOpen(false);
    } catch {
      setError("Incorrect password");
      setPassword("");
      inputRef.current?.focus();
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Button
        label={triggerLabel}
        priority="primary"
        iconRight="lock"
        onClick={() => setOpen(true)}
      />

      {open && (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="password-gate-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className={styles.modal}>
            <h2 id="password-gate-title" className={styles.title}>
              Enter password
            </h2>
            <p className={styles.subtitle}>
              This link is private. Enter the password to continue.
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="off"
                spellCheck={false}
                className={styles.input}
                aria-label="Password"
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? "password-error" : undefined}
              />

              {error && (
                <p id="password-error" className={styles.error}>
                  {error}
                </p>
              )}

              <div className={styles.actions}>
                <Button
                  label="Cancel"
                  priority="tertiary"
                  onClick={() => setOpen(false)}
                />
                <Button
                  label={busy ? "Checking…" : "Continue"}
                  priority="primary"
                  state={busy || !password ? "disabled" : "default"}
                  onClick={() => {
                    // Button has its own onClick; trigger the form submit programmatically
                    const form = inputRef.current?.form;
                    form?.requestSubmit();
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
