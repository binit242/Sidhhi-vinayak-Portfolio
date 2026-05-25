// src/pages/admin/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  appointmentAdminApi,
  dashboardApi,
  DashboardSummary,
  enquiryAdminApi,
  projectAdminApi,
  testimonialAdminApi,
} from '../../api/client';
import {
  Building2, Star, MessageSquare, CalendarClock,
  TrendingUp, Eye, Sparkles, Bell, ArrowRight, Clock
} from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
  NEW:       'bg-blue-500/15 text-blue-400 border-blue-500/30',
  READ:      'bg-slate-500/15 text-slate-400 border-slate-500/30',
  REPLIED:   'bg-green-500/15 text-green-400 border-green-500/30',
  ARCHIVED:  'bg-slate-600/15 text-slate-500 border-slate-600/30',
  PENDING:   'bg-amber-500/15 text-amber-400 border-amber-500/30',
  CONFIRMED: 'bg-green-500/15 text-green-400 border-green-500/30',
  CANCELLED: 'bg-red-500/15 text-red-400 border-red-500/30',
  COMPLETED: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
};

function StatCard({ icon: Icon, label, value, sub, color, to }: {
  icon: React.ElementType; label: string; value: number | string;
  sub?: string; color: string; to?: string;
}) {
  const inner = (
    <div className={`bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition-all group`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        {to && <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />}
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-slate-400 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
    </div>
  );
  return to ? <Link to={to}>{inner}</Link> : inner;
}

export default function AdminDashboard() {
  const [data, setData]       = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const emptyPage = { content: [], totalElements: 0, totalPages: 0, number: 0, size: 0 };
    const ok = <T,>(result: PromiseSettledResult<T>, fallback: T) =>
      result.status === 'fulfilled' ? result.value : fallback;

    const loadRealCounts = async (summary?: DashboardSummary): Promise<DashboardSummary> => {
      const [projectsResult, testimonialsResult, enquiriesResult, newEnquiriesResult, appointmentsResult, pendingAppointmentsResult] = await Promise.allSettled([
        projectAdminApi.getAll(),
        testimonialAdminApi.getAll(),
        enquiryAdminApi.getAll(0, 5),
        enquiryAdminApi.getAll(0, 1, 'NEW'),
        appointmentAdminApi.getAll(0, 5),
        appointmentAdminApi.getAll(0, 1, 'PENDING'),
      ]);

      const projects = ok(projectsResult, { data: { data: [] } } as any);
      const testimonials = ok(testimonialsResult, { data: { data: [] } } as any);
      const enquiries = ok(enquiriesResult, { data: { data: emptyPage } } as any);
      const newEnquiries = ok(newEnquiriesResult, { data: { data: emptyPage } } as any);
      const appointments = ok(appointmentsResult, { data: { data: emptyPage } } as any);
      const pendingAppointments = ok(pendingAppointmentsResult, { data: { data: emptyPage } } as any);

      const projectRows = projects.data.data || [];
      const testimonialRows = testimonials.data.data || [];
      const enquiryPage = enquiries.data.data;
      const appointmentPage = appointments.data.data;

      return {
        totalProjects: projectRows.length,
        visibleProjects: projectRows.filter((p) => p.visible).length,
        featuredProjects: projectRows.filter((p) => p.featured && p.visible).length,
        totalTestimonials: testimonialRows.length,
        totalEnquiries: enquiryPage?.totalElements || 0,
        newEnquiries: newEnquiries.data.data?.totalElements || 0,
        totalAppointments: appointmentPage?.totalElements || 0,
        pendingAppointments: pendingAppointments.data.data?.totalElements || 0,
        recentEnquiries: summary?.recentEnquiries?.length ? summary.recentEnquiries : enquiryPage?.content || [],
        recentAppointments: summary?.recentAppointments?.length ? summary.recentAppointments : appointmentPage?.content || [],
      };
    };

    const load = async () => {
      try {
        const response = await dashboardApi.getSummary();
        const summary = response.data.data;
        if (!cancelled) setData(await loadRealCounts(summary));
      } catch {
        if (!cancelled) setData(await loadRealCounts());
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Overview of your real estate platform</p>
      </div>

      {/* Alert Banner */}
      {data && (data.newEnquiries > 0 || data.pendingAppointments > 0) && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl px-5 py-4 flex items-center gap-3">
          <Bell className="w-5 h-5 text-amber-400 shrink-0 animate-pulse" />
          <div className="flex-1">
            <p className="text-amber-300 font-medium text-sm">New Activity</p>
            <p className="text-amber-400/70 text-xs mt-0.5">
              {data.newEnquiries > 0 && `${data.newEnquiries} new enquir${data.newEnquiries > 1 ? 'ies' : 'y'}`}
              {data.newEnquiries > 0 && data.pendingAppointments > 0 && ' · '}
              {data.pendingAppointments > 0 && `${data.pendingAppointments} pending appointment${data.pendingAppointments > 1 ? 's' : ''}`}
            </p>
          </div>
          <Link to="/admin/enquiries"
            className="text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors">
            View all →
          </Link>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Building2}    label="Total Projects"    value={data?.totalProjects ?? 0}
          sub={`${data?.visibleProjects ?? 0} visible`}
          color="bg-blue-500/15 text-blue-400"   to="/admin/projects" />
        <StatCard icon={Sparkles}     label="Featured Projects" value={data?.featuredProjects ?? 0}
          color="bg-purple-500/15 text-purple-400" to="/admin/projects" />
        <StatCard icon={Star}         label="Testimonials"      value={data?.totalTestimonials ?? 0}
          color="bg-yellow-500/15 text-yellow-400" to="/admin/testimonials" />
        <StatCard icon={TrendingUp}   label="New Enquiries"     value={data?.newEnquiries ?? 0}
          sub="Requires attention" color="bg-red-500/15 text-red-400" to="/admin/enquiries" />
        <StatCard icon={CalendarClock} label="Pending Appts"   value={data?.pendingAppointments ?? 0}
          color="bg-amber-500/15 text-amber-400" to="/admin/appointments" />
        <StatCard icon={MessageSquare} label="Total Enquiries" value={data?.totalEnquiries ?? 0}
          color="bg-green-500/15 text-green-400" to="/admin/enquiries" />
        <StatCard icon={Eye}          label="Visible Projects"  value={data?.visibleProjects ?? 0}
          color="bg-cyan-500/15 text-cyan-400" to="/admin/projects" />
        <StatCard icon={CalendarClock} label="Total Appts"     value={data?.totalAppointments ?? 0}
          color="bg-indigo-500/15 text-indigo-400" to="/admin/appointments" />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Enquiries */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-slate-400" />
              <h2 className="font-semibold text-white text-sm">Recent Enquiries</h2>
            </div>
            <Link to="/admin/enquiries" className="text-xs text-amber-400 hover:text-amber-300">View all</Link>
          </div>
          <div className="divide-y divide-slate-800">
            {data?.recentEnquiries?.length === 0 && (
              <p className="text-slate-500 text-sm text-center py-8">No enquiries yet</p>
            )}
            {data?.recentEnquiries?.map(e => (
              <div key={e.id} className="px-5 py-3.5 hover:bg-slate-800/40 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{e.fullName}</p>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{e.subject || e.message?.slice(0, 60) + '…'}</p>
                  </div>
                  <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full border ${STATUS_COLORS[e.status]}`}>
                    {e.status}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-1.5 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  {new Date(e.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <CalendarClock className="w-4 h-4 text-slate-400" />
              <h2 className="font-semibold text-white text-sm">Recent Appointments</h2>
            </div>
            <Link to="/admin/appointments" className="text-xs text-amber-400 hover:text-amber-300">View all</Link>
          </div>
          <div className="divide-y divide-slate-800">
            {data?.recentAppointments?.length === 0 && (
              <p className="text-slate-500 text-sm text-center py-8">No appointments yet</p>
            )}
            {data?.recentAppointments?.map(a => (
              <div key={a.id} className="px-5 py-3.5 hover:bg-slate-800/40 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{a.fullName}</p>
                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {a.phone} · {a.visitType?.replace('_', ' ')}
                      {a.projectName && ` · ${a.projectName}`}
                    </p>
                  </div>
                  <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full border ${STATUS_COLORS[a.status]}`}>
                    {a.status}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-1.5 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  {a.preferredDate
                    ? `Preferred: ${new Date(a.preferredDate).toLocaleDateString('en-IN', { day:'numeric', month:'short' })}`
                    : new Date(a.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
