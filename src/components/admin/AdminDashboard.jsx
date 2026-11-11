import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Layers, 
  BarChart3, 
  Settings, 
  LogOut, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Plus, 
  Check, 
  ExternalLink, 
  MessageSquare, 
  Mail, 
  Phone, 
  Globe, 
  Save, 
  Clock, 
  TrendingUp, 
  Activity, 
  Eye, 
  EyeOff, 
  ChevronRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { 
  fetchAdminLeads, 
  updateLead, 
  deleteLead, 
  fetchAdminPortfolio, 
  saveProject, 
  updateProject, 
  deleteProject, 
  updateSettings, 
  fetchAnalytics 
} from '../../services/api';

export default function AdminDashboard({ token, user, onLogout, onGoToSite, initialSettings }) {
  const [activeTab, setActiveTab] = useState('leads'); // 'leads', 'portfolio', 'content', 'analytics'
  
  // Leads state
  const [leads, setLeads] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [leadStatusFilter, setLeadStatusFilter] = useState('all');
  const [leadSearch, setLeadSearch] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);
  const [editingNotes, setEditingNotes] = useState('');

  // Portfolio state
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);

  // Settings state
  const [settings, setSettings] = useState(initialSettings || {});
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Analytics state
  const [analytics, setAnalytics] = useState(null);

  // Refresh data on mount and tab switch
  useEffect(() => {
    loadTabContent();
  }, [activeTab, token]);

  const loadTabContent = async () => {
    try {
      if (activeTab === 'leads') {
        setLeadsLoading(true);
        const data = await fetchAdminLeads(token, leadStatusFilter, leadSearch);
        setLeads(data);
        setLeadsLoading(false);
      } else if (activeTab === 'portfolio') {
        const data = await fetchAdminPortfolio(token);
        setProjects(data);
      } else if (activeTab === 'analytics') {
        const data = await fetchAnalytics(token);
        setAnalytics(data);
      }
    } catch (err) {
      console.error('Error fetching admin tab data:', err);
    }
  };

  // Lead handlers
  const handleStatusChange = async (leadId, newStatus) => {
    try {
      const updated = await updateLead(token, leadId, { status: newStatus });
      setLeads(leads.map(l => l.id === leadId ? updated : l));
      if (selectedLead && selectedLead.id === leadId) setSelectedLead(updated);
    } catch (err) {
      alert('Failed to update lead status: ' + err.message);
    }
  };

  const handleSaveNotes = async (leadId) => {
    try {
      const updated = await updateLead(token, leadId, { notes: editingNotes });
      setLeads(leads.map(l => l.id === leadId ? updated : l));
      if (selectedLead) setSelectedLead(updated);
      alert('Internal notes saved successfully');
    } catch (err) {
      alert('Failed to save notes: ' + err.message);
    }
  };

  const handleDeleteLead = async (leadId) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      await deleteLead(token, leadId);
      setLeads(leads.filter(l => l.id !== leadId));
      if (selectedLead && selectedLead.id === leadId) setSelectedLead(null);
    } catch (err) {
      alert('Failed to delete lead: ' + err.message);
    }
  };

  // Portfolio handlers
  const handleTogglePublish = async (project) => {
    try {
      const updated = await updateProject(token, project.id, { published: !project.published });
      setProjects(projects.map(p => p.id === project.id ? updated : p));
    } catch (err) {
      alert('Failed to update project: ' + err.message);
    }
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      if (editingProject.id) {
        const updated = await updateProject(token, editingProject.id, editingProject);
        setProjects(projects.map(p => p.id === editingProject.id ? updated : p));
      } else {
        const created = await saveProject(token, editingProject);
        setProjects([...projects, created]);
      }
      setShowProjectModal(false);
      setEditingProject(null);
    } catch (err) {
      alert('Failed to save project: ' + err.message);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!confirm('Are you sure you want to remove this project?')) return;
    try {
      await deleteProject(token, projectId);
      setProjects(projects.filter(p => p.id !== projectId));
    } catch (err) {
      alert('Failed to delete project: ' + err.message);
    }
  };

  // Settings save handler
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateSettings(token, settings);
      setSettings(updated);
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 3000);
    } catch (err) {
      alert('Failed to save settings: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#07111F] text-white flex flex-col font-sans">
      
      {/* Top Navbar */}
      <header className="bg-[#0B1730] border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center space-x-4">
          <img
            src="/brand/rydentec-logo.png"
            alt="RydenTec"
            className="h-8 w-auto object-contain"
          />
          <div className="hidden sm:flex items-center space-x-2 pl-4 border-l border-white/10 text-xs text-[#A8B5C7]">
            <span className="font-semibold text-white">Management Console</span>
            <span>&bull;</span>
            <span>Signed in as <code className="text-[#00D5FF] font-bold">{user?.username || 'admin'}</code></span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onGoToSite}
            className="px-3 py-1.5 rounded-lg bg-[#101F35] border border-white/10 text-xs font-semibold text-white hover:border-[#087CFF] flex items-center space-x-1.5 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-[#00D5FF]" />
            <span className="hidden sm:inline">View Public Site</span>
          </button>

          <button
            onClick={onLogout}
            className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 hover:bg-rose-500/20 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 border-b border-white/10 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'leads'
                ? 'bg-[#087CFF] text-white shadow-md'
                : 'text-[#A8B5C7] hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Lead Management</span>
            {leads.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-white/20 text-[10px]">
                {leads.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'portfolio'
                ? 'bg-[#087CFF] text-white shadow-md'
                : 'text-[#A8B5C7] hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Portfolio Manager</span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'content'
                ? 'bg-[#087CFF] text-white shadow-md'
                : 'text-[#A8B5C7] hover:text-white hover:bg-white/5'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Website &amp; Pricing</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'analytics'
                ? 'bg-[#087CFF] text-white shadow-md'
                : 'text-[#A8B5C7] hover:text-white hover:bg-white/5'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Real Analytics</span>
          </button>
        </div>

        {/* TAB 1: LEADS MANAGEMENT */}
        {activeTab === 'leads' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Search and Filters Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0B1730] p-4 rounded-2xl border border-white/10">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#A8B5C7] absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search by name, business, email..."
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && loadTabContent()}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#101F35] border border-white/10 text-xs text-white placeholder-[#A8B5C7]/50 focus:outline-none focus:border-[#087CFF]"
                />
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <span className="text-xs text-[#A8B5C7] flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Status:</span>
                </span>
                <select
                  value={leadStatusFilter}
                  onChange={(e) => {
                    setLeadStatusFilter(e.target.value);
                  }}
                  className="px-3 py-2 rounded-xl bg-[#101F35] border border-white/10 text-xs text-white focus:outline-none focus:border-[#087CFF]"
                >
                  <option value="all">All Inquiries</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="negotiating">Negotiating</option>
                  <option value="won">Won (Client)</option>
                  <option value="lost">Lost</option>
                </select>

                <button
                  onClick={loadTabContent}
                  className="px-3 py-2 rounded-xl bg-[#087CFF] text-white text-xs font-semibold hover:bg-[#00D5FF] hover:text-[#07111F] transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Leads Table */}
            <div className="rounded-2xl bg-[#0B1730] border border-white/10 overflow-hidden shadow-xl">
              {leadsLoading ? (
                <div className="p-12 text-center text-xs text-[#A8B5C7]">Loading inquiries...</div>
              ) : leads.length === 0 ? (
                <div className="p-12 text-center space-y-2">
                  <Users className="w-8 h-8 text-[#A8B5C7]/40 mx-auto" />
                  <p className="text-sm font-semibold text-white">No inquiries found</p>
                  <p className="text-xs text-[#A8B5C7]">Submitted leads from the contact form will appear here in real-time.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#101F35] text-[#A8B5C7] uppercase tracking-wider text-[10px] border-b border-white/10">
                      <tr>
                        <th className="py-3 px-4">Contact &amp; Business</th>
                        <th className="py-3 px-4">Service</th>
                        <th className="py-3 px-4">Budget</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-white">{lead.fullName}</div>
                            {lead.businessName && (
                              <div className="text-[11px] text-[#A8B5C7]">{lead.businessName}</div>
                            )}
                            <div className="text-[10px] text-[#00D5FF] font-mono mt-0.5">{lead.email}</div>
                          </td>

                          <td className="py-3.5 px-4 font-semibold text-white">
                            {lead.service}
                          </td>

                          <td className="py-3.5 px-4 text-[#A8B5C7]">
                            {lead.budget}
                          </td>

                          <td className="py-3.5 px-4">
                            <select
                              value={lead.status}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                              className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${
                                lead.status === 'new'
                                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                                  : lead.status === 'contacted'
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                  : lead.status === 'negotiating'
                                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                                  : lead.status === 'won'
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                  : 'bg-zinc-500/20 text-zinc-300 border-zinc-500/40'
                              }`}
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="negotiating">Negotiating</option>
                              <option value="won">Won</option>
                              <option value="lost">Lost</option>
                            </select>
                          </td>

                          <td className="py-3.5 px-4 text-[#A8B5C7] text-[11px]">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </td>

                          <td className="py-3.5 px-4 text-right space-x-2">
                            <button
                              onClick={() => {
                                setSelectedLead(lead);
                                setEditingNotes(lead.notes || '');
                              }}
                              className="px-2.5 py-1 rounded bg-[#101F35] hover:bg-[#132540] text-[#00D5FF] text-[11px] font-semibold"
                            >
                              Inspect Brief
                            </button>
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-1 text-rose-400 hover:text-rose-300"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Lead Inspection Drawer / Modal */}
            {selectedLead && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                <div className="relative w-full max-w-xl rounded-2xl bg-[#0B1730] border border-[#087CFF]/40 p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-start border-b border-white/10 pb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white">{selectedLead.fullName}</h3>
                      <div className="text-xs text-[#00D5FF]">{selectedLead.businessName || 'Independent Inquiry'}</div>
                    </div>
                    <button
                      onClick={() => setSelectedLead(null)}
                      className="text-[#A8B5C7] hover:text-white"
                    >
                      &times;
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-[#101F35]">
                      <span className="text-[#A8B5C7]">Email:</span>
                      <div className="font-bold text-white truncate">{selectedLead.email}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-[#101F35]">
                      <span className="text-[#A8B5C7]">Phone:</span>
                      <div className="font-bold text-white truncate">{selectedLead.phone || 'None provided'}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-[#101F35]">
                      <span className="text-[#A8B5C7]">Requested Solution:</span>
                      <div className="font-bold text-white">{selectedLead.service}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-[#101F35]">
                      <span className="text-[#A8B5C7]">Indicated Budget:</span>
                      <div className="font-bold text-emerald-400">{selectedLead.budget}</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#A8B5C7] mb-1">Project Details Submitted:</label>
                    <div className="p-4 rounded-xl bg-[#07111F] border border-white/10 text-xs text-white/90 leading-relaxed whitespace-pre-wrap">
                      {selectedLead.projectDetails}
                    </div>
                  </div>

                  {/* Internal Notes Editor */}
                  <div>
                    <label className="block text-xs font-semibold text-[#A8B5C7] mb-1">Internal Notes &amp; Follow-up Log:</label>
                    <textarea
                      rows={3}
                      value={editingNotes}
                      onChange={(e) => setEditingNotes(e.target.value)}
                      placeholder="Add notes from discovery calls, proposal links, follow-up dates..."
                      className="w-full p-3 rounded-xl bg-[#101F35] border border-white/10 text-xs text-white placeholder-[#A8B5C7]/50 focus:outline-none focus:border-[#087CFF]"
                    ></textarea>
                    <button
                      onClick={() => handleSaveNotes(selectedLead.id)}
                      className="mt-2 px-4 py-1.5 rounded-lg bg-[#087CFF] text-white text-xs font-semibold hover:bg-[#00D5FF] hover:text-[#07111F]"
                    >
                      Save Internal Notes
                    </button>
                  </div>

                  {/* Quick Action Outbound Links */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                    <a
                      href={`mailto:${selectedLead.email}?subject=RydenTec Project Discussion — ${selectedLead.service}`}
                      className="px-4 py-2 rounded-xl bg-[#101F35] hover:bg-[#132540] text-xs font-semibold text-white flex items-center space-x-1.5"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#00D5FF]" />
                      <span>Send Direct Email</span>
                    </a>

                    {selectedLead.phone && (
                      <a
                        href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-xs font-semibold flex items-center space-x-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat via WhatsApp</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: PORTFOLIO MANAGER */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center bg-[#0B1730] p-4 rounded-2xl border border-white/10">
              <div>
                <h3 className="text-base font-bold text-white">Project Catalog</h3>
                <p className="text-xs text-[#A8B5C7]">Add, edit, or toggle published projects on the public website.</p>
              </div>

              <button
                onClick={() => {
                  setEditingProject({
                    title: '',
                    industry: '',
                    category: 'Website Development',
                    shortDescription: '',
                    fullDescription: '',
                    desktopPreview: '/portfolio/default-desktop.png',
                    mobilePreview: '/portfolio/default-mobile.png',
                    isConcept: true,
                    published: true,
                    techStack: ['React', 'Tailwind CSS'],
                    metrics: ['High Performance']
                  });
                  setShowProjectModal(true);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#087CFF] to-[#00D5FF] text-white font-bold text-xs flex items-center space-x-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="p-5 rounded-2xl bg-[#0B1730] border border-white/10 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        proj.published ? 'bg-emerald-500/20 text-emerald-300' : 'bg-zinc-500/20 text-zinc-300'
                      }`}>
                        {proj.published ? 'Live on Site' : 'Draft / Hidden'}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 font-semibold">
                        {proj.isConcept ? 'Concept Project' : 'Client Project'}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white">{proj.title}</h4>
                    <div className="text-xs text-[#00D5FF]">{proj.industry} &bull; {proj.category}</div>
                    <p className="text-xs text-[#A8B5C7] line-clamp-2 mt-2">{proj.shortDescription}</p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <button
                      onClick={() => handleTogglePublish(proj)}
                      className="text-[#A8B5C7] hover:text-white flex items-center space-x-1"
                    >
                      {proj.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{proj.published ? 'Unpublish' : 'Publish'}</span>
                    </button>

                    <div className="space-x-2">
                      <button
                        onClick={() => {
                          setEditingProject(proj);
                          setShowProjectModal(true);
                        }}
                        className="px-2.5 py-1 rounded bg-[#101F35] text-[#00D5FF] font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-1 text-rose-400 hover:text-rose-300"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Project Edit Modal */}
            {showProjectModal && editingProject && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                <form
                  onSubmit={handleSaveProject}
                  className="relative w-full max-w-xl rounded-2xl bg-[#0B1730] border border-[#087CFF]/40 p-6 space-y-4 max-h-[90vh] overflow-y-auto"
                >
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <h3 className="text-lg font-bold text-white">
                      {editingProject.id ? 'Edit Project' : 'New Portfolio Project'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowProjectModal(false)}
                      className="text-[#A8B5C7] hover:text-white"
                    >
                      &times;
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#A8B5C7] mb-1">Project Title</label>
                    <input
                      type="text"
                      required
                      value={editingProject.title}
                      onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#101F35] border border-white/10 text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#A8B5C7] mb-1">Industry</label>
                      <input
                        type="text"
                        required
                        value={editingProject.industry}
                        onChange={(e) => setEditingProject({ ...editingProject, industry: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-[#101F35] border border-white/10 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#A8B5C7] mb-1">Service Category</label>
                      <select
                        value={editingProject.category}
                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-[#101F35] border border-white/10 text-xs text-white"
                      >
                        <option value="Website Development">Website Development</option>
                        <option value="Website Redesign">Website Redesign</option>
                        <option value="Custom Software">Custom Software</option>
                        <option value="App Development">App Development</option>
                        <option value="AI & Automation">AI &amp; Automation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#A8B5C7] mb-1">Short Description</label>
                    <textarea
                      rows={2}
                      required
                      value={editingProject.shortDescription}
                      onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#101F35] border border-white/10 text-xs text-white"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#A8B5C7] mb-1">Full Architectural Overview</label>
                    <textarea
                      rows={3}
                      value={editingProject.fullDescription || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, fullDescription: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#101F35] border border-white/10 text-xs text-white"
                    ></textarea>
                  </div>

                  <div className="flex items-center space-x-6 text-xs">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingProject.isConcept}
                        onChange={(e) => setEditingProject({ ...editingProject, isConcept: e.target.checked })}
                        className="rounded"
                      />
                      <span>Label as Concept Project</span>
                    </label>

                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingProject.published}
                        onChange={(e) => setEditingProject({ ...editingProject, published: e.target.checked })}
                        className="rounded"
                      />
                      <span>Publish on Website</span>
                    </label>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowProjectModal(false)}
                      className="px-4 py-2 rounded-xl bg-[#101F35] text-xs text-[#A8B5C7]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#087CFF] to-[#00D5FF] text-white text-xs font-bold"
                    >
                      Save Project
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CONTENT & PRICING */}
        {activeTab === 'content' && (
          <form onSubmit={handleSaveSettings} className="space-y-6 animate-fadeIn">
            {settingsSaved && (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>All website configurations and pricing updated successfully!</span>
              </div>
            )}

            {/* Brand & Contact Configuration */}
            <div className="p-6 rounded-2xl bg-[#0B1730] border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white border-b border-white/10 pb-3">
                Commercial &amp; Integration Settings
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[#A8B5C7] mb-1 font-semibold">Primary Contact Email</label>
                  <input
                    type="email"
                    value={settings.contactEmail || ''}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#101F35] border border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="block text-[#A8B5C7] mb-1 font-semibold">WhatsApp Business Number</label>
                  <input
                    type="text"
                    value={settings.whatsappNumber || ''}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    placeholder="+1 (305) 000-0000"
                    className="w-full p-2.5 rounded-xl bg-[#101F35] border border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="block text-[#A8B5C7] mb-1 font-semibold">Scheduling URL (Calendly, etc.)</label>
                  <input
                    type="url"
                    value={settings.schedulingUrl || ''}
                    onChange={(e) => setSettings({ ...settings, schedulingUrl: e.target.value })}
                    placeholder="https://calendly.com/your-brand/consultation"
                    className="w-full p-2.5 rounded-xl bg-[#101F35] border border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="block text-[#A8B5C7] mb-1 font-semibold">Meta Pixel ID (Optional)</label>
                  <input
                    type="text"
                    value={settings.metaPixelId || ''}
                    onChange={(e) => setSettings({ ...settings, metaPixelId: e.target.value })}
                    placeholder="e.g. 1234567890"
                    className="w-full p-2.5 rounded-xl bg-[#101F35] border border-white/10 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Pricing Tiers Configuration */}
            <div className="p-6 rounded-2xl bg-[#0B1730] border border-white/10 space-y-6">
              <h3 className="text-base font-bold text-white border-b border-white/10 pb-3">
                Pricing Tiers
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
                {/* Starter */}
                <div className="p-4 rounded-xl bg-[#101F35] border border-white/5 space-y-3">
                  <div className="font-bold text-[#00D5FF]">Starter Tier</div>
                  <div>
                    <label className="block text-[#A8B5C7] mb-1">Displayed Price</label>
                    <input
                      type="text"
                      value={settings.pricing?.starter?.price || '$799'}
                      onChange={(e) => setSettings({
                        ...settings,
                        pricing: {
                          ...settings.pricing,
                          starter: { ...settings.pricing.starter, price: e.target.value }
                        }
                      })}
                      className="w-full p-2 rounded-lg bg-[#07111F] border border-white/10 text-white"
                    />
                  </div>
                </div>

                {/* Business */}
                <div className="p-4 rounded-xl bg-[#101F35] border border-white/5 space-y-3">
                  <div className="font-bold text-[#087CFF]">Business Tier</div>
                  <div>
                    <label className="block text-[#A8B5C7] mb-1">Displayed Price</label>
                    <input
                      type="text"
                      value={settings.pricing?.business?.price || '$1,499'}
                      onChange={(e) => setSettings({
                        ...settings,
                        pricing: {
                          ...settings.pricing,
                          business: { ...settings.pricing.business, price: e.target.value }
                        }
                      })}
                      className="w-full p-2 rounded-lg bg-[#07111F] border border-white/10 text-white"
                    />
                  </div>
                </div>

                {/* Custom */}
                <div className="p-4 rounded-xl bg-[#101F35] border border-white/5 space-y-3">
                  <div className="font-bold text-white">Custom Tier</div>
                  <div>
                    <label className="block text-[#A8B5C7] mb-1">Displayed Label</label>
                    <input
                      type="text"
                      value={settings.pricing?.custom?.price || 'Custom Quote'}
                      onChange={(e) => setSettings({
                        ...settings,
                        pricing: {
                          ...settings.pricing,
                          custom: { ...settings.pricing.custom, price: e.target.value }
                        }
                      })}
                      className="w-full p-2 rounded-lg bg-[#07111F] border border-white/10 text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#087CFF] to-[#00D5FF] text-white font-bold text-xs flex items-center space-x-2 shadow-lg"
              >
                <Save className="w-4 h-4" />
                <span>Save Website Configurations</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 4: REAL ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-6 rounded-2xl bg-[#0B1730] border border-white/10 space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white">Live Commercial Performance</h3>
                  <p className="text-xs text-[#A8B5C7]">Aggregated exclusively from real visitor interactions. Zero simulated metrics.</p>
                </div>
                <button
                  onClick={loadTabContent}
                  className="px-3 py-1.5 rounded-lg bg-[#101F35] text-xs text-[#00D5FF] hover:bg-[#132540]"
                >
                  Refresh Live
                </button>
              </div>

              {analytics && (
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#101F35] border border-white/5">
                    <div className="text-xs text-[#A8B5C7]">Total Site Visits</div>
                    <div className="text-2xl font-black text-white mt-1">{analytics.summary.totalVisits}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#101F35] border border-white/5">
                    <div className="text-xs text-[#A8B5C7]">Unique Visitors</div>
                    <div className="text-2xl font-black text-[#00D5FF] mt-1">{analytics.summary.uniqueVisitors}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#101F35] border border-white/5">
                    <div className="text-xs text-[#A8B5C7]">Submitted Leads</div>
                    <div className="text-2xl font-black text-emerald-400 mt-1">{analytics.summary.totalLeads}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#101F35] border border-white/5">
                    <div className="text-xs text-[#A8B5C7]">WhatsApp Clicks</div>
                    <div className="text-2xl font-black text-[#25D366] mt-1">{analytics.summary.whatsappClicks}</div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#101F35] border border-white/5">
                    <div className="text-xs text-[#A8B5C7]">Lead Conversion Rate</div>
                    <div className="text-2xl font-black text-[#087CFF] mt-1">{analytics.summary.conversionRate}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Real Events Stream */}
            {analytics?.recentEvents && (
              <div className="p-6 rounded-2xl bg-[#0B1730] border border-white/10 space-y-4">
                <h4 className="text-sm font-bold text-white">Recent Real Visitor Activity</h4>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {analytics.recentEvents.length === 0 ? (
                    <div className="text-xs text-[#A8B5C7] py-4 text-center">No visitor events recorded yet.</div>
                  ) : (
                    analytics.recentEvents.map((evt, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-[#101F35] text-xs flex items-center justify-between text-[#A8B5C7]">
                        <span className="font-mono text-white font-semibold">{evt.event}</span>
                        <span>{evt.path}</span>
                        <span className="text-[10px]">{new Date(evt.timestamp).toLocaleTimeString()}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
