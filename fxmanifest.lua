fx_version 'cerulean'
game 'common'

author 'JoeSzymkowiczFiveM'
name 'fivem_surrealdb'
description 'SurrealDB wrapper for FiveM'
version '0.0.1'

server_only 'yes'

server_scripts {
    "index.js",
}

convar_category 'fivem_surrealdb' {
	'Configuration',
	{
		{ 'Connection url', 'surrealdb_url', 'CV_STRING', 'http://127.0.0.1:8090' },
        { 'Connection user', 'surrealdb_user', 'CV_STRING', 'someone@gmail.com' },
        { 'Connection user password', 'surrealdb_password', 'CV_STRING', 'asdf1234hjkl' },
        { 'Connection database name', 'surrealdb_database', 'CV_STRING', 'fivem' },
        { 'Connection namespace', 'surrealdb_namespace', 'CV_STRING', 'fivem' },
	}
}