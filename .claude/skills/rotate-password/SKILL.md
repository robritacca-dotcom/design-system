---
name: rotate-password
description: Re-encrypt the PasswordGate ciphertext for a new password. Use when asked to rotate, change, or update the PasswordGate or work page password.
---

# rotate-password

Re-encrypt the PasswordGate ciphertext for a new password.

## When invoked

Use this skill when asked to rotate, change, or update the PasswordGate password — phrases like "rotate the password", "change the work page password", "update the password gate".

## Instructions

1. **Read** `website/src/components/PasswordGate/PasswordGate.tsx` to confirm the current constants (`SALT_B64`, `IV_B64`, `CT_B64`, `PBKDF2_ITERATIONS`).

2. **Ask Rob for the new password** — do not log it, display it in output, or include it in any commit message or diff description. Handle it only in the encryption step.

3. **Ask Rob to confirm the target URL** to encrypt (the Google Drive or portfolio link). Confirm it matches the intent of the existing ciphertext. Do not display the decrypted URL of the existing ciphertext — just ask Rob to provide the URL fresh.

4. **Generate the new ciphertext** by running a Node.js script via Bash using the Web Crypto API:

   ```js
   const crypto = require("crypto").webcrypto;
   const password = process.argv[2];
   const url = process.argv[3];

   async function encrypt() {
     const enc = new TextEncoder();
     const salt = crypto.getRandomValues(new Uint8Array(16));
     const iv = crypto.getRandomValues(new Uint8Array(12));
     const keyMaterial = await crypto.subtle.importKey(
       "raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]
     );
     const key = await crypto.subtle.deriveKey(
       { name: "PBKDF2", salt, iterations: 250000, hash: "SHA-256" },
       keyMaterial,
       { name: "AES-GCM", length: 256 },
       false,
       ["encrypt"]
     );
     const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, enc.encode(url));
     const b64 = (buf) => Buffer.from(buf).toString("base64");
     console.log(JSON.stringify({ salt: b64(salt), iv: b64(iv), ct: b64(new Uint8Array(ct)) }));
   }
   encrypt();
   ```

   Run as: `node script.mjs "<password>" "<url>"` — pass password and URL as arguments, never hardcode them in the file.

5. **Update `PasswordGate.tsx`** — replace only `SALT_B64`, `IV_B64`, and `CT_B64` with the new base64 values. Do not touch any other code.

6. **Show Rob the updated constants** (the base64 strings only — not the password or plaintext URL).

7. **Clean up** the temporary script file immediately after use.

8. **Remind Rob** to commit with a message like: `"Rotate PasswordGate ciphertext to a stronger password"`

## Security notes

- Never display the plaintext password in tool output, file content, or commit messages
- Never display the decrypted URL in output — only the base64 ciphertext blobs
- The `PBKDF2_ITERATIONS` constant (250,000) must not be changed — it must match between encryption and decryption
