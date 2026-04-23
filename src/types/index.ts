import type {
  User,
  Generation,
  MankenTemplate,
  TokenTransaction,
  TokenPackage,
} from "@prisma/client";

export type { User, Generation, MankenTemplate, TokenTransaction, TokenPackage };

export type SafeUser = Omit<User, "password" | "apiKey"> & {
  password?: never;
  apiKey?: never;
};

export type GenerationWithTemplate = Generation & {
  template: MankenTemplate;
};

export type GenerationWithUser = Generation & {
  user: SafeUser;
  template: MankenTemplate;
};

export interface DashboardStats {
  tokenBalance: number;
  totalGenerations: number;
  monthlyGenerations: number;
  favorites: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  pages: number;
  currentPage: number;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
      photoTokens: number;
      videoTokens: number;
    };
  }

  interface User {
    role: string;
    photoTokens: number;
    videoTokens: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    photoTokens: number;
    videoTokens: number;
  }
}
