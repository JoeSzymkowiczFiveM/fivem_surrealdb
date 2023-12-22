const { default: Surreal } = require('surrealdb.js');
const convars = {};
let missingConvars;

convars.url = GetConvar('surrealdb_url', '').replace(/'/g, "");
convars.user = GetConvar('surrealdb_user', '').replace(/'/g, "");
convars.password = GetConvar('surrealdb_password', '').replace(/'/g, "");
convars.database = GetConvar('surrealdb_database', '').replace(/'/g, "");
convars.namespace = GetConvar('surrealdb_namespace', '').replace(/'/g, "");

let db = new Surreal(convars.url);
let connected = false;

async function connectToDatabase() {
    try {
        await db.signin({
			user: convars.user,
			pass: convars.password,
		});

        await db.use({ns: convars.namespace, db: convars.database});
        
        connected = true;
        console.log(`[^6SurrealDB^7] Connected to database "${convars.database}".`);
    } catch(err) {
        setTimeout(function() {
            console.log(`[^6SurrealDB^7][^1ERROR^7] Failed to connect to ${convars.url}. Retrying connection. ${err}`);
            connectToDatabase();
            return;
        }, 5000);
    }
};

function checkDatabaseReady() {
    if (connected) {
        return true;
    } else {
        console.log(`[^6SurrealDB^7][^1ERROR^7] SurrealDB is not connected.`);
        return false;
    }
};

function safeObjectArgument(object) {
    if (!object) return {};
    if (Array.isArray(object)) {
        if (object.length === 0) return {};
        return object;
    }
    if (typeof object !== "object") return {};
    return object;
};

function safeStringArgument(string) {
    if (!string) return '';
    if (typeof string !== "string") return '';
    return string;
};

exports('update', async (params, cb) => {
    if (!checkDatabaseReady()) return;
    const thing = safeStringArgument(params.thing);
    const data = safeObjectArgument(params.data);
    try {
        const result = await db.update(thing, data);
        const arr = [];
        arr.push(result);
        return cb ? cb(arr) : arr;
    } catch(err) {
        console.log(`[^6SurrealDB^7][^1ERROR^7] exports.update: Error "${err.message}".`);
        return cb ? cb([{}]) : [{}];
    }
});

exports('create', async (params, cb) => {
    if (!checkDatabaseReady()) return;
    const thing = safeStringArgument(params.thing);
    const data = safeObjectArgument(params.data);
    try {
        const result = await db.create(thing, data);
        //result : array of objects
        return cb ? cb(result) : result;
    } catch(err) {
        console.log(`[^6SurrealDB^7][^1ERROR^7] exports.create: Error "${err.message}".`);
        return cb ? cb([{}]) : [{}];
    }
});

exports('select', async (params, cb) => {
    if (!checkDatabaseReady()) return;
    const thing = safeStringArgument(params.thing);
    try {
        const result = await db.select(thing);
        //result : array of objects
        return cb ? cb(result) : result;
    } catch(err) {
        console.log(`[^6SurrealDB^7][^1ERROR^7] exports.select: Error "${err.message}".`);
        return cb ? cb([{}]) : [{}];
    }
});

exports('delete', async (params, cb) => {
    if (!checkDatabaseReady()) return;
    const thing = safeStringArgument(params.thing);
    try {
        const result = await db.delete(thing);
        return cb ? cb(result) : result;
    } catch(err) {
        console.log(`[^6SurrealDB^7][^1ERROR^7] exports.delete: Error "${err.message}".`);
        return cb ? cb([{}]) : [{}];
    }
});

exports('query', async (params, cb) => {
    if (!checkDatabaseReady()) return;
    const sql = safeStringArgument(params.sql);
    const vars = safeObjectArgument(params.vars);
    try {
        const result = await db.query(sql, vars);
        //result : array of objects
        return cb ? cb(result) : result;
    } catch(err) {
        console.log(`[^6SurrealDB^7][^1ERROR^7] exports.query: Error "${err.message}".`);
        return cb ? cb([{}]) : [{}];
    }
});

exports('patch', async (params, cb) => {
    if (!checkDatabaseReady()) return;
    const thing = safeStringArgument(params.thing);
    const data = safeObjectArgument(params.data);
    try {
        const result = await db.patch(thing, data);
        //result : array of objects
        return cb ? cb(result) : result;
    } catch(err) {
        console.log(`[^6SurrealDB^7][^1ERROR^7] exports.patch: Error "${err.message}".`);
        return cb ? cb([{}]) : [{}];
    }
});

exports('merge', async (params, cb) => {
    if (!checkDatabaseReady()) return;
    const thing = safeStringArgument(params.thing);
    const data = safeObjectArgument(params.data);
    try {
        const result = await db.merge(thing, data);
        //result : array of objects
        return cb ? cb(result) : result;
    } catch(err) {
        console.log(`[^6SurrealDB^7][^1ERROR^7] exports.merge: Error "${err.message}".`);
        return cb ? cb([{}]) : [{}];
    }
});

exports('isConnected', async () => {
    return !!connected;
})

for (const [key, value] of Object.entries(convars)) {
    if (value === '') {
        console.error(`[^6SurrealDB^7][^1ERROR^7] Convar "surrealdb_${key}" not set (see README)`);
        missingConvars = true
    }
}

if (!missingConvars) {
    connectToDatabase();
}