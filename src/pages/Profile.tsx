
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { getAllReports } from '@/services/reportService';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  const reports = getAllReports().filter(report => 
    report.userEmail === user?.email
  );
  
  if (!user) {
    return (
      <div className="py-12 px-6 md:px-12 max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-ecochain-green-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <h2 className="text-xl font-medium">Loading profile...</h2>
        </div>
      </div>
    );
  }
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'forwarded': return 'bg-blue-100 text-blue-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };
  
  return (
    <div className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Profile Card */}
        <div className="lg:col-span-1">
          <Card className="p-8">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-ecochain-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-ecochain-green-500">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
              <p className="text-gray-500 mb-4">{user.email}</p>
              
              <div className="bg-ecochain-green-100 text-ecochain-green-500 rounded-full px-4 py-1 font-medium text-sm mb-6">
                {user.isAdmin ? 'Administrator' : 'Community Member'}
              </div>
              
              <div className="w-full border-t border-gray-200 pt-6 mt-2">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Total Points:</span>
                  <span className="font-bold text-xl">{user.points}</span>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Reports Submitted:</span>
                  <span className="font-bold">{reports.length}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Member Since:</span>
                  <span className="font-medium">May 2025</span>
                </div>
              </div>
              
              <Button 
                className="w-full mt-8 bg-ecochain-green-500 hover:bg-ecochain-green-600 text-white"
                onClick={() => navigate('/report')}
              >
                Submit New Report
              </Button>
            </div>
          </Card>
        </div>
        
        {/* User Activity */}
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-bold mb-6">Your Reports</h3>
          
          {reports.length === 0 ? (
            <Card className="p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h4 className="text-xl font-medium mb-2">No Reports Yet</h4>
              <p className="text-gray-500 mb-6">
                You haven't submitted any pollution reports yet.
              </p>
              <Button 
                className="bg-ecochain-green-500 hover:bg-ecochain-green-600 text-white"
                onClick={() => navigate('/report')}
              >
                Submit Your First Report
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {reports.map(report => (
                <Card key={report.id} className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-lg">{report.type}</h4>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(report.status)}`}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{report.description}</p>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Submitted on: {report.createdAt}</span>
                    <span>Location: {report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}</span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
