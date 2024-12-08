'use client';
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { useMemo } from "react";
import { ethers } from "ethers";
import { OktoContextType } from "okto-sdk-react";
import { useOkto } from "okto-sdk-react";

const EAS_CONTRACT_ADDRESS = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";
const SCHEMA_UID = "0x5edb38d23dfac31274ac230e73868bafde883bfa8572df62d5f1fbb713659bf4";

interface AttestationData {
    jobId: string;
    winnerId: string;
    loserId: string;
}

export function useEASAttestation() {
    const { executeRawTransactionWithJobStatus } = useOkto() as OktoContextType;
    const provider = useMemo(() => 
        new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_PROVIDER_URL),
        []
    );
    
    const signer = useMemo(() => 
        new ethers.Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY!, provider),
        [provider]
    );

    const eas = useMemo(() => {
        const easInstance = new EAS(EAS_CONTRACT_ADDRESS);
        easInstance.connect(signer);
        return easInstance;
    }, [signer]);

    const schemaEncoder = useMemo(
        () => new SchemaEncoder("string jobId,string winnerId,string loserId"),
        []
    );

    const createAttestationWithOkto = async (data: AttestationData) => {
        try {
            const requestData = {
                network_name: "POLYGON_TESTNET",
                transaction: {
                    from: signer.address,
                    to: EAS_CONTRACT_ADDRESS,
                    data,
                    value: "0x100000",
                },
            }
    
            executeRawTransactionWithJobStatus(requestData)
                    .then((result) => {
                        console.log(result)
                    })
                    .catch((error) => {
                        console.error(`error:`, error);
                    });
        } catch (error) {
            console.error("Error creating attestation:", error);
            throw error;
        }
    }

    const createAttestation = async (data: AttestationData) => {
        if(process.env.NEXT_PUBLIC_ATTESTATION_TYPE === "polygon"){
            createAttestationWithOkto(data);
            return "";
        }
        try {
            const encodedData = schemaEncoder.encodeData([
                { name: "jobId", value: data.jobId, type: "string" },
                { name: "winnerId", value: data.winnerId, type: "string" },
                { name: "loserId", value: data.loserId, type: "string" },
            ]);

            const tx = await eas.attest({
                schema: SCHEMA_UID,
                data: {
                    recipient: "0x0000000000000000000000000000000000000000",
                    expirationTime: BigInt(0),
                    revocable: false,
                    data: encodedData,
                },
            });

            const newAttestationUID = await tx.wait();
            return newAttestationUID;
        } catch (error) {
            console.error("Error creating attestation:", error);
        }
        return "";
    };

    return { createAttestation };
}
