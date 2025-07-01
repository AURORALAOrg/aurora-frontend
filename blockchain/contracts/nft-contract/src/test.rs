#![cfg(test)]
extern crate std;
use crate::{contract::NFT, NFTClient};
use soroban_sdk::{
    symbol_short,
    testutils::{Address as _, AuthorizedFunction, AuthorizedInvocation, Events},
    vec, Address, Env, FromVal, IntoVal, String, Symbol,
};

const NAME: &str = "Non Fungible Token";
const SYMBOL: &str = "NFT";
const BASE_URI: &str = "https://api.example.com/v1/";
const OTHER_BASE_URI: &str = "https://api.example.com/v2/";
const SAMPLE_URI: &str = "mock://mytoken";
const FIRST_TOKEN_ID: u128 = 5042;
const SECOND_TOKEN_ID: u128 = 79217;
const NON_EXISTENT_TOKEN_ID: u128 = 13;

fn create_nft_contract<'a>(env: &Env, admin: &Address) -> NFTClient<'a> {
    let nft_contract_address = env.register(
        NFT,
        (
            admin,
            String::from_val(env, &NAME),
            String::from_val(env, &SYMBOL),
        ),
    );

    NFTClient::new(env, &nft_contract_address)
}

struct NFTTest<'a> {
    env: Env,
    admin: Address,
    owner: Address,
    other: Address,
    approved: Address,
    token: NFTClient<'a>,
}

impl<'a> NFTTest<'a> {
    fn setup() -> Self {
        let env = Env::default();
        env.mock_all_auths();

        let admin = Address::generate(&env);
        let owner = Address::generate(&env);
        let other = Address::generate(&env);
        let approved = Address::generate(&env);

        let token = create_nft_contract(&env, &admin);

        NFTTest {
            env,
            admin,
            owner,
            other,
            approved,
            token,
        }
    }

    fn with_minted_token(&self) -> &Self {
        self.token.mint(&self.owner, &FIRST_TOKEN_ID);
        self
    }

    fn with_minted_tokens(&self) -> &Self {
        self.token.mint(&self.owner, &FIRST_TOKEN_ID);
        self.token.mint(&self.owner, &SECOND_TOKEN_ID);
        self
    }

    fn with_approval(&self) -> &Self {
        self.token
            .approve(&self.owner, &Some(self.approved.clone()), &FIRST_TOKEN_ID);
        self
    }

    fn with_burnt_token(&self) -> &Self {
        self.token.burn(&FIRST_TOKEN_ID);
        self
    }

    fn setup_with_minted_token() -> Self {
        let test = Self::setup();
        test.with_minted_token();
        test
    }

    fn setup_with_minted_tokens() -> Self {
        let test = Self::setup();
        test.with_minted_tokens();
        test
    }

    fn setup_with_minted_tokens_and_approval() -> Self {
        let test = Self::setup();
        test.with_minted_tokens();
        test.with_approval();
        test
    }

    fn setup_with_minted_tokens_and_burnt_token() -> Self {
        let test = Self::setup();
        test.with_minted_tokens();
        test.with_burnt_token();
        test
    }
}

#[test]
fn test_balance_of_when_the_given_address_owns_some_tokens_it_returns_the_amount_of_tokens_owned_by_the_given_address(
) {
    let NFTTest { owner, token, .. } = NFTTest::setup_with_minted_tokens();

    assert_eq!(token.balance_of(&owner), 2);
}

#[test]
fn test_balance_of_when_the_given_address_does_not_own_any_tokens_it_returns_0() {
    let NFTTest { other, token, .. } = NFTTest::setup_with_minted_tokens();

    assert_eq!(token.balance_of(&other), 0);
}

#[test]
fn test_owner_of_when_the_given_token_id_was_tracked_by_this_token_it_returns_the_owner_of_the_given_token_id(
) {
    let NFTTest { owner, token, .. } = NFTTest::setup_with_minted_tokens();

    assert_eq!(token.owner_of(&FIRST_TOKEN_ID), owner);
}

#[test]
#[should_panic(expected = "NFTNonexistentToken(13)")]
fn test_owner_of_when_the_given_token_id_was_not_tracked_by_this_token_it_reverts() {
    let NFTTest { token, .. } = NFTTest::setup_with_minted_tokens();

    token.owner_of(&NON_EXISTENT_TOKEN_ID);
}

