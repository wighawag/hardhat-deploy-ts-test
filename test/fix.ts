import { BuidlerRuntimeEnvironment } from "@nomiclabs/buidler/types";
import bre from "@nomiclabs/buidler";

function fixProvider(env: BuidlerRuntimeEnvironment) {
    // alow it to be used by ethers without any change
    const provider = env.ethereum as any;
    if (provider.sendAsync === undefined) {
        provider.sendAsync = (
        req: {
            id: number;
            jsonrpc: string;
            method: string;
            params: any[];
        },
        callback: (error: any, result: any) => void
        ) => {
        provider
            .send(req.method, req.params)
            .then((result: any) =>
            callback(null, { result, id: req.id, jsonrpc: req.jsonrpc })
            )
            .catch((error: any) => callback(error, null));
        };
    }
}

fixProvider(bre);
