// Deconstruct object from idb library
// This library targets modern browsers, as in Chrome, Firefox, Safari, and other browsers that use those engines, such as Edge. IE is not supported.
import { openDB } from 'idb';
// Initiate database
const initdb = async () =>
// Creating a database named "texteditor" which will be using version 1
  openDB('texteditor', 1, {
    // Add the database schema if it does not exist yet
    upgrade(db) {
      // If the database does exist, return console log and end function
      if (db.objectStoreNames.contains('texteditor')) {
        console.log('texteditor database already exists');
        return;
      }
      // Create a new object store for the data and give it the key name of "id" which needs to incriment automatically 
      db.createObjectStore('texteditor', { keyPath: 'id', autoIncrement: true });
      console.log('texteditor database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// Export a function we will use to PUT to the database
export const putDb = async (content) => {
console.error('putDb not implemented');
// Create a connection to the database and use version 1
const texteditorDb= await openDB('texteditor',1);
// Create a new transaction and specify the database and data privileges
const tx= texteditorDb.transaction('texteditor','readwrite');
// Open up the desired object store
const store= tx.objectStore('texteditor');
// Use the put method to store and pass in the id and content
const request= store.put({id:1, value:content});
// Get confirmation of the request
const result = await request;
console.log(result.value);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('getDb not implemented');
  // Create a connection to the database and version we want to use
  const texteditorDb=await openDB('texteditor',1);
  // Create a transaction and specify the database and data privileges
  const tx = texteditorDb.transaction('texteditor','readonly');
  // Open up the desired object store
  const store= tx.objectStore('texteditor');
  // Use the get method to get one piece of date from the database
  const request= store.get(1);
  // get confirmation of the request
  const result= await request;
  return result.value;
};
initdb();
