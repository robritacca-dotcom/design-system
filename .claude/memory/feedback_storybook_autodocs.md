---
name: feedback_storybook_autodocs
description: Storybook foundations stories need tags autodocs for docs pages to resolve
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 8795adf5-551f-4ab9-80b8-55e7fa6f8b09
---

Foundations Storybook stories (Tokens, Typography, Logos, Icons) must include `tags: ['autodocs']` in their meta object for the `/docs/foundations-*--docs` URL paths to exist.

**Why:** Without the tag, Storybook doesn't generate the autodocs page, so any website links using `storybookPath="/?path=/docs/foundations-*--docs"` 404 with "Couldn't find story matching...". Confirmed fix worked in production.

**How to apply:** Any time a new foundations (or component) story is created, ensure `tags: ['autodocs']` is in the meta. Check existing stories if a Storybook link from the website is broken.
