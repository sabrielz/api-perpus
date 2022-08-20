# **Documentation API Perpus**

# Overview
**Json Web Token** Authorization currently disabled for
development reason. Enable this in all of **routes**
directory except **Route.js** by uncomment line `app.use(Auth.verify...`.
This development using **axios** and **Postman** for testing.
For **multipart** form content-type, input catched by **formidable**,
otherwise catched by **express** directly.

# Schema Utility
Utility to control schema. Like migrate, drop, truncate, etc.
Entry points without url params execute all tables, but
the table list not dynamic

### Entry Points
| Method | URL | URL Params |
| ------ | --- | ---------- |
| **GET** | `/api/migrate` | |
| **GET** | `/api/migrate/:table` | `table` |
| **GET** | `/api/drop` | |
| **GET** | `/api/drop/:table` | `table` |
| **GET** | `/api/truncate` | |
| **GET** | `/api/truncate/:table` | `table` |
| **GET** | `/api/seed` | |
| **GET** | `/api/seed/:table` | `table` |
| **GET** | `/api/remigrate/:table` | `table` |

# Auth
Require **json web token** except `/register`.
Create new user, or authenticate user to access api
with **json web token**.

### Entry Points
| Method | URL | Body Params |
| ------ | --- | ------ |
| **POST** | `/login` | `nis, password` |
| **POST** | `/register` | `all user columns` |
| **POST** | `/check` | `check jwt token` |

# User
Require **json web token** to access.
Control user profile, except create new user.

### Entry Points
| Method | URL | URL Params | Body Params |
| ------ | --- | ---------- | ----------- |
| **GET** | `/user` | `?page&select` | |
| **GET** | `/user/:id` | `id` | |
| **GET** | `/user/nis/:id` | `id` | |
| **GET** | `/user/count` | | |
| **PUT** | `/user/:id` | `id` | `all modul columns` |
| **DELETE** | `/user/:id` | `id` | |

### Table Schema
| Name | Options |
| ---- | ------- |
| `id` | int(10) unsigned NOT NULL AUTO_INCREMENT |
| `nama` | varchar(255) DEFAULT NULL |
| `nis` | int(11) DEFAULT NULL |
| `email` | varchar(255) DEFAULT NULL |
| `password` | varchar(255) DEFAULT '123456' |
| `ttl` | varchar(255) DEFAULT NULL |
| `sekolah` | varchar(255) DEFAULT NULL |
| `alasan` | text DEFAULT NULL |
| `avatar` | varchar(255) DEFAULT NULL |
| `hp` | varchar(255) DEFAULT NULL |

# Modul
Require **json web token** to access.
Modul have **type** that contain type of modul.
Change **:type** url with ***ebook*** or ***video*** only.

### Entry Points
| Method | URL | URL Params | Body Params |
| ------ | --- | ---------- | ----------- |
| **GET** | `/modul` | `?search&page&select` | |
| **GET** | `/modul/count` | | |
| **GET** | `/:type` | `?page&select` | |
| **GET** | `/:type/:id` | `id` | |
| **GET** | `/:type/count` | | |
| **POST** | `/:type` | | `all modul columns` |
| **PUT** | `/:type/:id` | `id` | `all modul columns` |
| **DELETE** | `/:type/:id` | `id` | |

### Table Schema
| Name | Options |
| --- | --- |
| `id` | int(10) unsigned NOT NULL AUTO_INCREMENT |
| `title` | varchar(255) DEFAULT NULL |
| `slug` | varchar(255) DEFAULT NULL |
| `desc` | varchar(255) DEFAULT NULL |
| `thumbnail` | varchar(255) DEFAULT NULL |
| `file` | varchar(255) DEFAULT NULL |
| `type` | varchar(255) DEFAULT NULL |
| `user_id` | int(10) unsigned DEFAULT NULL |
| `created_at` | timestamp NOT NULL DEFAULT current_timestamp() |
| `updated_at` | timestamp NOT NULL DEFAULT current_timestamp() |

# Absen
Not require **json web token** to access. Embeded automatically
when user login or accessing `/login` successfully.

### Entry Points
| Method | URL | URL Params | Body Params |
| ------ | --- | ---------- | ----------- |
| **GET** | `/absen` | `?page&select` | |
| **GET** | `/absen/:id` | `id` | |
| **GET** | `/absen/user/:id` | `id` | |
| **GET** | `/absen/count` | | |
| **POST** | `/absen` | | `all absen columns` |
| **PUT** | `/absen/:id` | `id` | `all absen columns` |
| **DELETE** | `/absen/:id` | `id` | |

### Table Schema
| Name | Options |
| --- | --- |
| `id` | int(10) unsigned NOT NULL AUTO_INCREMENT |
| `tanggal` | timestamp NOT NULL DEFAULT current_timestamp() |
| `user_id` | int(10) unsigned DEFAULT NULL |

# Literasi
Require **json web token** to access. The entry points
same as absen.

### Entry Points
| Method | URL | URL Params | Body Params |
| ------ | --- | ---------- | ----------- |
| **GET** | `/literasi` | `?page&select` | |
| **GET** | `/literasi/:id` | `id` | |
| **GET** | `/literasi/user/:id` | `id` | |
| **GET** | `/literasi/count` | | |
| **POST** | `/literasi` | | `all literasi columns` |
| **PUT** | `/literasi/:id` | `id` | `all literasi columns` |
| **DELETE** | `/literasi/:id` | `id` | |

### Table Schema
| Name | Options |
| --- | --- |
| `id` | int(10) unsigned NOT NULL AUTO_INCREMENT |
| `file` | varchar(255) DEFAULT NULL |
| `tanggal` | timestamp NOT NULL DEFAULT current_timestamp() |
| `user_id` | int(10) unsigned DEFAULT NULL |
| `modul_id` | int(10) unsigned DEFAULT NULL |