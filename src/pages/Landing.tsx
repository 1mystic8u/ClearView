
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-ecochain-light rounded-b-3xl px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-ecochain-dark">
                Empowering a
                <br />
                <span className="text-ecochain-green-500">Greener</span>
                <br />
                Tomorrow
              </h1>
              <p className="text-lg text-gray-700">
                Join us in creating a sustainable world through simple, impactful actions for a cleaner, healthier planet.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/register">
                  <Button className="eco-button-primary">
                    Join Now
                  </Button>
                </Link>
                <Link to="/map">
                  <Button variant="outline" className="eco-button-secondary">
                    Explore More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500" 
                  alt="App Screenshot 1" 
                  className="rounded-2xl shadow-lg w-full h-64 object-cover transform translate-y-8"
                />
                <img 
                  src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=500" 
                  alt="App Screenshot 2" 
                  className="rounded-2xl shadow-lg w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Ecochain?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our community-powered platform provides the tools needed to track pollution and take action in your local area.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="eco-card">
              <div className="h-12 w-12 bg-ecochain-green-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-ecochain-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3">Radical Simplicity</h3>
              <p className="text-gray-600">
                No app download required – low barrier to entry for all community members.
              </p>
            </div>

            <div className="eco-card">
              <div className="h-12 w-12 bg-ecochain-green-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-ecochain-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3">Hyperlocal Focus</h3>
              <p className="text-gray-600">
                Directly addresses pollution affecting your immediate community.
              </p>
            </div>

            <div className="eco-card">
              <div className="h-12 w-12 bg-ecochain-green-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-ecochain-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3">Community-Powered</h3>
              <p className="text-gray-600">
                Democratizes environmental monitoring through collective citizen action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-ecochain-light py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our streamlined process makes it easy to report and track pollution in your community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-md">
                <span className="text-2xl font-bold text-ecochain-green-500">1</span>
              </div>
              <h3 className="font-bold text-xl mb-3">Report Pollution</h3>
              <p className="text-gray-600">
                Use our simple form to report pollution incidents in your area.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-md">
                <span className="text-2xl font-bold text-ecochain-green-500">2</span>
              </div>
              <h3 className="font-bold text-xl mb-3">Automatic Geotagging</h3>
              <p className="text-gray-600">
                Your location is automatically captured to pinpoint the pollution source.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-md">
                <span className="text-2xl font-bold text-ecochain-green-500">3</span>
              </div>
              <h3 className="font-bold text-xl mb-3">Visualize Data</h3>
              <p className="text-gray-600">
                Reports appear on our interactive map showing pollution hotspots.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-md">
                <span className="text-2xl font-bold text-ecochain-green-500">4</span>
              </div>
              <h3 className="font-bold text-xl mb-3">Take Action</h3>
              <p className="text-gray-600">
                Local authorities and community groups can use the data to address issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto bg-ecochain-dark text-white rounded-3xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8">
            Join our community of environmental tracking and reporting pollution across India
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button className="bg-ecochain-green-500 hover:bg-ecochain-green-600 text-white font-semibold py-3 px-8 rounded-full text-lg">
                Create Account
              </Button>
            </Link>
            <Link to="/report">
              <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-ecochain-dark font-semibold py-3 px-8 rounded-full text-lg transition-colors">
                Report Pollution
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
