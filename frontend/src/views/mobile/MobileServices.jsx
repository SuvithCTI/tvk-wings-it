import React, { useState, useEffect } from 'react';
import { MobileHeader } from './MobileHeader';
import { MobileBottomNav } from './MobileBottomNav';
import { getServicesApi } from '../../services/api';
import { CheckCircle2, Tag, ShieldCheck, PhoneCall } from 'lucide-react';

const categoryImages = {
  'Revenue Services': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=50&w=400&auto=format&fit=crop',
  'Social Welfare': 'https://images.unsplash.com/photo-1581579438747-1dc8d1e2899f?q=50&w=400&auto=format&fit=crop',
  'Education': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=50&w=400&auto=format&fit=crop',
  'Legal Aid': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=50&w=400&auto=format&fit=crop',
  'Healthcare': 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=50&w=400&auto=format&fit=crop',
  'Women Empowerment': 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=50&w=400&auto=format&fit=crop',
  'Digital & Career': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=50&w=400&auto=format&fit=crop',
  'Sanitation & Civic': 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?q=50&w=400&auto=format&fit=crop'
};

const defaultServices = [
  {
    _id: 'srv_1',
    title: 'Digital E-Patta & Land Registry Help Desk',
    tamilTitle: 'மின்-பட்டா மற்றும் நிலப் பதிவு உதவி மையம்',
    category: 'Revenue Services',
    description: 'Direct assistance for land patta transfer, encumbrance certificate (EC), digital boundary verification, and revenue document application.',
    benefits: ['Free online application filing', 'Fast-track revenue department follow-up', 'Real-time SMS status tracking'],
    image: categoryImages['Revenue Services']
  },
  {
    _id: 'srv_2',
    title: 'Senior Citizen & Widow Pension Portal',
    tamilTitle: 'முதியோர் மற்றும் விதவை ஓய்வூதிய உதவி',
    category: 'Social Welfare',
    description: 'On-spot documentation support for senior citizen monthly pension schemes, widow financial aid, and disability welfare grants.',
    benefits: ['Monthly direct bank transfer guidance', 'Doorstep document collection for elderly', 'Zero processing fee'],
    image: categoryImages['Social Welfare']
  },
  {
    _id: 'srv_3',
    title: 'TVK Youth Education & Exam Scholarship',
    tamilTitle: 'மாணவர் கல்வி உதவித்தொகை & போட்டித் தேர்வு உதவி',
    category: 'Education',
    description: 'Financial aid for higher secondary students, laptop assistance, and free coaching for TNPSC, SSC, Railway & Bank competitive exams.',
    benefits: ['100% Merit-based educational scholarship', 'Free study material & practice mock tests', 'Expert guidance by TVK Academic Cell'],
    image: categoryImages['Education']
  },
  {
    _id: 'srv_4',
    title: 'Constituency Free Legal Aid Cell',
    tamilTitle: 'இலவச சட்ட உதவி மையம்',
    category: 'Legal Aid',
    description: 'Pro-bono legal consultation by TVK Legal Cell advocates for land disputes, civil rights, police guidance, and consumer protection.',
    benefits: ['Experienced TVK advocate panel', '100% Confidential consultation', 'Court filing & documentation guidance'],
    image: categoryImages['Legal Aid']
  },
  {
    _id: 'srv_5',
    title: 'TVK 24/7 Blood Donor & Emergency Ambulance Desk',
    tamilTitle: 'குருதிக்கொடை மற்றும் அவசர ஆம்புலன்ஸ் சேவை',
    category: 'Healthcare',
    description: 'Instant connection to 50,000+ TVK volunteer blood donors and emergency ambulance dispatch for hospital surgeries and trauma care.',
    benefits: ['24/7 Emergency donor matching', 'Rare blood group availability', 'Free ambulance coordinate service'],
    image: categoryImages['Healthcare']
  },
  {
    _id: 'srv_6',
    title: 'TVK Women Livelihood & Sewing Machine Scheme',
    tamilTitle: 'மகளிர் வாழ்வாதார தையல் இயந்திர திட்டம்',
    category: 'Women Empowerment',
    description: 'Distribution of free motorized sewing machines, cottage industry training, and micro-grant support for rural women self-help groups.',
    benefits: ['Free motorized sewing equipment', 'Skill certification for self-employment', 'Self-help group micro-credit guidance'],
    image: categoryImages['Women Empowerment']
  },
  {
    _id: 'srv_7',
    title: 'TVK Youth IT Skill & Coding Bootcamp',
    tamilTitle: 'இளைஞர் தகவல் தொழில்நுட்ப பயிற்சி மையம்',
    category: 'Digital & Career',
    description: 'Free computer literacy, web development, coding bootcamps, and resume preparation courses for unemployed constituency youth.',
    benefits: ['Hands-on software training', 'Industry career placement guidance', 'Free certificate upon completion'],
    image: categoryImages['Digital & Career']
  },
  {
    _id: 'srv_8',
    title: 'RO Pure Water & Civic Infrastructure Redressal',
    tamilTitle: 'தூய்மை குடிநீர் & நகர்ப்புற குறைகேள் சேவை',
    category: 'Sanitation & Civic',
    description: 'Request community RO purified drinking water installation, street light repair, and underground drainage escalation in your ward.',
    benefits: ['Prompt civic escalation to authorities', 'Clean drinking water access', 'Ward-level monitoring by TVK volunteers'],
    image: categoryImages['Sanitation & Civic']
  }
];

