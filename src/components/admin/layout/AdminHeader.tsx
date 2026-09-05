
"use client";

import {
  Building2,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  Users,
} from "lucide-react";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import { routes } from "@/config/routes";
import { useAuth } from "@/context/AuthContext";

export function AdminHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const { logout } = useAuth();

  const handleLogout = () => {
    /*
     * Clear:
     * - access token
     * - refresh token
     * - user
     * - accessToken cookie
     * - role cookie
     */
    logout();

    /*
     * Replace instead of push so
     * browser Back does not return
     * to the admin dashboard.
     */
    router.replace(
      routes.auth.adminLogin,
    );
  };

  const navItems = [
    {
      label: "Dashboard",
      href: routes.admin.dashboard,
      icon: LayoutDashboard,
    },
    {
      label: "Companies",
      href: routes.admin.companies.all,
      icon: Building2,
    },
    {
      label: "Users",
      href: routes.admin.users.all,
      icon: Users,
    },
  ];

  const isNavItemActive = (
    href: string,
  ) => {
    /*
     * Dashboard should only be active
     * on exactly /dashboard/admin.
     */
    if (
      href ===
      routes.admin.dashboard
    ) {
      return pathname === href;
    }

    /*
     * Companies:
     * /dashboard/admin/companies
     * /dashboard/admin/companies/1
     *
     * Users:
     * /dashboard/admin/users
     * /dashboard/admin/users/1
     */
    return (
      pathname === href ||
      pathname.startsWith(
        `${href}/`,
      )
    );
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            LOGO
        ====================================================== */}
        <button
          type="button"
          onClick={() =>
            router.push(
              routes.admin.dashboard,
            )
          }
          className="flex shrink-0 items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-white">
            <ShieldCheck size={18} />
          </div>

          <div className="text-left">
            <p className="text-sm font-bold text-slate-950">
              Smart Job Portal
            </p>

            <p className="text-xs text-slate-400">
              Admin Portal
            </p>
          </div>
        </button>

        {/* =====================================================
            DESKTOP NAVIGATION
        ====================================================== */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map(
            (item) => {
              const Icon =
                item.icon;

              const isActive =
                isNavItemActive(
                  item.href,
                );

              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() =>
                    router.push(
                      item.href,
                    )
                  }
                  className={[
                    "inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium transition",
                    isActive
                      ? "bg-slate-950 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                  ].join(" ")}
                >
                  <Icon size={16} />

                  {item.label}
                </button>
              );
            },
          )}
        </nav>

        {/* =====================================================
            LOGOUT
        ====================================================== */}
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 text-sm font-semibold text-red-700 transition hover:bg-red-100"
        >
          <LogOut size={16} />

          <span className="hidden sm:inline">
            Logout
          </span>
        </button>
      </div>

      {/* =======================================================
          MOBILE NAVIGATION
      ======================================================== */}
      <div className="border-t border-slate-100 md:hidden">
        <nav className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
          {navItems.map(
            (item) => {
              const Icon =
                item.icon;

              const isActive =
                isNavItemActive(
                  item.href,
                );

              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() =>
                    router.push(
                      item.href,
                    )
                  }
                  className={[
                    "inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-slate-950 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                  ].join(" ")}
                >
                  <Icon size={16} />

                  {item.label}
                </button>
              );
            },
          )}
        </nav>
      </div>
    </header>
  );
}