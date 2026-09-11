import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { MobileHeader } from './MobileHeader';
import { MobileBottomNav } from './MobileBottomNav';
import { 
  getAllGrievancesApi, updateGrievanceStatusApi, 
  getLeadersApi, createLeaderApi, updateLeaderApi, deleteLeaderApi,
  getDevelopmentsApi, createDevelopmentApi, updateDevelopmentApi, deleteDevelopmentApi,
  getLiveNewsApi, createNewsApi, updateNewsApi, deleteNewsApi,
  getServicesApi, createServiceApi, updateServiceApi, deleteServiceApi
} from '../../services/api';
import { 
  Shield, CheckCircle2, Clock, Plus, Tag, RefreshCw, AlertCircle, 
  Users, Building2, Newspaper, HeartHandshake, Edit3, Trash2, X
} from 'lucide-react';

export const MobileAdmin = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('grievances'); // 'grievances' | 'leaders' | 'developments' | 'news' | 'services'
  const [selectedLeaderFilter, setSelectedLeaderFilter] = useState('ALL');
  
  // Grievances State
  const [grievances, setGrievances] = useState([]);
  const [grievanceLoading, setGrievanceLoading] = useState(true);
  const [selectedGrievance, setSelectedGrievance] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [newRemarks, setNewRemarks] = useState('');
  const [newTargetLeader, setNewTargetLeader] = useState('C. Joseph Vijay');

  // Leaders State
  const [leaders, setLeaders] = useState([]);
  const [leadersLoading, setLeadersLoading] = useState(true);
  const [showLeaderModal, setShowLeaderModal] = useState(false);
  const [editingLeader, setEditingLeader] = useState(null);
  const [leaderForm, setLeaderForm] = useState({
    rep: '', constituency: '', district: '', position: '', govtPosition: '', partyPosition: '', status: 'MLA', importantNote: '', photo: ''
  });

  // Developments State
  const [developments, setDevelopments] = useState([]);
  const [devLoading, setDevLoading] = useState(true);
  const [showDevModal, setShowDevModal] = useState(false);
  const [editingDev, setEditingDev] = useState(null);
  const [devForm, setDevForm] = useState({
    title: '', category: 'Infrastructure', description: '', location: '', budget: '₹ 5 Crore', status: 'In Progress', imageUrl: ''
  });

  // Live News State
  const [newsList, setNewsList] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [newsForm, setNewsForm] = useState({
    title: '', category: 'Announcements', type: 'video', summary: '', source: 'TVK Media Desk', isBreaking: false, imageUrl: '', videoUrl: ''
  });

  // Services State
  const [servicesList, setServicesList] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    title: '', tamilTitle: '', category: 'General Assistance', description: '', benefits: ''
  });

  // Optimized concurrent data fetcher
  const fetchAllAdminData = async () => {
    setGrievanceLoading(true);
    setLeadersLoading(true);
    setDevLoading(true);
    setNewsLoading(true);
    setServicesLoading(true);

    const [gRes, lRes, dRes, nRes, sRes] = await Promise.allSettled([
      getAllGrievancesApi(),
      getLeadersApi(),
      getDevelopmentsApi(),
      getLiveNewsApi(),
      getServicesApi()
    ]);

    if (gRes.status === 'fulfilled' && gRes.value?.data?.success) setGrievances(gRes.value.data.grievances);
    setGrievanceLoading(false);

    if (lRes.status === 'fulfilled' && lRes.value?.data?.success) setLeaders(lRes.value.data.leaders);
    setLeadersLoading(false);

    if (dRes.status === 'fulfilled' && dRes.value?.data?.success) setDevelopments(dRes.value.data.developments);
    setDevLoading(false);

    if (nRes.status === 'fulfilled' && nRes.value?.data?.success) setNewsList(nRes.value.data.news);
    setNewsLoading(false);

    if (sRes.status === 'fulfilled' && sRes.value?.data?.success) setServicesList(sRes.value.data.services);
    setServicesLoading(false);
  };

  const fetchGrievances = () => {
    getAllGrievancesApi().then(res => { if (res.data?.success) setGrievances(res.data.grievances); }).catch(() => {});
  };

  const fetchLeaders = () => {
    getLeadersApi().then(res => { if (res.data?.success) setLeaders(res.data.leaders); }).catch(() => {});
  };

  const fetchDevelopments = () => {
    getDevelopmentsApi().then(res => { if (res.data?.success) setDevelopments(res.data.developments); }).catch(() => {});
  };

  const fetchNews = () => {
    getLiveNewsApi().then(res => { if (res.data?.success) setNewsList(res.data.news); }).catch(() => {});
  };

  const fetchServices = () => {
    getServicesApi().then(res => { if (res.data?.success) setServicesList(res.data.services); }).catch(() => {});
  };

  const isSuperAdmin = user?.role === 'superadmin';
  const mlaLeaderName = user?.assignedLeader || 'C. Joseph Vijay';

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role === 'citizen') {
      navigate('/');
      return;
    }
    fetchAllAdminData();
    if (user && user.role !== 'superadmin') {
      setActiveTab('grievances');
      if (user.assignedLeader) {
        setSelectedLeaderFilter(user.assignedLeader);
      }
    }
  }, [user, navigate]);

  const handleUpdateGrievance = async (e) => {
    e.preventDefault();
    if (!selectedGrievance) return;
    try {
      await updateGrievanceStatusApi(selectedGrievance._id, { status: newStatus, remarks: newRemarks, targetLeader: newTargetLeader });
      setSelectedGrievance(null);
      fetchGrievances();
    } catch (err) {
      alert('Error updating grievance');
    }
  };

  const handleSaveLeader = async (e) => {
    e.preventDefault();
    try {
      if (editingLeader) {
        await updateLeaderApi(editingLeader._id || editingLeader.id, leaderForm);
      } else {
        await createLeaderApi(leaderForm);
      }
      setShowLeaderModal(false);
      fetchLeaders();
    } catch (err) {
      alert('Error saving leader');
    }
  };

  const handleDeleteLeader = async (id) => {
    if (!window.confirm('Delete this leader record?')) return;
    try {
      await deleteLeaderApi(id);
      fetchLeaders();
    } catch (err) {
      alert('Error deleting leader');
    }
  };

  const handleSaveDev = async (e) => {
    e.preventDefault();
    try {
      if (editingDev) {
        await updateDevelopmentApi(editingDev._id, devForm);
      } else {
        await createDevelopmentApi(devForm);
      }
      setShowDevModal(false);
      fetchDevelopments();
    } catch (err) {
      alert('Error saving project');
    }
  };

  const handleDeleteDev = async (id) => {
    if (!window.confirm('Delete project?')) return;
    try {
      await deleteDevelopmentApi(id);
      fetchDevelopments();
    } catch (err) {
      alert('Error deleting project');
    }
  };

  const handleSaveNews = async (e) => {
    e.preventDefault();
    try {
      if (editingNews) {
        await updateNewsApi(editingNews._id, newsForm);
      } else {
        await createNewsApi(newsForm);
      }
      setShowNewsModal(false);
      fetchNews();
    } catch (err) {
      alert('Error saving news');
    }
  };

  const handleDeleteNews = async (id) => {
    if (!window.confirm('Delete news?')) return;
    try {
      await deleteNewsApi(id);
      fetchNews();
    } catch (err) {
      alert('Error deleting news');
    }
  };

  const handleSaveService = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...serviceForm,
        benefits: typeof serviceForm.benefits === 'string' ? serviceForm.benefits.split(',').map(b => b.trim()) : serviceForm.benefits
      };
      if (editingService) {
        await updateServiceApi(editingService._id, payload);
      } else {
        await createServiceApi(payload);
      }
      setShowServiceModal(false);
      fetchServices();
    } catch (err) {
      alert('Error saving service');
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm('Delete service?')) return;
    try {
      await deleteServiceApi(id);
      fetchServices();
    } catch (err) {
      alert('Error deleting service');
    }
  };

  const effectiveFilter = isSuperAdmin ? selectedLeaderFilter : mlaLeaderName;
  const filteredGrievances = grievances.filter(g => {
    return effectiveFilter === 'ALL' || 
           (g.targetLeader || '').toLowerCase().includes(effectiveFilter.toLowerCase()) ||
           (g.constituency || '').toLowerCase().includes(effectiveFilter.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans pb-24">
      <MobileHeader />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-tvk-dark to-tvk-darkred text-white p-5 space-y-1 text-center">
        <span className="px-2.5 py-0.5 bg-tvk-yellow text-tvk-dark font-black text-[10px] uppercase rounded-full">
          {isSuperAdmin ? '👑 Super Admin Control' : `⭐ ${mlaLeaderName} Admin Desk`}
        </span>
        <h1 className="text-lg font-black text-white">
          {isSuperAdmin ? 'Super Admin Master Command' : `${mlaLeaderName} Constituency Desk`}
        </h1>
        <p className="text-[11px] text-gray-300">
          Admin: {user?.name || 'TVK Administrator'} ({user?.role?.toUpperCase() || 'ADMIN'})
        </p>
      </section>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 overflow-x-auto flex text-xs font-bold scrollbar-none">
        <button
          onClick={() => setActiveTab('grievances')}
          className={`px-4 py-3 flex items-center gap-1 shrink-0 border-b-2 ${
            activeTab === 'grievances' ? 'border-tvk-red text-tvk-red bg-rose-50/50' : 'border-transparent text-gray-600'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>{isSuperAdmin ? `Grievances (${grievances.length})` : `Constituency Grievances (${filteredGrievances.length})`}</span>
        </button>

        {isSuperAdmin && (
          <>
            <button
              onClick={() => setActiveTab('leaders')}
              className={`px-4 py-3 flex items-center gap-1 shrink-0 border-b-2 ${
                activeTab === 'leaders' ? 'border-tvk-red text-tvk-red bg-rose-50/50' : 'border-transparent text-gray-600'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>MLAs & Leaders ({leaders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('developments')}
              className={`px-4 py-3 flex items-center gap-1 shrink-0 border-b-2 ${
                activeTab === 'developments' ? 'border-tvk-red text-tvk-red bg-rose-50/50' : 'border-transparent text-gray-600'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Projects ({developments.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('news')}
              className={`px-4 py-3 flex items-center gap-1 shrink-0 border-b-2 ${
                activeTab === 'news' ? 'border-tvk-red text-tvk-red bg-rose-50/50' : 'border-transparent text-gray-600'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5" />
              <span>News ({newsList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-3 flex items-center gap-1 shrink-0 border-b-2 ${
                activeTab === 'services' ? 'border-tvk-red text-tvk-red bg-rose-50/50' : 'border-transparent text-gray-600'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Services ({servicesList.length})</span>
            </button>
          </>
        )}
      </div>

      <div className="p-4 space-y-4 flex-1">
        {/* GRIEVANCES TAB */}
        {activeTab === 'grievances' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold text-sm text-gray-900">Grievance Records</h2>
              <button onClick={fetchGrievances} className="text-xs font-bold text-tvk-red flex items-center gap-1">
                <RefreshCw className="w-3 h-3" /> Refresh
              </button>
            </div>

            {/* Leader Filter Selector */}
            {isSuperAdmin && (
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-300 space-y-1.5 shadow-xs">
                <label className="text-[11px] font-black text-slate-800 block">Filter by Target Representative:</label>
                <select
                  value={selectedLeaderFilter}
                  onChange={(e) => setSelectedLeaderFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-amber-400 rounded-xl text-xs font-black text-slate-900 outline-none"
                >
                  <option value="ALL">🌟 All TVK Assembly Leaders (11)</option>
                  <option value="Vijay">🏆 C. Joseph Vijay (Perambur)</option>
                  <option value="Anand">N. Anand (Bussy Anand) (T. Nagar)</option>
                  <option value="Sengottaiyan">K. A. Sengottaiyan (Gobichettipalayam)</option>
                  <option value="Aadhav Arjuna">Aadhav Arjuna (Villivakkam)</option>
                  <option value="CTR Nirmal Kumar">CTR Nirmal Kumar (Singanallur)</option>
                  <option value="Venkataramanan">Dr. Venkataramanan (Thiruparankundram)</option>
                </select>
              </div>
            )}

            {grievanceLoading ? (
              <p className="text-center py-8 text-xs text-gray-500 font-bold">Loading grievances...</p>
            ) : (
              <div className="space-y-2.5">
                {filteredGrievances.map((g) => (
                  <div key={g._id} className="bg-white p-4 rounded-2xl shadow border border-gray-200 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-tvk-red">#{g.trackId}</span>
                      <span className={`px-2 py-0.5 font-bold rounded-full text-[9px] uppercase ${
                        g.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {g.status}
                      </span>
                    </div>

                    <div className="p-2 bg-amber-50 rounded-xl text-[11px] font-black text-amber-950 flex items-center gap-1">
                      <span>🎯 Targeted to:</span>
                      <span className="text-tvk-red">{g.targetLeader || 'C. Joseph Vijay'}</span>
                    </div>

                    <div>
                      <strong className="block text-xs text-gray-900">{g.name} ({g.phone})</strong>
                      <span className="text-[11px] text-gray-500">{g.constituency} • {g.category}</span>
                    </div>

                    <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded-xl">{g.description}</p>

                    <button
                      onClick={() => { 
                        setSelectedGrievance(g); 
                        setNewStatus(g.status); 
                        setNewRemarks(g.remarks || ''); 
                        setNewTargetLeader(g.targetLeader || 'C. Joseph Vijay');
                      }}
                      className="w-full py-2 bg-tvk-dark text-white text-xs font-bold rounded-xl"
                    >
                      Update & Route
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* LEADERS TAB */}
        {activeTab === 'leaders' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold text-sm text-gray-900">MLAs & Leaders Manager</h2>
              <button
                onClick={() => {
                  setEditingLeader(null);
                  setLeaderForm({ rep: '', constituency: '', district: '', position: '', govtPosition: '', partyPosition: '', status: 'MLA', importantNote: '', photo: '' });
                  setShowLeaderModal(true);
                }}
                className="px-3 py-1.5 bg-tvk-red text-white text-xs font-bold rounded-xl flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add MLA
              </button>
            </div>

            {leadersLoading ? (
              <p className="text-center py-8 text-xs text-gray-500 font-bold">Loading leaders...</p>
            ) : (
              <div className="space-y-3">
                {leaders.map((leader) => (
                  <div key={leader._id || leader.id} className="bg-white p-4 rounded-2xl shadow border border-gray-200 space-y-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={leader.photo || '/tvk_president_vijay.png'}
                        alt={leader.rep}
                        className="w-12 h-12 rounded-xl object-cover border border-amber-300 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-extrabold text-xs text-gray-900 truncate">{leader.rep}</h3>
                        <span className="text-[11px] font-bold text-tvk-red block">{leader.constituency}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                      <span className="text-[10px] font-bold uppercase text-amber-800">{leader.status}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditingLeader(leader); setLeaderForm(leader); setShowLeaderModal(true); }}
                          className="p-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteLeader(leader._id || leader.id)}
                          className="p-1.5 bg-rose-100 text-tvk-red rounded-lg text-xs"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* DEVELOPMENTS TAB */}
        {activeTab === 'developments' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold text-sm text-gray-900">Projects Manager</h2>
              <button
                onClick={() => {
                  setEditingDev(null);
                  setDevForm({ title: '', category: 'Infrastructure', description: '', location: '', budget: '₹ 5 Crore', status: 'In Progress', imageUrl: '' });
                  setShowDevModal(true);
                }}
                className="px-3 py-1.5 bg-tvk-red text-white text-xs font-bold rounded-xl flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Project
              </button>
            </div>

            {devLoading ? (
              <p className="text-center py-8 text-xs text-gray-500 font-bold">Loading projects...</p>
            ) : (
              <div className="space-y-3">
                {developments.map((dev) => (
                  <div key={dev._id} className="bg-white p-4 rounded-2xl shadow border border-gray-200 space-y-2">
                    <h3 className="font-extrabold text-xs text-gray-900">{dev.title}</h3>
                    <p className="text-[11px] text-gray-600">{dev.description}</p>
                    <div className="flex justify-between items-center text-[10px] pt-1">
                      <span className="font-bold text-tvk-red">{dev.budget}</span>
                      <div className="flex gap-2">
                        <button onClick={() => { setEditingDev(dev); setDevForm(dev); setShowDevModal(true); }} className="p-1 bg-gray-100 rounded">
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDeleteDev(dev._id)} className="p-1 bg-rose-100 text-tvk-red rounded">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* NEWS TAB */}
        {activeTab === 'news' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold text-sm text-gray-900">Live News Manager</h2>
              <button
                onClick={() => {
                  setEditingNews(null);
                  setNewsForm({ title: '', category: 'Announcements', type: 'video', summary: '', source: 'TVK Media Desk', isBreaking: false, imageUrl: '', videoUrl: '' });
                  setShowNewsModal(true);
                }}
                className="px-3 py-1.5 bg-tvk-red text-white text-xs font-bold rounded-xl flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add News
              </button>
            </div>

            {newsLoading ? (
              <p className="text-center py-8 text-xs text-gray-500 font-bold">Loading news...</p>
            ) : (
              <div className="space-y-3">
                {newsList.map((news) => (
                  <div key={news._id} className="bg-white p-4 rounded-2xl shadow border border-gray-200 space-y-2">
                    <h3 className="font-extrabold text-xs text-gray-900">{news.title}</h3>
                    <p className="text-[11px] text-gray-600 line-clamp-2">{news.summary}</p>
                    <div className="flex justify-between items-center text-[10px] pt-1">
                      <span className="font-bold text-gray-500">{news.source}</span>
                      <div className="flex gap-2">
                        <button onClick={() => { setEditingNews(news); setNewsForm(news); setShowNewsModal(true); }} className="p-1 bg-gray-100 rounded">
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDeleteNews(news._id)} className="p-1 bg-rose-100 text-tvk-red rounded">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SERVICES TAB */}
        {activeTab === 'services' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold text-sm text-gray-900">Services Manager</h2>
              <button
                onClick={() => {
                  setEditingService(null);
                  setServiceForm({ title: '', tamilTitle: '', category: 'General Assistance', description: '', benefits: '' });
                  setShowServiceModal(true);
                }}
                className="px-3 py-1.5 bg-tvk-red text-white text-xs font-bold rounded-xl flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Service
              </button>
            </div>

            {servicesLoading ? (
              <p className="text-center py-8 text-xs text-gray-500 font-bold">Loading services...</p>
            ) : (
              <div className="space-y-3">
                {servicesList.map((srv) => (
                  <div key={srv._id} className="bg-white p-4 rounded-2xl shadow border border-gray-200 space-y-2">
                    <h3 className="font-extrabold text-xs text-gray-900">{srv.title}</h3>
                    <p className="font-tamil text-[11px] font-bold text-tvk-red">{srv.tamilTitle}</p>
                    <p className="text-[11px] text-gray-600">{srv.description}</p>
                    <div className="flex justify-end gap-2 pt-1">
                      <button onClick={() => { setEditingService(srv); setServiceForm({ ...srv, benefits: Array.isArray(srv.benefits) ? srv.benefits.join(', ') : srv.benefits }); setShowServiceModal(true); }} className="p-1 bg-gray-100 rounded">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteService(srv._id)} className="p-1 bg-rose-100 text-tvk-red rounded">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* UPDATE GRIEVANCE MODAL */}
      {selectedGrievance && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-sm w-full rounded-2xl p-5 space-y-3">
            <h3 className="font-extrabold text-sm text-gray-900">Update & Route Grievance #{selectedGrievance.trackId}</h3>
            <form onSubmit={handleUpdateGrievance} className="space-y-3">
              <div>
                <label className="text-[11px] font-black text-gray-700 block mb-1">
                  Target Representative {isSuperAdmin ? '(Super Admin)' : '(Fixed for Constituency)'}
                </label>
                {isSuperAdmin ? (
                  <select
                    value={newTargetLeader} onChange={(e) => setNewTargetLeader(e.target.value)}
                    className="w-full px-3 py-2 bg-amber-50 border border-amber-300 rounded-xl text-xs font-black text-slate-900"
                  >
                    <option value="C. Joseph Vijay">🏆 C. Joseph Vijay (Perambur)</option>
                    <option value="N. Anand (Bussy Anand)">N. Anand (Bussy Anand) (T. Nagar)</option>
                    <option value="K. A. Sengottaiyan">K. A. Sengottaiyan (Gobichettipalayam)</option>
                    <option value="Aadhav Arjuna">Aadhav Arjuna (Villivakkam)</option>
                    <option value="CTR Nirmal Kumar">CTR Nirmal Kumar (Singanallur)</option>
                    <option value="Dr. Venkataramanan">Dr. Venkataramanan (Thiruparankundram)</option>
                  </select>
                ) : (
                  <div className="w-full px-3 py-2 bg-amber-50 border border-amber-300 rounded-xl text-xs font-black text-slate-900 flex items-center justify-between">
                    <span>{selectedGrievance.targetLeader || mlaLeaderName}</span>
                    <span className="text-[9px] font-extrabold text-amber-950 bg-amber-200 px-1.5 py-0.5 rounded">🔒 Locked</span>
                  </div>
                )}
              </div>

              <div>
                <label className="text-[11px] font-black text-gray-700 block mb-1">Resolution Status</label>
                <select
                  value={newStatus} onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs font-bold"
                >
                  <option value="Submitted">Submitted</option>
                  <option value="In Verification">In Verification</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
              <textarea
                rows={3} placeholder="Remarks"
                value={newRemarks} onChange={(e) => setNewRemarks(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-xs"
              ></textarea>
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setSelectedGrievance(null)} className="px-3 py-1.5 bg-gray-100 text-xs font-bold rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-tvk-red text-white text-xs font-bold rounded-xl">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LEADER MODAL */}
      {showLeaderModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-sm w-full rounded-2xl p-5 space-y-3 max-h-[90vh] overflow-y-auto">
            <h3 className="font-extrabold text-sm text-gray-900">{editingLeader ? 'Edit Leader' : 'Add Leader/MLA'}</h3>
            <form onSubmit={handleSaveLeader} className="space-y-2.5 text-xs">
              <input
                type="text" required placeholder="Representative Name *"
                value={leaderForm.rep} onChange={(e) => setLeaderForm({ ...leaderForm, rep: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
              />
              <input
                type="text" required placeholder="Constituency *"
                value={leaderForm.constituency} onChange={(e) => setLeaderForm({ ...leaderForm, constituency: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
              />
              <input
                type="text" placeholder="Position (e.g. MLA & General Secretary)"
                value={leaderForm.position} onChange={(e) => setLeaderForm({ ...leaderForm, position: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
              />
              <input
                type="text" placeholder="Photo URL"
                value={leaderForm.photo} onChange={(e) => setLeaderForm({ ...leaderForm, photo: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
              />
              <textarea
                rows={2} placeholder="Important Note"
                value={leaderForm.importantNote} onChange={(e) => setLeaderForm({ ...leaderForm, importantNote: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
              ></textarea>
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setShowLeaderModal(false)} className="px-3 py-1.5 bg-gray-100 text-xs font-bold rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-tvk-red text-white text-xs font-bold rounded-xl">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DEV MODAL */}
      {showDevModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-sm w-full rounded-2xl p-5 space-y-3">
            <h3 className="font-extrabold text-sm text-gray-900">{editingDev ? 'Edit Project' : 'Add Project'}</h3>
            <form onSubmit={handleSaveDev} className="space-y-2.5 text-xs">
              <input
                type="text" required placeholder="Project Title *"
                value={devForm.title} onChange={(e) => setDevForm({ ...devForm, title: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
              />
              <textarea
                required rows={3} placeholder="Project Description *"
                value={devForm.description} onChange={(e) => setDevForm({ ...devForm, description: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
              ></textarea>
              <input
                type="text" placeholder="Budget e.g. ₹ 8 Crore"
                value={devForm.budget} onChange={(e) => setDevForm({ ...devForm, budget: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
              />
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setShowDevModal(false)} className="px-3 py-1.5 bg-gray-100 text-xs font-bold rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-tvk-red text-white text-xs font-bold rounded-xl">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NEWS MODAL */}
      {showNewsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-sm w-full rounded-2xl p-5 space-y-3">
            <h3 className="font-extrabold text-sm text-gray-900">{editingNews ? 'Edit News' : 'Publish News'}</h3>
            <form onSubmit={handleSaveNews} className="space-y-2.5 text-xs">
              <input
                type="text" required placeholder="Title *"
                value={newsForm.title} onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
              />
              <textarea
                required rows={3} placeholder="Summary *"
                value={newsForm.summary} onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
              ></textarea>
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setShowNewsModal(false)} className="px-3 py-1.5 bg-gray-100 text-xs font-bold rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-tvk-red text-white text-xs font-bold rounded-xl">Publish</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SERVICE MODAL */}
      {showServiceModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-sm w-full rounded-2xl p-5 space-y-3">
            <h3 className="font-extrabold text-sm text-gray-900">{editingService ? 'Edit Service' : 'Add Service'}</h3>
            <form onSubmit={handleSaveService} className="space-y-2.5 text-xs">
              <input
                type="text" required placeholder="Title *"
                value={serviceForm.title} onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
              />
              <textarea
                required rows={3} placeholder="Description *"
                value={serviceForm.description} onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border rounded-xl"
              ></textarea>
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setShowServiceModal(false)} className="px-3 py-1.5 bg-gray-100 text-xs font-bold rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-tvk-red text-white text-xs font-bold rounded-xl">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <MobileBottomNav />
    </div>
  );
};
