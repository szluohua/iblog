1. mongodb 
- 创建用户
```js

db.createUser({ user: 'admin', pwd: 'password', roles: [{ role: 'root', db: 'admin' }] })
db.createUser({ user: 'iblog', pwd: 'password', roles: [ { role: 'dbOwner', db: 'iblog' } ] })

```
- 配置文件
```conf
#mongodb config file
dbpath=/usr/local/share/mongodb/data
logpath=/usr/local/share/mongodb/logs
logappend = true
port = 27017
fork = true
auth = true
```