// import React, { useState } from "react";
// import Navbar from "../../components/NavBar";
// import Footer from "../../components/Footer";
// import Feed from "../Feed/Feed";
// import { FiPlusCircle } from "react-icons/fi";

// function Home() {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <div className="bg-base-200 min-h-screen">
//       <Navbar />

//       <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
//         {/* Create Post Button */}
//         <div className="flex justify-end">
//           <button
//             className="btn btn-primary gap-2"
//             onClick={() => setShowModal(true)}
//           >
//             <FiPlusCircle className="text-lg" />
//             Create Post
//           </button>
//         </div>

//         {/* Feed */}
//         <Feed />
//       </main>

//       {/* Modal */}
//       {showModal && (
//         <dialog className="modal modal-open">
//           <div className="modal-box">
//             <h3 className="font-bold text-lg mb-4">Create a New Post</h3>

//             {/* Post Content Input */}
//             <div className="form-control mb-3">
//               <label className="label">
//                 <span className="label-text">What's on your mind?</span>
//               </label>
//               <textarea
//                 placeholder="Write something..."
//                 className="textarea textarea-bordered"
//               ></textarea>
//             </div>

//             {/* Image Upload */}
//             <div className="form-control mb-3">
//               <label className="label">
//                 <span className="label-text">Upload Image/Video</span>
//               </label>
//               <input
//                 type="file"
//                 className="file-input file-input-bordered w-full"
//               />
//             </div>

//             {/* Modal Actions */}
//             <div className="modal-action">
//               <button className="btn" onClick={() => setShowModal(false)}>
//                 Cancel
//               </button>
//               <button className="btn btn-primary">Post</button>
//             </div>
//           </div>
//         </dialog>
//       )}

//       <Footer />
//     </div>
//   );
// }

// export default Home;

import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Feed from "../Feed/Feed";
import { FiPlusCircle } from "react-icons/fi";
import PostCreator from "../../components/PostCreator";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const onCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className="bg-base-200 min-h-screen">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Create Post Button */}
        <div className="flex justify-end">
          <button
            className="btn btn-primary gap-2"
            onClick={() => setShowModal(true)}
          >
            <FiPlusCircle className="text-lg" />
            Create Post
          </button>
        </div>

        {/* Feed */}
        <Feed />
      </main>

      {/* Modal */}
      {showModal && <PostCreator onClose={onCloseModal} />}

      <Footer />
    </div>
  );
}

export default Home;
