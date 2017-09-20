using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;

namespace Erettsegi31_Ötszáz
{
    class Vásárlás
    {
        public int Ssz { get; set; }
        public string Árucikk { get; set; }
        public int Darab { get; set; }

        public Vásárlás(int ssz, string árucikk, int darab)
        {
            Ssz = ssz;
            Árucikk = árucikk;
            Darab = darab;
        }

        public int Ár //OOP végett lett jellemző, majdnem függvény :-)
        {
            get
            {
                if (Darab == 1) return 500;
                if (Darab == 2) return 950;
                return 950 + (Darab - 2) * 400;
            }
        }
    }


    class Otszaz
    {
        static void Main()
        {
            List<Vásárlás> v = new List<Vásárlás>();
            int ssz = 1;
            foreach (var i in File.ReadAllLines("penztar.txt"))
            {
                if (i=="F") ssz++;
                else
                {
                    if (v.Where(x => x.Ssz == ssz && x.Árucikk == i).Count() == 0) v.Add(new Vásárlás(ssz, i, 1));
                    else v.Where(x => x.Ssz == ssz && x.Árucikk == i).First().Darab++;
                }
            }



            Console.WriteLine("2. feladat:\nA fizetések száma: {0}",v.Max(x=>x.Ssz));

            Console.WriteLine("\n3. feladat:\nAz első vásárló {0} darab árucikket vásárolt", v.Where(x=>x.Ssz==1).Sum(x=>x.Darab));

            Console.Write("\n4.feladat:\nAdja meg egy vásárlás sorszámát, árucikk nevét,\nés a vásárolt darabszámot szóközzel elválasztva: ");
            string[] m = Console.ReadLine().Split();
            int iSsz = int.Parse(m[0]);
            string iNév = m[1];
            int iDb = int.Parse(m[2]);

            var s1 = v.Where(x => x.Árucikk == iNév);
            Console.WriteLine("\n5. feladat:\nAz első vásárlás sorszáma: {0}\nAz utolsó vásárlás sorszáma: {1}\n{2} vásárlás során vettek belőle.",s1.First().Ssz, s1.Last().Ssz, s1.Count());

            Console.WriteLine("\n6. feladat:\n{0} darab vételekor fizetendő: {1}",iDb, new Vásárlás(0,"",iDb).Ár);

            Console.WriteLine(v.Where(x => x.Ssz == iSsz).Aggregate("\n7. feladat:\n", (c, n) => c += n.Darab + " " + n.Árucikk + "\n"));

            File.WriteAllText("osszeg.txt", v.GroupBy(g => g.Ssz).Aggregate("", (c, g) => c += g.Key + ": " + g.Sum(x => x.Ár) + "\n"));

            Console.ReadKey();
        }
    }
}
