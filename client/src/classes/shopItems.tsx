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
  new CatItem(RestCat1, "Whiskers", 0, true, 0),
  new CatItem(RestCat2, "Mochi", 100, true, 1),
  new CatItem(RestCat3, "Nimbus", 100, true, 2),
  new CatItem(RestCat4, "Tofu", 100, true, 3),
]

//  Work Cats
export const WorkCats: CatItem[] = [
  new CatItem(WorkCat1, "Bubbles", 0, false, 4),
  new CatItem(WorkCat2, "Pixie", 100, false, 5),
  new CatItem(WorkCat3, "Snickers", 100, false, 6),
  new CatItem(WorkCat4, "Frisbee", 100, false, 7),
]

export function getPathById(isRestCat : boolean, id : number) : string {
  const cats = isRestCat ? RestCats : WorkCats;
  const catItem = cats.find((item) => item.id === id);

  if (catItem) {
    return catItem.path;
  } else {
    console.error("Could not find path by id. Cat does not exist.");
    return '';
  }  
}