import React from 'react';
import { Link } from 'react-router-dom';
import { PCHeader } from './PCHeader';
import { PCFooter } from './PCFooter';
import { Flame, Shield, Users, Heart, ArrowRight, Wrench, Scale, Laptop, Eye, Quote, Sparkles, Landmark, Globe, HeartHandshake, Leaf } from 'lucide-react';

export const PCIdeology = () => {
  const ideologyServices = [
    {
      pillar: 'Secular Social Justice · சமூக நீதி',
      title: 'E-Patta & Legal Rights Help Desk',
      desc: 'Ensuring land rights, revenue assistance, and pro-bono legal consultation for underprivileged families across all communities.',
      serviceName: 'Digital E-Patta & Free Legal Aid',
      icon: Scale,
      color: 'text-tvk-red',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=50&w=400&auto=format&fit=crop'
    },
    {
      pillar: 'Transparent Governance · வெளிப்படைத் தன்மை',
      title: '24/7 Digital Citizen Grievance Portal',
      desc: 'Zero-corruption digital platform enabling citizens to log civic issues and track public infrastructure progress in real-time.',
      serviceName: 'Civic Redressal & RO Water Services',
      icon: Shield,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?q=50&w=400&auto=format&fit=crop'
    },
    {
      pillar: 'Youth Empowerment · இளைஞர் எழுச்சி',
      title: 'Student Scholarships & Skill Bootcamps',
      desc: 'Empowering future generations through academic excellence awards, night study centers, and free computer coding labs.',
      serviceName: 'Youth Education & IT Skill Bootcamp',
      icon: Laptop,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=50&w=400&auto=format&fit=crop'
    },
    {
      pillar: 'Women Welfare · மகளிர் முன்னேற்றம்',
      title: 'Women Livelihood & Self-Reliance Support',
      desc: 'Direct distribution of motorized sewing machines, cottage industry machinery, and financial self-reliance tools for women.',
      serviceName: 'Women Livelihood Equipment Scheme',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=50&w=400&auto=format&fit=crop'
    },
    {
      pillar: 'Humanity & Compassion · மனிதநேயம்',
      title: 'Emergency Medical & Blood Donor Network',
      desc: '24/7 emergency blood donation app matching 50,000+ TVK volunteers and mobile health clinics for rural healthcare.',
      serviceName: '24/7 Blood Donor & Ambulance Desk',
      icon: Heart,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=50&w=400&auto=format&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-tvk-red selection:text-white">
      <PCHeader />

      {/* SECTION 1: HERO BANNER */}
      <section className="bg-gradient-to-r from-tvk-dark via-[#6D0B0F] to-slate-950 text-white py-8 px-6 relative overflow-hidden border-b-4 border-tvk-red shadow-xl">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none"
          style={{ backgroundImage: `url('/tvk_hero_bg_flag.png')` }}
        />
        <div className="max-w-7xl mx-auto text-center space-y-2 relative z-10">
          <h1 className="text-3xl lg:text-5xl font-black text-white leading-tight tracking-tight">
            TAMILAGA VETTRI KAZHAGAM <br />
            <span className="text-tvk-yellow font-tamil">கொள்கைகள் & கோட்பாடுகள்</span>
          </h1>
          <p className="font-tamil text-xl lg:text-2xl font-bold text-tvk-yellow italic">
            "நிமிர்ந்து நில்... துணிந்து செல்... சமத்துவம் வெல்லட்டும்!"
          </p>
        </div>
      </section>

      {/* SECTION 1 CONTINUED: IDEOLOGICAL CORE PRINCIPLES */}
      <section className="py-9 px-6 max-w-7xl mx-auto w-full space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="px-3 py-0.5 bg-rose-50 text-tvk-red text-[11px] font-black uppercase rounded-full border border-rose-200 inline-block shadow-xs">
            Ideological Core Principles
          </span>
          <h2 className="text-2xl lg:text-3xl font-black text-slate-900 leading-tight">
            Pillars of TVK Political Vision
          </h2>
          <p className="text-slate-600 text-xs font-medium leading-relaxed">
            Under the leadership of TVK President Thalapathy Vijay, our political ideology transforms directly into concrete citizen welfare services across Tamil Nadu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: TVK Flag Red */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#8B090E] via-tvk-red to-[#6D0B0F] text-white p-5 lg:p-6 rounded-2xl shadow-lg border-2 border-amber-400/40 hover:border-tvk-yellow space-y-3 hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 group hover:shadow-xl hover:shadow-rose-900/40 transform-gpu flex flex-col justify-between">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('/tvk_hero_bg_flag.png')` }}
            />
            <div className="relative z-10 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-300 text-slate-950 flex items-center justify-center border border-amber-200 shadow-md shadow-amber-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0">
                <Flame className="w-6 h-6 text-tvk-red drop-shadow-sm fill-tvk-yellow/30" />
              </div>

              <div>
                <h3 className="font-black text-xl lg:text-2xl text-white tracking-tight">Secular Social Justice</h3>
                <p className="font-tamil text-xs lg:text-sm font-extrabold text-tvk-yellow mt-0.5">மதச்சார்பற்ற சமூக நீதி</p>
              </div>

              <p className="text-xs text-slate-100 leading-relaxed font-medium">
                Uncompromising equality across all communities, castes, and religions. Protecting state rights and fostering communal harmony.
              </p>
            </div>

            <div className="relative z-10 pt-2.5 border-t border-white/15 flex items-center justify-between text-xs font-bold text-amber-200">
              <span className="flex items-center gap-1.5 text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-tvk-yellow" />
                Equal Rights For All
              </span>
              <span className="text-[10px] uppercase font-black tracking-wider text-white">Pillar 01</span>
            </div>
          </div>

          {/* Card 2: TVK Flag Gold / Yellow */}
          <div className="relative overflow-hidden bg-gradient-to-br from-tvk-yellow via-amber-400 to-yellow-500 text-slate-950 p-5 lg:p-6 rounded-2xl shadow-lg border-2 border-tvk-red/40 hover:border-tvk-red space-y-3 hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 group hover:shadow-xl hover:shadow-amber-500/40 transform-gpu flex flex-col justify-between">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('/tvk_hero_bg_flag.png')` }}
            />
            <div className="relative z-10 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-tvk-red via-rose-600 to-red-700 text-white flex items-center justify-center border border-rose-300 shadow-md shadow-rose-900/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0">
                <Shield className="w-6 h-6 text-tvk-yellow drop-shadow-sm fill-tvk-yellow/20" />
              </div>

              <div>
                <h3 className="font-black text-xl lg:text-2xl text-slate-950 tracking-tight">Transparent Governance</h3>
                <p className="font-tamil text-xs lg:text-sm font-extrabold text-tvk-red mt-0.5">வெளிப்படையான நிர்வாகம்</p>
              </div>

              <p className="text-xs text-slate-900 leading-relaxed font-semibold">
                Zero tolerance for corruption. Public digital grievance tracking, AI helplines, and direct accountability in infrastructure development.
              </p>
            </div>

            <div className="relative z-10 pt-2.5 border-t border-slate-950/15 flex items-center justify-between text-xs font-bold text-slate-900">
              <span className="flex items-center gap-1.5 text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-tvk-red" />
                Zero Corruption Digital Portal
              </span>
              <span className="text-[10px] uppercase font-black tracking-wider text-tvk-red">Pillar 02</span>
            </div>
          </div>

          {/* Card 3: TVK Flag Deep Red / Maroon */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#4A070A] via-[#7E0D12] to-tvk-darkred text-white p-5 lg:p-6 rounded-2xl shadow-lg border-2 border-amber-400/40 hover:border-tvk-yellow space-y-3 hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 group hover:shadow-xl hover:shadow-rose-950/50 transform-gpu flex flex-col justify-between">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('/tvk_hero_bg_flag.png')` }}
            />
            <div className="relative z-10 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-300 text-slate-950 flex items-center justify-center border border-amber-200 shadow-md shadow-amber-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0">
                <Users className="w-6 h-6 text-tvk-red drop-shadow-sm fill-tvk-yellow/30" />
              </div>

              <div>
                <h3 className="font-black text-xl lg:text-2xl text-white tracking-tight">Youth & Women First</h3>
                <p className="font-tamil text-xs lg:text-sm font-extrabold text-tvk-yellow mt-0.5">இளைஞர் & மகளிர் முன்னேற்றம்</p>
              </div>

              <p className="text-xs text-slate-100 leading-relaxed font-medium">
                Free skill development bootcamps, IT career guidance, student merit awards, and motorized equipment distribution for women.
              </p>
            </div>

            <div className="relative z-10 pt-2.5 border-t border-white/15 flex items-center justify-between text-xs font-bold text-amber-200">
              <span className="flex items-center gap-1.5 text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-tvk-yellow" />
                Future Leader Empowerment
              </span>
              <span className="text-[10px] uppercase font-black tracking-wider text-white">Pillar 03</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: OUR VISION & OUR MISSION (BILINGUAL IN BOTH TAMIL AND ENGLISH) */}
      <section className="py-9 px-6 max-w-7xl mx-auto w-full border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left Card - Our Vision / நம்முடைய பார்வை */}
          <div className="bg-gradient-to-br from-tvk-red via-[#A80D13] to-[#6D0B0F] text-white p-8 lg:p-10 rounded-3xl shadow-xl border-2 border-tvk-yellow/40 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 transform-gpu">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('/tvk_hero_bg_flag.png')` }}
            />
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-tvk-yellow/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/10 backdrop-blur-md text-tvk-yellow rounded-2xl border border-white/20 shadow-inner shrink-0">
                  <Eye className="w-7 h-7 text-tvk-yellow" />
                </div>
                <div>
                  <h2 className="text-2xl lg:text-3xl font-black text-tvk-yellow leading-tight font-tamil">
                    நம்முடைய பார்வை <span className="text-white font-sans font-light">|</span> <span className="font-sans">Our Vision</span>
                  </h2>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/20 shadow-inner">
                  <p className="font-tamil text-base lg:text-lg font-extrabold text-white leading-relaxed">
                    தமிழக வெற்றி கழகம் மக்களுடன் இணைந்து, நவீன தொழில்நுட்பத்தின் வழியிலாக சமவெளி அடிப்படையிலான, தமிழ் மொழியை மதிக்கும் ஆட்சியை நிலைநாட்டுவதை நோக்கமாகக் கொண்டுள்ளது.
                  </p>
                </div>
                <div className="px-1">
                  <p className="text-xs lg:text-sm font-medium text-amber-100/90 leading-relaxed">
                    TVK envisions a governance system that respects Tamil language, maintains democratic equality, and leverages technology for people's welfare. We are committed to building a better Tamil Nadu for all citizens.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card - Our Mission / நம்முடைய லட்சியம் (BILINGUAL TAMIL + ENGLISH) */}
          <div className="bg-gradient-to-br from-tvk-red via-[#A80D13] to-[#6D0B0F] text-white p-8 lg:p-10 rounded-3xl shadow-xl border-2 border-tvk-yellow/40 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 transform-gpu">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('/tvk_hero_bg_flag.png')` }}
            />
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-tvk-yellow/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/10 backdrop-blur-md text-tvk-yellow rounded-2xl border border-white/20 shadow-inner shrink-0">
                  <Quote className="w-7 h-7 text-tvk-yellow" />
                </div>
                <div>
                  <h2 className="text-2xl lg:text-3xl font-black text-tvk-yellow leading-tight font-tamil">
                    நம்முடைய லட்சியம் <span className="text-white font-sans font-light">|</span> <span className="font-sans">Our Mission</span>
                  </h2>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/20 space-y-2 shadow-inner">
                  <h3 className="font-tamil text-base lg:text-lg font-black text-tvk-yellow leading-snug">
                    "பார்வை என்பது மக்களின் நம்பிக்கையாக மாற வேண்டும்."
                  </h3>
                  <p className="font-tamil text-xs lg:text-sm font-bold text-amber-100/95 leading-relaxed">
                    மக்களை மையமாகக் கொண்ட ஒரு அரசியல் இயக்கம் வளர்ச்சியைப் பற்றி பேசுவதுடன் நின்றுவிடக் கூடாது. அது தன் நிர்வாகத்தில் கண்ணியம், அணுகல்தன்மை, நேர்மை மற்றும் பொறுப்புணர்வை வெளிப்படையாகக் காட்ட வேண்டும்.
                  </p>
                </div>

                <div className="space-y-1.5 px-1">
                  <h4 className="text-sm lg:text-base font-black text-white leading-snug">
                    "Vision must translate into public confidence."
                  </h4>
                  <p className="text-xs lg:text-sm font-medium text-amber-100/90 leading-relaxed">
                    A people-centered political movement should not only speak of progress. It should make dignity, access, fairness, and accountability visible in the way it governs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2.5: OUR CORE VALUES / அடிப்படை மதிப்புகள் */}
      <section className="py-10 px-6 max-w-7xl mx-auto w-full space-y-8 border-t border-slate-200">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 bg-rose-50 text-tvk-red text-xs font-black uppercase rounded-full border border-rose-200 shadow-xs">
              TVK Foundation Values
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-tvk-red leading-tight">
            Our Core Values <span className="text-slate-900 font-sans font-light">|</span> <span className="font-tamil">அடிப்படை மதிப்புகள்</span>
          </h2>
          <p className="text-slate-700 text-xs lg:text-sm font-semibold max-w-3xl leading-relaxed">
            These values define how TVK approaches governance, public communication, development, and citizen participation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Democracy */}
          <div className="relative overflow-hidden bg-gradient-to-br from-rose-50/90 via-white to-red-50/70 p-6 rounded-3xl shadow-lg border-2 border-rose-200 border-b-4 border-b-tvk-red hover:border-tvk-red transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-xl hover:shadow-rose-900/15 transform-gpu flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-tvk-red via-rose-600 to-[#8B090E] text-tvk-yellow flex items-center justify-center border border-rose-300 shadow-md shadow-rose-900/25 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0">
                <Landmark className="w-6 h-6 text-tvk-yellow drop-shadow-xs" />
              </div>
              <div className="space-y-1">
                <h3 className="font-black text-xl text-tvk-red group-hover:text-tvk-darkred transition-colors">Democracy</h3>
                <p className="font-tamil text-xs font-bold text-amber-600">ஜனநாயகம்</p>
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                Commitment to democratic principles and citizen participation in governance.
              </p>
            </div>
          </div>

          {/* 2. Technology */}
          <div className="relative overflow-hidden bg-gradient-to-br from-amber-50/90 via-white to-yellow-50/70 p-6 rounded-3xl shadow-lg border-2 border-amber-200 border-b-4 border-b-tvk-yellow hover:border-amber-500 transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-xl hover:shadow-amber-500/15 transform-gpu flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-tvk-yellow via-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center border border-amber-200 shadow-md shadow-amber-500/25 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0">
                <Globe className="w-6 h-6 text-tvk-red drop-shadow-xs" />
              </div>
              <div className="space-y-1">
                <h3 className="font-black text-xl text-slate-900 group-hover:text-tvk-red transition-colors">Technology</h3>
                <p className="font-tamil text-xs font-bold text-tvk-red">தொழில்நுட்பம்</p>
              </div>
              <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                Leveraging innovation for transparent and efficient public services.
              </p>
            </div>
          </div>

          {/* 3. Tamil Pride */}
          <div className="relative overflow-hidden bg-gradient-to-br from-red-50/90 via-white to-amber-50/70 p-6 rounded-3xl shadow-lg border-2 border-red-200 border-b-4 border-b-tvk-red hover:border-tvk-red transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-xl hover:shadow-rose-900/15 transform-gpu flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-tvk-red via-rose-600 to-[#8B090E] text-tvk-yellow flex items-center justify-center border border-rose-300 shadow-md shadow-rose-900/25 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0">
                <span className="font-tamil font-black text-lg text-tvk-yellow">தமிழ்</span>
              </div>
              <div className="space-y-1">
                <h3 className="font-black text-xl text-tvk-red group-hover:text-tvk-darkred transition-colors">Tamil Pride</h3>
                <p className="font-tamil text-xs font-bold text-amber-600">தமிழ் பெருமை</p>
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                Respecting and promoting Tamil language, culture, and heritage.
              </p>
            </div>
          </div>

          {/* 4. People First */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-50/90 via-white to-indigo-50/70 p-6 rounded-3xl shadow-lg border-2 border-blue-200 border-b-4 border-b-blue-600 hover:border-blue-500 transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/15 transform-gpu flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-700 text-white flex items-center justify-center border border-blue-300 shadow-md shadow-blue-900/25 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0">
                <HeartHandshake className="w-6 h-6 text-tvk-yellow drop-shadow-xs" />
              </div>
              <div className="space-y-1">
                <h3 className="font-black text-xl text-blue-900 group-hover:text-tvk-red transition-colors">People First</h3>
                <p className="font-tamil text-xs font-bold text-blue-600">மக்கள் முதன்மை</p>
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                Prioritizing citizen welfare and community development in all decisions.
              </p>
            </div>
          </div>

          {/* 5. Equality */}
          <div className="relative overflow-hidden bg-gradient-to-br from-rose-50/90 via-white to-amber-50/70 p-6 rounded-3xl shadow-lg border-2 border-rose-200 border-b-4 border-b-tvk-red hover:border-tvk-red transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-xl hover:shadow-rose-900/15 transform-gpu flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-tvk-red via-rose-600 to-[#8B090E] text-tvk-yellow flex items-center justify-center border border-rose-300 shadow-md shadow-rose-900/25 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0">
                <Scale className="w-6 h-6 text-tvk-yellow drop-shadow-xs" />
              </div>
              <div className="space-y-1">
                <h3 className="font-black text-xl text-tvk-red group-hover:text-tvk-darkred transition-colors">Equality</h3>
                <p className="font-tamil text-xs font-bold text-amber-600">சமத்துவம்</p>
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                Ensuring equal opportunities and justice for all communities.
              </p>
            </div>
          </div>

          {/* 6. Sustainability */}
          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/70 p-6 rounded-3xl shadow-lg border-2 border-emerald-200 border-b-4 border-b-emerald-600 hover:border-emerald-500 transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-xl hover:shadow-emerald-500/15 transform-gpu flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-700 text-white flex items-center justify-center border border-emerald-300 shadow-md shadow-emerald-900/25 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shrink-0">
                <Leaf className="w-6 h-6 text-tvk-yellow drop-shadow-xs" />
              </div>
              <div className="space-y-1">
                <h3 className="font-black text-xl text-emerald-900 group-hover:text-tvk-red transition-colors">Sustainability</h3>
                <p className="font-tamil text-xs font-bold text-emerald-600">நிலையான வளர்ச்சி</p>
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                Environmental conservation and sustainable development practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: IDEOLOGY IN ACTION - SERVICES CATALOG GRID */}
      <section className="py-9 px-6 max-w-7xl mx-auto w-full space-y-8 border-t border-slate-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-black text-tvk-red uppercase tracking-widest">Ideology In Action</span>
            <h2 className="text-2xl lg:text-3xl font-black text-slate-900">TVK Citizen Services Powered by Ideology</h2>
          </div>
          <Link
            to="/services"
            className="px-6 py-2.5 bg-tvk-red hover:bg-tvk-darkred text-white text-xs font-black rounded-xl shadow flex items-center gap-2 uppercase tracking-wider transition-all"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-4 h-4 text-tvk-yellow" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideologyServices.map((item, index) => {
            const IconComp = item.icon;
            return (
              <div 
                key={index} 
                className={`relative overflow-hidden bg-white p-6 rounded-3xl shadow-lg border-2 ${item.borderColor} space-y-4 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group hover:-translate-y-0.5`}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-slate-50/85 pointer-events-none" />

                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 text-[10px] font-black uppercase rounded-full ${item.bgColor} ${item.color} shadow-xs`}>
                      {item.pillar}
                    </span>
                    <IconComp className={`w-6 h-6 ${item.color}`} />
                  </div>

                  <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-tvk-red transition-colors">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                </div>

                <div className="relative z-10 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-800">
                  <span className="text-tvk-red font-black text-[11px]">{item.serviceName}</span>
                  <Link to="/services" className="text-tvk-dark hover:underline flex items-center gap-1 font-black">
                    <span>View Service</span>
                    <ArrowRight className="w-3 h-3 text-tvk-red" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Leadership Commitment Quote Banner */}
        <div className="relative overflow-hidden bg-gradient-to-r from-tvk-red via-[#A80D13] to-tvk-dark text-white p-8 lg:p-10 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border-2 border-tvk-yellow/30">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none"
            style={{ backgroundImage: `url('/tvk_hero_bg_flag.png')` }}
          />
          <div className="relative z-10 space-y-2 max-w-2xl">
            <span className="px-3 py-0.5 bg-tvk-yellow text-slate-950 text-[10px] font-black uppercase rounded-full">
              Thalapathy Vijay Ideological Pledge
            </span>
            <h3 className="font-tamil text-2xl lg:text-3xl font-black text-tvk-yellow">
              "தமிழக மக்களுக்கு நேர்மையான சேவை!"
            </h3>
            <p className="text-xs lg:text-sm text-slate-100 font-medium leading-relaxed">
              Dedicated service to Tamil Nadu through technology, integrity, non-stop public assistance, and grassroots leadership.
            </p>
          </div>
          <Link
            to="/services"
            className="relative z-10 shrink-0 font-extrabold text-xs uppercase tracking-widest px-6 py-3.5 bg-tvk-yellow text-slate-950 rounded-xl shadow-lg hover:bg-amber-300 transition-all flex items-center gap-2"
          >
            <Wrench className="w-4 h-4 text-tvk-red" />
            <span>Explore TVK Welfare Services</span>
          </Link>
        </div>
      </section>

      <PCFooter />
    </div>
  );
};
