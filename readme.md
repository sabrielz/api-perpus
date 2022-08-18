# **Documentation API Perpus**

# Schema Utility
Utility to control schema. Like migrate, drop, truncate, etc.
### Entry Points
| Method | URL |
| ------ | --- |
| **GET** | `/api/migrate/:table` |
| **GET** | `/api/drop/:table` |
| **GET** | `/api/truncate/:table` |
| **GET** | `/api/seed/:table` |
| **GET** | `/api/remigrate/:table` |

# Auth
Create new user, or authenticate user to access api
with **json web token**.
### Entry Points

| Method | URL | Body Params |
| ------ | --- | ------ |
| **POST** | `/login` | `email, password` |
| **POST** | `/register` | `all user columns` |
| **POST** | `/check` | `check jwt token` |

# User
Control user profile, except create new user.
### Entry Points

| Method | URL | Body Params |
| ------ | --- | ------ |
| **POST** | `/login` | `email, password` |
| **POST** | `/register` | `all user columns` |
| **POST** | `/check` | `check jwt token` |

# Modul
Modul have **type** that contain type of modul.
Change **:type** url with ***ebook*** or ***video*** only.

### Entry Points

| Method | URL | URL Params | Body Params |
| ------ | --- | ---------- | ----------- |
| **GET** | `/:type` | `page, select` | |
| **GET** | `/:type/:id` | `page, select` | |
| **GET** | `/:type/count` | `page, select` | |
| **POST** | `/:type` | | `all modul columns` |
| **PUT** | `/:type/:id` | | `all modul columns` |
| **DELETE** | `/:type/:id` | `id` | |

### URL Params (GET Methods)

| Key | Default Value |
| --- | ----- |
| `page` | `1` |
| `select` | `*` |

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