#[test]
fn test_transfer_authorization() {
    let NFTTest {
        env,
        owner,
        other,
        token,
        ..
    } = NFTTest::setup_with_minted_tokens();

    token.transfer(&owner, &other, &FIRST_TOKEN_ID);

    assert_eq!(
        env.auths(),
        [(
            owner.clone(),
            AuthorizedInvocation {
                function: AuthorizedFunction::Contract((
                    token.address,
                    symbol_short!("transfer"),
                    (owner, other, FIRST_TOKEN_ID).into_val(&env)
                )),
                sub_invocations: std::vec![]
            }
        )]
    );
}

#[test]
fn test_transfer_from_authorization() {
    let NFTTest {
        env,
        owner,
        other,
        approved,
        token,
        ..
    } = NFTTest::setup_with_minted_tokens_and_approval();

    token.transfer_from(&approved, &owner, &other, &FIRST_TOKEN_ID);

    assert_eq!(
        env.auths(),
        [(
            approved.clone(),
            AuthorizedInvocation {
                function: AuthorizedFunction::Contract((
                    token.address,
                    Symbol::new(&env, "transfer_from"),
                    (approved, owner, other, FIRST_TOKEN_ID).into_val(&env)
                )),
                sub_invocations: std::vec![]
            }
        )]
    );
}

#[test]
fn test_transfer_was_successful_when_called_by_the_owner_it_transfers_the_ownership_of_the_given_token_id_to_the_given_address(
) {
    let NFTTest {
        owner,
        other,
        token,
        ..
    } = NFTTest::setup_with_minted_tokens_and_approval();

    token.transfer(&owner, &other, &FIRST_TOKEN_ID);
    assert_eq!(token.owner_of(&FIRST_TOKEN_ID), other);
}

#[test]
fn test_transfer_was_successful_when_called_by_the_owner_it_emits_a_transfer_event() {
    let NFTTest {
        env,
        owner,
        other,
        token,
        ..
    } = NFTTest::setup_with_minted_tokens_and_approval();

    token.transfer(&owner, &other, &FIRST_TOKEN_ID);

    assert_eq!(
        env.events().all(),
        vec![
            &env,
            (
                token.address,
                (symbol_short!("transfer"), owner, other, FIRST_TOKEN_ID).into_val(&env),
                ().into_val(&env)
            )
        ]
    );
}

#[test]
fn test_transfer_was_successful_when_called_by_the_owner_it_clears_the_approval_for_the_token_id_with_no_event(
) {
    let NFTTest {
        env,
        owner,
        other,
        token,
        ..
    } = NFTTest::setup_with_minted_tokens_and_approval();

    token.transfer(&owner, &other, &FIRST_TOKEN_ID);

    assert_eq!(
        env.events().all(),
        vec![
            &env,
            (
                token.address.clone(),
                (symbol_short!("transfer"), owner, other, FIRST_TOKEN_ID).into_val(&env),
                ().into_val(&env)
            )
        ]
    );

    assert_eq!(token.get_approved(&FIRST_TOKEN_ID), None);
}

#[test]
fn test_transfer_was_successful_when_called_by_the_owner_it_adjusts_owners_balances() {
    let NFTTest {
        owner,
        other,
        token,
        ..
    } = NFTTest::setup_with_minted_tokens_and_approval();

    let balance_before = token.balance_of(&owner);
    token.transfer(&owner, &other, &FIRST_TOKEN_ID);
    assert_eq!(token.balance_of(&owner), balance_before - 1);
}

#[test]
fn test_transfer_was_successful_when_called_by_the_approved_individual_it_transfers_the_ownership_of_the_given_token_id_to_the_given_address(
) {
    let NFTTest {
        owner,
        other,
        approved,
        token,
        ..
    } = NFTTest::setup_with_minted_tokens_and_approval();

    token.transfer_from(&approved, &owner, &other, &FIRST_TOKEN_ID);
    assert_eq!(token.owner_of(&FIRST_TOKEN_ID), other);
}

#[test]
fn test_transfer_was_successful_when_called_by_the_approved_individual_it_emits_a_transfer_event() {
    let NFTTest {
        env,
        owner,
        other,
        approved,
        token,
        ..
    } = NFTTest::setup_with_minted_tokens_and_approval();

    token.transfer_from(&approved, &owner, &other, &FIRST_TOKEN_ID);

    assert_eq!(
        env.events().all(),
        vec![
            &env,
            (
                token.address,
                (symbol_short!("transfer"), owner, other, FIRST_TOKEN_ID).into_val(&env),
                ().into_val(&env)
            )
        ]
    );
}

