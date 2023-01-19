import contents from 'Assets/contents.json';
import concepts from 'Assets/concepts.json';


const sources = Object.keys(contents).map(key => {return {...contents[key], name: key}});



export {
  sources,
  concepts,
}