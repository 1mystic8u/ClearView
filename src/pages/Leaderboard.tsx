
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { getLeaderboard } from '@/services/reportService';
import { useAuth } from '@/hooks/useAuth';

interface LeaderboardEntry {
  name: string;
  count: number;
}

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const { user } = useAuth();
  
  useEffect(() => {
    // Get leaderboard data
    const data = getLeaderboard();
    
    // Add some dummy data if leaderboard is empty
    if (data.length < 3) {
      const dummyData = [
        { name: 'EcoWarrior', count: 24 },
        { name: 'GreenGuardian', count: 19 },
        { name: 'PlanetProtector', count: 16 },
        { name: 'EarthDefender', count: 14 },
        { name: 'NatureNinja', count: 12 },
      ];
      
      // Merge real data with dummy data and sort
      const combinedData = [...data, ...dummyData.filter(d => !data.some(entry => entry.name === d.name))];
      setLeaderboardData(combinedData.sort((a, b) => b.count - a.count).slice(0, 10));
    } else {
      setLeaderboardData(data);
    }
  }, []);
  
  const getUserRank = () => {
    if (!user) return null;
    
    const userIndex = leaderboardData.findIndex(entry => entry.name === user.name);
    if (userIndex === -1) return null;
    
    return {
      rank: userIndex + 1,
      count: leaderboardData[userIndex].count
    };
  };
  
  const userRank = getUserRank();
  
  return (
    <div className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Community Leaderboard</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          See who's leading the charge in environmental reporting. More reports means more impact for our planet.
        </p>
      </div>
      
      {/* User's Position Card (if logged in) */}
      {user && userRank && (
        <Card className="mb-10 p-8 bg-gradient-to-r from-ecochain-green-500 to-ecochain-accent text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-6">
                <span className="text-2xl font-bold">{userRank.rank}</span>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-1">Your Ranking</h3>
                <p className="opacity-90">Keep submitting reports to climb the leaderboard!</p>
              </div>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-bold">{userRank.count}</span>
              <span className="text-white/80">Reports</span>
            </div>
          </div>
        </Card>
      )}
      
      {/* Leaderboard Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-4 text-left font-bold">Rank</th>
                <th className="px-6 py-4 text-left font-bold">User</th>
                <th className="px-6 py-4 text-center font-bold">Reports</th>
                <th className="px-6 py-4 text-center font-bold">Impact Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry, index) => (
                <tr 
                  key={index} 
                  className={`border-b ${user && entry.name === user.name ? 'bg-ecochain-green-100' : ''}`}
                >
                  <td className="px-6 py-4">
                    {index < 3 ? (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white
                        ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-700'}`}
                      >
                        {index + 1}
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-medium">
                        {index + 1}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {entry.name}
                    {user && entry.name === user.name && (
                      <span className="ml-2 text-xs bg-ecochain-green-500 text-white px-2 py-0.5 rounded-full">
                        You
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center font-medium">{entry.count}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-ecochain-green-500 h-2.5 rounded-full" 
                        style={{ 
                          width: `${Math.min(100, (entry.count / leaderboardData[0].count) * 100)}%` 
                        }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
              
              {leaderboardData.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No data available yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Leaderboard;
