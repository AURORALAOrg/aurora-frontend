use soroban_sdk::{Address, Env};

use crate::storage_types::DataKey;

pub fn read_admin(env: &Env) -> Address {
    let key = DataKey::Admin;
    env.storage().instance().get(&key).unwrap()
}

pub fn write_admin(env: &Env, admin: &Address) {
    let key = DataKey::Admin;
    env.storage().instance().set(&key, admin);
}
