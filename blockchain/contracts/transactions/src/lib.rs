#![no_std]
use soroban_sdk::{contract, contractimpl, Address, Env, Map};

mod datatype;
mod interfaces;
mod admin;
mod transaction;
mod points;
mod test;

use datatype::{
    TransactionDetail,
    TOTAL_TRANSACTIONS, TOTAL_CASH_OUTFLOWS, TOTAL_CASH_INFLOWS,
    PARTICIPANT_TRANSACTION_COUNT, USERS_POINTS
};
use interfaces::{AdminInterface, TransactionInterface, PointsInterface};
use admin::AdminImpl;
use transaction::TransactionImpl;
use points::PointsImpl;

#[contract]
pub struct Transactions;

#[contractimpl]
impl Transactions {
    // Admin functions
    pub fn initialize(env: Env, admin: Address) {
        AdminImpl::initialize(env.clone(), admin);
        
        // Initialize additional data structures
        let points: Map<Address, i128> = Map::new(&env);
        let tx_count: Map<Address, i128> = Map::new(&env);
        
        env.storage().instance().set(&USERS_POINTS, &points);
        env.storage().instance().set(&PARTICIPANT_TRANSACTION_COUNT, &tx_count);
        
        // Initialize counters
        env.storage().instance().set(&TOTAL_TRANSACTIONS, &0i128);
        env.storage().instance().set(&TOTAL_CASH_OUTFLOWS, &0i128);
        env.storage().instance().set(&TOTAL_CASH_INFLOWS, &0i128);
    }
    
    pub fn add_admin(env: Env, caller: Address, new_admin: Address) {
        AdminImpl::add_admin(env, caller, new_admin);
    }
    
    pub fn is_admin(env: Env, address: Address) -> bool {
        AdminImpl::is_admin(env, address)
    }
    
    // Transaction functions
    pub fn add_transaction_received(env: Env, caller: Address, address: Address, amount: i128) {
        TransactionImpl::add_transaction_received(env, caller, address, amount);
    }
    
    pub fn add_outgoing_transaction(env: Env, caller: Address, address: Address, amount: i128) {
        TransactionImpl::add_outgoing_transaction(env, caller, address, amount);
    }
    
    pub fn read_transactions_received(env: Env) -> Map<Address, TransactionDetail> {
        TransactionImpl::read_transactions_received(env)
    }
    
    pub fn read_outgoing_transactions(env: Env) -> Map<Address, TransactionDetail> {
        TransactionImpl::read_outgoing_transactions(env)
    }
    
    pub fn read_total_transaction(env: Env) -> i128 {
        TransactionImpl::read_total_transaction(env)
    }
    
    pub fn read_cash_inflows(env: Env) -> i128 {
        TransactionImpl::read_cash_inflows(env)
    }
    
    pub fn read_cash_outflows(env: Env) -> i128 {
        TransactionImpl::read_cash_outflows(env)
    }
    
    pub fn reset_cash_inflows(env: Env, caller: Address) {
        TransactionImpl::reset_cash_inflows(env, caller);
    }
    
    pub fn reset_cash_outflows(env: Env, caller: Address) {
        TransactionImpl::reset_cash_outflows(env, caller);
    }
    
    pub fn read_tx_count(env: Env, address: Address) -> i128 {
        TransactionImpl::read_participant_transaction_count(env, address)
    }
    
    // Points functions
    pub fn add_user_points(env: Env, caller: Address, address: Address, points_to_add: i128) {
        PointsImpl::add_user_points(env, caller, address, points_to_add);
    }
    
    pub fn reset_user_points(env: Env, caller: Address, address: Address) {
        PointsImpl::reset_user_points(env, caller, address);
    }
    
    pub fn read_user_points(env: Env, address: Address) -> i128 {
        PointsImpl::read_user_points(env, address)
    }
    
    pub fn read_all_user_points(env: Env) -> Map<Address, i128> {
        PointsImpl::read_all_user_points(env)
    }
}