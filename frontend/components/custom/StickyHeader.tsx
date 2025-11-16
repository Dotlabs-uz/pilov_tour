'use client'

import { useState } from 'react'
import { RiArrowDownSLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";

export function StickyHeader() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)

    const menuItems = [
        {
            label: 'DESTINATIONS',
            submenu: [
                { label: 'SilkRoad', href: '#' },
                { label: 'Uzbekistan', href: '#' },
                { label: 'Kazakhstan', href: '#' },
                { label: 'Tajikistan', href: '#' }
            ]
        },
        {
            label: 'PRIVATE TOURS',
            submenu: [
                { label: 'Tours', href: '#' },
                { label: 'Tours +', href: '#' },
                { label: 'Tours +', href: '#' },
                { label: 'Tours +', href: '#' }
            ]
        },
        {
            label: 'GROUP PACKAGES',
            submenu: [
                { label: 'Group = Private', href: '#' },
                { label: 'Package 2', href: '#' },
                { label: 'Package 3', href: '#' }
            ]
        },
        { label: 'TESTIMONIALS', href: '#' },
        { label: 'PUBLICATIONS', href: '#' }
    ]

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#1B8DBF] to-[#1B8DBF] shadow-md">
                <div className="container mx-auto px-4">
                    <div className="flex items-center h-16">
                        <nav className="flex items-center gap-1 flex-1 justify-center">
                            {menuItems.map((item) => (
                                <div
                                    key={item.label}
                                    className="relative group"
                                    onMouseEnter={() =>
                                        item.submenu && setOpenDropdown(item.label)
                                    }
                                    onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    <button className="text-white text-sm font-semibold px-3 py-2 flex items-center gap-1 hover:bg-blue-600 rounded transition-colors">
                                        {item.label}
                                        {item.submenu && (
                                            <RiArrowDownSLine
                                                size={16}
                                                className={`transition-transform ${openDropdown === item.label ? 'rotate-180' : ''
                                                    }`}
                                            />
                                        )}
                                    </button>

                                    {item.submenu && (
                                        <div className="absolute left-0 mt-0 w-48 bg-white text-gray-800 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                                            {item.submenu.map((subitem, index) => (
                                                <a
                                                    key={item.label + '-' + index}
                                                    href={subitem.href}
                                                    className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                                                >
                                                    {subitem.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>

                        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-1.5 w-56">
                            <input
                                type="text"
                                placeholder="Search for group and private tours"
                                className="bg-transparent text-gray-800 text-sm outline-none w-full"
                            />
                            <button className="text-blue-500 hover:text-blue-600">
                                <CiSearch size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="h-16" />
        </>
    )
}
