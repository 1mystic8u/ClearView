
import { toast } from 'sonner';

export interface Report {
  id: string;
  type: string;
  description: string;
  photo: string | null;
  latitude: number;
  longitude: number;
  status: 'pending' | 'approved' | 'rejected' | 'forwarded';
  createdAt: string;
  submittedBy: string;
  userEmail: string;
}

const LOCAL_STORAGE_KEY = 'ecochain_reports';

// Initial reports data
const initialReports: Report[] = [
  {
    id: '1',
    type: 'Water Discharge',
    description: 'Industrial waste being discharged into the river. Strong chemical odor present.',
    photo: null,
    latitude: 51.5074,
    longitude: -0.1278,
    status: 'pending',
    createdAt: '2024-05-01',
    submittedBy: 'Anonymous',
    userEmail: 'user1@example.com'
  },
  {
    id: '2',
    type: 'Air Emission',
    description: 'Factory emitting dark smoke that smells like burning plastic.',
    photo: null,
    latitude: 51.5175,
    longitude: -0.1357,
    status: 'pending',
    createdAt: '2024-05-02',
    submittedBy: 'Anonymous',
    userEmail: 'user2@example.com'
  },
  {
    id: '3',
    type: 'Waste Dumping',
    description: 'Illegal dumping of construction waste near the local park.',
    photo: null,
    latitude: 51.5099,
    longitude: -0.1337,
    status: 'pending',
    createdAt: '2024-05-03',
    submittedBy: 'Anonymous',
    userEmail: 'user3@example.com'
  }
];

// Initialize reports in localStorage if not exist
const initializeReports = () => {
  if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialReports));
  }
};

// Get all reports
export const getAllReports = (): Report[] => {
  initializeReports();
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
};

// Get report by ID
export const getReportById = (id: string): Report | undefined => {
  const reports = getAllReports();
  return reports.find(report => report.id === id);
};

// Add a new report
export const addReport = async (report: Omit<Report, 'id' | 'status' | 'createdAt'>): Promise<Report> => {
  const reports = getAllReports();
  
  const newReport: Report = {
    ...report,
    id: Date.now().toString(),
    status: 'pending',
    createdAt: new Date().toISOString().split('T')[0]
  };
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...reports, newReport]));
  
  toast.success('Report submitted successfully!');
  
  return newReport;
};

// Export submitReport as an alias to addReport for backwards compatibility
export const submitReport = addReport;

// Update report status
export const updateReportStatus = async (id: string, status: 'approved' | 'rejected' | 'forwarded'): Promise<Report> => {
  const reports = getAllReports();
  const reportIndex = reports.findIndex(report => report.id === id);
  
  if (reportIndex === -1) {
    throw new Error('Report not found');
  }
  
  reports[reportIndex] = {
    ...reports[reportIndex],
    status
  };
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reports));
  
  toast.success(`Report ${status} successfully!`);
  
  return reports[reportIndex];
};

// Types of incidents that can be reported
export const incidentTypes = [
  'Water Discharge',
  'Air Emission',
  'Waste Dumping',
  'Oil Spill',
  'Chemical Leak',
  'Noise Pollution',
  'Deforestation',
  'Illegal Mining',
  'Soil Contamination',
  'Other'
];

// Get leaderboard data (users with most reports)
export const getLeaderboard = () => {
  const reports = getAllReports();
  
  // Count reports by user (excluding anonymous)
  const userReports: Record<string, number> = {};
  
  reports.forEach(report => {
    if (report.submittedBy !== 'Anonymous') {
      userReports[report.submittedBy] = (userReports[report.submittedBy] || 0) + 1;
    }
  });
  
  // Convert to array and sort
  return Object.entries(userReports)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
};
