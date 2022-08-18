# Documentation API Perpus

## Daftar Isi
1. [Authentication](#auth)
2. [User](#user)
3. [Modul](#modul)

## Modul {#modul}
### Table Schema
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

### Entry Points
Module have **type** that contain ***ebook*** or ***video***.
- All
    **GET** **/*type*** asd
- Get