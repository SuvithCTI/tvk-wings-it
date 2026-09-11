const mockNews = [
  {
    _id: 'news_1',
    title: 'Thalapathy Vijay Addresses Packed TVK Flag Unveiling Ceremony in Chennai',
    category: 'Announcements',
    type: 'gallery',
    summary: 'HD Photo coverage of TVK President Thalapathy Vijay launching the official party flag and anthem in Chennai before thousands of party volunteers.',
    timeAgo: '10 mins ago',
    source: 'TVK Media Desk',
    isBreaking: true,
    gallery: [
      'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=600&q=80',
    viewsCount: '1.2M views'
  },
  {
    _id: 'news_2',
    title: 'Exclusive Photos: 150+ TVK Night Study Centers Solar Lighting Installation',
    category: 'Constituency',
    type: 'gallery',
    summary: 'Photo coverage of newly established neighborhood night study centers equipped with solar power, free textbooks, and volunteer tutoring desks across Madurai & Erode.',
    timeAgo: '45 mins ago',
    source: 'Education Wing',
    isBreaking: true,
    gallery: [
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80',
    viewsCount: '85K views'
  },
  {
    _id: 'news_3',
    title: 'TVK 24x7 Digital IT Cell Portal Crosses 10,000 Verified Citizen Grievance Solutions',
    category: 'IT Cell',
    type: 'gallery',
    summary: 'Photo gallery showcasing the digital tracking workflow operated by TVK IT Cell volunteer engineers connecting public requests directly to local administration desks.',
    timeAgo: '2 hours ago',
    source: 'IT Cell Headquarters',
    isBreaking: false,
    gallery: [
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80',
    viewsCount: '240K views'
  },
  {
    _id: 'news_4',
    title: 'TVK Flagship Mobile Health Clinics On Ground in Flood-Affected Zones',
    category: 'Constituency',
    type: 'gallery',
    summary: 'Photo story of mobile healthcare vans delivering free diagnostic blood tests, emergency medical care, and clean drinking water distribution in Tiruvallur.',
    timeAgo: '4 hours ago',
    source: 'Medical Wing',
    isBreaking: false,
    gallery: [
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    viewsCount: '410K views'
  },
  {
    _id: 'news_5',
    title: 'Official Press Release Document: TVK State Merit Awards Ceremony 2026',
    category: 'Press Releases',
    type: 'press',
    summary: 'Official signed statement issued by TVK General Secretary outlining the venue details, eligibility guidelines, and seat allocations for the upcoming state-wide toppers honor ceremony.',
    timeAgo: '6 hours ago',
    source: 'General Secretary Office',
    isBreaking: false,
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    viewsCount: '62K views'
  },
  {
    _id: 'news_6',
    title: 'Photo Story: TVK Green Tamil Nadu 1 Lakh Tree Sapling Plantation Drive',
    category: 'Announcements',
    type: 'gallery',
    summary: 'HD photo album capturing environmental volunteers planting Miyawaki urban micro-forests and rainwater harvesting pits in Salem, Trichy, and Coimbatore.',
    timeAgo: '8 hours ago',
    source: 'Environmental Wing',
    isBreaking: false,
    gallery: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
    viewsCount: '130K views'
  }
];

let newsStore = [...mockNews];

export const getLiveNews = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      count: newsStore.length,
      news: newsStore
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createNews = async (req, res) => {
  try {
    const { title, category, type, summary, source, isBreaking, imageUrl, videoUrl } = req.body;

    if (!title || !summary) {
      return res.status(400).json({ success: false, message: 'Title and summary are required' });
    }

    const newItem = {
      _id: `news_${Date.now()}`,
      title,
      category: category || 'Announcements',
      type: type || 'video',
      summary,
      timeAgo: 'Just now',
      source: source || 'TVK Media Desk',
      isBreaking: Boolean(isBreaking),
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=600&q=80',
      videoUrl: videoUrl || '',
      viewsCount: '1.0K views'
    };

    newsStore.unshift(newItem);

    return res.status(201).json({
      success: true,
      message: 'News item published successfully',
      newsItem: newItem
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const index = newsStore.findIndex((n) => n._id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'News item not found' });
    }

    newsStore[index] = { ...newsStore[index], ...req.body };

    return res.status(200).json({
      success: true,
      message: 'News item updated successfully',
      newsItem: newsStore[index]
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const initialLen = newsStore.length;
    newsStore = newsStore.filter((n) => n._id !== id);

    if (newsStore.length === initialLen) {
      return res.status(404).json({ success: false, message: 'News item not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'News item deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
