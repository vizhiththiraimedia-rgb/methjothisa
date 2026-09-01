"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Remedy {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  price?: number;
  currency: string;
  description?: string;
  image?: string;
  isActive: boolean;
}

export default function AdminRemedies() {
  const { t } = useLanguage();
  const [items, setItems] = useState<Remedy[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", category: "", subCategory: "", price: "", currency: "INR", description: "", image: "", isActive: true, sortOrder: 0 });
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetch("/api/remedies")
      .then((r) => r.json())
      .then((result) => { if (result.success) setItems(result.data); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/remedies/${editingId}` : "/api/remedies";
    const payload = { ...form, price: form.price ? parseFloat(form.price) : null };
    await fetch(url, { method: method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setForm({ name: "", category: "", subCategory: "", price: "", currency: "INR", description: "", image: "", isActive: true, sortOrder: 0 });
    setEditingId(null);
    load();
  };

  const handleEdit = (item: Remedy) => {
    setEditingId(item.id);
    setForm({ name: item.name, category: item.category, subCategory: item.subCategory || "", price: item.price?.toString() || "", currency: item.currency, description: item.description || "", image: item.image || "", isActive: item.isActive, sortOrder: 0 });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    await fetch(`/api/remedies/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-display font-bold">Remedies</h1>
          <p className="text-muted-foreground">Manage puja and remedy listings</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit Remedy" : "Add New Remedy"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <Input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
            <Input placeholder="Sub Category" value={form.subCategory} onChange={(e) => setForm({ ...form, subCategory: e.target.value })} />
            <Input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <Input placeholder="Currency" value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} />
            <Input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm md:col-span-2" />
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
              <span className="text-sm">Active</span>
            </div>
            <div className="md:col-span-2 flex gap-2">
              <Button type="submit" variant="cosmic">{editingId ? "Update" : "Create"}</Button>
              {editingId && <Button type="button" variant="outline" onClick={() => { setEditingId(null); setForm({ name: "", category: "", subCategory: "", price: "", currency: "INR", description: "", image: "", isActive: true, sortOrder: 0 }); }}>Cancel</Button>}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>All Remedies</CardTitle></CardHeader>
        <CardContent>
          {loading ? <p>Loading...</p> : (
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-md gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{item.category} {item.subCategory ? `• ${item.subCategory}` : ""} {item.price ? `• ${item.currency} ${item.price}` : ""}</p>
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
