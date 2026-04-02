export default function PortalLoading() {
  return (
    <div className="p-8 w-full animate-pulse">
      <div className="h-8 bg-slate-200 rounded w-1/4 mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="h-32 bg-slate-200 rounded-lg"></div>
        <div className="h-32 bg-slate-200 rounded-lg"></div>
        <div className="h-32 bg-slate-200 rounded-lg"></div>
      </div>
      <div className="h-64 bg-slate-200 rounded-lg w-full"></div>
    </div>
  );
}
