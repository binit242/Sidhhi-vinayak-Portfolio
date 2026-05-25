import { useEffect, useState } from "react";
import api from "@/api/client";

const Stats = () => {
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    api.get("/stats").then((res) => {
      setStats(res.data);
    });
  }, []);

  return (
    <section className="py-20 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-zinc-900 rounded-3xl p-10 text-center"
            >
              <h2 className="text-5xl font-bold text-orange-400 mb-4">
                {stat.value}
              </h2>

              <p className="text-zinc-300 text-lg">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;