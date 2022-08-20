module.exports = {
	pagination: {
		limit: 8
	},
	seeding: {
		user: {
			limit: 200
		},
		modul: {
			limit: 200
		},
		literasi: {
			limit: 500
		},
		absen: {
			limit: 500
		}
	},
	model: {
		role: {
			tableName: 'roles'
		},
		user: {
			tableName: 'users'
		},
		modul: {
			tableName: 'moduls'
		},
		literasi: {
			tableName: 'literasy'
		},
		absen: {
			tableName: 'absens'
		},
		list: ['role', 'user', 'absen', 'modul', 'literasi']
	},
}