#[test]
fn test_transfer_was_successful_when_called_by_the_approved_individual_it_clears_the_approval_for_the_token_id_with_no_event(
) {
    let NFTTest {
        env,
        owner,
        other,
        approved,
        token,
        ..
    } = NFTTest::setup_with_minted_tokens_and_approval();

    token.transfer_from(&approved, &owner, &other, &FIRST_TOKEN_ID);

    assert_eq!(
        env.events().all(),
        vec![
            &env,
            (
                token.address.clone(),
                (symbol_short!("transfer"), owner, other, FIRST_TOKEN_ID).into_val(&env),
                ().into_val(&env)
            )
        ]
    );

    assert_eq!(token.get_approved(&FIRST_TOKEN_ID), None);
}

#[test]
fn test_transfer_was_successful_when_called_by_the_approved_individual_it_adjusts_owners_balances()
{
    let NFTTest {
        owner,
        other,
        approved,
        token,
        ..
    } = NFTTest::setup_with_minted_tokens_and_approval();

    let balance_before = token.balance_of(&owner);
    token.transfer_from(&approved, &owner, &other, &FIRST_TOKEN_ID);
    assert_eq!(token.balance_of(&owner), balance_before - 1);
}

#[test]
fn test_transfer_was_successful_when_called_by_the_owner_without_an_approved_user_it_transfers_the_ownership_of_the_given_token_id_to_the_given_address(
) {
    let NFTTest {
        owner,
        other,
        token,
        ..
    } = NFTTest::setup_with_minted_tokens_and_approval();

    token.approve(&owner, &None, &FIRST_TOKEN_ID);
    token.transfer_from(&owner, &owner, &other, &FIRST_TOKEN_ID);
    assert_eq!(token.owner_of(&FIRST_TOKEN_ID), other);
}

#[test]
fn test_transfer_was_successful_when_called_by_the_owner_without_an_approved_user_it_emits_a_transfer_event(
) {
    let NFTTest {
        env,
        owner,
        other,
        token,
        ..
    } = NFTTest::setup_with_minted_tokens_and_approval();

    token.approve(&owner, &None, &FIRST_TOKEN_ID);
    token.transfer_from(&owner, &owner, &other, &FIRST_TOKEN_ID);

    assert_eq!(
        env.events().all(),
        vec![
            &env,
            (
                token.address,
                (symbol_short!("transfer"), owner, other, FIRST_TOKEN_ID).into_val(&env),
                ().into_val(&env)
            )
        ]
    );
}

#[test]
fn test_transfer_was_successful_when_called_by_the_owner_without_an_approved_user_it_clears_the_approval_for_the_token_id_with_no_event(
) {
    let NFTTest {
        env,
        owner,
        other,
        token,
        ..
    } = NFTTest::setup_with_minted_tokens_and_approval();

    token.approve(&owner, &None, &FIRST_TOKEN_ID);
    token.transfer_from(&owner, &owner, &other, &FIRST_TOKEN_ID);

    assert_eq!(
        env.events().all(),
        vec![
            &env,
            (
                token.address.clone(),
                (symbol_short!("transfer"), owner, other, FIRST_TOKEN_ID).into_val(&env),
                ().into_val(&env)
            )
        ]
    );

    assert_eq!(token.get_approved(&FIRST_TOKEN_ID), None);
}

#[test]
fn test_transfer_was_successful_when_called_by_the_owner_without_an_approved_user_it_adjusts_owners_balances(
) {
    let NFTTest {
        owner,
        other,
        token,
        ..
    } = NFTTest::setup_with_minted_tokens_and_approval();

    token.approve(&owner, &None, &FIRST_TOKEN_ID);
    let balance_before = token.balance_of(&owner);
    token.transfer_from(&owner, &owner, &other, &FIRST_TOKEN_ID);
    assert_eq!(token.balance_of(&owner), balance_before - 1);
}

#[test]
fn test_transfer_when_sent_to_the_owner_it_keeps_ownership_of_the_token() {
    let NFTTest { owner, token, .. } = NFTTest::setup_with_minted_tokens_and_approval();

    token.transfer(&owner, &owner, &FIRST_TOKEN_ID);
    assert_eq!(token.owner_of(&FIRST_TOKEN_ID), owner);
}

#[test]
fn test_transfer_when_sent_to_the_owner_it_clears_the_approval_for_the_token_id() {
    let NFTTest { owner, token, .. } = NFTTest::setup_with_minted_tokens_and_approval();

    token.transfer(&owner, &owner, &FIRST_TOKEN_ID);
    assert_eq!(token.get_approved(&FIRST_TOKEN_ID), None);
}

