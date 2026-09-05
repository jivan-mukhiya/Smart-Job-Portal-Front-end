export function AdminFooter() {
return ( <footer className="border-t border-slate-200 bg-white"> <div className="mx-auto flex min-h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"> <p className="text-xs text-slate-400">
© {new Date().getFullYear()} Smart Job Portal </p>

    <p className="text-xs text-slate-400">
      Admin access only
    </p>
  </div>
</footer>

);
}
