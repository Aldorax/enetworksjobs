import Link from "next/link";

export default function Success() {
  return (
    <div className="flex h-screen flex-col items-center justify-center p-10 text-center text-black">
      You have applied succesfully. We will reach out to you soon
      <Link className="rounded-md bg-gray-100 p-2" href={"/"}>
        Go back to homepage
      </Link>
    </div>
  );
}
