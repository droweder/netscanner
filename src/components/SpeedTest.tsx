import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNativeCapabilities } from "@/hooks/useNativeCapabilities";
import { Download, Upload, Zap, Wifi } from "lucide-react";

interface SpeedTestResult {
  download: number;
  upload: number;
  ping: number;
}

export const SpeedTest = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState<'ping' | 'download' | 'upload' | null>(null);
  const [result, setResult] = useState<SpeedTestResult | null>(null);
  const [progress, setProgress] = useState(0);
  const { isNative, networkInfo, performSpeedTest } = useNativeCapabilities();

  const runSpeedTest = async () => {
    setIsRunning(true);
    setResult(null);
    setProgress(0);

    try {
      // Simula teste de ping
      setCurrentTest('ping');
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Simula teste de download
      setCurrentTest('download');
      setProgress(0);
      for (let i = 0; i <= 100; i += 5) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 80));
      }

      // Simula teste de upload
      setCurrentTest('upload');
      setProgress(0);
      for (let i = 0; i <= 100; i += 4) {
        setProgress(i);
        await new Promise(resolve => setTimeout(resolve, 70));
      }

      // Usa o teste nativo se disponível
      const testResults = await performSpeedTest();
      setResult(testResults);
    } catch (error) {
      console.error('Speed test failed:', error);
    } finally {
      setIsRunning(false);
      setCurrentTest(null);
    }
  };

  const getTestIcon = () => {
    switch (currentTest) {
      case 'ping':
        return <Zap className="w-8 h-8 text-warning" />;
      case 'download':
        return <Download className="w-8 h-8 text-primary" />;
      case 'upload':
        return <Upload className="w-8 h-8 text-accent" />;
      default:
        return <Wifi className="w-8 h-8 text-primary" />;
    }
  };

  const getTestLabel = () => {
    switch (currentTest) {
      case 'ping':
        return 'Testando Latência...';
      case 'download':
        return 'Testando Download...';
      case 'upload':
        return 'Testando Upload...';
      default:
        return 'Teste de Velocidade';
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Teste de Velocidade</h2>
        <p className="text-muted-foreground">Meça a velocidade da sua conexão</p>
        {isNative && (
          <div className="mt-2">
            <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full">
              🚀 Modo Nativo - {networkInfo.connected ? 'Conectado' : 'Desconectado'}
            </span>
          </div>
        )}
      </div>

      {!result && !isRunning && (
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full border-4 border-primary/30 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
            <Wifi className="w-12 h-12 text-primary" />
          </div>
          
          <Button 
            onClick={runSpeedTest}
            size="lg"
            variant="scan"
            className="w-full"
          >
            Iniciar Teste
          </Button>
        </div>
      )}

      {isRunning && (
        <div className="text-center animate-fade-in">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-primary/30 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 animate-scan-pulse">
            {getTestIcon()}
          </div>
          
          <h3 className="text-lg font-semibold mb-4">{getTestLabel()}</h3>
          
          <div className="mb-6">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">{progress}%</p>
          </div>
        </div>
      )}

      {result && (
        <div className="animate-fade-in space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-success">Teste Concluído!</h3>
          </div>

          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <Download className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Download</span>
            </div>
            <p className="text-2xl font-bold text-primary">{result.download} Mbps</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <Upload className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground">Upload</span>
            </div>
            <p className="text-2xl font-bold text-accent">{result.upload} Mbps</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-warning" />
              <span className="text-sm text-muted-foreground">Ping</span>
            </div>
            <p className="text-2xl font-bold text-warning">{result.ping} ms</p>
          </Card>

          <Button 
            onClick={() => setResult(null)}
            variant="outline"
            className="w-full mt-6"
          >
            Novo Teste
          </Button>
        </div>
      )}
    </div>
  );
};