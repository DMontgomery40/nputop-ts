export class NpuUsageGraph {
  private history: number[];
  private maxPoints: number;
  private width: number;
  private height: number;

  constructor(width: number = 60, height: number = 10) {
    this.width = width;
    this.height = height;
    this.maxPoints = width;
    this.history = new Array(this.maxPoints).fill(0);
  }

  public update(value: number): void {
    this.history.push(value);
    if (this.history.length > this.maxPoints) {
      this.history.shift();
    }
  }

  public render(): void {
    const rows = this.getGraphRows();
    rows.forEach(row => console.log(row));
    console.log('0%' + ' '.repeat(this.width - 7) + '100%');
  }

  private getGraphRows(): string[] {
    const rows: string[] = [];
    for (let i = 0; i < this.height; i++) {
      const row = this.getGraphRow(i);
      rows.push(row);
    }
    return rows;
  }

  private getGraphRow(rowIndex: number): string {
    const threshold = (this.height - rowIndex) * (100 / this.height);
    let row = '';
    
    this.history.forEach(value => {
      if (value >= threshold) {
        row += '█';
      } else {
        row += ' ';
      }
    });

    return row;
  }
}