use soroban_sdk::contracttype;

#[derive(Clone)]
#[contracttype]
pub struct TransactionDetail {
    pub amount: i128,
    pub id: i128,
}

// Storage keys
pub const TRANSACTIONS_RECEIVED: &str = "transactions_received";
pub const OUTGOING_TRANSACTIONS: &str = "outgoing_transactions";
pub const USERS_POINTS: &str = "users_points";
pub const ADMINS: &str = "admins";
pub const TOTAL_TRANSACTIONS: &str = "total_transactions";
pub const TOTAL_CASH_OUTFLOWS: &str = "total_cash_outflows";
pub const TOTAL_CASH_INFLOWS: &str = "total_cash_inflows";
pub const PARTICIPANT_TRANSACTION_COUNT: &str = "participant_transaction_count"; 

