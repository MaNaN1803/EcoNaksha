import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">
        <Link href="/">EcoNaksha</Link>
      </h1>
      <div>
        <Link href="/simulation">
          <a className="mx-2 hover:underline">Simulations</a>
        </Link>
        <Link href="/dashboard">
          <a className="mx-2 hover:underline">Dashboard</a>
        </Link>
        <Link href="/login">
          <a className="mx-2 hover:underline">Login</a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
