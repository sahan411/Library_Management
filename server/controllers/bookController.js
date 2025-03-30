const Book = require('../models/book')
const mongoose = require("mongoose");

const getBook = async (req, res) => {
  const bookId = req.params.id;

  Book.findById(bookId, (err, book) => {
    if (err) {
      return res.status(400).json({success: false, err});
    }

    return res.status(200).json({
      success: true,
      book
    });
  });
}

const getAllBooks = async (req, res) => {
  Book.find({},(err,books)=>{
    if(err){
      return res.status(400).json({success: false,err});
    }
    return res.status(200).json({
      success: true,
      booksList: books
    });

  });
}

const addBook = async (req, res) => {
  try {
    const{name,isbn,auther,genre,isAvailable,summery,photourl}=req.body;
    const newBook={
      name,
      isbn,
      auther,
      genre,
      isAvailable,
      summery,
      photourl
    };
    const book=await Book.create(newBook);
    return res.status(201).json({ success:true,newBook:book});
  } catch (err) {
    console.error("Error adding book:",err.message);
    return res.status(500).json({success:false,error:err.message});
    
  }
}

const updateBook = async (req, res) => {
  const bookId = req.params.id
  const updatedBook = req.body

  Book.findByIdAndUpdate(bookId, updatedBook, (err, book) => {
    if (err) {
      return res.status(400).json({success: false, err});
    }

    return res.status(200).json({
      success: true,
      updatedBook: book
    });
  })
}

const deleteBook = async (req, res) => {
  const bookId = req.params.id

  Book.findByIdAndDelete(bookId, (err, book) => {
    if (err) {
      return res.status(400).json({success: false, err});
    }

    return res.status(200).json({
      success: true,
      deletedBook: book
    });
  })
}

module.exports = {
  getBook,
  getAllBooks,
  addBook,
  updateBook,
  deleteBook
}
