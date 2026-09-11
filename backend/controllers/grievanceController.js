import Grievance from '../models/Grievance.js';
import { isDbConnected } from '../config/db.js';

// In-memory fallback grievances store with Leader assignment
const inMemoryGrievances = [
  {
    _id: 'g_1',
    trackId: 'TVK-2026-8801',
    name: 'K. Raja',
    phone: '9876543210',
    constituency: 'Perambur',
    district: 'Chennai District (சென்னை)',
    category: 'Roads & Infrastructure',
    targetLeader: 'C. Joseph Vijay',
    priority: 'High',
    description: 'Main arterial road near Perambur flyover has deep ruts causing traffic delays. Immediate tarmac resurfacing needed.',
    status: 'In Progress',
    remarks: 'Dispatched to CM Secretariat & Perambur TVK Executive Desk.',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    _id: 'g_2',
    trackId: 'TVK-2026-8802',
    name: 'M. Shanmugam',
    phone: '9444123456',
    constituency: 'Perambur',
    district: 'Chennai District (சென்னை)',
    category: 'Education & Study Centers',
    targetLeader: 'C. Joseph Vijay',
    priority: 'Critical',
    description: 'Requesting installation of TVK solar-powered night study center with free textbooks in Vyasarpadi Ward 34.',
    status: 'Submitted',
    remarks: 'Assigned to Vijay TVK Student Welfare Wing.',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    _id: 'g_3',
    trackId: 'TVK-2026-8803',
    name: 'S. Karthik',
    phone: '9840987654',
    constituency: 'Thiyagarayanagar (T. Nagar)',
    district: 'Chennai District (சென்னை)',
    category: 'Stormwater Drainage',
    targetLeader: 'N. Anand (Bussy Anand)',
    priority: 'High',
    description: 'Pondy Bazaar side lane stormwater drain block causing water stagnation during evening rains.',
    status: 'In Progress',
    remarks: 'Bussy Anand personal team inspecting site with local engineers.',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    _id: 'g_4',
    trackId: 'TVK-2026-8804',
    name: 'R. Periasamy',
    phone: '9789012345',
    constituency: 'Gobichettipalayam',
    district: 'Erode District (ஈரோடு)',
    category: 'Agricultural Canal Irrigation',
    targetLeader: 'K. A. Sengottaiyan',
    priority: 'Critical',
    description: 'Canal sluice gate repair required at Kugalur branch canal to ensure water supply for sugarcane crops.',
    status: 'Resolved',
    remarks: 'Sengottaiyan intervention secured PWD sanction & repair completed.',
    createdAt: new Date(Date.now() - 172800000).toISOString()
  },
  {
    _id: 'g_5',
    trackId: 'TVK-2026-8805',
    name: 'V. Lakshmi',
    phone: '9876543210',
    constituency: 'Villivakkam',
    district: 'Chennai District (சென்னை)',
    category: 'Water Supply',
    targetLeader: 'Aadhav Arjuna',
    priority: 'Medium',
    description: 'Low drinking water pressure in Ward 58 residential quarters. Request booster pump servicing.',
    status: 'Submitted',
    remarks: 'Received at Aadhav Arjuna Campaign & Grievance Desk.',
    createdAt: new Date(Date.now() - 259200000).toISOString()
  },
  {
    _id: 'g_6',
    trackId: 'TVK-2026-8806',
    name: 'P. Murugan',
    phone: '9940112233',
    constituency: 'Thiruparankundram',
    district: 'Madurai District (மதுரை)',
    category: 'Street Lighting & Safety',
    targetLeader: 'Dr. Venkataramanan',
    priority: 'High',
    description: 'LED streetlights non-functional along Temple Ring Road stretch.',
    status: 'Resolved',
    remarks: 'Dr. Venkataramanan team replaced 18 high-mast LED fixtures.',
    createdAt: new Date(Date.now() - 345600000).toISOString()
  }
];

