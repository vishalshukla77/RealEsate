import React from 'react';
import { Link } from 'react-router-dom';
import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from '../constants/data';
import { RiFacebookFill, RiTwitterFill, RiInstagramFill } from 'react-icons/ri'; // Example social icons

function Footer() {
  return (
    <footer className="max-padd-container mb-4">
      <div className="max-padd-container bg-primary rounded-tr-3xl pt-12 xl:pt-20 pb-8">
        {/* Main Heading and Description */}
        <h3 className="h3">Explore real estate opportunities with us?</h3>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam corporis optio culpa velit voluptate voluptates, 
          corrupti cumque ipsa dolore maxime aut voluptatem nulla, soluta, accusamus minus tempore qui asperiores vel?
        </p>
        <hr className="my-8 bg-slate-900/30 h-[2px]" />

        {/* Branding and Email Subscription */}
        <div className="flex justify-between flex-wrap gap-2">
          {/* Branding Section */}
          <div className="max-w-sm">
            <Link to={'/'} className="flex items-center gap-x-2">
              <span className="font-extrabold text-2xl">
                Casa<span className="font-semibold text-lg">Central</span>
              </span>
            </Link>
            <p className="text-gray-600 mt-4 max-w-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos nemo totam, sed odit incidunt possimus facilis inventore 
              excepturi deleniti voluptates hic labore earum harum velit rem quis laudantium, ratione sunt.
            </p>
          </div>

          {/* Subscription Form */}
          <div className="flex items-center pl-6 h-[3.3rem] bg-white w-full max-w-[366px] rounded-full ring-1 ring-gray-300">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
            />
            <button className="btn-secondary rounded-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 relative right-[0.33rem]">
              Subscribe
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {/* Dynamic Footer Links */}
          {FOOTER_LINKS.map((col) => (
            <FooterColumn key={col.title} title={col.title}>
              <ul>
                {col.links.map((link, index) => (
                  <li key={index} className="text-sm text-gray-600 hover:text-blue-600">
                    <Link to={link.href}>{link}</Link>
                  </li>
                ))}
              </ul>
            </FooterColumn>
          ))}

          {/* Contact Info Column */}
          <FooterColumn title={FOOTER_CONTACT_INFO.title}>
            <ul>
              {FOOTER_CONTACT_INFO.links.map((link, index) => (
                <li key={index} className="text-sm text-gray-600">
                  <p className='pt-1 pb-1'>{link.label}:</p>
                  <p className="text-gray-800">{link.value}</p>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Social Links Column */}
          <FooterColumn title={SOCIALS.title}>
            <ul className="flex gap-4">
              {SOCIALS.links.map((social, index) => (
                <li key={index}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 text-2xl"
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>
        </div>
      </div>
      <p className="text-center mt-4 text-gray-600">
        <span>2024 CasaCentral </span>All rights reserved
      </p>
    </footer>
  );
}

export default Footer;

const FooterColumn = ({ title, children }) => {
  return (
    <div>
      <h4 className="text-lg font-bold text-slate-900 mb-4">{title}</h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
};
