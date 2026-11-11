const API_BASE = '/api';

export const trackEvent = async (event, path = window.location.pathname) => {
  try {
    await fetch(`${API_BASE}/analytics/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event,
        path,
        referrer: document.referrer || 'direct'
      })
    });
  } catch (err) {
    // Silent fail for analytics
  }
};

export const fetchSettings = async () => {
  try {
    const res = await fetch(`${API_BASE}/settings`);
    const data = await res.json();
    return data.settings;
  } catch (err) {
    console.error('Failed to load settings:', err);
    return null;
  }
};

export const fetchPortfolio = async () => {
  try {
    const res = await fetch(`${API_BASE}/portfolio`);
    const data = await res.json();
    return data.projects || [];
  } catch (err) {
    console.error('Failed to load portfolio:', err);
    return [];
  }
};

export const submitLead = async (leadData) => {
  const res = await fetch(`${API_BASE}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leadData)
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to submit quote request');
  }
  return data;
};

// Admin Endpoints
export const adminLogin = async (username, password) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Login failed');
  }
  return data;
};

export const fetchAdminLeads = async (token, status = 'all', search = '') => {
  const query = new URLSearchParams({ status, search });
  const res = await fetch(`${API_BASE}/admin/leads?${query.toString()}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch leads');
  return data.leads;
};

export const updateLead = async (token, id, payload) => {
  const res = await fetch(`${API_BASE}/admin/leads/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update lead');
  return data.lead;
};

export const deleteLead = async (token, id) => {
  const res = await fetch(`${API_BASE}/admin/leads/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to delete lead');
  return data;
};

export const fetchAdminPortfolio = async (token) => {
  const res = await fetch(`${API_BASE}/admin/portfolio`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch portfolio');
  return data.projects;
};

export const saveProject = async (token, projectData) => {
  const res = await fetch(`${API_BASE}/admin/portfolio`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(projectData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to save project');
  return data.project;
};

export const updateProject = async (token, id, projectData) => {
  const res = await fetch(`${API_BASE}/admin/portfolio/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(projectData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update project');
  return data.project;
};

export const deleteProject = async (token, id) => {
  const res = await fetch(`${API_BASE}/admin/portfolio/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to delete project');
  return data;
};

export const updateSettings = async (token, settingsData) => {
  const res = await fetch(`${API_BASE}/admin/settings`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(settingsData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to update settings');
  return data.settings;
};

export const fetchAnalytics = async (token) => {
  const res = await fetch(`${API_BASE}/admin/analytics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch analytics');
  return data;
};
