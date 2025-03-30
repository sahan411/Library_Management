import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import PropTypes from "prop-types";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Iconify from "../../../components/iconify";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const BookForm = ({
  isUpdateForm,
  isModalOpen,
  handleCloseModal,
  book,
  setBook,
  handleAddBook,
  handleUpdateBook
}) => {
  const [isModalLoading, setIsModalLoading] = useState(true);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);

  // Fetch all authors
  const getAllAuthors = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/author/getAll`);
      setAuthors(response.data.authorsList);
    } catch (error) {
      toast.error("Error fetching authors");
      console.error(error);
    }
  };

  // Fetch all genres
  const getAllGenres = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/genre/getAll`);
      setGenres(response.data.genresList);
    } catch (error) {
      toast.error("Error fetching genres");
      console.error(error);
    } finally {
      setIsModalLoading(false);
    }
  };

  // Load data on modal open
  useEffect(() => {
    if (isModalOpen) {
      setIsModalLoading(true);
      getAllAuthors();
      getAllGenres();
    }
  }, [isModalOpen]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "white",
    borderRadius: "20px",
    boxShadow: 16,
    p: 2,
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Container>
          <Typography variant="h4" textAlign="center" paddingBottom={2} paddingTop={1}>
            {isUpdateForm ? "Update" : "Add"} Book
          </Typography>

          {isModalLoading ? (
            <Grid padding={4} style={{ textAlign: "center" }}>
              <CircularProgress />
            </Grid>
          ) : (
            <Stack spacing={3} paddingY={2} paddingX={3} height="600px" overflow="scroll">
              {/* Book Name */}
              <TextField
                name="name"
                label="Book Name"
                value={book.name || ""}
                autoFocus
                required
                onChange={(e) => setBook({ ...book, name: e.target.value })}
              />

              {/* ISBN */}
              <TextField
                name="isbn"
                label="ISBN"
                value={book.isbn || ""}
                required
                onChange={(e) => setBook({ ...book, isbn: e.target.value })}
              />

              {/* Author */}
              <FormControl sx={{ m: 1 }}>
                <InputLabel id="author-label">Author</InputLabel>
                <Select
                  labelId="author-label"
                  id="author"
                  value={book.authorId || ""}
                  label="Author"
                  onChange={(e) => setBook({ ...book, authorId: e.target.value })}
                >
                  {authors.map((author) => (
                    <MenuItem key={author._id} value={author._id}>
                      {author.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Genre */}
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="genre-label">Genre</InputLabel>
                <Select
                  labelId="genre-label"
                  id="genre"
                  value={book.genreId || ""}
                  label="Genre"
                  onChange={(e) => setBook({ ...book, genreId: e.target.value })}
                >
                  {genres.map((genre) => (
                    <MenuItem key={genre._id} value={genre._id}>
                      {genre.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Availability */}
              <FormControl>
                <FormLabel id="available-label">Availability</FormLabel>
                <RadioGroup
                  aria-labelledby="available-label"
                  value={book.isAvailable ? "true" : "false"}
                  name="radio-buttons-group"
                  onChange={(e) =>
                    setBook({ ...book, isAvailable: e.target.value === "true" })
                  }
                >
                  <FormControlLabel value="true" control={<Radio />} label="Available" />
                  <FormControlLabel value="false" control={<Radio />} label="Not Available" />
                </RadioGroup>
              </FormControl>

              {/* Summary */}
              <TextField
                name="summary"
                label="Summary"
                value={book.summary || ""}
                multiline
                rows={2}
                maxRows={4}
                onChange={(e) => setBook({ ...book, summary: e.target.value })}
              />

              {/* Photo Upload */}
              <Button size="large" variant="outlined" component="label" color="info">
                Upload Photo
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  hidden
                  onChange={(e) =>
                    setBook({ ...book, photoUrl: URL.createObjectURL(e.target.files[0]) })
                  }
                />
              </Button>

              {/* Action Buttons */}
              <Box textAlign="center" paddingBottom={2}>
                <Button
                  size="large"
                  variant="contained"
                  onClick={isUpdateForm ? handleUpdateBook : handleAddBook}
                  startIcon={<Iconify icon="bi:check-lg" />}
                  style={{ marginRight: "12px" }}
                >
                  Submit
                </Button>

                <Button
                  size="large"
                  color="inherit"
                  variant="contained"
                  onClick={handleCloseModal}
                  startIcon={<Iconify icon="charm:cross" />}
                  style={{ marginLeft: "12px" }}
                >
                  Cancel
                </Button>
              </Box>
            </Stack>
          )}
        </Container>
      </Box>
    </Modal>
  );
};

BookForm.propTypes = {
  isUpdateForm: PropTypes.bool,
  isModalOpen: PropTypes.bool,
  handleCloseModal: PropTypes.func,
  book: PropTypes.object,
  setBook: PropTypes.func,
  handleAddBook: PropTypes.func,
  handleUpdateBook: PropTypes.func,
};

export default BookForm;
