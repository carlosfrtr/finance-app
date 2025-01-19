import React, { useContext, useState } from 'react';

import Link from 'next/link';
import { useMemberContext } from '../contexts/member-provider';
import api from '../api';

const Header = () => {
    const { member } = useMemberContext();
    const [menuOpen, setMenuOpen] = useState(false);
    const [showGroupOptions, setShowGroupOptions] = useState(false);
    const [newGroupId, setNewGroupId] = useState('');

    const handleGroupChange = async () => {
        console.log('Updating Group ID' + JSON.stringify({ groupId: newGroupId }));
        try {
            const response = await api.patch('/members', { groupId: newGroupId });
            if (response.ok) {
                // Handle successful response
                console.log('Group ID updated successfully');
                setShowGroupOptions(false);
            } else {
                // Handle error response
                console.error('Failed to update Group ID');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

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
                    {member && 
                    <div className="flex items-center ml-4">
                        <div className="ml-4 p-2 text-right">
                            <h3 className="text-lg md:text-xl text-white">{member.name}</h3>
                            <label className="block text-sm font-semibold text-gray-400">Group ID</label>
                            <p className="block text-sm font-semibold text-gray-200 cursor-pointer" onClick={() => setShowGroupOptions(!showGroupOptions)}>{member.groupId}</p>
                            {showGroupOptions && (
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        value={newGroupId}
                                        onChange={(e) => setNewGroupId(e.target.value)}
                                        className="p-2 rounded bg-gray-700 text-white"
                                        placeholder="Enter new Group ID"
                                    />
                                    <button
                                        onClick={handleGroupChange}
                                        className="ml-2 p-2 bg-blue-500 rounded text-white"
                                    >
                                        Update
                                    </button>
                                </div>
                            )}
                        
                        </div>
                    </div>}
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