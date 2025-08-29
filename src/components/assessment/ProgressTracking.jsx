import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProgressTracking = ({ userId, soundCategories }) => {
  const [progressData, setProgressData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // TODO: Replace with actual API call
    fetchProgressData();
    fetchHistoricalData();
  }, [userId, selectedCategory]);

  const fetchProgressData = async () => {
    // Simulate API call
    const mockProgress = {
      overall: 75,
      categories: {
        'th_sounds': {
          accuracy: 68,
          attempts: 12,
          improvements: [
            { date: '2025-07-01', score: 45 },
            { date: '2025-07-15', score: 58 },
            { date: '2025-08-01', score: 68 }
          ]
        },
        'v_b_sounds': {
          accuracy: 82,
          attempts: 8,
          improvements: [
            { date: '2025-07-01', score: 65 },
            { date: '2025-07-15', score: 75 },
            { date: '2025-08-01', score: 82 }
          ]
        },
        'r_sounds': {
          accuracy: 71,
          attempts: 15,
          improvements: [
            { date: '2025-07-01', score: 40 },
            { date: '2025-07-15', score: 55 },
            { date: '2025-08-01', score: 71 }
          ]
        }
      }
    };

    setProgressData(mockProgress);
  };

  const fetchHistoricalData = async () => {
    // Transform category data into chart format
    if (progressData) {
      const category = selectedCategory === 'all' ? 'overall' : selectedCategory;
      const data = progressData.categories[category]?.improvements || [];
      setHistoricalData(data);
    }
  };

  if (!progressData) {
    return <div className="text-neutral-2">Loading progress data...</div>;
  }

  return (
    <Card className="p-6 bg-dark-blue-5 border-dark-blue-4">
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-white">Your Progress</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(progressData.categories).map(([category, data]) => (
            <Card key={category} className="p-4 bg-dark-blue-4">
              <h4 className="text-sm font-medium text-neutral-2 mb-2">
                {category.split('_').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </h4>
              <Progress value={data.accuracy} className="mb-2" />
              <div className="flex justify-between text-sm">
                <span className="text-neutral-2">Accuracy: {data.accuracy}%</span>
                <span className="text-neutral-2">Attempts: {data.attempts}</span>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <h4 className="text-lg font-semibold text-white mb-4">Progress Over Time</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF' }}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF' }}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#F9FAFB'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#00b8d4"
                  strokeWidth={2}
                  dot={{ fill: '#00b8d4' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <h4 className="text-lg font-semibold text-white">Recommendations</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(progressData.categories).map(([category, data]) => {
              if (data.accuracy < 75) {
                return (
                  <Card key={category} className="p-4 bg-dark-blue-4">
                    <h5 className="text-sm font-medium text-white mb-2">
                      Practice {category.split('_').join(' ')}
                    </h5>
                    <p className="text-sm text-neutral-2">
                      Focus on improving your {category.split('_').join(' ')} pronunciation.
                      Current accuracy: {data.accuracy}%
                    </p>
                  </Card>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProgressTracking;
