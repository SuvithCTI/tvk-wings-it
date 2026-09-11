import Development from '../models/Development.js';
import { isDbConnected } from '../config/db.js';

const mockDevelopments = [
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

export const getDevelopments = async (req, res) => {
  try {
    let developments = [...mockDevelopments];
    if (isDbConnected()) {
      try {
        const dbDevs = await Development.find().sort({ createdAt: -1 });
        if (dbDevs && dbDevs.length > 0) {
          const mockMap = new Map(mockDevelopments.map(m => [m.title.trim().toLowerCase(), m]));
          dbDevs.forEach(dbItem => {
            if (dbItem.title) {
              const key = dbItem.title.trim().toLowerCase();
              if (mockMap.has(key)) {
                const existingMock = mockMap.get(key);
                const updated = { ...existingMock, ...dbItem.toObject() };
                if (!updated.imageUrl || !updated.imageUrl.startsWith('http')) {
                  updated.imageUrl = existingMock.imageUrl || categoryFallbacks[updated.category] || categoryFallbacks['Education'];
                }
                mockMap.set(key, updated);
              }
            }
          });
          developments = Array.from(mockMap.values());
        }
      } catch (err) {
        developments = mockDevelopments;
      }
    }

    // Extra safety pass to guarantee valid http imageUrl on every item
    developments = developments.map(d => {
      const img = (d.imageUrl && d.imageUrl.startsWith('http'))
        ? d.imageUrl
        : (categoryFallbacks[d.category] || categoryFallbacks['Education']);
      return { ...d, imageUrl: img };
    });

    return res.status(200).json({
      success: true,
      count: developments.length,
      developments
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createDevelopment = async (req, res) => {
  try {
    const { title, category, description, location, status, budget, imageUrl } = req.body;

    let dev;
    try {
      dev = await Development.create({
        title, category, description, location, status, budget, imageUrl
      });
    } catch (err) {
      dev = {
        _id: `mem_dev_${Date.now()}`,
        title, category, description, location, status, budget, imageUrl
      };
      mockDevelopments.unshift(dev);
    }

    return res.status(201).json({
      success: true,
      message: 'Development project added',
      development: dev
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateDevelopment = async (req, res) => {
  try {
    const { id } = req.params;
    const index = mockDevelopments.findIndex((d) => d._id === id);

    if (index !== -1) {
      mockDevelopments[index] = { ...mockDevelopments[index], ...req.body };
    }

    try {
      await Development.findByIdAndUpdate(id, req.body);
    } catch (e) {}

    return res.status(200).json({
      success: true,
      message: 'Development project updated successfully'
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteDevelopment = async (req, res) => {
  try {
    const { id } = req.params;
    const initialLen = mockDevelopments.length;
    const filtered = mockDevelopments.filter((d) => d._id !== id);
    if (filtered.length !== initialLen) {
      mockDevelopments.length = 0;
      mockDevelopments.push(...filtered);
    }

    try {
      await Development.findByIdAndDelete(id);
    } catch (e) {}

    return res.status(200).json({
      success: true,
      message: 'Development project deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
