import { useWallet } from '@solana/wallet-adapter-react';
import type { SolanaSignInInput } from '@solana/wallet-standard-features';
import { verifySignIn } from '@solana/wallet-standard-util';
import bs58 from 'bs58';
import type { FC } from 'react';
import React, { useCallback } from 'react';
import {Button} from "react-bootstrap";
import exp from "constants";

export const SignIn: FC = () => {
    const { signIn, publicKey } = useWallet();

    const onClick = useCallback(async () => {
        function notify(success: string, s: string) {
            
        }

        try {
            if (!signIn) throw new Error('Wallet does not support Sign In With Solana!');

            const input: SolanaSignInInput = {
                domain: window.location.host,
                address: publicKey ? publicKey.toBase58() : undefined,
                statement: 'Please sign in.',
            };
            const output = await signIn(input);

            if (!verifySignIn(input, output)) throw new Error('Sign In verification failed!');
            <></>
        } catch (error: any) {
            <></>
        }
    }, [signIn, publicKey]);

    return (
        <Button variant="contained" color="secondary" onClick={onClick} disabled={!signIn}>
            Sign In
        </Button>
    );
};

export default SignIn;