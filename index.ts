import { WordSearch } from "./src/WordSearch";

const wordSearch = new WordSearch(8, 8);

wordSearch.addRow(0, "GELOFTEV");
wordSearch.addRow(1, "BRUILOFT");
wordSearch.addRow(2, "GASTENAT");
wordSearch.addRow(3, "MBNFEFRH");
wordSearch.addRow(4, "ARPGEADA");
wordSearch.addRow(5, "RUNAAERE");
wordSearch.addRow(6, "KITTKUSE");
wordSearch.addRow(7, "RDKARINT");

wordSearch.findWord("Bruid");
wordSearch.findWord("Bruiloft");
wordSearch.findWord("Feest");
wordSearch.findWord("Gasten");
wordSearch.findWord("Gelofte");
wordSearch.findWord("Karin");
wordSearch.findWord("Kus");
wordSearch.findWord("Liefde");
wordSearch.findWord("Mark");
wordSearch.findWord("Pak");
wordSearch.findWord("Ringen");
wordSearch.findWord("Taart");

wordSearch.printGrid();
wordSearch.toImage();
