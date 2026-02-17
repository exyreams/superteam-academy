// Certificate data structures and mock data

export interface Certificate {
  id: string;
  certificateNo: string;
  courseName: string;
  courseDescription: string;
  recipient: string;
  walletAddress: string;
  issueDate: string;
  validator: string;
  onChain: {
    assetType: string;
    mintAddress: string;
    owner: string;
    metadataUri: string;
    status: 'verified' | 'pending';
    signature: string;
  };
  mastery: {
    finalScore: number;
    maxScore: number;
    xpEarned: number;
    rankAchieved: number;
  };
}

// Mock certificate data
export const mockCertificates: Record<string, Certificate> = {
  'rust-fundamentals': {
    id: 'rust-fundamentals',
    certificateNo: 'STA-RF-2024-0892',
    courseName: 'RUST FUNDAMENTALS',
    courseDescription: 'Demonstrated proficiency in Ownership, Structs, PDAs, and Memory Management.',
    recipient: 'OPERATOR_0xKD...92A',
    walletAddress: '0xKD...92A',
    issueDate: 'OCTOBER 24, 2024',
    validator: 'SUPERTEAM PROTOCOL',
    onChain: {
      assetType: 'Compressed NFT',
      mintAddress: '7xK9...p4Lm',
      owner: '0xKD...92A',
      metadataUri: 'arweave.net/k2...j9',
      status: 'verified',
      signature: '4z9fR...kP2m...Lq88...vXy1...92bN...wQzP...7mRt...zZ5p',
    },
    mastery: {
      finalScore: 98,
      maxScore: 100,
      xpEarned: 2500,
      rankAchieved: 10,
    },
  },
  'solana-basics': {
    id: 'solana-basics',
    certificateNo: 'STA-SB-2024-0893',
    courseName: 'SOLANA BASICS',
    courseDescription: 'Demonstrated proficiency in Accounts, Transactions, Programs, and Network Architecture.',
    recipient: 'OPERATOR_0xKD...92A',
    walletAddress: '0xKD...92A',
    issueDate: 'NOVEMBER 15, 2024',
    validator: 'SUPERTEAM PROTOCOL',
    onChain: {
      assetType: 'Compressed NFT',
      mintAddress: '8yL2...q5Nn',
      owner: '0xKD...92A',
      metadataUri: 'arweave.net/m3...k8',
      status: 'verified',
      signature: '5a8gS...nQ3n...Mr99...wYz2...83cO...xRaQ...8nSu...aA6q',
    },
    mastery: {
      finalScore: 95,
      maxScore: 100,
      xpEarned: 2200,
      rankAchieved: 9,
    },
  },
  'anchor-framework': {
    id: 'anchor-framework',
    certificateNo: 'STA-AF-2024-0894',
    courseName: 'ANCHOR FRAMEWORK',
    courseDescription: 'Demonstrated proficiency in Program Development, Account Constraints, and Cross-Program Invocations.',
    recipient: 'OPERATOR_0xKD...92A',
    walletAddress: '0xKD...92A',
    issueDate: 'DECEMBER 03, 2024',
    validator: 'SUPERTEAM PROTOCOL',
    onChain: {
      assetType: 'Compressed NFT',
      mintAddress: '9zM3...r6Oo',
      owner: '0xKD...92A',
      metadataUri: 'arweave.net/n4...l9',
      status: 'verified',
      signature: '6b9hT...oR4o...Ns00...xZa3...94dP...yScR...9oTv...bB7r',
    },
    mastery: {
      finalScore: 92,
      maxScore: 100,
      xpEarned: 3000,
      rankAchieved: 11,
    },
  },
};

// Helper function
export function getCertificateById(id: string): Certificate | null {
  return mockCertificates[id] || null;
}
