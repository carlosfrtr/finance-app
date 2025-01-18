import React, { useContext } from 'react';

import Link from 'next/link';
import { useMemberContext } from '../contexts/member-provider';

const Header = () => {
    const { member } = useMemberContext();

    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
            <Link href="/">
                <img src="/finance-app.webp" alt="Logo" className="h-20 w-auto" />
            </Link>
            {member && (
                <nav>
                <ul className="flex space-x-4">
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