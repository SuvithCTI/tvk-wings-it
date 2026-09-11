import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { PCHeader } from './PCHeader';
import { PCFooter } from './PCFooter';
import { getDevelopmentsApi } from '../../services/api';
import { MapPin, Tag, Clock, ChevronDown, ChevronUp, CheckCircle2, Radio, Newspaper } from 'lucide-react';

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
    imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80'
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
  'Sanitation': 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80',
  'Digital': 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80'
};

const CATEGORIES = ['All', 'Infrastructure', 'Healthcare', 'Education', 'Sanitation', 'Digital'];

export const PCDevelopments = () => {
  const [developments, setDevelopments] = useState(defaultDevelopments);
  const [activeTab, setActiveTab] = useState('All');
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    let isMounted = true;
    getDevelopmentsApi()
      .then((res) => {
        if (isMounted && res.data && res.data.success && res.data.developments && res.data.developments.length > 0) {
          const defaultMap = new Map(defaultDevelopments.map(d => [d.title.trim().toLowerCase(), d]));
          res.data.developments.forEach(apiItem => {
            if (apiItem.title) {
              const key = apiItem.title.trim().toLowerCase();
              if (defaultMap.has(key)) {
                const existing = defaultMap.get(key);
                const validApiImg = (apiItem.imageUrl && apiItem.imageUrl.startsWith('http')) ? apiItem.imageUrl : null;
                const imageUrl = validApiImg || existing.imageUrl || categoryFallbacks[apiItem.category] || categoryFallbacks['Education'];
                defaultMap.set(key, { ...existing, ...apiItem, imageUrl });
              }
            }
          });
          setDevelopments(Array.from(defaultMap.values()));
        }
      })
      .catch((err) => console.error(err));

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
      return baseFiltered.slice(0, 6);
    }
    return baseFiltered;
  }, [activeTab, showMore, baseFiltered]);

  return (
    <div className="min-h-screen bg-amber-100/70 text-slate-950 flex flex-col font-sans selection:bg-tvk-red selection:text-white">
      <PCHeader />

      {/* RED THEME HEADER BANNER (LIGHTWEIGHT & COMPACT) */}
      <section className="bg-gradient-to-r from-[#6D0B0F] via-tvk-red to-[#4A070A] text-white py-7 px-6 border-b-4 border-tvk-yellow shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h1 className="text-3xl lg:text-4xl font-black text-white leading-tight">
              TAMIL NADU <span className="text-tvk-yellow">DEVELOPMENTS</span>
            </h1>
            <p className="text-red-100 text-xs lg:text-sm font-medium leading-relaxed">
              Transparent tracking of ongoing infrastructure, healthcare, education, and digital development projects under Tamilaga Vettri Kazhagam representation.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border-2 border-tvk-yellow text-center shrink-0 w-56 shadow-md">
            <span className="block text-3xl font-black text-tvk-red">{developments.length}</span>
            <span className="block text-[11px] font-black text-slate-800 uppercase tracking-widest mt-0.5">Active Projects</span>
          </div>
        </div>
      </section>

      {/* Main Filterable Projects Section */}
      <section className="py-10 px-6 max-w-7xl mx-auto w-full flex-1">
        
        {/* Live News Callout Banner */}
        <div className="bg-gradient-to-r from-tvk-red via-[#800C11] to-[#59080B] text-white p-4 rounded-2xl border-2 border-tvk-yellow shadow-lg mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-black/40 flex items-center justify-center shrink-0 border border-tvk-yellow">
              <Radio className="w-5 h-5 text-tvk-yellow animate-pulse" />
            </div>
            <div>
              <h2 className="text-base font-black uppercase text-white tracking-wider flex items-center gap-2">
                <span>TVK LIVE NEWS & UPDATES</span>
                <span className="px-2 py-0.5 bg-tvk-yellow text-slate-950 font-black text-[10px] rounded-full uppercase">Real-Time</span>
              </h2>
              <p className="text-xs text-amber-100 font-medium mt-0.5">Stay updated with live constituency developments, Vijay announcements & IT Cell bulletins.</p>
            </div>
          </div>
          <Link
            to="/live-news"
            className="px-6 py-2.5 bg-tvk-yellow hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md inline-flex items-center gap-2 transition-transform duration-150 hover:scale-105 shrink-0"
          >
            <Newspaper className="w-4 h-4 text-tvk-red" />
            <span>Open Live News Page · நேரலை</span>
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {CATEGORIES.map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-5 py-2 rounded-full font-black text-xs uppercase tracking-wider transition-colors duration-150 ${
                  isSelected
                    ? 'bg-tvk-red text-white shadow-md'
                    : 'bg-white text-slate-900 border border-amber-300 hover:border-tvk-red hover:bg-amber-50'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((dev) => (
            <div
              key={dev._id || dev.title}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-amber-300 hover:border-tvk-red transition-transform duration-200 hover:-translate-y-1 flex flex-col justify-between group"
            >
              {/* REALTIME IMAGE BANNER */}
              {dev.imageUrl && (
                <div className="h-48 w-full relative overflow-hidden bg-slate-100 border-b border-amber-200">
                  <img
                    src={(dev.imageUrl && dev.imageUrl.startsWith('http')) ? dev.imageUrl : (categoryFallbacks[dev.category] || categoryFallbacks['Education'])}
                    alt={dev.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = categoryFallbacks[dev.category] || categoryFallbacks['Education'];
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  
                  {/* Floating Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-black/75 backdrop-blur-xs text-white font-extrabold text-[11px] rounded-full border border-white/20 flex items-center gap-1.5 shadow-sm">
                      <Tag className="w-3 h-3 text-tvk-yellow" />
                      {dev.category}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-5 space-y-3.5">
                <h3 className="font-extrabold text-lg text-slate-950 leading-snug">{dev.title}</h3>
                <p className="text-slate-700 text-xs leading-relaxed font-medium">{dev.description}</p>

                <div className="pt-3 border-t border-amber-100 space-y-1.5 text-xs text-slate-700 font-bold">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-tvk-red shrink-0" />
                    <span>{dev.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Budget: <strong className="text-tvk-red font-black">{dev.budget}</strong></span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border-t border-amber-200 text-center flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[11px] font-black text-tvk-red uppercase tracking-wider">TVK IT Cell Desk Verified</span>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button (After 2 Rows of 3 Cards = 6 Cards) */}
        {activeTab === 'All' && baseFiltered.length > 6 && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowMore(prev => !prev)}
              className="px-7 py-3 bg-tvk-red hover:bg-tvk-darkred text-white text-xs font-black rounded-full shadow-lg inline-flex items-center gap-2 uppercase tracking-wider transition-colors duration-150"
            >
              <span>{showMore ? 'Show Less · சுருக்குக' : 'View More Projects · மேலும் பார்க்க'}</span>
              {showMore ? <ChevronUp className="w-4 h-4 text-tvk-yellow" /> : <ChevronDown className="w-4 h-4 text-tvk-yellow" />}
            </button>
          </div>
        )}

      </section>

      <PCFooter />
    </div>
  );
};
