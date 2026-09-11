import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MobileHeader } from './MobileHeader';
import { MobileBottomNav } from './MobileBottomNav';
import { getLiveNewsApi } from '../../services/api';
import { 
  Radio, Clock, Share2, Tag, Search, ShieldCheck, Flame, RefreshCw, 
  ArrowLeft, Play, Images, FileText, X, Eye, CheckCircle2, ChevronRight, ChevronLeft
} from 'lucide-react';

const defaultNews = [
  {
    _id: 'news_1',
    title: 'Thalapathy Vijay Addresses Packed TVK Flag Unveiling Ceremony in Chennai',
    category: 'Announcements',
    type: 'gallery',
    summary: 'HD Photo coverage of TVK President Thalapathy Vijay launching the official party flag and anthem in Chennai before thousands of party volunteers.',
    timeAgo: '10 mins ago',
    source: 'TVK Media Desk',
    isBreaking: true,
    gallery: [
      'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=600&q=80',
    viewsCount: '1.2M views'
  },
  {
    _id: 'news_2',
    title: 'Exclusive Photos: 150+ TVK Night Study Centers Solar Lighting Installation',
    category: 'Constituency',
    type: 'gallery',
    summary: 'Photo coverage of newly established neighborhood night study centers equipped with solar power, free textbooks, and volunteer tutoring desks across Madurai & Erode.',
    timeAgo: '45 mins ago',
    source: 'Education Wing',
    isBreaking: true,
    gallery: [
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80',
    viewsCount: '85K views'
  },
  {
    _id: 'news_3',
    title: 'TVK 24x7 Digital IT Cell Portal Crosses 10,000 Verified Citizen Grievance Solutions',
    category: 'IT Cell',
    type: 'gallery',
    summary: 'Photo gallery showcasing the digital tracking workflow operated by TVK IT Cell volunteer engineers connecting public requests directly to local administration desks.',
    timeAgo: '2 hours ago',
    source: 'IT Cell Headquarters',
    isBreaking: false,
    gallery: [
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80',
    viewsCount: '240K views'
  },
  {
    _id: 'news_4',
    title: 'TVK Flagship Mobile Health Clinics On Ground in Flood-Affected Zones',
    category: 'Constituency',
    type: 'gallery',
    summary: 'Photo story of mobile healthcare vans delivering free diagnostic blood tests, emergency medical care, and clean drinking water distribution in Tiruvallur.',
    timeAgo: '4 hours ago',
    source: 'Medical Wing',
    isBreaking: false,
    gallery: [
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    viewsCount: '410K views'
  },
  {
    _id: 'news_5',
    title: 'Official Press Release Document: TVK State Merit Awards Ceremony 2026',
    category: 'Press Releases',
    type: 'press',
    summary: 'Official signed statement issued by TVK General Secretary outlining the venue details, eligibility guidelines, and seat allocations for the upcoming state-wide toppers honor ceremony.',
    timeAgo: '6 hours ago',
    source: 'General Secretary Office',
    isBreaking: false,
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    viewsCount: '62K views'
  },
  {
    _id: 'news_6',
    title: 'Photo Story: TVK Green Tamil Nadu 1 Lakh Tree Sapling Plantation Drive',
    category: 'Announcements',
    type: 'gallery',
    summary: 'HD photo album capturing environmental volunteers planting Miyawaki urban micro-forests and rainwater harvesting pits in Salem, Trichy, and Coimbatore.',
    timeAgo: '8 hours ago',
    source: 'Environmental Wing',
    isBreaking: false,
    gallery: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
    viewsCount: '130K views'
  }
];

const CATEGORIES = ['All', 'Photos', 'Announcements', 'Constituency', 'IT Cell', 'Press Releases'];

export const MobileLiveNews = () => {
  const [news, setNews] = useState(defaultNews);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeMedia, setActiveMedia] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const fetchNews = useCallback(() => {
    setIsRefreshing(true);
    getLiveNewsApi()
      .then((res) => {
        if (res.data && res.data.success && Array.isArray(res.data.news) && res.data.news.length > 0) {
          setNews(res.data.news);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setTimeout(() => setIsRefreshing(false), 500);
      });
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      let matchesTab = true;
      if (activeTab === 'Photos') matchesTab = item.type === 'gallery' || Boolean(item.gallery);
      else if (activeTab === 'Press Releases') matchesTab = item.type === 'press' || item.category === 'Press Releases';
      else if (activeTab !== 'All') matchesTab = item.category.toLowerCase() === activeTab.toLowerCase();

      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.source.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [news, activeTab, searchQuery]);

  const handleShare = (e, id, title) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${title} - TVK Live News: ${window.location.href}`);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const openMedia = (item) => {
    setActiveMedia(item);
    setGalleryIndex(0);
  };

  const closeMedia = () => {
    setActiveMedia(null);
    setGalleryIndex(0);
  };

  return (
    <div className="min-h-screen bg-amber-100/70 text-slate-950 flex flex-col font-sans pb-20">
      <MobileHeader />

      {/* MOBILE HEADER BANNER */}
      <section className="bg-gradient-to-b from-[#6D0B0F] via-tvk-red to-[#4A070A] text-white p-4 text-center border-b-4 border-tvk-yellow shadow-md space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-black/40 rounded-full text-[10px] font-extrabold text-tvk-yellow">
          <Images className="w-3 h-3 text-tvk-yellow" />
          <span>📸 PHOTO GALLERY STREAM</span>
        </div>
        <h1 className="text-xl font-black text-white">TVK Live Photo Updates</h1>
        
        <div className="flex items-center justify-between pt-1">
          <Link
            to="/developments"
            className="text-[11px] font-bold text-tvk-yellow flex items-center gap-1 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Developments</span>
          </Link>

          <button
            onClick={fetchNews}
            disabled={isRefreshing}
            className="px-3 py-1 bg-tvk-yellow text-slate-950 font-black text-[11px] rounded-lg shadow-sm flex items-center gap-1"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>
        </div>
      </section>

      {/* SEARCH BAR & CATEGORY PILLS */}
      <div className="p-3 space-y-2.5">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search photos or news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-amber-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-tvk-red"
          />
        </div>

        <div className="overflow-x-auto flex gap-1.5 no-scrollbar">
          {CATEGORIES.map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-full text-[11px] font-black shrink-0 transition-colors duration-150 flex items-center gap-1 ${
                  isSelected ? 'bg-tvk-red text-white' : 'bg-white text-slate-900 border border-amber-300'
                }`}
              >
                {tab === 'Photos' && <Images className="w-2.5 h-2.5" />}
                <span>{tab}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MOBILE NEWS CARDS 2-COLUMN GRID */}
      <div className="px-3">
        {filteredNews.length === 0 ? (
          <div className="bg-white p-8 rounded-xl border border-amber-300 text-center space-y-2 shadow-sm">
            <Radio className="w-8 h-8 text-slate-400 mx-auto animate-pulse" />
            <p className="text-xs font-bold text-slate-700">No photo updates found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredNews.map((item) => (
              <article
                key={item._id}
                onClick={() => openMedia(item)}
                className="bg-white rounded-2xl overflow-hidden shadow-md border-2 border-amber-300 flex flex-col justify-between h-full active:scale-[0.98] transition-transform duration-150 cursor-pointer"
              >
                {item.imageUrl && (
                  <div className="h-28 w-full relative overflow-hidden bg-slate-950 border-b border-amber-200 shrink-0">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover opacity-90" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                    {/* Photo count badge */}
                    {item.gallery && (
                      <div className="absolute bottom-1.5 right-1.5 bg-black/80 text-white px-1.5 py-0.5 rounded-full text-[9px] font-extrabold flex items-center gap-0.5">
                        <Images className="w-2.5 h-2.5 text-tvk-yellow" />
                        <span>{item.gallery.length}</span>
                      </div>
                    )}

                    <div className="absolute top-1.5 left-1.5 flex items-center gap-1">
                      {item.isBreaking && (
                        <span className="px-1.5 py-0.5 bg-tvk-red text-white font-black text-[8px] rounded-full uppercase tracking-wider shadow-xs flex items-center gap-0.5">
                          <Flame className="w-2 h-2 text-tvk-yellow" />
                          LIVE
                        </span>
                      )}
                      <span className="px-1.5 py-0.5 bg-black/75 text-white font-extrabold text-[8px] rounded-full border border-white/20 truncate max-w-[70px]">
                        {item.category}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-2.5 flex-1 flex flex-col justify-between space-y-1.5">
                  <div className="space-y-1">
                    <h3 className="font-black text-xs text-slate-950 leading-snug line-clamp-2">{item.title}</h3>
                    <p className="text-[10.5px] text-slate-600 font-medium leading-tight line-clamp-2">{item.summary}</p>
                  </div>

                  <div className="pt-1.5 border-t border-amber-100 flex items-center justify-between text-[9px] font-bold">
                    <span className="flex items-center gap-0.5 text-slate-700 truncate max-w-[80px]">
                      <ShieldCheck className="w-2.5 h-2.5 text-tvk-red shrink-0" />
                      <span className="truncate">{item.source}</span>
                    </span>

                    <button
                      onClick={(e) => handleShare(e, item._id, item.title)}
                      className="px-1.5 py-0.5 bg-amber-50 border border-amber-300 text-tvk-red font-black rounded text-[9px] flex items-center gap-0.5"
                    >
                      <Share2 className="w-2 h-2" />
                      <span>{copiedId === item._id ? 'Copied' : 'Share'}</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* MOBILE MEDIA LIGHTBOX MODAL */}
      {activeMedia && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex flex-col justify-between p-3">
          <div className="flex items-center justify-between py-2 border-b border-slate-800 text-white">
            <span className="text-xs font-black text-tvk-yellow uppercase">{activeMedia.category}</span>
            <button onClick={closeMedia} className="p-1.5 rounded-full bg-slate-800 text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="my-auto space-y-3">
            <div className="space-y-2">
              <div className="h-[45vh] w-full rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
                <img
                  src={activeMedia.gallery ? activeMedia.gallery[galleryIndex] : activeMedia.imageUrl}
                  alt="gallery"
                  className="w-full h-full object-contain"
                />
              </div>
              {activeMedia.gallery && activeMedia.gallery.length > 1 && (
                <div className="flex gap-2 justify-center">
                  {activeMedia.gallery.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setGalleryIndex(idx)}
                      className={`w-12 h-10 rounded overflow-hidden border-2 ${
                        galleryIndex === idx ? 'border-tvk-yellow' : 'border-transparent opacity-60'
                      }`}
                    >
                      <img src={imgUrl} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="text-white space-y-1">
              <h3 className="text-sm font-black">{activeMedia.title}</h3>
              <p className="text-[11px] text-slate-300 leading-relaxed">{activeMedia.summary}</p>
            </div>
          </div>

          <div className="py-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>{activeMedia.source}</span>
            <button
              onClick={(e) => handleShare(e, activeMedia._id, activeMedia.title)}
              className="px-3 py-1 bg-tvk-red text-white font-black text-xs rounded-lg"
            >
              Share
            </button>
          </div>
        </div>
      )}

      <MobileBottomNav />
    </div>
  );
};
