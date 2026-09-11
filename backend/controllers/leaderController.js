import User from '../models/User.js';

// Full initial directory of TVK Assembly Representatives & Candidates (11 records)
let leadersStore = [
  { 
    id: 'Perambur', 
    _id: 'leader_1',
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
    _id: 'leader_2',
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
    _id: 'leader_3',
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
    _id: 'leader_4',
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
    _id: 'leader_5',
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
    _id: 'leader_6',
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
    _id: 'leader_7',
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
    _id: 'leader_8',
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
    _id: 'leader_9',
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
    _id: 'leader_10',
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
    _id: 'leader_11',
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
];

export const getLeaders = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      count: leadersStore.length,
      leaders: leadersStore
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createLeader = async (req, res) => {
  try {
    const {
      rep,
      name,
      constituency,
      district,
      position,
      govtPosition,
      partyPosition,
      status,
      importantNote,
      photo
    } = req.body;

    if (!rep || !constituency) {
      return res.status(400).json({ success: false, message: 'Representative name and constituency are required' });
    }

    const id = constituency.toLowerCase().replace(/[^a-z0-9]/g, '');
    const newLeader = {
      _id: `leader_${Date.now()}`,
      id: id || `leader_${Date.now()}`,
      name: name || `${constituency}`,
      rep,
      constituency,
      district: district || 'Tamil Nadu',
      position: position || 'TVK Assembly Representative',
      govtPosition: govtPosition || position || 'MLA Candidate',
      party: 'Tamilaga Vettri Kazhagam (TVK)',
      partyPosition: partyPosition || 'TVK Representative',
      status: status || 'MLA',
      importantNote: importantNote || 'Active representative serving constituency welfare.',
      photo: photo || '/tvk_president_vijay.png'
    };

    leadersStore.unshift(newLeader);

    return res.status(201).json({
      success: true,
      message: 'Leader/MLA added successfully',
      leader: newLeader
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateLeader = async (req, res) => {
  try {
    const { id } = req.params;
    const index = leadersStore.findIndex((l) => l._id === id || l.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Leader not found' });
    }

    leadersStore[index] = {
      ...leadersStore[index],
      ...req.body
    };

    return res.status(200).json({
      success: true,
      message: 'Leader details updated successfully',
      leader: leadersStore[index]
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteLeader = async (req, res) => {
  try {
    const { id } = req.params;
    const initialLen = leadersStore.length;
    leadersStore = leadersStore.filter((l) => l._id !== id && l.id !== id);

    if (leadersStore.length === initialLen) {
      return res.status(404).json({ success: false, message: 'Leader not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Leader deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
