import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for SPENGU Staking Dashboard
  app.get('/api/staking/stats', (req, res) => {
    // In a real application, this would fetch staking statistics from a database
    // or interact with a blockchain contract
    res.json({
      totalStaked: 4500,
      nftsStaked: 12,
      dailyYield: 37,
      apr: 8.2,
      claimableRewards: 112
    });
  });

  // Handler for mock wallet balances
  app.get('/api/wallet/balance/:address', (req, res) => {
    const { address } = req.params;
    
    if (!address) {
      return res.status(400).json({ 
        error: 'Wallet address is required' 
      });
    }

    res.json({
      sol: 2.45,
      spengu: 14250
    });
  });

  // Handler for mock staked NFTs
  app.get('/api/staking/nfts/:address', (req, res) => {
    const { address } = req.params;
    
    if (!address) {
      return res.status(400).json({ 
        error: 'Wallet address is required' 
      });
    }

    res.json([
      { id: '432', name: 'SPENGU #432', dailyReward: 3.5 },
      { id: '156', name: 'SPENGU #156', dailyReward: 3.2 },
      { id: '298', name: 'SPENGU #298', dailyReward: 2.8 },
      { id: '512', name: 'SPENGU #512', dailyReward: 3.1 }
    ]);
  });

  const httpServer = createServer(app);

  return httpServer;
}
