'use client'

import { useState } from 'react'
import { RiArrowDownSLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

export function StickyHeader() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                { label: 'Classic Tours', href: '#' },
                { label: 'Cultural Tours', href: '#' },
                { label: 'Luxury Tours', href: '#' },
                { label: 'Eco Tours', href: '#' }
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
    ];

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#009ee2] shadow-md">
                <div className="container mx-auto px-4">
                    <div className="flex items-center h-16 justify-between md:justify-center">
                        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
                            {menuItems.map((item) => (
                                <div
                                    key={item.label}
                                    className="relative group"
                                    onMouseEnter={() =>
                                        item.submenu && setOpenDropdown(item.label)
                                    }
                                    onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    <button className="text-white text-sm font-semibold px-3 py-2 flex items-center gap-1 hover:bg-[#0088c4] rounded transition-colors">
                                        {item.label}
                                        {item.submenu && (
                                            <RiArrowDownSLine
                                                size={16}
                                                className={`transition-transform ${openDropdown === item.label ? "rotate-180" : ""
                                                    }`}
                                            />
                                        )}
                                    </button>

                                    {item.submenu && (
                                        <div className="absolute left-0 mt-0 w-48 bg-white text-gray-800 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                                            {item.submenu.map((subitem) => (
                                                <a
                                                    key={item.label + "-" + subitem.label}
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

                        <div className="hidden md:flex items-center gap-2 bg-white rounded-full px-4 py-1.5 w-56">
                            <input
                                type="text"
                                placeholder="Search for group and private tours"
                                className="bg-transparent text-gray-800 text-sm outline-none w-full"
                            />
                            <button className="text-[#009ee2] hover:text-[#007bb4]">
                                <CiSearch size={20} />
                            </button>
                        </div>

                        <div className="md:hidden flex gap-4">
                            <button className="text-white">
                                <CiSearch size={24} />
                            </button>
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="text-white"
                            >
                                {mobileMenuOpen ? (
                                    <RiCloseLine size={24} />
                                ) : (
                                    <RiMenu3Line size={24} />
                                )}
                            </button>
                        </div>
                    </div>

                    {mobileMenuOpen && (
                        <div className="md:hidden">
                            <div className="py-2">
                                {menuItems.map((item) => (
                                    <div key={item.label}>
                                        <button
                                            onClick={() =>
                                                setOpenDropdown(
                                                    openDropdown === item.label ? null : item.label
                                                )
                                            }
                                            className="w-full text-left text-white text-sm font-semibold px-4 py-2 hover:bg-[#007bb4] flex items-center justify-between transition-colors"
                                        >
                                            {item.label}
                                            {item.submenu && (
                                                <RiArrowDownSLine
                                                    size={16}
                                                    className={`transition-transform ${openDropdown === item.label ? "rotate-180" : ""
                                                        }`}
                                                />
                                            )}
                                        </button>

                                        {item.submenu && openDropdown === item.label && (
                                            <div className="bg-[#007bb4] pl-4">
                                                {item.submenu.map((subitem) => (
                                                    <a
                                                        key={item.label + "-" + subitem.label}
                                                        href={subitem.href}
                                                        className="block px-4 py-2 text-sm text-blue-100 hover:text-white"
                                                    >
                                                        {subitem.label}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-1.5 m-4">
                                <input
                                    type="text"
                                    placeholder="Search tours"
                                    className="bg-transparent text-gray-800 text-sm outline-none w-full"
                                />
                                <button className="text-[#009ee2] hover:text-[#007bb4]">
                                    <CiSearch size={20} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </header>
        </>
    );
}

