const { UserRepository } = require("../repositories");

class UserEntity extends UserRepository {
    _permissions = [];

    getPermissions() {
        return this._permissions;
    }

    hasPermissionFor(permission) {
        return this._permissions.includes(permission);
    }
}

module.exports = { UserEntity }