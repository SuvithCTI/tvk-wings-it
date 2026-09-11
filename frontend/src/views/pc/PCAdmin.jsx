import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { PCHeader } from './PCHeader';
import { PCFooter } from './PCFooter';
import { TVKFlag } from '../../components/common/TVKFlag';
import { 
  getAllGrievancesApi, updateGrievanceStatusApi, 
  getLeadersApi, createLeaderApi, updateLeaderApi, deleteLeaderApi,
  getDevelopmentsApi, createDevelopmentApi, updateDevelopmentApi, deleteDevelopmentApi,
  getLiveNewsApi, createNewsApi, updateNewsApi, deleteNewsApi,
  getServicesApi, createServiceApi, updateServiceApi, deleteServiceApi
} from '../../services/api';
import { 
  Shield, CheckCircle2, Clock, Plus, Tag, RefreshCw, AlertCircle, 
  Users, Building2, Newspaper, HeartHandshake, Edit3, Trash2, X, Search,
  TrendingUp, Award, Layers, Filter, CheckCircle, ExternalLink, Sparkles, UserCheck, Check
} from 'lucide-react';

export const PCAdmin = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('grievances'); // 'grievances' | 'leaders' | 'developments' | 'news' | 'services'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedLeaderFilter, setSelectedLeaderFilter] = useState('ALL'); // 'ALL' | 'C. Joseph Vijay' | etc.
  const [toastMsg, setToastMsg] = useState('');
  
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

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

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

  // Handlers
  const handleSaveLeader = async (e) => {
    e.preventDefault();
    try {
      if (editingLeader) {
        await updateLeaderApi(editingLeader._id || editingLeader.id, leaderForm);
        showToast('✅ Representative details updated successfully!');
      } else {
        await createLeaderApi(leaderForm);
        showToast('🎉 New TVK Assembly Leader added to live Explorer!');
      }
      setShowLeaderModal(false);
      setEditingLeader(null);
      fetchLeaders();
    } catch (err) {
      alert('Error saving leader: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteLeader = async (id) => {
    if (!window.confirm('Delete this TVK Representative record?')) return;
    try {
      await deleteLeaderApi(id);
      showToast('🗑️ Leader record deleted.');
      fetchLeaders();
    } catch (err) {
      alert('Error deleting record');
    }
  };

  const handleUpdateGrievance = async (e) => {
    e.preventDefault();
    if (!selectedGrievance) return;
    try {
      await updateGrievanceStatusApi(selectedGrievance._id, {
        status: newStatus,
        remarks: newRemarks,
        targetLeader: newTargetLeader
      });
      showToast(`✅ Grievance #${selectedGrievance.trackId} updated & routed to ${newTargetLeader}!`);
      setSelectedGrievance(null);
      fetchGrievances();
    } catch (err) {
      alert('Error updating status');
    }
  };

  const handleSaveDev = async (e) => {
    e.preventDefault();
    try {
      if (editingDev) {
        await updateDevelopmentApi(editingDev._id, devForm);
        showToast('✅ Development project updated!');
      } else {
        await createDevelopmentApi(devForm);
        showToast('🚀 New Constituency Development Project published!');
      }
      setShowDevModal(false);
      setEditingDev(null);
      fetchDevelopments();
    } catch (err) {
      alert('Error saving project');
    }
  };

  const handleDeleteDev = async (id) => {
    if (!window.confirm('Delete this development project?')) return;
    try {
      await deleteDevelopmentApi(id);
      showToast('🗑️ Development project deleted.');
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
        showToast('✅ News article updated!');
      } else {
        await createNewsApi(newsForm);
        showToast('📰 Live News broadcasted successfully!');
      }
      setShowNewsModal(false);
      setEditingNews(null);
      fetchNews();
    } catch (err) {
      alert('Error saving news');
    }
  };

  const handleDeleteNews = async (id) => {
    if (!window.confirm('Delete this news record?')) return;
    try {
      await deleteNewsApi(id);
      showToast('🗑️ News record deleted.');
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
        showToast('✅ Welfare service updated!');
      } else {
        await createServiceApi(payload);
        showToast('🛠️ New Welfare Service offering added!');
      }
      setShowServiceModal(false);
      setEditingService(null);
      fetchServices();
    } catch (err) {
      alert('Error saving service');
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm('Delete this service offering?')) return;
    try {
      await deleteServiceApi(id);
      showToast('🗑️ Welfare Service deleted.');
      fetchServices();
    } catch (err) {
      alert('Error deleting service');
    }
  };

  // Role Scoping Flags
  const isSuperAdmin = user?.role === 'superadmin';
  const mlaLeaderName = user?.assignedLeader || 'C. Joseph Vijay';

  // Filtered Lists
  const resolvedCount = grievances.filter(g => g.status === 'Resolved').length;
  const filteredGrievances = grievances.filter(g => {
    const matchesSearch = (g.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (g.trackId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (g.constituency || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (g.targetLeader || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || g.status === statusFilter;

    // Strict Isolation Rule: Super Admin sees ALL (or filtered by selectedLeaderFilter), regular MLA Admin sees ONLY their assigned leader complaints!
    const effectiveFilter = isSuperAdmin ? selectedLeaderFilter : mlaLeaderName;
    const matchesLeader = effectiveFilter === 'ALL' || 
                          (g.targetLeader || '').toLowerCase().includes(effectiveFilter.toLowerCase()) ||
                          (g.constituency || '').toLowerCase().includes(effectiveFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesLeader;
  });

  const filteredLeaders = leaders.filter(l => 
    (l.rep || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (l.constituency || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (l.district || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans selection:bg-tvk-yellow selection:text-tvk-dark">
      <PCHeader />

      {/* Toast Notification Alert */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-slate-950 text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-2xl border-2 border-tvk-yellow flex items-center gap-3 animate-slideIn">
          <Sparkles className="w-4 h-4 text-tvk-yellow" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Hero Executive Header */}
      <section className="bg-gradient-to-r from-tvk-dark via-[#7E0D12] to-black text-white py-10 px-6 border-b-4 border-tvk-yellow relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-tvk-yellow/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-tvk-yellow text-slate-950 font-black text-xs rounded-full uppercase tracking-wider shadow">
              <TVKFlag className="w-5 h-3 rounded" animated={false} />
              {user?.role === 'superadmin' ? '👑 TVK Statewide Super Admin Master Command' : `⭐ TVK Representative Admin — ${user?.assignedLeader || 'C. Joseph Vijay'}`}
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight">
              {user?.role === 'superadmin' ? 'Super Admin Master Control & Statewide Administration' : `${user?.assignedLeader || 'C. Joseph Vijay'} Executive Command Portal`}
            </h1>
            <div className="flex items-center gap-2 flex-wrap text-xs lg:text-sm font-semibold text-amber-100/90 justify-center md:justify-start">
              <span>Authenticated Admin: <strong className="text-tvk-yellow">{user?.name || 'TVK Administrator'}</strong></span>
              <span className="px-2 py-0.5 bg-white/20 rounded-full font-mono text-[11px] text-white">
                Role: {user?.role === 'superadmin' ? 'SUPERADMIN (Full Master Control)' : `REPRESENTATIVE ADMIN (${user?.assignedLeader || 'C. Joseph Vijay'})`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                fetchAllAdminData();
                showToast('🔄 Synchronized all live data records!');
              }}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 flex items-center gap-2 transition-all shadow"
            >
              <RefreshCw className="w-4 h-4 text-tvk-yellow" />
              <span>Refresh Live Data</span>
            </button>

            {activeTab !== 'grievances' && (
              <button
                onClick={() => {
                  if (activeTab === 'leaders') {
                    setEditingLeader(null);
                    setLeaderForm({ rep: '', constituency: '', district: '', position: '', govtPosition: '', partyPosition: '', status: 'MLA', importantNote: '', photo: '' });
                    setShowLeaderModal(true);
                  } else if (activeTab === 'developments') {
                    setEditingDev(null);
                    setDevForm({ title: '', category: 'Infrastructure', description: '', location: '', budget: '₹ 5 Crore', status: 'In Progress', imageUrl: '' });
                    setShowDevModal(true);
                  } else if (activeTab === 'news') {
                    setEditingNews(null);
                    setNewsForm({ title: '', category: 'Announcements', type: 'video', summary: '', source: 'TVK Media Desk', isBreaking: false, imageUrl: '', videoUrl: '' });
                    setShowNewsModal(true);
                  } else if (activeTab === 'services') {
                    setEditingService(null);
                    setServiceForm({ title: '', tamilTitle: '', category: 'General Assistance', description: '', benefits: '' });
                    setShowServiceModal(true);
                  }
                }}
                className="px-5 py-2.5 bg-tvk-yellow hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center gap-2 uppercase tracking-wider transition-transform hover:scale-105"
              >
                <Plus className="w-4 h-4 text-tvk-red" />
                <span>Add {activeTab.slice(0, -1)}</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* KPI Command Center Cards */}
      <section className="py-6 px-6 max-w-7xl mx-auto w-full">
        {isSuperAdmin ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white p-4 rounded-2xl border-2 border-rose-200 shadow-md space-y-1 hover:border-tvk-red transition-all">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Total Grievances</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-tvk-red">{grievances.length}</span>
                <span className="text-[10px] font-extrabold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                  {resolvedCount} Resolved
                </span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border-2 border-amber-200 shadow-md space-y-1 hover:border-amber-400 transition-all">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Assembly MLAs</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-slate-900">{leaders.length}</span>
                <span className="text-[10px] font-extrabold text-tvk-red bg-rose-50 px-2 py-0.5 rounded-full">
                  Active Directory
                </span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border-2 border-blue-200 shadow-md space-y-1 hover:border-blue-400 transition-all">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Projects</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-blue-900">{developments.length}</span>
                <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                  Statewide
                </span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border-2 border-emerald-200 shadow-md space-y-1 hover:border-emerald-400 transition-all">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Live News</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-emerald-900">{newsList.length}</span>
                <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Published
                </span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border-2 border-purple-200 shadow-md space-y-1 hover:border-purple-400 transition-all">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Services</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-purple-900">{servicesList.length}</span>
                <span className="text-[10px] font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                  24/7 Desk
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border-2 border-rose-200 shadow-md space-y-1 hover:border-tvk-red transition-all">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Constituency Grievances</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-tvk-red">{filteredGrievances.length}</span>
                <span className="text-[10px] font-extrabold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                  {user?.assignedLeader || 'Perambur'}
                </span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border-2 border-amber-200 shadow-md space-y-1 hover:border-amber-400 transition-all">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Pending Review</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-amber-600">
                  {filteredGrievances.filter(g => g.status === 'Submitted' || g.status === 'In Verification' || g.status === 'Pending').length}
                </span>
                <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                  Action Needed
                </span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border-2 border-blue-200 shadow-md space-y-1 hover:border-blue-400 transition-all">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">In Progress</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-blue-900">
                  {filteredGrievances.filter(g => g.status === 'In Progress').length}
                </span>
                <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                  Processing
                </span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border-2 border-emerald-200 shadow-md space-y-1 hover:border-emerald-400 transition-all">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Resolved Tickets</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-emerald-900">
                  {filteredGrievances.filter(g => g.status === 'Resolved').length}
                </span>
                <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Completed
                </span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Navigation Bar */}
      <div className="bg-white border-y border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => { setActiveTab('grievances'); setSearchQuery(''); }}
              className={`px-6 py-4 text-xs font-black flex items-center gap-2 border-b-4 transition-all whitespace-nowrap ${
                activeTab === 'grievances' ? 'border-tvk-red text-tvk-red bg-rose-50/60' : 'border-transparent text-gray-600 hover:text-slate-900'
              }`}
            >
              <Shield className="w-4 h-4 text-tvk-red" />
              <span>{isSuperAdmin ? `Grievances Master Desk (${grievances.length})` : `Constituency Grievances Desk (${filteredGrievances.length})`}</span>
            </button>

            {isSuperAdmin && (
              <>
                <button
                  onClick={() => { setActiveTab('leaders'); setSearchQuery(''); }}
                  className={`px-6 py-4 text-xs font-black flex items-center gap-2 border-b-4 transition-all whitespace-nowrap ${
                    activeTab === 'leaders' ? 'border-tvk-red text-tvk-red bg-rose-50/60' : 'border-transparent text-gray-600 hover:text-slate-900'
                  }`}
                >
                  <Users className="w-4 h-4 text-tvk-red" />
                  <span>TVK Leaders & MLAs ({leaders.length})</span>
                </button>

                <button
                  onClick={() => { setActiveTab('developments'); setSearchQuery(''); }}
                  className={`px-6 py-4 text-xs font-black flex items-center gap-2 border-b-4 transition-all whitespace-nowrap ${
                    activeTab === 'developments' ? 'border-tvk-red text-tvk-red bg-rose-50/60' : 'border-transparent text-gray-600 hover:text-slate-900'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-tvk-red" />
                  <span>Developments ({developments.length})</span>
                </button>

                <button
                  onClick={() => { setActiveTab('news'); setSearchQuery(''); }}
                  className={`px-6 py-4 text-xs font-black flex items-center gap-2 border-b-4 transition-all whitespace-nowrap ${
                    activeTab === 'news' ? 'border-tvk-red text-tvk-red bg-rose-50/60' : 'border-transparent text-gray-600 hover:text-slate-900'
                  }`}
                >
                  <Newspaper className="w-4 h-4 text-tvk-red" />
                  <span>Live News ({newsList.length})</span>
                </button>

                <button
                  onClick={() => { setActiveTab('services'); setSearchQuery(''); }}
                  className={`px-6 py-4 text-xs font-black flex items-center gap-2 border-b-4 transition-all whitespace-nowrap ${
                    activeTab === 'services' ? 'border-tvk-red text-tvk-red bg-rose-50/60' : 'border-transparent text-gray-600 hover:text-slate-900'
                  }`}
                >
                  <HeartHandshake className="w-4 h-4 text-tvk-red" />
                  <span>Welfare Services ({servicesList.length})</span>
                </button>
              </>
            )}
          </div>

          <div className="relative hidden md:block py-2">
            <Search className="w-4 h-4 absolute left-3 top-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${activeTab}...`}
              className="pl-9 pr-4 py-1.5 bg-gray-100 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-tvk-red focus:bg-white outline-none w-56 font-semibold"
            />
          </div>
        </div>
      </div>

      {/* Main Workspace Area */}
      <section className="py-8 px-6 max-w-7xl mx-auto w-full flex-1">
        
        {/* 1. GRIEVANCES DESK */}
        {activeTab === 'grievances' && (
          <div className="space-y-6">
            
            {/* LEADER ROUTING FILTER BAR (SUPER ADMIN ONLY) */}
            {isSuperAdmin && (
              <div className="bg-white p-5 rounded-3xl border-2 border-amber-400/80 shadow-md space-y-4">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-100 pb-3.5">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-tvk-red text-tvk-yellow rounded-2xl font-black shadow-md">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                        Super Admin Master Routing & Isolation Control
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-black text-[10px] uppercase rounded-full">Super Admin Master</span>
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">Select any TVK Assembly Leader to isolate complaints assigned specifically to their desk.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-extrabold text-slate-700">Master Filter:</span>
                    <select
                      value={selectedLeaderFilter}
                      onChange={(e) => setSelectedLeaderFilter(e.target.value)}
                      className="px-4 py-2 bg-rose-50 border-2 border-tvk-red/40 rounded-xl text-xs font-black text-tvk-dark outline-none cursor-pointer focus:ring-2 focus:ring-tvk-red shadow-sm"
                    >
                      <option value="ALL">🌟 All TVK Assembly Leaders (11)</option>
                      <option value="Vijay">🏆 C. Joseph Vijay (Chief Minister Candidate & TVK President - Perambur)</option>
                      <option value="Anand">N. Anand (Bussy Anand) (General Secretary - T. Nagar)</option>
                      <option value="Sengottaiyan">K. A. Sengottaiyan (Senior Leader - Gobichettipalayam)</option>
                      <option value="Aadhav Arjuna">Aadhav Arjuna (General Secretary - Villivakkam)</option>
                      <option value="CTR Nirmal Kumar">CTR Nirmal Kumar (Singanallur)</option>
                      <option value="Venkataramanan">Dr. Venkataramanan (Thiruparankundram)</option>
                      <option value="Rajmohan">Dr. Rajmohan (Trichy East)</option>
                      <option value="Marie Wilson">Dr. Marie Wilson (Kallakurichi)</option>
                      <option value="Sabarinathan">Tmt. K. Sabarinathan (Tirunelveli)</option>
                      <option value="Maragatham">Tmt. V. Maragatham (Kancheepuram)</option>
                      <option value="Sathyabama">Tmt. P. Sathyabama (Dharapuram)</option>
                    </select>
                  </div>
                </div>

                {/* Quick Leader Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {[
                    { id: 'ALL', label: 'All Leaders', icon: '🌟' },
                    { id: 'Vijay', label: 'C. Joseph Vijay (Chief)', icon: '🏆' },
                    { id: 'Anand', label: 'Bussy Anand', icon: '👔' },
                    { id: 'Sengottaiyan', label: 'K. A. Sengottaiyan', icon: '🏛️' },
                    { id: 'Aadhav Arjuna', label: 'Aadhav Arjuna', icon: '⚡' },
                    { id: 'Venkataramanan', label: 'Dr. Venkataramanan', icon: '🏥' }
                  ].map((item) => {
                    const isSelected = selectedLeaderFilter === item.id || (item.id !== 'ALL' && selectedLeaderFilter.toLowerCase().includes(item.id.toLowerCase()));
                    const count = item.id === 'ALL' 
                      ? grievances.length 
                      : grievances.filter(g => (g.targetLeader || '').toLowerCase().includes(item.id.toLowerCase()) || (g.constituency || '').toLowerCase().includes(item.id.toLowerCase())).length;

                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedLeaderFilter(item.id)}
                        className={`px-4 py-2 rounded-2xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-2 border ${
                          isSelected
                            ? 'bg-tvk-red text-white border-tvk-red shadow-lg scale-105'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-rose-50 hover:border-tvk-red/40'
                        }`}
                      >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                          isSelected ? 'bg-tvk-yellow text-slate-950 font-black' : 'bg-slate-200 text-slate-800'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}



            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
              <div className="space-y-0.5">
                <h2 className="text-lg font-black text-slate-950">Citizen Grievance Records Portal</h2>
                <p className="text-xs text-gray-500 font-medium">Review and resolve public requests submitted across Tamil Nadu.</p>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="Submitted">Submitted</option>
                  <option value="In Verification">In Verification</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>

            {grievanceLoading ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 shadow-sm font-bold text-gray-500">
                Fetching citizen grievances...
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-900 text-white font-black uppercase tracking-wider text-[11px] align-middle">
                        <th className="py-4 px-5 whitespace-nowrap">Track ID</th>
                        <th className="py-4 px-5 whitespace-nowrap">Citizen Details</th>
                        <th className="py-4 px-5 whitespace-nowrap">Target Representative</th>
                        <th className="py-4 px-5 whitespace-nowrap">Category</th>
                        <th className="py-4 px-5 whitespace-nowrap">Constituency</th>
                        <th className="py-4 px-5 whitespace-nowrap">Status</th>
                        <th className="py-4 px-5 text-right whitespace-nowrap">Administrative Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredGrievances.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-gray-500 font-bold text-sm">
                            No grievances found matching selected leader or filter criteria.
                          </td>
                        </tr>
                      ) : filteredGrievances.map((g) => (
                        <tr key={g._id} className="hover:bg-rose-50/40 transition-colors align-middle">
                          <td className="py-4 px-5 font-mono font-bold text-tvk-red whitespace-nowrap text-xs">
                            {g.trackId}
                          </td>
                          <td className="py-4 px-5 whitespace-nowrap">
                            <strong className="block text-slate-900 text-sm font-extrabold">{g.name}</strong>
                            <span className="text-gray-500 font-semibold">{g.phone}</span>
                          </td>
                          <td className="py-4 px-5 whitespace-nowrap">
                            <span className="px-3 py-1.5 bg-amber-50 text-amber-950 font-black rounded-xl text-[11px] border border-amber-300 inline-flex items-center gap-1.5 shadow-xs whitespace-nowrap">
                              <UserCheck className="w-3.5 h-3.5 text-tvk-red shrink-0" />
                              <span>{g.targetLeader || 'C. Joseph Vijay'}</span>
                            </span>
                          </td>
                          <td className="py-4 px-5 whitespace-nowrap">
                            <span className="px-3 py-1 bg-rose-50 text-tvk-red font-extrabold rounded-full uppercase text-[10px] border border-rose-200 inline-block whitespace-nowrap shadow-2xs">
                              {g.category}
                            </span>
                          </td>
                          <td className="py-4 px-5 font-bold text-slate-700 whitespace-nowrap">
                            {g.constituency}
                          </td>
                          <td className="py-4 px-5 whitespace-nowrap">
                            <span className={`px-3 py-1 font-black rounded-full text-[10px] uppercase shadow-xs inline-block whitespace-nowrap ${
                              g.status === 'Resolved'
                                ? 'bg-green-100 text-green-900 border border-green-300'
                                : g.status === 'In Progress'
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : 'bg-blue-100 text-blue-900 border border-blue-300'
                            }`}>
                              {g.status}
                            </span>
                          </td>
                          <td className="py-4 px-5 text-right whitespace-nowrap">
                            <button
                              onClick={() => { 
                                setSelectedGrievance(g); 
                                setNewStatus(g.status); 
                                setNewRemarks(g.remarks || ''); 
                                setNewTargetLeader(g.targetLeader || 'C. Joseph Vijay');
                              }}
                              className="px-4 py-2 bg-tvk-red text-white font-extrabold text-xs rounded-xl hover:bg-tvk-darkred shadow transition-all hover:scale-105 inline-flex items-center gap-1.5 whitespace-nowrap"
                            >
                              Update & Route
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. TVK LEADERS & ASSEMBLY MLA EXPLORER MANAGER */}
        {activeTab === 'leaders' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
              <div>
                <h2 className="text-lg font-black text-slate-950">TVK Leaders & Assembly Constituency Explorer Manager ({leaders.length} Members)</h2>
                <p className="text-xs text-gray-500 font-medium">Add, edit, or remove official TVK Members of Legislative Assembly (MLAs) & Leaders shown live on the homepage.</p>
              </div>

              <button
                onClick={() => {
                  setEditingLeader(null);
                  setLeaderForm({ rep: '', constituency: '', district: '', position: '', govtPosition: '', partyPosition: '', status: 'MLA', importantNote: '', photo: '' });
                  setShowLeaderModal(true);
                }}
                className="px-5 py-2.5 bg-tvk-red text-white font-black text-xs rounded-xl shadow-lg flex items-center gap-2 hover:bg-tvk-darkred transition-all"
              >
                <Plus className="w-4 h-4 text-tvk-yellow" />
                <span>Add Leader / MLA</span>
              </button>
            </div>

            {leadersLoading ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 shadow-sm font-bold text-gray-500">
                Loading TVK Leaders & MLA Directory...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLeaders.map((leader) => (
                  <div key={leader._id || leader.id} className="bg-white rounded-3xl p-5 shadow-lg border-2 border-gray-200 hover:border-amber-400 space-y-4 relative flex flex-col justify-between transition-all group">
                    <div className="space-y-3">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-20 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md bg-slate-900 shrink-0">
                          <img
                            src={leader.photo || '/tvk_president_vijay.png'}
                            alt={leader.rep}
                            onError={(e) => { e.target.onerror = null; e.target.src = "/tvk_president_vijay.png"; }}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>

                        <div className="min-w-0 flex-1 space-y-1">
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-extrabold text-[10px] rounded-md uppercase inline-block">
                            {leader.status || 'MLA'}
                          </span>
                          <h3 className="font-black text-base text-slate-950 truncate leading-tight">{leader.rep}</h3>
                          <p className="text-xs font-extrabold text-tvk-red truncate">{leader.constituency}</p>
                          <p className="text-[11px] font-semibold text-gray-500 truncate">{leader.district}</p>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-2xl border border-gray-100 space-y-1">
                        <span className="text-[10px] uppercase font-black text-amber-600 block">Portfolio / Position</span>
                        <p className="text-xs font-bold text-slate-900">{leader.position || leader.govtPosition}</p>
                        {leader.importantNote && (
                          <p className="text-[11px] text-gray-600 font-medium line-clamp-2 mt-1 pt-1 border-t border-gray-200">
                            {leader.importantNote}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">ID: {leader.id || leader._id}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingLeader(leader);
                            setLeaderForm(leader);
                            setShowLeaderModal(true);
                          }}
                          className="px-3 py-1.5 bg-gray-100 text-slate-800 font-bold hover:bg-gray-200 rounded-xl transition-colors flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteLeader(leader._id || leader.id)}
                          className="p-1.5 bg-rose-100 text-tvk-red hover:bg-rose-200 rounded-xl transition-colors"
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

        {/* 3. DEVELOPMENTS TAB */}
        {activeTab === 'developments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
              <div>
                <h2 className="text-lg font-black text-slate-950">Constituency Development Projects</h2>
                <p className="text-xs text-gray-500 font-medium">Publish and update development milestones and budget allocations.</p>
              </div>

              <button
                onClick={() => {
                  setEditingDev(null);
                  setDevForm({ title: '', category: 'Infrastructure', description: '', location: '', budget: '₹ 5 Crore', status: 'In Progress', imageUrl: '' });
                  setShowDevModal(true);
                }}
                className="px-5 py-2.5 bg-tvk-red text-white font-black text-xs rounded-xl shadow-lg flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-tvk-yellow" /> Add Project
              </button>
            </div>

            {devLoading ? (
              <p className="text-center py-16 text-gray-500 font-bold">Loading developments...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {developments.map((dev) => (
                  <div key={dev._id} className="bg-white rounded-3xl p-5 shadow-lg border border-gray-200 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="px-3 py-1 bg-red-50 text-tvk-red font-black rounded-full text-[10px] uppercase border border-rose-200">
                          {dev.category}
                        </span>
                        <h3 className="font-extrabold text-base text-slate-900 mt-2">{dev.title}</h3>
                      </div>
                      <span className="text-xs font-black text-amber-700 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200 shrink-0">
                        {dev.budget}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 font-medium">{dev.description}</p>
                    <span className="text-xs font-bold text-gray-500 block">📍 {dev.location}</span>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                      <span className="px-2.5 py-0.5 bg-green-100 text-green-800 font-bold rounded-full uppercase text-[10px]">
                        {dev.status}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditingDev(dev); setDevForm(dev); setShowDevModal(true); }}
                          className="px-3 py-1.5 bg-gray-100 text-slate-800 font-bold rounded-xl flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteDev(dev._id)}
                          className="p-1.5 bg-rose-100 text-tvk-red rounded-xl"
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

        {/* 4. LIVE NEWS TAB */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
              <div>
                <h2 className="text-lg font-black text-slate-950">Live News & Press Releases Manager</h2>
                <p className="text-xs text-gray-500 font-medium">Broadcast news stories, video bulletins, and press statements.</p>
              </div>

              <button
                onClick={() => {
                  setEditingNews(null);
                  setNewsForm({ title: '', category: 'Announcements', type: 'video', summary: '', source: 'TVK Media Desk', isBreaking: false, imageUrl: '', videoUrl: '' });
                  setShowNewsModal(true);
                }}
                className="px-5 py-2.5 bg-tvk-red text-white font-black text-xs rounded-xl shadow-lg flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-tvk-yellow" /> Publish News
              </button>
            </div>

            {newsLoading ? (
              <p className="text-center py-16 text-gray-500 font-bold">Loading news...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {newsList.map((news) => (
                  <div key={news._id} className="bg-white rounded-3xl p-5 shadow-lg border border-gray-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-red-50 text-tvk-red font-black rounded-full text-[10px] uppercase border border-rose-200">
                        {news.category}
                      </span>
                      {news.isBreaking && (
                        <span className="px-2.5 py-0.5 bg-tvk-red text-white text-[9px] font-black uppercase rounded-full animate-pulse">
                          Breaking News
                        </span>
                      )}
                    </div>

                    <h3 className="font-extrabold text-base text-slate-900">{news.title}</h3>
                    <p className="text-xs text-gray-600 line-clamp-2">{news.summary}</p>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-500">
                      <span>Source: {news.source}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditingNews(news); setNewsForm(news); setShowNewsModal(true); }}
                          className="px-3 py-1.5 bg-gray-100 text-slate-800 font-bold rounded-xl flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteNews(news._id)}
                          className="p-1.5 bg-rose-100 text-tvk-red rounded-xl"
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

        {/* 5. SERVICES TAB */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
              <div>
                <h2 className="text-lg font-black text-slate-950">Welfare Services Manager</h2>
                <p className="text-xs text-gray-500 font-medium">Manage active citizen welfare assistance offerings.</p>
              </div>

              <button
                onClick={() => {
                  setEditingService(null);
                  setServiceForm({ title: '', tamilTitle: '', category: 'General Assistance', description: '', benefits: '' });
                  setShowServiceModal(true);
                }}
                className="px-5 py-2.5 bg-tvk-red text-white font-black text-xs rounded-xl shadow-lg flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-tvk-yellow" /> Add Service
              </button>
            </div>

            {servicesLoading ? (
              <p className="text-center py-16 text-gray-500 font-bold">Loading services...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {servicesList.map((srv) => (
                  <div key={srv._id} className="bg-white rounded-3xl p-5 shadow-lg border border-gray-200 space-y-3">
                    <span className="px-3 py-1 bg-red-50 text-tvk-red font-black rounded-full text-[10px] uppercase border border-rose-200">
                      {srv.category}
                    </span>
                    <h3 className="font-extrabold text-base text-slate-900">{srv.title}</h3>
                    <p className="font-tamil text-xs font-black text-tvk-red">{srv.tamilTitle}</p>
                    <p className="text-xs text-gray-600">{srv.description}</p>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-gray-500 font-bold">
                        {Array.isArray(srv.benefits) ? srv.benefits.length : 1} Key Benefits
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingService(srv);
                            setServiceForm({
                              ...srv,
                              benefits: Array.isArray(srv.benefits) ? srv.benefits.join(', ') : srv.benefits
                            });
                            setShowServiceModal(true);
                          }}
                          className="px-3 py-1.5 bg-gray-100 text-slate-800 font-bold rounded-xl flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteService(srv._id)}
                          className="p-1.5 bg-rose-100 text-tvk-red rounded-xl"
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

      </section>

      {/* MODAL DIALOGS */}

      {/* UPDATE GRIEVANCE MODAL */}
      {selectedGrievance && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 space-y-4 shadow-2xl border border-gray-200">
            <h3 className="font-black text-lg text-slate-950">Update Grievance #{selectedGrievance.trackId}</h3>
            <div className="bg-slate-50 p-3.5 rounded-2xl text-xs space-y-1">
              <p><strong>Citizen Name:</strong> {selectedGrievance.name} ({selectedGrievance.phone})</p>
              <p><strong>Constituency:</strong> {selectedGrievance.constituency}</p>
              <p><strong>Current Target Leader:</strong> <span className="font-bold text-tvk-red">{selectedGrievance.targetLeader || 'C. Joseph Vijay'}</span></p>
              <p><strong>Details:</strong> {selectedGrievance.description}</p>
            </div>
            <form onSubmit={handleUpdateGrievance} className="space-y-4">
              <div>
                <label className="text-xs font-black text-gray-700 block mb-1">
                  Target Representative / Leader {isSuperAdmin ? '(Super Admin Re-assignment)' : '(Fixed for Constituency)'}
                </label>
                {isSuperAdmin ? (
                  <select
                    value={newTargetLeader}
                    onChange={(e) => setNewTargetLeader(e.target.value)}
                    className="w-full px-4 py-2.5 bg-amber-50 border border-amber-300 rounded-xl text-xs font-black text-slate-900 focus:ring-2 focus:ring-tvk-red outline-none"
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
                ) : (
                  <div className="w-full px-4 py-2.5 bg-amber-50 border border-amber-300 rounded-xl text-xs font-black text-slate-900 flex items-center justify-between shadow-xs">
                    <span className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-tvk-red" />
                      <span>{selectedGrievance.targetLeader || mlaLeaderName}</span>
                    </span>
                    <span className="px-2 py-0.5 bg-amber-200 text-amber-950 font-extrabold text-[10px] uppercase rounded-md">
                      🔒 Fixed Representative
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-black text-gray-700 block mb-1">Resolution Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-extrabold"
                >
                  <option value="Submitted">Submitted</option>
                  <option value="In Verification">In Verification</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-black text-gray-700 block mb-1">Official Remarks</label>
                <textarea
                  rows={3}
                  value={newRemarks}
                  onChange={(e) => setNewRemarks(e.target.value)}
                  placeholder="Enter administrative notes for citizen tracking..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium"
                ></textarea>
              </div>

              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setSelectedGrievance(null)} className="px-5 py-2.5 bg-gray-100 text-xs font-bold rounded-xl">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-tvk-red text-white text-xs font-black rounded-xl shadow-lg">Save Status</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LEADER MODAL */}
      {showLeaderModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto border border-gray-200">
            <h3 className="font-black text-lg text-slate-950">
              {editingLeader ? 'Edit TVK Leader / MLA Record' : 'Add New TVK Representative / MLA'}
            </h3>
            
            {leaderForm.photo && (
              <div className="flex justify-center">
                <img src={leaderForm.photo} alt="Preview" className="w-20 h-24 object-cover rounded-2xl border-2 border-amber-400 shadow-md" />
              </div>
            )}

            <form onSubmit={handleSaveLeader} className="space-y-3">
              <div>
                <label className="text-xs font-black text-gray-700 block mb-1">Representative Name *</label>
                <input
                  type="text" required placeholder="e.g. C. Joseph Vijay"
                  value={leaderForm.rep} onChange={(e) => setLeaderForm({ ...leaderForm, rep: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-black text-gray-700 block mb-1">Constituency Name *</label>
                  <input
                    type="text" required placeholder="e.g. Perambur"
                    value={leaderForm.constituency} onChange={(e) => setLeaderForm({ ...leaderForm, constituency: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-700 block mb-1">District</label>
                  <input
                    type="text" placeholder="e.g. Chennai District"
                    value={leaderForm.district} onChange={(e) => setLeaderForm({ ...leaderForm, district: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-gray-700 block mb-1">Position / Government Portfolio</label>
                <input
                  type="text" placeholder="e.g. Chief Minister & TVK President"
                  value={leaderForm.position} onChange={(e) => setLeaderForm({ ...leaderForm, position: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-black text-gray-700 block mb-1">Photo Image URL</label>
                <input
                  type="text" placeholder="e.g. https://... or /tvk_president_vijay.png"
                  value={leaderForm.photo} onChange={(e) => setLeaderForm({ ...leaderForm, photo: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-black text-gray-700 block mb-1">Overview / Important Notes</label>
                <textarea
                  rows={3} placeholder="Highlights of achievements & constituency welfare..."
                  value={leaderForm.importantNote} onChange={(e) => setLeaderForm({ ...leaderForm, importantNote: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs"
                ></textarea>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setShowLeaderModal(false)} className="px-5 py-2.5 bg-gray-100 text-xs font-bold rounded-xl">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-tvk-red text-white text-xs font-black rounded-xl shadow-lg">Save Leader</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DEV MODAL */}
      {showDevModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 space-y-4 shadow-2xl">
            <h3 className="font-black text-lg text-slate-950">{editingDev ? 'Edit Project' : 'Add Development Project'}</h3>
            <form onSubmit={handleSaveDev} className="space-y-3">
              <input
                type="text" required placeholder="Project Title *"
                value={devForm.title} onChange={(e) => setDevForm({ ...devForm, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-bold"
              />
              <select
                value={devForm.category} onChange={(e) => setDevForm({ ...devForm, category: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-bold"
              >
                <option value="Infrastructure">Infrastructure</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Sanitation">Sanitation</option>
                <option value="Digital">Digital</option>
              </select>
              <textarea
                required rows={3} placeholder="Project Description *"
                value={devForm.description} onChange={(e) => setDevForm({ ...devForm, description: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs"
              ></textarea>
              <input
                type="text" placeholder="Budget e.g. ₹ 8 Crore"
                value={devForm.budget} onChange={(e) => setDevForm({ ...devForm, budget: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs"
              />
              <input
                type="text" placeholder="Location e.g. Madurai Central"
                value={devForm.location} onChange={(e) => setDevForm({ ...devForm, location: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs"
              />
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setShowDevModal(false)} className="px-5 py-2.5 bg-gray-100 text-xs font-bold rounded-xl">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-tvk-red text-white text-xs font-black rounded-xl shadow-lg">Save Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NEWS MODAL */}
      {showNewsModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 space-y-4 shadow-2xl">
            <h3 className="font-black text-lg text-slate-950">{editingNews ? 'Edit News' : 'Publish Live News'}</h3>
            <form onSubmit={handleSaveNews} className="space-y-3">
              <input
                type="text" required placeholder="News Title *"
                value={newsForm.title} onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-bold"
              />
              <textarea
                required rows={3} placeholder="News Summary *"
                value={newsForm.summary} onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs"
              ></textarea>
              <input
                type="text" placeholder="Source e.g. TVK Media Desk"
                value={newsForm.source} onChange={(e) => setNewsForm({ ...newsForm, source: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs"
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox" id="isBreaking"
                  checked={newsForm.isBreaking} onChange={(e) => setNewsForm({ ...newsForm, isBreaking: e.target.checked })}
                  className="rounded text-tvk-red focus:ring-tvk-red"
                />
                <label htmlFor="isBreaking" className="text-xs font-black text-slate-900">Mark as Breaking News Banner</label>
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setShowNewsModal(false)} className="px-5 py-2.5 bg-gray-100 text-xs font-bold rounded-xl">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-tvk-red text-white text-xs font-black rounded-xl shadow-lg">Publish</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SERVICE MODAL */}
      {showServiceModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 space-y-4 shadow-2xl">
            <h3 className="font-black text-lg text-slate-950">{editingService ? 'Edit Service' : 'Add Welfare Service'}</h3>
            <form onSubmit={handleSaveService} className="space-y-3">
              <input
                type="text" required placeholder="Service Title (English) *"
                value={serviceForm.title} onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-bold"
              />
              <input
                type="text" placeholder="Tamil Title (சேவை தலைப்பு)"
                value={serviceForm.tamilTitle} onChange={(e) => setServiceForm({ ...serviceForm, tamilTitle: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-bold"
              />
              <textarea
                required rows={3} placeholder="Description *"
                value={serviceForm.description} onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs"
              ></textarea>
              <input
                type="text" placeholder="Key Benefits (Comma separated)"
                value={serviceForm.benefits} onChange={(e) => setServiceForm({ ...serviceForm, benefits: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl text-xs"
              />
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setShowServiceModal(false)} className="px-5 py-2.5 bg-gray-100 text-xs font-bold rounded-xl">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-tvk-red text-white text-xs font-black rounded-xl shadow-lg">Save Service</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <PCFooter />
    </div>
  );
};
