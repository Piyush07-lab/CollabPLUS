# Security Policy

## Reporting a Vulnerability

Please **do not** report security vulnerabilities through public GitHub issues.

Instead, report suspected vulnerabilities privately via **GitHub Security Advisories** (under the repository's **Security** tab) or by contacting the repository maintainers directly. Include:

1. A clear description of the vulnerability and affected workspace (`@repo/web`, `@repo/api`, `@repo/shared`).
2. Steps to reproduce or a minimal proof of concept.
3. Potential impact (e.g., E2EE downgrade, RBAC privilege escalation, sandbox escape, XSS, or token leakage).

Maintainers aim to acknowledge reports within **72 hours** and coordinate disclosure once a fix is verified.

---

## Core Security & Privacy Architecture Commitments

As specified in [`docs/VISION.md`](./docs/VISION.md) and [`docs/architecture/SECURITY_E2EE.md`](./docs/architecture/SECURITY_E2EE.md), Phase 2+ implementations must preserve the following invariants:

1. **Default End-to-End Encryption (E2EE)**:
   - E2EE is **enabled by default** for all messages across all Spaces (`Lounge`, `Rooms`, `Workspace`, `Channels`, `Projects`).
2. **Exclusive Owner Toggle Authority**:
   - Only the Space **`owner`** holds the `space:toggle_e2ee` capability to disable Space-wide E2EE (`admin`, `moderator`, and `member` roles cannot).
3. **Persistent Direct Message (DM) E2EE Override**:
   - Individual users can keep E2EE **enabled for Direct Messages** even when communicating inside a Space where Space-wide E2EE has been disabled by its Owner.
4. **Authentication & Data Protection**:
   - All authentication credentials, session tokens, and stored user/room metadata must use industry-standard cryptography (e.g., Argon2id/scrypt password hashing, TLS in transit, authenticated encryption at rest).
5. **Untrusted Code Execution Isolation**:
   - Multi-language compiler execution in Phase 2 must run inside isolated, resource-limited sandboxes with no access to host credentials or internal network services.
