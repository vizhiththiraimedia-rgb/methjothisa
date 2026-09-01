"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Offer {
  id: string;
  title: string;
  subtitle?: string;
  originalPrice: number;
  discountedPrice: number;
  discount: string;
  pages?: string;
  languages?: string;
  delivery?: string;
  image?: string;
  href: string;
  isActive: boolean;
}

export default function AdminOffers() {
  const { t } = useLanguage();
  const [items, setItems] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", subtitle: "", originalPrice: "", discountedPrice: "", discount: "", pages: "", languages: "", delivery: "", image: "", href: "", isActive: true, sortOrder: 0 });
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetch("/api/offers")
      .then((r) => r.json())
      .then((result) => { if (result.success) setItems(result.data); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/offers/${editingId}` : "/api/offers";
    const payload = { ...form, originalPrice: parseFloat(form.originalPrice), discountedPrice: parseFloat(form.discountedPrice) };
    await fetch(url, { method: method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setForm({ title: "", subtitle: "", originalPrice: "", discountedPrice: "", discount: "", pages: "", languages: "", delivery: "", image: "", href: "", isActive: true, sortOrder: 0 });
    setEditingId(null);
    load();
  };

  const handleEdit = (item: Offer) => {
    setEditingId(item.id);
    setForm({ title: item.title, subtitle: item.subtitle || "", originalPrice: item.originalPrice.toString(), discountedPrice: item.discountedPrice.toString(), discount: item.discount, pages: item.pages || "", languages: item.languages || "", delivery: item.delivery || "", image: item.image || "", href: item.href, isActive: item.isActive, sortOrder: 0 });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    await fetch(`/api/offers/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-display font-bold">Offers</h1>
          <p className="text-muted-foreground">Manage seasonal offers and promotions</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit Offer" : "Add New Offer"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <Input placeholder="Subtitle" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
            <Input placeholder="Original Price" type="number" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} required />
            <Input placeholder="Discounted Price" type="number" value={form.discountedPrice} onChange={(e) => setForm({ ...form, discountedPrice: e.target.value })} required />
            <Input placeholder="Discount (e.g., 66% OFF)" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} required />
            <Input placeholder="Pages (e.g., More than 12 pages)" value={form.pages} onChange={(e) => setForm({ ...form, pages: e.target.value })} />
            <Input placeholder="Languages (comma separated)" value={form.languages} onChange={(e) => setForm({ ...form, languages: e.target.value })} />
            <Input placeholder="Delivery (e.g., PDF via E-mail/WhatsApp)" value={form.delivery} onChange={(e) => setForm({ ...form, delivery: e.target.value })} />
            <Input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            <Input placeholder="Link href" value={form.href} onChange={(e) => setForm({ ...form, href: e.target.value })} required />
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
              <span className="text-sm">Active</span>
            </div>
            <div className="md:col-span-2 flex gap-2">
              <Button type="submit" variant="cosmic">{editingId ? "Update" : "Create"}</Button>
              {editingId && <Button type="button" variant="outline" onClick={() => { setEditingId(null); setForm({ title: "", subtitle: "", originalPrice: "", discountedPrice: "", discount: "", pages: "", languages: "", delivery: "", image: "", href: "", isActive: true, sortOrder: 0 }); }}>Cancel</Button>}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>All Offers</CardTitle></CardHeader>
        <CardContent>
          {loading ? <p>Loading...</p> : (
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-md gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.title}</p>
                    <p className="text-sm text-muted-foreground truncate">₹{item.originalPrice} → ₹{item.discountedPrice} ({item.discount})</p>
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
