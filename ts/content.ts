import * as http from "http";
import * as url from "url"; // űrlapokhoz, input kiolvasás
import * as fs from "fs"; // file-kezelés
import { Vásárlás } from "./Vásárlás";
export class Content {
    Content(req: http.ServerRequest, res: http.ServerResponse): void {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

        // tslint:disable-next-line:max-line-length
        res.write("<body><form> <pre style='font-family: Courier; font-size:18px; background: LightGray'>");

        const query: any = url.parse(req.url, true).query; // user input
        const sorszám: number = query.sorszam === undefined ? "" : query.sorszam;

        const árucikknév: string = query.arucikknev === undefined ? "" : query.arucikknev;
        const darabszám: number = query.darabszam === undefined ? "" : query.darabszam;
        const v: Vásárlás[] = [];
        let ssz: number = 1;
        const sorok: string[] = fs.readFileSync("penztar.txt").toString().split("\r\n");
        sorok.forEach((i) => {
            if (i === "F") ssz++;
            else v.push(new Vásárlás(ssz, i, 1));
        });
        res.write("2. feladat\nA fizetések száma: " + (ssz - 1));
        let mennyiElső: number = 0;
        v.forEach(element => {
            if (element.Ssz === 1) mennyiElső++;
        });
        res.write("\n");

        // tslint:disable-next-line:max-line-length
        res.write("3. feladat\nAz első vásárló " + mennyiElső + " darab árucikket vásárolt.\n");

        res.write("<p>4. feladat\n Sorszám = " +
            "<input type='text' name='sorszam' style='font-family:Courier; " +
            "font - size: inherit; background:LightGray; ' value=" +
            `'${sorszám}'><br>`);
        res.write(" Árucikk neve = " +
            "<input type='text' name='arucikknev' style='font-family:Courier; " +
            "font - size: inherit; background:LightGray; ' value=" +
            `'${árucikknév}'><br>`);
        res.write(" Darabszám = " +
            "<input type='text' name='darabszam' style='font-family:Courier; " +
            "font - size: inherit; background:LightGray; ' value=" +
            `'${darabszám}'><br>`);
        res.write("</p><input type='submit' value='Mehet'>\n\n");

        res.write("5. feladat\n");
        let alkalmak: number = 0;
        v.forEach(element => {
            if (element.Árucikk === árucikknév) alkalmak++;
        });
        res.write(alkalmak + " alkalommal vásároltak " + árucikknév + " árucikket.");
        let elsoSorszám: number = 0;
        let utolsóSorszám: number = 0;
        for (let i: number = 0; i < v.length; i++) {
            if (v[i].Árucikk === árucikknév) {
                elsoSorszám = v[i].Ssz; break;
            }
        }
        res.write("\nAz első vásárlás sorszáma: " + elsoSorszám);
        v.forEach(element => {
            if (element.Árucikk === árucikknév) {
                utolsóSorszám = element.Ssz;
            }
        });
        res.write("\nAz utolsó vásárlás sorszáma: " + utolsóSorszám + "\n");

        res.write("\n6. feladat\n");
        // tslint:disable-next-line:max-line-length
        res.write(darabszám + " darab vételekor fizetendő: " + new Vásárlás(0, "", darabszám).Ár);
        res.write("\n\n7. feladat<br>");
        const akt: string[] = [];
        const akt2: number[] = [];
            for (let i: number = 0; i < v.length; i++) {
            if (v[i].Ssz === Number(sorszám)) {
                if (!(akt.indexOf(v[i].Árucikk) > -1)) {
                    akt.push(v[i].Árucikk);
                    akt2.push(1);
                }
                else {
                    const index: number = akt.indexOf(v[i].Árucikk);
                    if (index !== -1) akt2[index]++;
                    }
            }
        }
            for (let i: number = 0; i < akt.length; i++) {
                res.write(akt[i]);
                for (let k: number = 0; k < akt2[i]; k++) res.write(" O");
                res.write("<br>");
            }
        let vettDarab: number = 0;
        const ws: fs.WriteStream = fs.createWriteStream("osszeg.txt");
        for (let i: number = 1; i < ssz - 1; i++) {
            for (let j: number = 0; i < v.length; j++) {
                if (v[j].Ssz === i) {
                    vettDarab += v[j].Darab;
                }
            }
            ws.write(`${i} ${new Vásárlás(0, "", vettDarab).Ár}\r\n`);
            vettDarab = 0;
            }
        res.write("</pre></form>");
        res.end();
}
}
