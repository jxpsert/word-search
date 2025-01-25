import { WordSearch } from "./src/WordSearch";

const wordSearch = new WordSearch(13, 13);

wordSearch.addRow(0, "AEJPOKSUINLIV");
wordSearch.addRow(1, "NMLOHKCOTSWAA");
wordSearch.addRow(2, "AISLTSEPADEOB");
wordSearch.addRow(3, "VRLTJSBBERGAZ");
wordSearch.addRow(4, "AHOBEUELONDEN");
wordSearch.addRow(5, "LESSURBRNENEW");
wordSearch.addRow(6, "SLLJLDDLAGIRE");
wordSearch.addRow(7, "ISOIKIVAJKYER");
wordSearch.addRow(8, "TIJROMENMAEJI");
wordSearch.addRow(9, "ANUAHCSRAWNOJ");
wordSearch.addRow(10, "RKOPENHAGENAB");
wordSearch.addRow(11, "BIGEWLISSABON");
wordSearch.addRow(12, "EESTLUXEMBURG");

wordSearch.findWord("Luxemburg");
wordSearch.findWord("Amsterdam");
wordSearch.findWord("Lissabon");
wordSearch.findWord("Kopenhagen");
wordSearch.findWord("Berlijn");
wordSearch.findWord("Brussel");
wordSearch.findWord("Londen");
wordSearch.findWord("Parijs");
wordSearch.findWord("Rome");
wordSearch.findWord("Skopje");
wordSearch.findWord("Wenen");
wordSearch.findWord("Oslo");
wordSearch.findWord("Stockholm");
wordSearch.findWord("Helsinki");
wordSearch.findWord("Riga");
wordSearch.findWord("Vilnius");
wordSearch.findWord("Warschau");
wordSearch.findWord("Boedapest");
wordSearch.findWord("Bratislava");
wordSearch.findWord("Ljubljana");
wordSearch.findWord("Zagreb");
wordSearch.findWord("Dublin");
wordSearch.findWord("Boekarest");
wordSearch.findWord("Wenen");
wordSearch.findWord("Reykjavik");

wordSearch.printGrid();
wordSearch.toImage();
