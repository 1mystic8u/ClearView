
import React, { useEffect, useRef } from 'react';
import { getAllReports } from '@/services/reportService';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import 'leaflet/dist/leaflet.css';

const MapView = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Import leaflet dynamically to avoid SSR issues
    import('leaflet').then((L) => {
      // If map already initialized, remove it
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
      
      // Initialize map
      const map = L.map(mapRef.current).setView([20.5937, 78.9629], 5); // India center
      
      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
      
      // Store map instance
      mapInstanceRef.current = map;
      
      // Get all reports
      const reports = getAllReports();
      
      // Create custom marker icon
      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="marker-pin bg-ecochain-green-500"></div>`,
        iconSize: [30, 42],
        iconAnchor: [15, 42]
      });
      
      // Add markers for each report
      reports.forEach(report => {
        const marker = L.marker([report.latitude, report.longitude], { 
          icon: customIcon 
        }).addTo(map);
        
        // Create popup content
        const popupContent = `
          <div class="popup-content">
            <h3 class="font-bold">${report.type}</h3>
            <p class="text-sm">${report.description}</p>
            <p class="text-xs mt-2">Status: ${report.status}</p>
            <p class="text-xs">Reported by: ${report.submittedBy}</p>
          </div>
        `;
        
        marker.bindPopup(popupContent);
      });
      
      // Fit map to markers if there are any reports
      if (reports.length > 0) {
        const latlngs = reports.map(report => [report.latitude, report.longitude]);
        map.fitBounds(latlngs);
      }
      
      toast({
        title: "Map Loaded",
        description: `Displaying ${reports.length} pollution reports`,
      });
    }).catch(error => {
      console.error("Error loading Leaflet:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load map. Please try again later.",
      });
    });
    
    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, [toast]);
  
  return (
    <div className="py-6 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Pollution Map</h1>
        
        <Card className="mb-8 overflow-hidden">
          <CardContent className="p-0">
            <div ref={mapRef} className="h-[70vh] w-full" />
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">Air Pollution</h3>
              <p className="text-sm text-gray-600">
                Includes reports of smoke, factory emissions, and other air quality concerns.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">Water Pollution</h3>
              <p className="text-sm text-gray-600">
                Includes reports of contaminated water bodies, industrial discharge, and sewage issues.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">Waste Dumping</h3>
              <p className="text-sm text-gray-600">
                Includes reports of illegal waste disposal, garbage accumulation, and plastic pollution.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <style>{`
        .marker-pin {
          width: 20px;
          height: 20px;
          border-radius: 50% 50% 50% 0;
          position: absolute;
          transform: rotate(-45deg);
          left: 50%;
          top: 50%;
          margin: -21px 0 0 -10px;
        }
      `}</style>
    </div>
  );
};

export default MapView;
