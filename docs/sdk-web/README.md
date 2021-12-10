# Web SDK

## What is this?

The GQLServer Web SDK enables you to interact with your GQLServer instance right from your browser. Follow this guide to use the GQLServer JavaScript SDK in your web app.

## Installation

Installation via NPM:

```bash
npm install @relatedcode/gqlite-lib
```

## Configuration

### Set your GQLServer URL

Provide your GQLServer URL as an environment variable. This URL will be used by the SDK for any other call to the GQLServer APIs:

```typescript
import { setUrl } from "@relatedcode/gqlite-lib/dist/client/utils";

setUrl(url);
```

_You should use this method once when the initial load of the web app is triggered._

## Auth

### Create new user

Create a form that allows new users to register with your app using their email address and a password. When a user completes the form, validate the email address and password provided by the user, then pass them to the `createUser` method:

```typescript
import { createUser } from "@relatedcode/gqlite-lib/dist/client/auth";

const user = await createUser(email, password);
```

### Login existing user

Create a form that allows existing users to sign in using their email address and password. When a user completes the form, call the `login` method:

```typescript
import { login } from "@relatedcode/gqlite-lib/dist/client/auth";

const user = await login(email, password);
```

### Get signed-in user

For each of your app's pages that need information about the signed-in user, get the current user using the `getUser` method:

```typescript
import { getUser } from "@relatedcode/gqlite-lib/dist/client/auth";

const user = await getUser();
```

### Retrieve ID token

When a user or device successfully signs in, GQLServer creates a corresponding ID token that uniquely identifies them and grants them access to several resources, such as the GQLServer GraphQL API. To retrieve the ID token from the client, make sure the user is signed in and then get the ID token from the signed-in user:

```typescript
import { getIdToken } from "@relatedcode/gqlite-lib/dist/client/auth";

const token = await getIdToken();
```

### Logout user

To logout a user, call `logout` method:

```typescript
import { logout } from "@relatedcode/gqlite-lib/dist/client/auth";

await logout();
```

## Storage

### Upload file

To upload a file to GQLServer Storage, use the `uploadFile` method and provide the `bucketName`, the `filePath` (the key of the file), and the `file` object from the JavaScript `File` API:

```typescript
import { uploadFile } from "@relatedcode/gqlite-lib/dist/client/storage";

const url = await uploadFile(bucketName, filePath, file);
```

### Get the file URL

The `url` returned by the `uploadFile` method never contains the domain name of the GQLServer instance because it is subject to change (i.e. if you decide to use another server to host your data or if you change your domain name). To get the URL of the file and use it as the `href` attribute in an `<img>` HTML tag, use the `getFileUrl` method:

```typescript
import { getFileURL } from "@relatedcode/gqlite-lib/dist/client/storage";

const fileURL = await getFileURL(url);
```
