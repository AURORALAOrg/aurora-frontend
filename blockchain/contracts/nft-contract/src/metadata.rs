use crate::token_utils::{metadata::TokenMetadata, TokenUtils};
use soroban_sdk::{Env, String};

pub fn read_name(env: &Env) -> String {
    let util = TokenUtils::new(env);
    util.metadata().get_metadata().name
}

pub fn read_symbol(env: &Env) -> String {
    let util = TokenUtils::new(env);
    util.metadata().get_metadata().symbol
}

pub fn read_base_uri(env: &Env) -> String {
    let util = TokenUtils::new(env);
    util.metadata().get_metadata().base_uri
}

pub fn write_metadata(env: &Env, metadata: TokenMetadata) {
    let util = TokenUtils::new(env);
    util.metadata().set_metadata(&metadata);
}
