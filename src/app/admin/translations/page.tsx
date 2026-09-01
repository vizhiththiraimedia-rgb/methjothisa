"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LANGUAGES } from "@/lib/i18n";
import { Pencil, Check, Sparkles, Loader2 } from "lucide-react";

export default function AdminTranslations() {
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>({});
  const [loading, setLoading] = useState(true);
  const [selectedLocale, setSelectedLocale] = useState("si");
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [autoTranslating, setAutoTranslating] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetch("/api/translations")
      .then((r) => r.json())
      .then((result) => { if (result.success) setTranslations(result.data); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (key: string, value: string = editValue) => {
    await fetch("/api/translations", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, language: selectedLocale, value })
    });
    setEditingKey(null);
    load();
  };

  const handleAutoTranslate = async (key: string) => {
    setAutoTranslating(key);
    
    // Get english version
    const englishText = translations["en"]?.[key] || key;
    const targetLanguage = LANGUAGES.find(l => l.code === selectedLocale)?.name || "Sinhala";

    try {
      const response = await fetch("/api/translations/auto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: englishText, language: targetLanguage })
      });
      const data = await response.json();
      if (data.success && data.translated_text) {
        await handleSave(key, data.translated_text);
      } else {
        alert("Translation failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Translation error");
    } finally {
      setAutoTranslating(null);
    }
  };

  const allKeys = Array.from(new Set([
    "nav.home", "nav.charts", "nav.reports", "nav.dashboard", "nav.login", "nav.signup",
    "hero.title", "hero.subtitle", "hero.cta",
    "form.name", "form.gender", "form.dob", "form.birthTime", "form.birthPlace",
    ...Object.keys(translations["en"] || {}),
    ...Object.keys(translations[selectedLocale] || {})
  ])).sort();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-display font-bold">Translations</h1>
          <p className="text-muted-foreground">Manage language translations dynamically with SAM AI</p>
        </div>
        <select 
          className="border p-2 rounded w-full sm:w-auto" 
          value={selectedLocale} 
          onChange={(e) => setSelectedLocale(e.target.value)}
        >
          {LANGUAGES.map(l => (
            <option key={l.code} value={l.code}>{l.name}</option>
          ))}
        </select>
      </div>

      <Card>
        <CardHeader><CardTitle>Edit {LANGUAGES.find(l => l.code === selectedLocale)?.name} Translations</CardTitle></CardHeader>
        <CardContent>
          {loading ? <p>Loading...</p> : (
            <div className="space-y-2">
              {allKeys.map((key) => {
                const englishValue = translations["en"]?.[key] || key;
                return (
                  <div key={key} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex-1 mr-4">
                      <p className="text-xs text-muted-foreground mb-1 font-mono">{key} <span className="text-gray-400">({englishValue})</span></p>
                      {editingKey === key ? (
                        <Input 
                          value={editValue} 
                          onChange={(e) => setEditValue(e.target.value)} 
                          autoFocus
                          onKeyDown={(e) => { if (e.key === 'Enter') handleSave(key); }}
                        />
                      ) : (
                        <p className="font-medium">{translations[selectedLocale]?.[key] || <span className="text-red-400 italic">Not translated</span>}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {editingKey === key ? (
                        <Button variant="cosmic" size="sm" onClick={() => handleSave(key)}><Check className="h-4 w-4 mr-1" /> Save</Button>
                      ) : (
                        <>
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            disabled={autoTranslating === key}
                            onClick={() => handleAutoTranslate(key)}
                          >
                            {autoTranslating === key ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Sparkles className="h-4 w-4 mr-1 text-yellow-500" />}
                            SAM AI
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => {
                            setEditingKey(key);
                            setEditValue(translations[selectedLocale]?.[key] || "");
                          }}><Pencil className="h-4 w-4 mr-1" /> Edit</Button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
