import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">
        <Link href="/">EcoNaksha</Link>
      </h1>
      <div>
        <Link href="/simulation">
          Simulations
        </Link>
        <Link href="/dashboard">
          Dashboard
        </Link>
        <Link href="/login">
        Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