#[test]
fn test_transfer_when_sent_to_the_owner_it_emits_only_a_transfer_event() {
    let NFTTest {
        env, owner, token, ..
    } = NFTTest::setup_with_minted_tokens_and_approval();

    token.transfer(&owner, &owner, &FIRST_TOKEN_ID);

    assert_eq!(
        env.events().all(),
        vec![
            &env,
            (
                token.address,
                (
                    symbol_short!("transfer"),
                    owner.clone(),
                    owner,
                    FIRST_TOKEN_ID
                )
                    .into_val(&env),
                ().into_val(&env)
            )
        ]
    );
}

#[test]
fn test_transfer_when_sent_to_the_owner_it_keeps_the_owner_balance() {
    let NFTTest { owner, token, .. } = NFTTest::setup_with_minted_tokens_and_approval();

    let balance_before = token.balance_of(&owner);
    token.transfer(&owner, &owner, &FIRST_TOKEN_ID);
    assert_eq!(token.balance_of(&owner), balance_before);
}

#[test]
#[should_panic(
    expected = "NFTIncorrectOwner(Contract(CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHK3M), 5042, Contract(CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFCT4))"
)]
fn test_transfer_when_the_address_of_the_previous_owner_is_incorrect_it_reverts() {
    let NFTTest { other, token, .. } = NFTTest::setup_with_minted_tokens_and_approval();

    token.transfer(&other, &other, &FIRST_TOKEN_ID);
}

#[test]
#[should_panic(
    expected = "NFTIncorrectOwner(Contract(CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHK3M), 5042, Contract(CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFCT4))"
)]
fn test_transfer_from_when_the_address_of_the_previous_owner_is_incorrect_it_reverts() {
    let NFTTest {
        owner,
        other,
        token,
        ..
    } = NFTTest::setup_with_minted_tokens_and_approval();

    token.transfer_from(&owner, &other, &other, &FIRST_TOKEN_ID);
}

#[test]
#[should_panic(
    expected = "NFTInsufficientApproval(Contract(CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHK3M), 5042)"
)]
fn test_transfer_when_the_sender_is_not_authorized_for_the_token_id_it_reverts() {
    let NFTTest {
        owner,
        other,
        token,
        ..
    } = NFTTest::setup_with_minted_tokens_and_approval();

    token.transfer_from(&other, &owner, &other, &FIRST_TOKEN_ID);
}

#[test]
#[should_panic(expected = "NFTNonexistentToken(13)")]
fn test_transfer_when_the_given_token_id_does_not_exist_it_reverts() {
    let NFTTest {
        owner,
        other,
        token,
        ..
    } = NFTTest::setup_with_minted_tokens_and_approval();

    token.transfer(&owner, &other, &NON_EXISTENT_TOKEN_ID);
}

#[test]
#[should_panic(expected = "NFTNonexistentToken(13)")]
fn test_transfer_from_when_the_given_token_id_does_not_exist_it_reverts() {
    let NFTTest {
        owner,
        other,
        approved,
        token,
        ..
    } = NFTTest::setup_with_minted_tokens_and_approval();

    token.transfer_from(&approved, &owner, &other, &NON_EXISTENT_TOKEN_ID);
}

#[test]
fn test_approve_authorization() {
    let NFTTest {
        env, owner, token, ..
    } = NFTTest::setup_with_minted_tokens();

    token.approve(&owner, &None, &FIRST_TOKEN_ID);

    assert_eq!(
        env.auths(),
        [(
            owner.clone(),
            AuthorizedInvocation {
                function: AuthorizedFunction::Contract((
                    token.address,
                    symbol_short!("approve"),
                    (owner, Option::<Address>::None, FIRST_TOKEN_ID).into_val(&env)
                )),
                sub_invocations: std::vec![]
            }
        )]
    );
}

#[test]
fn test_approve_when_clearing_approval_when_there_was_no_prior_approval_it_clears_approval() {
    let NFTTest { owner, token, .. } = NFTTest::setup_with_minted_tokens();

    token.approve(&owner, &None, &FIRST_TOKEN_ID);
    assert_eq!(token.get_approved(&FIRST_TOKEN_ID), None);
}

#[test]
fn test_approve_when_clearing_approval_when_there_was_no_prior_approval_it_emits_approval_event() {
    let NFTTest {
        env, owner, token, ..
    } = NFTTest::setup_with_minted_tokens();

    token.approve(&owner, &None, &FIRST_TOKEN_ID);

    assert_eq!(
        env.events().all(),
        vec![
            &env,
            (
                token.address,
                (
                    symbol_short!("approval"),
                    owner,
                    Option::<Address>::None,
                    FIRST_TOKEN_ID
                )
                    .into_val(&env),
                ().into_val(&env)
            )
        ]
    );
}