export const MobileServices = () => {
  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    getServicesApi().then((res) => {
      if (res.data && res.data.success && res.data.services && res.data.services.length > 0) {
        const apiTitles = new Set(res.data.services.map(s => s.title));
        const missingDefaults = defaultServices.filter(d => !apiTitles.has(d.title));
        setServices([...res.data.services, ...missingDefaults]);
      }
    }).catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#6D0B0F] via-tvk-red to-[#4A070A] text-white flex flex-col font-sans pb-24 selection:bg-tvk-yellow selection:text-tvk-dark">
      <MobileHeader />

      {/* MOBILE YELLOW THEME HEADER BANNER (COMPACT HEIGHT) */}
      <section className="bg-gradient-to-b from-tvk-yellow via-amber-400 to-yellow-400 text-slate-950 p-3 text-center border-b-4 border-tvk-red shadow-md space-y-0.5">
        <span className="px-2.5 py-0.5 bg-tvk-red text-white text-[10px] font-black uppercase rounded-full inline-block">
          Citizen Welfare Services · மக்கள் நலச் சேவைகள்
        </span>
        <h1 className="text-lg font-black text-slate-950">WELFARE & CITIZEN SERVICES</h1>
        <p className="text-[11px] text-slate-900 font-semibold">Statewide constituency welfare schemes & direct citizen helpline</p>
      </section>

      {/* Services 2-Column Grid */}
      <div className="p-3 grid grid-cols-2 gap-3 flex-1">
        {services.map((srv) => {
          const cardBg = srv.image || srv.imageUrl || categoryImages[srv.category] || '/tvkflag.png';
          return (
            <div
              key={srv._id}
              className="relative overflow-hidden bg-white text-slate-950 p-3 rounded-2xl shadow-md border-2 border-amber-300 flex flex-col justify-between h-full space-y-2 active:scale-[0.98] transition-transform duration-150 transform-gpu"
            >
              {/* Background Image Container */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none transform-gpu"
                style={{ backgroundImage: `url(${cardBg})` }}
              />
              {/* Gradient Overlay for high readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-amber-50/85 pointer-events-none" />

              {/* Content Layer */}
              <div className="relative z-10 flex-1 flex flex-col justify-between space-y-2">
                <div className="space-y-1.5">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between gap-1 border-b border-amber-100 pb-1.5">
                    <span className="px-2 py-0.5 bg-rose-50 text-tvk-red border border-rose-200 text-[9px] font-extrabold rounded-full flex items-center gap-1 shadow-xs truncate">
                      <Tag className="w-2 h-2 text-tvk-red shrink-0" />
                      <span className="truncate max-w-[80px]">{srv.category}</span>
                    </span>
                    
                    <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[8.5px] font-black rounded-full flex items-center gap-0.5 shrink-0">
                      <CheckCircle2 className="w-2 h-2 text-emerald-600 shrink-0" />
                      Active
                    </span>
                  </div>

                  {/* Titles */}
                  <div>
                    <h3 className="font-black text-xs text-slate-950 leading-snug line-clamp-2">
                      {srv.title}
                    </h3>
                    <p className="font-tamil text-[10px] font-bold text-tvk-red mt-0.5 line-clamp-1">
                      {srv.tamilTitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-[10.5px] text-slate-800 font-medium leading-tight line-clamp-2">
                    {srv.description}
                  </p>

                  {/* Key Benefits Highlight */}
                  {srv.benefits && srv.benefits.length > 0 && (
                    <div className="bg-amber-50 p-1.5 rounded-lg border border-amber-200 space-y-0.5 shadow-xs">
                      <div className="flex items-center gap-1 text-[9.5px] font-extrabold text-slate-900 leading-tight">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                        <span className="line-clamp-1">{srv.benefits[0]}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Service Card Verified Footer */}
                <div className="pt-2 border-t border-amber-100 flex flex-col gap-1 text-xs">
                  <div className="flex items-center gap-1 text-slate-900 font-extrabold text-[9px]">
                    <ShieldCheck className="w-3 h-3 text-tvk-red shrink-0" />
                    <span>TVK Verified Scheme</span>
                  </div>
                  <a
                    href="tel:9876543210"
                    className="py-1 px-2 bg-rose-50 hover:bg-rose-100 text-tvk-red border border-rose-200 font-black text-[10px] rounded-lg flex items-center justify-center gap-1 transition-colors duration-150 shadow-xs"
                  >
                    <PhoneCall className="w-2.5 h-2.5" />
                    <span>Helpline: 9876543210</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <MobileBottomNav />
    </div>
  );
};
