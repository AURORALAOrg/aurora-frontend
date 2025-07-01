use crate::storage_types::{DataKey, OWNER_BUMP_AMOUNT, OWNER_LIFETIME_THRESHOLD};
use soroban_sdk::{Address, Env};

pub fn read_owner(env: &Env, token_id: u128) -> Option<Address> {
    let key = DataKey::Owner(token_id);
    if let Some(owner) = env.storage().persistent().get::<DataKey, Address>(&key) {
        env.storage()
            .persistent()
            .extend_ttl(&key, OWNER_LIFETIME_THRESHOLD, OWNER_BUMP_AMOUNT);
        Some(owner)
    } else {
        None
    }
}

pub fn write_owner(env: &Env, token_id: u128, owner: &Option<Address>) {
    let key = DataKey::Owner(token_id);
    if owner.is_some() {
        env.storage().persistent().set(&key, &owner);
        env.storage()
            .persistent()
            .extend_ttl(&key, OWNER_LIFETIME_THRESHOLD, OWNER_BUMP_AMOUNT);
    } else {
        env.storage().persistent().remove(&key);
    }
}