#[test]
fn test_approve_when_clearing_approval_when_there_was_a_prior_approval_it_clears_approval() {
    let NFTTest {
        owner,
        other,
        token,
        ..
    } = NFTTest::setup_with_minted_tokens();

    token.approve(&owner, &Some(other), &FIRST_TOKEN_ID);
    token.approve(&owner, &None, &FIRST_TOKEN_ID);
    assert_eq!(token.get_approved(&FIRST_TOKEN_ID), None);
}

#[test]
fn test_approve_when_clearing_approval_when_there_was_a_prior_approval_it_emits_approval_event() {
    let NFTTest {
        env,
        owner,
        other,
        token,
        ..
    } = NFTTest::setup_with_minted_tokens();

    token.approve(&owner, &Some(other), &FIRST_TOKEN_ID);
    token.approve(&owner, &None, &FIRST_TOKEN_ID);

    assert_eq!(
        env.events().all(),
        vec![
            &env,
            (
                token.address,
                (
                    symbol_short!("approval"),
                    owner,
                    Option::<Address>::None,
                    FIRST_TOKEN_ID
                )
                    .into_val(&env),
                ().into_val(&env)
            ),
        ]
    );
}

#[test]
fn test_approve_when_approving_a_non_zero_address_when_there_was_no_prior_approval_it_approves() {
    let NFTTest {
        owner,
        approved,
        token,
        ..
    } = NFTTest::setup_with_minted_tokens();

    token.approve(&owner, &Some(approved.clone()), &FIRST_TOKEN_ID);
    assert_eq!(token.get_approved(&FIRST_TOKEN_ID), Some(approved));
}

#[test]
fn test_approve_when_approving_a_non_zero_address_when_there_was_no_prior_approval_it_emits_approval_event(
) {
    let NFTTest {
        env,
        owner,
        approved,
        token,
        ..
    } = NFTTest::setup_with_minted_tokens();

    token.approve(&owner, &Some(approved.clone()), &FIRST_TOKEN_ID);

    assert_eq!(
        env.events().all(),
        vec![
            &env,
            (
                token.address,
                (
                    symbol_short!("approval"),
                    owner,
                    Some(approved),
                    FIRST_TOKEN_ID
                )
                    .into_val(&env),
                ().into_val(&env)
            ),
        ]
    );
}

#[test]
fn test_approve_when_approving_a_non_zero_address_when_there_was_a_prior_approval_to_the_same_address_it_approves(
) {
    let NFTTest {
        owner,
        approved,
        token,
        ..
    } = NFTTest::setup_with_minted_tokens();

    token.approve(&owner, &Some(approved.clone()), &FIRST_TOKEN_ID);
    token.approve(&owner, &Some(approved.clone()), &FIRST_TOKEN_ID);
    assert_eq!(token.get_approved(&FIRST_TOKEN_ID), Some(approved));
}

#[test]
fn test_approve_when_approving_a_non_zero_address_when_there_was_a_prior_approval_to_the_same_address_it_emits_approval_event(
) {
    let NFTTest {
        env,
        owner,
        approved,
        token,
        ..
    } = NFTTest::setup_with_minted_tokens();

    token.approve(&owner, &Some(approved.clone()), &FIRST_TOKEN_ID);
    token.approve(&owner, &Some(approved.clone()), &FIRST_TOKEN_ID);

    assert_eq!(
        env.events().all(),
        vec![
            &env,
            (
                token.address,
                (
                    symbol_short!("approval"),
                    owner,
                    Some(approved),
                    FIRST_TOKEN_ID
                )
                    .into_val(&env),
                ().into_val(&env)
            ),
        ]
    );
}

#[test]
fn test_approve_when_approving_a_non_zero_address_when_there_was_a_prior_approval_to_a_different_address_it_approves(
) {
    let NFTTest {
        owner,
        other,
        approved,
        token,
        ..
    } = NFTTest::setup_with_minted_tokens();

    token.approve(&owner, &Some(other), &FIRST_TOKEN_ID);
    token.approve(&owner, &Some(approved.clone()), &FIRST_TOKEN_ID);
    assert_eq!(token.get_approved(&FIRST_TOKEN_ID), Some(approved));
}

