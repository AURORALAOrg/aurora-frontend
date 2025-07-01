default: build

all: test

test: build
	cargo test

build:
	stellar contract build

bindings:
	stellar contract bindings typescript \
  	--wasm target/wasm32-unknown-unknown/release/transactions.wasm \
  	--network testnet \
  	--output-dir transactions-sdk

deploy:
	stellar contract deploy \
  	--wasm target/wasm32-unknown-unknown/release/transactions.wasm \
  	--source alice \
  	--network testnet \
  	--alias transactions

fmt:
	cargo fmt --all

clean:
	cargo clean