export const submitGrievance = async (req, res) => {
  try {
    const { name, phone, constituency, district, address, category, priority, description, targetLeader } = req.body;

    if (!name || !phone || !description) {
      return res.status(400).json({ success: false, message: 'Name, phone, and description are required.' });
    }

    const trackId = 'TVK-' + Math.floor(100000 + Math.random() * 900000);
    const assignedLeader = targetLeader || 'C. Joseph Vijay';

    let grievance;
    if (isDbConnected()) {
      try {
        grievance = await Grievance.create({
          trackId,
          name,
          phone,
          constituency: constituency || 'Perambur',
          district: district || 'Chennai District (சென்னை)',
          address: address || '',
          category: category || 'Roads',
          priority: priority || 'Medium',
          targetLeader: assignedLeader,
          description
        });
      } catch (err) {
        grievance = createInMemoryGrievance(trackId, name, phone, constituency, district, address, category, priority, description, assignedLeader);
      }
    } else {
      grievance = createInMemoryGrievance(trackId, name, phone, constituency, district, address, category, priority, description, assignedLeader);
    }

    return res.status(201).json({
      success: true,
      message: `Grievance submitted successfully and routed to ${assignedLeader}!`,
      trackId: grievance.trackId,
      grievance
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createInMemoryGrievance = (trackId, name, phone, constituency, district, address, category, priority, description, targetLeader) => {
  const g = {
    _id: `mem_g_${Date.now()}`,
    trackId,
    name,
    phone,
    constituency: constituency || 'Perambur',
    district: district || 'Chennai District (சென்னை)',
    address: address || '',
    category: category || 'Roads',
    priority: priority || 'Medium',
    targetLeader: targetLeader || 'C. Joseph Vijay',
    description,
    status: 'Submitted',
    remarks: `Dispatched directly to ${targetLeader || 'C. Joseph Vijay'} grievance desk.`,
    createdAt: new Date().toISOString()
  };
  inMemoryGrievances.unshift(g);
  return g;
};

export const trackGrievance = async (req, res) => {
  try {
    const { trackId } = req.params;

    let grievance;
    if (isDbConnected()) {
      try {
        grievance = await Grievance.findOne({ trackId });
      } catch (err) {
        grievance = inMemoryGrievances.find(g => g.trackId.toUpperCase() === trackId.toUpperCase());
      }
    } else {
      grievance = inMemoryGrievances.find(g => g.trackId.toUpperCase() === trackId.toUpperCase());
    }

    if (!grievance) {
      grievance = inMemoryGrievances.find(g => g.trackId.toUpperCase() === trackId.toUpperCase());
    }

    if (!grievance) {
      return res.status(404).json({ success: false, message: 'No grievance found with this Track ID' });
    }

    return res.status(200).json({
      success: true,
      grievance
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllGrievances = async (req, res) => {
  try {
    const { targetLeader } = req.query;
    let grievances = [];
    if (isDbConnected()) {
      try {
        const filter = {};
        if (targetLeader && targetLeader !== 'ALL') {
          filter.targetLeader = { $regex: targetLeader, $options: 'i' };
        }
        grievances = await Grievance.find(filter).sort({ createdAt: -1 });
        if (grievances.length === 0) grievances = inMemoryGrievances;
      } catch (err) {
        grievances = inMemoryGrievances;
      }
    } else {
      grievances = inMemoryGrievances;
    }

    if (targetLeader && targetLeader !== 'ALL') {
      const q = targetLeader.toLowerCase();
      grievances = grievances.filter(g => g.targetLeader && g.targetLeader.toLowerCase().includes(q));
    }

    return res.status(200).json({
      success: true,
      count: grievances.length,
      grievances
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateGrievanceStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remarks, targetLeader } = req.body;

    let grievance;
    if (isDbConnected()) {
      try {
        const updateObj = {};
        if (status) updateObj.status = status;
        if (remarks) updateObj.remarks = remarks;
        if (targetLeader) updateObj.targetLeader = targetLeader;
        
        grievance = await Grievance.findByIdAndUpdate(
          id,
          updateObj,
          { new: true }
        );
      } catch (err) {
        grievance = updateInMemoryGrievance(id, status, remarks, targetLeader);
      }
    } else {
      grievance = updateInMemoryGrievance(id, status, remarks, targetLeader);
    }

    if (!grievance) {
      return res.status(404).json({ success: false, message: 'Grievance not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Grievance updated successfully',
      grievance
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateInMemoryGrievance = (id, status, remarks, targetLeader) => {
  const idx = inMemoryGrievances.findIndex(g => g._id === id || g.trackId === id);
  if (idx !== -1) {
    if (status) inMemoryGrievances[idx].status = status;
    if (remarks) inMemoryGrievances[idx].remarks = remarks;
    if (targetLeader) inMemoryGrievances[idx].targetLeader = targetLeader;
    return inMemoryGrievances[idx];
  }
  return null;
};
