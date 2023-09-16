import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="flex justify-between py-6">
      <Link href="/">
        <h3 className="text-xl font-bold">Next CRUD</h3>
      </Link>
      <ul>
        <li>
          <Link
            href="/new"
            className="px-6 py-2 bg-sky-500 text-slate-200 text-base font-semibold rounded-lg hover:text-slate-100 hover:bg-sky-700"
          >
            New
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
