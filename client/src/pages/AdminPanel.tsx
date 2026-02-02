import { useState, useEffect, useRef, useCallback } from "react";
import { usePosts, useCreatePost, useUpdatePost, useDeletePost, usePostById } from "@/hooks/use-posts";
import { type Post } from "@shared/schema";
import { useLanguage } from "@/lib/language-context";
import { getCategoryLabel } from "@/lib/i18n";
import { Loader2, Plus, Edit, Trash2, ArrowLeft, Upload, X, Image as ImageIcon, Home, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import { Link } from "wouter";

type View = "list" | "create" | "edit";

export default function AdminPanel() {
  const [view, setView] = useState<View>("list");
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [deletePostId, setDeletePostId] = useState<number | null>(null);

  const { data: posts, isLoading } = usePosts();
  const deletePost = useDeletePost();
  const { t, language } = useLanguage();

  if (view === "create" || view === "edit") {
    return <PostEditor postId={editingPostId} onBack={() => { setView("list"); setEditingPostId(null); }} isEdit={view === "edit"} />;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold font-serif">{t('admin.title')}</h1>
            <Link href="/">
              <Button variant="outline" size="sm">
                <Home className="w-4 h-4 mr-2" /> Ana Sayfa
              </Button>
            </Link>
          </div>
          <Button onClick={() => setView("create")}><Plus className="w-4 h-4 mr-2" /> {t('admin.newPost')}</Button>
        </div>

        {isLoading ? <Loader2 className="animate-spin mx-auto mt-20" /> : (
          <div className="border rounded-lg bg-card overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-muted">
                <tr>
                  <th className="p-4">Başlık</th>
                  <th className="p-4">Kategori</th>
                  <th className="p-4 text-center"><Eye className="w-4 h-4 mx-auto" /></th>
                  <th className="p-4 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {posts?.map((post) => (
                  <tr key={post.id} className="border-t hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">{post.title}</td>
                    <td className="p-4">{getCategoryLabel(language, post.category)}</td>
                    <td className="p-4 text-center font-mono text-sm">{post.views || 0}</td>
                    <td className="p-4 text-right space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => { setEditingPostId(post.id); setView("edit"); }}><Edit className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeletePostId(post.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AlertDialog open={!!deletePostId} onOpenChange={() => setDeletePostId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Bu yazıyı silmek istediğinize emin misiniz?</AlertDialogTitle></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Vazgeç</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive" onClick={async () => { if (deletePostId) await deletePost.mutateAsync(deletePostId); setDeletePostId(null); }}>Sil</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function PostEditor({ postId, onBack, isEdit }: { postId: number | null, onBack: () => void, isEdit: boolean }) {
  const editorRef = useRef<EditorJS | null>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("taktik");
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [scoutData, setScoutData] = useState({ playerName: "", age: "", position: "", role: "", strengths: "", risks: "" });

  const { data: existingPost, isLoading: isLoadingPost } = usePostById(postId);
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();

      // Cloudinary'den dönen URL'i yakalamak için tüm ihtimalleri kontrol ediyoruz
      const uploadedUrl = data.url || (data.file && data.file.url);

      if (uploadedUrl) {
        setImageUrl(uploadedUrl);
      } else {
        console.error("URL bulunamadı, gelen veri:", data);
      }
    } catch (err) {
      console.error("Yükleme sırasında teknik bir hata oluştu:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const initializeEditor = useCallback((data?: any) => {
    if (editorRef.current) {
      editorRef.current.destroy();
      editorRef.current = null;
    }
    editorRef.current = new EditorJS({
      holder: editorContainerRef.current!,
      data: data || {},
      tools: {
        header: Header, paragraph: Paragraph, quote: Quote, list: List,
        image: {
          class: ImageTool as any,
          config: {
            uploader: {
              uploadByFile: async (file: File) => {
                const formData = new FormData();
                formData.append('image', file);
                const res = await fetch('/api/upload', { method: 'POST', body: formData });
                const result = await res.json();
                return { success: 1, file: { url: result.url } };
              }
            }
          }
        }
      }
    });
  }, []);

  useEffect(() => {
    if (isEdit && existingPost) {
      setTitle(existingPost.title);
      setSummary(existingPost.summary);
      setCategory(existingPost.category);
      setImageUrl(existingPost.imageUrl || "");
      if (existingPost.scoutProfile) {
        setScoutData({
          playerName: existingPost.scoutProfile.playerName,
          age: existingPost.scoutProfile.age.toString(),
          position: existingPost.scoutProfile.position,
          role: existingPost.scoutProfile.role,
          strengths: existingPost.scoutProfile.strengths.join(", "),
          risks: existingPost.scoutProfile.risks.join(", ")
        });
      }
      initializeEditor(existingPost.content);
    } else if (!isEdit) {
      initializeEditor();
    }
    return () => { editorRef.current?.destroy(); editorRef.current = null; };
  }, [isEdit, existingPost, initializeEditor]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = await editorRef.current?.save();
    // NOT: Slug backend tarafında başlığa göre otomatik üretilecek.
    const payload: any = {
      title,
      summary,
      category,
      imageUrl,
      content,
      slug: isEdit ? existingPost?.slug : "pending"
    };

    if (category === 'scout' && scoutData.playerName) {
      payload.scoutProfile = {
        ...scoutData,
        age: parseInt(scoutData.age) || 0,
        strengths: scoutData.strengths.split(',').map(s => s.trim()).filter(Boolean),
        risks: scoutData.risks.split(',').map(s => s.trim()).filter(Boolean)
      };
    }

    try {
      if (isEdit && postId) await updatePost.mutateAsync({ id: postId, data: payload });
      else await createPost.mutateAsync(payload);
      onBack();
    } catch (err) { console.error(err); }
  };

  if (isEdit && isLoadingPost) return <div className="flex justify-center mt-20"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" onClick={onBack}><ArrowLeft className="w-4 h-4 mr-2" /> Geri Dön</Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 pb-20">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Yazı Başlığı" className="text-2xl font-bold h-14" required />

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full h-12 text-base"><SelectValue placeholder="Kategori Seç" /></SelectTrigger>
          <SelectContent className="bg-white dark:bg-zinc-950 shadow-2xl z-[9999]">
            <SelectItem value="taktik">Taktik Analiz</SelectItem>
            <SelectItem value="mac-analizi">Maç Analizi</SelectItem>
            <SelectItem value="scout">Scout Raporu</SelectItem>
          </SelectContent>
        </Select>

        <div
          className="border-2 border-dashed rounded-xl p-8 text-center hover:border-primary/50 transition-all cursor-pointer bg-muted/20 relative group"
          onDragOver={(e) => { e.preventDefault(); }}
          onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files[0]) handleFileUpload(e.dataTransfer.files[0]); }}
          onClick={() => document.getElementById('title-upload')?.click()}
        >
          <input type="file" id="title-upload" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])} />
          {imageUrl ? (
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg shadow-inner">
              <img src={imageUrl} alt="Kapak" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <p className="text-white flex items-center font-medium"><Upload className="w-5 h-5 mr-2" /> Değiştir</p>
              </div>
              <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8" onClick={(e) => { e.stopPropagation(); setImageUrl(""); }}><X className="w-4 h-4" /></Button>
            </div>
          ) : (
            <div className="py-6">
              {isUploading ? <Loader2 className="w-10 h-10 animate-spin mx-auto text-primary" /> : (
                <>
                  <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="font-medium text-lg">Kapak Fotoğrafı Yükle</p>
                  <p className="text-sm text-muted-foreground mt-1">Sürükle bırak veya tıklayarak dosya seç (Önerilen: 1200x500)</p>
                </>
              )}
            </div>
          )}
        </div>

        <Textarea value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Kısa Özet" rows={3} required className="text-lg py-4" />

        {category === 'scout' && (
          <div className="bg-muted/30 p-6 rounded-xl border border-primary/10 grid grid-cols-2 gap-4 shadow-sm">
            <div className="col-span-2 text-sm font-bold text-primary mb-2 border-b pb-2 uppercase tracking-wider">Oyuncu Bilgileri</div>
            <Input placeholder="Oyuncu Adı" value={scoutData.playerName} onChange={e => setScoutData({ ...scoutData, playerName: e.target.value })} />
            <Input placeholder="Yaş" type="number" value={scoutData.age} onChange={e => setScoutData({ ...scoutData, age: e.target.value })} />
            <Input placeholder="Mevki" value={scoutData.position} onChange={e => setScoutData({ ...scoutData, position: e.target.value })} />
            <Input placeholder="Rol" value={scoutData.role} onChange={e => setScoutData({ ...scoutData, role: e.target.value })} />
            <Input placeholder="Güçlü Yönler (Virgülle ayır)" value={scoutData.strengths} onChange={e => setScoutData({ ...scoutData, strengths: e.target.value })} className="col-span-2" />
            <Input placeholder="Zayıf Yönler (Virgülle ayır)" value={scoutData.risks} onChange={e => setScoutData({ ...scoutData, risks: e.target.value })} className="col-span-2" />
          </div>
        )}

        <div className="bg-white dark:bg-zinc-950 rounded-xl border p-4 shadow-inner">
          <div ref={editorContainerRef} className="prose max-w-none min-h-[500px]" />
        </div>

        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-4xl px-8 z-[100]">
          <div className="bg-background/95 backdrop-blur-md p-4 border rounded-2xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.2)] flex gap-4">
            <Button
              type="submit"
              size="lg"
              className="flex-1 shadow-lg hover:shadow-primary/20 transition-all active:scale-[0.98]"
              disabled={createPost.isPending || updatePost.isPending}
            >
              {(createPost.isPending || updatePost.isPending) && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              {isEdit ? "Değişiklikleri Kaydet" : "Makaleyi Yayınla"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="flex-1 bg-background hover:bg-muted"
              onClick={onBack}
            >
              İptal Et
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}