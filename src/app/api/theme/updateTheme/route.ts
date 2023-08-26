import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

import { z } from "zod";

export async function PATCH() {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const currentUser = await db.user.findFirst({
      where: {
        id: session.user.id,
        email: session.user.email,
      },
    });

    if (currentUser?.theme === "light") {
      await db.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          theme: "dark",
        },
      });
    } else {
      await db.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          theme: "light",
        },
      });
    }

    return new Response("OK");
  } catch (error) {
    error;

    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not update theme at this time. Please try later",
      { status: 500 }
    );
  }
}
