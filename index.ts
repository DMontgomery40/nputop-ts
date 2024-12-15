import { execSync } from 'child_process';
import { NpuUsageGraph } from './npu_usage_graph';

interface NpuStats {
  power: number;
  temperature: number;
  utilization: number;
}

class NpuTop {
  private graph: NpuUsageGraph;
  private powerPath: string;
  private tempPath: string;
  private utilPath: string;

  constructor() {
    this.graph = new NpuUsageGraph();
    this.powerPath = '/sys/class/intel_pmt/ipu/power1_input';
    this.tempPath = '/sys/class/intel_pmt/ipu/temp1_input';
    this.utilPath = '/sys/class/intel_pmt/ipu/utilization1_input';
  }

  private readSysfs(path: string): number {
    try {
      const output = execSync(`cat ${path}`).toString().trim();
      return parseInt(output, 10);
    } catch (error) {
      console.error(`Error reading ${path}:`, error);
      return 0;
    }
  }

  private getNpuStats(): NpuStats {
    return {
      power: this.readSysfs(this.powerPath),
      temperature: this.readSysfs(this.tempPath),
      utilization: this.readSysfs(this.utilPath)
    };
  }

  public start(): void {
    setInterval(() => {
      const stats = this.getNpuStats();
      this.graph.update(stats.utilization);
      console.clear();
      console.log('NPU Stats:');
      console.log(`Power: ${stats.power}mW`);
      console.log(`Temperature: ${stats.temperature}°C`);
      console.log(`Utilization: ${stats.utilization}%`);
      console.log('\nUtilization Graph:');
      this.graph.render();
    }, 1000);
  }
}

const npuTop = new NpuTop();
npuTop.start();