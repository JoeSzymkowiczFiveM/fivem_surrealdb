local SurrealDB = {}
local surrealdb = exports.fivem_surrealdb

setmetatable(SurrealDB, {
    __index = function(self, method)
        self[method] = setmetatable({}, {
            __call = function(...)
                return surrealdb[method](...)
            end,
            __index = function(_, key)
                if (method == "Async") then
                    return function(params, cb)
                        return surrealdb[key](surrealdb, params, cb)
                    end
                end
            end
        })
        return self[method]
    end
})

local function onReady(cb)
	while GetResourceState('fivem_surrealdb') ~= 'started' do
		Wait(50)
	end

	repeat
        Wait(5)
    until surrealdb:isConnected()
    cb()
end

SurrealDB.ready = setmetatable({
	await = onReady
}, {
	__call = function(_, cb)
		Citizen.CreateThreadNow(function() onReady(cb) end)
	end,
})

_ENV.SurrealDB = SurrealDB