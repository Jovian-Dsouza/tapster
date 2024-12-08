import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { useMemo } from "react";
import { ethers } from "ethers";

const EAS_CONTRACT_ADDRESS = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";
const SCHEMA_UID = "0x5edb38d23dfac31274ac230e73868bafde883bfa8572df62d5f1fbb713659bf4";

interface AttestationData {
    jobId: string;
    winnerId: string;
    loserId: string;
}

export function useEASAttestation() {
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

    const createAttestation = async (data: AttestationData) => {
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
            throw error;
        }
    };

    return { createAttestation };
}

// Example usage:
/*
function MyComponent() {
    const { signer } = useWallet(); // or however you get your signer
    const { createAttestation } = useEASAttestation(signer);

    const handleAttestation = async () => {
        try {
            const attestationUID = await createAttestation({
                jobId: "job123",
                winnerId: "winner456",
                loserId: "loser789"
            });
            console.log("New attestation UID:", attestationUID);
        } catch (error) {
            console.error("Failed to create attestation:", error);
        }
    };

    return (
        <button onClick={handleAttestation}>
            Create Attestation
        </button>
    );
}
*/ 