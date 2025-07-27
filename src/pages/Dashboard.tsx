import { useState } from "react";
import { NetworkScanner } from "@/components/NetworkScanner";
import { SpeedTest } from "@/components/SpeedTest";
import { DeviceDetails } from "@/components/DeviceDetails";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Smartphone, 
  Monitor, 
  Printer, 
  Router,
  Settings,
  Bell,
  Moon,
  HardDrive
} from "lucide-react";

const MOCK_DEVICES = [
  {
    id: '1',
    name: 'iPhone de João',
    ip: '192.168.1.102',
    mac: '00:1B:63:84:45:E6',
    manufacturer: 'Apple',
    type: 'smartphone',
    status: 'online' as const,
    lastSeen: 'Agora'
  },
  {
    id: '2',
    name: 'Notebook-Maria',
    ip: '192.168.1.105',
    mac: 'AA:BB:CC:DD:EE:FF',
    manufacturer: 'Dell',
    type: 'computer',
    status: 'online' as const,
    lastSeen: '2 min atrás'
  },
  {
    id: '3',
    name: 'Impressora HP',
    ip: '192.168.1.108',
    mac: '11:22:33:44:55:66',
    manufacturer: 'HP',
    type: 'printer',
    status: 'offline' as const,
    lastSeen: '1 hora atrás'
  },
  {
    id: '4',
    name: 'Router Principal',
    ip: '192.168.1.1',
    mac: 'AA:11:BB:22:CC:33',
    manufacturer: 'TP-Link',
    type: 'router',
    status: 'online' as const,
    lastSeen: 'Sempre ativo'
  }
];

const getDeviceIcon = (type: string) => {
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

const DevicesList = ({ onDeviceSelect }: { onDeviceSelect: (device: any) => void }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredDevices = MOCK_DEVICES.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.ip.includes(searchTerm);
    const matchesFilter = filter === "all" || device.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 pb-20">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Dispositivos da Rede</h2>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar por nome ou IP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'smartphone', label: 'Celulares' },
            { id: 'computer', label: 'Computadores' },
            { id: 'printer', label: 'Impressoras' },
            { id: 'router', label: 'Roteadores' }
          ].map(filterOption => (
            <Button
              key={filterOption.id}
              variant={filter === filterOption.id ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(filterOption.id)}
              className="whitespace-nowrap"
            >
              {filterOption.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">
          {filteredDevices.length} dispositivos encontrados
        </span>
        <Badge variant="secondary">
          {MOCK_DEVICES.filter(d => d.status === 'online').length} online
        </Badge>
      </div>

      {/* Device List */}
      <div className="space-y-3">
        {filteredDevices.map((device) => (
          <Card 
            key={device.id} 
            className="p-4 hover:bg-card/80 transition-colors cursor-pointer"
            onClick={() => onDeviceSelect(device)}
          >
            <div className="flex items-center gap-4">
              <div className="text-muted-foreground">
                {getDeviceIcon(device.type)}
              </div>
              
              <div className="flex-1">
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
    </div>
  );
};

const SettingsScreen = () => {
  return (
    <div className="p-6 pb-20">
      <h2 className="text-2xl font-bold mb-6">Configurações</h2>
      
      <div className="space-y-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Notificações</h3>
                <p className="text-sm text-muted-foreground">Alertas para novos dispositivos</p>
              </div>
            </div>
            <div className="w-10 h-6 bg-primary rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Modo Escuro</h3>
                <p className="text-sm text-muted-foreground">Interface otimizada para baixa luminosidade</p>
              </div>
            </div>
            <div className="w-10 h-6 bg-primary rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-muted-foreground" />
            <div>
              <h3 className="font-medium">Scan Automático</h3>
              <p className="text-sm text-muted-foreground">Varredura automática a cada 5 minutos</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-3">
            <h3 className="font-medium">Sobre o App</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>NetScanner v1.0.0</p>
              <p>Monitor de rede local desenvolvido com tecnologias web modernas</p>
              <p>Dados armazenados localmente por segurança</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('scanner');
  const [selectedDevice, setSelectedDevice] = useState<any>(null);

  const renderContent = () => {
    if (selectedDevice) {
      return (
        <DeviceDetails 
          device={selectedDevice} 
          onBack={() => setSelectedDevice(null)}
        />
      );
    }

    switch (activeTab) {
      case 'scanner':
        return <NetworkScanner />;
      case 'speed':
        return <SpeedTest />;
      case 'devices':
        return <DevicesList onDeviceSelect={setSelectedDevice} />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <NetworkScanner />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderContent()}
      {!selectedDevice && (
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      )}
    </div>
  );
}