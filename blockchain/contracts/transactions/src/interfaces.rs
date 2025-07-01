use soroban_sdk::{Address, Env, Map};
use crate::datatype::TransactionDetail;

pub trait AdminInterface {
    fn initialize(env: Env, admin: Address);
    fn add_admin(env: Env, caller: Address, new_admin: Address);
    fn only_admins(env: &Env, address: &Address) -> bool;
    fn is_admin(env: Env, address: Address) -> bool;
}

pub trait TransactionInterface {
    fn add_transaction_received(env: Env, caller: Address, address: Address, amount: i128);
    fn add_outgoing_transaction(env: Env, caller: Address, address: Address, amount: i128);
    fn read_transactions_received(env: Env) -> Map<Address, TransactionDetail>;
    fn read_outgoing_transactions(env: Env) -> Map<Address, TransactionDetail>;
    fn read_total_transaction(env: Env) -> i128;
    fn read_cash_inflows(env: Env) -> i128;
    fn read_cash_outflows(env: Env) -> i128;
    fn reset_cash_inflows(env: Env, caller: Address);
    fn reset_cash_outflows(env: Env, caller: Address);
    fn read_participant_transaction_count(env: Env, address: Address) -> i128;
}

pub trait PointsInterface {
    fn add_user_points(env: Env, caller: Address, address: Address, points_to_add: i128);
    fn reset_user_points(env: Env, caller: Address, address: Address);
    fn read_user_points(env: Env, address: Address) -> i128;
    fn read_all_user_points(env: Env) -> Map<Address, i128>;
} 

