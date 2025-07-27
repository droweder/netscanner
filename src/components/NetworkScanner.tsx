import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wifi, Search, Smartphone, Monitor, Printer, Router, HardDrive } from "lucide-react";

interface Device {
  id: string;
  name: string;
  ip: string;
  mac: string;
  manufacturer: string;
  type: 'smartphone' | 'computer' | 'printer' | 'router' | 'unknown';
  status: 'online' | 'offline';
  lastSeen: string;
}

const MOCK_DEVICES: Device[] = [
  {
    id: '1',
    name: 'iPhone de João',
    ip: '192.168.1.102',
    mac: '00:1B:63:84:45:E6',
    manufacturer: 'Apple',
    type: 'smartphone',
    status: 'online',
    lastSeen: 'Agora'
  },
  {
    id: '2',
    name: 'Notebook-Maria',
    ip: '192.168.1.105',
    mac: 'AA:BB:CC:DD:EE:FF',
    manufacturer: 'Dell',
    type: 'computer',
    status: 'online',
    lastSeen: '2 min atrás'
  },
  {
    id: '3',
    name: 'Impressora HP',
    ip: '192.168.1.108',
    mac: '11:22:33:44:55:66',
    manufacturer: 'HP',
    type: 'printer',
    status: 'offline',
    lastSeen: '1 hora atrás'
  },
  {
    id: '4',
    name: 'Router Principal',
    ip: '192.168.1.1',
    mac: 'AA:11:BB:22:CC:33',
    manufacturer: 'TP-Link',
    type: 'router',
    status: 'online',
    lastSeen: 'Sempre ativo'
  }
];

const getDeviceIcon = (type: Device['type']) => {
  switch (type) {
    case 'smartphone':
      return <Smartphone className="w-5 h-5" />;
    case 'computer':
      return <Monitor className="w-5 h-5" />;
    case 'printer':
      return <Printer className="w-5 h-5" />;
    case 'router':
      return <Router className="w-5 h-5" />;
    default:
      return <HardDrive className="w-5 h-5" />;
  }
};

export const NetworkScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [showDevices, setShowDevices] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    setShowDevices(false);
    
    // Simula scan progressivo
    setTimeout(() => {
      setDevices(MOCK_DEVICES);
      setIsScanning(false);
      setShowDevices(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-6 text-center border-b border-border">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Wifi className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold">NetScanner</h1>
        </div>
        <p className="text-muted-foreground">Monitore todos os dispositivos da sua rede</p>
      </div>

      {/* Scanner Central */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md w-full">
          {!showDevices && (
            <>
              <div className="relative mb-8">
                <div 
                  className={`w-32 h-32 mx-auto rounded-full border-4 border-primary/30 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 ${
                    isScanning ? 'animate-scan-pulse' : ''
                  }`}
                  style={{
                    boxShadow: isScanning ? 'var(--shadow-glow)' : 'none'
                  }}
                >
                  <Search className={`w-12 h-12 text-primary ${isScanning ? 'animate-spin' : ''}`} />
                </div>
                
                {isScanning && (
                  <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full border-2 border-primary/50 animate-scan-wave" />
                )}
              </div>

              <h2 className="text-xl font-semibold mb-4">
                {isScanning ? 'Escaneando rede...' : 'Descobrir Dispositivos'}
              </h2>
              
              <p className="text-muted-foreground mb-8">
                {isScanning 
                  ? 'Encontrando todos os dispositivos conectados à sua rede Wi-Fi'
                  : 'Toque para iniciar uma varredura completa da rede local'
                }
              </p>

              <Button 
                onClick={startScan}
                disabled={isScanning}
                size="lg"
                variant="scan"
                className="w-full"
              >
                {isScanning ? 'Escaneando...' : 'Iniciar Scan'}
              </Button>
            </>
          )}

          {showDevices && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Dispositivos Encontrados</h2>
                <Badge variant="secondary">{devices.length} dispositivos</Badge>
              </div>

              <div className="space-y-3">
                {devices.map((device) => (
                  <Card key={device.id} className="p-4 bg-card hover:bg-card/80 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="text-muted-foreground">
                        {getDeviceIcon(device.type)}
                      </div>
                      
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{device.name}</h3>
                          <Badge 
                            variant={device.status === 'online' ? 'default' : 'secondary'}
                            className={device.status === 'online' ? 'bg-success text-success-foreground' : ''}
                          >
                            {device.status === 'online' ? 'Online' : 'Offline'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{device.ip}</p>
                        <p className="text-xs text-muted-foreground">{device.manufacturer}</p>
                      </div>
                      
                      <div className="text-right text-xs text-muted-foreground">
                        {device.lastSeen}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Button 
                onClick={() => {
                  setShowDevices(false);
                  setDevices([]);
                }}
                variant="outline"
                className="w-full mt-6"
              >
                Nova Varredura
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};