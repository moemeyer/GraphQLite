# Studio Server

## What is this?

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

## Installation

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

BASE URL: `http://<your-server-ip>:4001`

## Authentication methods

- `JWT (JSON Web Token)`: The JWT is used to authenticate the user. It comes from the GQLServer Auth service.

Example:

Using `JWT`:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

## General

### List templates

GET (**AUTH**) `/templates` > List templates name

```json
{
  "data": []
}
```

---

### Prettify GraphQL query

POST (**AUTH**) `/prettify` > Prettify a GraphQL query

```json
{
  "text": "string"
}
```

```json
{
  "result": "string"
}
```

---

## User

### Create user

POST `/users` > Create a user

```json
{
  "name": "string",
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

### Update user

POST (**AUTH**) `/users/:id` > Update a user

```json
{
  "name": "string",
  "email": "string",
  "photoURL": "string"
}
```

```json
{
  "success": true
}
```

---

## Groups / Requests / Members

### Create group

POST (**AUTH**) `/groups` > Create a group

```json
{
  "title": "string", // optional
  "template": "string" // optional
}
```

```json
{
  "id": "string"
}
```

---

### Update group

POST (**AUTH**) `/groups/:groupId` > Update a group

```json
{
  "title": "string"
}
```

```json
{
  "success": true
}
```

---

### Delete group

DELETE (**AUTH**) `/groups/:groupId` > Delete a group

```json
{
  "success": true
}
```

---

### Create request

POST (**AUTH**) `/groups/:groupId/requests` > Create a group request. A basic request is created here with `No title` as title.

```json
{
  "groupId": "string"
}
```

```json
{
  "id": "string"
}
```

---

### Update request

POST (**AUTH**) `/groups/:groupId/requests/:requestId` > Update a group request. Only send the fields you want to update.

```json
{
  "title": "string",
  "link": "string",
  "body": "string",
  "headers": "string",
  "notes": "string",
  "variables": "string",
  "appSyncKey": "string",
  "wsProtocol": "string"
}
```

```json
{
  "success": true
}
```

---

### Delete request

DELETE (**AUTH**) `/groups/:groupId/requests/:requestId` > Delete a group request.

```json
{
  "success": true
}
```

---

### Add member

POST (**AUTH**) `/groups/:groupId/members` > Add a member to the group.

```json
{
  "email": "string"
}
```

```json
{
  "success": true
}
```

---

### Edit member permission

POST (**AUTH**) `/groups/:groupId/members/:memberId` > Edit the permissions of a member in the group. Can be either `editor` or `viewer`.

```json
{
  "permission": "editor or viewer"
}
```

```json
{
  "success": true
}
```

---

### Delete member

DELETE (**AUTH**) `/groups/:groupId/members/:memberId` > Delete a member in the group.

```json
{
  "success": true
}
```

---

**PROJECTS ENDPOINTS**

---

### Create project

POST (**AUTH**) `/projects` > Create a project.

```json
{
  "title": "string",
  "region": "string",
  "size": "string"
}
```

```json
{
  "id": "string"
}
```

---

### Update project

POST (**AUTH**) `/projects/:projectId` > Update a project.

```json
{
  "title": "string"
}
```

```json
{
  "success": true
}
```

---

### Delete project

DELETE (**AUTH**) `/projects/:projectId` > Delete a project.

```json
{
  "success": true
}
```
