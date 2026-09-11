import React, { useState, useEffect } from 'react';
import { MobileHeader } from './MobileHeader';
import { MobileBottomNav } from './MobileBottomNav';
import { TVKFlag } from '../../components/common/TVKFlag';
import { submitGrievanceApi, trackGrievanceApi, getLeadersApi } from '../../services/api';
import { 
  Trophy, Vote, ShieldCheck, MapPin, Mic, Camera, 
  Send, Search, CheckCircle2, AlertCircle, Phone, Heart, 
  BookOpen, Building2, Monitor, Sparkles, ArrowRight, Crown, Star,
  Volume2, Play, Flame, Zap, Compass, ChevronRight, Clock, ShieldAlert,
  Droplets, Trash2, Lightbulb, HeartHandshake, X, Loader2, RotateCw
} from 'lucide-react';

export const MobileHome = () => {
  // Auto Rotating TVK Slogans List
  const slogans = [
    '"நிமிர்ந்து நில்... துணிந்து செல்... சமத்துவம் வெல்லட்டும்!"',
    '"நேர்மையாய் நில்... நியாயமாய் வெல்..."',
    '"மக்கள் சக்தி... மாற்றத்தின் வெற்றி..."',
    '"துணிந்து பேசு... உண்மையை வெல்லச் செய்!"',
    '"இளைஞர் எழுச்சி... தமிழகம் வளர்ச்சி!"',
    '"சொல்வது சேவை... செய்வது சாதனை!"'
  ];
  const [sloganIdx, setSloganIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSloganIdx((prev) => (prev + 1) % slogans.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const [flippedCards, setFlippedCards] = useState({});

  const toggleCardFlip = (index) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const pillarsData = [
    {
      id: 'healthcare',
      titleEn: 'HEALTHCARE',
      titleTa: 'சுகாதாரம்',
      descEn: 'Modern clinics, mobile health units and affordable treatments for every family across Tamil Nadu.',
      descTa: 'நவீன மருத்துவமனைகள், மொபைல் மருத்துவ பிரிவுகள் மற்றும் தமிழ்நாட்டின் ஒவ்வொரு குடும்பத்திற்கும் குறைந்த செலவில் தரமான சிகிச்சை.',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'education',
      titleEn: 'EDUCATION',
      titleTa: 'கல்வி',
      descEn: 'Upgraded schools, digital classrooms and merit scholarships for the youth of Tamil Nadu.',
      descTa: 'மேம்படுத்தப்பட்ட பள்ளிகள், டிஜிட்டல் வகுப்பறைகள் மற்றும் தமிழ்நாட்டின் இளைஞர்களுக்கான கல்வி உதவித்தொகை.',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'infrastructure',
      titleEn: 'INFRASTRUCTURE',
      titleTa: 'உள்கட்டமைப்பு',
      descEn: 'Roads, drainage, water supply and smart urban planning for a world-class state.',
      descTa: 'தரமான சாலைகள், கழிவுநீர் வடிகால் வசதி, பாதுகாக்கப்பட்ட குடிநீர் விநியோகம் மற்றும் உலகத் தரம் வாய்ந்த நகர வடிவமைப்பு.',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'digital',
      titleEn: 'DIGITAL SERVICES',
      titleTa: 'டிஜிட்டல் சேவைகள்',
      descEn: 'Online grievance tracking, transparent governance and citizen-first digital tools.',
      descTa: 'ஆன்லைன் மூலம் கோரிக்கைகளைக் கண்காணித்தல், வெளிப்படைத் தன்மையுடன் கூடிய மக்கள் ஆட்சி மற்றும் நவீன டிஜிட்டல் சேவைகள்.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80'
    }
  ];

  // Grievance Hub Tab (Submit vs Track)
  const [hubTab, setHubTab] = useState('submit');

  const districtConstituenciesMap = {
    'Chennai District (சென்னை)': [
      'Perambur (பெரம்பூர்)',
      'Thiyagarayanagar / T. Nagar (தி. நகர்)',
      'Villivakkam (வில்லிவாக்கம்)',
      'Mylapore (மயிலாப்பூர்)',
      'Egmore (எழும்பூர்)',
      'Dr. Radhakrishnan Nagar / R.K. Nagar (ஆர். கே. நகர்)',
      'Virugampakkam (விருகம்பாக்கம்)',
      'Kolathur (கொளத்தூர்)',
      'Royapuram (ராயபுரம்)',
      'Anna Nagar (அண்ணா நகர்)'
    ],
    'Erode District (ஈரோடு)': [
      'Gobichettipalayam (கோபிசெட்டிபாளையம்)',
      'Erode East (ஈரோடு கிழக்கு)',
      'Erode West (ஈரோடு மேற்கு)',
      'Modakkurichi (மொடக்குறிச்சி)',
      'Bhavani (பவானி)'
    ],
    'Madurai District (மதுரை)': [
      'Thirupparankundram (திருப்பரங்குன்றம்)',
      'Madurai Central (மதுரை மத்திய)',
      'Madurai East (மதுரை கிழக்கு)',
      'Madurai North (மதுரை வடக்கு)',
      'Madurai South (மதுரை தெற்கு)'
    ],
    'Chengalpattu District (செங்கல்பட்டு)': [
      'Madurantakam (மதுராந்தகம்)',
      'Shozhinganallur (சோழிங்கநல்லூர்)',
      'Pallavaram (பல்லாவரம்)',
      'Tambaram (தாம்பரம்)',
      'Chengalpattu (செங்கல்பட்டு)',
      'Thiruporur (திருப்போரூர்)'
    ],
    'Tiruppur District (திருப்பூர்)': [
      'Dharapuram (தாராபுரம்)',
      'Kangayam (காங்கேயம்)',
      'Avanashi (அவிநாசி)',
      'Tiruppur North (திருப்பூர் வடக்கு)',
      'Tiruppur South (திருப்பூர் தெற்கு)'
    ],
    'Tiruvallur District (திருவள்ளூர்)': [
      'Gummidipoondi (கும்மிடிப்பூண்டி)',
      'Ponneri (பொன்னேரி)',
      'Thiruvallur (திருவள்ளூர்)',
      'Poonamallee (பூந்தமல்லி)',
      'Avadi (ஆவடி)',
      'Ambattur (அம்பத்தூர்)'
    ],
    'Kancheepuram District (காஞ்சிபுரம்)': [
      'Kancheepuram (காஞ்சிபுரம்)',
      'Sriperumbudur (ஸ்ரீபெரும்புதூர்)',
      'Alandur (ஆலந்தூர்)',
      'Uthiramerur (உத்திரமேரூர்)'
    ],
    'Salem District (சேலம்)': [
      'Salem West (சேலம் மேற்கு)',
      'Salem North (சேலம் வடக்கு)',
      'Salem South (சேலம் தெற்கு)',
      'Edappadi (எடப்பாடி)',
      'Mettur (மேட்டூர்)',
      'Veerapandi (வீரபாண்டி)'
    ],
    'Namakkal District (நாமக்கல்)': [
      'Namakkal (நாமக்கல்)',
      'Rasipuram (ராசிபுரம்)',
      'Tiruchengodu (திருச்செங்கோடு)',
      'Kumarapalayam (குமாரபாளையம்)',
      'Senthamangalam (சேந்தமங்கலம்)'
    ],
    'Kallakurichi District (கள்ளக்குறிச்சி)': [
      'Kallakurichi (கள்ளக்குறிச்சி)',
      'Tirukkoyilur (திருக்கோவிலூர்)',
      'Ulundurpettai (உளுந்தூர்பேட்டை)',
      'Rishivandiyam (ரிஷிவந்தியம்)',
      'Sankarapuram (சங்கராபுரம்)'
    ]
  };

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Chennai District (சென்னை)');
  const [constituency, setConstituency] = useState('Perambur (பெரம்பூர்)');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('roads');
  const [otherCategoryText, setOtherCategoryText] = useState('');
  const [priority, setPriority] = useState('High');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submittedTrackId, setSubmittedTrackId] = useState('');
  const [voiceActive, setVoiceActive] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [recognitionObj, setRecognitionObj] = useState(null);

  // Photo Upload Handlers (Max 5 Photos)
  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const availableSlots = 5 - photos.length;
    if (availableSlots <= 0) {
      alert('Maximum 5 photos allowed.');
      return;
    }

    const selectedFiles = files.slice(0, availableSlots);
    const newPhotoObjs = selectedFiles.map((file, idx) => ({
      id: Date.now() + '-' + idx + '-' + Math.random(),
      url: URL.createObjectURL(file),
      file: file,
      name: file.name
    }));

    setPhotos((prev) => [...prev, ...newPhotoObjs]);
    e.target.value = '';
  };

  const handleRemovePhoto = (id) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  // Track State
  const [trackInput, setTrackInput] = useState('');
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackResult, setTrackResult] = useState(null);
  const [trackError, setTrackError] = useState('');

  // Audio Play Simulation
  const [quotePlaying, setQuotePlaying] = useState(false);

  useEffect(() => {
    getLeadersApi()
      .then((res) => {
        if (res.data.success && res.data.leaders?.length > 0) {
          setWardList(res.data.leaders);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Mobile Ward/MLA Selector (11 MLAs / Leaders)
  const [activeWard, setActiveWard] = useState('Perambur');
  const [wardList, setWardList] = useState([
    { 
      id: 'Perambur', 
      name: 'Perambur', 
      rep: 'C. Joseph Vijay', 
      position: 'Chief Minister & TVK President',
      govtPosition: 'Chief Minister of Tamil Nadu',
      party: 'Tamilaga Vettri Kazhagam (TVK)',
      partyPosition: 'President',
      constituency: 'Perambur',
      district: 'Chennai District (சென்னை)',
      status: 'MLA',
      importantNote: 'Vijay became Chief Minister after the 2026 Assembly election. TVK emerged as the ruling party.',
      photo: 'https://tnexplorer.com/elections/tn2026/photos/tvk/012.jpg'
    },
    { 
      id: 'TNagar', 
      name: 'T. Nagar', 
      rep: 'N. Anand (Bussy Anand)', 
      position: 'General Secretary & Cabinet Minister',
      govtPosition: 'General Secretary & Cabinet Minister',
      party: 'Tamilaga Vettri Kazhagam (TVK)',
      partyPosition: 'General Secretary',
      constituency: 'Thiyagarayanagar (T. Nagar)',
      district: 'Chennai District (சென்னை)',
      status: 'MLA',
      importantNote: 'General Secretary of TVK leading state-wide administration, constituency infrastructure, and public welfare execution.',
      photo: 'https://d8c4bhp8zz98f.cloudfront.net/candidates/tvk-23.jpg'
    },
    { 
      id: 'Gobichettipalayam', 
      name: 'Gobichettipalayam', 
      rep: 'K. A. Sengottaiyan', 
      position: 'Senior TVK Leader & Cabinet Minister',
      govtPosition: 'Senior TVK Leader & Cabinet Minister',
      party: 'Tamilaga Vettri Kazhagam (TVK)',
      partyPosition: 'Senior Leader',
      constituency: 'Gobichettipalayam',
      district: 'Erode District (ஈரோடு)',
      status: 'MLA',
      importantNote: 'Veteran legislator overseeing educational modernization and agrarian empowerment initiatives in western Tamil Nadu.',
      photo: 'https://d8c4bhp8zz98f.cloudfront.net/candidates/tvk-1054.jpg'
    },
    { 
      id: 'Villivakkam', 
      name: 'Villivakkam', 
      rep: 'Aadhav Arjuna', 
      position: 'General Secretary & Cabinet Minister',
      govtPosition: 'General Secretary (Election Campaign Management) & Cabinet Minister',
      party: 'Tamilaga Vettri Kazhagam (TVK)',
      partyPosition: 'General Secretary (Campaign Management)',
      constituency: 'Villivakkam',
      district: 'Chennai District (சென்னை)',
      status: 'MLA',
      importantNote: 'General Secretary managing state-wide election campaign management, sports academies, youth employment hubs, and civic taskforces.',
      photo: 'https://www.livechennai.com/images/minister_2026/Ministers-Thiru-Aadhav-Arjuna.png'
    },
    { 
      id: 'Thirupparankundram', 
      name: 'Thirupparankundram', 
      rep: 'C. T. R. Nirmal Kumar', 
      position: 'Deputy GS (IT) & Cabinet Minister',
      govtPosition: 'Deputy General Secretary (IT & Social Media) & Cabinet Minister',
      party: 'Tamilaga Vettri Kazhagam (TVK)',
      partyPosition: 'Deputy General Secretary (IT & Social Media)',
      constituency: 'Thirupparankundram',
      district: 'Madurai District (மதுரை)',
      status: 'MLA',
      importantNote: 'Deputy General Secretary heading TVK IT & Social Media wings and digital governance infrastructure, driving automated grievance tracking across districts.',
      photo: 'https://d8c4bhp8zz98f.cloudfront.net/candidates/tvk-1142.jpg'
    },
    { 
      id: 'Mylapore', 
      name: 'Mylapore', 
      rep: 'P. Venkataramanan', 
      position: 'Treasurer & Cabinet Minister',
      govtPosition: 'Treasurer & Cabinet Minister',
      party: 'Tamilaga Vettri Kazhagam (TVK)',
      partyPosition: 'Treasurer',
      constituency: 'Mylapore',
      district: 'Chennai District (சென்னை)',
      status: 'MLA',
      importantNote: 'State Treasurer guiding financial transparency, urban civic restoration, and coastal stormwater drain projects.',
      photo: 'https://tnexplorer.com/elections/tn2026/photos/tvk/025.jpg'
    },
    { 
      id: 'Egmore', 
      name: 'Egmore', 
      rep: 'A. Rajmohan', 
      position: 'Deputy GS & Cabinet Minister',
      govtPosition: 'Deputy General Secretary & Cabinet Minister',
      party: 'Tamilaga Vettri Kazhagam (TVK)',
      partyPosition: 'Deputy General Secretary',
      constituency: 'Egmore (SC)',
      district: 'Chennai District (சென்னை)',
      status: 'MLA',
      importantNote: 'Deputy General Secretary coordinating urban sanitation, public housing renewal, and 24/7 community safety networks.',
      photo: 'https://tnexplorer.com/elections/tn2026/photos/tvk/016.jpg'
    },
    { 
      id: 'RKNagar', 
      name: 'R.K. Nagar', 
      rep: 'N. Marie Wilson', 
      position: 'Finance Minister',
      govtPosition: 'Finance Minister',
      party: 'Tamilaga Vettri Kazhagam (TVK)',
      partyPosition: 'TVK Policy Leader',
      constituency: 'Dr. Radhakrishnan Nagar (R.K. Nagar)',
      district: 'Chennai District (சென்னை)',
      status: 'MLA',
      importantNote: 'Spearheading state fiscal planning, coastal fisheries welfare, and primary health center 24/7 operationalization.',
      photo: 'https://nmariewilson.ai/assets/marie-wilson-portrait-CgWk330e.jpg'
    },
    { 
      id: 'Virugambakkam', 
      name: 'Virugambakkam', 
      rep: 'R. Sabarinathan', 
      position: 'Government Chief Whip & MLA',
      govtPosition: 'Government Chief Whip & MLA',
      party: 'Tamilaga Vettri Kazhagam (TVK)',
      partyPosition: 'Government Chief Whip',
      constituency: 'Virugampakkam',
      district: 'Chennai District (சென்னை)',
      status: 'MLA',
      importantNote: 'Government Chief Whip coordinating legislative discipline, residential green belt restoration, and flood mitigation canals.',
      photo: 'https://d8c4bhp8zz98f.cloudfront.net/candidates/tvk-1003.jpg'
    },
    { 
      id: 'Madurantakam', 
      name: 'Madurantakam', 
      rep: 'K. Maragatham Kumaravel', 
      position: 'TVK By-Election Candidate',
      govtPosition: 'TVK By-Election Candidate',
      party: 'Tamilaga Vettri Kazhagam (TVK)',
      partyPosition: 'By-Election Candidate',
      constituency: 'Madurantakam',
      district: 'Chengalpattu District (เซங்கல்பட்டு)',
      status: 'By-Election Candidate',
      importantNote: 'TVK by-election candidate leading rural highway connectivity, lake de-silting, and women self-help group empowerment desks.',
      photo: 'https://pbs.twimg.com/profile_images/1395344959344054279/EjyC-Oeu_400x400.jpg'
    },
    { 
      id: 'Dharapuram', 
      name: 'Dharapuram', 
      rep: 'P. Sathyabama', 
      position: 'TVK By-Election Candidate',
      govtPosition: 'TVK By-Election Candidate',
      party: 'Tamilaga Vettri Kazhagam (TVK)',
      partyPosition: 'By-Election Candidate',
      constituency: 'Dharapuram',
      district: 'Tiruppur District (திருப்பூர்)',
      status: 'By-Election Candidate',
      importantNote: 'TVK by-election candidate leading handloom textile worker support, water supply pipeline expansion, and primary education computer labs.',
      photo: 'https://d8c4bhp8zz98f.cloudfront.net/candidates/52.%20Tmt.%20P.%20Sathyabama%20-%20Tharapuram%20%28101%29.jpg'
    }
  ]);

  // Auto location (HTML5 Geolocation + Reverse Geocoding)
  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      setConstituency('Chennai Central (Ward 14)');
      return;
    }

    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude.toFixed(4);
        const lng = pos.coords.longitude.toFixed(4);
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
            { headers: { 'Accept-Language': 'en' } }
          );
          const data = await response.json();
          const areaName =
            data.address?.suburb ||
            data.address?.neighbourhood ||
            data.address?.city_district ||
            data.address?.city ||
            'Chennai Ward Area';
          setConstituency(`${areaName} (GPS: ${lat}, ${lng})`);
        } catch (err) {
          setConstituency(`GPS Location (Lat: ${lat}, Lng: ${lng})`);
        } finally {
          setGpsLoading(false);
        }
      },
      (err) => {
        console.warn('GPS Error:', err);
        setConstituency('Chennai Central Ward 14');
        setGpsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Real Web Speech API Dictation (Tamil & English)
  const [activeVoiceLang, setActiveVoiceLang] = useState('');

  const handleVoiceType = (lang = 'ta-IN') => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceActive(true);
      setActiveVoiceLang(lang);
      const sampleText = lang === 'en-IN' 
        ? "Streetlight is not working. Kindly repair it urgently." 
        : "தெரு விளக்கு எரியவில்லை. தயவுசெய்து சரிசெய்யவும்.";
      setDescription((prev) => (prev ? prev + " " + sampleText : sampleText));
      setTimeout(() => {
        setVoiceActive(false);
        setActiveVoiceLang('');
      }, 3000);
      return;
    }

    if (voiceActive) {
      if (recognitionObj) {
        recognitionObj.stop();
      }
      setVoiceActive(false);
      const isSameLang = activeVoiceLang === lang;
      setActiveVoiceLang('');
      if (isSameLang) return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = lang;

      recognition.onstart = () => {
        setVoiceActive(true);
        setActiveVoiceLang(lang);
      };

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        if (currentTranscript.trim()) {
          setDescription((prev) => {
            const base = prev ? prev.trim() : '';
            return base + (base ? ' ' : '') + currentTranscript.trim();
          });
        }
      };

      recognition.onerror = (event) => {
        console.warn('Voice Recog Error:', event.error);
        setVoiceActive(false);
        setActiveVoiceLang('');
      };

      recognition.onend = () => {
        setVoiceActive(false);
        setActiveVoiceLang('');
      };

      recognition.start();
      setRecognitionObj(recognition);
    } catch (e) {
      console.warn('SpeechRecog launch error:', e);
      setVoiceActive(true);
      setActiveVoiceLang(lang);
      const sampleText = lang === 'en-IN' 
        ? "Potholes on main road need immediate repair." 
        : "பிரதான சாலையில் பள்ளங்கள் உள்ளன. உடனடியாக சரிசெய்யவும்.";
      setDescription((prev) => (prev ? prev + " " + sampleText : sampleText));
      setTimeout(() => {
        setVoiceActive(false);
        setActiveVoiceLang('');
      }, 3000);
    }
  };

  // Submit Grievance
  const handleSubmitGrievance = async (e) => {
    e.preventDefault();
    if (!name || !phone || !category || !description) return;

    setSubmitting(true);
    try {
      const finalCategory = category === 'others' 
        ? (otherCategoryText.trim() ? `Others - ${otherCategoryText.trim()}` : 'Others') 
        : category;

      const res = await submitGrievanceApi({ name, phone, constituency, district, address, category: finalCategory, description });
      if (res.data.success) {
        setSubmittedTrackId(res.data.trackId);
        setName('');
        setPhone('');
        setAddress('');
        setDescription('');
        setOtherCategoryText('');
        setPhotos([]);
      }
    } catch (err) {
      alert('Error submitting grievance: ' + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  // Track Status
  const handleTrackStatus = async (e) => {
    e.preventDefault();
    if (!trackInput) return;

    setTrackingLoading(true);
    setTrackError('');
    setTrackResult(null);

    try {
      const res = await trackGrievanceApi(trackInput.trim());
      if (res.data.success) {
        setTrackResult(res.data.grievance);
      }
    } catch (err) {
      setTrackError(err.response?.data?.message || 'Track ID not found.');
    } finally {
      setTrackingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#5C0A0E] via-tvk-red to-[#3D0609] text-white flex flex-col font-sans pb-24 overflow-x-hidden">
      <MobileHeader />

      {/* MOBILE HERO SECTION WITH TVK FLAG BACKGROUND ALIGNED LIKE PC VIEW */}
      <section className="p-4 text-center relative overflow-hidden space-y-4 flex flex-col items-center justify-center border-b border-red-800/80">
        
        {/* TVK Official Flag Background Image Layer (35% OPACITY & NATURAL SATURATION) */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-35 pointer-events-none filter saturate-[0.95] brightness-95" 
          style={{ backgroundImage: 'url("/tvk_hero_bg_flag.png")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#5C0A0E]/50 via-tvk-red/30 to-[#3D0609]/80 pointer-events-none"></div>
        
        {/* Animated TVK Flag Banner */}
        <div className="flex justify-center animate-float-slow my-0.5 relative z-10">
          <TVKFlag className="w-24 h-14 rounded-lg shadow-2xl border border-amber-400/50" animated={true} />
        </div>

        {/* CENTERED MULTI-COLOR ANIMATED TITLE (COMPACT SINGLE LINE) */}
        <div className="space-y-1.5 w-full overflow-visible relative z-10">
          <h1 className="text-[clamp(1rem,4.8vw,1.6rem)] font-black tracking-tight leading-tight uppercase whitespace-nowrap">
            <span className="animate-multicolor-title inline-block drop-shadow-md">
              TAMILAGA VETTRI KAZHAGAM
            </span>
          </h1>

          <h2 className="font-tamil text-lg font-black tracking-wide leading-tight">
            <span className="animate-tamil-multicolor inline-block px-1">
              தமிழக வெற்றி கழகம்
            </span>
          </h2>

          <p className="font-tamil text-[clamp(0.75rem,3.4vw,0.9rem)] font-black text-amber-200 tracking-wide flex items-center justify-center gap-1 pt-0.5 whitespace-nowrap">
            <Flame className="w-4 h-4 text-tvk-yellow animate-bounce shrink-0" />
            <span key={sloganIdx} className="whitespace-nowrap animate-fadeIn transition-all duration-500">
              {slogans[sloganIdx]}
            </span>
          </p>
        </div>

        {/* TVK VISION STATEMENT SECTION ALIGNED AS PC VIEW */}
        <div className="w-full space-y-3 relative z-10 max-w-xl mx-auto">
          {/* Top Row: President Vijay Image (Left) + Leadership Video (Right) */}
          <div className="grid grid-cols-2 gap-3">
            {/* Left Box: President Vijay Image */}
            <div className="bg-red-950/90 rounded-2xl border-2 border-amber-400/40 shadow-xl flex items-center justify-center overflow-hidden h-36 relative group">
              <img 
                src="/tvk_president_vijay.png" 
                alt="President Vijay" 
                className="w-full h-full object-cover object-top transform scale-105 group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
              <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/60 text-amber-300 text-[8px] font-black rounded backdrop-blur">
                President Vijay
              </span>
            </div>

            {/* Right Box: TVK Leadership Video */}
            <div className="bg-red-950/90 rounded-2xl border-2 border-amber-400/40 shadow-xl flex items-center justify-center overflow-hidden h-36 relative group">
              <video 
                src="/tvk-right-panel.mp4" 
                autoPlay 
                muted 
                loop 
                playsInline 
                preload="auto" 
                className="w-full h-full object-cover filter contrast-[1.06] brightness-[1.03] saturate-[1.1] transform-gpu scale-105 group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
              <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/60 text-amber-300 text-[8px] font-black rounded backdrop-blur">
                TVK Movement
              </span>
            </div>
          </div>

          {/* Center Box: TVK Vision Statement Text */}
          <div className="bg-red-950/90 p-3.5 rounded-2xl border-2 border-amber-400/40 shadow-xl text-center backdrop-blur-md">
            <p className="text-[11px] text-red-100 leading-relaxed font-medium">
              <strong className="text-tvk-yellow font-black">Tamilaga Vettri Kazhagam (TVK)</strong> is a political movement focused on people’s welfare, social justice, youth empowerment, women's growth, and honest governance for Tamil Nadu.
            </p>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="w-full pt-1 flex gap-2 justify-center relative z-10 max-w-xl mx-auto">
          <a
            href="#grievance-hub"
            className="flex-1 py-3 px-4 bg-tvk-yellow hover:bg-amber-400 text-tvk-dark font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg border-2 border-amber-300 transition-all active:scale-95"
          >
            <Send className="w-3.5 h-3.5 text-tvk-red" />
            <span>File Grievance</span>
          </a>
          <a
            href="#ward-explorer"
            className="flex-1 py-3 px-4 bg-red-950/90 hover:bg-red-900 text-white font-black rounded-xl text-xs flex items-center justify-center gap-1.5 border-2 border-amber-400/40 transition-all active:scale-95"
          >
            <Compass className="w-3.5 h-3.5 text-tvk-yellow" />
            <span>Wards Desk</span>
          </a>
        </div>

        {/* President Leader Speech Audio Simulation Card */}
        <div className="w-full relative z-10 max-w-xl mx-auto bg-gradient-to-r from-red-950 via-tvk-darkred to-red-950 p-3.5 rounded-2xl border-2 border-amber-400/40 text-left space-y-1.5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="font-tamil text-xs font-black text-tvk-yellow flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-tvk-yellow fill-current" />
              தலைவர் செய்தி (Leader's Vision)
            </span>
          </div>
          <p className="font-tamil text-[11px] text-amber-100 leading-snug font-bold">
            "மக்களின் பிரச்சினைகளுக்கே முன்னுரிமை. தமிழகத்தில் இருந்து மாற்றத்தைத் துவங்குவோம்!"
          </p>
        </div>

      </section>

      {/* MOBILE WARD QUICK EXPLORER */}
      <section className="p-4 space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="font-black text-amber-200 uppercase tracking-wider flex items-center gap-1">
            <Compass className="w-4 h-4 text-tvk-yellow" />
            Ward Status Explorer
          </span>
          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
            24/7 SLA Active
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1.5 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
          {wardList.map((ward) => (
            <button
              key={ward.id}
              onClick={() => setActiveWard(ward.id)}
              className={`w-full p-1.5 px-2 rounded-xl text-left transition-all border flex flex-col justify-between shadow-sm min-w-0 active:scale-95 ${
                activeWard === ward.id
                  ? 'bg-tvk-yellow text-tvk-dark border-amber-400 font-extrabold shadow-md ring-1 ring-amber-400'
                  : 'bg-red-950 text-amber-100 border-amber-400/30 font-semibold'
              }`}
            >
              <div className="min-w-0 w-full space-y-0.5">
                <div className="flex items-start justify-between gap-0.5 flex-wrap">
                  <h5 className={`font-black text-[10px] leading-tight truncate max-w-full ${
                    activeWard === ward.id ? 'text-tvk-dark' : 'text-white'
                  }`} title={ward.name}>
                    {ward.name}
                  </h5>
                </div>
                <div>
                  <span className={`text-[6.5px] font-black uppercase px-1 py-0.2 rounded truncate inline-block ${
                    activeWard === ward.id ? 'bg-tvk-red text-white' : 'bg-red-900/90 text-amber-300 border border-amber-400/20'
                  }`}>
                    {ward.position.split('&')[0]}
                  </span>
                </div>
                <p className={`text-[8.5px] font-extrabold truncate pt-0.5 ${
                  activeWard === ward.id ? 'text-red-950' : 'text-amber-300'
                }`}>
                  {ward.rep}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Leader Profile Card on Mobile matching Image 1 */}
        {(() => {
          const activeObj = wardList.find(w => w.id === activeWard) || wardList[0];
          const activeIdx = wardList.findIndex(w => w.id === activeObj.id);
          return (
            <div className="bg-white text-slate-950 p-4 rounded-2xl shadow-xl border-2 border-tvk-red space-y-3 mt-3">
              <div className="border-b border-slate-200 pb-2">
                <h4 className="text-sm font-black text-slate-950">
                  {activeIdx + 1}. {activeObj.rep} — {activeObj.position}
                </h4>
              </div>

              <div className="flex justify-center">
                <div className="w-44 sm:w-48 h-56 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-lg relative bg-slate-900">
                  <img
                    src={activeObj.photo}
                    alt={activeObj.rep}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/tvk_president_vijay.png";
                    }}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              <ul className="space-y-1.5 text-xs text-slate-900 font-medium">
                <li className="flex items-start gap-1">
                  <span className="font-black">• Position:</span>
                  <span className="font-bold">{activeObj.govtPosition}</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="font-black">• Party:</span>
                  <span className="font-bold text-tvk-red">{activeObj.party}</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="font-black">• Party position:</span>
                  <span className="font-bold">{activeObj.partyPosition}</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="font-black">• District:</span>
                  <span className="font-bold">{activeObj.district}</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="font-black">• Constituency:</span>
                  <span className="font-bold">{activeObj.constituency}</span>
                </li>
                <li className="flex items-start gap-1">
                  <span className="font-black">• Status:</span>
                  <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-950 font-black text-[9px] rounded border border-emerald-300 uppercase">
                    {activeObj.status}
                  </span>
                </li>
                <li className="bg-amber-50 p-2 rounded-xl border border-amber-200 text-[11px] leading-relaxed">
                  <strong className="text-slate-950">• Important:</strong> {activeObj.importantNote}
                </li>
              </ul>
            </div>
          );
        })()}
      </section>

      {/* MOBILE GRIEVANCE ACTION HUB */}
      <section className="p-4 space-y-4">
        
        {/* Hub Tabs */}
        <div className="bg-red-950 p-1 rounded-xl flex gap-1 border border-amber-400/40">
          <button
            onClick={() => setHubTab('submit')}
            className={`flex-1 py-2.5 rounded-lg font-black text-[11px] uppercase transition-all flex items-center justify-center gap-1 ${
              hubTab === 'submit' ? 'bg-tvk-yellow text-tvk-dark shadow' : 'text-amber-100'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>1. Register Issue</span>
          </button>

          <button
            onClick={() => setHubTab('track')}
            className={`flex-1 py-2.5 rounded-lg font-black text-[11px] uppercase transition-all flex items-center justify-center gap-1 ${
              hubTab === 'track' ? 'bg-tvk-yellow text-tvk-dark shadow' : 'text-amber-100'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>2. Track Status</span>
          </button>
        </div>

        {/* Tab 1: Submit Form */}
        {hubTab === 'submit' && (
          <div className="bg-white text-slate-900 p-5 rounded-2xl shadow-2xl border-2 border-amber-300 space-y-3">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="font-tamil text-base font-black text-tvk-red">புதிய கோரிக்கை பதிவு</h3>
            </div>

            {submittedTrackId ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="font-tamil text-xs font-extrabold text-slate-900">கோரிக்கை சமர்ப்பிக்கப்பட்டது!</h4>
                <p className="text-xs">
                  Generated Ticket: <strong className="text-tvk-red font-mono">{submittedTrackId}</strong>
                </p>
                <button
                  onClick={() => setSubmittedTrackId('')}
                  className="px-4 py-2 bg-tvk-red text-white text-xs font-bold rounded-lg mt-1"
                >
                  Register Another Ticket
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitGrievance} className="space-y-3">
                <div>
                  <label className="font-tamil text-xs font-bold text-slate-700">பெயர் (Full Name) *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. K. Raja"
                    className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-tvk-red"
                  />
                </div>

                <div>
                  <label className="font-tamil text-xs font-bold text-slate-700">தொலைபேசி (10-Digit Mobile) *</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-tvk-red"
                  />
                </div>

                <div>
                  <label className="font-tamil text-xs font-bold text-slate-700 block mb-1">மாவட்டம் (District) *</label>
                  <select
                    value={district}
                    onChange={(e) => {
                      const newDist = e.target.value;
                      setDistrict(newDist);
                      const list = districtConstituenciesMap[newDist] || [];
                      if (list.length > 0) {
                        setConstituency(list[0]);
                      }
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-tvk-red cursor-pointer"
                  >
                    <option value="Chennai District (சென்னை)">Chennai District (சென்னை)</option>
                    <option value="Erode District (ஈரோடு)">Erode District (ஈரோடு)</option>
                    <option value="Madurai District (மதுரை)">Madurai District (மதுரை)</option>
                    <option value="Chengalpattu District (செங்கல்பட்டு)">Chengalpattu District (செங்கல்பட்டு)</option>
                    <option value="Tiruppur District (திருப்பூர்)">Tiruppur District (திருப்பூர்)</option>
                    <option value="Tiruvallur District (திருவள்ளூர்)">Tiruvallur District (திருவள்ளூர்)</option>
                    <option value="Kancheepuram District (காஞ்சிபுரம்)">Kancheepuram District (காஞ்சிபுரம்)</option>
                    <option value="Salem District (சேலம்)">Salem District (சேலம்)</option>
                    <option value="Namakkal District (நாமக்கல்)">Namakkal District (நாமக்கல்)</option>
                    <option value="Kallakurichi District (கள்ளக்குறிச்சி)">Kallakurichi District (கள்ளக்குறிச்சி)</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <label className="font-tamil text-xs font-bold text-slate-700">தொகுதி (Constituency / Location) *</label>
                    <button
                      type="button"
                      onClick={handleUseLocation}
                      disabled={gpsLoading}
                      className="text-[10px] text-tvk-red font-bold flex items-center gap-0.5 disabled:opacity-50"
                    >
                      {gpsLoading ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>Locating...</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="w-3 h-3" />
                          <span>Auto GPS</span>
                        </>
                      )}
                    </button>
                  </div>
                  <select
                    value={constituency}
                    onChange={(e) => setConstituency(e.target.value)}
                    className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-tvk-red cursor-pointer"
                  >
                    {(districtConstituenciesMap[district] || []).map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                    {constituency && !(districtConstituenciesMap[district] || []).includes(constituency) && (
                      <option value={constituency}>{constituency}</option>
                    )}
                  </select>
                </div>

                <div>
                  <label className="font-tamil text-xs font-bold text-slate-700 block mb-1">
                    முழு முகவரி (Full Address / Landmark) *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter door no, street name, area landmark..."
                    className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-tvk-red"
                  />
                </div>

                {/* Simple Dropdown Category Selector */}
                <div>
                  <label className="font-tamil text-xs font-bold text-slate-700 block mb-1">
                    பிரச்சினையின் வகை (Category) *
                  </label>
                  
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border-2 border-red-400 focus:border-tvk-red rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-tvk-red/20 cursor-pointer"
                  >
                    <option value="" disabled>Select Category</option>
                    <option value="roads">Roads & Infrastructure</option>
                    <option value="water">Water Supply</option>
                    <option value="electricity">Electricity</option>
                    <option value="sanitation">Sanitation</option>
                    <option value="welfare">Welfare Schemes</option>
                    <option value="others">Others</option>
                  </select>

                  {/* Conditional Input Box when "Others" is selected */}
                  {category === 'others' && (
                    <div className="mt-2 p-2.5 bg-red-50/90 border border-red-300 rounded-xl animate-fadeIn space-y-1">
                      <label className="font-tamil text-[11px] font-bold text-tvk-red flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-tvk-yellow fill-current" />
                        மற்ற பிரச்சினை விவரம் (Specify Other Issue) *
                      </label>
                      <input
                        type="text"
                        required={category === 'others'}
                        value={otherCategoryText}
                        onChange={(e) => setOtherCategoryText(e.target.value)}
                        placeholder="e.g. Park maintenance, Garbage disposal..."
                        className="w-full px-3 py-2 bg-white border border-red-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-tvk-red text-slate-900"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1 flex-wrap gap-1">
                    <label className="font-tamil text-xs font-bold text-slate-700">விவரம் (Description) *</label>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleVoiceType('ta-IN')}
                        className={`text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 border transition-all ${
                          voiceActive && activeVoiceLang === 'ta-IN'
                            ? 'bg-red-100 text-tvk-red border-red-300 ring-1 ring-red-400'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        <Mic className="w-3 h-3" /> Voice (Tamil)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleVoiceType('en-IN')}
                        className={`text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 border transition-all ${
                          voiceActive && activeVoiceLang === 'en-IN'
                            ? 'bg-red-100 text-tvk-red border-red-300 ring-1 ring-red-400'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        <Mic className="w-3 h-3" /> Voice (English)
                      </button>
                    </div>
                  </div>
                  <textarea
                    required
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe issue location landmark..."
                    className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-tvk-red"
                  ></textarea>
                </div>

                {/* Photo Upload Section (Max 5 Photos) */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="font-tamil text-xs font-bold text-slate-700 flex items-center gap-1">
                      <Camera className="w-3.5 h-3.5 text-tvk-red" />
                      <span>புகைப்படங்கள் (Attach Photos - Max 5)</span>
                    </label>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {photos.length}/5 Attached
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {photos.map((photo, index) => (
                      <div key={photo.id} className="relative w-16 h-16 rounded-xl overflow-hidden border border-red-300 shadow-sm group shrink-0">
                        <img src={photo.url} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(photo.id)}
                          className="absolute top-0.5 right-0.5 p-0.5 bg-red-600 text-white rounded-full shadow"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                        <span className="absolute bottom-0.5 left-0.5 px-1 bg-black/70 text-white text-[7px] font-bold rounded">
                          #{index + 1}
                        </span>
                      </div>
                    ))}

                    {photos.length < 5 && (
                      <label className="w-16 h-16 rounded-xl border border-dashed border-red-300 bg-red-50/50 flex flex-col items-center justify-center cursor-pointer p-1 text-center shrink-0">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handlePhotoChange}
                          className="hidden"
                        />
                        <Camera className="w-3.5 h-3.5 text-tvk-red" />
                        <span className="text-[9px] font-extrabold text-tvk-red mt-0.5">+ Add</span>
                      </label>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-tvk-red text-white text-xs font-black rounded-xl shadow flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-tvk-yellow" />
                  <span>{submitting ? 'Registering Ticket...' : 'Submit Grievance Ticket'}</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* Tab 2: Track Status */}
        {hubTab === 'track' && (
          <div className="bg-white text-slate-900 p-5 rounded-2xl shadow-2xl border-2 border-amber-300 space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900">Track Grievance Ticket Status</h3>
            <form onSubmit={handleTrackStatus} className="flex gap-2">
              <input
                type="text"
                required
                value={trackInput}
                onChange={(e) => setTrackInput(e.target.value)}
                placeholder="TVK-GR-2026-X892"
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono uppercase font-bold"
              />
              <button
                type="submit"
                disabled={trackingLoading}
                className="px-4 py-2 bg-tvk-red text-white text-xs font-bold rounded-xl shrink-0 flex items-center gap-1"
              >
                <Search className="w-3.5 h-3.5 text-tvk-yellow" />
                <span>Track</span>
              </button>
            </form>

            {trackResult && (
              <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1.5 border border-slate-200">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-tvk-red font-mono">{trackResult.trackId}</span>
                  <span className="text-amber-800 uppercase text-[10px] bg-amber-100 px-2 py-0.5 rounded">{trackResult.status}</span>
                </div>
                <p className="text-slate-700"><strong>Details:</strong> {trackResult.description}</p>
                <p className="text-slate-600 text-[10px]"><strong>Remark:</strong> {trackResult.remarks}</p>
              </div>
            )}

            {trackError && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-center text-xs text-rose-700 font-bold">
                {trackError}
              </div>
            )}
          </div>
        )}

      </section>

      {/* 4 Pillars Mobile 3D Flip Cards */}
      <section className="px-4 py-6 my-4 bg-gradient-to-r from-[#70090C] via-[#9B111E] to-[#70090C] rounded-2xl border-2 border-amber-400/40 shadow-xl overflow-hidden space-y-4">
        <div className="text-center space-y-1">
          <span className="px-3 py-0.5 bg-tvk-yellow text-tvk-dark rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
            4 Core Pillars of Governance
          </span>
          <h3 className="font-black text-lg text-white text-center tracking-wide font-sans drop-shadow-md">
            Building a Stronger Tamil Nadu
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
          {pillarsData.map((pillar, idx) => {
            const isFlipped = !!flippedCards[idx];
            return (
              <div
                key={pillar.id}
                onClick={() => toggleCardFlip(idx)}
                className="relative w-full h-[165px] sm:h-[230px] cursor-pointer group"
                style={{ perspective: '1200px' }}
              >
                <div
                  className="w-full h-full relative transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* FRONT SIDE (English) */}
                  <div
                    className="absolute inset-0 w-full h-full flex flex-col bg-gradient-to-b from-[#A61420] via-[#8B0B10] to-[#600609] rounded-xl border-2 border-amber-400/60 overflow-hidden shadow-md"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  >
                    <div className="h-14 sm:h-20 overflow-hidden border-b border-amber-400/40 relative shrink-0">
                      <img
                        src={pillar.image}
                        alt={pillar.titleEn}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute top-1 right-1">
                        <span className="px-1.5 py-0.2 bg-tvk-red/90 text-white font-extrabold text-[7px] sm:text-[9px] rounded-full uppercase tracking-wider border border-amber-300/40">
                          ENGLISH
                        </span>
                      </div>
                    </div>
                    <div className="p-1.5 sm:p-2.5 flex flex-col justify-between flex-1 text-center bg-[#8B0B10]/95 min-w-0">
                      <div className="space-y-0.5">
                        <h4 className="font-extrabold text-amber-300 text-[10.5px] sm:text-sm tracking-wider drop-shadow line-clamp-1">
                          {pillar.titleEn}
                        </h4>
                        <p className="text-[8.5px] sm:text-[11px] text-slate-100 font-medium leading-tight line-clamp-2">
                          {pillar.descEn}
                        </p>
                      </div>
                      <div className="pt-1 border-t border-amber-400/20 mt-auto">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCardFlip(idx);
                          }}
                          className="w-full flex items-center justify-center gap-1 text-[8px] sm:text-[10px] text-slate-950 font-black bg-gradient-to-r from-amber-300 via-tvk-yellow to-amber-400 py-0.5 px-1 rounded-full shadow border border-amber-200/50 active:scale-95"
                        >
                          <RotateCw className="w-2.5 h-2.5 text-slate-950 shrink-0" />
                          <span className="truncate">Flip · திருப்பவும்</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* BACK SIDE (Tamil) */}
                  <div
                    className="absolute inset-0 w-full h-full flex flex-col bg-gradient-to-b from-[#A61420] via-[#8B0B10] to-[#600609] rounded-xl border-2 border-amber-400/60 overflow-hidden shadow-md"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="h-14 sm:h-20 overflow-hidden border-b border-amber-400/40 relative shrink-0">
                      <img
                        src={pillar.image}
                        alt={pillar.titleTa}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute top-1 right-1">
                        <span className="px-1.5 py-0.2 bg-amber-500/90 text-slate-950 font-black text-[7px] sm:text-[9px] rounded-full uppercase tracking-wider border border-amber-300/40">
                          தமிழ்
                        </span>
                      </div>
                    </div>
                    <div className="p-1.5 sm:p-2.5 flex flex-col justify-between flex-1 text-center bg-[#8B0B10]/95 min-w-0">
                      <div className="space-y-0.5">
                        <h4 className="font-extrabold text-amber-300 text-[10.5px] sm:text-sm tracking-wide drop-shadow line-clamp-1 font-tamil">
                          {pillar.titleTa}
                        </h4>
                        <p className="text-[8.5px] sm:text-[11px] text-slate-100 font-medium leading-tight line-clamp-2 font-tamil">
                          {pillar.descTa}
                        </p>
                      </div>
                      <div className="pt-1 border-t border-amber-400/20 mt-auto">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCardFlip(idx);
                          }}
                          className="w-full flex items-center justify-center gap-1 text-[8px] sm:text-[10px] text-slate-950 font-black bg-gradient-to-r from-amber-300 via-tvk-yellow to-amber-400 py-0.5 px-1 rounded-full shadow border border-amber-200/50 active:scale-95"
                        >
                          <RotateCw className="w-2.5 h-2.5 text-slate-950 rotate-180 shrink-0" />
                          <span className="truncate">திருப்பவும் · Flip Back</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <MobileBottomNav />
    </div>
  );
};
