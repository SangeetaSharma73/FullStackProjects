// import Masonry from "react-masonry-css";
// import "../../index.css";
// import ImageCard from "../../components/ImageCard";

// const images = [
//   {
//     src: "https://plus.unsplash.com/premium_photo-1675433344518-21eb72dfc7a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJlfGVufDB8fDB8fHww",
//     user: {
//       name: "Alice Johnson",
//       avatar: "https://i.pravatar.cc/40?img=5",
//     },
//   },
//   {
//     src: "https://plus.unsplash.com/premium_photo-1673292293042-cafd9c8a3ab3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmF0dXJlfGVufDB8fDB8fHww",
//     user: {
//       name: "Carlos Rivera",
//       avatar: "https://i.pravatar.cc/40?img=12",
//     },
//   },
//   {
//     src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8fDB8fHww",
//     user: {
//       name: "Emily Zhang",
//       avatar: "https://i.pravatar.cc/40?img=7",
//     },
//   },
//   {
//     src: "https://plus.unsplash.com/premium_photo-1673697239981-389164b7b87f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bmF0dXJlfGVufDB8fDB8fHww",
//     user: {
//       name: "Liam Patel",
//       avatar: "https://i.pravatar.cc/40?img=15",
//     },
//   },
//   {
//     src: "https://plus.unsplash.com/premium_photo-1675827055694-010aef2cf08f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
//     user: {
//       name: "Sara Thompson",
//       avatar: "https://i.pravatar.cc/40?img=22",
//     },
//   },
//   {
//     src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
//     user: {
//       name: "Benjamin Lee",
//       avatar: "https://i.pravatar.cc/40?img=9",
//     },
//   },
//   {
//     src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
//     user: {
//       name: "Olivia Kim",
//       avatar: "https://i.pravatar.cc/40?img=3",
//     },
//   },
//   {
//     src: "https://plus.unsplash.com/premium_photo-1675433344518-21eb72dfc7a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmF0dXJlfGVufDB8fDB8fHww",
//     user: {
//       name: "Mason Nguyen",
//       avatar: "https://i.pravatar.cc/40?img=14",
//     },
//   },
//   {
//     src: "https://plus.unsplash.com/premium_photo-1673292293042-cafd9c8a3ab3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmF0dXJlfGVufDB8fDB8fHww",
//     user: {
//       name: "Isabella Walker",
//       avatar: "https://i.pravatar.cc/40?img=17",
//     },
//   },
// ];

// const breakpointColumnsObj = {
//   default: 4,
//   1024: 3,
//   768: 2,
//   500: 1,
// };

// function ImageGallery() {
//   return (
//     <div className="px-4 py-10 max-w-7xl mx-auto">
//       {/* <h2 className="text-3xl font-bold text-left mb-10">
//         Ultimate image gallery
//       </h2> */}

//       <Masonry
//         breakpointCols={breakpointColumnsObj}
//         className="my-masonry-grid"
//         columnClassName="my-masonry-grid_column"
//       >
//         {images.map((image, index) => (
//           <ImageCard key={index} src={image.src} user={image.user} />
//         ))}
//       </Masonry>
//     </div>
//   );
// }

// export default ImageGallery;

import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageCard from "../../components/ImageCard"; // Don't forget to import this

function ImageGallery() {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/photos/")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setPhotos(res.data);
        } else {
          console.error("Unexpected response:", res.data);
          setError("Unexpected response from server.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load photos.");
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="gallery">
      {photos.map((photo) => (
        <ImageCard key={photo._id} image={photo} />
      ))}
    </div>
  );
}

export default ImageGallery;
