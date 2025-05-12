
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { getAllReports, updateReportStatus } from '@/services/reportService';
import { useAuth } from '@/hooks/useAuth';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isAdmin) {
      toast.error('You do not have permission to access this page');
      navigate('/');
      return;
    }

    const loadReports = () => {
      try {
        const allReports = getAllReports();
        setReports(allReports);
      } catch (error) {
        console.error('Error loading reports:', error);
        toast.error('Failed to load reports');
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, [isAdmin, navigate]);

  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected' | 'forwarded') => {
    setProcessingIds(prev => new Set(prev).add(id));
    
    try {
      await updateReportStatus(id, status);
      
      // Update local state
      setReports(prevReports => 
        prevReports.map(report => 
          report.id === id ? { ...report, status } : report
        )
      );
      
    } catch (error) {
      console.error(`Error updating report status:`, error);
      toast.error('Failed to update report status');
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  if (loading) {
    return (
      <div className="py-12 px-6 md:px-12 max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-ecochain-green-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <h2 className="text-xl font-medium">Loading reports...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-600">
          Review and manage pollution reports submitted by users.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow overflow-hidden">
          <thead className="bg-ecochain-dark text-white">
            <tr>
              <th className="py-4 px-6 text-left">#</th>
              <th className="py-4 px-6 text-left">Type</th>
              <th className="py-4 px-6 text-left">Details</th>
              <th className="py-4 px-6 text-left">Location</th>
              <th className="py-4 px-6 text-left">User</th>
              <th className="py-4 px-6 text-left">Date</th>
              <th className="py-4 px-6 text-left">Status</th>
              <th className="py-4 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-gray-500">
                  No reports found
                </td>
              </tr>
            ) : (
              reports.map((report, index) => (
                <tr key={report.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-4 px-6">#{index + 1}</td>
                  <td className="py-4 px-6">{report.type}</td>
                  <td className="py-4 px-6 max-w-xs truncate">{report.description}</td>
                  <td className="py-4 px-6">
                    {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}
                  </td>
                  <td className="py-4 px-6">{report.userEmail}</td>
                  <td className="py-4 px-6">{report.createdAt}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold 
                      ${report.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        report.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                        report.status === 'forwarded' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'}`
                    }>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600 text-white"
                        disabled={report.status !== 'pending' || processingIds.has(report.id)}
                        onClick={() => handleStatusUpdate(report.id, 'approved')}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        className="bg-red-500 hover:bg-red-600 text-white"
                        disabled={report.status !== 'pending' || processingIds.has(report.id)}
                        onClick={() => handleStatusUpdate(report.id, 'rejected')}
                      >
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                        disabled={report.status !== 'pending' || processingIds.has(report.id)}
                        onClick={() => handleStatusUpdate(report.id, 'forwarded')}
                      >
                        Forward
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
