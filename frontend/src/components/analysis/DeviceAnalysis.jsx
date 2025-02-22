import { useState } from 'react';
import { deviceReport, getQuickAnalysis, detectAnomalies } from '../../services/AiAnalyzer';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";

export const DeviceAnalysis = ({ device }) => {
  const [analysis, setAnalysis] = useState(null);
  const [quickAnalysis, setQuickAnalysis] = useState(null);
  const [anomalies, setAnomalies] = useState(null);
  const [loading, setLoading] = useState(false);


  const isValidDeviceData = (data) => {
    return data && 
           Array.isArray(data.battery_history) && 
           Array.isArray(data.temperature_history) &&
           typeof data.battery === 'number' &&
           typeof data.temperature === 'number' &&
           typeof data.name === 'string';
  };

  const handleFullAnalysis = async () => {
    setLoading(true);
    try {
      if (!isValidDeviceData(device)) {
        throw new Error("Invalid device data format");
      }
      const result = await deviceReport(device);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysis("Error: Device data is not in the correct format");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAnalysis = async () => {
    setLoading(true);
    try {
      if (!isValidDeviceData(device)) {
        throw new Error("Invalid device data format");
      }
      const result = await getQuickAnalysis(device);
      setQuickAnalysis(result);
    } catch (error) {
      console.error('Quick analysis failed:', error);
      setQuickAnalysis("Error: Device data is not in the correct format");
    } finally {
      setLoading(false);
    }
  };

  const handleAnomalyCheck = async () => {
    setLoading(true);
    try {
      if (!isValidDeviceData(device)) {
        throw new Error("Invalid device data format");
      }
      const result = await detectAnomalies(device);
      setAnomalies(result);
    } catch (error) {
      console.error('Anomaly detection failed:', error);
      setAnomalies("Error: Device data is not in the correct format");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div >
      
      <h3 className="text-lg font-semibold dark:text-white">{device.name}</h3>
      
  
      <div className="flex gap-2">
       
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="default" 
              className="flex-1 bg-green-500 hover:bg-green-600"
              onClick={handleQuickAnalysis}
            >
              Quick Analysis
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Quick Analysis - {device.name}</DialogTitle>
              <DialogDescription>
                {loading ? (
                  <div className="flex items-center justify-center py-4">
                    <p>Analyzing data...</p>
                  </div>
                ) : (
                  <div className="mt-4">
                    <pre className="whitespace-pre-wrap">{quickAnalysis}</pre>
                  </div>
                )}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

      
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="default" 
              className="flex-1 bg-yellow-500 hover:bg-yellow-600"
              onClick={handleAnomalyCheck}
            >
              Check Anomalies
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Anomaly Report - {device.name}</DialogTitle>
              <DialogDescription>
                {loading ? (
                  <div className="flex items-center justify-center py-4">
                    <p>Checking anomalies...</p>
                  </div>
                ) : (
                  <div className="mt-4">
                    <pre className="whitespace-pre-wrap dark:text-white">{anomalies}</pre>
                  </div>
                )}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>


        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="default" 
              className="flex-1 bg-blue-500 hover:bg-blue-600"
              onClick={handleFullAnalysis}
            >
              Full Analysis
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Full Analysis - {device.name}</DialogTitle>
              <DialogDescription>
                {loading ? (
                  <div className="flex items-center justify-center py-4">
                    <p>Performing full analysis...</p>
                  </div>
                ) : (
                  <div className="mt-4">
                    <pre className="whitespace-pre-wrap">{analysis}</pre>
                  </div>
                )}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
       
     

    

     
    </div>
  );
};