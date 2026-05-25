// src/pages/admin/AdminStats.tsx
import React, { useEffect, useState } from 'react';
import { statsApi, SiteStat } from '../../api/client';
import { Plus, Trash2, Save, BarChart3, Pencil, X, Check } from 'lucide-react';

export default function AdminStats() {
  const [stats,   setStats]   = useState<SiteStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId,  setEditId]  = useState<number|null>(null);
  const [editForm,setEditForm]= useState<Partial<SiteStat>>({});
  const [newForm, setNewForm] = useState({ statKey:'', statLabel:'', statValue:'', displayOrder:0, visible:true });
  const [showNew, setShowNew] = useState(false);

  const load = () => statsApi.getAll().then(r => setStats(r.data.data)).finally(()=>setLoading(false));
  useEffect(() => { load(); }, []);

  const saveNew = async () => {
    await statsApi.create(newForm);
    setNewForm({ statKey:'', statLabel:'', statValue:'', displayOrder:0, visible:true });
    setShowNew(false); load();
  };
  const saveEdit = async (id: number) => {
    await statsApi.update(id, editForm);
    setEditId(null); load();
  };
  const del = async (id: number) => {
    if (!confirm('Delete this stat?')) return;
    await statsApi.delete(id); load();
  };

  const inputCls = "bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition w-full";

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Site Statistics</h1>
          <p className="text-slate-400 text-sm mt-1">Numbers displayed on the home page</p>
        </div>
        <button onClick={() => setShowNew(!showNew)}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors">
          <Plus className="w-4 h-4" /> Add Stat
        </button>
      </div>

      {/* Add new form */}
      {showNew && (
        <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-5 space-y-3">
          <h3 className="text-sm font-semibold text-amber-400">New Statistic</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Key (unique)</label>
              <input value={newForm.statKey} onChange={e=>setNewForm(f=>({...f,statKey:e.target.value}))}
                className={inputCls} placeholder="projects_completed" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Label</label>
              <input value={newForm.statLabel} onChange={e=>setNewForm(f=>({...f,statLabel:e.target.value}))}
                className={inputCls} placeholder="Projects Completed" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Value</label>
              <input value={newForm.statValue} onChange={e=>setNewForm(f=>({...f,statValue:e.target.value}))}
                className={inputCls} placeholder="150+" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Display Order</label>
              <input type="number" value={newForm.displayOrder}
                onChange={e=>setNewForm(f=>({...f,displayOrder:Number(e.target.value)}))}
                className={inputCls} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={newForm.visible}
                onChange={e=>setNewForm(f=>({...f,visible:e.target.checked}))}
                className="w-4 h-4 rounded accent-amber-500" />
              <span className="text-sm text-slate-300">Visible on site</span>
            </label>
            <div className="flex gap-2">
              <button onClick={()=>setShowNew(false)}
                className="px-3 py-2 text-sm text-slate-400 hover:text-white transition-colors">Cancel</button>
              <button onClick={saveNew} disabled={!newForm.statKey||!newForm.statLabel||!newForm.statValue}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-900 font-semibold px-4 py-2 rounded-xl text-sm transition-colors">
                <Save className="w-4 h-4" /> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-7 h-7 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          {stats.map(s => (
            <div key={s.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              {editId === s.id ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-400 mb-1 block">Label</label>
                      <input value={editForm.statLabel||''} onChange={e=>setEditForm(f=>({...f,statLabel:e.target.value}))} className={inputCls} />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 mb-1 block">Value</label>
                      <input value={editForm.statValue||''} onChange={e=>setEditForm(f=>({...f,statValue:e.target.value}))} className={inputCls} />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 mb-1 block">Display Order</label>
                      <input type="number" value={editForm.displayOrder||0} onChange={e=>setEditForm(f=>({...f,displayOrder:Number(e.target.value)}))} className={inputCls} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={editForm.visible} onChange={e=>setEditForm(f=>({...f,visible:e.target.checked}))} className="w-4 h-4 rounded accent-amber-500" />
                      <span className="text-sm text-slate-300">Visible</span>
                    </label>
                    <div className="flex gap-2">
                      <button onClick={()=>setEditId(null)} className="p-2 text-slate-400 hover:text-white transition-colors"><X className="w-4 h-4"/></button>
                      <button onClick={()=>saveEdit(s.id)} className="flex items-center gap-1 bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1.5 rounded-lg text-sm hover:bg-green-500/30 transition-colors"><Check className="w-4 h-4"/> Save</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-white">{s.statValue}</span>
                      {!s.visible && <span className="text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full">Hidden</span>}
                    </div>
                    <p className="text-slate-400 text-sm">{s.statLabel}</p>
                    <p className="text-slate-600 text-xs mt-0.5">key: {s.statKey} · order: {s.displayOrder}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={()=>{ setEditId(s.id); setEditForm({...s}); }}
                      className="p-2 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={()=>del(s.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
