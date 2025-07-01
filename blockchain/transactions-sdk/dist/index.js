import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export class Client extends ContractClient {
    options;
    static async deploy(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options) {
        return ContractClient.deploy(null, options);
    }
    constructor(options) {
        super(new ContractSpec(["AAAAAQAAAAAAAAAAAAAAEVRyYW5zYWN0aW9uRGV0YWlsAAAAAAAAAgAAAAAAAAAGYW1vdW50AAAAAAALAAAAAAAAAAJpZAAAAAAACw==",
            "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAQAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAA==",
            "AAAAAAAAAAAAAAAJYWRkX2FkbWluAAAAAAAAAgAAAAAAAAAGY2FsbGVyAAAAAAATAAAAAAAAAAluZXdfYWRtaW4AAAAAAAATAAAAAA==",
            "AAAAAAAAAAAAAAAIaXNfYWRtaW4AAAABAAAAAAAAAAdhZGRyZXNzAAAAABMAAAABAAAAAQ==",
            "AAAAAAAAAAAAAAAYYWRkX3RyYW5zYWN0aW9uX3JlY2VpdmVkAAAAAwAAAAAAAAAGY2FsbGVyAAAAAAATAAAAAAAAAAdhZGRyZXNzAAAAABMAAAAAAAAABmFtb3VudAAAAAAACwAAAAA=",
            "AAAAAAAAAAAAAAAYYWRkX291dGdvaW5nX3RyYW5zYWN0aW9uAAAAAwAAAAAAAAAGY2FsbGVyAAAAAAATAAAAAAAAAAdhZGRyZXNzAAAAABMAAAAAAAAABmFtb3VudAAAAAAACwAAAAA=",
            "AAAAAAAAAAAAAAAacmVhZF90cmFuc2FjdGlvbnNfcmVjZWl2ZWQAAAAAAAAAAAABAAAD7AAAABMAAAfQAAAAEVRyYW5zYWN0aW9uRGV0YWlsAAAA",
            "AAAAAAAAAAAAAAAacmVhZF9vdXRnb2luZ190cmFuc2FjdGlvbnMAAAAAAAAAAAABAAAD7AAAABMAAAfQAAAAEVRyYW5zYWN0aW9uRGV0YWlsAAAA",
            "AAAAAAAAAAAAAAAWcmVhZF90b3RhbF90cmFuc2FjdGlvbgAAAAAAAAAAAAEAAAAL",
            "AAAAAAAAAAAAAAARcmVhZF9jYXNoX2luZmxvd3MAAAAAAAAAAAAAAQAAAAs=",
            "AAAAAAAAAAAAAAAScmVhZF9jYXNoX291dGZsb3dzAAAAAAAAAAAAAQAAAAs=",
            "AAAAAAAAAAAAAAAScmVzZXRfY2FzaF9pbmZsb3dzAAAAAAABAAAAAAAAAAZjYWxsZXIAAAAAABMAAAAA",
            "AAAAAAAAAAAAAAATcmVzZXRfY2FzaF9vdXRmbG93cwAAAAABAAAAAAAAAAZjYWxsZXIAAAAAABMAAAAA",
            "AAAAAAAAAAAAAAANcmVhZF90eF9jb3VudAAAAAAAAAEAAAAAAAAAB2FkZHJlc3MAAAAAEwAAAAEAAAAL",
            "AAAAAAAAAAAAAAAPYWRkX3VzZXJfcG9pbnRzAAAAAAMAAAAAAAAABmNhbGxlcgAAAAAAEwAAAAAAAAAHYWRkcmVzcwAAAAATAAAAAAAAAA1wb2ludHNfdG9fYWRkAAAAAAAACwAAAAA=",
            "AAAAAAAAAAAAAAARcmVzZXRfdXNlcl9wb2ludHMAAAAAAAACAAAAAAAAAAZjYWxsZXIAAAAAABMAAAAAAAAAB2FkZHJlc3MAAAAAEwAAAAA=",
            "AAAAAAAAAAAAAAAQcmVhZF91c2VyX3BvaW50cwAAAAEAAAAAAAAAB2FkZHJlc3MAAAAAEwAAAAEAAAAL",
            "AAAAAAAAAAAAAAAUcmVhZF9hbGxfdXNlcl9wb2ludHMAAAAAAAAAAQAAA+wAAAATAAAACw=="]), options);
        this.options = options;
    }
    fromJSON = {
        initialize: (this.txFromJSON),
        add_admin: (this.txFromJSON),
        is_admin: (this.txFromJSON),
        add_transaction_received: (this.txFromJSON),
        add_outgoing_transaction: (this.txFromJSON),
        read_transactions_received: (this.txFromJSON),
        read_outgoing_transactions: (this.txFromJSON),
        read_total_transaction: (this.txFromJSON),
        read_cash_inflows: (this.txFromJSON),
        read_cash_outflows: (this.txFromJSON),
        reset_cash_inflows: (this.txFromJSON),
        reset_cash_outflows: (this.txFromJSON),
        read_tx_count: (this.txFromJSON),
        add_user_points: (this.txFromJSON),
        reset_user_points: (this.txFromJSON),
        read_user_points: (this.txFromJSON),
        read_all_user_points: (this.txFromJSON)
    };
}
