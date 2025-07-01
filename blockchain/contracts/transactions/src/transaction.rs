use soroban_sdk::{Address, Env, Map};
use crate::datatype::{
    TransactionDetail, TRANSACTIONS_RECEIVED, OUTGOING_TRANSACTIONS,
    TOTAL_TRANSACTIONS, TOTAL_CASH_INFLOWS, TOTAL_CASH_OUTFLOWS,
    PARTICIPANT_TRANSACTION_COUNT
};
use crate::interfaces::{TransactionInterface, AdminInterface};
use crate::admin::AdminImpl;

pub struct TransactionImpl;

impl TransactionInterface for TransactionImpl {
    fn add_transaction_received(env: Env, caller: Address, address: Address, amount: i128) {
        caller.require_auth();
        AdminImpl::only_admins(&env, &caller);
        
        let mut received: Map<Address, TransactionDetail> = env.storage()
            .instance()
            .get(&TRANSACTIONS_RECEIVED)
            .unwrap_or(Map::new(&env));
        
        // Generate a unique transaction ID
        let total = Self::read_total_transaction(env.clone());
        let id = total + 1;
        
        received.set(address.clone(), TransactionDetail { amount, id });
        env.storage().instance().set(&TRANSACTIONS_RECEIVED, &received);
        
        // Update total transactions
        env.storage().instance().set(&TOTAL_TRANSACTIONS, &id);
        
        // Update total cash inflows
        let inflows = Self::read_cash_inflows(env.clone());
        env.storage().instance().set(&TOTAL_CASH_INFLOWS, &(inflows + amount));
        
        // Update participant transaction count
        Self::increment_participant_count(&env, &address);
    }
    
    fn add_outgoing_transaction(env: Env, caller: Address, address: Address, amount: i128) {
        caller.require_auth();
        AdminImpl::only_admins(&env, &caller);
        
        let mut outgoing: Map<Address, TransactionDetail> = env.storage()
            .instance()
            .get(&OUTGOING_TRANSACTIONS)
            .unwrap_or(Map::new(&env));
        
        // Generate a unique transaction ID
        let total = Self::read_total_transaction(env.clone());
        let id = total + 1;
        
        outgoing.set(address.clone(), TransactionDetail { amount, id });
        env.storage().instance().set(&OUTGOING_TRANSACTIONS, &outgoing);
        
        // Update total transactions
        env.storage().instance().set(&TOTAL_TRANSACTIONS, &id);
        
        // Update total cash outflows
        let outflows = Self::read_cash_outflows(env.clone());
        env.storage().instance().set(&TOTAL_CASH_OUTFLOWS, &(outflows + amount));
        
        // Update participant transaction count
        Self::increment_participant_count(&env, &address);
    }
    
    fn read_transactions_received(env: Env) -> Map<Address, TransactionDetail> {
        env.storage()
            .instance()
            .get(&TRANSACTIONS_RECEIVED)
            .unwrap_or(Map::new(&env))
    }
    
    fn read_outgoing_transactions(env: Env) -> Map<Address, TransactionDetail> {
        env.storage()
            .instance()
            .get(&OUTGOING_TRANSACTIONS)
            .unwrap_or(Map::new(&env))
    }
    
    fn read_total_transaction(env: Env) -> i128 {
        env.storage().instance().get(&TOTAL_TRANSACTIONS).unwrap_or(0i128)
    }
    
    fn read_cash_inflows(env: Env) -> i128 {
        env.storage().instance().get(&TOTAL_CASH_INFLOWS).unwrap_or(0i128)
    }
    
    fn read_cash_outflows(env: Env) -> i128 {
        env.storage().instance().get(&TOTAL_CASH_OUTFLOWS).unwrap_or(0i128)
    }
    
    fn reset_cash_inflows(env: Env, caller: Address) {
        caller.require_auth();
        AdminImpl::only_admins(&env, &caller);
        
        env.storage().instance().set(&TOTAL_CASH_INFLOWS, &0i128);
    }
    
    fn reset_cash_outflows(env: Env, caller: Address) {
        caller.require_auth();
        AdminImpl::only_admins(&env, &caller);
        
        env.storage().instance().set(&TOTAL_CASH_OUTFLOWS, &0i128);
    }
    
    fn read_participant_transaction_count(env: Env, address: Address) -> i128 {
        let counter: Map<Address, i128> = env.storage()
            .instance()
            .get(&PARTICIPANT_TRANSACTION_COUNT)
            .unwrap_or(Map::new(&env));
        
        counter.get(address).unwrap_or(0i128)
    }
}

impl TransactionImpl {
    // Helper method to increment a participant's transaction counter
    pub fn increment_participant_count(env: &Env, address: &Address) {
        let mut counter: Map<Address, i128> = env.storage()
            .instance()
            .get(&PARTICIPANT_TRANSACTION_COUNT)
            .unwrap_or(Map::new(&env));
        
        let current_count = counter.get(address.clone()).unwrap_or(0);
        counter.set(address.clone(), current_count + 1);
        
        env.storage().instance().set(&PARTICIPANT_TRANSACTION_COUNT, &counter);
    }
} 
