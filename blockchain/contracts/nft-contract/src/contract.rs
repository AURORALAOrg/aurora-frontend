use crate::admin::{read_admin, write_admin};
use crate::balance::{read_balance, write_balance};
use crate::metadata::{read_base_uri, read_name, read_symbol, write_metadata};
use crate::owner::{read_owner, write_owner};
use crate::storage_types::{INSTANCE_BUMP_AMOUNT, INSTANCE_LIFETIME_THRESHOLD};
use crate::token_approval::{read_token_approval, write_token_approval};
use crate::token_uri::{read_token_uri, write_token_uri};
use crate::token_utils::metadata::TokenMetadata;
use crate::token_utils::TokenUtils;
use soroban_sdk::{contract, contractimpl, vec, Address, Env, String, Vec};

#[contract]
pub struct NFT;

#[contractimpl]
impl NFT {
    pub fn __constructor(env: Env, admin: Address, name: String, symbol: String) {
        write_admin(&env, &admin);
        write_metadata(
            &env,
            TokenMetadata {
                name,
                symbol,
                base_uri: String::from_str(&env, ""),
            },
        );
    }

    pub fn balance_of(env: Env, owner: Address) -> u128 {
        env.storage()
            .instance()
            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        read_balance(&env, owner)
    }

    pub fn owner_of(env: Env, token_id: u128) -> Address {
        env.storage()
            .instance()
            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        Self::_require_owned(&env, token_id)
    }

    pub fn name(env: Env) -> String {
        read_name(&env)
    }

    pub fn symbol(env: Env) -> String {
        read_symbol(&env)
    }

    pub fn token_uri(env: Env, token_id: u128) -> Vec<String> {
        env.storage()
            .instance()
            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        Self::_require_owned(&env, token_id);

        let token_uri = read_token_uri(&env, token_id);
        let base = Self::_base_uri(&env);

        if base.len() == 0 {
            return vec![&env, token_uri];
        }
        if token_uri.len() > 0 {
            return vec![&env, base, token_uri];
        }

        return vec![&env];
    }

    fn _set_token_uri(env: &Env, token_id: u128, token_uri: String) {
        write_token_uri(env, token_id, token_uri);
        TokenUtils::new(&env).events().metadata_update(token_id);
    }

    fn _base_uri(env: &Env) -> String {
        read_base_uri(&env)
    }

    pub fn base_uri(env: Env) -> String {
        Self::_base_uri(&env)
    }

    fn _set_base_uri(env: &Env, base_uri: String) {
        write_metadata(
            &env,
            TokenMetadata {
                name: read_name(&env),
                symbol: read_symbol(&env),
                base_uri,
            },
        );
    }

    pub fn approve(env: Env, from: Address, to: Option<Address>, token_id: u128) {
        from.require_auth();

        env.storage()
            .instance()
            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        Self::_approve(&env, to, token_id, Some(from), true);
    }

    pub fn get_approved(env: Env, token_id: u128) -> Option<Address> {
        env.storage()
            .instance()
            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        Self::_require_owned(&env, token_id);
        Self::_get_approved(&env, token_id)
    }

    pub fn transfer_from(env: Env, sender: Address, from: Address, to: Address, token_id: u128) {
        sender.require_auth();

        env.storage()
            .instance()
            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        let previous_owner = Self::_update(&env, Some(to), token_id, Some(sender));
        if previous_owner.is_some() && previous_owner.clone().unwrap() != from {
            panic!(
                "NFTIncorrectOwner({:?}, {}, {:?})",
                from,
                token_id,
                previous_owner.unwrap()
            );
        }
    }

    fn _owner_of(env: &Env, token_id: u128) -> Option<Address> {
        read_owner(env, token_id)
    }

    fn _get_approved(env: &Env, token_id: u128) -> Option<Address> {
        read_token_approval(&env, token_id)
    }

    fn _is_authorized(
        env: &Env,
        owner: &Option<Address>,
        spender: &Option<Address>,
        token_id: u128,
    ) -> bool {
        spender.is_some() && (owner == spender || Self::_get_approved(env, token_id) == *spender)
    }

