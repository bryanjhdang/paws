import { CatItem } from "./models";
import RestCat1 from '../assets/rest-cats/rest-cat-1.gif';
import RestCat2 from '../assets/rest-cats/rest-cat-2.gif';
import RestCat3 from '../assets/rest-cats/rest-cat-3.gif';
import RestCat4 from '../assets/rest-cats/rest-cat-4.gif';
import WorkCat1 from '../assets/work-cats/work-cat-1.gif';
import WorkCat2 from '../assets/work-cats/work-cat-2.gif';
import WorkCat3 from '../assets/work-cats/work-cat-3.gif';
import WorkCat4 from '../assets/work-cats/work-cat-4.gif';

// Rest Cats
export const RestCats: CatItem[] = [
  new CatItem(RestCat1, "Whiskers", 0, 1),
  new CatItem(RestCat2, "Mochi", 100, 2),
  new CatItem(RestCat3, "Nimbus", 200, 3),
  new CatItem(RestCat4, "Tofu", 300, 4),
]

//  Work Cats
export const WorkCats: CatItem[] = [
  new CatItem(WorkCat1, "Bubbles", 0, 5),
  new CatItem(WorkCat2, "Pixie", 100, 6),
  new CatItem(WorkCat3, "Snickers", 200, 7),
  new CatItem(WorkCat4, "Frisbee", 300, 8),
]
