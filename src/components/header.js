import React, { useContext, useState } from 'react';

import Link from 'next/link';
import { useMemberContext } from '../contexts/member-provider';

const Header = () => {
    const { member } = useMemberContext();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-gray-800 text-white p-2 md:p-4">
            <div className="container mx-auto flex flex-row justify-between items-center">
                <div className="flex items-center">
                    <Link href="/">
                        <img src="/finance-app.webp" alt="Logo" className="h-12 md:h-16 w-auto" />
                    </Link>
                    <div className="md:hidden ml-2 relative">
                        <button
                            className="text-white focus:outline-none"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                ></path>
                            </svg>
                        </button>
                        {menuOpen && (
                            <nav className="absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded shadow-lg">
                                <ul className="flex flex-col space-y-2 p-2">
                                    <li>
                                        <Link href="/register/expense" className="block p-2 hover:bg-gray-700 rounded">
                                            <span className="hover:underline">Expense</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/register/category" className="block p-2 hover:bg-gray-700 rounded">
                                            <span className="hover:underline">Category</span>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        )}
                    <nav className="hidden md:flex items-center space-x-4 ml-4">
                        <Link href="/register/expense" className="block p-1 md:p-2 hover:bg-gray-700 rounded">
                            <span className="hover:underline">Expense</span>
                        </Link>
                        <Link href="/register/category" className="block p-1 md:p-2 hover:bg-gray-700 rounded">
                            <span className="hover:underline">Category</span>
                        </Link>
                    </nav>
                    </div>
                </div>
                <div className="flex items-center">
                    {member && (
                        <nav className="hidden md:flex items-center space-x-4">
                            <Link href="/register/expense" className="block p-1 md:p-2 hover:bg-gray-700 rounded">
                                <span className="hover:underline">Expense</span>
                            </Link>
                            <Link href="/register/category" className="block p-1 md:p-2 hover:bg-gray-700 rounded">
                                <span className="hover:underline">Category</span>
                            </Link>
                        </nav>
                    )}
                    {member && <h2 className="text-lg md:text-xl text-white ml-4">{member.name}</h2>}
                </div>
            </div>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: '#4CAF50',
        padding: '10px 20px',
        textAlign: 'center',
    },
    title: {
        color: 'white',
        margin: 0,
    },
};

export default Header;