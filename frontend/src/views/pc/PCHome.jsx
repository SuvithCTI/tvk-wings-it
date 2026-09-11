import React, { useState, useEffect } from 'react';
import { PCHeader } from './PCHeader';
import { PCFooter } from './PCFooter';
import { TVKFlag } from '../../components/common/TVKFlag';
import { submitGrievanceApi, trackGrievanceApi, getLeadersApi } from '../../services/api';
import { 
  Trophy, Vote, ShieldCheck, MapPin, Mic, Camera, 
  Send, Search, CheckCircle2, AlertCircle, Phone, Heart, 
  BookOpen, Building2, Monitor, Sparkles, ArrowRight, 
  Activity, Check, Layers, ChevronRight, Crown, Flame,
  Zap, Star, Hexagon, Compass, Radio, Users, Award,
  Volume2, VolumeX, Play, ShieldAlert, BarChart3, Filter,
  UserCheck, ExternalLink, Download, Clock, ThumbsUp, ArrowUpRight,
  Droplets, Trash2, Lightbulb, HeartHandshake, X, Loader2, RotateCw
} from 'lucide-react';

export const PCHome = () => {
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

  // Grievance Hub State
  const [hubTab, setHubTab] = useState('submit');
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

  // Tracking State
  const [trackInput, setTrackInput] = useState('');
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackResult, setTrackResult] = useState(null);
  const [trackError, setTrackError] = useState('');

  // Ward Explorer State
  const [selectedWard, setSelectedWard] = useState('Perambur');

  // Citizen Benefit Finder Category
  const [benefitTab, setBenefitTab] = useState('youth');

  // President Quote Audio Simulation
  const [quotePlaying, setQuotePlaying] = useState(false);

  // TVK Assembly Representatives & Candidates Directory (from official 2026 gallery note)
  const [wardList, setWardList] = useState([
    { 
      id: 'Perambur', 
      name: 'Perambur (பெரம்பூர்)', 
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
      name: 'T. Nagar (தி. நகர்)', 
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
      name: 'Gobichettipalayam (கோபிசெட்டிபாளையம்)', 
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
      name: 'Villivakkam (வில்லிவாக்கம்)', 
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
      name: 'Thirupparankundram (திருப்பரங்குன்றம்)', 
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
      name: 'Mylapore (மயிலாப்பூர்)', 
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
      name: 'Egmore (எழும்பூர்)', 
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
      name: 'R.K. Nagar (ஆர். கே. நகர்)', 
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
      name: 'Virugambakkam (விருகம்பாக்கம்)', 
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
      name: 'Madurantakam (மதுராந்தகம்)', 
      rep: 'K. Maragatham Kumaravel', 
      position: 'TVK By-Election Candidate',
      govtPosition: 'TVK By-Election Candidate',
      party: 'Tamilaga Vettri Kazhagam (TVK)',
      partyPosition: 'By-Election Candidate',
      constituency: 'Madurantakam',
      district: 'Chengalpattu District (செங்கல்பட்டு)',
      status: 'By-Election Candidate',
      importantNote: 'TVK by-election candidate leading rural highway connectivity, lake de-silting, and women self-help group empowerment desks.',
      photo: 'https://pbs.twimg.com/profile_images/1395344959344054279/EjyC-Oeu_400x400.jpg'
    },
    { 
      id: 'Dharapuram', 
      name: 'Dharapuram (தாராபுரம்)', 
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

  // Expanded Citizen Schemes Data with Image Thumbnails & Detailed Benefits
  const schemesData = {
    youth: [
      { 
        title: 'TVK Digital Skill & AI Academy',
        tamil: 'டிஜிட்டல் திறன் & ஏஐ அகாடமி', 
        desc: 'Free certified coding, Artificial Intelligence tools, web development, and employment skill bootcamps for youth aged 18-30 across Tamil Nadu.',
        tag: 'Education & Employment',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
        benefit: '100% Free Certification & Placement Guidance'
      },
      { 
        title: 'Youth Sports & Athletics Talent Grant', 
        tamil: 'இளைஞர் விளையாட்டு நிதி உதவி',
        desc: 'Financial sponsorships, professional equipment, and coaching camps for local Kabaddi, Athletics, Football, and Cricket talent in every ward.',
        tag: 'Sports Infrastructure',
        image: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?w=600&auto=format&fit=crop&q=80',
        benefit: 'Up to ₹50,000 Sponsorship per Athlete'
      },
      { 
        title: 'Young Entrepreneur Startup Launchpad', 
        tamil: 'இளம் தொழில்முனைவோர் திட்டம்',
        desc: 'Seed funding assistance, legal mentorship, and workspace grants for young innovators building local businesses in Tamil Nadu.',
        tag: 'Startup & Innovation',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80',
        benefit: 'Zero-Interest Seed Capital & Mentorship'
      }
    ],
    women: [
      { 
        title: 'Magalir Self-Reliance Micro-Grants', 
        tamil: 'மகளிர் சுயசார்பு சிறு நிதியுதவி',
        desc: 'Zero-interest micro-finance support, tailoring machine distribution, and cottage industry setup for women self-help groups (SHGs).',
        tag: 'Financial Empowerment',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
        benefit: 'Direct SHG Bank Account Transfer'
      },
      { 
        title: 'Safe City Women Patrol & Solar Surveillance', 
        tamil: 'பாதுகாப்பான பெண்கள் நடமாட்டம்',
        desc: '24/7 solar-powered HD CCTV installations across main bus stops, college routes, and instant SOS mobile safety response network.',
        tag: 'Safety & Security',
        image: 'https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?w=600&auto=format&fit=crop&q=80',
        benefit: '24/7 Instant Helpline & SOS Patrol'
      },
      { 
        title: 'Mother & Child Nutrition Express', 
        tamil: 'தாய் சேய் ஊட்டச்சத்து திட்டம்',
        desc: 'Monthly nutrition packs containing essential proteins, vitamins, and healthcare supplements delivered directly to new mothers.',
        tag: 'Healthcare & Nutrition',
        image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop&q=80',
        benefit: 'Doorstep Nutrition Pack Delivery'
      }
    ],
    farmers: [
      { 
        title: 'Agritech Canal & Tank Restoration', 
        tamil: 'விவசாய நீர் பாசன மேலாண்மை',
        desc: 'Desilting local lakes and irrigation tanks, setting up automated drip irrigation equipment, and 24/7 solar water pump subsidies.',
        tag: 'Agriculture & Water',
        image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80',
        benefit: '100% Water Channel Desilting Guarantee'
      },
      { 
        title: 'Direct Farmer-to-Consumer Organic Market', 
        tamil: 'நேரடி உழவர் சந்தை மையம்',
        desc: 'Eliminating middleman exploitation by establishing direct cold-storage collection hubs connecting farmers directly with urban markets.',
        tag: 'Farmer Welfare',
        image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&auto=format&fit=crop&q=80',
        benefit: 'Fair Minimum Price & Zero Commission'
      },
      { 
        title: 'Crop Insurance & Disaster Relief Fund', 
        tamil: 'பயிர் காப்பீடு & அவசர நிவாரணம்',
        desc: 'Immediate emergency financial assistance for crop loss due to monsoon flooding or drought with simplified single-day claim processing.',
        tag: 'Crop Security',
        image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop&q=80',
        benefit: '24-Hour Instant Relief Claim Dispatch'
      }
    ],
    senior: [
      { 
        title: 'Doorstep Healthcare Express & Medicines', 
        tamil: 'முதியோர் இல்லாரோக்கிய சேவை',
        desc: 'Free bi-weekly mobile medical checkups, free prescription medicine delivery, and free eye care camps for senior citizens.',
        tag: 'Senior Healthcare',
        image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80',
        benefit: 'Free Medicine Delivery & Doctor Checkups'
      },
      { 
        title: 'Senior Citizen Dignity & Support Desk', 
        tamil: 'முதியோர் பாதுகாப்பு & உதவி மையம்',
        desc: 'Dedicated ward officers assisting elderly citizens with pension applications, legal guidance, and household utility bill support.',
        tag: 'Elder Welfare',
        image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop&q=80',
        benefit: 'Dedicated Ward Assistance Officer'
      }
    ],
    education: [
      { 
        title: 'Equal Opportunity Higher Education Scholarship', 
        tamil: 'சமத்துவ உயர்கல்வி உதவித்தொகை',
        desc: 'Full college fee sponsorships for bright students from economically underprivileged families pursuing Engineering, Medicine, and Arts.',
        tag: 'Higher Education',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
        benefit: 'Full Tuition Fee Support for Merit Students'
      },
      { 
        title: 'Free Model Night Study Centers & Libraries', 
        tamil: 'இலவச படிப்பு மையம் & நூலகம்',
        desc: 'Quiet, air-conditioned study centers equipped with free Wi-Fi, competitive exam books (TNPSC, UPSC, NEET), and mentorship.',
        tag: 'Public Knowledge Centers',
        image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
        benefit: '24/7 Open Access & Free Study Material'
      }
    ]
  };

  // Location Autocomplete (HTML5 Geolocation + Reverse Geocoding)
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
        ? "Water supply issue in 4th street. Requesting urgent repair." 
        : "திருநகர் 4வது தெருவில் குடிநீர் விநியோகம் தடைபட்டுள்ளது. உடனடியாக சரிசெய்யுமாறு கேட்டுக்கொள்கிறேன்.";
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
        ? "Streetlight is not working. Kindly fix it." 
        : "தெரு விளக்கு எரியவில்லை. தயவுசெய்து சரிசெய்யவும்.";
      setDescription((prev) => (prev ? prev + " " + sampleText : sampleText));
      setTimeout(() => {
        setVoiceActive(false);
        setActiveVoiceLang('');
      }, 3000);
    }
  };

  const [targetLeader, setTargetLeader] = useState('C. Joseph Vijay');

  // Submit Grievance
  const handleSubmitGrievance = async (e) => {
    e.preventDefault();
    if (!name || !phone || !category || !description) return;

    setSubmitting(true);
    try {
      const finalCategory = category === 'others' 
        ? (otherCategoryText.trim() ? `Others - ${otherCategoryText.trim()}` : 'Others') 
        : category;

      const res = await submitGrievanceApi({ name, phone, constituency, district, address, category: finalCategory, description, targetLeader });
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

  // Track Grievance Status
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
      setTrackError(err.response?.data?.message || 'Track ID not found in TVK records.');
    } finally {
      setTrackingLoading(false);
    }
  };

  useEffect(() => {
    getLeadersApi()
      .then((res) => {
        if (res.data.success && res.data.leaders?.length > 0) {
          setWardList(res.data.leaders);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const activeWardObj = wardList.find(w => w.id === selectedWard || w._id === selectedWard) || wardList[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#5C0A0E] via-tvk-red to-[#3D0609] text-white flex flex-col font-sans selection:bg-tvk-yellow selection:text-tvk-dark overflow-x-hidden">
      <PCHeader />

      {/* PERFECTLY ALIGNED HERO SECTION WITH TVK FLAG BACKGROUND */}
      <section className="relative overflow-hidden pt-8 pb-10 px-4 md:px-8 lg:px-10 border-b border-red-800/80 flex flex-col justify-center items-center">
        
        {/* TVK Official Flag Background Image Layer (35% OPACITY & NATURAL SATURATION) */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-35 pointer-events-none filter saturate-[0.95] brightness-95" 
          style={{ backgroundImage: 'url("/tvk_hero_bg_flag.png")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#5C0A0E]/50 via-tvk-red/30 to-[#3D0609]/80 pointer-events-none"></div>

        {/* Ambient Glowing Orbs */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-tvk-yellow/15 rounded-full blur-[140px] animate-pulse-glow pointer-events-none"></div>
        <div className="absolute bottom-5 right-10 w-[380px] h-[380px] bg-rose-600/20 rounded-full blur-[120px] animate-pulse-glow pointer-events-none"></div>

        {/* Decorative Geometric Radial Rings */}
        <div className="absolute -top-24 -right-24 w-[450px] h-[450px] border border-amber-400/20 rounded-full animate-spin-ring pointer-events-none border-dashed"></div>
        <div className="absolute top-20 -left-36 w-[360px] h-[360px] border border-red-300/10 rounded-full animate-spin-ring pointer-events-none"></div>

        {/* UNIFIED HERO CONTAINER */}
        <div className="max-w-7xl mx-auto w-full text-center space-y-6 relative z-10 py-2">
          
          {/* 1. TOP SINGLE-LINE MULTI-COLOR TITLE & SLOGAN BLOCK */}
          <div className="space-y-2 w-full overflow-visible">
            <h1 className="text-[clamp(1.4rem,3.8vw,4.2rem)] font-black tracking-tight leading-none uppercase whitespace-nowrap">
              <span className="animate-multicolor-title inline-block drop-shadow-lg">
                TAMILAGA VETTRI KAZHAGAM
              </span>
            </h1>
            
            <h2 className="font-tamil text-xl lg:text-3xl font-black tracking-wide leading-tight">
              <span className="animate-tamil-multicolor inline-block px-1">
                தமிழக வெற்றி கழகம்
              </span>
            </h2>

            {/* Auto-Rotating Quotes directly underneath Tamil title */}
            <p className="font-tamil text-[clamp(0.85rem,2.1vw,1.35rem)] font-black text-amber-200 tracking-wide flex items-center justify-center gap-2 whitespace-nowrap pt-1">
              <Flame className="w-5 h-5 text-tvk-yellow animate-bounce shrink-0" />
              <span key={sloganIdx} className="whitespace-nowrap animate-fadeIn transition-all duration-500">
                {slogans[sloganIdx]}
              </span>
            </p>
          </div>

          {/* 2. TVK VISION STATEMENT ROW WITH COMPACT CENTER VISION CARD */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center max-w-7xl mx-auto w-full">
            
            {/* LEFT IMAGE BOX: TVK PRESIDENT VIJAY (INCREASED HEIGHT) */}
            <div className="lg:col-span-4 bg-red-950/80 rounded-3xl border-2 border-amber-400/40 shadow-2xl backdrop-blur-md flex items-center justify-center group hover:border-amber-400 transition-all overflow-hidden relative w-full h-80 lg:h-[360px]">
              <div className="absolute -top-12 -left-12 w-36 h-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none z-10"></div>

              {/* Taller Full Box Photo Fit */}
              <img
                src="/tvk_president_vijay.png"
                alt="TVK President Vijay"
                className="w-full h-full object-cover filter drop-shadow-md object-center transform scale-105 group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
            </div>

            {/* CENTER BOX: TVK VISION STATEMENT DESCRIPTION */}
            <div className="lg:col-span-4 max-w-xl mx-auto w-full bg-red-950/80 py-4 px-5 rounded-3xl border-2 border-amber-400/40 shadow-2xl backdrop-blur-md flex flex-col justify-center text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-tvk-yellow/5 rounded-full blur-2xl pointer-events-none"></div>
              <p className="text-red-100 text-xs lg:text-sm font-medium leading-snug drop-shadow-sm">
                <strong className="text-tvk-yellow font-black">Tamilaga Vettri Kazhagam (TVK)</strong> is a political movement focused on people’s welfare, social justice, and the overall development of Tamil Nadu. It aims to empower the youth, promote education and employment opportunities, support women’s empowerment, and encourage inclusive growth. With a vision of honest governance, equality, and meaningful political change, TVK seeks to build a progressive and prosperous future for the people of Tamil Nadu.
              </p>
            </div>

            {/* RIGHT VIDEO BOX: TVK LEADERSHIP VIDEO (INCREASED HEIGHT) */}
            <div className="lg:col-span-4 bg-red-950/80 rounded-3xl border-2 border-amber-400/40 shadow-2xl backdrop-blur-md flex items-center justify-center group hover:border-amber-400 transition-all overflow-hidden relative w-full h-80 lg:h-[360px]">
              <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-red-600/20 rounded-full blur-2xl pointer-events-none z-10"></div>

              {/* Taller Full Box High Quality Video Fit */}
              <video
                src="/tvk-right-panel.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label="TVK leadership video"
                className="w-full h-full object-cover filter contrast-[1.06] brightness-[1.03] saturate-[1.1] transform-gpu backface-hidden scale-105 group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
            </div>

          </div>

          {/* 3. CENTERED ACTION BUTTONS */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
            <a
              href="#grievance-hub"
              className="group px-7 py-3 bg-tvk-yellow hover:bg-amber-400 text-tvk-dark font-black rounded-2xl shadow-xl shadow-yellow-500/20 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 text-xs tracking-wide border-2 border-amber-300"
            >
              <Send className="w-4 h-4 text-tvk-red group-hover:rotate-12 transition-transform" />
              <span>File Civic Grievance</span>
              <ArrowRight className="w-4 h-4 text-tvk-red group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#ward-explorer"
              className="px-6 py-3 bg-red-950/90 hover:bg-red-900 border border-amber-400/40 text-white font-bold rounded-2xl flex items-center gap-2 transition-all text-xs backdrop-blur-md shadow-lg"
            >
              <Compass className="w-4 h-4 text-tvk-yellow" />
              <span>Explore Local Wards</span>
            </a>
          </div>

          {/* 4. BALANCED LOWER GRID: MANDATE STATS + LEADER VISION CARD */}
          <div className="pt-4 border-t border-red-800/80 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center text-left">
            
            {/* 3 Stat Cards Grid (7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-3 gap-3">
              
              <div className="group bg-red-950/90 backdrop-blur-md p-3 rounded-2xl border border-amber-400/30 space-y-0.5 shadow-lg hover:border-amber-400 transition-all">
                <div className="flex items-center justify-between">
                  <span className="block text-2xl font-black text-tvk-yellow group-hover:scale-105 transition-transform">108</span>
                  <Crown className="w-4 h-4 text-tvk-yellow" />
                </div>
                <span className="block text-[11px] font-black uppercase text-white">Seats Won</span>
                <span className="block text-[9px] text-amber-200">Single Largest Party</span>
              </div>

              <div className="group bg-red-950/90 backdrop-blur-md p-3 rounded-2xl border border-amber-400/30 space-y-0.5 shadow-lg hover:border-amber-400 transition-all">
                <div className="flex items-center justify-between">
                  <span className="block text-2xl font-black text-white group-hover:scale-105 transition-transform">1.72 Cr+</span>
                  <Vote className="w-4 h-4 text-tvk-yellow" />
                </div>
                <span className="block text-[11px] font-black uppercase text-white">1,72,26,209 Votes</span>
                <span className="block text-[9px] text-amber-300 font-bold">35.07% Vote Share</span>
              </div>

              <div className="group bg-red-950/90 backdrop-blur-md p-3 rounded-2xl border border-amber-400/30 space-y-0.5 shadow-lg hover:border-amber-400 transition-all">
                <div className="flex items-center justify-between">
                  <span className="block text-2xl font-black text-amber-300 group-hover:scale-105 transition-transform">53,000+</span>
                  <Trophy className="w-4 h-4 text-tvk-yellow" />
                </div>
                <span className="block text-[11px] font-black uppercase text-white">Perambur Margin</span>
                <span className="block text-[9px] text-amber-200">President Vijay Victory</span>
              </div>

            </div>

            {/* Leader Vision Highlight Card (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-red-900 via-tvk-red to-red-950 rounded-2xl p-3 border border-amber-400/40 space-y-1.5 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TVKFlag className="w-7 h-4.5 rounded shadow" animated={true} />
                  <div>
                    <h4 className="font-tamil text-xs font-black text-tvk-yellow">தலைவர் பார்வை (Leader's Vision)</h4>
                    <p className="text-[9px] text-slate-300">People First Governance</p>
                  </div>
                </div>

                <button
                  onClick={() => setQuotePlaying(!quotePlaying)}
                  className={`p-1.5 rounded-full border transition-all ${
                    quotePlaying
                      ? 'bg-tvk-yellow text-tvk-dark border-amber-300'
                      : 'bg-red-950 text-amber-200 border-amber-400/40 hover:bg-red-900'
                  }`}
                >
                  {quotePlaying ? <Volume2 className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                </button>
              </div>

              <p className="font-tamil text-[11px] text-amber-100 italic leading-snug bg-red-950/70 p-2 rounded-xl border border-red-800">
                "மக்களின் பிரச்சினைகளுக்கே முன்னுரிமை. தமிழகத்தில் இருந்து மாற்றத்தைத் துவங்குவோம்!"
              </p>
            </div>

          </div>

        </div>
      </section>





      {/* PAGE 2 / SECTION 2: TVK FLAG YELLOW THEME - ASSEMBLY REPRESENTATIVES & CONSTITUENCY DESK */}
      <section id="ward-explorer" className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 text-slate-950 py-16 px-6 relative overflow-hidden border-y-4 border-tvk-red shadow-2xl">
        {/* Subtle Ambient Pattern */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
            <h2 className="text-3xl lg:text-4xl font-black text-slate-950 leading-tight">
              TVK Leaders & Assembly Constituency Explorer
            </h2>
            <p className="text-slate-900 text-sm font-bold">
              Explore active TVK Members of Legislative Assembly (MLAs), Cabinet Portfolios, constituency resolution records, and public milestones across Tamil Nadu.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Single Column Scrollable Assembly Representatives Directory */}
            <div className="lg:col-span-5 max-h-[520px] overflow-y-auto pr-2 scrollbar-thin space-y-2.5">
              {wardList.map((ward) => (
                <button
                  key={ward.id}
                  onClick={() => setSelectedWard(ward.id)}
                  className={`w-full p-3 px-4 rounded-xl text-left transition-all border flex items-center justify-between shadow-md min-w-0 relative overflow-hidden group ${
                    selectedWard === ward.id
                      ? 'bg-tvk-red text-white border-slate-950 shadow-xl scale-[1.01] ring-2 ring-amber-300'
                      : 'bg-red-950 text-amber-100 border-amber-400/30 hover:bg-red-900 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* Official Leader Photo Thumbnail */}
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-amber-400/60 shadow-sm bg-slate-100 flex items-center justify-center p-0.5">
                      <img
                        src={ward.photo}
                        alt={ward.rep}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/tvk_president_vijay.png";
                        }}
                        className="w-full h-full object-contain object-top rounded"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-extrabold text-sm leading-tight text-white truncate" title={ward.name}>
                        {ward.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className={`text-xs font-black truncate ${selectedWard === ward.id ? 'text-amber-200' : 'text-amber-300'}`}>
                          {ward.rep}
                        </span>
                        <span className={`inline-block text-[8px] font-black uppercase px-2 py-0.5 rounded truncate ${
                          selectedWard === ward.id ? 'bg-amber-300 text-tvk-dark' : 'bg-red-900 text-amber-300 border border-amber-400/30'
                        }`}>
                          {ward.position}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Representative & Leader Profile Detail Box */}
            <div className="lg:col-span-7 bg-white text-slate-950 p-5 rounded-2xl shadow-2xl border-4 border-tvk-red space-y-4 sticky top-4">
              {/* Header Title: index. Name — Position */}
              <div className="border-b border-slate-200 pb-2">
                <h3 className="text-lg sm:text-xl font-black text-slate-950 leading-snug">
                  {wardList.findIndex(w => w.id === activeWardObj.id) + 1}. {activeWardObj.rep} — {activeWardObj.position}
                </h3>
              </div>

              {/* Side-by-Side Grid: Left Photo, Right Attributes */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                {/* Left: Portrait Leader Photo Box (Fills box 100% with no side bars and no head cutoff) */}
                <div className="sm:col-span-5 flex justify-center">
                  <div className="w-48 sm:w-52 h-56 sm:h-60 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xl relative group shrink-0 bg-slate-900">
                    <img
                      src={activeWardObj.photo}
                      alt={activeWardObj.rep}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/tvk_president_vijay.png";
                      }}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Right: Attributes List */}
                <div className="sm:col-span-7 space-y-2 text-xs sm:text-sm text-slate-900 font-medium">
                  <div className="flex items-start gap-1.5">
                    <span className="text-slate-950 font-black shrink-0">• Position:</span>
                    <span className="font-extrabold text-slate-900 leading-tight">{activeWardObj.govtPosition}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-slate-950 font-black shrink-0">• Party:</span>
                    <span className="font-extrabold text-tvk-red">{activeWardObj.party}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-slate-950 font-black shrink-0">• Party position:</span>
                    <span className="font-extrabold text-slate-900 leading-tight">{activeWardObj.partyPosition}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-slate-950 font-black shrink-0">• District:</span>
                    <span className="font-extrabold text-slate-900">{activeWardObj.district}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-slate-950 font-black shrink-0">• Constituency:</span>
                    <span className="font-extrabold text-slate-900">{activeWardObj.constituency}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-slate-950 font-black shrink-0">• Status:</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-950 font-black text-[10px] rounded border border-emerald-300 uppercase">
                      {activeWardObj.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Full Width Important Note Box Below */}
              <div className="flex items-start gap-1.5 bg-amber-50 p-3 rounded-xl border border-amber-300 text-xs sm:text-sm">
                <span className="text-slate-950 font-black shrink-0">• Important:</span>
                <span className="font-semibold text-slate-800 leading-snug">{activeWardObj.importantNote}</span>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-slate-100">
                <a
                  href="#grievance-hub"
                  className="w-full py-2.5 px-4 bg-tvk-red hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md text-center flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-3.5 h-3.5 text-tvk-yellow" />
                  <span>Raise Civic Issue in {activeWardObj.constituency}</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* COMPLAINT DISPATCH & CIVIC GRIEVANCE HUB */}
      <section id="grievance-hub" className="pt-8 pb-10 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-5 space-y-1.5">
          <h2 className="text-3xl lg:text-4xl font-black text-white">
            File & Track Civic Grievances
          </h2>
          <p className="text-red-100 text-sm">
            Submit road repairs, water supply, streetlight, or sanitation issues directly to TVK Representatives with 48-hour SLA action commitment.
          </p>
        </div>

        {/* Hub Tabs */}
        <div className="flex justify-center gap-4 mb-5">
          <button
            onClick={() => setHubTab('submit')}
            className={`px-6 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 border ${
              hubTab === 'submit'
                ? 'bg-tvk-yellow text-tvk-dark border-amber-300 shadow-xl scale-105'
                : 'bg-red-950/80 text-white border-amber-400/30 hover:border-amber-400'
            }`}
          >
            <Send className="w-4 h-4 text-tvk-red" />
            <span>File New Grievance</span>
          </button>
          <button
            onClick={() => setHubTab('track')}
            className={`px-6 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 border ${
              hubTab === 'track'
                ? 'bg-tvk-yellow text-tvk-dark border-amber-300 shadow-xl scale-105'
                : 'bg-red-950/80 text-white border-amber-400/30 hover:border-amber-400'
            }`}
          >
            <Search className="w-4 h-4 text-tvk-red" />
            <span>Track Complaint Status</span>
          </button>
        </div>

        {hubTab === 'submit' && (
          <div className="bg-white text-slate-900 rounded-3xl p-6 lg:p-8 shadow-2xl border-2 border-amber-400/50 max-w-4xl mx-auto space-y-5 animate-fadeIn">
            
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-tamil text-2xl font-black text-tvk-red">புதிய கோரிக்கை பதிவு (New Ticket Registration)</h3>
              <p className="text-xs text-slate-500 mt-0.5">Automated ticket dispatch to TVK Service Officers</p>
            </div>

            {submittedTrackId ? (
              <div className="p-8 bg-emerald-50 border-2 border-emerald-300 rounded-3xl text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="font-tamil text-2xl font-black text-slate-900">கோரிக்கை வெற்றிகரமாகப் பதிவு செய்யப்பட்டது!</h4>
                <div className="inline-block px-6 py-3 bg-white border border-emerald-300 rounded-2xl shadow-sm">
                  <span className="text-xs text-slate-500 block font-bold">Generated Track ID</span>
                  <strong className="text-2xl font-mono text-tvk-red">{submittedTrackId}</strong>
                </div>
                <p className="text-xs text-slate-600 max-w-md mx-auto font-medium">
                  Your ticket has been dispatched to TVK ward supervisors. You will receive SMS progress alerts.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setSubmittedTrackId('')}
                    className="px-6 py-3 bg-tvk-red text-white text-xs font-black rounded-xl shadow-lg hover:bg-red-700"
                  >
                    Register Another Complaint
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitGrievance} className="space-y-3.5">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div>
                    <label className="font-tamil text-xs font-bold text-slate-700 block mb-1">உங்கள் பெயர் (Full Name) *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. K. Raja"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-tvk-red outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-tamil text-xs font-bold text-slate-700 block mb-1">தொலைபேசி எண் (10-Digit Mobile) *</label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-tvk-red outline-none"
                    />
                  </div>
                </div>

                {/* TARGET REPRESENTATIVE SELECTOR */}
                <div className="p-3.5 bg-amber-50/90 border-2 border-amber-300 rounded-2xl space-y-1 shadow-sm">
                  <label className="font-tamil text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-tvk-red" />
                    யாருக்கு சமர்ப்பிக்க வேண்டும் (Target TVK Leader / Representative) *
                  </label>
                  <select
                    value={targetLeader}
                    onChange={(e) => setTargetLeader(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-amber-400 focus:border-tvk-red rounded-xl text-xs font-black text-slate-900 outline-none focus:ring-2 focus:ring-tvk-red/20 cursor-pointer shadow-xs"
                  >
                    <option value="C. Joseph Vijay">🏆 C. Joseph Vijay (CM Candidate & TVK President - Perambur)</option>
                    <option value="N. Anand (Bussy Anand)">N. Anand (Bussy Anand) (General Secretary - T. Nagar)</option>
                    <option value="K. A. Sengottaiyan">K. A. Sengottaiyan (Senior Leader - Gobichettipalayam)</option>
                    <option value="Aadhav Arjuna">Aadhav Arjuna (General Secretary - Villivakkam)</option>
                    <option value="CTR Nirmal Kumar">CTR Nirmal Kumar (Singanallur)</option>
                    <option value="Dr. Venkataramanan">Dr. Venkataramanan (Thiruparankundram)</option>
                    <option value="Dr. Rajmohan">Dr. Rajmohan (Trichy East)</option>
                    <option value="Dr. Marie Wilson">Dr. Marie Wilson (Kallakurichi)</option>
                    <option value="Tmt. K. Sabarinathan">Tmt. K. Sabarinathan (Tirunelveli)</option>
                    <option value="Tmt. V. Maragatham">Tmt. V. Maragatham (Kancheepuram)</option>
                    <option value="Tmt. P. Sathyabama">Tmt. P. Sathyabama (Dharapuram)</option>
                  </select>
                  <p className="text-[10px] text-slate-500 font-bold pl-0.5">
                    Complaints submitted to Vijay or chosen TVK Representatives route directly to their isolated executive command desk.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
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
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-tvk-red outline-none cursor-pointer"
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
                    <div className="flex justify-between items-center mb-1">
                      <label className="font-tamil text-xs font-bold text-slate-700">தொகுதி (Constituency / Location) *</label>
                      <button
                        type="button"
                        onClick={handleUseLocation}
                        disabled={gpsLoading}
                        className="text-xs text-tvk-red font-bold flex items-center gap-1 hover:underline disabled:opacity-50"
                      >
                        {gpsLoading ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Locating GPS...</span>
                          </>
                        ) : (
                          <>
                            <MapPin className="w-3.5 h-3.5" />
                            <span>Detect GPS Location</span>
                          </>
                        )}
                      </button>
                    </div>
                    <select
                      value={constituency}
                      onChange={(e) => setConstituency(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-tvk-red outline-none cursor-pointer"
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
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-tvk-red outline-none"
                  />
                </div>

                {/* Simple Dropdown Category Selector matching user design */}
                <div>
                  <label className="font-tamil text-xs font-bold text-slate-800 block mb-1">
                    பிரச்சினையின் வகை (Category) *
                  </label>
                  
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border-2 border-red-400 focus:border-tvk-red rounded-xl text-sm font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-tvk-red/20 shadow-sm cursor-pointer transition-all"
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
                    <div className="mt-2.5 p-3 bg-red-50/90 border-2 border-red-300 rounded-xl animate-fadeIn space-y-1">
                      <label className="font-tamil text-xs font-black text-tvk-red flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-tvk-yellow fill-current" />
                        மற்ற பிரச்சினை விவரம் (Specify Other Issue Category) *
                      </label>
                      <input
                        type="text"
                        required={category === 'others'}
                        value={otherCategoryText}
                        onChange={(e) => setOtherCategoryText(e.target.value)}
                        placeholder="e.g. Park maintenance, Garbage clearing, Stray cattle, Bus stop shelter..."
                        className="w-full px-3.5 py-2 bg-white border border-red-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-tvk-red font-medium text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1 flex-wrap gap-2">
                    <label className="font-tamil text-xs font-bold text-slate-700">பிரச்சினையின் விவரம் (Description) *</label>
                    
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleVoiceType('ta-IN')}
                        className={`text-xs font-bold flex items-center gap-1.5 px-3 py-1 rounded-xl border transition-all ${
                          voiceActive && activeVoiceLang === 'ta-IN'
                            ? 'bg-red-100 text-tvk-red border-red-300 ring-2 ring-red-400'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        <Mic className="w-3.5 h-3.5" />
                        {voiceActive && activeVoiceLang === 'ta-IN' ? (
                          <div className="flex items-center gap-0.5 h-4">
                            <span className="w-1 bg-tvk-red rounded animate-wave-bar-1"></span>
                            <span className="w-1 bg-tvk-red rounded animate-wave-bar-2"></span>
                            <span className="w-1 bg-tvk-red rounded animate-wave-bar-3"></span>
                          </div>
                        ) : (
                          <span>Voice Dictate (Tamil)</span>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleVoiceType('en-IN')}
                        className={`text-xs font-bold flex items-center gap-1.5 px-3 py-1 rounded-xl border transition-all ${
                          voiceActive && activeVoiceLang === 'en-IN'
                            ? 'bg-red-100 text-tvk-red border-red-300 ring-2 ring-red-400'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        <Mic className="w-3.5 h-3.5" />
                        {voiceActive && activeVoiceLang === 'en-IN' ? (
                          <div className="flex items-center gap-0.5 h-4">
                            <span className="w-1 bg-tvk-red rounded animate-wave-bar-1"></span>
                            <span className="w-1 bg-tvk-red rounded animate-wave-bar-2"></span>
                            <span className="w-1 bg-tvk-red rounded animate-wave-bar-3"></span>
                          </div>
                        ) : (
                          <span>Voice Dictate (English)</span>
                        )}
                      </button>
                    </div>
                  </div>

                  <textarea
                    required
                    rows={2.5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your civic issue landmark, road name, and duration..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-tvk-red outline-none"
                  ></textarea>
                </div>

                {/* Photo Upload Section (Max 5 Photos - Compact Size) */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="font-tamil text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-tvk-red" />
                      <span>புகைப்படங்களை இணைக்கவும் (Attach Photos - Max 5)</span>
                    </label>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {photos.length} / 5 Attached
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    {photos.map((photo, index) => (
                      <div key={photo.id} className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-red-300 shadow-sm group shrink-0">
                        <img src={photo.url} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(photo.id)}
                          className="absolute top-1 right-1 p-0.5 bg-red-600 hover:bg-red-700 text-white rounded-full shadow transition-transform transform hover:scale-110"
                          title="Remove Photo"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <span className="absolute bottom-1 left-1 px-1 bg-black/70 text-white text-[8px] font-bold rounded">
                          #{index + 1}
                        </span>
                      </div>
                    ))}

                    {photos.length < 5 && (
                      <label className="w-20 h-20 rounded-xl border-2 border-dashed border-red-300 hover:border-tvk-red bg-red-50/50 hover:bg-red-50 flex flex-col items-center justify-center cursor-pointer transition-all p-1 text-center shrink-0 group">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handlePhotoChange}
                          className="hidden"
                        />
                        <div className="p-1 bg-white text-tvk-red rounded-full shadow-sm group-hover:scale-110 transition-transform border border-red-200">
                          <Camera className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-extrabold text-tvk-red leading-none mt-1">+ Add</span>
                        <span className="text-[8px] text-slate-500">Max 5</span>
                      </label>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-tvk-red hover:bg-tvk-darkred text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-tvk-yellow" />
                  <span>{submitting ? 'Registering Ticket...' : 'Submit Grievance Ticket · சமர்ப்பி'}</span>
                </button>

              </form>
            )}

          </div>
        )}

        {hubTab === 'track' && (
          <div className="bg-white text-slate-900 rounded-3xl p-6 lg:p-8 shadow-2xl border-2 border-amber-400/50 max-w-2xl mx-auto space-y-5 animate-fadeIn">
            <div className="text-center space-y-2">
              <h3 className="font-black text-2xl text-slate-900">Check Grievance Ticket Status</h3>
              <p className="text-xs text-slate-500">Enter your 12-digit Track ID e.g. TVK-GR-2026-X892</p>
            </div>

            <form onSubmit={handleTrackStatus} className="flex gap-3">
              <input
                type="text"
                required
                value={trackInput}
                onChange={(e) => setTrackInput(e.target.value)}
                placeholder="TVK-GR-2026-X892"
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm font-mono uppercase font-black focus:ring-2 focus:ring-tvk-red outline-none"
              />
              <button
                type="submit"
                disabled={trackingLoading}
                className="px-6 py-3 bg-tvk-red hover:bg-tvk-darkred text-white font-black text-xs rounded-2xl shadow-lg shrink-0 flex items-center gap-2"
              >
                <Search className="w-4 h-4 text-tvk-yellow" />
                <span>{trackingLoading ? 'Searching...' : 'Check Status'}</span>
              </button>
            </form>

            {trackResult && (
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="font-mono text-sm font-black text-tvk-red">{trackResult.trackId}</span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-900 font-black text-xs rounded-full uppercase">
                    {trackResult.status}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-700">
                  <p><strong>Citizen Name:</strong> {trackResult.name} ({trackResult.phone})</p>
                  <p><strong>Constituency/Ward:</strong> {trackResult.constituency}</p>
                  <p><strong>Category:</strong> {trackResult.category}</p>
                  <p><strong>Details:</strong> {trackResult.description}</p>
                </div>
                <div className="pt-3 border-t border-slate-200 text-xs text-slate-600">
                  <strong>Official Response:</strong> {trackResult.remarks}
                </div>
              </div>
            )}

            {trackError && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-center text-xs text-rose-700 font-bold">
                {trackError}
              </div>
            )}
          </div>
        )}

      </section>



      {/* 4 GOVERNANCE PILLARS 3D FLIP CARDS */}
      <section className="py-14 px-6 max-w-7xl mx-auto w-full bg-gradient-to-r from-[#70090C] via-[#9B111E] to-[#70090C] rounded-3xl border-2 border-amber-400/40 my-10 shadow-2xl overflow-hidden">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="px-4 py-1 bg-tvk-yellow text-tvk-dark rounded-full text-xs font-black uppercase tracking-widest shadow-md">
            4 Core Pillars of Governance · 4 முக்கிய தூண்கள்
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-wide font-sans drop-shadow-md">
            Building a Stronger Tamil Nadu
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillarsData.map((pillar, idx) => {
            const isFlipped = !!flippedCards[idx];
            return (
              <div
                key={pillar.id}
                onClick={() => toggleCardFlip(idx)}
                className="relative w-full h-[390px] cursor-pointer group"
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
                    className="absolute inset-0 w-full h-full flex flex-col bg-gradient-to-b from-[#A61420] via-[#8B0B10] to-[#600609] rounded-2xl border-2 border-amber-400/60 hover:border-amber-300 hover:shadow-[0_15px_30px_rgba(245,158,11,0.35)] transition-all duration-300 overflow-hidden shadow-2xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  >
                    <div className="h-40 overflow-hidden border-b-2 border-amber-400/40 relative">
                      <img
                        src={pillar.image}
                        alt={pillar.titleEn}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-0.5 bg-tvk-red/90 text-white font-extrabold text-[10px] rounded-full uppercase tracking-wider border border-amber-300/40 shadow-sm">
                          ENGLISH
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col justify-between flex-1 text-center bg-[#8B0B10]/95">
                      <div>
                        <h3 className="font-extrabold text-amber-300 text-xl tracking-wider mb-2 drop-shadow-md">
                          {pillar.titleEn}
                        </h3>
                        <p className="text-xs text-slate-100 font-medium leading-relaxed px-1">
                          {pillar.descEn}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-amber-400/20">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCardFlip(idx);
                          }}
                          className="w-full flex items-center justify-center gap-2 text-xs text-slate-950 font-black bg-gradient-to-r from-amber-300 via-tvk-yellow to-amber-400 hover:from-amber-200 hover:to-yellow-300 py-2 px-4 rounded-full shadow-lg border border-amber-200/50 transition-all transform group-hover:scale-[1.02] active:scale-95"
                        >
                          <RotateCw className="w-3.5 h-3.5 text-slate-950 transition-transform duration-500" />
                          <span>Flip for Tamil · திருப்பவும்</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* BACK SIDE (Tamil) */}
                  <div
                    className="absolute inset-0 w-full h-full flex flex-col bg-gradient-to-b from-[#A61420] via-[#8B0B10] to-[#600609] rounded-2xl border-2 border-amber-400/60 hover:border-amber-300 hover:shadow-[0_15px_30px_rgba(245,158,11,0.35)] transition-all duration-300 overflow-hidden shadow-2xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="h-40 overflow-hidden border-b-2 border-amber-400/40 relative">
                      <img
                        src={pillar.image}
                        alt={pillar.titleTa}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-0.5 bg-amber-500/90 text-slate-950 font-black text-[10px] rounded-full uppercase tracking-wider border border-amber-300/40 shadow-sm">
                          தமிழ்
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col justify-between flex-1 text-center bg-[#8B0B10]/95">
                      <div>
                        <h3 className="font-extrabold text-amber-300 text-xl tracking-wide mb-2 drop-shadow-md">
                          {pillar.titleTa}
                        </h3>
                        <p className="text-xs text-slate-100 font-medium leading-relaxed px-1">
                          {pillar.descTa}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-amber-400/20">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCardFlip(idx);
                          }}
                          className="w-full flex items-center justify-center gap-2 text-xs text-slate-950 font-black bg-gradient-to-r from-amber-300 via-tvk-yellow to-amber-400 hover:from-amber-200 hover:to-yellow-300 py-2 px-4 rounded-full shadow-lg border border-amber-200/50 transition-all transform group-hover:scale-[1.02] active:scale-95"
                        >
                          <RotateCw className="w-3.5 h-3.5 text-slate-950 transition-transform duration-500 rotate-180" />
                          <span>திருப்பவும் · Flip Back</span>
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

      <PCFooter />
    </div>
  );
};
