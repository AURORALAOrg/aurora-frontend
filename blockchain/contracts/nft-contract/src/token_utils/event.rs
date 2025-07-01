use soroban_sdk::{symbol_short, Address, Env, Symbol};

pub struct Events {
    env: Env,
}

impl Events {
    #[inline(always)]
    pub fn new(env: &Env) -> Events {
        Events { env: env.clone() }
    }

    pub fn transfer(&self, from: &Option<Address>, to: &Option<Address>, token_id: u128) {
        let topics = (symbol_short!("transfer"), from, to, token_id);
        self.env.events().publish(topics, ());
    }

    pub fn approval(&self, owner: Address, approved: &Option<Address>, token_id: u128) {
        let topics = (symbol_short!("approval"), owner, approved, token_id);
        self.env.events().publish(topics, ());
    }

    pub fn metadata_update(&self, token_id: u128) {
        let topics = (Symbol::new(&self.env, "metadata_update"), token_id);
        self.env.events().publish(topics, ());
    }
}