#[test]
fn test_approve_when_approving_a_non_zero_address_when_there_was_a_prior_approval_to_a_different_address_it_emits_approval_event(
) {
    let NFTTest {
        env,
        owner,
        other,
        approved,
        token,
        ..
    } = NFTTest::setup_with_minted_tokens();

    token.approve(&owner, &Some(other), &FIRST_TOKEN_ID);
    token.approve(&owner, &Some(approved.clone()), &FIRST_TOKEN_ID);

    assert_eq!(
        env.events().all(),
        vec![
            &env,
            (
                token.address,
                (
                    symbol_short!("approval"),
                    owner,
                    Some(approved),
                    FIRST_TOKEN_ID
                )
                    .into_val(&env),
                ().into_val(&env)
            ),
        ]
    );
}

#[test]
#[should_panic(
    expected = "NFTInvalidApprover(Contract(CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHK3M))"
)]
fn test_approve_when_the_sender_does_not_own_the_given_token_id_it_reverts() {
    let NFTTest {
        other,
        approved,
        token,
        ..
    } = NFTTest::setup_with_minted_tokens();

    token.approve(&other, &Some(approved), &FIRST_TOKEN_ID);
}

#[test]
#[should_panic(
    expected = "NFTInvalidApprover(Contract(CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAITA4))"
)]
fn test_approve_when_the_sender_is_approved_for_the_given_token_id_it_reverts() {
    let NFTTest {
        owner,
        other,
        approved,
        token,
        ..
    } = NFTTest::setup_with_minted_tokens();

    token.approve(&owner, &Some(approved.clone()), &FIRST_TOKEN_ID);
    token.approve(&approved, &Some(other), &FIRST_TOKEN_ID);
}

#[test]
#[should_panic(expected = "NFTNonexistentToken(13)")]
fn test_approve_when_the_given_token_id_does_not_exist_it_reverts() {
    let NFTTest {
        owner,
        approved,
        token,
        ..
    } = NFTTest::setup_with_minted_tokens();

    token.approve(&owner, &Some(approved.clone()), &NON_EXISTENT_TOKEN_ID);
}

#[test]
#[should_panic(expected = "NFTNonexistentToken(13)")]
fn test_get_approved_when_token_is_not_minted_it_reverts() {
    let NFTTest { token, .. } = NFTTest::setup_with_minted_tokens();

    token.get_approved(&NON_EXISTENT_TOKEN_ID);
}

#[test]
fn test_get_approved_when_token_has_been_minted_it_should_return_none() {
    let NFTTest { token, .. } = NFTTest::setup_with_minted_tokens();

    assert_eq!(token.get_approved(&FIRST_TOKEN_ID), None);
}

#[test]
fn test_get_approved_when_account_has_been_approved_it_returns_approved_account() {
    let NFTTest {
        owner,
        approved,
        token,
        ..
    } = NFTTest::setup_with_minted_tokens();

    token.approve(&owner, &Some(approved.clone()), &FIRST_TOKEN_ID);
    assert_eq!(token.get_approved(&FIRST_TOKEN_ID), Some(approved));
}

#[test]
fn test_mint_authorization() {
    let NFTTest {
        env,
        admin,
        owner,
        token,
        ..
    } = NFTTest::setup();

    token.mint(&owner, &FIRST_TOKEN_ID);

    assert_eq!(
        env.auths(),
        [(
            admin,
            AuthorizedInvocation {
                function: AuthorizedFunction::Contract((
                    token.address,
                    symbol_short!("mint"),
                    (owner, FIRST_TOKEN_ID).into_val(&env)
                )),
                sub_invocations: std::vec![]
            }
        )]
    );
}

#[test]
fn test_mint_with_minted_token_it_emits_a_transfer_event() {
    let NFTTest {
        env, owner, token, ..
    } = NFTTest::setup_with_minted_token();

    assert_eq!(
        env.events().all(),
        vec![
            &env,
            (
                token.address,
                (
                    symbol_short!("transfer"),
                    Option::<Address>::None,
                    Some(owner),
                    FIRST_TOKEN_ID
                )
                    .into_val(&env),
                ().into_val(&env)
            ),
        ]
    );
}

#[test]
fn test_mint_with_minted_token_it_creates_the_token() {
    let NFTTest { owner, token, .. } = NFTTest::setup_with_minted_token();

    assert_eq!(token.balance_of(&owner), 1);
    assert_eq!(token.owner_of(&FIRST_TOKEN_ID), owner);
}

#[test]
#[should_panic(expected = "NFTInvalidSender(None)")]
fn test_mint_with_minted_token_it_reverts_when_adding_token_id_that_already_exists() {
    let NFTTest { owner, token, .. } = NFTTest::setup_with_minted_token();

    token.mint(&owner, &FIRST_TOKEN_ID);
}

