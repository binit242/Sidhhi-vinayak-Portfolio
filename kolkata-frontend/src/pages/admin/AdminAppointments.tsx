import React, { useEffect, useState, useCallback } from 'react';
import { appointmentAdminApi, Appointment, PageResponse } from '../../api/client';

export default function AdminAppointments() {
  const [data, setData] = useState<PageResponse<Appointment> | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState('');

  const load = useCallback(() => {
    setLoading(true);

    appointmentAdminApi
      .getAll(page, 15, filter || undefined)
      .then((r) => setData(r.data.data))
      .finally(() => setLoading(false));
  }, [page, filter]);

  useEffect(() => {
    load();
  }, [load]);

  return <div className="text-white">Admin Appointments Working</div>;
}