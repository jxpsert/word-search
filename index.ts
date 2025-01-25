import { WordSearch } from "./src/WordSearch";

const wordSearch = new WordSearch(12, 9);

wordSearch.addRow(0, "DGINEREVO");
wordSearch.addRow(1, "KILSERRVR");
wordSearch.addRow(2, "RRUMEKEDT");
wordSearch.addRow(3, "EUIOERKFE");
wordSearch.addRow(4, "DVTEKDOEM");
wordSearch.addRow(5, "ISIALNIEW");
wordSearch.addRow(6, "EDNAMEBLP");
wordSearch.addRow(7, "LTGPUNIEK");
wordSearch.addRow(8, "PKINNOMBA");
wordSearch.addRow(9, "ODAMCLUBR");
wordSearch.addRow(10, "TREINEVOH");
wordSearch.addRow(11, "BERGHUTBĲ");

wordSearch.findWord("Beleefd");
wordSearch.findWord("Bemand");
wordSearch.findWord("Berghut");
wordSearch.findWord("Bobbel");
wordSearch.findWord("Damclub");
wordSearch.findWord("Hovenier");
wordSearch.findWord("Idem");
wordSearch.findWord("Kriel");
wordSearch.findWord("Lonend");
wordSearch.findWord("Metro");
wordSearch.findWord("Monnik");
wordSearch.findWord("Oker");
wordSearch.findWord("Opleider");
wordSearch.findWord("Overkant");
wordSearch.findWord("Roep");
wordSearch.findWord("Slik");
wordSearch.findWord("Stoer");
wordSearch.findWord("Uiting");
wordSearch.findWord("Uniek");
wordSearch.findWord("Verenigd");
wordSearch.findWord("Vurig");
wordSearch.findWord("Wekken");

wordSearch.printGrid();
wordSearch.toImage();
console.log(wordSearch._foundWords.length);
