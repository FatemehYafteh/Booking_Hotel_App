import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelsProvider from "./components/context/HotelsProvider";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import Bookmark from "./components/Bookmark/Bookmark";
import BookmarkListProvider from "./components/context/BookmarkListContext";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark";
import BookmarkLayout from "./components/BookmarkLayout/BookmarkLayout";

function App() {
  return (
    <div>
      <BookmarkListProvider>
        <HotelsProvider>
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<LocationList />} />
            <Route path="/hotels" element={<AppLayout />}>
              <Route index element={<Hotels />} />
              <Route path="id" element={<SingleHotel />} />
            </Route>
            <Route path="/bookmark" element={<BookmarkLayout/>}>
            <Route path="/bookmark" element={<Bookmark />} />
            <Route path="id" element={<SingleBookmark />} />
            <Route path="add" element={<div>add bookmark</div>} />
            </Route>
          </Routes>
        </HotelsProvider>
      </BookmarkListProvider>
    </div>
  );
}

export default App;
