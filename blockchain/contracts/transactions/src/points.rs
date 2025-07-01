use soroban_sdk::{Address, Env, Map};
use crate::datatype::USERS_POINTS;
use crate::interfaces::{PointsInterface, AdminInterface};
use crate::admin::AdminImpl;

pub struct PointsImpl;

impl PointsInterface for PointsImpl {
    fn add_user_points(env: Env, caller: Address, address: Address, points_to_add: i128) {
        caller.require_auth();
        AdminImpl::only_admins(&env, &caller);
        
        let mut points: Map<Address, i128> = env.storage()
            .instance()
            .get(&USERS_POINTS)
            .unwrap_or(Map::new(&env));
        
        let current_points = points.get(address.clone()).unwrap_or(0);
        points.set(address, current_points + points_to_add);
        
        env.storage().instance().set(&USERS_POINTS, &points);
    }
    
    fn reset_user_points(env: Env, caller: Address, address: Address) {
        caller.require_auth();
        AdminImpl::only_admins(&env, &caller);
        
        let mut points: Map<Address, i128> = env.storage()
            .instance()
            .get(&USERS_POINTS)
            .unwrap_or(Map::new(&env));
        
        points.set(address, 0);
        env.storage().instance().set(&USERS_POINTS, &points);
    }
    
    fn read_user_points(env: Env, address: Address) -> i128 {
        let points: Map<Address, i128> = env.storage()
            .instance()
            .get(&USERS_POINTS)
            .unwrap_or(Map::new(&env));
        
        points.get(address).unwrap_or(0i128)
    }
    
    fn read_all_user_points(env: Env) -> Map<Address, i128> {
        env.storage()
            .instance()
            .get(&USERS_POINTS)
            .unwrap_or(Map::new(&env))
    }
} 
