import * as http from "http";
import * as url from "url"; // űrlapokhoz, input kiolvasás
import * as fs from "fs"; // file-kezelés
import { Vásárlás } from "./Vásárlás";
export class Otszaz {
    Content(req: http.ServerRequest, res: http.ServerResponse): void {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        // tslint:disable-next-line:max-line-length
        res.write("<body><pre style='font-family: Courier; font-size:18px; background: LightGray'>");
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
        res.write("3. feladat\nAz első vásárló " + hányat + " darab árucikket vásárolt.");
        res.end();
    }
}
