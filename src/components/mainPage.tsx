import React, { useEffect, useState } from "react";
import { Photo } from "../models/Photo";
import "../styles/container.css";
import Nav from "./Nav";
import { Link } from "react-router-dom";

const MainPage = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [searchAlbumId, setSearchAlbumId] = useState("");
  const [searchPhotoId, setSearchPhotoId] = useState("");
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/photos"
        );
        const photosData: Photo[] = await response.json();
        setPhotos(photosData);
        setFilteredPhotos(photosData);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, []);

  const handleSearch = () => {
    const filtered = photos.filter((photo: any) =>
      photo.albumId.toString().startsWith(searchAlbumId) &&
      photo.id.toString().startsWith(searchPhotoId)
    );
    setFilteredPhotos(filtered);
  };

  const clearFilters = () => {
    setSearchAlbumId("");
    setSearchPhotoId("");
    setFilteredPhotos(photos);
  };

  return (
    <div className="container">
      <Nav />

      <div className="text-center my-3 inputContainer">
        <input
          type="text"
          placeholder="Search photo by Album ID"
          value={searchAlbumId}
          onChange={(e) => setSearchAlbumId(e.target.value)}
          className="form-control"
        />
        <input
          type="text"
          placeholder="Search photo by Photo ID"
          value={searchPhotoId}
          onChange={(e) => setSearchPhotoId(e.target.value)}
          className="form-control"
        />
        <button className="btn btn-primary mt-2" onClick={handleSearch}>
          Search
        </button>
        <button className="btn btn-secondary mt-2 ml-2" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      {filteredPhotos.length > 0 ? (
        <div className="text-center my-4">
          <h2>Filtered Photos</h2>
          {filteredPhotos.map((photo: any) => (
            <div key={photo.id} className="col-md-6 mx-auto mb-3">
              <Link to={`/photo/${photo.id}`} key={photo.id} className="text-decoration-none">
                <div className="card">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <p className="card-text">{photo.title}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center my-4">No matching photos found.</p>
      )}
    </div>
  );
};

export default MainPage;
