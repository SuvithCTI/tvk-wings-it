import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MobileHeader } from './MobileHeader';
import { MobileBottomNav } from './MobileBottomNav';
import { getDevelopmentsApi } from '../../services/api';
import { Tag, MapPin, ChevronDown, ChevronUp, CheckCircle2, Radio, Newspaper } from 'lucide-react';

const defaultDevelopments = [
  // Education (2 items)
  {
    _id: 'dev_tvk_1',
    title: 'TVK State-Wide Student Academic Excellence & Merit Award (கல்வி விருது)',
    category: 'Education',
    description: 'Annual state-wide honor and financial assistance program instituted by TVK President Thalapathy Vijay for 10th & 12th toppers across all 234 Tamil Nadu constituencies.',
    location: 'Statewide (All 234 Constituencies)',
    status: 'Completed',
    budget: '₹ 12.5 Crore',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80'
  },
  {
    _id: 'dev_tvk_4',
    title: 'TVK Night Study Centers & Free Libraries (மாலை நேர பயிலரங்கம்)',
    category: 'Education',
    description: '150+ neighborhood night study centers with solar lighting, textbooks, stationery, and volunteer tutors for underprivileged government school students.',
    location: 'Chennai, Madurai, Erode & Tirunelveli',
    status: 'Completed',
    budget: '₹ 6.8 Crore',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80'
  },
  // Healthcare (2 items)
  {
    _id: 'dev_tvk_5',
    title: 'TVK Flagship Mobile Health Clinics & Emergency Medical Support (மருத்துவ முகாம்)',
    category: 'Healthcare',
    description: 'Deployment of specialized mobile healthcare vans offering free health checkups, diagnostic testing, emergency medical aid, and free medicine distribution.',
    location: 'Erode, Madurai, Chennai & Chengalpattu',
    status: 'Completed',
    budget: '₹ 8.2 Crore',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80'
  },
  {
    _id: 'dev_tvk_3',
    title: 'TVK Thalapathy Blood Donor Express & Emergency Registry (குருதிக்கொடை)',
    category: 'Healthcare',
    description: '24/7 emergency blood donation app and network connecting 50,000+ registered TVK volunteer blood donors with hospital emergency wards instantly.',
    location: 'Statewide - All 38 Districts',
    status: 'Completed',
    budget: '₹ 3.2 Crore',
    imageUrl: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=600&q=80'
  },
  // Infrastructure (2 items)
  {
    _id: 'dev_1',
    title: 'Thiruparankundram Smart Ring Road Phase-1',
    category: 'Infrastructure',
    description: 'Widening of key access routes and installation of high-mast LED lights and smart traffic monitoring.',
    location: 'Thiruparankundram Junction, Madurai',
    status: 'In Progress',
    budget: '₹ 14.5 Crore',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80'
  },
  {
    _id: 'dev_tvk_10',
    title: 'TVK Women Self-Reliance & Livelihood Equipment Program (மகளிர் வாழ்வாதாரம்)',
    category: 'Infrastructure',
    description: 'Empowering rural women and self-help groups by distributing free motorized sewing machines, food processing units, and micro-business toolkits.',
    location: 'Kallakurichi, Namakkal & Madurai',
    status: 'Completed',
    budget: '₹ 5.0 Crore',
    imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80'
  },
  // Sanitation (2 items)
  {
    _id: 'dev_tvk_6',
    title: 'TVK Clean Drinking Water RO Kiosks & Flood Relief Units (குடிநீர் & நிவாரணம்)',
    category: 'Sanitation',
    description: 'Solar-powered community RO water plants providing pure drinking water 24/7 along with emergency flood relief kits during heavy monsoons.',
    location: 'Chennai, Tiruvallur & Kancheepuram',
    status: 'Completed',
    budget: '₹ 9.8 Crore',
    imageUrl: '/water_ro_kiosk.jpg'
  },
  {
    _id: 'dev_tvk_7',
    title: 'TVK Green Tamil Nadu Tree Plantation & Bio-Park Movement (பசுமைத் தமிழகம்)',
    category: 'Sanitation',
    description: 'Planting 1 Lakh native tree saplings, Miyawaki urban forest creation, and rainwater harvesting structures in public schools and parks.',
    location: 'Coimbatore, Salem, Trichy & Vellore',
    status: 'In Progress',
    budget: '₹ 5.4 Crore',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80'
  },
  // Digital (2 items)
  {
    _id: 'dev_tvk_2',
    title: 'TVK 24x7 Digital IT Cell & Citizen Grievance Portal (டிஜிட்டல் புகார் மையம்)',
    category: 'Digital',
    description: 'Real-time digital grievance tracking system enabling public to register infrastructure, civic, and legal issues directly to TVK IT Cell leaders.',
    location: 'Statewide IT Cell Network',
    status: 'Completed',
    budget: '₹ 4.5 Crore',
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80'
  },
  {
    _id: 'dev_tvk_9',
    title: 'TVK Free Legal Rights Aid & Consumer Guidance Cell (இலவச சட்ட உதவி மையம்)',
    category: 'Digital',
    description: 'Panel of TVK advocate volunteers providing free legal aid, police helpline guidance, and land documentation support for vulnerable families.',
    location: 'Statewide Legal Wing Headquarters',
    status: 'Completed',
    budget: '₹ 2.8 Crore',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80'
  }
];

const categoryFallbacks = {
  'Education': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
  'Healthcare': 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
  'Infrastructure': 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
  'Sanitation': '/water_ro_kiosk.jpg',
  'Digital': 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80'
};

const CATEGORIES = ['All', 'Infrastructure', 'Healthcare', 'Education', 'Sanitation', 'Digital'];

