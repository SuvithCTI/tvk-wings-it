import Service from '../models/Service.js';
import { isDbConnected } from '../config/db.js';

const mockServices = [
  {
    _id: 'srv_1',
    title: 'Digital E-Patta & Land Registry Help Desk',
    tamilTitle: 'மின்-பட்டா மற்றும் நிலப் பதிவு உதவி மையம்',
    category: 'Revenue Services',
    description: 'Direct assistance for land patta transfer, encumbrance certificate (EC), digital boundary verification, and revenue document application.',
    benefits: ['Free online application filing', 'Fast-track revenue department follow-up', 'Real-time SMS status tracking']
  },
  {
    _id: 'srv_2',
    title: 'Senior Citizen & Widow Pension Portal',
    tamilTitle: 'முதியோர் மற்றும் விதவை ஓய்வூதிய உதவி',
    category: 'Social Welfare',
    description: 'On-spot documentation support for senior citizen monthly pension schemes, widow financial aid, and disability welfare grants.',
    benefits: ['Monthly direct bank transfer guidance', 'Doorstep document collection for elderly', 'Zero processing fee']
  },
  {
    _id: 'srv_3',
    title: 'TVK Youth Education & Exam Scholarship',
    tamilTitle: 'மாணவர் கல்வி உதவித்தொகை & போட்டித் தேர்வு உதவி',
    category: 'Education',
    description: 'Financial aid for higher secondary students, laptop assistance, and free coaching for TNPSC, SSC, Railway & Bank competitive exams.',
    benefits: ['100% Merit-based educational scholarship', 'Free study material & practice mock tests', 'Expert guidance by TVK Academic Cell']
  },
  {
    _id: 'srv_4',
    title: 'Constituency Free Legal Aid Cell',
    tamilTitle: 'இலவச சட்ட உதவி மையம்',
    category: 'Legal Aid',
    description: 'Pro-bono legal consultation by TVK Legal Cell advocates for land disputes, civil rights, police guidance, and consumer protection.',
    benefits: ['Experienced TVK advocate panel', '100% Confidential consultation', 'Court filing & documentation guidance']
  },
  {
    _id: 'srv_5',
    title: 'TVK 24/7 Blood Donor & Emergency Ambulance Desk',
    tamilTitle: 'குருதிக்கொடை மற்றும் அவசர ஆம்புலன்ஸ் சேவை',
    category: 'Healthcare',
    description: 'Instant connection to 50,000+ TVK volunteer blood donors and emergency ambulance dispatch for hospital surgeries and trauma care.',
    benefits: ['24/7 Emergency donor matching', 'Rare blood group availability', 'Free ambulance coordinate service']
  },
  {
    _id: 'srv_6',
    title: 'TVK Women Livelihood & Sewing Machine Scheme',
    tamilTitle: 'மகளிர் வாழ்வாதார தையல் இயந்திர திட்டம்',
    category: 'Women Empowerment',
    description: 'Distribution of free motorized sewing machines, cottage industry training, and micro-grant support for rural women self-help groups.',
    benefits: ['Free motorized sewing equipment', 'Skill certification for self-employment', 'Self-help group micro-credit guidance']
  },
  {
    _id: 'srv_7',
    title: 'TVK Youth IT Skill & Coding Bootcamp',
    tamilTitle: 'இளைஞர் தகவல் தொழில்நுட்ப பயிற்சி மையம்',
    category: 'Digital & Career',
    description: 'Free computer literacy, web development, coding bootcamps, and resume preparation courses for unemployed constituency youth.',
    benefits: ['Hands-on software training', 'Industry career placement guidance', 'Free certificate upon completion']
  },
  {
    _id: 'srv_8',
    title: 'RO Pure Water & Civic Infrastructure Redressal',
    tamilTitle: 'தூய்மை குடிநீர் & நகர்ப்புற குறைகேள் சேவை',
    category: 'Sanitation & Civic',
    description: 'Request community RO purified drinking water installation, street light repair, and underground drainage escalation in your ward.',
    benefits: ['Prompt civic escalation to authorities', 'Clean drinking water access', 'Ward-level monitoring by TVK volunteers']
  }
];

let servicesStore = [...mockServices];

export const getServices = async (req, res) => {
  try {
    let services = servicesStore;
    if (isDbConnected()) {
      try {
        const dbServices = await Service.find();
        const titlesInDb = new Set(dbServices.map(s => s.title));
        const missingMock = servicesStore.filter(m => !titlesInDb.has(m.title));
        services = [...dbServices, ...missingMock];
      } catch (err) {
        services = servicesStore;
      }
    }

    return res.status(200).json({
      success: true,
      count: services.length,
      services
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const applyForService = async (req, res) => {
  try {
    const { serviceId, applicantName, phone, address, details } = req.body;

    const applicationId = `TVK-SRV-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    return res.status(200).json({
      success: true,
      message: 'Service application submitted successfully!',
      applicationId,
      details: { serviceId, applicantName, phone, address, details }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createService = async (req, res) => {
  try {
    const { title, tamilTitle, category, description, benefits } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Service title and description are required' });
    }

    const newService = {
      _id: `srv_${Date.now()}`,
      title,
      tamilTitle: tamilTitle || title,
      category: category || 'General Assistance',
      description,
      benefits: Array.isArray(benefits) ? benefits : [benefits || 'Direct citizen welfare assistance']
    };

    try {
      await Service.create(newService);
    } catch (e) {
      servicesStore.unshift(newService);
    }

    return res.status(201).json({
      success: true,
      message: 'Service published successfully',
      service: newService
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const index = servicesStore.findIndex((s) => s._id === id);

    if (index !== -1) {
      servicesStore[index] = { ...servicesStore[index], ...req.body };
    }

    try {
      await Service.findByIdAndUpdate(id, req.body);
    } catch (e) {}

    return res.status(200).json({
      success: true,
      message: 'Service updated successfully'
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    servicesStore = servicesStore.filter((s) => s._id !== id);

    try {
      await Service.findByIdAndDelete(id);
    } catch (e) {}

    return res.status(200).json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
