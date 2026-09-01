"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

interface Astrologer {
  id: string;
  name: string;
  experience: string;
  category: string;
  languages: string;
  photo?: string;
  isActive: boolean;
}

export default function AdminAstrologers() {
  const { t } = useLanguage();
  const [items, setItems] = useState<Astrologer[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", experience: "", category: "", languages: "", photo: "", isActive: true, sortOrder: 0 });
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetch("/api/astrologers")
      .then((r) => r.json())
      .then((result) => { if (result.success) setItems(result.data); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/astrologers/${editingId}` : "/api/astrologers";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", experience: "", category: "", languages: "", photo: "", isActive: true, sortOrder: 0 });
    setEditingId(null);
    load();
  };

  const handleEdit = (item: Astrologer) => {
    setEditingId(item.id);
    setForm({ name: item.name, experience: item.experience, category: item.category, languages: item.languages, photo: item.photo || "", isActive: item.isActive, sortOrder: 0 });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    await fetch(`/api/astrologers/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-display font-bold">Astrologers</h1>
          <p className="text-muted-foreground">Manage astrologer listings</p>
        </div>
        <Link href="/admin/astrologers/new"><Button><Plus className="h-4 w-4 mr-2" />Add Astrologer</Button></Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit Astrologer" : "Add New Astrologer"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <Input placeholder="Experience (e.g., 21 years)" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} required />
            <Input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
            <Input placeholder="Languages (comma separated)" value={form.languages} onChange={(e) => setForm({ ...form, languages: e.target.value })} required />
            <Input placeholder="Photo URL" value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })} />
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
              <span className="text-sm">Active</span>
            </div>
            <div className="md:col-span-2 flex gap-2">
              <Button type="submit" variant="cosmic">{editingId ? "Update" : "Create"}</Button>
              {editingId && <Button type="button" variant="outline" onClick={() => { setEditingId(null); setForm({ name: "", experience: "", category: "", languages: "", photo: "", isActive: true, sortOrder: 0 }); }}>Cancel</Button>}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>All Astrologers</CardTitle></CardHeader>
        <CardContent>
          {loading ? <p>Loading...</p> : (
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-md gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{item.experience} • {item.category} • {item.languages}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4 text-red-600" /></Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
