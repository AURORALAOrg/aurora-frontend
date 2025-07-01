use soroban_sdk::{contracttype, Address};

pub(crate) const DAY_IN_LEDGERS: u32 = 17280;
pub(crate) const INSTANCE_BUMP_AMOUNT: u32 = 7 * DAY_IN_LEDGERS;
pub(crate) const INSTANCE_LIFETIME_THRESHOLD: u32 = INSTANCE_BUMP_AMOUNT - DAY_IN_LEDGERS;

pub(crate) const OWNER_BUMP_AMOUNT: u32 = 30 * DAY_IN_LEDGERS;
pub(crate) const OWNER_LIFETIME_THRESHOLD: u32 = OWNER_BUMP_AMOUNT - DAY_IN_LEDGERS;

pub(crate) const BALANCE_BUMP_AMOUNT: u32 = 30 * DAY_IN_LEDGERS;
pub(crate) const BALANCE_LIFETIME_THRESHOLD: u32 = BALANCE_BUMP_AMOUNT - DAY_IN_LEDGERS;

pub(crate) const TOKEN_APPROVAL_BUMP_AMOUNT: u32 = 30 * DAY_IN_LEDGERS;
pub(crate) const TOKEN_APPROVAL_LIFETIME_THRESHOLD: u32 =
    TOKEN_APPROVAL_BUMP_AMOUNT - DAY_IN_LEDGERS;

pub(crate) const TOKEN_URI_BUMP_AMOUNT: u32 = 30 * DAY_IN_LEDGERS;
pub(crate) const TOKEN_URI_LIFETIME_THRESHOLD: u32 = TOKEN_URI_BUMP_AMOUNT - DAY_IN_LEDGERS;

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Admin,
    Owner(u128),
    Balance(Address),
    TokenApproval(u128),
    TokenUri(u128),
}
