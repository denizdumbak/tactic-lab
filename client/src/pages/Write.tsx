import { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { useCreatePost } from "@/hooks/use-posts";
import { type PostInput } from "@shared/routes";
import { Loader2 } from "lucide-react";

export default function Write() {
  const [, setLocation] = useLocation();
  const createPost = useCreatePost();
  
  const [formData, setFormData] = useState<Partial<PostInput>>({
    category: "scout",
    strengths: [],
    risks: []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Basic validation handled by backend schema mostly
      // Ensure arrays are initialized if category is scout
      const payload = {
        ...formData,
        slug: formData.title?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
      } as PostInput;

      await createPost.mutateAsync(payload);
      setLocation("/");
    } catch (error) {
      console.error(error);
    }
  };

  const isScout = formData.category === "scout";

  return (
    <Layout>
      <div className="max-w-2xl mx-auto pt-8 pb-20">
        <h1 className="text-3xl font-serif font-bold mb-8 text-primary">New Analysis</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8 font-sans">
          {/* Main Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input 
                required
                className="w-full p-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary transition-colors"
                value={formData.title || ""}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select 
                className="w-full p-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option value="scout">Scouting Report</option>
                <option value="taktik">Tactical Analysis</option>
                <option value="mac-analizi">Match Analysis</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Summary (Abstract)</label>
              <textarea 
                required
                rows={3}
                className="w-full p-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary"
                value={formData.summary || ""}
                onChange={e => setFormData({...formData, summary: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Image URL (Unsplash)</label>
              <input 
                className="w-full p-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary"
                placeholder="https://images.unsplash.com/..."
                value={formData.imageUrl || ""}
                onChange={e => setFormData({...formData, imageUrl: e.target.value})}
              />
            </div>
          </div>

          {/* Scout Specific Fields */}
          {isScout && (
            <div className="p-6 bg-gray-100 space-y-4 border border-gray-200">
              <h3 className="font-serif font-bold text-lg">Player Profile</h3>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  placeholder="Player Name"
                  className="p-3 border border-gray-200 w-full"
                  value={formData.scoutProfile?.playerName || ""}
                  onChange={e => setFormData({
                    ...formData, 
                    scoutProfile: { ...formData.scoutProfile!, playerName: e.target.value }
                  })}
                />
                <input 
                  placeholder="Age"
                  type="number"
                  className="p-3 border border-gray-200 w-full"
                  value={formData.scoutProfile?.age || ""}
                  onChange={e => setFormData({
                    ...formData, 
                    scoutProfile: { ...formData.scoutProfile!, age: parseInt(e.target.value) }
                  })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  placeholder="Position"
                  className="p-3 border border-gray-200 w-full"
                  value={formData.scoutProfile?.position || ""}
                  onChange={e => setFormData({
                    ...formData, 
                    scoutProfile: { ...formData.scoutProfile!, position: e.target.value }
                  })}
                />
                <input 
                  placeholder="Role"
                  className="p-3 border border-gray-200 w-full"
                  value={formData.scoutProfile?.role || ""}
                  onChange={e => setFormData({
                    ...formData, 
                    scoutProfile: { ...formData.scoutProfile!, role: e.target.value }
                  })}
                />
              </div>
              
              <div>
                <label className="block text-xs uppercase mb-1">Strengths (comma separated)</label>
                <input 
                  className="p-3 border border-gray-200 w-full"
                  placeholder="Pace, Vision, Dribbling"
                  onChange={e => setFormData({
                    ...formData, 
                    scoutProfile: { 
                      ...formData.scoutProfile!, 
                      strengths: e.target.value.split(',').map(s => s.trim()) 
                    }
                  })}
                />
              </div>

              <div>
                <label className="block text-xs uppercase mb-1">Risks (comma separated)</label>
                <input 
                  className="p-3 border border-gray-200 w-full"
                  placeholder="Injury prone, Discipline"
                  onChange={e => setFormData({
                    ...formData, 
                    scoutProfile: { 
                      ...formData.scoutProfile!, 
                      risks: e.target.value.split(',').map(s => s.trim()) 
                    }
                  })}
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-1">Article Content</label>
            <textarea 
              required
              rows={15}
              className="w-full p-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary font-mono text-sm"
              value={formData.content || ""}
              onChange={e => setFormData({...formData, content: e.target.value})}
              placeholder="Write your analysis here..."
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              disabled={createPost.isPending}
              className="px-8 py-3 bg-primary text-white font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors w-full md:w-auto"
            >
              {createPost.isPending ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Publishing...
                </span>
              ) : "Publish Analysis"}
            </button>
          </div>

        </form>
      </div>
    </Layout>
  );
}
