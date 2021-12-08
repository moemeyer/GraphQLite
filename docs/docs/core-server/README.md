# Core Server

## What is this?

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

## Installation

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

BASE URL: `http://<your-server-ip>:4000`

## Authentication methods

- `JWT (JSON Web Token)`: The JWT is used to authenticate the user and is the recommended way to authenticate a user on the client side.

- `SECRET_API_KEY`: This key should only be used for server-to-server communications. It should not be shared or used by any client app. This key has the "administrator" permission on all the endpoints.

Example:

Using `JWT`:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

Using `SECRET_API_KEY`:

```json
{
  "Authorization": "Bearer b0e636a1-f4d3-48d1-ae65-cb9e87a82d0a"
}
```

## GraphQL

POST (**AUTH**) `/graphql` > GraphQL endpoint for the client _database_ service

## Auth

### Verify user token

GET (**AUTH**) `/auth/verify` > Verify the validity of the provided `idToken`

```json
{
  "admin": true, // optional
  "uid": "string",
  "email": "string"
}
```

---

### Create user

POST `/auth/users` > Create a new user

```json
{
  "email": "string",
  "password": "string"
}
```

```json
{
  "uid": "string",
  "idToken": "string",
  "refreshToken": "string",
  "expires": 3600
}
```

---

### Login user

POST `/auth/login` > Login a user

```json
{
  "email": "string",
  "password": "string"
}
```

```json
{
  "uid": "string",
  "idToken": "string",
  "refreshToken": "string",
  "expires": 3600
}
```

---

### Logout user

POST (**AUTH**) `/auth/logout` > Logout a user (destroy the provided or all `refreshToken`)

```json
{
  "refreshToken": "string" // optional
}
```

```json
{
  "success": true
}
```

---

POST (**AUTH**) `/auth/users/:id` > Update user details (`email`, `password`)

```json
{
  "email": "string", // optional
  "password": "string" // optional
}
```

```json
{
  "uid": "string"
}
```

---

### Refresh token

POST `/auth/refresh` > Obtain a new `idToken` from a `refreshToken`

```json
{
  "refreshToken": "string"
}
```

```json
{
  "uid": "string",
  "idToken": "string",
  "refreshToken": "string",
  "expires": 3600
}
```

---

## Storage

POST (**AUTH**) `/storage/b/:name/upload` > Upload an object in the `:name` bucket

GET `/storage/b/:name/o/:key` > Download the `:key` object from the `:name` bucket

## Admin

The `idToken` (JSON Web Token) of an admin user contains an `admin: true` field which is used to authorize the requests to the `/admin` endpoints.

POST (**AUTH**) `/admin/graphql` > GraphQL endpoint for the admin dashboard (this schema cannot be edited).
This schema contains the following types:

- `GQLUser` type associated to the `gql_users` PostgreSQL table
- `GQLAdminUser` type associated to the `gql_admin_users` PostgreSQL table

---

POST `/admin/auth/users` > Create a new admin user

```json
{
  "email": "string",
  "password": "string"
}
```

```json
{
  "uid": "string",
  "idToken": "string",
  "refreshToken": "string",
  "expires": 3600
}
```

---

POST `/admin/auth/login` > Login an admin user

```json
{
  "email": "string",
  "password": "string"
}
```

```json
{
  "uid": "string",
  "idToken": "string",
  "refreshToken": "string",
  "expires": 3600
}
```

---

POST (**AUTH**) `/admin/auth/logout` > Logout an admin user (destroy the provided or all `refreshToken`)

```json
{
  "refreshToken": "string" // optional
}
```

```json
{
  "success": true
}
```

---

POST `/admin/auth/refresh` > Obtain a new `idToken` from a `refreshToken`

```json
{
  "refreshToken": "string"
}
```

```json
{
  "uid": "string",
  "idToken": "string",
  "refreshToken": "string",
  "expires": 3600
}
```

---

POST (**AUTH**) `/admin/storage/b` > Create a bucket

```json
{
  "name": "string"
}
```

```json
{
  "bucketName": "string"
}
```

---

GET (**AUTH**) `/admin/storage/b` > List all buckets

```json
{
  "data": []
}
```

---

GET (**AUTH**) `/admin/storage/b/:name/o` > List all objects in the `:name` bucket

```json
{
  "data": []
}
```

---
