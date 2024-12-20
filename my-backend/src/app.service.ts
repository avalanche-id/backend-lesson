import { Injectable } from '@nestjs/common';
import * as tokenJson from "./assets/abis/my-token.abi.json";
import { createPublicClient, http } from 'viem';
import { avalancheFuji } from 'viem/chains'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! Dunia saya! Belajar online bootcamp di Avalanche Indonesia';
  }

  sendMessage({ message }: { message: string }): string {
    return message;
  }

  getContractAddress(): string {
    return '0x0c287Eb6d20bE3073Bd6aC80B32f37728f7d7bEc';
  }

  async getTokenName() {
    const publicClient = createPublicClient({
      chain: avalancheFuji,
      transport: http('https://rpc.ankr.com/avalanche_fuji'),
    });

    const name = await publicClient.readContract({
      address: this.getContractAddress() as `0x${string}`,
      abi: tokenJson,
      functionName: "name"
    });

    return name;
  }

  async getBlockNumber() {
    const publicClient = createPublicClient({
      chain: avalancheFuji,
      transport: http('https://rpc.ankr.com/avalanche_fuji'),
    });

    const blockNumber = await publicClient.getBlockNumber()

    return blockNumber.toString();
  }
}
