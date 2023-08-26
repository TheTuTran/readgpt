import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import SubscribeLeaveToggle from "@/components/SubscribeLeaveToggle";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import ToFeedButton from "@/components/ToFeedButton";

const Layout = async ({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  const session = await getAuthSession();

  const subchamber = await db.subchamber.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  });

  const subscription = !session?.user
    ? undefined
    : await db.subscription.findFirst({
        where: {
          subchamber: {
            name: slug,
          },
          user: {
            id: session.user.id,
          },
        },
      });

  const isSubscribed = !!subscription;

  if (!subchamber) {
    return notFound();
  }

  const memberCount = await db.subscription.count({
    where: {
      subchamber: {
        name: slug,
      },
    },
  });

  return (
    <section className="sm:container max-w-7xl mx-auto h-full pt-12">
      <ToFeedButton />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        <ul className="flex flex-col col-span-2 space-y-6">{children}</ul>

        <section className="hidden md:block overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
          <div className="px-6 py-4">
            <p className="font-semibold py-3">About c/{subchamber.name}</p>
          </div>
          <dl className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white">
            <section className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Created</dt>
              <dd className="text-gray-700">
                <time dateTime={subchamber.createdAt.toDateString()}>
                  {format(subchamber.createdAt, "MMMM d, yyyy")}
                </time>
              </dd>
            </section>

            <section className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Members</dt>
              <dd className="text-gray-900">{memberCount}</dd>
            </section>

            {subchamber.creatorId === session?.user.id ? (
              <section className="flex justify-between gap-x-4 py-3">
                <p className="text-gray-500">You created this community</p>
              </section>
            ) : null}

            {subchamber.creatorId !== session?.user.id ? (
              <SubscribeLeaveToggle
                isSubscribed={isSubscribed}
                subchamberId={subchamber.id}
                subchamberName={subchamber.name}
              />
            ) : null}
            <Link
              className={buttonVariants({
                variant: "outline",
                className: "w-full mb-6",
              })}
              href={`c/${slug}/submit`}
            >
              Create Post
            </Link>
          </dl>
        </section>
      </div>
    </section>
  );
};

export default Layout;
