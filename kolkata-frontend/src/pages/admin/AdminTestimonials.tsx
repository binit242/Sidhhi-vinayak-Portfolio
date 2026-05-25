// src/pages/admin/AdminTestimonials.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { testimonialAdminApi, projectAdminApi, Testimonial, ProjectSummary } from '../../api/client';
import { Plus, Trash2, Pencil, Star, X, Check, Upload } from 'lucide-react';

const inputCls  = "w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition";
const labelCls  = "block text-xs font-medium text-slate-400 mb-1.5";

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(n => (
        <button key={n} type="button" onClick={() => onChange(n)}
          className={`w-7 h-7 transition-colors ${n <= value ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'}`}>
          <Star className="w-full h-full" fill={n <= value ? 'currentColor' : 'none'} />
        </button>
      ))}
    </div>
  );
}

type FormState = {
  clientName: string; clientTitle: string; avatarUrl: string;
  rating: number; review: string; projectId: string;
  featured: boolean; visible: boolean; displayOrder: string;
};

const emptyForm = (): FormState => ({
  clientName:'', clientTitle:'', avatarUrl:'', rating:5, review:'',
  projectId:'', featured:false, visible:true, displayOrder:'0',
});

export default function AdminTestimonials() {
  const [items,    setItems]    = useState<Testimonial[]>([]);
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId,   setEditId]   = useState<number|null>(null);
  const [form,     setForm]     = useState<FormState>(emptyForm());
  const [uploading,setUploading]= useState(false);

  const load = useCallback(() => {
    Promise.all([
      testimonialAdminApi.getAll(),
      projectAdminApi.getAll(),
    ]).then(([t, p]) => {
      setItems(t.data.data);
      setProjects(p.data.data);
    }).finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const openNew = () => { setForm(emptyForm()); setEditId(null); setShowForm(true); };
  const openEdit = (t: Testimonial) => {
    setForm({
      clientName: t.clientName, clientTitle: t.clientTitle||'',
      avatarUrl: t.avatarUrl||'', rating: t.rating, review: t.review,
      projectId: String(t.projectId||''), featured: t.featured,
      visible: t.visible, displayOrder: String(t.displayOrder),
    });
    setEditId(t.id); setShowForm(true);
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const r = await testimonialAdminApi.uploadAvatar(file);
      setForm(f => ({ ...f, avatarUrl: r.data.data }));
    } finally { setUploading(false); }
  };

  const handleSave = async () => {
    const payload = {
      ...form,
      rating: Number(form.rating),
      projectId: form.projectId ? Number(form.projectId) : null,
      displayOrder: Number(form.displayOrder),
    };
    if (editId) {
      await testimonialAdminApi.update(editId, payload);
    } else {
      await testimonialAdminApi.create(payload);
    }
    setShowForm(false); load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this testimonial?')) return;
    await testimonialAdminApi.delete(id); load();
  };

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Testimonials</h1>
          <p className="text-slate-400 text-sm mt-1">{items.length} testimonials</p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors">
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">{editId ? 'Edit Testimonial' : 'New Testimonial'}</h3>
            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5"/></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Client Name *</label>
              <input value={form.clientName} onChange={e=>setForm(f=>({...f,clientName:e.target.value}))} className={inputCls} placeholder="Rajesh Kumar" />
            </div>
            <div>
              <label className={labelCls}>Title / Designation</label>
              <input value={form.clientTitle} onChange={e=>setForm(f=>({...f,clientTitle:e.target.value}))} className={inputCls} placeholder="IT Professional, TCS" />
            </div>
            <div>
              <label className={labelCls}>Avatar URL</label>
              <div className="flex gap-2">
                <input value={form.avatarUrl} onChange={e=>setForm(f=>({...f,avatarUrl:e.target.value}))} className={inputCls} placeholder="https://…" />
                <label className="shrink-0 flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-slate-300 text-sm px-3 rounded-xl cursor-pointer transition-colors">
                  <Upload className="w-4 h-4" />
                  {uploading ? '…' : 'Upload'}
                  <input type="file" accept="image/*" className="hidden" onChange={e=>e.target.files?.[0]&&handleUpload(e.target.files[0])} />
                </label>
              </div>
            </div>
            <div>
              <label className={labelCls}>Linked Project (optional)</label>
              <select value={form.projectId} onChange={e=>setForm(f=>({...f,projectId:e.target.value}))} className={`${inputCls} appearance-none`}>
                <option value="">None</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className={labelCls}>Review *</label>
              <textarea value={form.review} onChange={e=>setForm(f=>({...f,review:e.target.value}))}
                rows={3} className={`${inputCls} resize-none`} placeholder="Client's review…" />
            </div>
            <div>
              <label className={labelCls}>Rating</label>
              <StarRating value={form.rating} onChange={v=>setForm(f=>({...f,rating:v}))} />
            </div>
            <div>
              <label className={labelCls}>Display Order</label>
              <input type="number" value={form.displayOrder} onChange={e=>setForm(f=>({...f,displayOrder:e.target.value}))} className={inputCls} />
            </div>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={e=>setForm(f=>({...f,featured:e.target.checked}))} className="w-4 h-4 rounded accent-amber-500" />
                <span className="text-sm text-slate-300">Featured</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.visible} onChange={e=>setForm(f=>({...f,visible:e.target.checked}))} className="w-4 h-4 rounded accent-amber-500" />
                <span className="text-sm text-slate-300">Visible</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={()=>setShowForm(false)} className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors">Cancel</button>
            <button onClick={handleSave} disabled={!form.clientName||!form.review}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-900 font-semibold px-5 py-2 rounded-xl text-sm transition-colors">
              <Check className="w-4 h-4"/> {editId ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12"><div className="w-7 h-7 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"/></div>
      ) : (
        <div className="grid gap-4">
          {items.map(t => (
            <div key={t.id} className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-700 overflow-hidden shrink-0 border-2 border-slate-600">
                  {t.avatarUrl
                    ? <img src={t.avatarUrl} alt="" className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold text-lg">
                        {t.clientName[0]}
                      </div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-white">{t.clientName}</span>
                    {t.featured && <span className="text-xs bg-amber-500/15 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full">Featured</span>}
                    {!t.visible && <span className="text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full">Hidden</span>}
                  </div>
                  <p className="text-slate-400 text-sm">{t.clientTitle}</p>
                  <div className="flex gap-0.5 my-1.5">
                    {[1,2,3,4,5].map(n => (
                      <Star key={n} className={`w-3.5 h-3.5 ${n<=t.rating?'text-amber-400':'text-slate-700'}`}
                        fill={n<=t.rating?'currentColor':'none'} />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed line-clamp-2">{t.review}</p>
                  {t.projectName && (
                    <p className="text-xs text-slate-500 mt-1.5">Project: {t.projectName}</p>
                  )}
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={()=>openEdit(t)} className="p-2 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"><Pencil className="w-4 h-4"/></button>
                  <button onClick={()=>handleDelete(t.id)} className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 className="w-4 h-4"/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
