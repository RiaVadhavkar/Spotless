import Header from "./components/Header";
import Footer from "./components/Footer";
import List from "./views/List";
import Home from "./views/Home";

import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom";

function App() {
  return (
    // TODO: add class="font-default" to App
    <div className="App">
      <Header></Header>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
