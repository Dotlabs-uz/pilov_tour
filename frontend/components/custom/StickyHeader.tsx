"use client";

import { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { useTranslations } from "next-intl";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { AiOutlineGlobal } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { langs } from "@/lib/langs";

export function StickyHeader() {
    const t = useTranslations("header");
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();
    function handleChange(lang: string): void {
        document.cookie = `locale=${lang}; path=/`;
        router.refresh();
    }

    const menuItems = [
        {
            label: t("destinations"),
            submenu: [
                { label: t("destinations_silkroad"), href: "#" },
                { label: t("destinations_uzbekistan"), href: "#" },
                { label: t("destinations_kazakhstan"), href: "#" },
                { label: t("destinations_tajikistan"), href: "#" },
            ],
        },
        {
            label: t("private_tours"),
            submenu: [
                { label: t("private_tours_classic"), href: "#" },
                { label: t("private_tours_cultural"), href: "#" },
                { label: t("private_tours_luxury"), href: "#" },
                { label: t("private_tours_eco"), href: "#" },
            ],
        },
        {
            label: t("group_packages"),
            submenu: [
                { label: t("group_packages_equal"), href: "#" },
                { label: t("group_packages_2"), href: "#" },
                { label: t("group_packages_3"), href: "#" },
            ],
        },
        { label: t("testimonials"), href: "#" },
        { label: t("publications"), href: "#" },
    ];

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#8DD3BB] shadow-md px-4 lg:px-0">
                <div className="container max-w-[1200px] mx-auto">
                    <div className="flex items-center h-16 justify-between gap-5 md:justify-center">
                        <p
                            onClick={() => router.push("/")}
                            className="text-2xl cursor-pointer flex font-bold"
                        >
                            Pilav
                            <span className="text-white">
                                Tour <u>Agency</u>
                            </span>
                        </p>
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
                                    <button className="text-white text-sm font-semibold px-3 py-2 flex items-center gap-1 hover:bg-[#137d58] rounded transition-colors">
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
                                placeholder={t("search_placeholder")}
                                className="bg-transparent text-gray-800 text-sm outline-none w-full"
                            />
                            <button className="text-[#8DD3BB] hover:text-[#8DD3BB]">
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

                        <div className="flex items-center gap-4 text-white">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer">
                                    <AiOutlineGlobal size={24} />
                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                    className="bg-white text-black shadow-lg rounded-md w-15 px-2 py-2"
                                >
                                    {langs.map(({ lang }, i) => (
                                        <DropdownMenuItem
                                            key={i}
                                            className="cursor-pointer hover:bg-gray-100 rounded-md px-2 py-2"
                                            onClick={() => handleChange(lang.toLowerCase())}
                                        >
                                            {lang}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
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
                                            className="w-full text-left text-white text-sm font-semibold px-4 py-2 hover:bg-[#8DD3BB] flex items-center justify-between transition-colors"
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
                                            <div className="bg-[#8DD3BB] pl-4">
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
                                    placeholder={t("search_placeholder")}
                                    className="bg-transparent text-gray-800 text-sm outline-none w-full"
                                />
                                <button className="text-[#8DD3BB] hover:text-[#8DD3BB]">
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
