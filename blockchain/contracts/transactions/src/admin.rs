use soroban_sdk::{Address, Env, Map};
use crate::datatype::ADMINS;
use crate::interfaces::AdminInterface;

pub struct AdminImpl;

impl AdminInterface for AdminImpl {
    fn initialize(env: Env, admin: Address) {
        admin.require_auth();
        
        let mut admins: Map<Address, bool> = Map::new(&env);
        admins.set(admin, true);
        env.storage().instance().set(&ADMINS, &admins);
    }
    
    fn add_admin(env: Env, caller: Address, new_admin: Address) {
        caller.require_auth();
        Self::only_admins(&env, &caller);
        
        let mut admins: Map<Address, bool> = env.storage()
            .instance()
            .get(&ADMINS)
            .unwrap_or(Map::new(&env));
        
        admins.set(new_admin, true);
        env.storage().instance().set(&ADMINS, &admins);
    }
    
    fn only_admins(env: &Env, address: &Address) -> bool {
        let admins: Map<Address, bool> = env.storage()
            .instance()
            .get(&ADMINS)
            .unwrap_or(Map::new(&env));
        
        let is_admin = admins.get(address.clone()).unwrap_or(false);
        if !is_admin {
            panic!("Only admins can perform this operation");
        }
        true
    }
    
    fn is_admin(env: Env, address: Address) -> bool {
        let admins: Map<Address, bool> = env.storage()
            .instance()
            .get(&ADMINS)
            .unwrap_or(Map::new(&env));
        
        admins.get(address).unwrap_or(false)
    }
} 
