
import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { submitReport, incidentTypes } from '@/services/reportService';
import { MapPin, Camera, AlertTriangle } from 'lucide-react';

const formSchema = z.object({
  type: z.string().min(1, { message: 'Please select a pollution type' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }).max(500),
  photo: z.instanceof(File).optional(),
});

const ReportForm = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  // Redirect admin users away from the reporting page
  useEffect(() => {
    if (isAdmin) {
      toast.error("Admin users cannot submit reports.");
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  // If the user is an admin, don't render the form
  if (isAdmin) {
    return null;
  }
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: '',
      description: '',
    },
  });

  useEffect(() => {
    // Request user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationError(null);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError('Unable to get your location. Please enable location services in your browser.');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
    }
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!location) {
      toast.error("Location data is required. Please enable location services.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const photoUrl = photoPreview || null;
      
      const reportData = {
        type: values.type,
        description: values.description,
        photo: photoUrl,
        latitude: location.latitude,
        longitude: location.longitude,
        submittedBy: user ? user.name : "Anonymous",
        userEmail: user ? user.email : "anonymous@example.com",
      };
      
      await submitReport(reportData);
      
      form.reset();
      setPhotoPreview(null);
      
      toast.success("Report submitted successfully!", {
        description: "Thank you for contributing to our environmental data.",
      });
    } catch (error) {
      console.error('Error submitting report:', error);
      toast.error("Failed to submit report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Preview the selected image
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    form.setValue('photo', file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-ecochain-light to-white py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-ecochain-green-600 mb-2">Report Environmental Issue</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Help us track and address pollution in your community.
          </p>
        </div>
        
        <Card className="border border-ecochain-green-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-ecochain-green-500/10 to-ecochain-green-100/20 border-b border-ecochain-green-100">
            <CardTitle className="text-2xl font-bold text-ecochain-green-600 flex items-center">
              <AlertTriangle className="mr-2 h-6 w-6 text-ecochain-green-500" />
              Submit a Pollution Report
            </CardTitle>
            <CardDescription>
              Provide details about the environmental issue you've observed. All reports are reviewed by our team.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Pollution Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-ecochain-green-500/30 focus:ring-ecochain-green-500/30">
                            <SelectValue placeholder="Select type of pollution" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {incidentTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the pollution issue in detail..." 
                          className="min-h-[120px] border-ecochain-green-500/30 focus:ring-ecochain-green-500/30" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-2">
                  <FormLabel className="font-medium flex items-center">
                    <Camera className="mr-2 h-4 w-4" />
                    Photo Evidence (Optional)
                  </FormLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="cursor-pointer border-ecochain-green-500/30 focus:ring-ecochain-green-500/30"
                  />
                  
                  {photoPreview && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-2">Preview:</p>
                      <div className="relative w-full h-48 bg-gray-50 rounded-lg overflow-hidden border border-ecochain-green-100">
                        <img 
                          src={photoPreview} 
                          alt="Selected" 
                          className="w-full h-full object-contain" 
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <FormLabel className="font-medium flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    Location
                  </FormLabel>
                  {location ? (
                    <div className="bg-ecochain-green-100/50 rounded-lg p-4 border border-ecochain-green-500/20">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Your coordinates:</span>
                        <span className="font-mono text-sm bg-white px-3 py-1 rounded-md shadow-sm border border-ecochain-green-500/20">
                          {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                        </span>
                      </div>
                    </div>
                  ) : locationError ? (
                    <div className="bg-red-50 text-red-700 rounded-lg p-4 border border-red-200 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                      <span className="text-sm">{locationError}</span>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 text-yellow-700 rounded-lg p-4 border border-yellow-200 flex items-center">
                      <svg className="animate-spin h-4 w-4 mr-2 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Getting your location...
                    </div>
                  )}
                </div>
              
                <Button
                  type="submit"
                  disabled={isSubmitting || !location}
                  className="w-full bg-ecochain-green-500 hover:bg-ecochain-green-600 text-white font-medium py-2.5 rounded-lg transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting Report...
                    </>
                  ) : (
                    'Submit Report'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 bg-gray-50 border-t border-ecochain-green-100">
            <div className="text-sm text-gray-600 w-full">
              <div className="flex items-center mb-2">
                <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2 text-ecochain-green-500" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Your report will be reviewed by our team within 24-48 hours
              </div>
              <div className="flex items-center">
                <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2 text-ecochain-green-500" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15V17M12 7V13M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Reports with evidence help us take appropriate action faster
              </div>
            </div>
            
            <div className="w-full pt-2 border-t border-ecochain-green-100/50">
              <div className="text-sm text-gray-500">
                {user ? (
                  <span className="flex items-center">
                    Reporting as: <span className="font-semibold ml-1 text-ecochain-green-600">{user.name}</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-between">
                    <span>Reporting anonymously</span>
                    <a href="/login" className="text-ecochain-green-500 hover:underline font-medium">Login to track your reports</a>
                  </span>
                )}
              </div>
            </div>
          </CardFooter>
        </Card>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Thank you for helping make our community cleaner and healthier.</p>
        </div>
      </div>
    </div>
  );
};

export default ReportForm;
