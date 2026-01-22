export class ModalsHandler {
  private readonly modals: string[];

  constructor() {
    this.modals = [];
  }

  take(id: string): void {
    if (this.modals.includes(id)) return;
    this.modals.push(id);
  }

  release(id: string): void {
    const indexOf = this.modals.findIndex((m) => m === id);
    if (indexOf === -1) return;
    this.modals.splice(indexOf, 1);
  }

  count(): number {
    return this.modals.length;
  }

  isLatest(id: string): boolean {
    return (
      this.modals.length > 0 &&
      this.modals.findIndex((m) => m === id) === this.modals.length - 1
    );
  }
}
