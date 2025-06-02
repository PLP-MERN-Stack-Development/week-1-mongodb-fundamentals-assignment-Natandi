// Task 2: Basic CRUD Operations

// Find all books in a specific genre
db.books.find({ genre: "Fantasy" });

// Find books published after a specific year
db.books.find({ published_year: { $gt: 2000 } });

// Find books by a specific author
db.books.find({ author: "Paulo Coelho" });

// Update the price of a specific book
db.books.updateOne({ author: "Paulo Coelho" }, {$set: {price:11.00} } );

// Delete a book by its title
db.books.deleteOne({ title: "Wuthering Hieghts"});

// Task 3: Advanced Queries

// Find books that are both in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// Use projection to return only the title, author, and price fields in your queries
db.books.find({}, { title: 1, author: 1, price: 1});

// Sort books by price both in descending and in ascending order
db.books.find().sort({ price: -1 });
db.books.find().sort({ price: 1 });

// Use the `limit` and `skip` methods to implement pagination (5 books per page)
db.books.find().limit(5).skip(10);

// Task 4: Aggregation Pipelines

// Calculate the average price of all books
db.books.aggregate([ { $group: { _id: null, avgPrice: { $avg: "$price" } } } ]);

// Find the author with the most books in the collection
db.books.aggregate([ { $group: { _id: "$author", count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 1 } ]);

// Group books by publication decade and count them
db.books.aggregate([ { $group: { _id: { $floor: { $divide: [ "$published_year", 10 ] } }, count: { $sum: 1 } } }, { $sort: { _id: 1 } } ]);

// Task 5: Indexing

// Create an index on the title field for faster searches
db.books.createIndex({ title: 1 });

// Create a compound index on `author` and `published_year`
db.books.createIndex({ author: 1, published_year: 1 });

// Use the `explain()` method to demonstrate the performance improvement with your indexes
db.books.find({ author: "Paulo Coelho" }).explain();