import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { PCHeader } from './PCHeader';
import { PCFooter } from './PCFooter';
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

export const PCLiveNews = () => {
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

  const breakingNewsItems = useMemo(() => {
    return news.filter((n) => n.isBreaking);
  }, [news]);

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
    <div className="min-h-screen bg-amber-100/70 text-slate-950 flex flex-col font-sans selection:bg-tvk-red selection:text-white">
      <PCHeader />

      {/* BREAKING NEWS MARQUEE BANNER */}
      {breakingNewsItems.length > 0 && (
        <div className="bg-tvk-red text-white py-2 px-4 border-b border-tvk-yellow flex items-center gap-3 overflow-hidden shadow-sm">
          <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-0.5 rounded-md font-black text-xs shrink-0 tracking-wider">
            <Flame className="w-3.5 h-3.5 text-tvk-yellow animate-bounce" />
            <span className="text-tvk-yellow uppercase">LIVE UPDATES</span>
          </div>
          <div className="overflow-hidden whitespace-nowrap w-full">
            <div className="inline-block animate-marquee text-xs font-bold text-slate-100 space-x-8">
              {breakingNewsItems.map((item) => (
                <span key={item._id} className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-tvk-yellow inline-block" />
                  <span>{item.title}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-[#6D0B0F] via-tvk-red to-[#4A070A] text-white py-8 px-6 border-b-4 border-tvk-yellow shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-xs rounded-full border border-tvk-yellow/40 text-xs font-extrabold text-tvk-yellow">
              <Images className="w-4 h-4 text-tvk-yellow" />
              <span>📸 PHOTO & MEDIA GALLERY FEED · புகைப்படங்கள்</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-white leading-tight">
              TVK <span className="text-tvk-yellow">LIVE PHOTO & NEWS</span> STREAM
            </h1>
            <p className="text-red-100 text-xs lg:text-sm font-medium leading-relaxed">
              Explore high-definition photo galleries of TVK constituency developments, environmental drives, and verified official press releases in real-time.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/developments"
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/30 inline-flex items-center gap-2 transition-colors duration-150"
            >
              <ArrowLeft className="w-4 h-4 text-tvk-yellow" />
              <span>Back to Developments</span>
            </Link>

            <button
              onClick={fetchNews}
              disabled={isRefreshing}
              className="px-5 py-2.5 bg-tvk-yellow text-slate-950 font-black text-xs rounded-xl shadow-md inline-flex items-center gap-2 hover:bg-amber-300 transition-colors duration-150 disabled:opacity-70"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Sync Gallery Feed</span>
            </button>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <section className="py-10 px-6 max-w-7xl mx-auto w-full flex-1 space-y-8">
        
        {/* Search & Category Filter Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-amber-300 shadow-md">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((tab) => {
              const isSelected = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider transition-colors duration-150 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-tvk-red text-white shadow-sm'
                      : 'bg-amber-50 text-slate-800 border border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  {tab === 'Photos' && <Images className="w-3 h-3 text-amber-500" />}
                  {tab === 'Press Releases' && <FileText className="w-3 h-3 text-blue-500" />}
                  <span>{tab}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search photos or news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-amber-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-tvk-red focus:bg-white"
            />
          </div>
        </div>

        {/* Live News Grid */}
        {filteredNews.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-amber-300 text-center space-y-3 shadow-md">
            <Radio className="w-10 h-10 text-slate-400 mx-auto animate-pulse" />
            <h3 className="text-lg font-black text-slate-800">No Photo Updates Found</h3>
            <p className="text-xs font-medium text-slate-600">Try selecting another media category or clearing your search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <article
                key={item._id}
                onClick={() => openMedia(item)}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-amber-300 hover:border-tvk-red transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between group cursor-pointer"
              >
                {/* News Media Banner */}
                {item.imageUrl && (
                  <div className="h-52 w-full relative overflow-hidden bg-slate-950 border-b border-amber-200">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

                    {/* PHOTO GALLERY BADGE */}
                    {item.gallery && (
                      <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-full text-[11px] font-extrabold border border-white/20 flex items-center gap-1.5 shadow-sm">
                        <Images className="w-3.5 h-3.5 text-tvk-yellow" />
                        <span>{item.gallery.length} Photos</span>
                      </div>
                    )}

                    {/* Top Floating Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      {item.isBreaking && (
                        <span className="px-2.5 py-1 bg-tvk-red text-white font-black text-[10px] rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                          <Flame className="w-3 h-3 text-tvk-yellow animate-bounce" />
                          LIVE
                        </span>
                      )}

                      <span className="px-2.5 py-1 backdrop-blur-xs text-white font-extrabold text-[10px] rounded-full border border-white/20 flex items-center gap-1 shadow-sm bg-black/75">
                        <Images className="w-2.5 h-2.5 text-tvk-yellow" />
                        <span>{item.category}</span>
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 text-white flex items-center gap-2 text-xs font-bold">
                      <span className="text-slate-200">{item.timeAgo}</span>
                      {item.viewsCount && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-amber-400" />
                          <span className="text-tvk-yellow flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {item.viewsCount}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* News Content */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-black text-slate-950 text-base leading-snug group-hover:text-tvk-red transition-colors duration-150">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-amber-100 flex items-center justify-between text-xs text-slate-600 font-bold">
                    <div className="flex items-center gap-1 text-slate-700">
                      <ShieldCheck className="w-3.5 h-3.5 text-tvk-red" />
                      <span>{item.source}</span>
                    </div>

                    <button
                      onClick={(e) => handleShare(e, item._id, item.title)}
                      className="px-3 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-tvk-red font-black text-[11px] rounded-lg inline-flex items-center gap-1 transition-colors duration-150"
                    >
                      <Share2 className="w-3 h-3" />
                      <span>{copiedId === item._id ? 'Copied!' : 'Share'}</span>
                    </button>
                  </div>
                </div>

                {/* Verification Footer */}
                <div className="p-3 bg-amber-50 border-t border-amber-200 text-center flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[11px] font-black text-slate-800 uppercase tracking-wider">TVK IT Cell Verified Official Release</span>
                </div>
              </article>
            ))}
          </div>
        )}

      </section>

      {/* INTERACTIVE MEDIA LIGHTBOX MODAL */}
      {activeMedia && (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-slate-950 text-white rounded-3xl overflow-hidden border border-amber-400/40 shadow-2xl space-y-4">
            
            {/* Modal Header */}
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-tvk-red text-white text-[11px] font-black uppercase rounded-full">
                  {activeMedia.category}
                </span>
                <span className="text-xs text-slate-400 font-bold">{activeMedia.source}</span>
              </div>
              <button
                onClick={closeMedia}
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-tvk-red text-white flex items-center justify-center transition-colors duration-150"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Media Content Body */}
            <div className="p-4 space-y-4">
              {/* PHOTO GALLERY CAROUSEL OR SINGLE IMAGE */}
              <div className="space-y-3">
                <div className="relative h-[50vh] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
                  <img
                    src={activeMedia.gallery ? activeMedia.gallery[galleryIndex] : activeMedia.imageUrl}
                    alt={activeMedia.title}
                    className="w-full h-full object-contain"
                  />

                  {/* Next / Prev Controls */}
                  {activeMedia.gallery && activeMedia.gallery.length > 1 && (
                    <>
                      <button
                        onClick={() => setGalleryIndex((prev) => (prev > 0 ? prev - 1 : activeMedia.gallery.length - 1))}
                        className="absolute left-3 p-2 rounded-full bg-black/70 hover:bg-tvk-red text-white transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setGalleryIndex((prev) => (prev < activeMedia.gallery.length - 1 ? prev + 1 : 0))}
                        className="absolute right-3 p-2 rounded-full bg-black/70 hover:bg-tvk-red text-white transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Row */}
                {activeMedia.gallery && activeMedia.gallery.length > 1 && (
                  <div className="flex gap-2 justify-center">
                    {activeMedia.gallery.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setGalleryIndex(idx)}
                        className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                          galleryIndex === idx ? 'border-tvk-yellow scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={imgUrl} alt="thumb" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Title & Description */}
              <div className="p-2 space-y-2">
                <h2 className="text-lg font-extrabold text-white">{activeMedia.title}</h2>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">{activeMedia.summary}</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-bold">
              <span>{activeMedia.timeAgo}</span>
              <button
                onClick={(e) => handleShare(e, activeMedia._id, activeMedia.title)}
                className="px-4 py-2 bg-tvk-red text-white font-black rounded-xl inline-flex items-center gap-1.5 hover:bg-tvk-darkred transition-colors"
              >
                <Share2 className="w-4 h-4 text-tvk-yellow" />
                <span>{copiedId === activeMedia._id ? 'Copied Link!' : 'Share Photo Story'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

      <PCFooter />
    </div>
  );
};
