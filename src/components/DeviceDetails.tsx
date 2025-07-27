import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Smartphone, 
  Signal, 
  Clock, 
  MapPin, 
  Edit2, 
  Check,
  X,
  Activity
} from "lucide-react";

interface DeviceDetailsProps {
  device: {
    id: string;
    name: string;
    ip: string;
    mac: string;
    manufacturer: string;
    type: string;
    status: 'online' | 'offline';
    lastSeen: string;
  };
  onBack: () => void;
}

export const DeviceDetails = ({ device, onBack }: DeviceDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deviceName, setDeviceName] = useState(device.name);
  const [pingData, setPingData] = useState<number[]>([15, 12, 18, 14, 16, 13, 17]);

  const handleSaveName = () => {
    setIsEditing(false);
    // Aqui salvaria o nome no storage local
  };

  const averagePing = Math.round(pingData.reduce((a, b) => a + b, 0) / pingData.length);

  return (
    <div className="p-6 max-w-md mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-xl font-bold">Detalhes do Dispositivo</h2>
      </div>

      {/* Device Icon & Name */}
      <Card className="p-6 mb-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
            <Smartphone className="w-8 h-8 text-primary" />
          </div>
          
          {isEditing ? (
            <div className="space-y-2">
              <Input
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
                className="text-center"
              />
              <div className="flex gap-2 justify-center">
                <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
                  <X className="w-4 h-4" />
                </Button>
                <Button size="sm" onClick={handleSaveName}>
                  <Check className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <h3 className="text-lg font-semibold">{deviceName}</h3>
                <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
              </div>
              <Badge 
                variant={device.status === 'online' ? 'default' : 'secondary'}
                className={device.status === 'online' ? 'bg-success text-success-foreground' : ''}
              >
                {device.status === 'online' ? 'Online' : 'Offline'}
              </Badge>
            </div>
          )}
        </div>
      </Card>

      {/* Network Info */}
      <Card className="p-4 mb-4">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <Signal className="w-4 h-4" />
          Informações de Rede
        </h4>
        
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">Endereço IP</Label>
            <p className="font-mono text-sm">{device.ip}</p>
          </div>
          
          <Separator />
          
          <div>
            <Label className="text-xs text-muted-foreground">MAC Address</Label>
            <p className="font-mono text-sm">{device.mac}</p>
          </div>
          
          <Separator />
          
          <div>
            <Label className="text-xs text-muted-foreground">Fabricante</Label>
            <p className="text-sm">{device.manufacturer}</p>
          </div>
        </div>
      </Card>

      {/* Ping Monitor */}
      <Card className="p-4 mb-4">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Monitor de Ping
        </h4>
        
        <div className="flex items-end justify-between h-12 mb-3">
          {pingData.map((ping, index) => (
            <div
              key={index}
              className="bg-primary/20 rounded-sm flex-1 mx-0.5"
              style={{ height: `${(ping / 25) * 100}%` }}
            />
          ))}
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Últimos 7 pings</span>
          <span className="font-semibold">{averagePing}ms média</span>
        </div>
      </Card>

      {/* Connection History */}
      <Card className="p-4">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Histórico de Conexão
        </h4>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span>Última conexão</span>
            <span className="text-muted-foreground">{device.lastSeen}</span>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <span>Primeira detecção</span>
            <span className="text-muted-foreground">3 dias atrás</span>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <span>Tempo online hoje</span>
            <span className="text-muted-foreground">4h 32min</span>
          </div>
        </div>
      </Card>
    </div>
  );
};