---
name: api
description: Scaffold a new API endpoint — creates route handler and controller function following the project's Express + Prisma pattern
---

# API Skill

Generate a new API endpoint that follows the project's existing Express + Prisma pattern.

## Project Architecture

- **Routes**: `server/routes/api.ts` (route definitions — thin, just dispatch)
- **Controllers**: `server/controllers/` (business logic)
- **Middlewares**: `server/middlewares/index.ts` (validation, auth)
- **Database**: `server/db.ts` (Prisma client instantiation)
- **Types**: `server/types/express.d.ts` (Express type augmentations)

## Endpoint Pattern

### Step 1: Create Controller Function

In the appropriate controller file (or create a new one):

```typescript
import { Request, Response } from 'express';
import { prisma } from '../db.js';

export const someAction = async (req: Request, res: Response) => {
  try {
    // 1. Extract params/body
    const { field } = req.body;

    // 2. Validate (or use middleware)

    // 3. Prisma query
    const result = await prisma.model.findMany();

    // 4. Return response
    res.json({ code: 200, data: result, message: 'Success' });
  } catch (error) {
    console.error('Error in someAction:', error);
    res.status(500).json({ code: 500, message: 'Server error' });
  }
};
```

### Step 2: Add Route

In `server/routes/api.ts`:

```typescript
router.get('/some-path', someAction);
// or with auth middleware:
router.post('/some-path', validateUserId, someAction);
```

## Response Convention

Always use this response format:

```typescript
{
  code: number,    // 200 = success, 400/401/500 = error
  data: any,       // the actual response data
  message: string  // human-readable message
}
```

## Auth Middleware

- `validateUserId` — JWT-based auth middleware that attaches user info to `req.user`
- Use for protected endpoints like create/update/delete

## When Creating

1. Ask the user:
   - HTTP method (GET/POST/PUT/DELETE)
   - URL path
   - What the endpoint should do
   - Whether it needs authentication
2. Read existing controller and route files to match the exact coding style
3. Create/update the controller function
4. Add the route to `server/routes/api.ts`
