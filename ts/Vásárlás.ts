export class Vásárlás {
   public Ssz: number;
   public Árucikk: string;
   public Darab: number;
   constructor(ssz: number, árucikk: string, darab: number) {
      this.Ssz = ssz;
      this.Árucikk = árucikk;
      this.Darab = darab;
   }
   public get Ár(): number {
      if (this.Darab === 1) {
         return 500;
      }
      if (this.Darab === 2) {
         return 950;
      }
      return 950 + (this.Darab - 2) * 400;
   }
}