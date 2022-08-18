# Documentation API Perpus

## Daftar Isi
1. [Authentication](#auth)
2. [User](#user)
3. [Modul](#modul)

## Modul
Table Schema
: This table structure like this
   ```
     `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
     `title` varchar(255) DEFAULT NULL,
     `slug` varchar(255) DEFAULT NULL,
     `desc` varchar(255) DEFAULT NULL,
     `thumbnail` varchar(255) DEFAULT NULL,
     `file` varchar(255) DEFAULT NULL,
     `type` varchar(255) DEFAULT NULL,
     `user_id` int(10) unsigned DEFAULT NULL,
     `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
     `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
   ```