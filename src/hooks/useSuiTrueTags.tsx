import { Transaction } from '@mysten/sui/transactions';
import { SuiClient } from "@mysten/sui/client";
import { MIST_PER_SUI } from '@mysten/sui/utils';
import { useMemo } from 'react';
import { useWallet } from '@suiet/wallet-kit';

const PACKAGE_ID = '0x26b68d27055bb801eb6a2acb8b16b7d6a39e03f34e3376f80c8fa9f0e2f36055';
const REGISTRY_ID = '0x2572b8f8023f2b97054fc3651dbcec666b52ce7b92c5d3b1a6401b4d327144d3';
const VAULT_ID = '0x471aafa23b9a30f9f2f9d447916f9cf3715ad08c6c3eff437472aac7d95cef3c';

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
        if (!wallet.connected) return;

        try {
            // call the wallet to sign and execute the transaction
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

    return {
        createTask,
    };
}

