"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BriefcaseBusiness,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

import { routes } from "@/config/routes";
import { useAuth } from "@/context/AuthContext";

export function CompanyHeader() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { user, logout } = useAuth();

  const navigation = [
    {
      label: "Dashboard",
      href: routes.company.dashboard,
      icon: <LayoutDashboard size={18} />,
    },
    {
      label: "Jobs",
      href: routes.company.jobs.all,
      icon: <BriefcaseBusiness size={18} />,
    },
  ];

  const isActive = (href: string) => {
    if (href === routes.company.dashboard) {
      return pathname === href;
    }

    return pathname.startsWith(href);
  };

  /*
   * Generate initials from the logged-in user's name.
   * Example:
   * "Smart Company" -> "SC"
   */
  const getInitials = (name?: string) => {
    if (!name?.trim()) {
      return "CO";
    }

    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  };

  const companyName = user?.fullName || "Smart Company";
  const initials = getInitials(companyName);

  /*
   * Logout pattern copied from the working Navbar:
   *
   * 1. Close menus
   * 2. Clear auth state/storage
   * 3. Redirect to login
   */
  const handleLogout = () => {
    setProfileOpen(false);
    setMobileOpen(false);

    logout();

    window.location.href = routes.auth.login;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            LOGO
        ===================================================== */}

        <Link
          href={routes.company.dashboard}
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white">
            <BriefcaseBusiness size={19} />
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-bold text-slate-950">
              Smart Job Portal
            </p>

            <p className="text-[11px] text-slate-500">
              Company Portal
            </p>
          </div>
        </Link>

        {/* =====================================================
            DESKTOP NAVIGATION
        ===================================================== */}

        <nav className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-2
                rounded-xl
                px-4
                py-2.5
                text-sm
                font-semibold
                transition
                ${
                  isActive(item.href)
                    ? "bg-slate-950 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }
              `}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* =====================================================
            RIGHT SIDE
        ===================================================== */}

        <div className="flex items-center gap-2">

          {/* Profile */}

          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setProfileOpen((value) => !value)}
              className="flex items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-slate-100"
              aria-expanded={profileOpen}
              aria-haspopup="menu"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
                {initials}
              </div>

              <div className="hidden text-left lg:block">
                <p className="max-w-32 truncate text-sm font-semibold text-slate-900">
                  {companyName}
                </p>

                <p className="text-xs text-slate-500">
                  Company
                </p>
              </div>

              <ChevronDown
                size={16}
                className={`text-slate-500 transition-transform ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}

            {profileOpen && (
              <div
                className="absolute right-0 top-12 z-50 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"
                role="menu"
              >
                <Link
                  href={routes.company.profile.view}
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  role="menuitem"
                >
                  <User size={17} />
                  Company Profile
                </Link>

                <div className="my-1 border-t border-slate-100" />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  role="menuitem"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile button */}

          <button
            type="button"
            onClick={() => {
              setMobileOpen((value) => !value);
              setProfileOpen(false);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 transition hover:bg-slate-100 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
          </button>
        </div>
      </div>

      {/* =====================================================
          MOBILE NAVIGATION
      ===================================================== */}

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">

            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  ${
                    isActive(item.href)
                      ? "bg-slate-950 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }
                `}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}

            <div className="mt-2 border-t border-slate-200 pt-2">

              {/* Mobile Profile */}

              <Link
                href={routes.company.profile.view}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                <User size={18} />
                Profile
              </Link>

              {/* Mobile Logout */}

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}