"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Gem, Tag, TrendingUp } from "lucide-react";
import Link from "next/link";

interface Stats {
  astrologers: number;
  remedies: number;
  offers: number;
}

export default function AdminDashboard() {
  const { t } = useLanguage();
  const [stats, setStats] = useState<Stats>({ astrologers: 0, remedies: 0, offers: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/astrologers").then((r) => r.json()),
      fetch("/api/remedies").then((r) => r.json()),
      fetch("/api/offers").then((r) => r.json()),
    ]).then(([a, r, o]) => {
      setStats({
        astrologers: a.success ? a.data.length : 0,
        remedies: r.success ? r.data.length : 0,
        offers: o.success ? o.data.length : 0,
      });
    });
  }, []);

  const cards = [
    { title: "Astrologers", count: stats.astrologers, href: "/admin/astrologers", icon: Users, color: "from-purple-500 to-indigo-500" },
    { title: "Remedies", count: stats.remedies, href: "/admin/remedies", icon: Gem, color: "from-orange-500 to-red-500" },
    { title: "Offers", count: stats.offers, href: "/admin/offers", icon: Tag, color: "from-green-500 to-emerald-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage astrologers, remedies, and seasonal offers.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.title} href={card.href}>
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center text-white`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{card.count}</p>
                    <p className="text-sm text-muted-foreground">{card.title}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
