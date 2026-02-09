# Clear Next.js Cache to Fix Compilation Issues

If your site is stuck compiling or won't load, try these steps:

## Quick Fix

1. **Stop the dev server** (Ctrl+C if it's running)

2. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   ```

3. **Clear node_modules cache (optional but recommended):**
   ```bash
   rm -rf node_modules/.cache
   ```

4. **Restart the dev server:**
   ```bash
   npm run dev
   ```

## If Issues Persist

If the site still won't load after clearing cache:

1. **Full clean install:**
   ```bash
   rm -rf .next node_modules package-lock.json
   npm install
   npm run dev
   ```

2. **Check for errors in the terminal** - look for any red error messages

3. **Try accessing the site** at http://localhost:3001

## Webpack Cache Warnings

The webpack warnings about managed paths are harmless and won't prevent the site from loading. They're just informational messages about webpack's cache strategy.

If compilation hangs, it's usually due to:
- Corrupted cache (fixed by clearing .next)
- Missing dependencies (fixed by npm install)
- TypeScript/compilation errors (check terminal for red errors)

