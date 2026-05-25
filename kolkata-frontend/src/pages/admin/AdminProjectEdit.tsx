// src/pages/admin/AdminProjectEdit.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAssetUrl, projectAdminApi, ProjectDetail } from '../../api/client';
import {
  Save, ArrowLeft, Plus, Trash2, Upload, Image, Sparkles,
  MapPin, Building2, Info, Camera, Star, Wrench, Navigation
} from 'lucide-react';

// ---------- Small reusable components ----------

function SectionCard({ title, icon: Icon, children }: {
  title: string; icon: React.ElementType; children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-800">
        <Icon className="w-4 h-4 text-amber-400" />
        <h2 className="font-semibold text-white text-sm">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition";
const selectCls = `${inputCls} appearance-none`;

// ---------- Main Component ----------

export default function AdminProjectEdit() {
  const { id }   = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew    = !id || id === 'new';

  const [saving,   setSaving]   = useState(false);
  const [loading,  setLoading]  = useState(!isNew);
  const [project,  setProject]  = useState<ProjectDetail | null>(null);
  const [tab,      setTab]      = useState<'basic'|'photos'|'amenities'|'facilities'|'local'|'specs'>('basic');
  const [success,  setSuccess]  = useState('');
  const [error,    setError]    = useState('');
  const [uploading, setUploading] = useState(false);

  // Basic form state
  const [form, setForm] = useState({
    name:'', slug:'', tagline:'', description:'', location:'', city:'',
    state:'', pincode:'', status:'ONGOING', propertyType:'RESIDENTIAL',
    totalUnits:'', availableUnits:'', priceMin:'', priceMax:'', priceUnit:'per unit',
    areaMin:'', areaMax:'', possessionDate:'', reraNumber:'', developerName:'',
    websiteUrl:'', mapLatitude:'', mapLongitude:'',
    featured:false, visible:true, displayOrder:'0',
  });

  // Child entity edit state
  const [newPhoto,  setNewPhoto]  = useState({ url:'', caption:'', photoType:'GALLERY', displayOrder:'0' });
  const [newAmenity,setNewAmenity]= useState({ name:'', icon:'', category:'', description:'', displayOrder:'0' });
  const [newFacility,setNewFacility]=useState({ name:'', icon:'', value:'', description:'', displayOrder:'0' });
  const [newLocal,  setNewLocal]  = useState({ category:'OTHER', name:'', distance:'', description:'', displayOrder:'0' });
  const [newSpec,   setNewSpec]   = useState({
    unitType:'', carpetArea:'', builtUpArea:'', superArea:'',
    floorCount:'', bathrooms:'', balconies:'', parking:'', price:'', description:'', displayOrder:'0'
  });

  const load = useCallback(() => {
    if (isNew) return;
    setLoading(true);
    setError('');
    projectAdminApi.getById(Number(id))
      .then(r => {
        const p = {
          ...r.data.data,
          photos: r.data.data.photos || [],
          amenities: r.data.data.amenities || [],
          facilities: r.data.data.facilities || [],
          localInfos: r.data.data.localInfos || [],
          specifications: r.data.data.specifications || [],
        };
        setProject(p);
        setForm({
          name: p.name, slug: p.slug, tagline: p.tagline||'', description: p.description||'',
          location: p.location||'', city: p.city||'', state: p.state||'', pincode: p.pincode||'',
          status: p.status, propertyType: p.propertyType,
          totalUnits: String(p.totalUnits||''), availableUnits: String(p.availableUnits||''),
          priceMin: p.priceMin||'', priceMax: p.priceMax||'', priceUnit: p.priceUnit||'per unit',
          areaMin: p.areaMin||'', areaMax: p.areaMax||'',
          possessionDate: p.possessionDate||'', reraNumber: p.reraNumber||'',
          developerName: p.developerName||'', websiteUrl: p.websiteUrl||'',
          mapLatitude: p.mapLatitude||'', mapLongitude: p.mapLongitude||'',
          featured: p.featured, visible: p.visible, displayOrder: String(p.displayOrder),
        });
      })
      .catch((e: any) => {
        setError(e.response?.data?.message || 'Could not load project details');
      })
      .finally(() => setLoading(false));
  }, [id, isNew]);

  useEffect(() => { load(); }, [load]);

  const saveBasic = async () => {
    setSaving(true); setError(''); setSuccess('');
    try {
      const payload = {
        ...form,
        slug: form.slug.trim() || null,
        totalUnits: form.totalUnits ? Number(form.totalUnits) : null,
        availableUnits: form.availableUnits ? Number(form.availableUnits) : null,
        priceMin: form.priceMin ? Number(form.priceMin) : null,
        priceMax: form.priceMax ? Number(form.priceMax) : null,
        areaMin: form.areaMin ? Number(form.areaMin) : null,
        areaMax: form.areaMax ? Number(form.areaMax) : null,
        possessionDate: form.possessionDate || null,
        mapLatitude: form.mapLatitude ? Number(form.mapLatitude) : null,
        mapLongitude: form.mapLongitude ? Number(form.mapLongitude) : null,
        displayOrder: Number(form.displayOrder),
      };
      if (isNew) {
        const r = await projectAdminApi.create(payload);
        setSuccess('Project created!');
        navigate(`/admin/projects/${r.data.data.id}`);
      } else {
        await projectAdminApi.update(Number(id), payload);
        setSuccess('Saved!'); load();
      }
    } catch (e: any) {
      setError(e.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!project) return;
    setUploading(true);
    setError('');
    try {
      const r = await projectAdminApi.uploadImage(project.id, file);
      setNewPhoto(prev => ({ ...prev, url: r.data.data }));
    } catch (e: any) {
      setError(e.response?.data?.message || 'Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  // Helpers for adding child items
  const addPhoto = async () => {
    if (!project) return;
    try {
      await projectAdminApi.addPhoto(project.id, { ...newPhoto, displayOrder: Number(newPhoto.displayOrder) });
      setNewPhoto({ url:'', caption:'', photoType:'GALLERY', displayOrder:'0' });
      load();
    } catch (e: any) {
      setError(e.response?.data?.message || 'Could not add photo');
    }
  };

  const addAmenity = async () => {
    if (!project) return;
    try {
      await projectAdminApi.addAmenity(project.id, { ...newAmenity, displayOrder: Number(newAmenity.displayOrder) });
      setNewAmenity({ name:'', icon:'', category:'', description:'', displayOrder:'0' });
      load();
    } catch (e: any) {
      setError(e.response?.data?.message || 'Could not add amenity');
    }
  };

  const addFacility = async () => {
    if (!project) return;
    try {
      await projectAdminApi.addFacility(project.id, { ...newFacility, displayOrder: Number(newFacility.displayOrder) });
      setNewFacility({ name:'', icon:'', value:'', description:'', displayOrder:'0' });
      load();
    } catch (e: any) {
      setError(e.response?.data?.message || 'Could not add facility');
    }
  };

  const addLocal = async () => {
    if (!project) return;
    try {
      await projectAdminApi.addLocalInfo(project.id, { ...newLocal, displayOrder: Number(newLocal.displayOrder) });
      setNewLocal({ category:'OTHER', name:'', distance:'', description:'', displayOrder:'0' });
      load();
    } catch (e: any) {
      setError(e.response?.data?.message || 'Could not add nearby place');
    }
  };

  const addSpec = async () => {
    if (!project) return;
    const payload = { ...newSpec,
      carpetArea: newSpec.carpetArea || null, builtUpArea: newSpec.builtUpArea || null,
      superArea: newSpec.superArea || null, floorCount: newSpec.floorCount ? Number(newSpec.floorCount) : null,
      bathrooms: newSpec.bathrooms ? Number(newSpec.bathrooms) : null,
      balconies: newSpec.balconies ? Number(newSpec.balconies) : null,
      parking: newSpec.parking ? Number(newSpec.parking) : null,
      price: newSpec.price || null, displayOrder: Number(newSpec.displayOrder),
    };
    try {
      await projectAdminApi.addSpec(project.id, payload);
      setNewSpec({ unitType:'', carpetArea:'', builtUpArea:'', superArea:'', floorCount:'', bathrooms:'', balconies:'', parking:'', price:'', description:'', displayOrder:'0' });
      load();
    } catch (e: any) {
      setError(e.response?.data?.message || 'Could not add specification');
    }
  };

  const TABS = [
    { key: 'basic',     label: 'Basic Info',      icon: Info },
    { key: 'photos',    label: 'Photos',           icon: Camera },
    { key: 'amenities', label: 'Amenities',        icon: Star },
    { key: 'facilities',label: 'Facilities',       icon: Wrench },
    { key: 'local',     label: 'Nearby Places',    icon: Navigation },
    { key: 'specs',     label: 'Specifications',   icon: Building2 },
  ] as const;

  const activeTab = TABS.find((item) => item.key === tab);

  if (loading) return (
    <div className="flex justify-center py-16">
      <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-5 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/admin/projects')}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">{isNew ? 'New Project' : form.name}</h1>
          <p className="text-slate-400 text-sm">{isNew ? 'Create a new project' : `ID: ${id}`}</p>
        </div>
      </div>

      {success && (
        <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm rounded-xl px-4 py-3">{success}</div>
      )}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">{error}</div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1 overflow-x-auto">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setTab(key as any)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap
              ${tab === key ? 'bg-amber-500/15 text-amber-400' : 'text-slate-400 hover:text-white'}`}>
            <Icon className="w-3.5 h-3.5" /> {label}
          </button>
        ))}
      </div>

      {isNew && tab !== 'basic' && activeTab && (
        <SectionCard title={activeTab.label} icon={activeTab.icon}>
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-4">
            <p className="text-sm font-medium text-amber-300">Save basic details first</p>
            <p className="text-sm text-slate-300 mt-1">
              Photos, amenities, nearby places, facilities, and specifications can be added after the project is created.
            </p>
            <button
              onClick={() => setTab('basic')}
              className="mt-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-4 py-2 rounded-xl text-sm transition-colors"
            >
              Go to Basic Info
            </button>
          </div>
        </SectionCard>
      )}

      {/* Tab: Basic Info */}
      {tab === 'basic' && (
        <SectionCard title="Project Details" icon={Info}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Project Name *">
              <input value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} className={inputCls} placeholder="e.g. Prestige Park Row" />
            </Field>
            <Field label="URL Slug (auto-generated if blank)">
              <input value={form.slug} onChange={e => setForm(f=>({...f,slug:e.target.value}))} className={inputCls} placeholder="prestige-park-row" />
            </Field>
            <Field label="Tagline">
              <input value={form.tagline} onChange={e => setForm(f=>({...f,tagline:e.target.value}))} className={inputCls} placeholder="Short tagline" />
            </Field>
            <Field label="Developer Name">
              <input value={form.developerName} onChange={e => setForm(f=>({...f,developerName:e.target.value}))} className={inputCls} placeholder="e.g. Prestige Group" />
            </Field>
            <div className="md:col-span-2">
              <Field label="Description">
                <textarea value={form.description} onChange={e => setForm(f=>({...f,description:e.target.value}))}
                  rows={4} className={`${inputCls} resize-none`} placeholder="Full project description…" />
              </Field>
            </div>
            <Field label="Status *">
              <select value={form.status} onChange={e => setForm(f=>({...f,status:e.target.value}))} className={selectCls}>
                <option value="UPCOMING">Upcoming</option>
                <option value="ONGOING">Ongoing</option>
                <option value="COMPLETED">Completed</option>
                <option value="SOLD_OUT">Sold Out</option>
              </select>
            </Field>
            <Field label="Property Type *">
              <select value={form.propertyType} onChange={e => setForm(f=>({...f,propertyType:e.target.value}))} className={selectCls}>
                <option value="RESIDENTIAL">Residential</option>
                <option value="COMMERCIAL">Commercial</option>
                <option value="MIXED">Mixed</option>
                <option value="VILLA">Villa</option>
                <option value="APARTMENT">Apartment</option>
                <option value="PLOT">Plot</option>
              </select>
            </Field>
            <Field label="Location / Area">
              <input value={form.location} onChange={e => setForm(f=>({...f,location:e.target.value}))} className={inputCls} placeholder="e.g. New Town, Action Area II" />
            </Field>
            <Field label="City">
              <input value={form.city} onChange={e => setForm(f=>({...f,city:e.target.value}))} className={inputCls} placeholder="Kolkata" />
            </Field>
            <Field label="State">
              <input value={form.state} onChange={e => setForm(f=>({...f,state:e.target.value}))} className={inputCls} placeholder="West Bengal" />
            </Field>
            <Field label="PIN Code">
              <input value={form.pincode} onChange={e => setForm(f=>({...f,pincode:e.target.value}))} className={inputCls} placeholder="700156" />
            </Field>
            <Field label="Total Units">
              <input type="number" value={form.totalUnits} onChange={e => setForm(f=>({...f,totalUnits:e.target.value}))} className={inputCls} />
            </Field>
            <Field label="Available Units">
              <input type="number" value={form.availableUnits} onChange={e => setForm(f=>({...f,availableUnits:e.target.value}))} className={inputCls} />
            </Field>
            <Field label="Min Price (₹)">
              <input type="number" value={form.priceMin} onChange={e => setForm(f=>({...f,priceMin:e.target.value}))} className={inputCls} placeholder="e.g. 4500000" />
            </Field>
            <Field label="Max Price (₹)">
              <input type="number" value={form.priceMax} onChange={e => setForm(f=>({...f,priceMax:e.target.value}))} className={inputCls} placeholder="e.g. 9500000" />
            </Field>
            <Field label="Price Unit">
              <input value={form.priceUnit} onChange={e => setForm(f=>({...f,priceUnit:e.target.value}))} className={inputCls} placeholder="per unit / per sq ft" />
            </Field>
            <Field label="Min Area (sq ft)">
              <input type="number" value={form.areaMin} onChange={e => setForm(f=>({...f,areaMin:e.target.value}))} className={inputCls} />
            </Field>
            <Field label="Max Area (sq ft)">
              <input type="number" value={form.areaMax} onChange={e => setForm(f=>({...f,areaMax:e.target.value}))} className={inputCls} />
            </Field>
            <Field label="Possession Date">
              <input type="date" value={form.possessionDate} onChange={e => setForm(f=>({...f,possessionDate:e.target.value}))} className={inputCls} />
            </Field>
            <Field label="RERA Number">
              <input value={form.reraNumber} onChange={e => setForm(f=>({...f,reraNumber:e.target.value}))} className={inputCls} />
            </Field>
            <Field label="Website URL">
              <input value={form.websiteUrl} onChange={e => setForm(f=>({...f,websiteUrl:e.target.value}))} className={inputCls} placeholder="https://" />
            </Field>
            <Field label="Map Latitude">
              <input type="number" step="any" value={form.mapLatitude} onChange={e => setForm(f=>({...f,mapLatitude:e.target.value}))} className={inputCls} />
            </Field>
            <Field label="Map Longitude">
              <input type="number" step="any" value={form.mapLongitude} onChange={e => setForm(f=>({...f,mapLongitude:e.target.value}))} className={inputCls} />
            </Field>
            <Field label="Display Order">
              <input type="number" value={form.displayOrder} onChange={e => setForm(f=>({...f,displayOrder:e.target.value}))} className={inputCls} />
            </Field>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={e => setForm(f=>({...f,featured:e.target.checked}))}
                  className="w-4 h-4 rounded accent-amber-500" />
                <span className="text-sm text-slate-300">Featured</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.visible} onChange={e => setForm(f=>({...f,visible:e.target.checked}))}
                  className="w-4 h-4 rounded accent-amber-500" />
                <span className="text-sm text-slate-300">Visible</span>
              </label>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button onClick={saveBasic} disabled={saving}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-900 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
              <Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save Project'}
            </button>
          </div>
        </SectionCard>
      )}

      {/* Tab: Photos */}
      {tab === 'photos' && project && (
        <SectionCard title="Project Photos" icon={Camera}>
          {/* Upload button */}
          <div className="mb-6">
            <label className="flex items-center gap-2 w-fit bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 text-sm px-4 py-2.5 rounded-xl cursor-pointer transition-colors">
              <Upload className="w-4 h-4" />
              {uploading ? 'Uploading…' : 'Upload Image'}
              <input type="file" accept="image/*" className="hidden"
                onChange={e => e.target.files?.[0] && handleImageUpload(e.target.files[0])} />
            </label>
            {newPhoto.url && (
              <p className="text-xs text-green-400 mt-2 break-all">✓ {newPhoto.url}</p>
            )}
          </div>

          {/* Add photo form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-slate-800/50 rounded-xl mb-5">
            <Field label="Image URL">
              <input value={newPhoto.url} onChange={e => setNewPhoto(p=>({...p,url:e.target.value}))} className={inputCls} placeholder="https://... or upload above" />
            </Field>
            <Field label="Caption">
              <input value={newPhoto.caption} onChange={e => setNewPhoto(p=>({...p,caption:e.target.value}))} className={inputCls} />
            </Field>
            <Field label="Type">
              <select value={newPhoto.photoType} onChange={e => setNewPhoto(p=>({...p,photoType:e.target.value}))} className={selectCls}>
                {['HERO','GALLERY','FLOOR_PLAN','AMENITY','LOCATION_MAP','BROCHURE'].map(t=>
                  <option key={t} value={t}>{t.replace('_',' ')}</option>)}
              </select>
            </Field>
            <Field label="Order">
              <input type="number" value={newPhoto.displayOrder} onChange={e => setNewPhoto(p=>({...p,displayOrder:e.target.value}))} className={inputCls} />
            </Field>
            <div className="md:col-span-2 flex justify-end">
              <button onClick={addPhoto} disabled={!newPhoto.url}
                className="flex items-center gap-2 bg-amber-500/90 hover:bg-amber-500 disabled:opacity-40 text-slate-900 font-semibold px-4 py-2 rounded-xl text-sm transition-colors">
                <Plus className="w-4 h-4" /> Add Photo
              </button>
            </div>
          </div>

          {/* Existing photos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {project.photos.map(ph => (
              <div key={ph.id} className="relative group rounded-xl overflow-hidden bg-slate-800 border border-slate-700">
                <img src={getAssetUrl(ph.url)} alt={ph.caption||''} className="w-full aspect-video object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={async () => { await projectAdminApi.deletePhoto(ph.id); load(); }}
                    className="p-2 bg-red-500/80 rounded-lg text-white hover:bg-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="px-2 py-1.5">
                  <p className="text-xs text-slate-400 truncate">{ph.caption || ph.photoType}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Tab: Amenities */}
      {tab === 'amenities' && project && (
        <SectionCard title="Amenities" icon={Star}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-slate-800/50 rounded-xl mb-5">
            <Field label="Name *"><input value={newAmenity.name} onChange={e=>setNewAmenity(a=>({...a,name:e.target.value}))} className={inputCls} placeholder="Swimming Pool" /></Field>
            <Field label="Icon (Lucide name)"><input value={newAmenity.icon} onChange={e=>setNewAmenity(a=>({...a,icon:e.target.value}))} className={inputCls} placeholder="waves" /></Field>
            <Field label="Category"><input value={newAmenity.category} onChange={e=>setNewAmenity(a=>({...a,category:e.target.value}))} className={inputCls} placeholder="Sports / Health / Lifestyle" /></Field>
            <Field label="Description"><input value={newAmenity.description} onChange={e=>setNewAmenity(a=>({...a,description:e.target.value}))} className={inputCls} /></Field>
            <div className="md:col-span-2 flex justify-end">
              <button onClick={addAmenity} disabled={!newAmenity.name}
                className="flex items-center gap-2 bg-amber-500/90 hover:bg-amber-500 disabled:opacity-40 text-slate-900 font-semibold px-4 py-2 rounded-xl text-sm transition-colors">
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {project.amenities.map(a => (
              <div key={a.id} className="flex items-center gap-3 px-4 py-3 bg-slate-800 rounded-xl">
                <span className="text-slate-400 text-xs font-mono w-16">{a.icon}</span>
                <div className="flex-1">
                  <span className="text-white text-sm font-medium">{a.name}</span>
                  {a.category && <span className="ml-2 text-xs text-slate-400">{a.category}</span>}
                </div>
                <button onClick={async () => { await projectAdminApi.deleteAmenity(a.id); load(); }}
                  className="text-slate-500 hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Tab: Facilities */}
      {tab === 'facilities' && project && (
        <SectionCard title="Facilities" icon={Wrench}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-slate-800/50 rounded-xl mb-5">
            <Field label="Name *"><input value={newFacility.name} onChange={e=>setNewFacility(f=>({...f,name:e.target.value}))} className={inputCls} placeholder="24x7 Security" /></Field>
            <Field label="Value"><input value={newFacility.value} onChange={e=>setNewFacility(f=>({...f,value:e.target.value}))} className={inputCls} placeholder="24x7 / Available / Yes" /></Field>
            <Field label="Icon"><input value={newFacility.icon} onChange={e=>setNewFacility(f=>({...f,icon:e.target.value}))} className={inputCls} placeholder="shield" /></Field>
            <Field label="Description"><input value={newFacility.description} onChange={e=>setNewFacility(f=>({...f,description:e.target.value}))} className={inputCls} /></Field>
            <div className="md:col-span-2 flex justify-end">
              <button onClick={addFacility} disabled={!newFacility.name}
                className="flex items-center gap-2 bg-amber-500/90 hover:bg-amber-500 disabled:opacity-40 text-slate-900 font-semibold px-4 py-2 rounded-xl text-sm transition-colors">
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {project.facilities.map(f => (
              <div key={f.id} className="flex items-center gap-3 px-4 py-3 bg-slate-800 rounded-xl">
                <span className="text-amber-400 font-semibold text-sm w-24 truncate">{f.value}</span>
                <span className="flex-1 text-white text-sm">{f.name}</span>
                <button onClick={async () => { await projectAdminApi.deleteFacility(f.id); load(); }}
                  className="text-slate-500 hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Tab: Nearby Places */}
      {tab === 'local' && project && (
        <SectionCard title="Nearby Places" icon={Navigation}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-slate-800/50 rounded-xl mb-5">
            <Field label="Category">
              <select value={newLocal.category} onChange={e=>setNewLocal(l=>({...l,category:e.target.value}))} className={selectCls}>
                {['SCHOOL','HOSPITAL','MALL','METRO','AIRPORT','RAILWAY','HIGHWAY','PARK','RESTAURANT','BANK','OTHER']
                  .map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Place Name *"><input value={newLocal.name} onChange={e=>setNewLocal(l=>({...l,name:e.target.value}))} className={inputCls} placeholder="DPS New Town" /></Field>
            <Field label="Distance"><input value={newLocal.distance} onChange={e=>setNewLocal(l=>({...l,distance:e.target.value}))} className={inputCls} placeholder="1.2 km / 5 min drive" /></Field>
            <Field label="Description"><input value={newLocal.description} onChange={e=>setNewLocal(l=>({...l,description:e.target.value}))} className={inputCls} /></Field>
            <div className="md:col-span-2 flex justify-end">
              <button onClick={addLocal} disabled={!newLocal.name}
                className="flex items-center gap-2 bg-amber-500/90 hover:bg-amber-500 disabled:opacity-40 text-slate-900 font-semibold px-4 py-2 rounded-xl text-sm transition-colors">
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {project.localInfos.map(l => (
              <div key={l.id} className="flex items-center gap-3 px-4 py-3 bg-slate-800 rounded-xl">
                <span className="text-xs text-slate-400 bg-slate-700 px-2 py-0.5 rounded-full w-24 text-center truncate">{l.category}</span>
                <span className="flex-1 text-white text-sm">{l.name}</span>
                <span className="text-amber-400 text-sm">{l.distance}</span>
                <button onClick={async () => { await projectAdminApi.deleteLocalInfo(l.id); load(); }}
                  className="text-slate-500 hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Tab: Specifications */}
      {tab === 'specs' && project && (
        <SectionCard title="Floor Plans & Specifications" icon={Building2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-slate-800/50 rounded-xl mb-5">
            <Field label="Unit Type"><input value={newSpec.unitType} onChange={e=>setNewSpec(s=>({...s,unitType:e.target.value}))} className={inputCls} placeholder="2 BHK" /></Field>
            <Field label="Carpet Area (sqft)"><input type="number" value={newSpec.carpetArea} onChange={e=>setNewSpec(s=>({...s,carpetArea:e.target.value}))} className={inputCls} /></Field>
            <Field label="Built-up Area"><input type="number" value={newSpec.builtUpArea} onChange={e=>setNewSpec(s=>({...s,builtUpArea:e.target.value}))} className={inputCls} /></Field>
            <Field label="Super Area"><input type="number" value={newSpec.superArea} onChange={e=>setNewSpec(s=>({...s,superArea:e.target.value}))} className={inputCls} /></Field>
            <Field label="Floors"><input type="number" value={newSpec.floorCount} onChange={e=>setNewSpec(s=>({...s,floorCount:e.target.value}))} className={inputCls} /></Field>
            <Field label="Bathrooms"><input type="number" value={newSpec.bathrooms} onChange={e=>setNewSpec(s=>({...s,bathrooms:e.target.value}))} className={inputCls} /></Field>
            <Field label="Balconies"><input type="number" value={newSpec.balconies} onChange={e=>setNewSpec(s=>({...s,balconies:e.target.value}))} className={inputCls} /></Field>
            <Field label="Parking"><input type="number" value={newSpec.parking} onChange={e=>setNewSpec(s=>({...s,parking:e.target.value}))} className={inputCls} /></Field>
            <div className="md:col-span-2">
              <Field label="Price (₹)"><input type="number" value={newSpec.price} onChange={e=>setNewSpec(s=>({...s,price:e.target.value}))} className={inputCls} /></Field>
            </div>
            <div className="md:col-span-2">
              <Field label="Description"><input value={newSpec.description} onChange={e=>setNewSpec(s=>({...s,description:e.target.value}))} className={inputCls} /></Field>
            </div>
            <div className="md:col-span-4 flex justify-end">
              <button onClick={addSpec}
                className="flex items-center gap-2 bg-amber-500/90 hover:bg-amber-500 text-slate-900 font-semibold px-4 py-2 rounded-xl text-sm transition-colors">
                <Plus className="w-4 h-4" /> Add Spec
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-400 border-b border-slate-800">
                  <th className="pb-2">Unit</th><th className="pb-2">Carpet</th>
                  <th className="pb-2">Baths</th><th className="pb-2">Price</th><th className="pb-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {project.specifications.map(s => (
                  <tr key={s.id}>
                    <td className="py-2.5 text-white font-medium">{s.unitType}</td>
                    <td className="py-2.5 text-slate-400">{s.carpetArea} sqft</td>
                    <td className="py-2.5 text-slate-400">{s.bathrooms}</td>
                    <td className="py-2.5 text-amber-400">₹{s.price ? Number(s.price).toLocaleString('en-IN') : '—'}</td>
                    <td className="py-2.5">
                      <button onClick={async () => { await projectAdminApi.deleteSpec(s.id); load(); }}
                        className="text-slate-500 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}
    </div>
  );
}
