# Copilot Instructions - ULTRA HIGH STRICT MODE

**⚠️ DEPRECATED: This file has been replaced by XML format.**

All copilot instructions are now defined in **strict XML format** with `ULTRA_HIGH` strict mode enforcement.

📄 **See:** [`copilot-instructions.xml`](./copilot-instructions.xml)

## Key Enforcement Levels

- **CRITICAL**: Code rejection required. Feature must be refactored before merge.
- **HIGH**: Code review required. Must be fixed before merge.
- **MEDIUM**: Should be fixed. Can be noted for improvement.
- **LOW**: Optional improvements. Not blocking.

## Summary of Rules

### Absolute Requirements (CRITICAL)
1. **TypeScript Only** - NO JavaScript files allowed
2. **No Direct API Calls** - ALWAYS use Redux + Saga
3. **Feature Slice Pattern** - Exact directory structure required
4. **Functional Components Only** - NO class components
5. **Response Format** - Exact API response structure required
6. **SQL Security** - NO raw SQL concatenation

### High Priority Requirements
- Use TypeScript interfaces for all props and state (no `any`)
- Keep reducers pure (no side effects)
- All error handling must be consistent
- Follow ESLint rules with zero warnings

### See XML for Complete Details
The XML file contains comprehensive rules with specific violation levels and enforcement requirements.
