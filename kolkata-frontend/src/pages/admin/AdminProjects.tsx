// src/pages/admin/AdminProjects.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { projectAdminApi, ProjectSummary } from '../../api/client';
import {
  Plus, Pencil, Trash2, Eye, EyeOff, Star, StarOff,
  Search, Building2, Filter
} from 'lucide-react';

const STATUS_BADGE: Record<string, string> = {
  UPCOMING:  'bg-blue-500/15 text-blue-400 border-blue-500/30',
  ONGOING:   'bg-amber-500/15 text-amber-400 border-amber-500/30',
  COMPLETED: 'bg-green-500/15 text-green-400 border-green-500/30',
  SOLD_OUT:  'bg-red-500/15 text-red-400 border-red-500/30',
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [loading, setLoading]   = useState(true);
  const [search,  setSearch]    = useState('');
  const [filter,  setFilter]    = useState('');

  const load = useCallback(() => {
    setLoading(true);
    projectAdminApi.getAll()
      .then(r => setProjects(r.data.data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Delete project "${name}"? This cannot be undone.`)) return;
    await projectAdminApi.delete(id);
    load();
  };

  const filtered = projects.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = !filter || p.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-slate-400 text-sm mt-1">{projects.length} total projects</p>
        </div>
        <Link to="/admin/projects/new"
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors">
          <Plus className="w-4 h-4" /> Add Project
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search projects…"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition" />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <select value={filter} onChange={e => setFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition appearance-none">
            <option value="">All Status</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="ONGOING">Ongoing</option>
            <option value="COMPLETED">Completed</option>
            <option value="SOLD_OUT">Sold Out</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-left">
                <th className="px-4 py-3.5 text-xs font-medium text-slate-400 uppercase tracking-wider">Project</th>
                <th className="px-4 py-3.5 text-xs font-medium text-slate-400 uppercase tracking-wider hidden md:table-cell">Location</th>
                <th className="px-4 py-3.5 text-xs font-medium text-slate-400 uppercase tracking-wider hidden lg:table-cell">Status</th>
                <th className="px-4 py-3.5 text-xs font-medium text-slate-400 uppercase tracking-wider hidden lg:table-cell">Photos</th>
                <th className="px-4 py-3.5 text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="text-center py-12 text-slate-500">No projects found</td></tr>
              )}
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 overflow-hidden">
                        {p.heroImageUrl
                          ? <img src={p.heroImageUrl} alt="" className="w-full h-full object-cover" />
                          : <Building2 className="w-5 h-5 text-slate-500" />}
                      </div>
                      <div>
                        <p className="font-medium text-white">{p.name}</p>
                        <p className="text-xs text-slate-500">{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-slate-400 hidden md:table-cell">{p.location}</td>
                  <td className="px-4 py-3.5 hidden lg:table-cell">
                    <span className={`text-xs px-2 py-1 rounded-full border ${STATUS_BADGE[p.status]}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-400 hidden lg:table-cell">{p.photoCount}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1">
                      <Link to={`/admin/projects/${p.id}`}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 transition-colors" title="Edit">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDelete(p.id, p.name)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
