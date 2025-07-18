import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop"; // Import ScrollToTop component
import Navbar from "./components/Navbar"; // Import your Navbar component
import HomePage from "./components/HomePage"; // Home page component
import About from "./components/AboutUs"; // About page component
import ContactUs from "./components/ContactUs"; // Contact page component
import Footer from "./components/Footer";
import EventDetails from "./components/EventDetails";
import EventCreation from "./components/EventCreation";
import AdminDashboard from "./components/AdminDashboard";
import Myevents from "./components/MyEvents";
import SignIn from "./components/SignIn";
import ManageEventsPage from "./components/ManageEventPage";
import OrgDashboard from "./components/OrgDashboard";
import Analytics from "./components/OrgAnalytics";
import SignUp from "./components/SignUp";
import UserAccount from "./components/UserAccount";
import OrganizerRegister from "./components/RegOrganizer";
import AllEvents from "./components/AllEvents";
import PrivacyPolicy from "./components/PrivacyPolicy";
import FAQSection from "./components/FaqSection";
import Carousel from "./components/Carousel";
import CategoryEvents from "./components/CategoryEvents";
import ProtectedRoute from "./components/ProtectedRoute";
import SpecialShows from "./components/SpecialShows";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Global.css";
import CheckoutPage from "./components/CheckoutPage";
import Chat from "./components/ChatBot";
import TestimonialsSection from "./components/Testimonials";
import { ToastContainer } from 'react-toastify';
import ChatBot from "./components/new_chatbot";

// Content wrapper component that adds spacing except on homepage
const ContentWrapper = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  return (
    <div className={isHomePage ? "" : "content-wrapper"}>
      {children}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div>
      <ScrollToTop /> {/* Add this here */}
        {/* Navbar displayed on all pages */}
        <div className="color-drops">
          <Navbar />

          {/* Routing with ContentWrapper */}
          <ContentWrapper>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/allevents" element={<AllEvents />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/faq" element={<FAQSection />} />
              <Route path="/carousel" element={<Carousel />} />
              <Route path="/testimonials" element={<TestimonialsSection />} />
              <Route path="/category" element={<CategoryEvents />} />
              <Route path="/orgregister" element={<OrganizerRegister />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/specialshows" element={<SpecialShows />} />
              <Route path="/checkout" element={<CheckoutPage />} />

              {/* Protected Routes */}
              <Route
                path="/eventdetails/:eventId"
                element={
                  <ProtectedRoute roles={["user", "admin"]}>
                    <EventDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/eventcreation/:organizerId"
                element={
                  <ProtectedRoute roles={["organizer", "admin"]}>
                    <EventCreation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admindashboard"
                element={
                  <ProtectedRoute roles={["admin"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/myevents"
                element={
                  <ProtectedRoute roles={["user", "organizer"]}>
                    <Myevents />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/manageevents"
                element={
                  <ProtectedRoute roles={["organizer", "admin"]}>
                    <ManageEventsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orgdashboard/:organizerId"
                element={
                  <ProtectedRoute roles={["organizer"]}>
                    <OrgDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/organalytics"
                element={
                  <ProtectedRoute roles={["organizer"]}>
                    <Analytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/useraccount/:userId"
                element={
                  <ProtectedRoute roles={["user", "organizer", "admin"]}>
                    <UserAccount />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </ContentWrapper>
          < ChatBot />
          <Footer />
          <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
      </div>
    </Router>
  );
};

export default App;