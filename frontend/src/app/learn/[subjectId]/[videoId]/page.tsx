"use client";
import { useEffect, useState, useMemo } from 'react';

import api from '../../../../lib/api';
import { useParams, useRouter } from 'next/navigation';
import { CheckCircle, Lock, PlayCircle, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import KodBotSidebar from '../../../../components/KodBotSidebar';

export default function LearnPage() {
  const { subjectId, videoId } = useParams();
  const router = useRouter();
  
  const [subject, setSubject] = useState<any>(null);
  const [progress, setProgress] = useState<any>({ is_completed: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => { setHasMounted(true); }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subRes, progRes] = await Promise.all([
          api.get(`/subjects/${subjectId}/tree`),
          api.get(`/progress/videos/${videoId}`)
        ]);
        setSubject(subRes.data);
        setProgress(progRes.data);
        setError('');
      } catch (err: any) {
        if (err.response?.status === 403) {
          setError(err.response.data.error || 'Locked');
        } else {
          setError('Failed to load learning data.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [subjectId, videoId]);

  const allVideos = useMemo(() => {
    if (!subject) return [];
    return subject.sections.flatMap((s: any) => s.videos);
  }, [subject]);

  const currentIndex = allVideos.findIndex((v: any) => v.id === Number(videoId));
  const currentVideo = allVideos[currentIndex];
  const nextVideo = allVideos[currentIndex + 1];
  const prevVideo = allVideos[currentIndex - 1];

  const handleVideoEnded = async () => {
    try {
      await api.post(`/progress/videos/${videoId}`, { is_completed: true });
      setProgress({ ...progress, is_completed: true });
      if (nextVideo) {
        // Auto navigate
        setTimeout(() => {
          router.push(`/learn/${subjectId}/${nextVideo.id}`);
        }, 1500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const markComplete = async () => {
    await handleVideoEnded();
  };

  if (!hasMounted || loading) return <div className="min-h-screen text-white flex items-center justify-center animate-pulse">Establishing Connection...</div>;

  return (
    <div className="flex h-screen overflow-hidden bg-[#050505] relative z-10 w-full text-white">
      {/* Sidebar */}
      <div className="w-80 border-r border-white/10 glass-panel flex flex-col h-full shrink-0 overflow-y-auto hidden md:flex">
        <div className="p-6 border-b border-white/10 sticky top-0 bg-black/40 backdrop-blur-xl z-20">
          <Link href={`/subjects/${subjectId}`} className="text-gray-400 hover:text-white flex items-center gap-2 mb-4 transition-colors">
            <ArrowLeft size={16} /> Back to Course
          </Link>
          <h2 className="text-xl font-bold neon-text line-clamp-2">{subject?.title}</h2>
        </div>
        <div className="p-4 space-y-6 flex-1">
          {subject?.sections?.map((section: any, sIdx: number) => (
            <div key={section.id} className="space-y-2">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider pl-2">Section {sIdx + 1}: {section.title}</h3>
              <div className="space-y-1">
                {section.videos?.map((vid: any, vIdx: number) => (
                  <Link 
                    href={`/learn/${subjectId}/${vid.id}`}
                    key={vid.id}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      vid.id === Number(videoId) 
                        ? 'bg-blue-600/20 border border-blue-500/30 text-white' 
                        : 'hover:bg-white/5 text-gray-400'
                    }`}
                  >
                    {/* Simulated lock icon since we aren't fetching progress for all videos here, just basic ui */}
                    {vid.id === Number(videoId) && progress?.is_completed ? (
                      <CheckCircle size={16} className="text-green-400 shrink-0" />
                    ) : vid.id === Number(videoId) ? (
                      <PlayCircle size={16} className="text-blue-400 shrink-0" />
                    ) : (
                      <PlayCircle size={16} className="shrink-0" />
                    )}
                    <span className="text-sm font-medium line-clamp-2">{vid.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        {error ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <Lock size={64} className="text-gray-600 mb-6" />
            <h2 className="text-3xl font-bold mb-4 text-red-400">Sequence Locked</h2>
            <p className="text-gray-400 max-w-md">{error}</p>
            {prevVideo && (
              <Link href={`/learn/${subjectId}/${prevVideo.id}`} className="mt-8 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                Go to Previous Lesson
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="w-full bg-black aspect-video relative flex-shrink-0 border-b border-white/5 shadow-2xl">
              {currentVideo?.youtube_url ? (
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`https://www.youtube.com/embed/${currentVideo.youtube_url.match(/[?&]v=([^&]+)/)?.[1] || ''}?autoplay=0&rel=0`} 
                  title={currentVideo.title} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="w-full h-full flex justify-center items-center text-gray-500">Video Undefined</div>
              )}
            </div>
            <div className="max-w-4xl mx-auto w-full p-8 md:p-12 flex-1">
              <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{currentVideo?.title}</h1>
                
                {progress?.is_completed ? (
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 font-semibold border border-green-500/30">
                    <CheckCircle size={18} /> Lesson Completed
                  </span>
                ) : (
                  <button onClick={markComplete} className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white transition-colors font-medium text-sm">
                    Mark as Complete
                  </button>
                )}
              </div>

              {/* Progress UI simulated */}
              <div className="w-full bg-white/5 h-2 rounded-full mb-12 overflow-hidden border border-white/5">
                <div className={`h-full bg-gradient-to-r from-blue-600 to-purple-500 transition-all duration-1000 ${progress?.is_completed ? 'w-full' : 'w-10'}`} />
              </div>

              <div className="flex items-center justify-between pt-8 border-t border-white/10 mt-auto">
                {prevVideo ? (
                  <Link href={`/learn/${subjectId}/${prevVideo.id}`} className="flex items-center gap-2 px-5 py-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors font-medium">
                    <ChevronLeft size={18} /> Previous Lesson
                  </Link>
                ) : <div />}
                
                {nextVideo && (
                  <Link href={`/learn/${subjectId}/${nextVideo.id}`} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600/20 hover:bg-blue-600 border border-blue-500/30 text-white transition-all shadow-lg font-medium group">
                    Next Lesson <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <KodBotSidebar />
    </div>
  );
}