#[test]
fn test_burn_authorization() {
    let NFTTest {
        env, admin, token, ..
    } = NFTTest::setup_with_minted_tokens();

    token.burn(&FIRST_TOKEN_ID);

    assert_eq!(
        env.auths(),
        [(
            admin,
            AuthorizedInvocation {
                function: AuthorizedFunction::Contract((
                    token.address,
                    symbol_short!("burn"),
                    (FIRST_TOKEN_ID,).into_val(&env)
                )),
                sub_invocations: std::vec![]
            }
        )]
    );
}

#[test]
#[should_panic(expected = "NFTNonexistentToken(13)")]
fn test_burn_it_reverts_when_burning_a_non_existent_token_id() {
    let NFTTest { token, .. } = NFTTest::setup();

    token.burn(&NON_EXISTENT_TOKEN_ID);
}

#[test]
fn test_burn_with_minted_tokens_with_burnt_token_it_emits_a_transfer_event() {
    let NFTTest {
        env, owner, token, ..
    } = NFTTest::setup_with_minted_tokens_and_burnt_token();

    assert_eq!(
        env.events().all(),
        vec![
            &env,
            (
                token.address,
                (
                    symbol_short!("transfer"),
                    Some(owner),
                    Option::<Address>::None,
                    FIRST_TOKEN_ID
                )
                    .into_val(&env),
                ().into_val(&env)
            ),
        ]
    );
}

#[test]
#[should_panic(expected = "NFTNonexistentToken(5042)")]
fn test_burn_with_minted_tokens_with_burnt_token_it_deletes_the_token() {
    let NFTTest { owner, token, .. } = NFTTest::setup_with_minted_tokens_and_burnt_token();

    assert_eq!(token.balance_of(&owner), 1);
    token.owner_of(&FIRST_TOKEN_ID);
}

#[test]
#[should_panic(expected = "NFTNonexistentToken(5042)")]
fn test_burn_with_minted_tokens_with_burnt_token_it_reverts_when_burning_a_token_id_that_has_been_deleted(
) {
    let NFTTest { token, .. } = NFTTest::setup_with_minted_tokens_and_burnt_token();

    token.burn(&FIRST_TOKEN_ID);
}

#[test]
fn test_metadata_has_a_name() {
    let NFTTest { env, token, .. } = NFTTest::setup();

    assert_eq!(token.name(), String::from_str(&env, NAME));
}

#[test]
fn test_metadata_has_a_symbol() {
    let NFTTest { env, token, .. } = NFTTest::setup();

    assert_eq!(token.symbol(), String::from_str(&env, SYMBOL));
}

#[test]
fn test_token_uri_returns_empty_string_by_default() {
    let NFTTest { env, token, .. } = NFTTest::setup_with_minted_tokens();

    assert_eq!(
        token.token_uri(&FIRST_TOKEN_ID),
        vec![&env, String::from_str(&env, "")]
    );
}

#[test]
#[should_panic(expected = "NFTNonexistentToken(13)")]
fn test_token_uri_reverts_when_queried_for_non_existent_token_id() {
    let NFTTest { token, .. } = NFTTest::setup_with_minted_tokens();

    token.token_uri(&NON_EXISTENT_TOKEN_ID);
}

#[test]
fn test_set_token_uri_authorization() {
    let NFTTest {
        env, admin, token, ..
    } = NFTTest::setup_with_minted_tokens();

    token.set_token_uri(&FIRST_TOKEN_ID, &String::from_str(&env, SAMPLE_URI));

    assert_eq!(
        env.auths(),
        [(
            admin,
            AuthorizedInvocation {
                function: AuthorizedFunction::Contract((
                    token.address,
                    Symbol::new(&env, "set_token_uri"),
                    (FIRST_TOKEN_ID, SAMPLE_URI).into_val(&env)
                )),
                sub_invocations: std::vec![]
            }
        )]
    );
}

#[test]
fn test_token_uri_can_be_set_for_a_token_id() {
    let NFTTest { env, token, .. } = NFTTest::setup_with_minted_tokens();

    token.set_token_uri(&FIRST_TOKEN_ID, &String::from_str(&env, SAMPLE_URI));
    assert_eq!(
        token.token_uri(&FIRST_TOKEN_ID),
        vec![&env, String::from_str(&env, SAMPLE_URI)]
    );
}

#[test]
fn test_token_uri_setting_the_uri_emits_an_event() {
    let NFTTest { env, token, .. } = NFTTest::setup_with_minted_tokens();

    token.set_token_uri(&FIRST_TOKEN_ID, &String::from_str(&env, SAMPLE_URI));
    assert_eq!(
        env.events().all(),
        vec![
            &env,
            (
                token.address,
                (Symbol::new(&env, "metadata_update"), FIRST_TOKEN_ID).into_val(&env),
                ().into_val(&env)
            )
        ]
    );
}

