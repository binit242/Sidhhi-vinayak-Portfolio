import { useEffect, useState, useCallback } from 'react';
import { enquiryAdminApi, Enquiry, PageResponse } from '../../api/client';
import { ChevronLeft, ChevronRight, Clock, Mail, Phone, StickyNote } from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
  NEW: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  READ: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
  REPLIED: 'bg-green-500/15 text-green-400 border-green-500/30',
  ARCHIVED: 'bg-slate-600/15 text-slate-500 border-slate-600/30',
};

const formatDate = (value?: string) => {
  if (!value) return '';
  return new Date(value).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function AdminEnquiries() {
  const [data, setData] = useState<PageResponse<Enquiry> | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    enquiryAdminApi
      .getAll(page, 15, filter || undefined)
      .then((r) => setData(r.data.data))
      .finally(() => setLoading(false));
  }, [page, filter]);

  useEffect(() => {
    load();
  }, [load]);

  const enquiries = data?.content || [];
  const totalPages = data?.totalPages || 0;
  const totalElements = data?.totalElements || 0;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-white">Enquiries</h1>
          <p className="text-slate-400 text-sm mt-1">{totalElements} total enquiries</p>
        </div>
        <select
          value={filter}
          onChange={(e) => {
            setPage(0);
            setFilter(e.target.value);
          }}
          className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition"
        >
          <option value="">All Status</option>
          <option value="NEW">New</option>
          <option value="READ">Read</option>
          <option value="REPLIED">Replied</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="divide-y divide-slate-800">
            {enquiries.length === 0 && (
              <p className="text-slate-500 text-sm text-center py-12">No enquiries found</p>
            )}
            {enquiries.map((enquiry) => (
              <div key={enquiry.id} className="p-4 hover:bg-slate-800/40 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-semibold text-white">{enquiry.fullName}</h2>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${STATUS_COLORS[enquiry.status] || STATUS_COLORS.NEW}`}>
                        {enquiry.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 mt-2">
                      {enquiry.email && (
                        <span className="inline-flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5" /> {enquiry.email}
                        </span>
                      )}
                      {enquiry.phone && (
                        <span className="inline-flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5" /> {enquiry.phone}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {formatDate(enquiry.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                {(enquiry.subject || enquiry.message) && (
                  <div className="mt-3 flex gap-2 text-sm text-slate-300">
                    <StickyNote className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                    <p className="leading-relaxed">
                      {enquiry.subject && <span className="font-medium text-slate-200">{enquiry.subject}: </span>}
                      {enquiry.message}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-800">
            <p className="text-xs text-slate-500">
              Page {totalPages === 0 ? 0 : page + 1} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={totalPages === 0 || page >= totalPages - 1}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
