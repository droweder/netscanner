import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { Network } from '@capacitor/network';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

export interface NetworkInfo {
  connected: boolean;
  connectionType: string;
  ssid?: string;
  ipAddress?: string;
}

export const useNativeCapabilities = () => {
  const [isNative, setIsNative] = useState(false);
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({
    connected: false,
    connectionType: 'unknown'
  });

  useEffect(() => {
    const setupNative = async () => {
      if (Capacitor.isNativePlatform()) {
        setIsNative(true);
        
        // Configure status bar
        await StatusBar.setStyle({ style: Style.Dark });
        
        // Hide splash screen
        await SplashScreen.hide();
        
        // Get initial network status
        const status = await Network.getStatus();
        setNetworkInfo({
          connected: status.connected,
          connectionType: status.connectionType,
        });
        
        // Listen for network changes
        Network.addListener('networkStatusChange', (status) => {
          setNetworkInfo({
            connected: status.connected,
            connectionType: status.connectionType,
          });
        });
      }
    };

    setupNative();
  }, []);

  const performNetworkScan = async (): Promise<any[]> => {
    if (!isNative) {
      // Fallback para dados mock em ambiente web
      return [
        {
          id: '1',
          name: 'iPhone de João',
          ip: '192.168.1.102',
          mac: '00:1B:63:84:45:E6',
          manufacturer: 'Apple',
          type: 'smartphone',
          status: 'online',
          lastSeen: 'Agora'
        }
      ];
    }

    try {
      // Em um app nativo real, aqui você usaria plugins específicos
      // Para demonstração, retornamos dados simulados mais realistas
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      return [
        {
          id: Date.now().toString(),
          name: `Dispositivo-${Math.floor(Math.random() * 1000)}`,
          ip: `192.168.1.${Math.floor(Math.random() * 254) + 1}`,
          mac: generateRandomMAC(),
          manufacturer: getRandomManufacturer(),
          type: getRandomDeviceType(),
          status: Math.random() > 0.3 ? 'online' : 'offline',
          lastSeen: getRandomLastSeen()
        }
      ];
    } catch (error) {
      console.error('Network scan failed:', error);
      return [];
    }
  };

  const performSpeedTest = async () => {
    if (!isNative) {
      // Teste fictício para web
      return {
        download: Math.floor(Math.random() * 80) + 20,
        upload: Math.floor(Math.random() * 40) + 10,
        ping: Math.floor(Math.random() * 20) + 5
      };
    }

    try {
      // Em um app nativo real, você usaria APIs específicas de teste de velocidade
      const testResults = {
        download: Math.floor(Math.random() * 100) + 10,
        upload: Math.floor(Math.random() * 50) + 5,
        ping: Math.floor(Math.random() * 30) + 5
      };
      
      return testResults;
    } catch (error) {
      console.error('Speed test failed:', error);
      throw error;
    }
  };

  return {
    isNative,
    networkInfo,
    performNetworkScan,
    performSpeedTest
  };
};

// Utility functions
const generateRandomMAC = (): string => {
  const chars = '0123456789ABCDEF';
  const segments = [];
  for (let i = 0; i < 6; i++) {
    segments.push(
      chars[Math.floor(Math.random() * 16)] + 
      chars[Math.floor(Math.random() * 16)]
    );
  }
  return segments.join(':');
};

const getRandomManufacturer = (): string => {
  const manufacturers = ['Apple', 'Samsung', 'Dell', 'HP', 'Lenovo', 'TP-Link', 'Netgear', 'Canon'];
  return manufacturers[Math.floor(Math.random() * manufacturers.length)];
};

const getRandomDeviceType = (): string => {
  const types = ['smartphone', 'computer', 'printer', 'router', 'tablet', 'tv'];
  return types[Math.floor(Math.random() * types.length)];
};

const getRandomLastSeen = (): string => {
  const options = ['Agora', '1 min atrás', '5 min atrás', '1 hora atrás', '2 horas atrás'];
  return options[Math.floor(Math.random() * options.length)];
};