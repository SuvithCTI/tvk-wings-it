import React, { useState, useEffect } from 'react';
import { PCHeader } from './PCHeader';
import { PCFooter } from './PCFooter';
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
    title: 'TVK Higher Education Scholarship Desk',
    tamilTitle: 'உயர் கல்வி உதவித்தொகை மற்றும் வழிகாட்டல்',
    category: 'Education',
    description: 'Free guidance and document processing for underprivileged students applying for collegiate scholarships, laptops, and competitive exam books.',
    benefits: ['100% free entrance exam coaching info', 'Government hostel seat application support', 'Merit award registration'],
    image: categoryImages['Education']
  },
  {
    _id: 'srv_4',
    title: 'TVK Pro-Bono Legal Aid & Dispute Resolution',
    tamilTitle: 'இலவச சட்ட ஆலோசனை மற்றும் உதவி மையம்',
    category: 'Legal Aid',
    description: 'Free legal consultation by TVK Advocate Wing volunteers for land disputes, consumer complaints, labor rights, and police helpline assistance.',
    benefits: ['Panel of 500+ volunteer lawyers', 'Confidential legal documentation help', 'Zero legal fees'],
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

export const PCServices = () => {
  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    getServicesApi().then((res) => {
      if (res.data && res.data.success && res.data.services && res.data.services.length > 0) {
        const apiTitles = new Set(res.data.services.map(s => s.title));
        const missingDefaults = defaultServices.filter(d => !apiTitles.has(d.title));
        setServices([...res.data.services, ...missingDefaults]);
      }
    }).catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#6D0B0F] via-tvk-red to-[#4A070A] text-white flex flex-col font-sans selection:bg-tvk-yellow selection:text-tvk-dark">
      <PCHeader />

      {/* YELLOW THEME HEADER BANNER (COMPACT HEIGHT) */}
      <section className="bg-gradient-to-r from-tvk-yellow via-amber-400 to-yellow-400 text-slate-950 py-5 px-6 border-b-4 border-tvk-red shadow-md">
        <div className="max-w-7xl mx-auto space-y-1">
          <div>
            <span className="px-3 py-0.5 bg-tvk-red text-white rounded-full text-xs font-black uppercase tracking-wider shadow-xs inline-block">
              Citizen Welfare Services · மக்கள் நலச் சேவைகள்
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-slate-950 leading-tight">
            WELFARE & <span className="text-tvk-red">CITIZEN SERVICES</span>
          </h1>
          <p className="text-slate-900 text-xs font-semibold max-w-2xl leading-relaxed">
            Statewide TVK citizen assistance programs covering E-Patta land registry, senior pensions, student scholarships, and pro-bono legal consultation.
          </p>
        </div>
      </section>

      {/* Services Catalog Grid */}
      <section className="py-8 px-6 max-w-7xl mx-auto w-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((srv) => {
            const cardBg = srv.image || srv.imageUrl || categoryImages[srv.category] || '/tvkflag.png';
            return (
              <div
                key={srv._id}
                className="relative overflow-hidden bg-white text-slate-950 p-5 rounded-2xl shadow-md border-2 border-amber-300 hover:border-tvk-red transition-transform duration-200 transform-gpu group hover:-translate-y-0.5 hover:shadow-xl"
              >
                {/* Background Image Container with Hardware Acceleration */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 transform-gpu group-hover:scale-105 opacity-20 pointer-events-none will-change-transform"
                  style={{ backgroundImage: `url(${cardBg})` }}
                />
                {/* Soft Gradient Overlay for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/92 to-amber-50/90 pointer-events-none" />

                {/* Content Layer */}
                <div className="relative z-10 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2 border-b border-amber-100 pb-2.5">
                      <span className="px-2.5 py-0.5 bg-rose-50 text-tvk-red border border-rose-200 text-xs font-extrabold rounded-full flex items-center gap-1.5 shadow-xs">
                        <Tag className="w-3 h-3 text-tvk-red" />
                        {srv.category}
                      </span>
                      
                      <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-extrabold rounded-full flex items-center gap-1.5 shadow-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Active Scheme
                      </span>
                    </div>

                    {/* Titles */}
                    <div>
                      <h3 className="font-black text-lg text-slate-950 leading-tight group-hover:text-tvk-red transition-colors duration-150">
                        {srv.title}
                      </h3>
                      <p className="font-tamil text-xs font-bold text-tvk-red mt-0.5">
                        {srv.tamilTitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                      {srv.description}
                    </p>

                    {/* Key Benefits Checklist */}
                    {srv.benefits && srv.benefits.length > 0 && (
                      <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 space-y-1 shadow-xs">
                        <span className="text-[10px] font-black text-slate-900 uppercase tracking-wider block">
                          Key Assistance Highlights:
                        </span>
                        <div className="grid grid-cols-1 gap-1">
                          {srv.benefits.map((b, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Service Card Verified Footer */}
                  <div className="mt-3 pt-2.5 border-t border-amber-100 flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-900 font-extrabold text-[11px]">
                      <ShieldCheck className="w-4 h-4 text-tvk-red shrink-0" />
                      <span>TVK IT Wing Desk Verified</span>
                    </div>
                    <a
                      href="tel:9876543210"
                      className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-tvk-red border border-rose-200 font-black text-xs rounded-lg flex items-center gap-1.5 transition-colors duration-150 shadow-xs"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Helpline: 9876543210</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <PCFooter />
    </div>
  );
};
