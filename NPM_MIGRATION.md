# NPM Migration - Yarn to NPM

## Overview
Migrated from Yarn to NPM as the official package manager for this project.

## Changes Made

### 1. Created `.npmrc`
Configuration file to enforce NPM settings:
```
legacy-peer-deps=true
engine-strict=true
```

- `legacy-peer-deps=true`: Handles peer dependency conflicts gracefully
- `engine-strict=true`: Enforces Node/NPM version requirements

### 2. Updated `.gitignore`
**Before:**
```
package-lock.json  # Was ignored
yarn-error.log
```

**After:**
```
yarn.lock          # Ignore yarn files
yarn-error.log
.yarn/
.yarnrc
.pnp.*
```

**Now tracking:**
- `package-lock.json` - NPM's lock file (712KB, committed to repo)

### 3. Updated `package.json`
Added engines field to enforce versions:
```json
{
  "engines": {
    "node": ">=22.0.0",
    "npm": ">=10.0.0"
  }
}
```

### 4. Created `.yarnrc.yml`
Notification file to guide developers:
```yaml
# This project uses npm, not yarn
# Please use npm commands instead
```

### 5. Generated `package-lock.json`
- Size: 712KB
- Contains exact dependency tree
- Ensures consistent installs across all environments
- Generated with `npm install --legacy-peer-deps`

## Removed Files
- ❌ `yarn.lock` (if existed)
- ❌ `.yarnrc` (if existed)
- ❌ `.yarn/` directory (if existed)

## Commands Changed

### Installation
```bash
# Before (Yarn)
yarn install

# After (NPM)
npm install
```

### Add Package
```bash
# Before (Yarn)
yarn add package-name

# After (NPM)
npm install package-name
```

### Remove Package
```bash
# Before (Yarn)
yarn remove package-name

# After (NPM)
npm uninstall package-name
```

### Run Scripts
```bash
# Before (Yarn)
yarn build
yarn develop
yarn clean

# After (NPM)
npm run build
npm run develop
npm run clean
```

## Why NPM?

1. **Native to Node.js** - Comes bundled with Node
2. **Better Compatibility** - Works out of the box with Node 22
3. **Simpler Setup** - No additional tool installation
4. **Active Development** - NPM 10+ has significant performance improvements
5. **Workspaces Support** - NPM 7+ has built-in workspace support like Yarn

## Version Requirements

- **Node.js**: >=22.0.0 (currently using v22.21.1) ✅
- **NPM**: >=10.0.0 (comes with Node 22) ✅

## Benefits

✅ **Consistency**: package-lock.json ensures identical dependency trees  
✅ **Speed**: NPM 10+ has comparable speed to Yarn  
✅ **Reliability**: Fewer registry connection issues  
✅ **Simplicity**: One less tool to manage  
✅ **Standards**: NPM is the default standard for Node.js projects  

## Build Status

```bash
✅ npm install - SUCCESS
✅ npm run build - SUCCESS (11 seconds)
✅ All dependencies resolved correctly
✅ No breaking changes
```

## Migration Complete

The project now exclusively uses NPM. All team members should:

1. Remove any local yarn installations in this project
2. Use `npm install` instead of `yarn install`
3. Use `npm run <script>` for all scripts
4. Commit changes to `package-lock.json` when updating dependencies

## Notes

- The `legacy-peer-deps` flag is necessary due to peer dependency conflicts in `@upstatement/eslint-config` which expects ESLint v7 but we use v8
- This is a non-breaking configuration that allows the project to work with modern dependencies
