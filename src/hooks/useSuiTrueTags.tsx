import { Transaction } from '@mysten/sui/transactions';
import { SuiClient } from "@mysten/sui/client";
import { MIST_PER_SUI } from '@mysten/sui/utils';
import { useMemo } from 'react';
import { useWallet } from '@suiet/wallet-kit';

const PACKAGE_ID = '0xc54443d17051c610cf4958ce29af293e695a3f672c222e4a452a93804e64349a';
const REGISTRY_ID = '0x3bf2bc2cc9b5c214d7f33ea9bfc63e959455086946dba5bdea295fbc4a337f7a';
const VAULT_ID = '0x07fd0d01b0a2fc2d95e724bd2e86374d65131abc96cee39af876c591b6989dd2';

// interface UseSuiTrueTagsProps {
//     client: SuiClient;
//     packageId: string;
//     vaultId: string;
//     registryId: string;
// }

export function useSuiTrueTags(
    client: SuiClient,
    packageId = PACKAGE_ID,
    vaultId = VAULT_ID,
    registryId = REGISTRY_ID) {

    const wallet = useWallet();

    async function executeTransaction(txb: Transaction) {
        console.log('executeTransaction');
        console.log("wallet connected", wallet.connected)

        if (!wallet.connected){
            await wallet.select('Suiet');
        }

        try {
            // call the wallet to sign and execute the transaction
            console.log("signing and executing transaction", txb)
            const res = await wallet.signAndExecuteTransaction({
                transaction: txb,
            });
            console.log('Transaction executed:', res);

            const txResponse = await client.waitForTransaction({
                digest: res.digest,
                options: {
                    showEffects: true,
                    showEvents: true,
                },
            });

            // Check if transaction was successful
            const status = txResponse.effects?.status;
            if (status?.status !== 'success') {
                throw new Error(`Transaction failed: ${status?.error || 'Unknown error'}`);
            }

            console.log('Transaction confirmed:', txResponse);
            return res.digest;
        } catch (e) {
            console.error("transaction failed", e);
        }
        return "";
    }

    const createTask = useMemo(() => async (
        taskTypeId: number,
        taskName: string,
        rewardPerAnnotation: number,
        requiredAnnotations: number,
    ) => {
        const tx = new Transaction();
        
        // Convert SUI to MIST and ensure it's a bigint
        const paymentInMist = BigInt(Math.floor(rewardPerAnnotation *  requiredAnnotations * Number(MIST_PER_SUI)));
        const rewardPerAnnotationInMist = BigInt(Math.floor(rewardPerAnnotation * Number(MIST_PER_SUI)));
        
        console.log('paymentInMist:', paymentInMist);
        const [coin] = tx.splitCoins(tx.gas, [paymentInMist]);

        tx.moveCall({
            target: `${packageId}::true_tag::create_task`,
            arguments: [
                tx.object(vaultId),
                tx.pure.u64(taskTypeId), 
                tx.pure.string(taskName), 
                tx.pure.u64(rewardPerAnnotationInMist), 
                tx.pure.u64(requiredAnnotations), 
                coin
            ],
        });

        tx.setGasBudget(100000000);

        const result = await executeTransaction(tx);

        return result;
    }, [client, packageId, vaultId]);

     const submitAnnotation = useMemo(() => async (
        taskId: number,
        data: string
    ) => {
        const tx = new Transaction();

        tx.moveCall({
            target: `${packageId}::true_tag::submit_annotation`,
            arguments: [
                tx.object(vaultId),
                tx.object(registryId),
                tx.pure.u64(taskId),
                tx.pure.string(data)
            ],
        });

        tx.setGasBudget(100000000);

        const result = await executeTransaction(tx);
        return result;
    }, [client, packageId, vaultId, registryId]);


    return {
        createTask,
        submitAnnotation
    };
}