export const MobileDevelopments = () => {
  const [developments, setDevelopments] = useState(defaultDevelopments);
  const [activeTab, setActiveTab] = useState('All');
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    let isMounted = true;
    getDevelopmentsApi().then((res) => {
      if (isMounted && res.data && res.data.success && res.data.developments && res.data.developments.length > 0) {
        const defaultMap = new Map(defaultDevelopments.map(d => [d.title.trim().toLowerCase(), d]));
        res.data.developments.forEach(apiItem => {
          if (apiItem.title) {
            const key = apiItem.title.trim().toLowerCase();
            if (defaultMap.has(key)) {
              const existing = defaultMap.get(key);
              const validApiImg = (apiItem.imageUrl && (apiItem.imageUrl.startsWith('http') || apiItem.imageUrl.startsWith('/'))) ? apiItem.imageUrl : null;
              const imageUrl = validApiImg || existing.imageUrl || categoryFallbacks[apiItem.category] || categoryFallbacks['Education'];
              defaultMap.set(key, { ...existing, ...apiItem, imageUrl });
            }
          }
        });
        setDevelopments(Array.from(defaultMap.values()));
      }
    }).catch((err) => console.error(err));

    return () => { isMounted = false; };
  }, []);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setShowMore(false);
  }, []);

  const baseFiltered = useMemo(() => {
    if (activeTab === 'All') return developments;
    return developments.filter(d => d.category && d.category.toLowerCase() === activeTab.toLowerCase());
  }, [developments, activeTab]);

  const visibleProjects = useMemo(() => {
    if (activeTab === 'All' && !showMore) {
      return baseFiltered.slice(0, 4);
    }
    return baseFiltered;
  }, [activeTab, showMore, baseFiltered]);

  return (
    <div className="min-h-screen bg-amber-100/70 text-slate-950 flex flex-col font-sans pb-20">
      <MobileHeader />

      {/* MOBILE HEADER BANNER: RED THEME (COMPACT HEIGHT) */}
      <section className="bg-gradient-to-b from-[#6D0B0F] via-tvk-red to-[#4A070A] text-white p-4 text-center border-b-4 border-tvk-yellow shadow-md space-y-2">
        <h1 className="text-xl font-black text-white mt-0.5">Constituency Projects</h1>
        <p className="text-xs text-red-100 font-medium">TVK Development Works</p>
        
        <div className="pt-1 flex justify-center">
          <Link
            to="/live-news"
            className="w-full py-2 bg-tvk-yellow text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2"
          >
            <Radio className="w-3.5 h-3.5 text-tvk-red animate-pulse" />
            <span>Open Live News Feed · நேரலை</span>
          </Link>
        </div>
      </section>

      {/* Touch Filter Pills */}
      <div className="p-3.5 overflow-x-auto flex gap-2 no-scrollbar">
        {CATEGORIES.map((tab) => {
          const isSelected = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-black shrink-0 transition-colors duration-150 ${
                isSelected ? 'bg-tvk-red text-white' : 'bg-white text-slate-900 border border-amber-300'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Mobile 2-Column Project Cards Grid */}
      <div className="px-3 grid grid-cols-2 gap-3">
        {visibleProjects.map((dev) => (
          <div
            key={dev._id || dev.title}
            className="bg-white rounded-2xl overflow-hidden shadow-md border-2 border-amber-300 flex flex-col justify-between h-full active:scale-[0.98] transition-transform duration-150"
          >
            {/* REALTIME IMAGE BANNER ON MOBILE */}
            {dev.imageUrl && (
              <div className="h-28 w-full relative overflow-hidden bg-slate-100 border-b border-amber-200 shrink-0">
                <img
                  src={(dev.imageUrl && dev.imageUrl.startsWith('http')) ? dev.imageUrl : (categoryFallbacks[dev.category] || categoryFallbacks['Education'])}
                  alt={dev.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = categoryFallbacks[dev.category] || categoryFallbacks['Education'];
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 bg-black/75 text-white font-extrabold text-[9px] rounded-full border border-white/20 flex items-center gap-1 shadow-xs">
                    <Tag className="w-2.5 h-2.5 text-tvk-yellow shrink-0" />
                    <span className="truncate max-w-[80px]">{dev.category}</span>
                  </span>
                </div>
              </div>
            )}

            <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
              <div className="space-y-1">
                <h3 className="font-black text-xs text-slate-950 leading-snug line-clamp-2">
                  {dev.title}
                </h3>
                <p className="text-[11px] text-slate-600 font-medium leading-tight line-clamp-2">
                  {dev.description}
                </p>
              </div>

              <div className="pt-2 border-t border-amber-100 space-y-1 text-[10px] font-bold text-slate-800">
                <div className="flex items-center gap-1 text-slate-700">
                  <MapPin className="w-2.5 h-2.5 text-tvk-red shrink-0" />
                  <span className="truncate">{dev.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[9px] font-black">
                    {dev.status || 'Active'}
                  </span>
                  <span className="font-black text-tvk-red">{dev.budget}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button for Mobile */}
      {activeTab === 'All' && baseFiltered.length > 4 && (
        <div className="mt-5 text-center px-4">
          <button
            onClick={() => setShowMore(prev => !prev)}
            className="w-full py-3 bg-tvk-red text-white text-xs font-black rounded-xl shadow-md inline-flex items-center justify-center gap-2 uppercase tracking-wider transition-colors duration-150"
          >
            <span>{showMore ? 'Show Less · சுருக்குக' : 'View More Projects · மேலும் பார்க்க'}</span>
            {showMore ? <ChevronUp className="w-4 h-4 text-tvk-yellow" /> : <ChevronDown className="w-4 h-4 text-tvk-yellow" />}
          </button>
        </div>
      )}

      <MobileBottomNav />
    </div>
  );
};
