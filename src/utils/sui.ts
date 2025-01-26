import { SuiClient } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';

const suiClient = new SuiClient({ url: "https://fullnode.testnet.sui.io" });

const SUI_PACKAGE_ID = "0x39a35a631800dcc6f69d44ad985eb8b7cca5f2a74fb2fd555ec54ac77540ff60"; // Adresa contractului IBTToken pe Sui

export const burnIBTToken = async (signer: any, amount: number) => {
  try {
    const tx = new TransactionBlock();

    // Set gas budget
    tx.setGasBudget(10000000);

    // Call the `burn` function on the IBTToken contract
    tx.moveCall({
      target: `${SUI_PACKAGE_ID}::ibt_token::burn`,
      arguments: [tx.pure(amount.toString())],
    });

    // Execute the transaction
    const result = await suiClient.signAndExecuteTransactionBlock({
      signer,
      transactionBlock: tx,
    });

    console.log(`🔥 Burned ${amount} IBT on Sui`);
    return result;
  } catch (error) {
    console.error("Error burning IBTToken:", error);
    throw error;
  }
};

export const mintIBTToken = async (signer: any, recipient: string, amount: number) => {
  try {
    const tx = new TransactionBlock();

    // Set gas budget
    tx.setGasBudget(10000000);

    // Call the `mint` function on the IBTToken contract
    tx.moveCall({
      target: `${SUI_PACKAGE_ID}::ibt_token::mint`,
      arguments: [tx.pure(recipient), tx.pure(amount.toString())],
    });

    // Execute the transaction
    const result = await suiClient.signAndExecuteTransactionBlock({
      signer,
      transactionBlock: tx,
    });

    console.log(`✅ Minted ${amount} IBT on Sui`);
    return result;
  } catch (error) {
    console.error("Error minting IBTToken:", error);
    throw error;
  }
};

export const getSuiBalance = async (address: string): Promise<number> => {
    const suiClient = new SuiClient({ url: "https://fullnode.testnet.sui.io" });
    const balance = await suiClient.getBalance({ owner: address });
    return Number(balance.totalBalance) / 1e9; // Convert from MIST to SUI (1 SUI = 1e9 MIST)
  };