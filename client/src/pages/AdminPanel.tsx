import { useState, useEffect, useRef, useCallback } from "react";
import { usePosts, useCreatePost, useUpdatePost, useDeletePost, usePostById } from "@/hooks/use-posts";
import { type Post } from "@shared/schema";
import { CATEGORY_LABELS } from "@/lib/constants";
import { Loader2, Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";

type View = "list" | "create" | "edit";

export default function AdminPanel() {
  const [view, setView] = useState<View>("list");
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [deletePostId, setDeletePostId] = useState<number | null>(null);
  
  const { data: posts, isLoading } = usePosts();
  const deletePost = useDeletePost();

  const handleEdit = (post: Post) => {
    setEditingPostId(post.id);
    setView("edit");
  };

  const handleCreate = () => {
    setEditingPostId(null);
    setView("create");
  };

  const handleBack = () => {
    setView("list");
    setEditingPostId(null);
  };

  const handleDeleteConfirm = async () => {
    if (deletePostId) {
      await deletePost.mutateAsync(deletePostId);
      setDeletePostId(null);
    }
  };

  if (view === "create" || view === "edit") {
    return (
      <PostEditor 
        postId={editingPostId} 
        onBack={handleBack}
        isEdit={view === "edit"}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-serif font-bold text-primary">
            İçerik Yönetimi
          </h1>
          <Button onClick={handleCreate} data-testid="button-create-post">
            <Plus className="w-4 h-4 mr-2" />
            Yeni Yazı
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="border rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium">Başlık</th>
                  <th className="text-left p-4 font-medium">Kategori</th>
                  <th className="text-left p-4 font-medium">Tarih</th>
                  <th className="text-right p-4 font-medium">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {posts?.map((post) => (
                  <tr key={post.id} className="border-t" data-testid={`row-post-${post.id}`}>
                    <td className="p-4">
                      <span className="font-medium">{post.title}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-muted-foreground">
                        {CATEGORY_LABELS[post.category] || post.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-muted-foreground">
                        {post.createdAt && new Date(post.createdAt).toLocaleDateString('tr-TR')}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          size="icon" 
                          variant="ghost"
                          onClick={() => handleEdit(post)}
                          data-testid={`button-edit-${post.id}`}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost"
                          onClick={() => setDeletePostId(post.id)}
                          data-testid={`button-delete-${post.id}`}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {posts?.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-muted-foreground">
                      Henüz yazı bulunmuyor.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AlertDialog open={!!deletePostId} onOpenChange={() => setDeletePostId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Yazıyı Sil</AlertDialogTitle>
            <AlertDialogDescription>
              Bu yazıyı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

interface PostEditorProps {
  postId: number | null;
  onBack: () => void;
  isEdit: boolean;
}

function PostEditor({ postId, onBack, isEdit }: PostEditorProps) {
  const editorRef = useRef<EditorJS | null>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);
  
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("taktik");
  const [imageUrl, setImageUrl] = useState("");
  
  const [playerName, setPlayerName] = useState("");
  const [age, setAge] = useState("");
  const [position, setPosition] = useState("");
  const [role, setRole] = useState("");
  const [strengths, setStrengths] = useState("");
  const [risks, setRisks] = useState("");
  
  const { data: existingPost, isLoading: isLoadingPost } = usePostById(postId);
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();

  const initializeEditor = useCallback((initialData?: any) => {
    if (editorRef.current) {
      editorRef.current.destroy();
      editorRef.current = null;
    }

    if (!editorContainerRef.current) return;

    const editor = new EditorJS({
      holder: editorContainerRef.current,
      placeholder: "Yazınızı buraya yazın...",
      data: initialData,
      tools: {
        header: {
          class: Header as any,
          config: {
            levels: [2, 3, 4],
            defaultLevel: 2
          }
        },
        paragraph: {
          class: Paragraph as any,
        },
        quote: {
          class: Quote as any,
        },
        list: {
          class: List as any,
          inlineToolbar: true,
        },
        image: {
          class: ImageTool as any,
          config: {
            uploader: {
              async uploadByFile(file: File) {
                const formData = new FormData();
                formData.append('image', file);
                
                const response = await fetch('/api/upload', {
                  method: 'POST',
                  body: formData,
                });
                
                const result = await response.json();
                return {
                  success: 1,
                  file: {
                    url: result.url,
                  }
                };
              },
              async uploadByUrl(url: string) {
                return {
                  success: 1,
                  file: {
                    url: url,
                  }
                };
              }
            }
          }
        },
      },
      onReady: () => {
        setIsEditorReady(true);
      },
    });

    editorRef.current = editor;
  }, []);

  useEffect(() => {
    if (isEdit && existingPost) {
      setTitle(existingPost.title);
      setSummary(existingPost.summary);
      setCategory(existingPost.category);
      setImageUrl(existingPost.imageUrl || "");
      
      if (existingPost.scoutProfile) {
        setPlayerName(existingPost.scoutProfile.playerName);
        setAge(existingPost.scoutProfile.age.toString());
        setPosition(existingPost.scoutProfile.position);
        setRole(existingPost.scoutProfile.role);
        setStrengths(existingPost.scoutProfile.strengths.join(", "));
        setRisks(existingPost.scoutProfile.risks.join(", "));
      }

      const initialData = existingPost.content ? parseContentToEditorData(existingPost.content) : undefined;
      initializeEditor(initialData);
    } else if (!isEdit) {
      initializeEditor();
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [isEdit, existingPost, initializeEditor]);

  const parseContentToEditorData = (content: string) => {
    const blocks: any[] = [];
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    tempDiv.childNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        const tagName = element.tagName.toLowerCase();
        
        if (tagName === 'p') {
          blocks.push({
            type: 'paragraph',
            data: { text: element.innerHTML }
          });
        } else if (tagName.match(/^h[2-4]$/)) {
          blocks.push({
            type: 'header',
            data: { 
              text: element.innerHTML,
              level: parseInt(tagName.charAt(1))
            }
          });
        } else if (tagName === 'blockquote') {
          blocks.push({
            type: 'quote',
            data: { text: element.innerHTML }
          });
        } else if (tagName === 'ul' || tagName === 'ol') {
          const items = Array.from(element.querySelectorAll('li')).map(li => li.innerHTML);
          blocks.push({
            type: 'list',
            data: { 
              style: tagName === 'ol' ? 'ordered' : 'unordered',
              items 
            }
          });
        } else if (tagName === 'img') {
          blocks.push({
            type: 'image',
            data: { 
              file: { url: element.getAttribute('src') },
              caption: element.getAttribute('alt') || ''
            }
          });
        }
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        blocks.push({
          type: 'paragraph',
          data: { text: node.textContent.trim() }
        });
      }
    });

    return blocks.length > 0 ? { blocks } : undefined;
  };

  const editorDataToHtml = async () => {
    if (!editorRef.current) return "";
    
    const data = await editorRef.current.save();
    let html = "";
    
    data.blocks.forEach((block: any) => {
      switch (block.type) {
        case 'paragraph':
          html += `<p>${block.data.text}</p>\n`;
          break;
        case 'header':
          html += `<h${block.data.level}>${block.data.text}</h${block.data.level}>\n`;
          break;
        case 'quote':
          html += `<blockquote>${block.data.text}</blockquote>\n`;
          break;
        case 'list':
          const listTag = block.data.style === 'ordered' ? 'ol' : 'ul';
          const items = block.data.items.map((item: string) => `<li>${item}</li>`).join('');
          html += `<${listTag}>${items}</${listTag}>\n`;
          break;
        case 'image':
          const imgUrl = block.data.file?.url || block.data.url;
          if (imgUrl) {
            html += `<img src="${imgUrl}" alt="${block.data.caption || ''}" style="max-width: 100%; height: auto;" />\n`;
          }
          break;
      }
    });
    
    return html;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const content = await editorDataToHtml();
    const slug = title.toLowerCase()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
      .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .replace(/Ğ/g, 'G').replace(/Ü/g, 'U').replace(/Ş/g, 'S')
      .replace(/İ/g, 'I').replace(/Ö/g, 'O').replace(/Ç/g, 'C')
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
    
    const postData: any = {
      slug,
      title,
      summary,
      content,
      category,
      imageUrl: imageUrl || null,
    };

    if (category === 'scout' && playerName) {
      postData.scoutProfile = {
        playerName,
        age: parseInt(age) || 0,
        position,
        role,
        strengths: strengths.split(',').map(s => s.trim()).filter(Boolean),
        risks: risks.split(',').map(s => s.trim()).filter(Boolean),
      };
    }

    try {
      if (isEdit && postId) {
        await updatePost.mutateAsync({ id: postId, data: postData });
      } else {
        await createPost.mutateAsync(postData);
      }
      onBack();
    } catch (error) {
      console.error(error);
    }
  };

  const isPending = createPost.isPending || updatePost.isPending;

  if (isEdit && isLoadingPost) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4" />
          Geri Dön
        </button>

        <h1 className="text-3xl font-serif font-bold text-primary mb-8">
          {isEdit ? "Yazıyı Düzenle" : "Yeni Yazı Oluştur"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Başlık</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Yazı başlığı"
              required
              data-testid="input-title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Kategori</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger data-testid="select-category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scout">Scouting</SelectItem>
                <SelectItem value="taktik">Taktik</SelectItem>
                <SelectItem value="mac-analizi">Maç Analizi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Özet</label>
            <Textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Kısa bir özet yazın..."
              rows={3}
              required
              data-testid="input-summary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Kapak Görseli URL (Opsiyonel)</label>
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              data-testid="input-image-url"
            />
          </div>

          {category === 'scout' && (
            <div className="p-6 bg-muted/50 rounded-md space-y-4">
              <h3 className="font-serif font-bold text-lg">Oyuncu Profili</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Oyuncu Adı"
                  data-testid="input-player-name"
                />
                <Input
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Yaş"
                  type="number"
                  data-testid="input-player-age"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="Pozisyon"
                  data-testid="input-player-position"
                />
                <Input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Rol"
                  data-testid="input-player-role"
                />
              </div>
              <Input
                value={strengths}
                onChange={(e) => setStrengths(e.target.value)}
                placeholder="Güçlü Yönler (virgülle ayırın)"
                data-testid="input-player-strengths"
              />
              <Input
                value={risks}
                onChange={(e) => setRisks(e.target.value)}
                placeholder="Riskler (virgülle ayırın)"
                data-testid="input-player-risks"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">İçerik</label>
            <div 
              ref={editorContainerRef}
              className="min-h-[400px] border rounded-md p-4 bg-background prose prose-sm max-w-none"
              data-testid="editor-container"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              type="submit" 
              disabled={isPending}
              className="w-full md:w-auto"
              data-testid="button-submit"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Kaydediliyor...
                </>
              ) : isEdit ? "Güncelle" : "Yayınla"}
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={onBack}
              className="w-full md:w-auto"
            >
              İptal
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
