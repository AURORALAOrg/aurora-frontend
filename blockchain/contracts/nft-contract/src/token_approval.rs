use crate::storage_types::{
    DataKey, TOKEN_APPROVAL_BUMP_AMOUNT, TOKEN_APPROVAL_LIFETIME_THRESHOLD,
};
use soroban_sdk::{Address, Env};

pub fn read_token_approval(env: &Env, token_id: u128) -> Option<Address> {
    let key = DataKey::TokenApproval(token_id);
    if let Some(approved) = env.storage().persistent().get::<DataKey, Address>(&key) {
        env.storage().persistent().extend_ttl(
            &key,
            TOKEN_APPROVAL_LIFETIME_THRESHOLD,
            TOKEN_APPROVAL_BUMP_AMOUNT,
        );
        Some(approved)
    } else {
        None
    }
}

pub fn write_token_approval(env: &Env, token_id: u128, approved: Option<Address>) {
    let key = DataKey::TokenApproval(token_id);
    if approved.is_some() {
        env.storage().persistent().set(&key, &approved);
        env.storage().persistent().extend_ttl(
            &key,
            TOKEN_APPROVAL_LIFETIME_THRESHOLD,
            TOKEN_APPROVAL_BUMP_AMOUNT,
        );
    } else {
        env.storage().persistent().remove(&key);
    }
}
