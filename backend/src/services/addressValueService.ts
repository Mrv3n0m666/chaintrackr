import axios from 'axios';

export const getAddressValue = async (address: string) => {
  const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
  const baseURL = 'https://api.etherscan.io/api';

  try {
    const response = await axios.get(baseURL, {
      params: {
        module: 'account',
        action: 'balance',
        address,
        tag: 'latest',
        apikey: ETHERSCAN_API_KEY,
      },
    });

    const balanceWei = response.data.result;
    const balanceEth = parseFloat(balanceWei) / 1e18;

    return {
      address,
      ethBalance: balanceEth.toFixed(6),
      tokenBalances: [],
      totalValueUSD: null, // Optional: implement with token prices later
    };
  } catch (error) {
    throw new Error('Failed to fetch balance from Etherscan');
  }
};