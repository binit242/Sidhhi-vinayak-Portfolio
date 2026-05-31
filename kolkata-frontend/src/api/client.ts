import axios from "axios";

const LEGACY_RENDER_API_URL = "https://kolkata-backend.onrender.com/api";
const RENDER_API_URL = "https://sidhhi-vinayak-backend.onrender.com/api";
const configuredApiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
const API_BASE_URL =
  configuredApiUrl === LEGACY_RENDER_API_URL ? RENDER_API_URL : configuredApiUrl;
const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

// ─── Axios instance ───────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

export const getAssetUrl = (url?: string) => {
  if (!url) return "";
  if (/^https?:\/\/localhost:8080\/api\/uploads\//i.test(url)) {
    return `${API_BASE_URL}${new URL(url).pathname.replace(/^\/api/, "")}`;
  }
  if (/^https?:\/\//i.test(url) || url.startsWith("data:")) return url;
  if (url.startsWith("/api/uploads/")) return `${API_ORIGIN}${url}`;
  if (url.startsWith("/uploads/")) return `${API_BASE_URL}${url}`;
  return url;
};

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SiteStat {
  id: number;
  statKey: string;
  statLabel: string;
  statValue: string;
  displayOrder: number;
  visible: boolean;
}

export interface ProjectSummary {
  id: number;
  name: string;
  slug: string;
  tagline?: string;
  location?: string;
  city?: string;
  state?: string;
  status: string;
  propertyType: string;
  priceMin?: string;
  priceMax?: string;
  priceUnit?: string;
  heroImageUrl?: string;
  images?: string[];
  featured: boolean;
  visible: boolean;
  displayOrder: number;
  photoCount?: number;
}

export interface Photo {
  id: number;
  url: string;
  caption?: string;
  photoType: string;
  displayOrder: number;
}

export interface Amenity {
  id: number;
  name: string;
  icon?: string;
  category?: string;
  description?: string;
  displayOrder: number;
}

export interface Facility {
  id: number;
  name: string;
  icon?: string;
  value?: string;
  description?: string;
  displayOrder: number;
}

export interface LocalInfo {
  id: number;
  category: string;
  name: string;
  distance?: string;
  description?: string;
  displayOrder: number;
}

export interface Specification {
  id: number;
  unitType: string;
  carpetArea?: string;
  builtUpArea?: string;
  superArea?: string;
  floorCount?: number;
  bathrooms?: number;
  balconies?: number;
  parking?: number;
  price?: string;
  description?: string;
  displayOrder: number;
}

export interface ProjectDetail extends ProjectSummary {
  description?: string;
  totalUnits?: number;
  availableUnits?: number;
  areaMin?: string;
  areaMax?: string;
  possessionDate?: string;
  reraNumber?: string;
  developerName?: string;
  websiteUrl?: string;
  mapLatitude?: string;
  mapLongitude?: string;
  pincode?: string;
  photos: Photo[];
  amenities: Amenity[];
  facilities: Facility[];
  localInfos: LocalInfo[];
  specifications: Specification[];
}

export interface Testimonial {
  id: number;
  clientName: string;
  clientTitle?: string;
  avatarUrl?: string;
  rating: number;
  review: string;
  projectId?: number;
  projectName?: string;
  featured: boolean;
  visible: boolean;
  displayOrder: number;
}

export interface Enquiry {
  id: number;
  fullName: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  status: string;
  notes?: string;
  createdAt: string;
}

export interface Appointment {
  id: number;
  fullName: string;
  phone: string;
  email?: string;
  preferredDate?: string;
  visitType?: string;
  status: string;
  message?: string;
  projectId?: number;
  projectName?: string;
  notes?: string;
  createdAt: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  page?: number;
  number: number;
  size: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}

export interface DashboardSummary {
  totalProjects: number;
  visibleProjects: number;
  featuredProjects: number;
  totalTestimonials: number;
  totalEnquiries: number;
  newEnquiries: number;
  totalAppointments: number;
  pendingAppointments: number;
  recentEnquiries: Enquiry[];
  recentAppointments: Appointment[];
}

// ─── Admin API helpers ────────────────────────────────────────────────────────

export const dashboardApi = {
  getSummary: () => api.get<ApiResponse<DashboardSummary>>("/admin/dashboard/summary"),
};

export const projectAdminApi = {
  getAll: () => api.get<ApiResponse<ProjectSummary[]>>("/admin/projects"),
  getById: (id: number) => api.get<ApiResponse<ProjectDetail>>(`/admin/projects/${id}`),
  create: (data: any) => api.post<ApiResponse<ProjectDetail>>("/admin/projects", data),
  update: (id: number, data: any) => api.put<ApiResponse<ProjectDetail>>(`/admin/projects/${id}`, data),
  delete: (id: number) => api.delete(`/admin/projects/${id}`),
  uploadImage: (projectId: number, file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    return api.post<ApiResponse<string>>(`/admin/projects/${projectId}/upload`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  addPhoto: (projectId: number, data: any) =>
    api.post(`/admin/projects/${projectId}/photos`, data),
  deletePhoto: (photoId: number) => api.delete(`/admin/projects/photos/${photoId}`),
  addAmenity: (projectId: number, data: any) =>
    api.post(`/admin/projects/${projectId}/amenities`, data),
  deleteAmenity: (amenityId: number) => api.delete(`/admin/projects/amenities/${amenityId}`),
  addFacility: (projectId: number, data: any) =>
    api.post(`/admin/projects/${projectId}/facilities`, data),
  deleteFacility: (facilityId: number) => api.delete(`/admin/projects/facilities/${facilityId}`),
  addLocalInfo: (projectId: number, data: any) =>
    api.post(`/admin/projects/${projectId}/local-info`, data),
  deleteLocalInfo: (localInfoId: number) => api.delete(`/admin/projects/local-info/${localInfoId}`),
  addSpec: (projectId: number, data: any) =>
    api.post(`/admin/projects/${projectId}/specifications`, data),
  deleteSpec: (specId: number) => api.delete(`/admin/projects/specifications/${specId}`),
};

export const statsApi = {
  getAll: () => api.get<ApiResponse<SiteStat[]>>("/admin/stats"),
  create: (data: any) => api.post<ApiResponse<SiteStat>>("/admin/stats", data),
  update: (id: number, data: any) => api.put<ApiResponse<SiteStat>>(`/admin/stats/${id}`, data),
  delete: (id: number) => api.delete(`/admin/stats/${id}`),
};

export const testimonialAdminApi = {
  getAll: () => api.get<ApiResponse<Testimonial[]>>("/admin/testimonials"),
  create: (data: any) => api.post<ApiResponse<Testimonial>>("/admin/testimonials", data),
  update: (id: number, data: any) =>
    api.put<ApiResponse<Testimonial>>(`/admin/testimonials/${id}`, data),
  delete: (id: number) => api.delete(`/admin/testimonials/${id}`),
  uploadAvatar: (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    return api.post<ApiResponse<string>>("/admin/testimonials/upload-avatar", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export const enquiryAdminApi = {
  getAll: (page = 0, size = 15, status?: string) =>
    api.get<ApiResponse<PageResponse<Enquiry>>>("/admin/enquiries", {
      params: { page, size, status },
    }),
  update: (id: number, data: any) => api.patch(`/admin/enquiries/${id}`, data),
  delete: (id: number) => api.delete(`/admin/enquiries/${id}`),
};

export const appointmentAdminApi = {
  getAll: (page = 0, size = 15, status?: string) =>
    api.get<ApiResponse<PageResponse<Appointment>>>("/admin/appointments", {
      params: { page, size, status },
    }),
  update: (id: number, data: any) => api.patch(`/admin/appointments/${id}`, data),
  delete: (id: number) => api.delete(`/admin/appointments/${id}`),
};
