import type {
  Session as NextAuthSession,
  User as NextAuthUser,
} from "next-auth";
import type { JWT as NextAuthJWT } from "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
    id: UserId;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | null;
    image?: string | null;
    theme?: string;
  }
}

declare module "next-auth" {
  interface Session extends NextAuthSession {
    user: NextAuthUser & {
      id: UserId;
      name?: string | null;
      email?: string | null;
      emailVerified?: Date | null;
      image?: string | null;
      theme?: string;
    };
  }
}
