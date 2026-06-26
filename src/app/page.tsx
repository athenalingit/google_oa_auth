import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { SignOutButton } from "@/components/sign-out-button";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <main className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          You are signed in
        </h1>
        <div className="mt-6 flex items-center gap-4">
          {session.user?.image && (
            <Image
              src={session.user.image}
              alt=""
              width={48}
              height={48}
              className="rounded-full"
            />
          )}
          <div>
            <p className="font-medium text-zinc-900 dark:text-zinc-50">
              {session.user?.name}
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {session.user?.email}
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3">
          <SignOutButton />
          <Link
            href="/login"
            className="text-center text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
          >
            Back to login page
          </Link>
        </div>
      </main>
    </div>
  );
}
