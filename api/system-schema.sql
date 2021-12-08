create table "gql_users" (
  "objectId" varchar(255) primary key,
  "email" varchar(255) not null unique,
  "passwordHash" varchar(255) not null,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

create table "gql_admins" (
  "objectId" varchar(255) primary key,
  "email" varchar(255) not null unique,
  "passwordHash" varchar(255) not null,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);