#[test]
fn test_token_uri_setting_the_uri_for_non_existent_token_id_is_allowed() {
    let NFTTest {
        env, owner, token, ..
    } = NFTTest::setup_with_minted_tokens();

    token.set_token_uri(&NON_EXISTENT_TOKEN_ID, &String::from_str(&env, SAMPLE_URI));
    assert_eq!(
        env.events().all(),
        vec![
            &env,
            (
                token.address.clone(),
                (Symbol::new(&env, "metadata_update"), NON_EXISTENT_TOKEN_ID).into_val(&env),
                ().into_val(&env)
            )
        ]
    );

    token.mint(&owner, &NON_EXISTENT_TOKEN_ID);
    assert_eq!(
        token.token_uri(&NON_EXISTENT_TOKEN_ID),
        vec![&env, String::from_str(&env, SAMPLE_URI)]
    );
}

#[test]
fn test_set_base_uri_authorization() {
    let NFTTest {
        env, admin, token, ..
    } = NFTTest::setup();

    token.set_base_uri(&String::from_str(&env, BASE_URI));

    assert_eq!(
        env.auths(),
        [(
            admin,
            AuthorizedInvocation {
                function: AuthorizedFunction::Contract((
                    token.address,
                    Symbol::new(&env, "set_base_uri"),
                    (BASE_URI,).into_val(&env)
                )),
                sub_invocations: std::vec![]
            }
        )]
    );
}

#[test]
fn test_token_uri_base_uri_can_be_set() {
    let NFTTest { env, token, .. } = NFTTest::setup_with_minted_tokens();

    token.set_base_uri(&String::from_str(&env, BASE_URI));
    assert_eq!(token.base_uri(), String::from_str(&env, BASE_URI));
}

#[test]
fn test_token_uri_base_uri_is_added_as_a_prefix_to_the_token_uri() {
    let NFTTest { env, token, .. } = NFTTest::setup_with_minted_tokens();

    token.set_base_uri(&String::from_str(&env, BASE_URI));
    token.set_token_uri(&FIRST_TOKEN_ID, &String::from_str(&env, SAMPLE_URI));
    assert_eq!(
        token.token_uri(&FIRST_TOKEN_ID),
        vec![
            &env,
            String::from_str(&env, BASE_URI),
            String::from_str(&env, SAMPLE_URI)
        ]
    );
}

#[test]
fn test_token_uri_can_be_changed_by_changing_the_base_uri() {
    let NFTTest { env, token, .. } = NFTTest::setup_with_minted_tokens();

    token.set_base_uri(&String::from_str(&env, BASE_URI));
    token.set_token_uri(&FIRST_TOKEN_ID, &String::from_str(&env, SAMPLE_URI));

    token.set_base_uri(&String::from_str(&env, OTHER_BASE_URI));
    assert_eq!(
        token.token_uri(&FIRST_TOKEN_ID),
        vec![
            &env,
            String::from_str(&env, OTHER_BASE_URI),
            String::from_str(&env, SAMPLE_URI)
        ]
    );
}

#[test]
#[should_panic(expected = "NFTNonexistentToken(5042)")]
fn test_token_uri_tokens_without_uri_can_be_burnt() {
    let NFTTest { token, .. } = NFTTest::setup_with_minted_tokens();

    token.burn(&FIRST_TOKEN_ID);

    token.token_uri(&FIRST_TOKEN_ID);
}

#[test]
#[should_panic(expected = "NFTNonexistentToken(5042)")]
fn test_token_uri_tokens_with_uri_can_be_burnt() {
    let NFTTest { env, token, .. } = NFTTest::setup_with_minted_tokens();

    token.set_token_uri(&FIRST_TOKEN_ID, &String::from_str(&env, SAMPLE_URI));

    token.burn(&FIRST_TOKEN_ID);

    token.token_uri(&FIRST_TOKEN_ID);
}

#[test]
fn test_token_uri_tokens_uri_is_kept_if_token_is_burnt_and_reminted() {
    let NFTTest {
        env, owner, token, ..
    } = NFTTest::setup_with_minted_tokens();

    token.set_token_uri(&FIRST_TOKEN_ID, &String::from_str(&env, SAMPLE_URI));

    token.burn(&FIRST_TOKEN_ID);

    token.mint(&owner, &FIRST_TOKEN_ID);
    assert_eq!(
        token.token_uri(&FIRST_TOKEN_ID),
        vec![&env, String::from_str(&env, SAMPLE_URI)]
    );
}
