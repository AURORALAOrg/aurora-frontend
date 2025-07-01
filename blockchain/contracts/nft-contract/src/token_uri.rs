use crate::storage_types::{DataKey, TOKEN_URI_BUMP_AMOUNT, TOKEN_URI_LIFETIME_THRESHOLD};
use soroban_sdk::{Env, String};

pub fn read_token_uri(env: &Env, token_id: u128) -> String {
    let key = DataKey::TokenUri(token_id);
    if let Some(token_uri) = env.storage().persistent().get::<DataKey, String>(&key) {
        env.storage().persistent().extend_ttl(
            &key,
            TOKEN_URI_LIFETIME_THRESHOLD,
            TOKEN_URI_BUMP_AMOUNT,
        );
        token_uri
    } else {
        String::from_str(env, "")
    }
}

pub fn write_token_uri(env: &Env, token_id: u128, token_uri: String) {
    let key = DataKey::TokenUri(token_id);
    env.storage().persistent().set(&key, &token_uri);
    env.storage().persistent().extend_ttl(
        &key,
        TOKEN_URI_LIFETIME_THRESHOLD,
        TOKEN_URI_BUMP_AMOUNT,
    );
}