    fn _check_authorized(
        env: &Env,
        owner: &Option<Address>,
        spender: &Option<Address>,
        token_id: u128,
    ) {
        if !Self::_is_authorized(env, owner, spender, token_id) {
            if owner.is_none() {
                panic!("NFTNonexistentToken({})", token_id);
            } else {
                panic!(
                    "NFTInsufficientApproval({:?}, {})",
                    spender.clone().unwrap(),
                    token_id
                );
            }
        }
    }

    fn _update(
        env: &Env,
        to: Option<Address>,
        token_id: u128,
        auth: Option<Address>,
    ) -> Option<Address> {
        let from = Self::_owner_of(env, token_id);

        if auth.is_some() {
            Self::_check_authorized(env, &from, &auth, token_id);
        }

        if let Some(from) = from.clone() {
            Self::_approve(env, None, token_id, None, false);
            let balance = read_balance(env, from.clone());
            write_balance(env, from, balance - 1);
        }

        if let Some(to) = to.clone() {
            let balance = read_balance(env, to.clone());
            write_balance(env, to.clone(), balance + 1);
        }

        write_owner(env, token_id, &to);

        TokenUtils::new(&env)
            .events()
            .transfer(&from, &to, token_id);

        from
    }

    fn _mint(env: &Env, to: &Address, token_id: u128) {
        let previous_owner = Self::_update(env, Some(to.clone()), token_id, None);
        if previous_owner.is_some() {
            panic!("NFTInvalidSender(None)");
        }
    }

    fn _burn(env: &Env, token_id: u128) {
        let previous_owner = Self::_update(env, None, token_id, None);
        if previous_owner.is_none() {
            panic!("NFTNonexistentToken({})", token_id);
        }
    }

    fn _transfer(env: &Env, from: &Address, to: &Address, token_id: u128) {
        let previous_owner = Self::_update(env, Some(to.clone()), token_id, None);
        if previous_owner.is_none() {
            panic!("NFTNonexistentToken({})", token_id);
        } else if previous_owner.clone().unwrap() != *from {
            panic!(
                "NFTIncorrectOwner({:?}, {}, {:?})",
                from,
                token_id,
                previous_owner.unwrap()
            );
        }
    }

    fn _approve(
        env: &Env,
        to: Option<Address>,
        token_id: u128,
        auth: Option<Address>,
        emit_event: bool,
    ) {
        if emit_event || auth.is_some() {
            let owner = Self::_require_owned(env, token_id);

            if auth.is_some() && owner != auth.clone().unwrap() {
                panic!("NFTInvalidApprover({:?})", auth.unwrap());
            }

            if emit_event {
                TokenUtils::new(&env)
                    .events()
                    .approval(owner, &to, token_id);
            }
        }

        write_token_approval(env, token_id, to);
    }

    fn _require_owned(env: &Env, token_id: u128) -> Address {
        let owner = Self::_owner_of(env, token_id);
        if owner.is_none() {
            panic!("NFTNonexistentToken({})", token_id);
        }
        owner.unwrap()
    }

    pub fn mint(env: Env, to: Address, token_id: u128) {
        let admin = read_admin(&env);
        admin.require_auth();

        env.storage()
            .instance()
            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        Self::_mint(&env, &to, token_id);
    }

    pub fn set_token_uri(env: Env, token_id: u128, token_uri: String) {
        let admin = read_admin(&env);
        admin.require_auth();

        env.storage()
            .instance()
            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        Self::_set_token_uri(&env, token_id, token_uri);
    }

    pub fn set_base_uri(env: Env, base_uri: String) {
        let admin = read_admin(&env);
        admin.require_auth();

        env.storage()
            .instance()
            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        Self::_set_base_uri(&env, base_uri);
    }

    pub fn burn(env: Env, token_id: u128) {
        let admin = read_admin(&env);
        admin.require_auth();

        env.storage()
            .instance()
            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        Self::_burn(&env, token_id);
    }

    pub fn transfer(env: Env, from: Address, to: Address, token_id: u128) {
        from.require_auth();

        env.storage()
            .instance()
            .extend_ttl(INSTANCE_LIFETIME_THRESHOLD, INSTANCE_BUMP_AMOUNT);

        Self::_transfer(&env, &from, &to, token_id);
    }
}
