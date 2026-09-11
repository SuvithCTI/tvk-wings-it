import React from 'react';
import { Link } from 'react-router-dom';
import { MobileHeader } from './MobileHeader';
import { MobileBottomNav } from './MobileBottomNav';
import { Flame, Shield, Users, Heart, ArrowRight, Wrench, Eye, Quote, Sparkles, Landmark, Globe, HeartHandshake, Scale, Leaf } from 'lucide-react';

export const MobileIdeology = () => {
  const ideologyServices = [
    {
      title: 'E-Patta & Legal Rights Help Desk',
      pillar: 'Secular Social Justice',
      desc: 'Free land patta guidance, revenue support, and advocate panel for all citizens.',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=50&w=400&auto=format&fit=crop'
    },
    {
      title: '24/7 Digital Grievance Portal',
      pillar: 'Transparent Governance',
      desc: 'Zero-corruption digital portal for civic issue escalations & RO water requests.',
      image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?q=50&w=400&auto=format&fit=crop'
    },
    {
      title: 'Student Scholarships & Skill Bootcamps',
      pillar: 'Youth Empowerment',
      desc: 'Merit awards, night study centers, and free computer coding labs.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=50&w=400&auto=format&fit=crop'
    },
    {
      title: 'Women Livelihood Equipment Scheme',
      pillar: 'Women Welfare',
      desc: 'Free motorized sewing machines and self-help group financial tools.',
      image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=50&w=400&auto=format&fit=crop'
    },
    {
      title: '24/7 Blood Donor & Emergency Ambulance Desk',
      pillar: 'Humanitarian Care',
      desc: '50,000+ registered volunteer blood donors and mobile health clinics.',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=50&w=400&auto=format&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-24 selection:bg-tvk-red selection:text-white">
      <MobileHeader />

      {/* SECTION 1: HERO BANNER */}
      <section className="bg-gradient-to-b from-tvk-dark via-[#6D0B0F] to-slate-950 text-white p-3.5 text-center border-b-4 border-tvk-red shadow relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none"
          style={{ backgroundImage: `url('/tvk_hero_bg_flag.png')` }}
        />
        <div className="relative z-10 space-y-0.5">
          <h1 className="text-lg font-black text-white leading-tight">TAMILAGA VETTRI KAZHAGAM</h1>
          <h2 className="text-sm font-black text-tvk-yellow font-tamil">கொள்கைகள் & கோட்பாடுகள்</h2>
          <p className="font-tamil text-xs font-bold text-tvk-yellow mt-0.5">"நிமிர்ந்து நில்... துணிந்து செல்..."</p>
        </div>
      </section>

      <div className="p-3.5 space-y-4">
        {/* SECTION 1 CONTINUED: IDEOLOGICAL CORE PRINCIPLES */}
        <div className="space-y-2.5">
          <span className="px-2.5 py-0.5 bg-rose-50 text-tvk-red text-[10px] font-black uppercase rounded-full border border-rose-200 inline-block">
            Ideological Core Principles
          </span>
          <h2 className="text-base font-black text-slate-900">Pillars of TVK Political Vision</h2>

          {/* Card 1: TVK Flag Red */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#8B090E] via-tvk-red to-[#6D0B0F] text-white p-3.5 rounded-2xl shadow-md border-2 border-amber-400/40 space-y-2 active:scale-[0.99] transition-transform">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none"
              style={{ backgroundImage: `url('/tvk_hero_bg_flag.png')` }}
            />
            <div className="relative z-10 space-y-1.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-300 text-slate-950 flex items-center justify-center border border-amber-200 shadow-sm shrink-0">
                <Flame className="w-5 h-5 text-tvk-red drop-shadow-xs fill-tvk-yellow/30" />
              </div>
              <div>
                <h3 className="font-black text-sm text-white">Secular Social Justice</h3>
                <p className="font-tamil text-[11px] font-bold text-tvk-yellow">மதச்சார்பற்ற சமூக நீதி</p>
              </div>
              <p className="text-xs text-slate-100 font-medium">Uncompromising equality across all communities and state rights protection.</p>
            </div>
          </div>

          {/* Card 2: TVK Flag Gold / Yellow */}
          <div className="relative overflow-hidden bg-gradient-to-br from-tvk-yellow via-amber-400 to-yellow-500 text-slate-950 p-3.5 rounded-2xl shadow-md border-2 border-tvk-red/40 space-y-2 active:scale-[0.99] transition-transform">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none"
              style={{ backgroundImage: `url('/tvk_hero_bg_flag.png')` }}
            />
            <div className="relative z-10 space-y-1.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-tvk-red via-rose-600 to-red-700 text-white flex items-center justify-center border border-rose-300 shadow-sm shrink-0">
                <Shield className="w-5 h-5 text-tvk-yellow drop-shadow-xs fill-tvk-yellow/20" />
              </div>
              <div>
                <h3 className="font-black text-sm text-slate-950">Transparent Governance</h3>
                <p className="font-tamil text-[11px] font-bold text-tvk-red">வெளிப்படையான நிர்வாகம்</p>
              </div>
              <p className="text-xs text-slate-900 font-semibold">Zero tolerance for corruption with digital grievance monitoring.</p>
            </div>
          </div>

          {/* Card 3: TVK Flag Deep Red / Maroon */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#4A070A] via-[#7E0D12] to-tvk-darkred text-white p-3.5 rounded-2xl shadow-md border-2 border-amber-400/40 space-y-2 active:scale-[0.99] transition-transform">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none"
              style={{ backgroundImage: `url('/tvk_hero_bg_flag.png')` }}
            />
            <div className="relative z-10 space-y-1.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-300 text-slate-950 flex items-center justify-center border border-amber-200 shadow-sm shrink-0">
                <Users className="w-5 h-5 text-tvk-red drop-shadow-xs fill-tvk-yellow/30" />
              </div>
              <div>
                <h3 className="font-black text-sm text-white">Youth & Women First</h3>
                <p className="font-tamil text-[11px] font-bold text-tvk-yellow">இளைஞர் & மகளிர் முன்னேற்றம்</p>
              </div>
              <p className="text-xs text-slate-100 font-medium">Free skill development bootcamps, scholarships, and women self-reliance.</p>
            </div>
          </div>
        </div>

        {/* SECTION 2: OUR VISION & OUR MISSION (BILINGUAL) */}
        <div className="space-y-4 pt-2 border-t border-slate-200">
          <span className="px-2.5 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-black uppercase rounded-full border border-amber-200 inline-block">
            Section 2: Vision & Mission
          </span>

          {/* Card 1: Our Vision */}
          <div className="bg-gradient-to-br from-tvk-red via-[#A80D13] to-[#6D0B0F] text-white p-4 rounded-2xl shadow-md border-2 border-tvk-yellow/30 space-y-3 relative overflow-hidden active:scale-[0.99] transition-transform">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none"
              style={{ backgroundImage: `url('/tvk_hero_bg_flag.png')` }}
            />
            <div className="relative z-10 space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shrink-0">
                  <Eye className="w-4 h-4 text-tvk-yellow" />
                </div>
                <div>
                  <h2 className="text-sm font-black text-tvk-yellow leading-tight font-tamil">
                    நம்முடைய பார்வை <span className="text-white font-sans font-light">|</span> <span className="font-sans">Our Vision</span>
                  </h2>
                </div>
              </div>

              <div className="space-y-2">
                <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/20">
                  <p className="font-tamil text-xs font-extrabold text-white leading-relaxed">
                    தமிழக வெற்றி கழகம் மக்களுடன் இணைந்து, நவீன தொழில்நுட்பத்தின் வழியிலாக சமவெளி அடிப்படையிலான, தமிழ் மொழியை மதிக்கும் ஆட்சியை நிலைநாட்டுவதை நோக்கமாகக் கொண்டுள்ளது.
                  </p>
                </div>
                <div className="px-0.5">
                  <p className="text-[11px] font-medium text-amber-100/90 leading-relaxed">
                    TVK envisions a governance system that respects Tamil language, maintains democratic equality, and leverages technology for people's welfare. We are committed to building a better Tamil Nadu for all citizens.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Our Mission / நம்முடைய லட்சியம் (BILINGUAL TAMIL + ENGLISH) */}
          <div className="bg-gradient-to-br from-tvk-red via-[#A80D13] to-[#6D0B0F] text-white p-4 rounded-2xl shadow-md border-2 border-tvk-yellow/30 space-y-3 relative overflow-hidden active:scale-[0.99] transition-transform">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none"
              style={{ backgroundImage: `url('/tvk_hero_bg_flag.png')` }}
            />
            <div className="relative z-10 space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shrink-0">
                  <Quote className="w-4 h-4 text-tvk-yellow" />
                </div>
                <div>
                  <h2 className="text-sm font-black text-tvk-yellow leading-tight font-tamil">
                    நம்முடைய லட்சியம் <span className="text-white font-sans font-light">|</span> <span className="font-sans">Our Mission</span>
                  </h2>
                </div>
              </div>

              <div className="space-y-2">
                <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/20 space-y-1">
                  <h3 className="font-tamil text-xs font-black text-tvk-yellow leading-snug">
                    "பார்வை என்பது மக்களின் நம்பிக்கையாக மாற வேண்டும்."
                  </h3>
                  <p className="font-tamil text-[11px] font-bold text-amber-100/95 leading-relaxed">
                    மக்களை மையமாகக் கொண்ட ஒரு அரசியல் இயக்கம் வளர்ச்சியைப் பற்றி பேசுவதுடன் நின்றுவிடக் கூடாது. அது தன் நிர்வாகத்தில் கண்ணியம், அணுகல்தன்மை, நேர்மை மற்றும் பொறுப்புணர்வை வெளிப்படையாகக் காட்ட வேண்டும்.
                  </p>
                </div>

                <div className="space-y-0.5 px-0.5">
                  <h4 className="text-xs font-black text-white leading-snug">
                    "Vision must translate into public confidence."
                  </h4>
                  <p className="text-[11px] font-medium text-amber-100/90 leading-relaxed">
                    A people-centered political movement should not only speak of progress. It should make dignity, access, fairness, and accountability visible in the way it governs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2.5: OUR CORE VALUES / அடிப்படை மதிப்புகள் */}
        <div className="space-y-3 pt-2 border-t border-slate-200">
          <div className="space-y-1">
            <span className="px-2 py-0.5 bg-rose-50 text-tvk-red text-[10px] font-black uppercase rounded-full border border-rose-200 inline-block">
              TVK Foundation Values
            </span>
            <h2 className="text-base font-black text-tvk-red leading-tight">
              Our Core Values <span className="text-slate-900 font-sans font-light">|</span> <span className="font-tamil">அடிப்படை மதிப்புகள்</span>
            </h2>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              These values define how TVK approaches governance, public communication, development, and citizen participation.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* 1. Democracy */}
            <div className="relative overflow-hidden bg-gradient-to-br from-rose-50/90 via-white to-red-50/70 p-3 rounded-2xl shadow-md border-2 border-rose-200 border-b-4 border-b-tvk-red space-y-2 active:scale-[0.99] transition-transform">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-tvk-red to-[#8B090E] text-tvk-yellow flex items-center justify-center border border-rose-300 shadow-sm shrink-0">
                  <Landmark className="w-4 h-4 text-tvk-yellow" />
                </div>
                <div>
                  <h3 className="font-black text-xs text-tvk-red">Democracy</h3>
                  <p className="font-tamil text-[10px] font-bold text-amber-600">ஜனநாயகம்</p>
                </div>
              </div>
              <p className="text-[10px] text-slate-700 font-medium">Commitment to democratic principles and citizen participation in governance.</p>
            </div>

            {/* 2. Technology */}
            <div className="relative overflow-hidden bg-gradient-to-br from-amber-50/90 via-white to-yellow-50/70 p-3 rounded-2xl shadow-md border-2 border-amber-200 border-b-4 border-b-tvk-yellow space-y-2 active:scale-[0.99] transition-transform">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-tvk-yellow via-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center border border-amber-200 shadow-sm shrink-0">
                  <Globe className="w-4 h-4 text-tvk-red" />
                </div>
                <div>
                  <h3 className="font-black text-xs text-slate-900">Technology</h3>
                  <p className="font-tamil text-[10px] font-bold text-tvk-red">தொழில்நுட்பம்</p>
                </div>
              </div>
              <p className="text-[10px] text-slate-800 font-semibold">Leveraging innovation for transparent and efficient public services.</p>
            </div>

            {/* 3. Tamil Pride */}
            <div className="relative overflow-hidden bg-gradient-to-br from-red-50/90 via-white to-amber-50/70 p-3 rounded-2xl shadow-md border-2 border-red-200 border-b-4 border-b-tvk-red space-y-2 active:scale-[0.99] transition-transform">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-tvk-red to-[#8B090E] text-tvk-yellow flex items-center justify-center border border-rose-300 shadow-sm shrink-0">
                  <span className="font-tamil font-black text-[10px] text-tvk-yellow">தமிழ்</span>
                </div>
                <div>
                  <h3 className="font-black text-xs text-tvk-red">Tamil Pride</h3>
                  <p className="font-tamil text-[10px] font-bold text-amber-600">தமிழ் பெருமை</p>
                </div>
              </div>
              <p className="text-[10px] text-slate-700 font-medium">Respecting and promoting Tamil language, culture, and heritage.</p>
            </div>

            {/* 4. People First */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-50/90 via-white to-indigo-50/70 p-3 rounded-2xl shadow-md border-2 border-blue-200 border-b-4 border-b-blue-600 space-y-2 active:scale-[0.99] transition-transform">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-700 text-white flex items-center justify-center border border-blue-300 shadow-sm shrink-0">
                  <HeartHandshake className="w-4 h-4 text-tvk-yellow" />
                </div>
                <div>
                  <h3 className="font-black text-xs text-blue-900">People First</h3>
                  <p className="font-tamil text-[10px] font-bold text-blue-600">மக்கள் முதன்மை</p>
                </div>
              </div>
              <p className="text-[10px] text-slate-700 font-medium">Prioritizing citizen welfare and community development in all decisions.</p>
            </div>

            {/* 5. Equality */}
            <div className="relative overflow-hidden bg-gradient-to-br from-rose-50/90 via-white to-amber-50/70 p-3 rounded-2xl shadow-md border-2 border-rose-200 border-b-4 border-b-tvk-red space-y-2 active:scale-[0.99] transition-transform">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-tvk-red to-[#8B090E] text-tvk-yellow flex items-center justify-center border border-rose-300 shadow-sm shrink-0">
                  <Scale className="w-4 h-4 text-tvk-yellow" />
                </div>
                <div>
                  <h3 className="font-black text-xs text-tvk-red">Equality</h3>
                  <p className="font-tamil text-[10px] font-bold text-amber-600">சமத்துவம்</p>
                </div>
              </div>
              <p className="text-[10px] text-slate-700 font-medium">Ensuring equal opportunities and justice for all communities.</p>
            </div>

            {/* 6. Sustainability */}
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/70 p-3 rounded-2xl shadow-md border-2 border-emerald-200 border-b-4 border-b-emerald-600 space-y-2 active:scale-[0.99] transition-transform">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-700 text-white flex items-center justify-center border border-emerald-300 shadow-sm shrink-0">
                  <Leaf className="w-4 h-4 text-tvk-yellow" />
                </div>
                <div>
                  <h3 className="font-black text-xs text-emerald-900">Sustainability</h3>
                  <p className="font-tamil text-[10px] font-bold text-emerald-600">நிலையான வளர்ச்சி</p>
                </div>
              </div>
              <p className="text-[10px] text-slate-700 font-medium">Environmental conservation and sustainable development practices.</p>
            </div>
          </div>
        </div>



        {/* Apply CTA Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-tvk-red to-tvk-dark text-white p-5 rounded-2xl text-center space-y-3 shadow-lg border border-tvk-yellow/30">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none"
            style={{ backgroundImage: `url('/tvk_hero_bg_flag.png')` }}
          />
          <div className="relative z-10 space-y-2">
            <h3 className="font-tamil text-base font-black text-tvk-yellow">
              "தமிழக மக்களுக்கு நேர்மையான સેવા!"
            </h3>
            <p className="text-xs text-slate-100 font-medium">
              Transparent digital governance and constituency welfare services.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-tvk-yellow text-slate-950 text-xs font-black rounded-xl shadow uppercase tracking-wider"
            >
              <Wrench className="w-4 h-4 text-tvk-red" />
              <span>Explore All Services</span>
            </Link>
          </div>
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
};
