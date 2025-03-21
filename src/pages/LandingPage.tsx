// TODO: update the mock up main page view with more realistic data
import mockMainPageView from "../assets/mockMainPageView.png";

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full bg-blue-50">
      <div className="hero bg-blue-50 min-h-[calc(100vh-4rem)] px-6 lg:px-20">
        <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-7xl mx-auto gap-16 items-center">
          {/* Mockup Browser Image - Right */}
          <div className="w-full">
            <div className="mockup-browser border bg-white w-full shadow-xl">
              {/* Mockup Browser Url */}
              <div className="mockup-browser-toolbar">
                <div className="input">https://optapply.com/home</div>
              </div>
              {/* Mockup Browser Home Page View */}
              <div className="flex justify-center items-center bg-gray-100 p-0">
                <img src={mockMainPageView} alt="Dashboard Screenshot" className="object-cover max-h-[480px] w-full m-0 p-0" />
              </div>
            </div>
          </div>

          {/* Tagline Section - Left */}
          <div className="w-full space-y-6 text-left">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-snug">
              Simplify Your Job Search and Stay Organized
            </h1>
            <p className="text-base lg:text-lg text-gray-700">
              A free and centralized hub for tracking job applications, interviews, and deadlines — helping job seekers stay on
              top of their search, reduce stress, and improve success.
            </p>
            <div className="flex flex-wrap pt-4">
              <button className="btn btn-primary text-white px-6 py-3 rounded-lg text-lg">Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
