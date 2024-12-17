import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { RiDoubleQuotesL } from 'react-icons/ri';
import aboutImg from '../assets/about.jpg';

// Example statistics data
const statistics = [
  { label: 'Happy Clients', value: 12 },
  { label: 'Different Cities', value: 3 },
  { label: 'Projects Completed', value: 45 },
];

function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const top = aboutSection.getBoundingClientRect().top;
        const visible = top < window.innerHeight - 100;
        setIsVisible(visible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger on mount for visibility check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="about" className="max-padd-container py-16 xl:py-28">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Image Section */}
        <div className="flex-1 relative">
          <img
            src={aboutImg}
            alt="About"
            className="rounded-3xl rounded-tr-[155px] w-[488px] shadow-md"
          />
          <div className="bg-white absolute bottom-16 left-16 max-w-xs p-4 rounded-lg shadow-lg">
            <span className="flex items-center justify-center h-12 w-12 bg-gray-200 rounded-full shadow-md">
              <RiDoubleQuotesL className="text-2xl text-gray-600" />
            </span>
            <p className="text-gray-600 text-center mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ea
              aliquid, culpa dolores adipisci animi mollitia.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-center">
          <span className="text font-semibold-primary text-xl font-medium mb-2">
            Unveiling Our Journey
          </span>
          <h2 className="text-3xl font-semibold mb-4 leading-snug">
            Our Commitment to Crafting Extraordinary Real Estate Experiences
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores nihil quaerat similique
            voluptatum blanditiis tempore sequi omnis culpa vel temporibus.
          </p>

          {/* Statistics Section */}
          <div className="flex flex-wrap gap-6">
            {statistics.map((stat, index) => (
              <div key={index} className="bg-primary p-4 rounded-lg shadow-md">
                <div className="flex items-baseline gap-1">
                  <h3 className="text-3xl font-bold font-bold">
                    <CountUp start={isVisible ? 0 : null} end={stat.value} duration={3} delay={0.5} />
                  </h3>
                  <span className="text-2xl font-semibold">k+</span>
                </div>
                <p className="text-sm mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
