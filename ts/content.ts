import * as http from "http";
import * as url from "url"; // űrlapokhoz, input kiolvasás
import * as fs from "fs"; // file-kezelés
import { Vásárlás } from "./Vásárlás";
export class Otszaz {
    Content(req: http.ServerRequest, res: http.ServerResponse): void {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        // tslint:disable-next-line:max-line-length
        res.write("<body><form> <pre style='font-family: Courier; font-size:18px; background: LightGray'>");

        const query: any = url.parse(req.url, true).query; // user input
        const sorszam: string = query.sorszam === undefined ? "" : query.sorszam;
        const arucikknev: string = query.arucikknev === undefined ? "" : query.arucikknev;
        const darabszam: string = query.darabszam === undefined ? "" : query.darabszam;

        const v: Vásárlás[] = [];
        let ssz: number = 1;
        const sorok: string[] = fs.readFileSync("penztar.txt").toString().split("\r\n");
        sorok.forEach((i) => {
            if (i === "F") ssz++;
            else v.push(new Vásárlás(ssz, i, 1));
        });
        res.write("2. feladat\nA fizetések száma: " + (ssz - 1));
        let hányat: number = 0;
        v.forEach(element => {
            if (element.Ssz === 1) hányat++;
        });
        // tslint:disable-next-line:max-line-length
        res.write("\n");
        res.write("3. feladat\nAz első vásárló " + hányat + " darab árucikket vásárolt.\n");
        res.write("<p>4. feladat\n Sorszám = " +
            "<input type='text' name='sorszam' style='font-family:Courier; " +
            "font - size: inherit; background:LightGray; ' value=" +
            `'${sorszam}'><br>`);
        res.write(" Árucikk neve = " +
            "<input type='text' name='arucikknev' style='font-family:Courier; " +
            "font - size: inherit; background:LightGray; ' value=" +
            `'${arucikknev}'><br>`);
        res.write(" Darabszám = " +
            "<input type='text' name='darabszam' style='font-family:Courier; " +
            "font - size: inherit; background:LightGray; ' value=" +
            `'${darabszam}'><br>`);
        res.write("</p><input type='submit' value='Frissítés'>\n");
        res.write("5. feladat\n");
        let alkalmak: number = 0;
        v.forEach(element => {
            if (element.Árucikk === arucikknev) alkalmak++;
        });
        // tslint:disable-next-line:max-line-length
        res.write(alkalmak + " alkalommal vásároltak " + arucikknev + " árucikket.");
        let elsosorszam: number = 0;
        let utolsosorszam: number = 0;
        for (let i: number = 0; i < v.length; i++) {
            if (v[i].Árucikk === arucikknev) {
                elsosorszam = v[i].Ssz; break;
            }
        }
        res.write("\nAz első vásárlás sorszáma: " + elsosorszam);
        v.forEach(element => {
            if (element.Árucikk === arucikknev) {
                utolsosorszam = element.Ssz;
            }
        });
        res.write("\nAz utolsó vásárlás sorszáma: " + utolsosorszam + "</pre></form>");
    res.end();
}
}
