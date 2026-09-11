import React from 'react';
import { TVKFlag } from '../../components/common/TVKFlag';
import { Phone, Globe, MapPin, Award } from 'lucide-react';

export const PCFooter = () => {
  return (
    <footer className="bg-slate-950 text-white border-t-4 border-tvk-red pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <TVKFlag className="w-14 h-9 shadow rounded border border-amber-400/30" animated={false} />
            <div>
              <h3 className="font-extrabold text-lg text-white">Tamilaga Vettri Kazhagam</h3>
              <p className="font-tamil text-xs text-tvk-yellow">தமிழக வெற்றி கழகம்</p>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Official digital governance portal of Tamilaga Vettri Kazhagam.
          </p>
          <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-tvk-gold">
            <Award className="w-4 h-4" />
            <span>Official Technology Partner: CodeThrive Infotech</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-sm text-tvk-yellow uppercase tracking-wider mb-4">Quick Portals</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><a href="#grievance-hub" className="hover:text-tvk-yellow transition-colors">Submit Grievance Desk</a></li>
            <li><a href="#election-verdict" className="hover:text-tvk-yellow transition-colors">2026 Mandate Stats</a></li>
            <li><a href="/developments" className="hover:text-tvk-yellow transition-colors">Constituency Projects</a></li>
            <li><a href="/services" className="hover:text-tvk-yellow transition-colors">Welfare Services</a></li>
            <li><a href="/ideology" className="hover:text-tvk-yellow transition-colors">TVK Party Philosophy</a></li>
          </ul>
        </div>

        {/* Constituency Helpline & Info */}
        <div className="space-y-4">
          <h4 className="font-bold text-sm text-tvk-yellow uppercase tracking-wider mb-4">Constituency Office</h4>
          <div className="flex items-start gap-3 text-sm text-slate-300">
            <MapPin className="w-5 h-5 text-tvk-red shrink-0 mt-0.5" />
            <span>TVK Head Office, Main Road, Chennai, Tamil Nadu</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <Phone className="w-5 h-5 text-tvk-red shrink-0" />
            <span>Hotline: <strong className="text-white">9876543210</strong></span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <Globe className="w-5 h-5 text-tvk-red shrink-0" />
            <span>www.tvkdigital.in</span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <p className="font-tamil">
          வாங்க! இணைந்து சிறந்த மாற்றத்தை உருவாக்குவோம்! · Let's build a better tomorrow together!
        </p>
        <p>© 2026 Tamilaga Vettri Kazhagam. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
