export declare const CHAIN_ID = 44378;
export declare const TYPED_DATA: {
    types: {
        EIP712Domain: {
            name: string;
            type: string;
        }[];
        Person: {
            name: string;
            type: string;
        }[];
        Mail: {
            name: string;
            type: string;
        }[];
    };
    primaryType: string;
    domain: {
        name: string;
        version: string;
        chainId: number;
        verifyingContract: string;
    };
    message: {
        from: {
            name: string;
            wallet: string;
        };
        to: {
            name: string;
            wallet: string;
        };
        contents: string;
    };
};
export declare const PRIVATE_KEY1 = "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abbdef";
export declare const ACCOUNT_ADDRESS1: `0x${string}`;
export declare const PRIVATE_KEY2 = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890fdeccc";
export declare const ACCOUNT_ADDRESS2: `0x${string}`;
