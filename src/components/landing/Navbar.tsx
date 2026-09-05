"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  UserCircle,
  Users,
  X,
} from "lucide-react";

import {
  companyNavigation,
  jobSeekerNavigation,
  publicNavigation,
} from "@/config/navigation";
import { routes } from "@/config/routes";
import { USER_ROLES } from "@/constants/roles";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isActiveRoute = (href: string) => {
    if (!href) return false;

    if (href === routes.home) {
      return pathname === routes.home;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMenus = () => {
    setMobileOpen(false);
    setProfileOpen(false);
  };

  const handleLogout = () => {
    closeMenus();
    logout();
    window.location.href = routes.auth.login;
  };

  const getNavigationIcon = (label: string) => {
    switch (label) {
      case "Dashboard":
        return <LayoutDashboard size={17} />;

      case "Find Jobs":
        return <BriefcaseBusiness size={17} />;

      case "Companies":
        return <Building2 size={17} />;

      case "My Profile":
      case "Company Profile":
        return <UserCircle size={17} />;

      case "My Applications":
      case "Applications":
        return <FileText size={17} />;

      case "Jobs":
        return <BriefcaseBusiness size={17} />;

      default:
        return <Users size={17} />;
    }
  };

  /*
   * Keep the loading markup completely static.
   *
   * This prevents className/DOM differences during hydration.
   */
  if (loading) {
    return (
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 animate-pulse rounded-xl bg-slate-200" />

            <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
          </div>

          <div className="h-9 w-24 animate-pulse rounded-lg bg-slate-200" />
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LOGO */}

        <Link
          href={routes.home}
          onClick={closeMenus}
          className="flex shrink-0 items-center gap-2.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white">
            <BriefcaseBusiness size={20} />
          </div>

          <span className="text-[17px] font-bold tracking-tight text-slate-950">
            Smart Job Portal
          </span>
        </Link>

        {/* DESKTOP PUBLIC NAVIGATION */}

        <nav className="hidden items-center gap-1 md:flex">
          {publicNavigation.map((item) => {
            const active = isActiveRoute(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-lg px-3.5 py-2 text-sm transition-all ${
                  active
                    ? "font-semibold text-slate-950"
                    : "font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                {item.label}

                <span
                  className={`absolute bottom-0.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-slate-950 transition-all ${
                    active ? "w-5 opacity-100" : "w-0 opacity-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* RIGHT SIDE */}

        <div className="flex items-center gap-2">
          {/* GUEST */}

          {!user ? (
            <>
              <Link
                href={routes.auth.login}
                className="hidden rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 sm:block"
              >
                Login
              </Link>

              <Link
                href={routes.auth.register}
                className="hidden rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 sm:block"
              >
                Register
              </Link>
            </>
          ) : (
            /* DESKTOP PROFILE */

            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setProfileOpen((previous) => !previous)}
                className="flex items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-slate-100"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-white">
                  <User size={17} />
                </div>

                <div className="hidden text-left lg:block">
                  <p className="max-w-32 truncate text-sm font-semibold text-slate-950">
                    {user.fullName}
                  </p>

                  <p className="text-[11px] font-medium text-slate-500">
                    {user.role === USER_ROLES.JOB_SEEKER
                      ? "Job Seeker"
                      : user.role === USER_ROLES.COMPANY
                        ? "Company"
                        : user.role}
                  </p>
                </div>

                <ChevronDown
                  size={16}
                  className={`text-slate-500 transition ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* PROFILE DROPDOWN */}

              {profileOpen && (
                <div className="absolute right-0 top-12 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                  <div className="border-b border-slate-100 px-4 py-3">
                    <p className="truncate text-sm font-bold text-slate-950">
                      {user.fullName}
                    </p>

                    <p className="mt-1 truncate text-xs text-slate-500">
                      {user.email}
                    </p>
                  </div>

                  {/* JOB SEEKER */}

                  {user.role === USER_ROLES.JOB_SEEKER &&
                    jobSeekerNavigation
                      .filter(
                        (item) =>
                          item.label === "My Profile" ||
                          item.label === "My Applications",
                      )
                      .map((item) => {
                        const active = isActiveRoute(item.href);

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setProfileOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 text-sm transition ${
                              active
                                ? "bg-slate-100 font-semibold text-slate-950"
                                : "font-medium text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            {getNavigationIcon(item.label)}
                            {item.label}
                          </Link>
                        );
                      })}

                  {/* COMPANY */}

                  {user.role === USER_ROLES.COMPANY &&
                    companyNavigation
                      .filter(
                        (item) =>
                          item.label === "Dashboard" ||
                          item.label === "Company Profile",
                      )
                      .map((item) => {
                        const active = isActiveRoute(item.href);

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setProfileOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 text-sm transition ${
                              active
                                ? "bg-slate-100 font-semibold text-slate-950"
                                : "font-medium text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            {getNavigationIcon(item.label)}
                            {item.label}
                          </Link>
                        );
                      })}

                  {/* LOGOUT */}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 border-t border-slate-100 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* MOBILE BUTTON */}

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 md:hidden"
            onClick={() => setMobileOpen((previous) => !previous)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            {/* PUBLIC NAVIGATION */}

            <nav className="flex flex-col">
              {publicNavigation.map((item) => {
                const active = isActiveRoute(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between rounded-lg px-3 py-3 text-sm transition ${
                      active
                        ? "bg-slate-100 font-semibold text-slate-950"
                        : "font-medium text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>{item.label}</span>

                    {active && (
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-950" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* AUTH / USER */}

            <div className="mt-3 border-t border-slate-100 pt-3">
              {!user ? (
                <div className="grid gap-2">
                  <Link
                    href={routes.auth.login}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Login
                  </Link>

                  <Link
                    href={routes.register.jobseeker}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg bg-slate-950 px-3 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div>
                  {/* USER INFO */}

                  <div className="mb-3 rounded-xl bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-white">
                        <User size={17} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-950">
                          {user.fullName}
                        </p>

                        <p className="truncate text-xs text-slate-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* JOB SEEKER */}

                  {user.role === USER_ROLES.JOB_SEEKER && (
                    <div className="flex flex-col">
                      {jobSeekerNavigation.map((item) => {
                        const active = isActiveRoute(item.href);

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center justify-between rounded-lg px-3 py-3 text-sm transition ${
                              active
                                ? "bg-slate-100 font-semibold text-slate-950"
                                : "font-medium text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              {getNavigationIcon(item.label)}
                              {item.label}
                            </span>

                            {active && (
                              <span className="h-1.5 w-1.5 rounded-full bg-slate-950" />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  {/* COMPANY */}

                  {user.role === USER_ROLES.COMPANY && (
                    <div className="flex flex-col">
                      {companyNavigation.map((item) => {
                        const active = isActiveRoute(item.href);

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center justify-between rounded-lg px-3 py-3 text-sm transition ${
                              active
                                ? "bg-slate-100 font-semibold text-slate-950"
                                : "font-medium text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              {getNavigationIcon(item.label)}
                              {item.label}
                            </span>

                            {active && (
                              <span className="h-1.5 w-1.5 rounded-full bg-slate-950" />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  {/* LOGOUT */}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-2 flex w-full items-center gap-3 rounded-lg border-t border-slate-100 px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;