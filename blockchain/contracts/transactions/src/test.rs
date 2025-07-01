#![cfg(test)]
use soroban_sdk::{Env, Address};
use soroban_sdk::testutils::Address as AddressTestUtils;
use crate::{Transactions, TransactionsClient};

#[test]
fn test_transactions() {
    let env = Env::default();
    let contract_id = env.register(Transactions {}, ());
    let client = TransactionsClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    let user1 = Address::generate(&env);
    let user2 = Address::generate(&env);

    // Initialize contract
    env.mock_all_auths();
    client.initialize(&admin);

    // Test admin validation
    assert!(client.is_admin(&admin));
    assert!(!client.is_admin(&user1));
    
    // Add a transaction received
    client.add_transaction_received(&admin, &user1, &100i128);
    
    // Add an outgoing transaction
    client.add_outgoing_transaction(&admin, &user2, &50i128);
    
    // Check transaction details
    let received = client.read_transactions_received();
    let outgoing = client.read_outgoing_transactions();
    
    assert_eq!(received.get(user1.clone()).unwrap().amount, 100i128);
    assert_eq!(outgoing.get(user2.clone()).unwrap().amount, 50i128);
    
    // Check counters
    assert_eq!(client.read_total_transaction(), 2i128);
    assert_eq!(client.read_cash_inflows(), 100i128);
    assert_eq!(client.read_cash_outflows(), 50i128);
    
    // Add points
    client.add_user_points(&admin, &user1, &10i128);
    assert_eq!(client.read_user_points(&user1), 10i128);
    
    // Check transaction counts
    assert_eq!(client.read_tx_count(&user1), 1i128);
    assert_eq!(client.read_tx_count(&user2), 1i128);
    
    // Reset user points
    client.reset_user_points(&admin, &user1);
    assert_eq!(client.read_user_points(&user1), 0i128);
    
    // Reset cash counters
    client.reset_cash_inflows(&admin);
    client.reset_cash_outflows(&admin);
    
    assert_eq!(client.read_cash_inflows(), 0i128);
    assert_eq!(client.read_cash_outflows(), 0i128);
} 
